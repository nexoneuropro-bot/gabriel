import fs from 'node:fs';
import path from 'node:path';
const root=path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1'));
const demo=path.join(root,'demo');
let html=fs.readFileSync(path.join(root,'docs/nutricomp-sprint-0/previa.html'),'utf8');
function replace(a,b){if(!html.includes(a))throw Error('Base alterada: '+a.slice(0,60));html=html.replace(a,b);}
const catalogText=html.match(/const DISHES=(\[[\s\S]*?\n\]);/)[1];
const catalog=Function('return ('+catalogText+')')();
fs.writeFileSync(path.join(demo,'catalog.js'),'window.NC_CATALOG='+JSON.stringify(catalog)+';\n');
replace('<title>Nutricomp | Prévia da nova home</title>','<title>Nutricomp | Demonstração de marmitas congeladas 350 g em São Paulo</title>');
replace("function formSubmit(e){e.preventDefault();","function formSubmit(e){e.preventDefault();if(window.NC_demoValidate&&!window.NC_demoValidate())return;");
replace("const ids=profile.codes;","const eligible=DISHES.filter(d=>d.active&&!d.quote&&d.group!=='mar'&&(profile.id!=='vegetariano'||d.group==='vegetariano'));const allowed=new Set(eligible.map(d=>d.code));const preferred=profile.codes.filter(id=>allowed.has(id));const ids=preferred.length?preferred:eligible.slice(0,5).map(d=>d.code);if(!ids.length)return {};");
replace("DISHES.map(d=>{const val=state.selected[d.code]||0;","DISHES.filter(d=>d.active&&!d.quote&&d.group!=='mar').map(d=>{const val=state.selected[d.code]||0;");
replace("${LABELS[d.group]}</small>","${LABELS[d.group]}${d.active?'':' · Indisponível'}</small>");
replace("document.addEventListener('DOMContentLoaded',main);","window.NC_BRIDGE={DISHES,PRICES,state,chosen,menu,renderBuilder,openCheckout};document.addEventListener('DOMContentLoaded',main);");
replace('</head>',`<style>.demo-switch{background:#173d2c;color:#fff5e9;padding:12px 22px;font:14px/1.5 system-ui;display:flex;gap:14px;align-items:center;flex-wrap:wrap}.demo-switch nav{display:flex;gap:8px;flex-wrap:wrap}.demo-switch a{padding:7px 10px;border:1px solid #8fa98e;border-radius:24px;text-decoration:none}@media(max-width:620px){.demo-switch{padding:12px 17px}.demo-switch nav{gap:5px}}</style></head>`);
replace('</body>','<script src="catalog.js"></script><script src="core.js"></script><script src="home.js"></script></body>');
fs.writeFileSync(path.join(demo,'index.html'),html);
for(const [route,role,heading,sub,base] of [['gestao','equipe','Gestão Nutricomp','Pedidos, receitas e ofertas na mesma rotina.','../'],['cozinha','cozinha','Cozinha Nutricomp','Somente pedidos confirmados. Sem finanças ou contatos.','../'],['pedido/acompanhar','cliente','Seu pedido, com cuidado.','Acompanhamento ilustrativo de um pedido fictício.','../../']]){
 const dir=path.join(demo,route);fs.mkdirSync(dir,{recursive:true});
 fs.writeFileSync(path.join(dir,'index.html'),`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer"><title>${heading} | Demonstração</title><link rel="stylesheet" href="${base}admin.css"></head><body data-role="${role}"><div id="demoNav"></div><main class="shell"><header class="heading"><div><span class="eyebrow">Nutricomp · comida de verdade</span><h1 id="pageTitle">${heading}</h1><p>${sub}</p></div><p class="muted" id="updated"></p></header><div class="notice" role="status" id="feedback" tabindex="-1" hidden></div>${role==='equipe'?'<nav class="tabs" id="tabs" aria-label="Gestão"></nav>':role==='cozinha'?'<div class="form-grid"><label>Nome ou número do pedido<input id="kitchenSearch" placeholder="Mariana ou NC-7K4P9Q" type="search"></label><label>Etapa<select id="kitchenFilter"><option value="all">Todas</option><option value="0">Para preparar</option><option value="1">Recebidos</option><option value="2">Em preparação</option><option value="3">Liberados</option><option value="4">Aguardando agendamento</option></select></label></div>':''}<section id="content" style="margin-top:25px"></section><footer class="notice">Simulação local, sem autenticação real, servidor de pedidos ou envio de mensagens. Na produção, cada papel exigirá login e autorização no servidor. Alterações ficam somente neste navegador.</footer></main><script src="${base}catalog.js"></script><script src="${base}core.js"></script><script src="${base}shared.js"></script><script src="${base}ops.js"></script></body></html>`);
}
fs.writeFileSync(path.join(demo,'robots.txt'),'User-agent: *\nDisallow: /\n');
fs.writeFileSync(path.join(demo,'_headers'),'/*\n  X-Robots-Tag: noindex, nofollow\n  Referrer-Policy: no-referrer\n  X-Content-Type-Options: nosniff\n  Cache-Control: no-store\n');
console.log('Demo estática gerada em '+demo);
