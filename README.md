# Nutricomp 2.1 | Prévia premium com assistente de rotina

Site demonstrativo público e independente da loja atual, com 350 g por marmita, combos de 10, 20 ou 30 unidades e finalização via WhatsApp.

## Prévia

- Visualizador de HTML hospedado por terceiro: https://raw.githack.com/nexoneuropro-bot/gabriel/main/index.html
- Repositório: https://github.com/nexoneuropro-bot/gabriel
- GitHub Pages (após ativação): https://nexoneuropro-bot.github.io/gabriel/

> O GitHub Pages não está automaticamente ativo apenas porque o código foi publicado. Ative-o em Settings > Pages > Deploy from a branch > main > / (root). Não altera www.nutricomp.com.br.

## Funcionamento

- Cada marmita do combo tem **350 g**. Combos 10 = R$ 220; 20 = R$ 380; 30 = R$ 510.
- Regra obrigatória em todos os fluxos: **máximo de 2 marmitas da categoria frutos do mar por combo**, independentemente do tamanho.
- O assistente **Me ajude a escolher** organiza uma sugestão de pratos com base no uso (almoço/jantar), objetivo culinário (praticidade, treino, mais legumes, menos arroz e massas, rotina de pessoa idosa), sabores e tamanho do combo. A sugestão não é prescrição nutricional.
- O cliente pode aplicar ou editar a seleção. WhatsApp recebe itens, quantidade, preço e observações; nenhum pagamento é processado no site.
- Itens suínos e vegetarianos do cardápio antigo estão marcados como **em validação**, indisponíveis para seleção e excluídos do recomendador. As fichas completas, ingredientes e fotos originais só devem ser adicionados após validação.
- Trocas de arroz/massa por legumes dependem de confirmação da Nutricomp. Não existem declarações automáticas de baixo carboidrato, teor de proteína ou efeitos sobre ganho de massa.

## SEO para produção

1. Retirar `<meta name="robots" content="noindex,nofollow">` **somente** na publicação final. Na prévia evita duplicidade com o domínio atual.
2. Usar URL canônica e domínio oficial; definir redirecionamentos 301 das URLs antigas com tráfego. Não divulgar novas páginas em resultados de busca antes da migração.
3. Criar páginas permanentes, indexáveis e com conteúdo original para **marmitas congeladas**, **combos de marmitas de 350 g**, **cardápio**, **entregas** e categorias reais; publicar receitas/fichas individuais verificadas.
4. Descrições precisas, títulos e H1 claros, imagens reais e otimizadas em WebP/AVIF, texto alternativo descritivo; não depender exclusivamente de JS para dados indexáveis. Servir ficha e cardápio já no HTML inicial, se possível.
5. Structured data `Organization` / `LocalBusiness` com telefone e localização **verificados**; `Product` / `Offer` em páginas próprias de cada combo/produto, com preço e política de disponibilidade atualizados. Não inventar avaliações.
6. Criar `sitemap.xml`, robots.txt adequados à produção e configurar Google Search Console, perfil da empresa e monitoramento. Conferir cobertura da área de entrega, frete, trocas e termos reais.
7. Medir Core Web Vitals no celular. Respeitar movimento reduzido, fornecer imagens dimensionadas, carregar imagens secundárias sob demanda e evitar vídeos pesados no topo.
8. Revisar linguagem nutricional e restrições com a nutricionista responsável. Conteúdo sobre low carb, diabetes, pessoas idosas ou ganho de massa deve ser educativo e não prometer tratamento ou resultados.

## Arquivos

- `index.html`: HTML com conteúdo, preços, catálogo e carrinho.
- `premium.css`: identidade visual, movimentos e ajustes de layout responsivo.
- `rotina.js`: assistente de rotina e sugestões de combos.
- `assets/`: imagens **ilustrativas** temporárias. Substituir por fotos reais antes de publicar a loja oficial.

## Privacidade e limitações

Os dados básicos do carrinho ficam no armazenamento local do navegador. A personalização do assistente roda no navegador. O cliente abre o WhatsApp com o resumo do pedido, mas precisa confirmar envio e aguardar confirmação da equipe. Não há integração com estoque, pagamentos ou banco de dados da operação nesta prévia.