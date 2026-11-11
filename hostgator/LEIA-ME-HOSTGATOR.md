# Nutricomp · pacote estatico para HostGator
Atualizado em 10/11/2026. Repositorio: nexoneuropro-bot/gabriel, ramo nutricomp-preview.

## O que copiar
Envie o CONTEUDO desta pasta hostgator/ para a raiz do dominio na HostGator (tipicamente public_html/ no cPanel). Nao mantenha hostgator/ como subpasta.
- index.html: pagina principal, combos, cardapio e checkout
- escolher/index.html: assistente em tres etapas
- privacidade/index.html: politica e dados pessoais
- .htaccess: configuracoes de Apache
- robots.txt e sitemap.xml: SEO do dominio oficial

## Antes da substituicao
1. Faca backup completo do site atual e de seus bancos. Nao apague o antigo sem backup.
2. Teste a exportacao em subdominio com raiz propria. Links internos sao absolutos (/escolher e /privacidade), portanto uma subpasta simples nao e teste suficiente.
3. Confirme o tipo de hospedagem HostGator. Certos planos usam Criador de Sites sem cPanel; a implantacao muda.
4. Teste no celular e computador os fluxos 30/20/10 -> selecao de pratos -> finalizar -> WhatsApp, preenchimento de CEP via ViaCEP, PIX antecipado e pagamento no recebimento.
5. Confira telefone (11) 93394-4302, Instagram @nutricaonutricomp, CNPJ 24.548.092/0001-07 e endereco Rua Comendador Jose Xavier Gouveia 26, Bela Vista, Sao Paulo, 01319-060.
6. Confirme SSL/HTTPS no dominio antes de apontar DNS, depois habilite redirecionamento HTTPS se necessario.
7. So substitua a versao em www.nutricomp.com.br depois da validacao final; entao confira Search Console, canonicas e indexacao.

## Funcionalidades da versao estatica
- Cardapio, selecao e assistente em JavaScript; nenhum pagamento e feito pelo site.
- O assistente encaminha o combo ja selecionado para a finalizacao na pagina principal.
- CEP consulta ViaCEP via internet. O numero do endereco deve ser preenchido pelo cliente.
- Pedido abre mensagem para WhatsApp; o cliente confirma o envio. Equipe confirma frete, disponibilidade e pagamento. Nao existe registro automatico nem numero de pedido gravado.
- CPF/CNPJ e opcional para PIX ou pagamento no recebimento. Quando preenchido, passa por checagem matematica, que NAO comprova titularidade. O documento nao entra na mensagem enviada pelo WhatsApp.

## Ainda NAO migrado
A pasta functions/ do repositorio original implementa Cloudflare Pages Functions e D1. Nao funciona automaticamente na HostGator e nao faz parte deste pacote. Historico automatico de clientes e pedidos, painel administrativo e estimativa de distancia de rota exigem backend integrado e seguranca/LGPD, por exemplo PHP + MySQL ou sistema externo. O pedido pelo WhatsApp continua disponivel.

## Imagens
As fotografias usadas para ilustrar temperos, pratos e rotina sao referencias de bancos gratuitos, nao imagens oficiais do cardapio Nutricomp. Dependem de URLs externas (Pexels); antes da publicacao final, recomenda-se baixar e armazenar copias otimizadas e autorizadas no proprio dominio. A imagem ilustrativa gerada no ChatGPT foi uma proposta visual, mas nao integra automaticamente esta exportacao.

## SEO
Esta exportacao inclui index,follow, rel canonical, robots e sitemap para www.nutricomp.com.br. A previa pages.dev permanece noindex para evitar duplicacao. SEO so produz efeito apos publicacao e indexacao em dominio oficial.
