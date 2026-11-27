(function(root){
'use strict';
const BASE={10:22000,20:38000,30:51000};
const STEPS=['Aguardando cozinha','Recebido pela cozinha','Em preparação','Liberado','Enviado para agendamento'];
const now=()=>new Date().toISOString();
function initial(catalog){return {version:1,catalog:catalog.map(d=>({...d,active:!d.quote&&d.group!=='mar'})),promotions:[],orders:[
 {id:'NC-7K4P9Q',name:'Mariana Demo',combo:20,items:[{code:'2',name:'Frango com arroz 7 grãos e purê de mandioquinha',qty:10},{code:'4',name:'Búrguer de patinho com arroz 7 grãos e legumes',qty:10}],total:38000,commercial:'confirmado',kitchen:0,logistics:'não enviado',financial:'pendente',delivery:'entrega',marketing:false,created:now(),events:[{at:now(),actor:'Atendimento demo',text:'Pedido fictício confirmado'}]},
 {id:'NC-8M5R2T',name:'Rafael Demo',combo:10,items:[{code:'2',name:'Frango com arroz 7 grãos e purê de mandioquinha',qty:10}],total:22000,commercial:'solicitacao',kitchen:0,logistics:'não enviado',financial:'pendente',delivery:'retirada',marketing:true,created:now(),events:[{at:now(),actor:'Site demo',text:'Solicitação fictícia recebida'}]}
]};}
function cents(s){if(!/^\d+(?:[.,]\d{1,2})?$/.test(String(s)))throw Error('Use um valor positivo com até duas casas decimais.');const [a,b='']=String(s).replace(',','.').split('.');const n=Number(a)*100+Number(b.padEnd(2,'0'));if(!Number.isSafeInteger(n))throw Error('Valor fora do limite.');return n;}
function offer(s,combo,date=Date.now()){const base=BASE[combo];const p=s.promotions.find(p=>p.active&&p.combo===combo&&date>=Date.parse(p.start)&&date<Date.parse(p.end));if(!p)return {total:base,discount:0,promotion:null};const discount=p.type==='percent'?Math.round(base*p.value/10000):p.value;return {total:base-discount,discount,promotion:p.title};}
function available(s,items){return items.filter(i=>!s.catalog.some(d=>d.code===i.code&&d.active&&!d.quote&&d.group!=='mar'));}
function event(o,text,actor='Atendimento demo'){o.events.push({at:now(),actor,text});}
function confirm(s,id){const o=s.orders.find(o=>o.id===id);if(!o||o.commercial!=='solicitacao')throw Error('Apenas solicitações podem ser confirmadas.');if(available(s,o.items).length)throw Error('Substitua os pratos indisponíveis antes de confirmar.');o.commercial='confirmado';event(o,'Composição e valor confirmados pela equipe (simulação).');}
function advance(s,id){const o=s.orders.find(o=>o.id===id);if(!o||o.commercial!=='confirmado'||o.kitchen>=4)throw Error('Etapa não permitida.');o.kitchen++;event(o,STEPS[o.kitchen],'Cozinha demo');if(o.kitchen===4)o.logistics=o.delivery==='retirada'?'aguardando retirada':'aguardando agendamento';}
function promo(s,p){if(!BASE[p.combo]||!p.title.trim()||!['fixed','percent'].includes(p.type)||!(Date.parse(p.start)<Date.parse(p.end))||p.value<=0||p.value>(p.type==='percent'?10000:BASE[p.combo]))throw Error('Confira título, desconto e período da promoção.');s.promotions.push({...p,id:'P'+Date.now(),active:true});}
function addOrder(s,o){const old=s.orders.find(v=>v.key&&v.key===o.key);if(old)return old;if(!BASE[o.combo]||o.items.reduce((n,i)=>n+i.qty,0)!==o.combo||o.items.some(i=>!Number.isInteger(i.qty)||i.qty<=0)||available(s,o.items).length)throw Error('Revise quantidades e disponibilidade.');const price=offer(s,o.combo);const order={...o,...{total:price.total,promotion:price.promotion,discount:price.discount,commercial:'solicitacao',kitchen:0,logistics:'não enviado',financial:'pendente',created:now(),events:[{at:now(),actor:'Site demo',text:'Solicitação fictícia registrada neste navegador'}]}};s.orders.push(order);return order;}
const api={BASE,STEPS,initial,cents,offer,available,confirm,advance,promo,addOrder,event};
if(typeof module!=='undefined')module.exports=api;else root.NutricompDemo=api;
})(typeof window!=='undefined'?window:globalThis);
