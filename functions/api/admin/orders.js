import {json,adminAllowed,ensureSchema,configured} from "../../_lib/model.js";
export async function onRequestGet({request,env}){
 if(!adminAllowed(request,env))return json({error:"Acesso administrativo não autorizado."},401);
 if(!configured(env))return json({error:"Banco de pedidos indisponível."},503);
 try{
  await ensureSchema(env.DB);
  const rows=(await env.DB.prepare("SELECT o.id,o.created_at,o.status,o.payment,o.package_qty,o.total_cents,o.dish_items,o.fulfillment,o.address_json,c.name,c.phone FROM orders o JOIN customers c ON c.id=o.customer_id ORDER BY o.created_at DESC LIMIT 200").all()).results||[];
  return json({orders:rows.map(r=>{
   let address=null,items=[];try{if(r.address_json)address=JSON.parse(r.address_json)}catch{}
   try{items=JSON.parse(r.dish_items)}catch{}
   return {id:r.id,created_at:r.created_at,status:r.status,payment:r.payment,package_qty:r.package_qty,total_cents:r.total_cents,items,address,fulfillment:r.fulfillment,name:r.name,phone:r.phone};
  }),limit:200});
 }catch{return json({error:"Não foi possível carregar os pedidos."},503)}
}