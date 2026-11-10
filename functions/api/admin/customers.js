import {json,adminAllowed,ensureSchema,configured} from "../../_lib/model.js";
export async function onRequestGet({request,env}){
 if(!adminAllowed(request,env))return json({error:"Acesso não autorizado."},401);
 if(!configured(env))return json({error:"Banco D1 ainda não configurado."},503);
 try{
  await ensureSchema(env.DB);
  const customers=(await env.DB.prepare("SELECT c.id,c.name,c.phone,c.doc_type,c.doc_last4,c.offers_opt_in,COUNT(o.id) AS order_count,COALESCE(SUM(CASE WHEN o.status!='cancelado' THEN o.total_cents ELSE 0 END),0) AS spend_cents,MAX(o.created_at) AS last_order FROM customers c LEFT JOIN orders o ON o.customer_id=c.id GROUP BY c.id ORDER BY last_order DESC LIMIT 250").all()).results||[];
  const orders=(await env.DB.prepare("SELECT o.customer_id,o.dish_items,o.status FROM orders o ORDER BY o.created_at DESC LIMIT 5000").all()).results||[];
  const counts={};const perCustomer=new Map();
  for(const o of orders){
   if(o.status==="cancelado")continue;
   let items=[];try{items=JSON.parse(o.dish_items)}catch{}
   const favorite=perCustomer.get(o.customer_id)||{};
   for(const it of items){
    const n=Number(it.quantity)||0;
    if(typeof it.code!=="string"||n<1)continue;
    counts[it.code]=(counts[it.code]||0)+n;favorite[it.code]=(favorite[it.code]||0)+n;
   }
   perCustomer.set(o.customer_id,favorite);
  }
  const top=(v,n=5)=>Object.entries(v).sort((a,b)=>b[1]-a[1]).slice(0,n).map(([code,quantity])=>({code,quantity}));
  return json({
   total_customers:customers.length,
   customers:customers.map(c=>({...c,favorite_dishes:top(perCustomer.get(c.id)||{},4)})),
   top_dishes:top(counts,15),
   opt_in_customers:customers.filter(c=>c.offers_opt_in===1).length,
   last_orders_analyzed:orders.length,
   note:"Dados de acesso restrito à equipe; ofertas somente para quem consentiu."
  });
 }catch{return json({error:"Não foi possível consultar os registros."},503)}
}