# Nutricomp | Handoff completo para Codex parceiro (27/11/2026)

> **Comece aqui.** Este é o ponto único de entrada para retomar a Nutricomp com **mínimo consumo de créditos**, sem pedir ao responsável para recontar o projeto. A documentação e o código de referência estão neste repositório. **Não instale, não sobrescreva produção e não contrate serviços pagos sem aprovação.**

## 1. Endereços e estado real

- **Site oficial já publicado, em produção:** https://www.nutricomp.com.br/
- **Área pública de teste antiga:** https://www.nutricomp.com.br/nutricomp-novo/ (não confundir com produção).
- **Repositório:** https://github.com/nexoneuropro-bot/gabriel
- **Branch de trabalho para este handoff:** `codex-nutricomp-handoff-2026`.
- **Código legado versionado de referência:** [nutricomp/](../nutricomp/) e [hostgator/](../hostgator/). Leia o [guia antigo](../hostgator/LEIA-ME-HOSTGATOR.md) apenas como histórico.
- **Documentação anterior:** [SEO e comercial](NUTRICOMP_SEO_E_COMERCIAL.md) e [configuração D1, se existir](NUTRICOMP_CONFIGURAR_D1.md). Estes arquivos podem estar desatualizados.
- **Registro de andamento deste handoff:** [NUTRICOMP_PROGRESSO.md](NUTRICOMP_PROGRESSO.md).

**ALERTA CRÍTICO DE VERSÃO:** o conteúdo da branch original `nutricomp-preview` **não corresponde necessariamente** à versão mais recente publicada na HostGator. Em 27/11/2026 foi preparado fora deste GitHub o pacote `NUTRICOMP_ATUALIZACAO_GESTAO_CARDAPIO_PROMOCOES.zip` (22 arquivos, PHP + SQLite + HTML/CSS/JS + imagens), mas sua instalação no servidor real NÃO foi confirmada e este ZIP NÃO está nesta branch. **Não tratar este repositório como espelho exato de produção.** Comece por comparar o HTML e os assets públicos do domínio com o código da branch. Não sobrescreva nada sem demonstrar compatibilidade. Se alguma fonte binária recente não puder ser recuperada online, informe a lacuna e desenvolva incrementalmente sobre a base existente, em vez de inventar que já foi sincronizada.

### Estado verificado ou informado
- O proprietário testou e confirmou manualmente o fluxo de selecionar combo, escolher pratos e enviar pedido formatado pelo WhatsApp no **domínio oficial** (capturas em conversa).
- Site oficial oferece combos 30/20/10, escolha assistida e checkout via WhatsApp.
- O painel de gestão `/gestao/` não estava instalado quando foi consultado em 27/11/2026 (404). Não alegar que há dados sendo registrados.
- A atualização de histórico, cardápio e promoções foi **prototipada e testada em simulação**, mas **não validada em PHP/SQLite da HostGator**.
- O proprietário não domina cPanel e **não quer contratar serviços pagos**. Criar passos reversíveis e sem jargão.

## 2. Produto e regras imutáveis

**Marca:** Nutricomp, comida fitness congelada; assinatura preferida **"Comida de verdade. A marmita é fit, mas o afeto é o mesmo."**. Comercial: comida saudável, saborosa, prática, congelada com cuidado; não simular entregas quentes.

**Padrão:** somente marmitas de **350 g** no catálogo e combos. Refeições maiores ou personalizadas: solicitar cotação com a equipe, nunca mostrar como produto padrão.

**Preços base atuais (não utilizar números de peças antigas):**

| Oferta | Unitário | Total | Hierarquia |
|---|---:|---:|---|
| Combo 30 | R$ 17,00 | R$ 510,00 | **Primeiro e mais destacado**, "melhor custo" |
| Combo 20 | R$ 19,00 | R$ 380,00 | Segundo |
| Combo 10 | R$ 22,00 | R$ 220,00 | Terceiro |
| Avulsa tradicional 1 a 9 | R$ 25,00 | quantidade × R$ 25 | Secundário |
| Frutos do mar avulso | R$ 50,00 | disponibilidade | Secundário |

Máximo **2 pratos de frutos do mar por combo**, conforme regra operacional a confirmar. Não misturar preço especial de fruto do mar com preço base sem regra clara. Valores com desconto devem informar total correto, datas e condições. Taxa de entrega calculada por distância/disponibilidade, **não embutida** no preço do combo.

**Fluxo de compra:** escolher 30/20/10 → pratos manuais OU "Me ajude a escolher" (sugere combinação sem escolhas repetidas) → ajustar quantidades → identificar cliente e entrega → escolher PIX antecipado ou pagamento no recebimento → gerar resumo no WhatsApp com pratos/quantidades/total, endereço e distância estimada quando disponível. Pedido fica pendente de confirmação da equipe, nunca alegar pagamento realizado ou compra confirmada automaticamente.

**Cadastro:** nome, WhatsApp válido e dados de entrega; CEP pode preencher logradouro/bairro/cidade/UF, mas número/complemento vêm do cliente. **CPF/CNPJ opcionais** e, se informados, validar formato/dígitos sem enviar ao WhatsApp e sem armazená-los no histórico. Consentimento de marketing **separado, opcional e desmarcado**. Não pedir dados de saúde.

**Entrega:** base operacional informada: Rua Comendador José Xavier Gouveia, 26, Bela Vista, São Paulo/SP. **Conferir CEP exato, geocodificação e endereço comercial antes de publicar coordenadas.** Se não houver rota real, usar km em **linha reta estimada** com rótulo inequívoco, ou "distância indisponível"; nunca fingir que é quilometragem rodoviária ou preço do frete. Atendimento/entrega mediante disponibilidade, opção de retirada. WhatsApp comercial conhecido: +55 11 93394-4302; Instagram institucional @nutricaonutricomp (revalidar antes de expor em cabeçalho/rodapé). CNPJ referenciado em arquivos anteriores: 24.548.092/0001-07; **validar dados cadastrais e titularidade antes de usar no PIX ou em schema**.

**ATUALIZAÇÃO DA EXPERIÊNCIA OPERACIONAL:** implementar também [portal da cozinha](NUTRICOMP_COZINHA_RASTREIO_PEDIDOS.md), com pedido identificado por código aleatório NC-XXXXXX, busca autenticada por número/nome e estados recebida pela cozinha → em preparação → liberada → enviada para agendamento, separados do status comercial/pagamento. A equipe consegue atualizar pelo celular/tablet sem acessar CRM. [Notificações por e-mail/WhatsApp e acompanhamento privado](NUTRICOMP_NOTIFICACOES_CLIENTE.md) são parte do fluxo: e-mail automático com SMTP validado, WhatsApp por botão assistido enquanto não houver API oficial, WhatsApp 100% automático só após aprovação de custos. **Não dar acesso por nome/número sem login e não declarar entrega agendada antes de a equipe confirmar.**\n\n## 3. Painel de gestão (MVP obrigatório, privado e seguro)

**LEITURA OBRIGATÓRIA ANTES DE IMPLEMENTAR O BACKEND:** [Especificação operacional completa do Painel de Gestão](NUTRICOMP_PAINEL_GESTAO_COMPLETO.md). Este documento aprofunda a experiência de cada tela e o comportamento do sistema em mais de 40 fluxos, incluindo visão geral, filas/status de pedido, pagamento registrado manualmente, produção, frete, CRM, receitas, bloqueio em tempo real, promoções datadas, segurança, LGPD e critérios de aceite. **O painel é o núcleo operacional, não um recurso futuro.**

**Mapa mínimo que o Codex deverá apresentar:** Visão geral | Pedidos | Cardápio | Promoções | Clientes, com acesso autenticado, interface premium responsiva, gravação no banco persistente e catálogo/preço/disponibilidade sincronizados com o site público. Ordem de execução por pequenas entregas está na especificação do painel.

O painel é **para equipe Nutricomp**, não para cliente final. O cliente pode incluir/trocar/remover pratos dentro do pedido, mas não criar receitas no catálogo.

### Módulo A: solicitações e clientes
- Salvar pedido em servidor com ID e idempotência, timestamp de São Paulo, nome/WhatsApp, endereço, combo, composição, preço base, desconto aplicado (snapshot), estimativa de km, pagamento escolhido, consentimento de marketing.
- Diferenciar **solicitação**, **confirmado**, **entregue** e **cancelado**. Histórico de compras e frequência de recompra contam apenas pedidos **confirmados/entregues**; nunca contar simples cliques ou mensagens encaminhadas como compra.
- Pesquisar por WhatsApp, consultar pratos mais pedidos por cliente e exportar CSV com acesso restrito e proteção contra fórmula injetada no Excel.
- Restringir e permitir exclusão/retenção de dados conforme política LGPD e necessidade operacional; não exportar documentos ou informações clínicas.
- Caso banco esteja indisponível, **preservar o pedido por WhatsApp** de forma honesta, avisando que o histórico não foi registrado.

### Módulo B: cardápio dinâmico
- CRUD de pratos: código único, nome, descrição, categoria, ingredientes informados/validados, indicadores (vegetariano etc.) somente quando corretos, foto com alt, ordem, status ativo/indisponível, motivo e janela de disponibilidade se houver.
- Edição restrita à equipe. Ao bloquear prato: remover do seletor de novos pedidos; no carrinho já aberto, validar novamente no servidor antes de finalizar e **pedir substituição**, sem deixar indisponível ser vendido.
- Quando prato novo for incluído, renderizar automaticamente no cardápio, na busca, no filtro e na sugestão quando aplicável.
- Ingredientes/alérgenos e alegações nutricionais exigem confirmação responsável; não inferir valores exatos de calorias/macros a partir de fotografia.

### Módulo C: promoções
- Criar/pausar campanha com nome, combo elegível, desconto em R$ ou % (conversão segura para centavos), início/fim no fuso de São Paulo, regras, limite aplicável e status.
- Promoção não altera preço base cadastrado; mostra valor final e economia real, sem dupla aplicação.
- Painel mostra campanhas ativas/futuras/expiradas; site só exibe as ativas.
- Servidor valida elegibilidade e preço, não confiar no total enviado pelo navegador.
- Promoções e ofertas dirigidas por WhatsApp só para contatos com consentimento voluntário verificável.

### Arquitetura preferida (sem custo novo)
- Preservar hospedagem **HostGator / cPanel**. PHP 8.x + PDO_SQLite se suportado no plano e comprovado em servidor. Banco **fora de public_html**, jamais acessível via URL.
- API HTTP JSON com rotas segregadas, validação no servidor, sessão segura, senha com hash, CSRF para admin, rate limit, cabeçalhos de segurança, sem segredos dentro de HTML/JS/Git.
- Antes de ativar: backup fora de public_html; validar permissões 755 para diretórios e 644 para arquivos quando apropriado; **nunca 777**.
- Diagnosticar disponibilidade real de PDO_SQLite, diretório persistente, proteção contra leitura remota, migrações idempotentes, HTTPS e backup/restauração testável.
- Nenhum dado de cliente real ou credencial deve ser colocado no repositório **público**.
- Integrações externas de geocodificação apenas com limites, aviso de indisponibilidade e privacidade; sem custos inesperados.

## 4. Direção de arte: versão premium a apresentar e demonstrar

**O cliente rejeitou repetidamente soluções muito minimalistas, cartões repetidos, emojis genéricos e fotografia isolada numa caixa.** Criar atualização **mais premium, mais gastronômica e mais convincente**, sem quebrar o fluxo funcional.

- **Primeira dobra:** fotografia ampla integrada ao fundo com fade e sobreposição de verde floresta, ervas/temperos, legumes e marmitas reais. Nada de isopor. Evitar aspecto de estoque falso ou comida servida quente no delivery.
- **Marca:** paleta verde profundo + off-white + cobre/dourado discreto; tipografia editorial com contraste e ótima leitura; ícones coerentes desenhados em SVG, sem emojis simplórios como base do design.
- **30 como herói de venda:** mostrar visualmente muitas marmitas e a ideia de refeições organizadas por semanas; **"30 marmitas de 350 g · R$ 17,00 cada"** deve ser compreendido em 3 segundos, total R$ 510 em segundo plano. Combo 20 com volume médio, 10 com amostra menor.
- **Narrativa no scroll:** ingredientes/preparo, refeição na copa do trabalho, rotina depois do treino, organização do congelador, entrega e cozinha real; cenas sem necessidade de mostrar rostos. Fotografias em background e composições com profundidade, não excesso de quadros de banco de imagens.
- **Assistente de escolha visível:** entrada própria com atenção visual, microfeedback e progresso simples: 1 quantidade → 2 objetivo → 3 sugestão → 4 finalizar. Sugira receitas predominantes e repetição viável à cozinha, ajustes opcionais sem recomeçar o fluxo.
- **Explicações motivacionais responsáveis:** treino/ganho de massa: proteínas oferecem aminoácidos úteis à manutenção/reparação muscular associadas ao treino e descanso, sem prometer hipertrofia individual. Low carb apenas por ingredientes confirmados; idosos com textura macia apenas como sugestão, sem prometer prevenção de engasgo, que requer avaliação profissional.
- **Mobile first:** 360/390/768/1440 px; CTAs visíveis, sem menu cortado, WhatsApp não sobreposto ao CTA, imagem responsiva e barra de progresso sem atrapalhar.
- **Fidelidade de marca:** imagens reais da Nutricomp têm prioridade; imagens generativas só como ambientação identificável e sem afirmar que são o produto literal. Não usar preços de artes antigas.
- **Entregar para aprovação ANTES de alterar a home oficial:** 1 prévia **navegável**, 2 screenshots (desktop e celular), resumo "antes/depois" e explicação breve da hipótese de conversão. Nada de apresentação vazia ou somente mockup.

## 5. SEO técnico e editorial, sem promessa enganosa de ranking

Objetivo: **fortalecer busca orgânica local em São Paulo para marmitas congeladas saudáveis e combos**, com páginas úteis e rápidas. Não garantir "primeiro lugar": isso depende de competição, relevância e indexação.

- Confirmar domínio canônico HTTPS com ou sem www, 301 consistentes, URLs internas absolutas quando necessário.
- Fazer `/nutricomp-novo/`, `/gestao/`, APIs e páginas de autenticação **não indexáveis**, sem bloquear recursos necessários ao Google; usar meta/noindex ou X-Robots-Tag para áreas públicas de teste; gestão deve exigir login.
- `robots.txt` e `sitemap.xml` somente URLs canônicas indexáveis; atualizar quando criar páginas realmente úteis. Não copiar sitemap da pasta de teste cegamente.
- Title/H1/description únicos, arquitetura semântica, textos úteis em HTML indexável (não esconder todo cardápio atrás de JS), alt genuíno em imagens, OG/Twitter card, favicon, breadcrumbs quando couber.
- Conteúdo de intenção real: "marmitas congeladas 350 g", "combos de 10, 20 e 30", "como conservar/aquecer" (instruções validadas), "entrega e retirada em São Paulo" (sem afirmar cobertura não verificada), "ingredientes/cardápio", perguntas reais dos clientes.
- Dados estruturados `Organization`/`LocalBusiness` coerentes com nome, endereço, contato e horário **confirmados**, `Product`/`Offer` somente produtos e preços reais; nunca reviews inventados, estrelas falsas, rankings falsos ou alegações clínicas.
- Imagens locais otimizadas WebP/AVIF, srcset, dimensões explícitas, preload controlado do LCP, lazy load fora da dobra, fontes e JS eficientes.
- Metas de desempenho para testar, não promessas: **LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1** em dados de campo P75 quando disponíveis; documentar Lighthouse/PageSpeed mobile e desktop antes/depois. Acessibilidade WCAG 2.2 AA, teclado, contraste, foco visível, prefers-reduced-motion.
- Medir com Search Console: cobertura, canônicas, sitemaps, impressões/CTR, consultas e posições; comparar por períodos razoáveis após publicação.
- Leituras oficiais do Google: [guia SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [canônicas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business), [Core Web Vitals](https://web.dev/articles/vitals/).

## 6. Código e lacunas: por onde começar

1. **Não supor** que os arquivos antigos em `hostgator/` são a versão de produção. Inspecionar `https://www.nutricomp.com.br/` e assets públicos, comparando com [index de referência](../hostgator/index.html) e [código inicial](../nutricomp/index.html).
2. A atualização mais recente foi preparada como ZIP com **22 arquivos**, cuja estrutura é: `index.html`, `assets/site.css`, `assets/site.js`, fotografias locais, `api/bootstrap.php`, `api/setup-hash.php`, `api/catalog.php`, `api/order.php`, `api/distance.php`, `api/.htaccess`, `gestao/index.php`, `privacidade/index.html`, `robots.txt`, `sitemap.xml`. **Não está sincronizada no GitHub**: esse manifesto é referência para reconstrução/migração, não afirmação de conteúdo existente.
3. Solicitar recuperação do código original apenas **se absolutamente necessário e depois de tentar** o repositório e o site online. A pessoa não deve baixar ou subir arquivos manualmente para uma simples proposta.
4. Não colocar chave de ativação, acesso ao cPanel, dados reais de clientes ou credenciais de APIs no repositório. Não expor qualquer `setup` sem autenticação e proteção contra abuso.
5. Quando existir backend funcional e aprovado, separar conteúdo estático do estado operacional no servidor. Não editar arquivos de cliente/SQLite na branch pública.

## 7. Instrução de execução com **saldo limitado**

**O Codex deve trabalhar uma tarefa pequena por vez; entregar progresso verificável e parar. Não iniciar refatoração ampla nem explorar ferramentas sem necessidade.**

### Sprint 0: auditoria + proposta premium/SEO (prévia já entregue, validação visual pendente)
A primeira prévia navegável e uma auditoria SEO já constam em [docs/nutricomp-sprint-0/](nutricomp-sprint-0/README.md). **Não refazer esse trabalho do zero**. Escopo remanescente: revisar a prévia, obter screenshots reais mobile/desktop, verificar navegação responsiva e propor melhorias somente onde necessárias. **Não mexer em checkout, banco, preço, ou domínio**. Critérios: hero completo, 30/20/10 com preço correto, imagens fiéis, CTA funcional, sem rolagem horizontal no celular; comparar antes/depois. Registrar em `docs/NUTRICOMP_PROGRESSO.md`.

### Sprint 1: pedidos e distância
Uma PR separada, com API testada: pedido idempotente registrado no SQLite fora da raiz pública, admin com login, status de pedido, km aproximado etiquetado como linha reta e WhatsApp como fallback. Testar com dados fictícios e comprovar `pdo_sqlite` antes de considerar deploy. Nenhum pedido real deve ser disparado nos testes.

### Sprint 2: gestão de cardápio e promoções
CRUD administrativo, status ativo/inativo, validação da seleção no servidor, promoções por período com preço calculado no servidor, saída JSON pública sem PII, histórico/CSV protegido. PR pequena com regressões de 10/20/30 e consentimento.

### Sprint 3: publicação segura
Somente com autorização explícita, backup/rollback documentado, teste em `/nutricomp-novo/`, acesso do painel privado, teste de gravação/consulta real (fictício), permissão no cPanel, então promover à raiz e validar links, SEO, pagamentos informativos e WhatsApp.

**Toda sprint termina com:** arquivos alterados, testes executados e resultados reais, pendências, URLs de prévia e próxima única tarefa. Se atingir limite de uso, escrever progresso e PARAR, sem pedir para repetir todo o projeto.

## 8. Mensagem de arranque pronta para o Codex

> Leia este documento inteiro, a [especificação do painel](NUTRICOMP_PAINEL_GESTAO_COMPLETO.md) e o progresso real em [Sprint 0](nutricomp-sprint-0/README.md). Trabalhe na branch `codex-nutricomp-handoff-2026`. A Sprint 0 já tem prévia e auditoria; termine **somente as validações visuais pendentes** antes de iniciar a Sprint 1A do painel. Não use credenciais, serviços pagos, nem altere a HostGator. Mostre uma **home premium e mais persuasiva** que respeite nossa referência original, com prévia navegável e duas capturas, além de 5 a 10 prioridades SEO reais. Não prometa primeiro lugar no Google. Preserve as regras 350 g, preços 30/20/10 e fluxo de pedido existente. Ao fim, registre o que foi feito em `docs/NUTRICOMP_PROGRESSO.md`, testes e um único próximo passo. **Evite desperdiçar o saldo do Codex.**

## 9. Segurança, publicação e critérios de aceite

A aprovação comercial cabe à equipe Nutricomp. Não publicar, alterar preço, iniciar marketing, ativar PIX, mexer em DNS ou consultar dados reais sem autorização específica. Criar protótipos em branch e caminhos isolados; guardar banco privado fora de `public_html`, não expor logs/erros. Fazer backup e ter rollback testável antes de migrar.

**Critérios para chamar a entrega de pronta:** (1) visual desktop/mobile revisado e aprovado, (2) SEO e schema sem dados falsos, (3) combo/assistente/checkout sem regressão, (4) prato bloqueado rejeitado também no servidor, (5) promoções corretas e datadas, (6) pedidos persistidos no servidor real quando ativado, (7) nenhuma credencial exposta, (8) guia simples de publicação e reversão.

---

**Responsável técnico pela implementação:** Codex parceiro. **Orientação e aprovação:** responsável Nutricomp. Não confundir protótipo verificado em simulação com implantação validada em produção.
