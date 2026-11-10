# Plano de SEO, conversão e acessibilidade · Nutricomp

Atualizado em 10/11/2026.

## Posição comercial

- A vitrine destaca, nesta ordem: 30 marmitas (R$ 510; R$ 17/un), 20 (R$ 380; R$ 19/un), 10 (R$ 220; R$ 22/un).
- Compare com a unidade tradicional a R$ 25: economia de R$ 240, R$ 120 e R$ 30, respectivamente, para 30, 20 e 10 unidades tradicionais. Não confundir essas economias com preços de frutos do mar.
- De 1 a 9 marmitas aparecem como solução **secundária**: tradicional R$ 25/un; frutos do mar R$ 50/un.
- Frutos do mar são limitados a 2 unidades dentro dos combos. Para tamanhos maiores ou personalizações: cotação.
- O pedido passa por pacote → pratos → dados de contato/endereço → confirmação. Pagamento apenas no recebimento.
- CPF/CNPJ é opcional; validação matemática não prova identidade. Histórico privado, pelo telefone, somente após ativar D1.

## Visual: padrão aprovado

- Preservar e buscar a marca original **NUTRICOMP | COMIDA FITNESS CONGELADA**.
- Fundo verde escuro, acabamento em cobre/dourado, fotografias reais de marmitas com aparência profissional e ingredientes verdadeiros.
- Ícones vetoriais lineares consistentes, sem emojis como sistema de identidade.
- Substituir foto de referência/stock da hero quando os arquivos originais aprovados estiverem disponíveis. Não apresentar imagens hipotéticas como pratos do cardápio.
- Reduzir carga de imagens, prever formato WebP/AVIF (após confirmação de licença/autoridade de uso) e dimensões para evitar instabilidade visual.

## SEO: o que já está preparado na prévia

- Título e meta description específicos de marmitas fitness congeladas 350 g e combos.
- Open Graph, linguagem pt-BR, links sociais oficiais conhecidos, organização e WebSite em JSON-LD.
- H1 único, H2 por seção, FAQ em conteúdo visível, textos acessíveis e alternativa estática com 22 pratos e os 3 preços sem depender de JavaScript.
- Links para WhatsApp/Instagram, labels acessíveis, foco visível, modo redução de movimento e menu de celular navegável por teclado.
- O domínio temporário **nutricomp-previa.pages.dev** é propositalmente **noindex**. A indexação só deverá ser liberada depois da aprovação no domínio comercial oficial.

## Para indexar corretamente

1. Definir a versão final do domínio **www.nutricomp.com.br** e configurar redirecionamento consistente entre versões com/sem www e HTTPS.
2. Migrar os arquivos para o domínio oficial e atualizar canonical, URL de Open Graph, Organization e WebSite. **Não** deixar URLs de preview em propriedades públicas do site final.
3. No domínio oficial, substituir `noindex,follow` por `index,follow` após revisão de conteúdo, privacidade, imagens e regras de entrega. Remover qualquer bloqueio involuntário em robots.
4. Gerar sitemap.xml somente para páginas finais públicas; enviar no Google Search Console e validar domínio e cobertura.
5. Criar páginas indexáveis específicas dos combos de 30/20/10, com conteúdo útil e verdadeiro, sem duplicação artificial. Dados estruturados Product/Offer devem ser usados somente em páginas de produto que atendam às diretrizes do Google, com valores e condições atualizados e imagens reais.
6. Criar páginas editoriais úteis: como aquecer e armazenar com segurança (somente após validar instruções de embalagem), guia de escolha de porções sem promessas clínicas, menu detalhado com fotos verdadeiras e dúvidas de entrega.
7. Testar Core Web Vitals, responsividade, acessibilidade WCAG, contraste, navegação por teclado, toque e leitor de tela.
8. Verificar atividade do site, taxa de cliques em combos, início e conclusão de pedidos, pedidos cancelados e retorno de clientes, **sem rastreamento invasivo**.
9. Se a empresa atende um ponto físico, manter dados verdadeiros de nome, endereço e horário em canais locais. Não inventar área de entrega ou avaliações.
10. Criar OG image real com marca e marmita aprovada para compartilhamento em WhatsApp/Instagram.

## Requisitos operacionais antes de aceitar pedidos reais

- Ativar Cloudflare D1 Free e binding `DB`; definir secrets `CUSTOMER_HASH_KEY` e `ADMIN_TOKEN`, sem compartilhá-las nem colocá-las no repositório.
- Verificar `/api/orders` com `online: true` e testar um pedido fictício completo, além de acesso administrativo autorizado.
- Rever política de privacidade, retenção e exclusão, consentimento de ofertas e proteção anti-abuso.
- Confirmar os dados reais da empresa e condições de entrega; taxa de frete permanece sob confirmação.

## Referências técnicas

- Google Search Central: https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
- Google Search Central, Search Essentials: https://developers.google.com/search/docs/essentials
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- ViaCEP: https://viacep.com.br/
- Cloudflare Pages D1 bindings: https://developers.cloudflare.com/pages/functions/bindings/
