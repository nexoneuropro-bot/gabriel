# NUTRICOMP | ORDEM ÚNICA PARA O CODEX PARCEIRO

**Atualizada em 27/11/2026 | Ler e executar sem solicitar que o responsável repita o planejamento**

> **Recomendação de modelo:** GPT-6.2 Sol com raciocínio **Medium**; Light para edição de texto/estilo e High apenas se um bug de backend/segurança resistir aos testes. **Não gastar saldo em Ultra por padrão.**
>
> **Objetivo final da tarefa:** entregar **UMA PR + UM LINK PÚBLICO DE PRÉVIA ONLINE** para aprovação, com (a) home mais premium e SEO, (b) demonstração interativa do painel de gestão completo, (c) portal operacional de cozinha, (d) acompanhamento do cliente e notificações, e (e) plano comprovável de implementação e instalação segura na HostGator. A prévia deve funcionar **sem autenticação real nem dados de clientes**, usando dados fictícios; distinguir claramente funcionalidades demonstradas de funcionalidades que dependem de backend e SMTP reais. **Não publicar no domínio oficial sem aprovação expressa.**

## 1. A fonte de requisitos é este próprio GitHub

Leia, nesta ordem, e não volte a pesquisar o que já está especificado:

1. [Briefing completo](NUTRICOMP_CODEX_BRIEFING_COMPLETO.md) — contexto, marca, regras comerciais, home e SEO.
2. [Painel de Gestão](NUTRICOMP_PAINEL_GESTAO_COMPLETO.md) — pedidos, clientes, catálogo, promoções, entrega e produção.
3. [Portal da cozinha](NUTRICOMP_COZINHA_RASTREIO_PEDIDOS.md) — URL fácil /cozinha/, busca por nome/número, status e auditoria.
4. [Notificações ao cliente](NUTRICOMP_NOTIFICACOES_CLIENTE.md) — e-mail, WhatsApp e acompanhamento por token.
5. [Contrato técnico](NUTRICOMP_CONTRATO_TECNICO.md) — PHP/SQLite/API, regras de segurança e lacunas.
6. [Progresso](NUTRICOMP_PROGRESSO.md) e [Sprint 0 já realizada](nutricomp-sprint-0/README.md) — preservar entregas e não recomeçar.
7. [AGENTS Nutricomp](../nutricomp/AGENTS.md) e [AGENTS HostGator](../hostgator/AGENTS.md).

**Código de referência no repositório NÃO corresponde com certeza à versão de produção.** Domínio oficial https://www.nutricomp.com.br/ está publicado e mantém pedidos pelo WhatsApp; não alterar esse site, seus arquivos, o SSL nem DNS. O ZIP PHP mais recente de catálogo/promoções **não está versionado nesta branch** e sua instalação não foi comprovada. Consultar somente páginas públicas para verificar compatibilidade; não alegar que banco, cozinha e avisos já funcionam.

## 2. Definição da demonstração a entregar

Criar uma **prévia navegável premium**, fiel ao conceito Nutricomp, que reúna telas e transições abaixo, usando componentes reaproveitáveis e dados 100% fictícios. O projeto deve ter um seletor discreto "Ver demonstração" para percorrer os papéis, sem conceder acesso administrativo em produção.

**Vitrine pública (home)**:
- Fundo gastronômico verdadeiro/ilustrativo de alta qualidade, em fade verde profundo, off-white/cobre, ingredientes reais, fotografias de marmitas sem isopor, narrativa de praticidade e afeto.
- Combo **30 x R$17 (R$510)** protagonista; 20 x R$19 (R$380); 10 x R$22 (R$220); tudo **350 g**. Avulsa tradicional R$25 e frutos do mar R$50 apenas como opções secundárias e condições aprovadas.
- CTA "Montar meu combo" e "Me ajude a escolher": escolher quantidade, objetivo, receber sugestão e ajustar pratos, levando seleção diretamente ao checkout.
- Motivos nutricionais acessíveis e responsáveis, sem alegação clínica/quantidade inventada de macros; treino/ganho de massa explicado por relação entre proteínas, aminoácidos, exercício e recuperação.
- Fluxo real atual usa WhatsApp, frete confirmado por equipe, CPF/CNPJ opcionais, CEP preenche endereço. Não enviar pedidos fictícios ao WhatsApp comercial durante demonstração.

**Painel da equipe (demo /gestao/)**:
- Visão geral, Pedidos, Cardápio, Promoções, Clientes, Produção/Entregas.
- Cadastrar prato de demonstração, bloquear e reativar; prato indisponível deixa de poder ser adicionado nos novos carrinhos; carrinho antigo precisa confirmar novamente disponibilidade.
- Criar promoção de demonstração com data/validade; preço final e economia corretos, sem modificar preço base.
- Pedidos fictícios com ID, status comercial, status cozinha, status logístico e status financeiro distintos. Solicitação não conta como compra e pagamento nunca é presumido.
- Clientes recorrentes e receitas mais pedidas com dados sintéticos, consentimento de marketing separado.

**Portal cozinha (demo /cozinha/)**:
- Busca por nome ou código público aleatório exemplo `NC-7K4P9Q` (gerado com RNG seguro no backend real).
- Quatro ações: **Recebido pela cozinha → Em preparação → Liberado → Enviado para agendamento de entrega**; fila logística recebe somente após liberação. Separar envio para agendamento de entrega realmente agendada.
- Produção com fotos pequenas, códigos e quantidades por receita, sem dados financeiros, endereço completo ou CRM.
- Em versão real, apenas login de cozinha e autorização server-side, com eventos/auditoria sem acesso público por nome ou número.

**Acompanhamento do cliente (demo /pedido/acompanhar/)**:
- Linha do tempo vinculada a pedido fictício. No real, link **privado com token aleatório longo**; código NC curto não é senha.
- Exibir conteúdo de e-mail transacional de status "Em preparação", "Liberado" e "Agendamento" e botão de WhatsApp para envio pela equipe (não alegar envio automático).
- E-mail automático futuro via SMTP PHP/PHPMailer + fila idempotente e testes na HostGator; WhatsApp 100% automático depende de Business Platform oficial, consentimento e aprovação prévia de custo. Jamais enviar mensagens reais na demo.

## 3. Escopo de SEO campeão (sem prometer primeiro lugar)

- Diagnosticar URLs canônicas, HTTPS/www, indexação da pasta /nutricomp-novo/, sitemap e robots; **/gestao/**, **/cozinha/**, demos e páginas privadas não indexáveis.
- HTML semântico e texto indexável; estrutura local útil para "marmitas congeladas de 350 g", combos e São Paulo, sem inventar cobertura de entrega, reviews ou informações nutricionais.
- Imagens WebP otimizadas, LCP/CLS/INP, mobile 360/390/768/1440, contraste, foco, CTAs e WhatsApp sem sobreposição.
- Entregar **top 10 ações SEO** com impacto/complexidade e evidência, diferenciando corrigido de apenas sugerido. Não mexer em produção.

## 4. Disciplina para gastar pouco saldo

1. **Uma sessão, um comando, mas execução por blocos pequenos**: inspecionar o mínimo necessário, reaproveitar a Sprint 0, criar prévia unificada, rodar testes, documentar, abrir PR. Evitar copiar grandes blocos ou refazer toda a stack.
2. Não usar API paga, serviço com mensalidade, crédito de imagem ou dependência de plataforma externa. Não instalar no cPanel. Não colocar dados pessoais, credenciais ou chaves no repositório público.
3. **Prioridade na primeira execução:** apresentar prévia online com todas as telas simuladas e o relatório SEO. Não construir backend completo antes da aprovação da experiência. O roteiro de implementação real vem em etapas pequenas após aprovação.
4. Quando aprovado o design, implementar backend em PRs separadas por dependência: **login/banco/pedidos → cozinha/status → cardápio/bloqueio → promoções → e-mail/rastreio/WhatsApp assistido → relatórios/entrega → homologação HostGator**.
5. Atualizar [NUTRICOMP_PROGRESSO.md](NUTRICOMP_PROGRESSO.md) após cada bloco, com os testes, caminhos e **uma única próxima ação**. Não declarar implementação concluída com base em mockups.

## 5. Link externo obrigatório para aprovação

**O usuário quer abrir uma URL em qualquer celular/computador, sem baixar e fazer upload.**
- Publicar **somente a prévia estática** em um endereço HTTPS público isolado **sem custos adicionais**, idealmente reaproveitando um projeto de preview já conectado (Cloudflare Pages) ou GitHub Pages se estiver disponível e autorizado. **Não presumir que o deploy está configurado**.
- O preview público NÃO pode expor dados reais nem dar acesso a um administrador real: simulação isolada com dados inventados, aviso discreto "Demonstração, dados fictícios", indexação desativada.
- Entregar 1 link da homepage + links diretos internos de **gestão-demo, cozinha-demo e acompanhamento-demo**, todos navegáveis.
- Se não houver permissão de deploy para obter URL pública, deixar os arquivos em branch/PR, documentar o bloqueio e solicitar somente a conexão necessária; **não fabricar uma URL e não afirmar que foi publicado**.
- Capturar imagem real do navegador nas dimensões desktop e celular. Não tratar imagem gerada como prova de navegação.

## 6. Critérios de aceite para o Codex parar e apresentar

- [ ] Prévia externa HTTPS acessível em navegador normal, sem login, **somente dados fictícios**.
- [ ] Homepage mais premium com preço unitário 30/20/10 bem apresentado e visual gastronômico.
- [ ] Navegação demonstrável: combo, seleção, ajuste, checkout de demonstração.
- [ ] Gestão demo: adicionar/bloquear prato e ativar promoção que muda vitrine demonstrativa.
- [ ] Cozinha demo: buscar por código/nome fictício e avançar status numa sequência legítima.
- [ ] Cliente demo: ver linha do tempo e prévia de e-mail/WhatsApp sem envio real.
- [ ] Duas capturas reais (mobile/desktop), legibilidade e clique testados.
- [ ] SEO auditado e 5–10 prioridades ranqueadas.
- [ ] Relatório claro **DEMO x IMPLEMENTADO REAL x PENDENTE**; nenhuma afirmação de backend persistente sem testes de servidor.
- [ ] PR e PROGRESSO atualizados, sem alterar o site oficial.

## 7. Texto exato do pedido para o Codex

> Abra este arquivo e siga a ordem já definida. Trabalhe com **Sol Medium**, sem Ultra inicialmente. **Quero UMA prévia HTTPS navegável** contendo home premium/SEO, gestão demonstrativa, cozinha demonstrativa e status do cliente, todos conectados por dados fictícios, sem download nem instalação local. Preserve o domínio oficial e não recomece a Sprint 0. Publique a demonstração em hospedagem gratuita já autorizada, se possível, e mostre links externos, screenshots reais, testes, diferenças entre demo e backend real, PR e checkpoint de progresso. Se não houver acesso para deploy, descreva o único bloqueio e entregue PR revisável; **não invente link**. Não comece implementação PHP/SQLite de produção antes de eu aprovar a demonstração. Priorize economia de saldo, simplicidade e experiência premium.
