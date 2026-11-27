# NUTRICOMP | Especificação funcional do PAINEL DE GESTÃO
**Versão 1.0 — 27/11/2026 | Documento obrigatório para o Codex parceiro**

> **O painel administrativo é parte central do produto, não um complemento opcional.** A equipe deve conseguir operar a Nutricomp sem editar HTML, GitHub ou cPanel: cadastrar e suspender pratos, administrar promoções, receber e confirmar pedidos, planejar produção e entregas, enxergar histórico de compras e identificar preferências para ofertas consentidas. O cliente final só monta seu próprio pedido.
>
> **ESTADO ATUAL:** o site público funciona e o envio para WhatsApp foi testado pelo proprietário. A página /gestao/ retornou 404 na verificação pública de 27/11/2026. Existe pacote PHP/SQLite de protótipo fora do GitHub, mas a instalação e persistência na HostGator **não foram confirmadas**. Este documento descreve o comportamento desejado, não uma funcionalidade já publicada.

## 1. Resultado esperado e princípios de operação

1. **Uma operação simples e visual**, utilizável pela cozinha/atendimento no celular e no computador. Evitar aparência de sistema corporativo complexo. Priorizar poucos cliques, campos claros, linguagem comum e atalhos úteis.
2. **Fonte única da verdade:** alterações feitas pela equipe no painel devem atualizar automaticamente o cardápio, a busca, as recomendações, os preços promocionais e o checkout no site, sem republicação manual.
3. **O WhatsApp permanece importante**, mas não pode ser confundido com persistência de pedido: manter referência única e histórico no servidor. Solicitação enviada ≠ pedido aceito ≠ pagamento recebido.
4. **Controle real, sem falsos automatismos:** o site calcula estimativas de distância quando puder; o frete em reais, disponibilidade, pagamento e entrega só podem ser marcados como confirmados por uma pessoa autorizada, salvo se houver futuramente regras verificadas.
5. **Não contratar sistemas adicionais**. Preferir PHP + SQLite persistente (se comprovados na HostGator); sem assinatura de CRM, banco SaaS ou API paga; não comprometer estabilidade do site oficial.
6. **Privacidade desde o desenho:** dados mínimos de cliente, acesso restrito, consentimento separado de marketing e sem coleta desnecessária de CPF, CNPJ ou dados clínicos.

## 2. Mapa de navegação do painel

Acesso privado com login de equipe. Barra lateral no desktop e menu compacto no celular:

- **Visão geral** — resumo do dia, solicitações aguardando, pedidos confirmados, entregas e alertas de pratos sem disponibilidade; atalhos "Novo prato", "Ver solicitações" e "Nova promoção".
- **Pedidos** — fila, detalhes, confirmação, status, composição, valores, pagamento, endereço, distância/frete e preparação do resumo para a cozinha.
- **Cardápio** — pratos ativos, indisponíveis, em rascunho, pesquisa por código/nome, edição, foto, restrições validadas e organização das sugestões.
- **Promoções** — campanhas ativas, agendadas, vencidas e pausadas; descontos, valores finais por combo, validade e prévia no site.
- **Clientes** — busca por telefone, histórico, total de pedidos realmente confirmados, frequência, pratos favoritos e preferência de contato (consentimento).
- **Produção e entregas** — listagem simplificada de quantidades por receita e por data; pedidos a preparar, prontos e entregues; retirada ou entrega; taxa confirmada pela equipe.
- **Relatórios** — volume de solicitações, conversão para confirmado, marmitas por receita/combo, pratos mais procurados, recompra e CSV seguro.
- **Configurações** — dados da Nutricomp, horários/janela, endereço de saída, regras de entrega e retirada, conta(s) autorizadas, segurança, retenção e backup.

**MVP visual:** construir Visão geral + Pedidos + Cardápio + Promoções + Clientes. Produção, Relatórios e Configurações podem começar enxutos e evoluir após a persistência estar comprovada. Não implementar dezenas de telas fictícias.

## 3. Visão geral: o que a equipe deve ver em 5 segundos

Topo: saudação discreta, data/hora de São Paulo, indicador do estado do sistema (conectado / falha de gravação) e CTA "Ver pedidos".

Indicadores operacionais (não inflar números):
- Solicitações novas aguardando retorno.
- Pedidos confirmados para preparação.
- Marmitas a produzir (soma por receita dos pedidos confirmados).
- Pedidos prontos/para entrega.
- Entregas pendentes de confirmação.
- Quantidade de clientes recorrentes calculada apenas de compras efetivas.

Abaixo, uma lista priorizada por urgência, sem expor dados pessoais no dashboard público. Cada linha tem ID, nome abreviado, combo, valor, data, estado e botões "Abrir", "Confirmar" ou "Ajustar" conforme a permissão. Avisar pratos bloqueados que constam em cestas ainda não confirmadas.

## 4. Pedidos: fluxo operacional de ponta a ponta

### 4.1 Entrada
O formulário público mantém a experiência: 30/20/10 → escolher manualmente ou receber sugestão → revisar → contato + CEP/endereço → pagamento planejado → WhatsApp. A API tenta salvar o pedido com **ID único e chave de idempotência** antes de preparar a mensagem.

Cada solicitação contém minimamente:
- ID, origem (site/WhatsApp manual quando registrado pela equipe), data/hora de SP;
- Nome, WhatsApp normalizado, informações de entrega/retirada;
- Combo e quantidade total de marmitas 350 g, composição com códigos, nomes e quantidades, notas de preparo pertinentes;
- Objetivo escolhido para **sugestão alimentar**, se houver, sem inferir condição de saúde;
- Valores base, promoções aplicadas com snapshot, total proposto (frete em separado);
- CEP, distância e método da estimativa (em linha reta / indisponível), valor do frete somente após inserção ou confirmação da equipe;
- Forma pretendida: PIX antecipado ou pagar no recebimento; **pagamento não confirmado por selecionar a opção**;
- Consentimento específico para ofertas (boolean e registro de quando/como foi dado).

**Não armazenar CPF/CNPJ no histórico**, mesmo quando validados opcionalmente na interface. Não gravar dados bancários, informações clínicas ou diagnósticos.

### 4.2 Estados
- **Nova solicitação:** enviada pelo formulário; equipe ainda não aceitou.
- **Aguardando ajuste:** receita indisponível, frete/endereço a verificar ou falta de confirmação do cliente.
- **Confirmado:** equipe confirmou composição, preço, disponibilidade e forma/data de atendimento.
- **Em preparo:** cozinha iniciou a preparação.
- **Pronto:** embalado e apto à entrega/retirada.
- **Em entrega:** se aplicável, entrega em curso.
- **Entregue/Retirado:** operação concluída. Esta fase sustenta recompra e preferência.
- **Cancelado:** motivo administrativo registrado.
- **Pagamento:** campo separado, "não informado", "pendente", "confirmado" e "reembolsado", conforme registros reais da equipe, sem integração bancária simulada.

A ordem de mudança deve ser coerente e o registro de alteração deve guardar data/usuário. A equipe pode ajustar estados com justificativa sem apagar o histórico. Pedidos cancelados não entram nas vendas confirmadas.

### 4.3 Detalhes e ações
Ao abrir um pedido: cartão completo com receitas x quantidades, total de 350 g por unidade, valor base, desconto, frete separado, pagamento, contato, CEP, endereço, observações, data combinada e linha do tempo de status.

Ações essenciais:
- Confirmar ou solicitar ajuste ao comprador;
- Adicionar/retirar/substituir itens **antes de confirmar**, mantendo total do combo e refazendo preço;
- Confirmar ou alterar taxa de frete; nunca apresentar estimativa em km como preço real;
- Registrar manualmente pagamento e entrega com autorização;
- Gerar mensagem de atendimento via WhatsApp com ID e resumo, sem automatizar envio para cliente sem ação explícita;
- Gerar lista de produção por receita e quantidade para os pedidos confirmados;
- Reabrir leitura de histórico sem reescrever valores antigos.

**Falha de servidor:** mostrar mensagem transparente "seu pedido pode seguir pelo WhatsApp, mas ainda não foi salvo no histórico"; não declarar sucesso quando houve somente abertura de conversa.

## 5. Cardápio e disponibilidade: o coração da cozinha

### 5.1 Cadastro de receitas
Formulário **"Adicionar prato"** com campos:
- Código interno único (mantém compatibilidade com códigos já usados, como 2.1, 14.1, etc.);
- Nome curto e nome completo, descrição para venda, ingredientes confirmados, categoria/proteína e acompanhamento;
- Marcadores opcionais **validados**: vegetariano, sem carne, foco proteico, preferência por menor teor de carboidratos, textura macia. Não atribuir números de calorias/macros ou segurança de deglutição sem dados verificados por profissional;
- Foto verdadeira ou imagem ilustrativa com indicação e texto alternativo;
- Status, ordem de exibição e observação interna opcional;
- Se for fruto do mar, sinalizar regra de no máximo **2 unidades por combo**, preço/condição comercial a confirmar; prato que exige cotação não fica selecionável em compra automática.

Botões: **Salvar rascunho**, **Publicar no cardápio**, **Editar**, **Duplicar**, **Marcar indisponível**, **Reativar**, **Arquivar**. Exclusão definitiva somente com confirmação extra e sem destruir registros de pedidos passados.

### 5.2 Bloqueio operacional
Ao marcar "Indisponível" é possível informar motivo (falta de ingrediente/pausa da receita) e previsão opcional de retorno. Efeito imediato:
1. O prato permanece visível como "temporariamente indisponível" se útil para transparência, mas o botão para adicioná-lo fica desabilitado;
2. Novos pedidos e recomendações **não podem usar** essa receita;
3. Se um cliente deixou o carrinho aberto, o servidor rejeita a finalização com prato agora bloqueado e oferece substituições, sem perder o restante da seleção;
4. O painel sinaliza pedidos pendentes que contenham a receita. **Não modificar pedidos já confirmados sem ação da equipe.**

Cadastro/alteração feito pela equipe: deve sincronizar no site público por API, sem editar arquivos, sem reiniciar servidor e sem depender de programador. Cache de catálogo deve ter atualização curta e invalidação após edição.

### 5.3 Recomendações assistidas
A base de sugestões consulta somente os pratos ativos, com ingredientes conhecidos e categorias coerentes:
- **Dia a dia / variedade:** receitas distribuídas com repetição moderada;
- **Treino / ganho de massa:** opções com fontes de proteína destacadas, sem prometer resultados individuais;
- **Menos carboidratos:** basear em composição validada, sem dizer "low carb" sem parâmetros nutricionais claros;
- **Vegetariano:** apenas receitas realmente sem carne/peixe e com ingredientes conferidos;
- **Pessoa idosa:** somente sugestões de consistência mais macia quando justificáveis; não garantir segurança contra engasgo;
- **Refeições para almoço/noite:** variar conforme preferência e disponibilidade, sem excesso de perguntas.

Sistema distribui receitas em lotes repetíveis para facilitar produção, não obriga comprar uma unidade de cada. Cliente pode ajustar quantidades e trocar pratos até somar seu combo. Se houver poucas opções elegíveis, informar claramente, sem criar receita fictícia.

## 6. Promoções e preço

A equipe cria e gerencia promoções sem alterar o preço normal:
- Nome da campanha e mensagem curta;
- Combo elegível (30/20/10), público da oferta (geral ou consentidos, se houver campanha direcionada);
- Desconto em **R$ ou %**, validade por data/hora de São Paulo, ativação manual ou automática conforme agenda;
- Limites por pedido e combinações: **padrão não acumular promoções**, a menos que haja regra explícita aprovada;
- Status: rascunho, agendada, ativa, pausada, expirada; prévia de como aparece no site.

**Preços normais confirmados:** 30 × R$ 17 = **R$ 510**, 20 × R$ 19 = **R$ 380**, 10 × R$ 22 = **R$ 220**, avulsa tradicional R$ 25 (1 a 9), fruto do mar avulso R$ 50. Exibir primeiro o valor **por marmita**, depois o total. Todas padrão 350 g. Preços de frutos do mar em combos devem seguir regra de negócio confirmada, sem cálculos implícitos.

Exemplo de prévia administrativa: "Combo de 30 · R$ 17,00 cada → desconto de R$ 30,00 → total promocional R$ 480,00 (frete à parte)". O servidor calcula em **centavos inteiros**, identifica descontos elegíveis e grava snapshot no pedido. Proibir valores finais negativos, datas incoerentes e preços divergentes do checkout. Descontos encerrados somem automaticamente da vitrine e não alteram pedidos anteriores.

Ofertas por WhatsApp: registrar quem consentiu receber, oferecer **opt-out** simples e nunca disparar mensagens automaticamente só porque um cliente comprou.

## 7. Clientes, recompra e ofertas responsáveis

Um cliente recorrente é identificado principalmente por número de WhatsApp normalizado e revisável pela equipe (sem afirmar identidade civil). Ficha de cliente:
- Nome conhecido, WhatsApp, última compra confirmada, quantidade de pedidos confirmados/entregues, quantidade total de marmitas, combos usuais;
- Preferência por receitas, baseada em **pedidos efetivos**, com quantidade por código; não inferir preferência apenas da recomendação aberta;
- Histórico cronológico de pedidos, preços aplicados e situação;
- Endereço para entregas futuras somente se necessário e retido pelo período definido;
- Consentimento de ofertas e eventual retirada da autorização, com data de registro.

Ações: **Ver pedidos anteriores**, **Repetir seleção** (abre uma nova solicitação, sem pedido automático), **Preparar sugestão** com pratos ativos, **Copiar resumo para WhatsApp**, **Retirar consentimento** e **Excluir/anonimizar mediante solicitação válida** segundo política aplicável.

Sugestões comerciais: cliente que costuma pedir frango e patinho pode receber no painel uma proposta de combo com essas receitas, **apenas para revisão humana** e envio promocional condicionado ao consentimento. Não usar localização, idade, objetivos de saúde ou outros dados sensíveis para segmentação automatizada.

## 8. Produção, entrega e distância

### Produção
Visual "Mapa de produção" por dia com soma das unidades por receita **somente de pedidos confirmados**, exemplo:
- 12x código 2.1;
- 16x código 4;
- 8x código 14.1.

Exportação ou impressão legível para cozinha; filtrar por data, entrega/retirada, prioridade e estado. Reduzir complexidade: o painel não precisa fazer gestão de estoque de insumos na primeira entrega, mas precisa permitir **indisponibilidade manual**.

### Entregas
- Origem operacional informada: **Rua Comendador José Xavier Gouveia, 26, Bela Vista, São Paulo/SP**. Confirmar CEP e geocodificação antes de ativar cálculo;
- CEP preenchido pelo comprador pode sugerir logradouro, bairro, cidade e UF, mas número/complemento devem ser informados;
- Quando houver geocodificação suficiente: **distância estimada em linha reta (km)**, com etiqueta inequívoca, não rota de veículo; se indisponível, mostrar "não calculada";
- Valor do **frete em R$ é lançado/confirmado pela equipe**, conforme distância e disponibilidade, e aparece separado do combo. Não cobrar pelo site;
- Retirada local e janela de entrega configuráveis pela equipe (referência histórica 10h–18h, a confirmar);
- Enviar ao WhatsApp resumo com ID, endereço e km estimado **somente quando válido**, taxa a confirmar e etapa de confirmação humana.

Sem serviços de roteirização pagos por padrão; não dizer que calculou trajeto real se só tem distância geográfica.

## 9. Relatórios, indicadores e acompanhamento

MVP:
- Solicitações recebidas versus confirmadas, canceladas e entregues, por período;
- Faturamento **estimado** dos pedidos confirmados (separar recebido/comprovado);
- Pedidos por combo 30/20/10, quantidades por receita, receitas mais vendidas;
- Taxa de conversão **solicitação → confirmado**, separada do clique para WhatsApp;
- Clientes recorrentes, pedido médio, frequência média e prato preferido;
- Promoções: pedidos com código de campanha e descontos concedidos (dados reais, sem ROI inventado);
- Exportação CSV protegida (somente equipe autorizada, UTF-8 e neutralização de fórmulas).

Não inventar Google Analytics, relatórios de vendas anteriores ou dados de compras que só existem em conversas antigas do WhatsApp. Se desejar, implementar importação manual futura com revisão humana e marcação de origem, sem scraping de mensagens privadas.

## 10. Segurança, LGPD, manutenção e limites de acesso

- **Papéis (começar simples):** Administrador (tudo), Atendimento (pedidos/clientes/entrega), Cozinha (composição e produção, sem exportar dados de clientes). A etapa inicial pode ser 1 administrador + 1 operador sem infraestrutura de controle complexa.
- Login privado em HTTPS, senha com hash forte, sessão segura com flags Secure/HttpOnly/SameSite, timeout, proteção CSRF para ações, rate limiting, log de ações administrativas, validações server-side e mensagens de erro sem expor detalhes do banco.
- PHP/PDO_SQLite apenas após teste em HostGator. Banco persistente **fora da pasta public_html**; segredos nunca commitados. Diretórios 755 e arquivos 644 quando apropriado, nunca 777; migração com backup e rollback, não permitir download por URL de SQLite/logs/exportações.
- CPF/CNPJ opcionais são validados localmente quando informados, **não gravados no banco**. Não reutilizar dados de cliente real em ambiente de demonstração. Política de privacidade, base legal para cada uso, retenção e medidas de exclusão devem ser conferidas antes de produção.
- Catálogo público pode expor **somente** dados de produto/preço/disponibilidade, nunca PII. Toda edição e leitura de CRM deve exigir autenticação.
- **Ambiente de teste isolado:** não compartilhar banco real nem contatos de clientes com /nutricomp-novo/; preview deve ser noindex e não disparar pedido verdadeiro por padrão.
- Rotina de backup da base e restauração testada. Se não for possível comprovar salvamento confiável, não afirmar "pedido registrado".

## 11. Interface premium do próprio painel

O painel também merece o padrão Nutricomp:
- Fundo off-white ou verde muito escuro em áreas de navegação; cobre discreto para ações comerciais; fontes legíveis e **contraste AA**;
- Foto pequena e bem recortada do prato ao lado de código/nome; tags textuais de disponibilidade, não depender só da cor;
- Cards de KPI apenas onde ajudam a operar; listas/tabelas claras para pedidos (evitar excesso de gráficos);
- Confirmações para ações destrutivas; feedback "Prato bloqueado", "Promoção agendada" **somente após resposta confirmada do servidor**;
- Responsivo: operar no celular, botões acessíveis ao toque, filtros simples, pesquisa e texto sem truncar endereço/receitas;
- Não usar emojis genéricos para substituir ícones/ações; animações discretas e respeitar prefers-reduced-motion.

## 12. Critérios de aceite: teste operacional obrigatório

1. Criar um prato fictício na gestão → aparece na API e no cardápio público **após autorização de publicação**, com imagem/nome/código corretos.
2. Bloquear esse prato → some da escolha ativa/assistente → tentar finalizar carrinho aberto antes do bloqueio → servidor rejeita e oferece troca. Desbloquear → volta a aparecer.
3. Cadastrar promoção para combo 30, com início futuro → não ativa antes da data. Ativar → mostrar preço unitário, total e desconto calculados corretamente; expirar/pausar → retornar aos preços base sem modificar pedidos já realizados.
4. Simular dois POSTs com a mesma chave de pedido → **um único registro**, com ID; mensagem WhatsApp correspondente. Simular falha de banco → informar cliente e preservar saída WhatsApp, sem status falso.
5. No painel, confirmar uma solicitação fictícia; mudar para em preparo/entregue; comparar contadores e histórico. **Nova solicitação isolada não pode contar como compra.**
6. Abrir ficha com telefone fictício e confirmar preferências baseadas apenas em pedidos efetivos; exportar CSV após autenticação; tentativa anônima deve falhar.
7. Consultar CEP fictício válido → distância em linha reta claramente identificada; consulta sem resultado → "indisponível"; frete monetário não deve ser preenchido automaticamente sem regra aprovada.
8. Verificar autenticação, sessão, CSRF, injeção, limites de entrada, banco fora da web e logs privados. Nenhum arquivo de chave ou código setup sensível deve ficar publicamente acessível.
9. Validar mobile e desktop da gestão e do checkout; fotos WebP otimizadas, botões claros, sem scroll horizontal em 360/390 px.
10. Registrar manual de uma página: como cadastrar prato, bloquear, criar desconto, confirmar pedido, atualizar status e consultar cliente.

**Não publicar antes de testes com dados fictícios em banco de teste e aprovação explícita.**

## 13. Ordem econômica para o Codex (não fazer tudo de uma vez)

**Sprint 0 existente:** o Codex já produziu uma prévia premium e auditoria SEO em docs/nutricomp-sprint-0. A prévia ainda precisa de revisão visual e capturas reais. **Não repetir essa sprint do zero.**

**Sprint 1A (próximo backend mínimo):** confirmar PHP/PDO_SQLite na HostGator e construir autenticação + registro idempotente de solicitações + lista e status básicos com banco fora da raiz. Testar localmente antes de pedir deploy. **Entrega demonstrável:** um pedido fictício salvo uma vez e aparecendo no painel.

**Sprint 1B (comercial):** CRUD de pratos com publicação/bloqueio e sincronização do catálogo; checagem server-side no checkout. **Entrega demonstrável:** prato desativado não entra em pedido.

**Sprint 1C (promoções):** cadastro e vigência de campanha, cálculo seguro de total e desconto no servidor, snapshots. **Entrega demonstrável:** promoção inicia/expira no horário certo sem editar o preço normal.

**Sprint 1D (CRM + logística):** histórico e repetição de pedido, indicador de recompra, distância estimada, frete manual e lista de produção/CSV, respeitando consentimento. **Entrega demonstrável:** pedido confirmado alimenta relatório e cliente, e km não se confunde com preço.

**Sprint final (publicação):** backup, ambiente de testes isolado, revisão de segurança, testes reais em servidor sem dados reais, autorização e deploy com rollback. Sem custo extra.

Ao terminar cada sprint: registrar arquivos, testes reais e falhas, screenshot funcional, o que foi concluído e **uma única próxima tarefa** em docs/NUTRICOMP_PROGRESSO.md. Não gastar saldo fazendo refatoração estética simultânea ao backend.

---
**Resumo executivo para implementação:** A Nutricomp não quer apenas um catálogo bonito. Quer uma central simples que una venda assistida, atendimento via WhatsApp, gestão do que a cozinha pode preparar, preço promocional, entrega e relacionamento com clientes, com dados protegidos e sem cobrança adicional de serviços.