/* Nutricomp | Ajuda para compor combos, não prescrição nutricional */
(() => {
  'use strict';
  const options = [
    {key:'usage',title:'Em quais momentos a marmita entra na sua rotina?',subtitle:'Assim conseguimos sugerir uma distribuição que faça sentido para o seu dia.',items:[
      ['duas','Almoço e jantar','Duas refeições por dia'],['almoco','Só no almoço','Uma refeição no dia'],['jantar','Só no jantar','Uma refeição à noite'],['flexivel','Depende do dia','Horários variados']]},
    {key:'goal',title:'Qual é a prioridade das suas refeições?',subtitle:'São preferências de organização, não recomendações clínicas ou promessas de resultado.',items:[
      ['pratica','Praticidade diária','Variar sabores sem complicação'],['treino','Treino e ganho de massa','Priorizar opções com carne ou frango'],['legumes','Mais legumes no prato','Priorizar pratos que já incluem vegetais'],['menosarroz','Menos arroz e massas','Trocas sujeitas a confirmação'],['idoso','Rotina da pessoa idosa','Priorizar preparações como desfiados e escondidinhos']]},
    {key:'taste',title:'Quais sabores você mais gosta?',subtitle:'Sua escolha dá preferência a alguns pratos, mas mantém variedade no combo.',items:[
      ['variado','Um pouco de tudo','Alternar as opções'],['frango','Mais frango','Dar preferência a aves'],['bovina','Mais carne bovina','Dar preferência a patinho'],['suave','Receitas mais suaves','Desfiados, panquecas e escondidinhos']]},
    {key:'size',title:'Quantas marmitas vamos organizar?',subtitle:'Todas as refeições do novo cardápio têm 350 g, com um preço único por tamanho de combo.',items:[
      ['10','10 marmitas','R$ 220,00'],['20','20 marmitas','R$ 380,00'],['30','30 marmitas','R$ 510,00']]}
  ];
  const choice={usage:'duas',goal:'pratica',taste:'variado',sea:false,size:String(state.size)};
  let step=0,plan=null,applied=false;
  const root=document.getElementById('guide-panel');
  const q=document.getElementById('guide-question');
  const prev=document.getElementById('guide-back');
  const next=document.getElementById('guide-next');
  const marker=document.getElementById('guide-step-label');
  const dots=document.getElementById('guide-dots');
  const status=document.getElementById('guide-error');
  if(!root||!q)return;
  const safe=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  const labels={
    usage:{duas:'Almoço e jantar',almoco:'Só almoço',jantar:'Só jantar',flexivel:'Horários variados'},
    goal:{pratica:'Praticidade',treino:'Rotina de treino',legumes:'Mais legumes',menosarroz:'Menos arroz e massas',idoso:'Rotina da pessoa idosa'},
    taste:{variado:'Variado',frango:'Mais frango',bovina:'Mais carne',suave:'Preparações suaves'}
  };
  function days(){const n=Number(choice.size);return choice.usage==='duas'?n/2:n;}
  function buildPlan(){
    const n=Number(choice.size);
    const candidates=DISHES.filter(d=>d.cat==='bovina'||d.cat==='ave'||(choice.sea&&d.cat==='mar'));
    const seafood=candidates.filter(d=>d.cat==='mar');
    const active=candidates.filter(d=>d.cat!=='mar');
    const freq={};
    // Prioridade culinária, sem alegação de macros que ainda não foram cadastrados.
    function base(d){
      const name=clean(d.name);let w=80;
      if(choice.taste==='frango'&&d.cat==='ave')w+=28;
      if(choice.taste==='bovina'&&d.cat==='bovina')w+=28;
      if(choice.taste==='suave'&&/desfiad|escondidinho|panqueca/.test(name))w+=30;
      if(choice.goal==='treino'&&/frango|patinho|carne/.test(name))w+=14;
      if(choice.goal==='legumes'&&/legumes|lentilha|graos|brocolis|ervilha/.test(name))w+=25;
      if(choice.goal==='menosarroz'&&!/arroz|macarrao/.test(name))w+=25;
      if(choice.goal==='idoso'&&/desfiad|escondidinho|panqueca/.test(name))w+=30;
      if(choice.goal==='idoso'&&/osso/.test(name))w-=12;
      if(choice.goal==='pratica'&&/frango|patinho/.test(name))w+=4;
      return w;
    }
    const cap=Math.max(2,Math.ceil(n/8));
    const selection={};
    let seed=n;
    const seaTarget=choice.sea?Math.min(2,n===10?1:2):0;
    for(let i=0;i<seaTarget;i++){
      const dish=seafood[i%seafood.length];
      if(dish)selection[dish.id]=(selection[dish.id]||0)+1;
    }
    const countCat=cat=>active.filter(d=>d.cat===cat).reduce((sum,d)=>sum+(selection[d.id]||0),0);
    for(let i=Object.values(selection).reduce((a,b)=>a+b,0);i<n;i++){
      const available=active.filter(d=>(selection[d.id]||0)<cap);
      if(!available.length)break;
      const ranked=available.slice().sort((a,b)=>{
        const score=d=>base(d)-(selection[d.id]||0)*21-countCat(d.cat)*1.5+((d.id.length*7+seed)%5);
        return score(b)-score(a)||a.id.localeCompare(b.id,'pt-BR');
      });
      const d=ranked[0];selection[d.id]=(selection[d.id]||0)+1;
    }
    const total=Object.values(selection).reduce((a,b)=>a+b,0);
    if(total!==n)throw Error('Não foi possível compor a quantidade solicitada');
    if(Object.entries(selection).filter(([id])=>DISHES.find(d=>d.id===id)?.cat==='mar').reduce((s,[,v])=>s+v,0)>2)throw Error('Limite de frutos do mar');
    return selection;
  }
  function hints(){
    const out=[];
    if(choice.goal==='menosarroz')out.push('Pedido de troca de arroz/massas por legumes: sujeito à disponibilidade e confirmação da cozinha; não equivale a uma classificação nutricional low carb.');
    if(choice.goal==='treino')out.push('Sugestão de variedade de refeições com carne e frango; necessidades de proteína e ganho de massa são individuais.');
    if(choice.goal==='idoso')out.push('A adequação de textura, restrições e porções para uma pessoa idosa deve ser confirmada individualmente.');
    if(choice.goal==='legumes')out.push('Priorizamos nomes de pratos que mencionam legumes ou leguminosas, sem estimar o teor nutricional.');
    return out;
  }
  function renderWizard(){
    const done=step===4;
    marker.textContent=done?'Sua sugestão está pronta':`Passo ${step+1} de 4`;
    dots.innerHTML=Array.from({length:4},(_,i)=>`<span class="guide-dot ${i<=step?'active':''}"></span>`).join('');
    if(done){
      const sorted=Object.entries(plan||{}).sort((a,b)=>Number(b[1])-Number(a[1]));
      const lines=sorted.map(([id,qty])=>({qty, dish:DISHES.find(d=>d.id===id)})).filter(x=>x.dish);
      const preview=lines.map(x=>`<span>${x.qty}× ${safe(x.dish.name)}</span>`).join('');
      const desc=choice.usage==='duas'?`${days()} dias com almoço e jantar`:`${days()} refeições em dias diferentes`;
      const warn=hints().map(x=>`<p>${safe(x)}</p>`).join('');
      q.innerHTML=`<div class="guide-question"><span class="guide-ribbon">✨ COMBO SUGERIDO</span><h3>${choice.size} marmitas para a sua rotina.</h3><div class="guide-summary"><span>${safe(desc)}</span><span>${fmt(COMBOS[Number(choice.size)])}</span><span>Frutos do mar: ${Object.entries(plan||{}).reduce((s,[id,k])=>s+(DISHES.find(d=>d.id===id)?.cat==='mar'?k:0),0)}/2</span></div><div class="guide-result-card"><strong>Uma sugestão, não uma obrigação.</strong><p>Confira as opções e ajuste qualquer prato no carrinho antes de enviar o pedido ao WhatsApp.</p>${warn}</div><details><summary style="cursor:pointer;font-weight:800;color:#2e6945;font-size:.83rem">Ver os pratos sugeridos (${lines.length} receitas)</summary><div class="guide-preview">${preview}</div></details></div>`;
      prev.textContent='← Alterar respostas';next.textContent='Usar este combo →';
    }else{
      const o=options[step];
      q.innerHTML=`<div class="guide-question"><h3>${safe(o.title)}</h3><p>${safe(o.subtitle)}</p><div class="guide-options" role="group" aria-label="${safe(o.title)}">${o.items.map(([value,label,help])=>`<button type="button" class="guide-option" data-guide-option="${safe(value)}" aria-pressed="${choice[o.key]===value}"><strong>${safe(label)}</strong><small>${safe(help)}</small></button>`).join('')}</div>${step===2?`<label class="guide-switch"><input type="checkbox" id="guide-sea" ${choice.sea?'checked':''} /><span>Gosto de frutos do mar <strong>(máximo 2 por combo)</strong></span></label>`:''}</div>`;
      prev.textContent='← Voltar';next.textContent=step===3?'Ver meu combo sugerido →':'Continuar →';
    }
    prev.disabled=step===0;
    status.textContent='';
    window.nutricompGuide={choice:{...choice},step,plan:plan?{...plan}:null,applied};
  }
  function apply(){
    if(!plan)return;
    // A sugestão substitui o carrinho apenas após autorização explícita.
    if(count()>0&&!confirm('Usar a sugestão vai substituir o combo que você já começou a montar. Deseja continuar?'))return;
    state.size=Number(choice.size);state.qty={...plan};
    state.filter='todos';state.search='';document.getElementById('search').value='';
    applied=true;window.nutricompGuide={choice:{...choice},step,plan:{...plan},applied};
    render();
    document.getElementById('cardapio').scrollIntoView({behavior:'smooth',block:'start'});
    status.textContent='Prontinho! Revise os pratos no carrinho e troque o que desejar.';
  }
  root.addEventListener('click',e=>{
    const btn=e.target.closest('[data-guide-option]');if(!btn)return;
    choice[options[step].key]=btn.getAttribute('data-guide-option');
    renderWizard();
  });
  root.addEventListener('change',e=>{if(e.target.id==='guide-sea'){choice.sea=e.target.checked;renderWizard();}});
  prev.addEventListener('click',()=>{if(step>0){step=step===4?3:step-1;renderWizard();}});
  next.addEventListener('click',()=>{
    if(step===4){apply();return;}
    if(step===3){try{plan=buildPlan();step=4;}catch(e){status.textContent='Não conseguimos compor a sugestão. Você pode montar manualmente no cardápio.';return;}}
    else step++;
    renderWizard();
  });
  // Atualiza tamanho sugerido quando o usuário escolhe combos manualmente, antes de iniciar o questionário.
  document.querySelectorAll('[data-size]').forEach(el=>el.addEventListener('click',()=>{if(step===0){choice.size=String(state.size);renderWizard();}}));
  renderWizard();
})();