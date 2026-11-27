# Nutricomp | Contrato técnico e manifesto do pacote mais recente

Este documento descreve a arquitetura do **protótipo entregue em ZIP em 27/11/2026**, antes da sincronização com GitHub. **Não afirmar que esteja executando na HostGator.** É uma referência técnica para o Codex comparar e implementar com economia.

## Manifesto do último pacote gerado fora deste GitHub

Arquivo: `NUTRICOMP_ATUALIZACAO_GESTAO_CARDAPIO_PROMOCOES.zip` (22 entradas, cerca de 925 KiB).
SHA-256 conhecido: `145f5e97df40e92af1aff36c559633f6668f40fb8a6c37eff1f376b7936585dd`.

Estrutura esperada (caminhos relativos à raiz do site):
- `index.html`
- `assets/site.css`, `assets/site.js`, `assets/hero-ingredientes.webp`, `assets/ingredientes-detalhe.webp`, `assets/combo-10.webp`, `assets/combo-20.webp`, `assets/combo-30.webp`, `assets/cozinha-real.webp`, `assets/entrega-cuidado.webp`, `assets/refeicao-trabalho.webp`, `assets/favicon.svg`
- `api/bootstrap.php`, `api/setup-hash.php`, `api/order.php`, `api/distance.php`, `api/catalog.php`, `api/.htaccess`
- `gestao/index.php`
- `privacidade/index.html`, `robots.txt`, `sitemap.xml`

**O pacote acima foi validado por lint PHP/JS e testes simulados, mas sem conexão a banco real na HostGator.** Hash acima só serve para identificar a versão; nunca usá-lo como senha de instalação. **A chave privada original não deve entrar no GitHub público nem ser enviada para o Codex.**

## API esperada

### GET /api/catalog.php
Resposta pública JSON, sem dados pessoais:
- `ok: true`
- `updated_at: ISO8601`
- `dishes: [{ code:string, name:string, category:string, active:boolean, quote:boolean }]`
- `offers: { "10"?: offer, "20"?: offer, "30"?: offer }` (apenas promoções ativas)

O cliente deve carregar esta lista sem cache, filtrar `active` e excluir pratos sob cotação de pedidos automáticos. Ao falhar, não indicar falsamente que produto está disponível.

### GET /api/distance.php?cep=00000000
O cálculo original usa ponto de partida por CEP e uma consulta de geocodificação. Resposta positiva inclui `ok`, `available` e `km` com unidade km **em linha reta**, não frete nem km rodoviário. Se indisponível: resposta com `available:false`. Não fazer falsas aproximações quando um CEP não retorna coordenadas suficientes. Verificar geocodificação do endereço de origem antes do lançamento.

### POST /api/order.php (application/json)
Campos conceituais esperados:
- `request_id` único para idempotência, gerado via Web Crypto.
- `name`, `phone`, `qty` (10/20/30 no fluxo principal), `dishes` (códigos e quantidades, soma igual ao combo), `goal` (perfil escolhido), `delivery`, `address`, `cep`, `payment` (PIX antecipado ou no recebimento), `marketing` boolean, observações.
- Server-side: validar prato ativo, quantidade, combo, frete apenas indicativo, desconto vigente, identificador/idempotência e total recalculado do catálogo + preços base.
- Resposta: `ok`, `id`, `saved`, `status:"solicitacao"`, `price_total`, `promotion_title`, `promotion_discount`; nunca devolver dados de outros clientes.
- Falha de banco: cliente mantém opção de encaminhar WhatsApp, com aviso explícito de que **não registrou no histórico**.

### Painel /gestao/
- Acesso privado via sessão/cookie seguro, senha com `password_hash`, `password_verify`, CSRF.
- Estados de pedido: solicitacao → confirmado → entregue ou cancelado.
- Separar solicitação de compra na métrica de recompra.
- CRUD de pratos ativos/inativos e campanhas com vigência; confirmação de preço pelo servidor.
- Busca por telefone/ID, exportação CSV protegida com escape contra fórmulas, gestão de consentimento e retenção LGPD.
- **Nunca permitir cadastro/edição de cardápio pelo visitante.** Só edição do próprio pedido.
- **Não reutilizar o banco real na pasta de testes.** O protótipo original calcula pasta privada usando DOCUMENT_ROOT. Separar arquivos por ambiente e testar risco de colisão.

## Banco de dados privado (modelo de referência, sem impor implementação)

SQLite fora de `public_html` com tabelas:
- `settings(key,value)` (hash de senha/admin e configurações)
- `orders(id,request_key,created_at,updated_at,confirmed_at,status,customer,phone,qty,price_base,goal,dishes_json,delivery,address,cep,payment,marketing,distance_km,distance_label,note,promotion_id,promotion_title,promotion_discount,dishes_snapshot)`
- `dishes(code,name,category,active,quote,updated_at)`
- `promotions(id,title,description,combo,discount_cents,starts_at,ends_at,active,updated_at)`
- `limits(id,attempts,until)`.

Armazenar valores monetários **em centavos inteiros**, não decimais float, e criar migrações idempotentes. Promoção deve ter snapshot em pedido para alterações futuras não mudarem histórico. Índices para telefone/data, sem dados de identificação além dos necessários.

## Pontos de segurança e qualidade a verificar

1. A pasta de produção e a de teste não podem compartilhar banco sem segregação explícita.
2. O servidor deve ser a fonte da verdade para preço, promoção e disponibilidade. Em carrinho já aberto com prato bloqueado, informar e exigir substituição.
3. Autorização de marketing não pode ser herdada silenciosamente de compras anteriores; garantir registro do opt-in.
4. O modo de revisão visual não precisa de acesso a cPanel nem a clientes. Para testes, usar dados 100% fictícios.
5. Não expor PHP, SQLite, chaves ou logs no GitHub ou em URLs públicas.
6. Planos de deploy e rollback simples para cPanel, sem serviços pagos.

## Checklist mínimo de testes

- `php -l` em todos os PHPs.
- JS sem erros, CTAs, carrinho, assistente e WhatsApp.
- `GET catalog` devolve pratos corretos e sem PII.
- `POST order` aceita pedido válido fictício, devolve ID; enviar 2x mesmo ID não duplica.
- Bloquear prato no painel e tentar pedir no front aberto anteriormente → servidor rejeita.
- Agendar desconto 30 → somente vigente aplica; total é recalculado no servidor.
- Painel não acessível sem login; CSRF aplicado; banco inacessível por HTTP.
- Mobile 360/390, teclado, foco, contraste e SEO de URLs canônicas.
- Pedido real de cliente NÃO deve ser usado para testes.
