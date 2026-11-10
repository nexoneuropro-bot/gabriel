import {PRICES,DISH_CODES,SEAFOOD,normalizeDocument,documentType,docHash,ensureSchema,json,sameOrigin,configured} from "../_lib/model.js";
const err=(message,status=400)=>json({ok:false,error:message},status);
export async function onRequestGet({env}){return json({online:configured(env),payment:"no_recebimento",storage:"D1",requires_config:!configured(env)})}
export async function onRequestPost({request,env}){
 if(!sameOrigin(request))return err("Origem não autorizada.",403);
 if(!configured(env))return err("Registro de pedidos não configurado; use o WhatsApp.",503);
 if(!String(request.headers.get("content-type")||"").includes("application/json"))return err("Content-Type deve ser JSON.",415);
 let p;try{const t=await request.text();if(t.length>12000)return err("Pedido muito grande.",413);p=JSON.parse(t)}catch{return err("JSON inválido.")}
 if(p.website)return json({ok:true,ignored:true}); // anti-robô
 const doc=normalizeDocument(p.document),type=documentType(doc);
 if(!type)return err("CPF/CNPJ inválido.");
 const name=String(p.name||"").trim().replace(/\s+/g," ").slice(0,100);
 const phone=String(p.phone||"").replace(/\D/g,"").replace(/^55(?=\d{10,11}$)/,"");
 if(name.length<2||!/^.{2,100}$/.test(name))return err("Informe nome ou razão social.");
 if(!/^\d{10,11}$/.test(phone))return err("Telefone inválido.");
 const q=Number(p.quantity),items=p.items,requestId=String(p.request_id||"");
 if(!Number.isInteger(q)||!(q>=1&&q<=9||[10,20,30].includes(q)))return err("Escolha avulsas de 1 a 9 ou um combo de 10, 20 ou 30.");
 if(!Array.isArray(items)||items.length<1||items.length>22)return err("Selecione os pratos.");
 if(!/^[0-9a-fA-F-]{32,40}$/.test(requestId))return err("Identificador do pedido inválido.");
 const seen=new Set();let total=0,sea=0;
 for(const item of items){
  const code=String(item?.code??""),n=Number(item?.quantity);
  if(!DISH_CODES.has(code)||seen.has(code)||!Number.isInteger(n)||n<1||n>30)return err("Prato ou quantidade inválida.");
  seen.add(code);total+=n;if(SEAFOOD.has(code))sea+=n;
 }
 if(total!==q)return err("A quantidade selecionada não corresponde ao pacote.");
 if(q>=10&&sea>2)return err("Cada combo permite até duas marmitas de frutos do mar.");
 const cents=q>=10?PRICES[q]:(q-sea)*2500+sea*5000;
 if(!Number.isInteger(cents)||cents<0)return err("Valor inválido.");
 const fulfillment=String(p.fulfillment||"").startsWith("Retirada")?"retirada":"entrega";
 const meal=String(p.meal||"").slice(0,60);
 const offers=p.offers_opt_in===true?1:0;
 let hash;try{hash=await docHash(doc,env.CUSTOMER_HASH_KEY)}catch{return err("Serviço temporariamente indisponível.",503)}
 try{
  await ensureSchema(env.DB);
  const previous=await env.DB.prepare("SELECT o.id FROM orders o JOIN customers c ON c.id=o.customer_id WHERE c.doc_hash=? AND o.created_at > datetime('now','-15 minutes') ORDER BY o.created_at DESC LIMIT 1").bind(hash).first();
  if(previous)return err("Já existe um pedido recente para este cadastro. Aguarde a confirmação da Nutricomp ou use o WhatsApp.",429);
  const customer=await env.DB.prepare("INSERT INTO customers(doc_hash,doc_type,doc_last4,name,phone,offers_opt_in) VALUES(?,?,?,?,?,?) ON CONFLICT(doc_hash) DO UPDATE SET name=excluded.name,phone=excluded.phone,offers_opt_in=excluded.offers_opt_in,updated_at=CURRENT_TIMESTAMP RETURNING id").bind(hash,type,doc.slice(-4),name,phone,offers).first();
  if(!customer?.id)return err("Cadastro indisponível.",503);
  const orderId="NC-"+crypto.randomUUID().split("-")[0].toUpperCase();
  await env.DB.prepare("INSERT INTO orders(id,request_id,customer_id,package_qty,total_cents,dish_items,fulfillment,meal,status,payment) VALUES(?,?,?,?,?,?,?,?,?,?)")
  .bind(orderId,requestId,customer.id,q,cents,JSON.stringify(items),fulfillment,meal,"solicitado","na_entrega").run();
  return json({ok:true,order_id:orderId,total_cents:cents,payment:"na_entrega",status:"solicitado"},201);
 }catch(e){return err("Falha temporária no registro do pedido. Não tente enviar repetidamente; entre em contato pelo WhatsApp.",503)}
}