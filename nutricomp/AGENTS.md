# Regras de trabalho do Codex: Nutricomp

1. Leia primeiro [briefing completo](../docs/NUTRICOMP_CODEX_BRIEFING_COMPLETO.md), [contrato técnico](../docs/NUTRICOMP_CONTRATO_TECNICO.md) e [registro de progresso](../docs/NUTRICOMP_PROGRESSO.md).
2. **Uma sprint por chamada.** Comece pela Sprint 0, exclusivamente revisão premium e SEO, com prévia isolada. Sem alteração de produção, DNS, pagamento, infraestrutura, banco ou APIs nesta primeira sprint.
3. O site **https://www.nutricomp.com.br/** é produção. O código nesta branch é legado de referência, não presumir equivalência com produção. Não substituir a raiz da HostGator sem autorização nova e backup verificável.
4. Economia de tokens e créditos: inspecione somente os arquivos relevantes, escreva uma hipótese e critérios de aceite antes de editar, use dependências existentes e mudanças mínimas. Evite pesquisas ou varreduras repetidas, reescritas totais e mudanças de stack.
5. Todas as regras comerciais devem permanecer corretas: 350 g; 30 por R$17/un (R$510); 20 por R$19/un (R$380); 10 por R$22/un (R$220); avulsa tradicional R$25; frutos do mar avulso R$50; no máximo 2 frutos do mar/combo sob regra de confirmação.
6. Privacidade e segurança: nunca incluir credenciais/chaves, CPF/CNPJ, endereços ou telefones reais de clientes em commits, screenshots, testes ou logs. Este repositório é **público**. Use dados totalmente fictícios nos testes.
7. O painel administrativo só pode ser acessível após autenticação e as alterações comerciais devem ser validadas no servidor. Nenhum QR code de pagamento ou PIX será processado no site.
8. Design obrigatório: verde profundo, cobre, off-white, comida real e ervas em background, 30 marmitas com apresentação de abundância, acessibilidade e microfeedback discreto. Sem isopor, emojis genéricos, promessas nutricionais sem análise.
9. SEO: sem promessa de #1 no Google, sem metadados ou reviews inventados; sitemap/canônicas indexáveis, noindex preview/admin, HTML semântico e desempenho mobile.
10. Ao terminar, rode testes adequados (PHP lint, JS, links, mobile, combinações de compra) e registre no progresso: arquivos alterados, comandos/resultado, o que não foi testado e próximo passo único. Pare antes de expandir o escopo.

**PR de demonstração:** deve trazer link ou arquivo de prévia navegável, screenshot desktop e celular, relatório curto de SEO priorizado. **Nunca publicar automaticamente.**