# Nutricomp | Avisos de pedido por e-mail, WhatsApp e acompanhamento privado

**27/11/2026 — Especificação de uma funcionalidade planejada, não de algo já publicado.**

## Objetivo e regra principal

Quando a equipe muda o status do pedido pelo painel ou pelo portal da cozinha, o cliente pode receber a atualização no canal que escolheu. Separar sempre notificações de pedido das campanhas promocionais. A cozinha não acessa e-mail/telefone completo do cliente, somente o atendimento administra envios.

**Canais por viabilidade:**
1. **E-mail automático (MVP):** usando conta institucional e SMTP/PHPMailer da HostGator, somente depois de testar credenciais, disponibilidade, DNS SPF/DKIM, limites da hospedagem e entregabilidade. Requer e-mail válido, preferência de recebimento, fila e registro de falhas.
2. **WhatsApp em um clique (MVP):** botão no painel "Preparar atualização pelo WhatsApp", que abre conversa com mensagem preenchida. A equipe precisa pressionar Enviar. Nunca afirmar que houve envio automático apenas por abrir o link.
3. **WhatsApp totalmente automático (fase opcional):** somente via WhatsApp Business Platform oficial ou provedor autorizado, após confirmar disponibilidade, autorização de contato, requisitos de templates e eventuais cobranças por mensagem/categoria. Não ativar nem contratar sem aprovação explícita.
4. **Acompanhamento online:** link individual privado, com token aleatório forte, para o cliente ver etapas, data confirmada de entrega/retirada e contato. Número do pedido e nome não são senha. O acesso não pode revelar endereço completo, telefone ou dados de outros clientes.

## Preferências no checkout

Formulário simples: WhatsApp do atendimento (já existente), e-mail opcional, preferência de avisos de andamento (e-mail / WhatsApp quando realmente habilitado / nenhum aviso proativo), texto "Avisaremos sobre mudanças importantes neste pedido. Isso não ativa promoções". Consentimento de publicidade separado, opcional, desmarcado.

Não oferecer envio automático por WhatsApp enquanto a API oficial não existir. Em vez disso, explicar "Atualizações por WhatsApp enviadas pela equipe" e botão de acompanhamento. Não usar dados pessoais de testes no GitHub público.

## Eventos e mensagens

Cada transição de estado salva evento no banco e gera, quando habilitado, **no máximo uma notificação por canal**. Evitar avisos redundantes quando duas etapas mudam quase ao mesmo tempo.

| Evento gravado | Texto exemplo ao cliente |
| --- | --- |
| Solicitação recebida | "Recebemos sua solicitação NC-7K4P9Q. Vamos confirmar composição, disponibilidade e entrega." |
| Pedido confirmado pela equipe | "Seu pedido NC-7K4P9Q foi confirmado e entrou na programação." |
| Recebido pela cozinha | "A cozinha recebeu sua ordem e está organizando a preparação." (opcional; pode agrupar) |
| Em preparação | "Seu pedido NC-7K4P9Q está em preparação. Cada refeição está sendo cuidada com atenção." |
| Liberado | "Sua seleção foi liberada pela cozinha e está pronta para os próximos passos." |
| Enviado para agendamento | "Seu pedido foi encaminhado ao agendamento. Data e horário ainda serão confirmados pela equipe." |
| Entrega/retirada agendada | "Sua entrega/retirada está agendada para [data/período confirmado]." |
| Em entrega / pronto para retirada | "Sua encomenda está a caminho" ou "Está pronta para retirada" somente após atualização real |
| Entregue/retirado | "Pedido NC-7K4P9Q concluído. Obrigado por escolher a Nutricomp!" |
| Alteração, adiamento, cancelamento | Aviso objetivo, com orientação de atendimento, sem publicidade |

Não confundir **cozinha recebeu** com **pagamento recebido**, nem "enviado ao agendamento" com "entrega já agendada".

**Exemplo ilustrativo de e-mail:**

Assunto: Nutricomp | Pedido NC-7K4P9Q em preparação

Olá, Mariana! Seu pedido NC-7K4P9Q está em preparação. Nossa cozinha está organizando suas marmitas congeladas com cuidado. Acompanhe o andamento pelo seu link privado: [link seguro]. Enviaremos outra atualização quando a próxima etapa for confirmada. Nutricomp, comida de verdade com afeto.

Mariana e NC-7K4P9Q são exemplos fictícios.

## Infraestrutura mínima para e-mail confiável

- Servidor PHP com SMTP autenticado/TLS e biblioteca consolidada, de preferência PHPMailer. Credenciais fora do webroot, nunca no repositório público.
- SPF/DKIM/DMARC apropriados, testes autorizados de entrega e caixa de spam, política e limites de e-mails da HostGator.
- **Outbox/fila transacional**: registrar alteração e notificação pendente em uma transação; processador periódico por cron do cPanel quando disponível; tentativas com backoff e limite, sem bloquear a atualização de status. Uma falha de SMTP não reverte o estado da cozinha.
- Identificação única de mensagem composta de pedido + evento + canal, com restrição de unicidade no banco; reprocessar a fila nunca pode duplicar e-mails.
- Estados reais do envio: pendente, aceito pelo servidor SMTP, falhou, ignorado. Não prometer que cliente leu ou que mensagem foi entregue só pela aceitação SMTP.
- E-mail HTML e texto simples, leve e acessível, sem divulgação de detalhes sensíveis ou promoções.

## Link de acompanhamento

- Rota proposta: /pedido/acompanhar/; token próprio de 32 bytes ou mais gerado criptograficamente, armazenado preferencialmente como hash, com validade e opção de revogar.
- O código público do pedido (por exemplo, NC-7K4P9Q) **não autentica o usuário**.
- Página de status exibe somente número, etapas e entrega/retirada quando confirmada, sem telefone, endereço completo, histórico de outros pedidos ou dados financeiros sensíveis.
- HTTPS, Cache-Control no-store, X-Robots-Tag noindex, Referrer-Policy no-referrer, sem scripts analíticos ou fotos externas que vazem o token. Evitar registrar token em logs e testar vazamentos.
- Se o cliente perdeu o link, recuperar apenas após confirmação da posse do canal informado ou atendimento humano; **nunca liberar pelo nome e número curto**.

## Contrato de dados

Dados conceituais para implementação, não rotas já existentes:
- orders: public_code, email opcional, notification_channel, tracking_token_hash, tracking_expires_at.
- order_events: order_id, actor_id, previous_status, new_status, created_at_utc.
- notification_outbox: event_id, channel, recipient, state, attempts, next_attempt_at, sent_at, provider_id, error_class; índice único por event_id + channel.
- transaction e status salvos em SQLite fora de public_html; API publica somente o mínimo necessário.
- Preferência de notificações de pedido distinta de consentimento para ofertas publicitárias; permitir alterar a preferência quando solicitado.

## Testes de aceite

1. Pedido fictício com e-mail e preferência válida gera uma única notificação ao confirmar status, se SMTP estiver configurado.
2. Atualizar recebido → em preparação → liberado → enviado para agendamento gera registro cronológico por autor. Cada aviso é idempotente; clique duplo e job repetido não disparam mensagens duplicadas.
3. E-mail indisponível não impede mudança de status, mostra erro apenas à equipe e permite reprocessamento seguro.
4. Sem integração WhatsApp, botão só abre mensagem para a equipe revisar e enviar. Nada é transmitido automaticamente.
5. Token de status expirado/inválido não revela dados; nome e número de pedido sozinhos não permitem ver pedidos.
6. Preferência "sem notificações" respeitada; consentimento para marketing permanece distinto.
7. Cozinha não consegue ler contatos nem CRM; admin/atendimento visualizam estado da fila de envio sem exposição de segredos.
8. Não usar pedidos reais em testes. Confirmar HTTP/HTTPS e taxas do plano antes de ligar em produção.

## Implementação econômica para Codex

**Não refazer home ou SEO para implementar avisos.** Depois que o backend de pedidos e os status de cozinha estiverem validados, entregar em uma sprint curta: preferência de canal + notificações por e-mail via fila + link privado de status + botão WhatsApp preparado. Publicar somente depois de testar no servidor com dados fictícios e autorização específica.

WhatsApp totalmente automático é uma sprint separada e **condicional** à autorização de eventuais custos e ao acesso à plataforma oficial. Nenhum serviço pago sem aprovação.

Atualizar docs/NUTRICOMP_PROGRESSO.md e testes, sem modificar produção automaticamente.

**Referências de implementação:** https://suporte.hostgator.com.br/hc/pt-br/articles/30818482958483-Como-configurar-o-PHPMailer ; https://suporte.hostgator.com.br/hc/pt-br/articles/30822248903827-Quais-s%C3%A3o-as-regras-para-envio-de-e-mails ; https://faq.whatsapp.com/5913398998672934/?locale=pt_BR .
