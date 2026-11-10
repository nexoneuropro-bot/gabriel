# Nutricomp · ativação do histórico de pedidos (plano gratuito)

Esta versão já contém:
- `nutricomp/index.html`: seleção e pedido (combos 10/20/30 ou 1 a 9 avulsas).
- `functions/api/orders.js`: entrada de pedidos e cálculo validado no servidor.
- `functions/_lib/model.js`: cadastro com CPF/CNPJ opcional, identificação protegida por telefone e tabelas.
- `functions/api/admin/customers.js`: relatórios privados de recompra e pratos favoritos.
- `nutricomp/admin/index.html`: painel de relacionamento e pedidos com endereços, após autenticação.
- `functions/api/admin/orders.js`: consulta protegida de pedidos e endereços de entrega.
- `nutricomp/privacidade/index.html`: informações sobre os dados.

## Antes de receber pedidos reais

1. No Cloudflare, abra **Workers & Pages → D1 SQL Database** e crie um banco chamado **nutricomp-pedidos** no plano Free. Não selecione um plano pago. Os limites gratuitos podem interromper as consultas quando atingidos.
2. Volte a **Workers & Pages → Pages → nutricomp-previa → Settings → Bindings → Add → D1 database**.
3. Nome da variável: **DB** (exatamente assim). Escolha o banco `nutricomp-pedidos`.
4. Em **Settings → Variables and Secrets**, cadastre como *secrets* de produção:
   - `CUSTOMER_HASH_KEY`: valor aleatório exclusivo e longo, com pelo menos 24 caracteres. **Nunca publique no GitHub nem compartilhe em mensagens.**
   - `ADMIN_TOKEN`: outra chave aleatória exclusiva e longa para o painel privado. Nunca a reutilize como senha pessoal.
5. Salve as configurações e faça **Redeploy** da branch `nutricomp-preview`. O sistema cria as tabelas `customers` e `orders` automaticamente na primeira gravação.
6. Verifique `https://nutricomp-previa.pages.dev/api/orders`. O resultado deve indicar `online: true`. Se indicar `online: false`, não use o formulário para pedidos reais.
7. Abra `https://nutricomp-previa.pages.dev/admin/` e informe `ADMIN_TOKEN` para consultar clientes e pratos favoritos. A chave é enviada no cabeçalho de autorização, nunca pela URL, e não é salva pelo navegador.

## Regras comerciais

- Combos em destaque comercial: 30 (R$ 510), 20 (R$ 380) e 10 (R$ 220).
- Pedido avulso como alternativa secundária: 1 a 9 marmitas, tradicionais R$ 25 por unidade e frutos do mar R$ 50 por unidade.
- 10: R$ 220; 20: R$ 380; 30: R$ 510. Porção padrão 350 g.
- Até 2 frutos do mar nos combos. Avulsas têm valor diferenciado e não são tratadas como combo.
- Porções maiores ou pratos sob medida exigem cotação.
- Pagamento somente no recebimento. Sem cobrança online.
- Pedido recebido tem status `solicitado`, e não `entregue`.

## Privacidade e segurança

- Validação dos dígitos de CPF ou CNPJ (incluindo os novos alfanuméricos) não comprova identidade ou titularidade.
- O CPF/CNPJ completo não é gravado no D1: apenas tipo e final do documento, quando fornecido.
- O telefone e o nome são armazenados para contato e acompanhamento do pedido.
- A opção de receber ofertas é separada, voluntária e deve ser respeitada.
- CPF/CNPJ é opcional e, quando informado, passa por validação matemática, sem comprovar identidade.
- O identificador HMAC é derivado do telefone para permitir histórico sem exigir documento.
- Para entrega são solicitados CEP, rua, número, bairro, cidade e UF; a consulta de CEP usa ViaCEP e os campos permanecem editáveis.
- Antes de uso comercial, revise a política de privacidade, defina prazo de retenção, procedimento de exclusão e controle de acesso para a equipe. Não compartilhe sua chave do painel.
- O endpoint de cadastro exige validações básicas, mas ainda se recomenda configurar proteção contra automações abusivas (como Turnstile e regras de segurança) antes de aceitar altos volumes.
