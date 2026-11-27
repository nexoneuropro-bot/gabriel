# Nutricomp | Portal da cozinha e rastreamento operacional dos pedidos
**Complemento funcional do Painel de Gestão | 27/11/2026**

> **Objetivo:** a cozinha acessa um link fácil, encontra rapidamente um pedido pelo **número público aleatório** ou **nome** e atualiza apenas as etapas que cabem à produção. O responsável/atendimento vê as mesmas atualizações em tempo real no painel de gestão. O cliente não recebe acesso ao painel de cozinha.

**Avisos ao cliente:** toda mudança de status gravada pode gerar e-mail automático e acompanhamento privado, ou mensagem de WhatsApp preparada para envio humano. Leia [notificações ao cliente](NUTRICOMP_NOTIFICACOES_CLIENTE.md). O envio WhatsApp 100% automático depende de integração oficial e aprovação de custos; não supor que wa.me envia sozinho. O trabalho da cozinha nunca deve falhar porque um e-mail falhou.\n\n## 1. Experiência que queremos

**Link de equipe sugerido:** \`https://www.nutricomp.com.br/cozinha/\` (**proposta, não está publicado**). Atalho salvo na tela inicial do celular/tablet da cozinha. A interface abre no login e em seguida numa **única tela operacional**, sem gráficos de faturamento ou configurações financeiras.

Tela:
- Cabeçalho **“Cozinha Nutricomp”**, data/hora local de São Paulo, contagem de pedidos prontos e em preparo.
- Busca grande **“Nome ou número do pedido”**. Exemplo: \`NC-7K4P9Q\` (fictício) ou \`Mariana\`. Normalizar acentos/caixa; resultados por nome somente para usuário autenticado e autorizado. Se houver nomes repetidos, mostrar várias correspondências com referência e data, **sem endereço/telefone completo**.
- Filtros simples: **Para preparar | Em preparação | Liberados | Aguardando agendamento | Concluídos**.
- Cartões compactos: **número, primeiro nome ou nome abreviado, data de produção/entrega combinada, 10/20/30 unidades e tabela de receitas com quantidades**. Destaques para observações de preparo realmente pertinentes, sem exibir dados pessoais desnecessários.
- Ação principal é um botão por vez: **“Marcar como recebido” → “Iniciar preparação” → “Liberar pedido” → “Enviar para agendamento”**. Mostrar confirmação clara depois da resposta **gravada** no servidor.
- Abrir detalhe e imprimir/copiar lista de preparo. Histórico das movimentações visível para a equipe.

### Exemplo fictício
\`NC-7K4P9Q\` · Mariana · 20 marmitas, 350 g cada
- 8× frango com legumes;
- 8× patinho com purê;
- 4× opção vegetariana.

**Status:** Em preparação. **Ação disponível:** “Liberar pedido”.

Nunca usar exemplos fictícios como pedido real ou afirmar quantidade de pedidos existentes.

## 2. Regras dos quatro status solicitados

O **status comercial** do pedido e o **status da cozinha** precisam ser separados:

- Um cliente conclui a seleção e envia pelo WhatsApp: **solicitação recebida pelo sistema**, ainda **não é pedido confirmado**.
- Somente após conferência/aceite da equipe o pedido passa a **confirmado**, ficando elegível à fila da cozinha.
- **Recebido (cozinha):** a equipe da cozinha assumiu a ordem já confirmada. Não equivale a “recebemos mensagem” nem garante pagamento realizado.
- **Em preparação:** início efetivo do preparo, após marcar recebido.
- **Liberado:** cozinha concluiu, conferiu composição e quantidade, refeição pronta/congelada/embalada conforme operação. **Não significa entregue nem coletado**.
- **Enviado para agendamento de entrega:** pedido foi encaminhado para a fila do atendimento/logística definir data, período e frete. **Não significa entrega agendada, motorista em rota ou mensagem enviada automaticamente ao cliente.** Se a retirada local já estiver escolhida, encaminhar para fila de **retirada**, sem inventar transportadora.

Depois disso, o **atendimento/logística** define e registra: **Agendamento confirmado → Em entrega / Disponível para retirada → Entregue / Retirado**, conforme o caso.

É permitido solicitar correção/reverter etapa **somente por perfil superior**, com motivo e trilha de auditoria, sem apagar atualizações anteriores. Não permitir pular etapas acidentalmente.

## 3. Número de pedido aleatório e busca segura

- Gerar **ID interno imutável** (UUID/ULID ou equivalente) mais um **número público curto** de fácil ditado, com prefixo \`NC-\` e 6 a 8 caracteres de alfabeto sem ambiguidades. Ex.: \`NC-7K4P9Q\`. O exemplo é ilustrativo.
- Criar usando gerador criptograficamente seguro no servidor (\`random_bytes()\` em PHP), verificar unicidade no banco e repetir na rara colisão. **Nunca derivar de CPF, celular, nome ou sequencial previsível**.
- O número público aparece no resumo do pedido, no WhatsApp e na ficha administrativa. Não é credencial de acesso: conhecer um número **não autoriza consultar dados do cliente**.
- Busca por nome ou número só após autenticação de equipe, consultas parametrizadas e com limitação de consultas. Exibir resultados mínimos necessários.
- Opcional futuro: link individual do pedido com token aleatório, assinatura/expiração e escopo para **um único pedido**, com revogação; **não implementar como link aberto irrestrito**. Preferir no MVP \`/cozinha/\` com login e pesquisa.

## 4. Papéis, privacidade e permissões

- **Cozinha:** apenas pedidos **confirmados** atribuídos à produção, código/descrição das receitas, quantidades, data combinada e observações de produção. Pode marcar as quatro etapas da cozinha. **Não pode** ler telefone completo, endereço de entrega completo, CPF/CNPJ, dados de pagamento, histórico geral de clientes, campanhas, senha/admin ou exportar CRM.
- **Atendimento:** consulta pedidos/composição/contato necessários, confirma solicitação comercial, revisa dados de entrega e agenda após liberação; acompanha em tempo real os quatro status.
- **Administrador:** configura acesso/perfis, pode corrigir status com justificativa e visualizar auditoria.
- Login individual sempre que viável; HTTPS, cookies \`Secure/HttpOnly/SameSite\`, CSRF, rate limiting, sessões com expiração, autorização server-side por rota e ação. Nenhum endpoint administrativo exposto sem autenticação. Não colocar tokens, senhas ou dados de clientes no GitHub público.
- Se houver necessidade de “link rápido para cozinha”, salvar o atalho da URL de login no celular; o navegador pode manter sessão segura conforme política. **Não substituir controle de acesso por um número de pedido adivinhável.**

## 5. Operação e rastreabilidade

- Cada ação de status grava \`order_id\`, \`from_status\`, \`to_status\`, \`actor_id\`, \`timestamp\` no fuso de São Paulo (armazenar UTC e apresentar \`America/Sao_Paulo\`), e motivo quando uma etapa for corrigida.
- Resposta do servidor determina a interface: não mostrar sucesso antes da confirmação da gravação. Em caso de falha, **não alterar visualmente para liberado**, mostrar “Não foi possível atualizar. Tente novamente”.
- Alterações sincronizadas para o painel de Pedidos da equipe; atualização automática leve via consulta periódica ou ao abrir/atualizar página, **sem necessidade de serviços pagos**.
- Usar máquina de estados explícita. Evitar duplo clique, atualização simultânea e ações concorrentes por versão/controle de conflito. A mesma ação repetida não deve criar eventos duplicados.
- A lista de produção de um pedido confirmado usa um **snapshot** dos nomes e quantidades aceitos no pedido; mudança posterior de cardápio/promoção **não altera ordens já confirmadas**.
- Quando liberado, permitir marcar “Enviado para agendamento” e criar/atualizar a **fila de logística** em uma única transação, sem duplicações. Nenhum WhatsApp automático será disparado sem integração e consentimento adequados.
- Diferenciar **status de cozinha**, **status de entrega**, **status financeiro** e **status comercial**. Nunca transformar “recebido na cozinha” em pagamento recebido.

## 6. Interface e acessibilidade

Visual premium no padrão Nutricomp: fundo off-white, detalhes verde profundo/cobre, tipografia legível e ícones lineares discretos. Mais foco nas informações práticas e menos decoração. Ações grandes para mãos ocupadas, alto contraste, texto que não depende só da cor, ordem lógica de teclado, confirmação de mudanças, responsivo 360/390 px e tablet. Mostrar indicador “Atualizado às HH:MM”. Não exigir instalar aplicativo: PWA/atalho opcional no futuro.

## 7. Contrato mínimo de dados/API (referência para o Codex, não implementação existente)

- \`orders\`: \`id\` interno, \`public_code\` único, \`commercial_status\`, \`kitchen_status\`, \`logistics_status\`, \`payment_status\`, \`confirmed_at\`, \`production_date\`, \`version\`, \`items_snapshot\`.
- \`order_events\`: \`id\`, \`order_id\`, \`actor_id\`, \`timestamp_utc\`, \`event_type\`, \`previous_status\`, \`new_status\`, \`note\`.
- \`GET /api/kitchen/orders?query=...\`: **somente autenticado como cozinha**; resposta com campos mínimos, paginação e limitação de busca.
- \`POST /api/kitchen/orders/{id}/status\`: body \`{next_status, expected_version}\`, autenticação e CSRF; servidor valida transição e grava evento.
- \`GET /api/logistics/queue\`: acesso atendimento/admin; listar ordens liberadas e enviadas ao agendamento.
- Formato final de URLs compatível com a HostGator/PHP e com o padrão API escolhido pelo Codex; os paths acima são **contrato funcional**, não rotas já disponíveis.
- Banco SQLite **fora de \`public_html\`**, somente após confirmar PHP/PDO_SQLite e permissões no servidor.

## 8. Testes de aceite com dados fictícios

1. Criar solicitação fictícia \`NC-...\`; **não aparece** na fila da cozinha até a equipe confirmar comercialmente.
2. Confirmar → aparece na cozinha; buscar pelo código e pelo primeiro nome → mesmo pedido, com resultados mínimos e sem telefone/endereço.
3. Tentar abrir sem login ou com usuário sem permissão → acesso negado. Número de pedido não funciona como senha.
4. Marcar recebido → em preparação → liberado → enviado para agendamento: cada etapa atualiza a lista, aparece no painel e gera **um evento por mudança** com data/autor.
5. Tentar pular de recebido para liberado → servidor rejeita; duplicar clique não duplica evento.
6. Depois de liberado, pedido aparece na fila de logística/retirada conforme modalidade. **Não assume agendamento, pagamento ou entrega confirmados automaticamente**.
7. Logar como cozinha → sem permissão para CRM, preços promocionais, pagamentos nem leitura do endereço completo.
8. Alterar cardápio depois da confirmação → pedido mantém snapshot de pratos e quantidades previamente acordados.
9. Simular indisponibilidade de banco → sem falso sucesso; usuário pode recuperar a operação.
10. Validar tela celular/tablet, teclado, foco, botões grandes e nenhum dado pessoal em screenshots, URL ou logs.

## 9. Implementação com pouco saldo (tarefa pequena, após base de pedidos)

**Não gastar saldo redesenhando toda a Nutricomp nem criando aplicativo móvel separado.** Depois de a Sprint 1A de autenticação/pedidos persistentes estar funcional, entregar uma **Sprint Cozinha** isolada com: código público aleatório, listagem/filtro/busca autenticados, detalhe, quatro status, auditoria e fila de agendamento. Não construir antes de ter pedidos e login reais. Usar componentes já existentes e documentar teste com pedido fictício. Preservar preço, checkout, catálogo, promoções e home. Commit e registro em \`docs/NUTRICOMP_PROGRESSO.md\`.

**Entrega exigida ao Codex:** prévia navegável do painel cozinha, screenshot mobile, fluxograma dos estados, testes sintéticos e link/rota de demonstração isolada. **Nenhuma mudança automática na produção sem aprovação.**
