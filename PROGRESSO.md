# Nutricomp — registro de continuidade

**Atualizado em:** 2026-11-13  
**Repositório examinado:** `nexoneuropro-bot/gabriel`  
**Origem da documentação:** branch `nutricomp-preview`  
**Branch desta proposta:** `docs/continuidade-nutricomp-20261113`

## Objetivo do projeto
Conforme o `README.md` da branch de prévia, esta base contém um site demonstrativo da Nutricomp para combos de marmitas de 350 g, personalização da rotina e encaminhamento do pedido pelo WhatsApp.

## Estado confirmado ou relatado
- **Verificado no GitHub:** o repositório e a branch `nutricomp-preview` existem.
- **Documentado no README:** há arquivos `index.html`, `premium.css`, `rotina.js` e diretório `assets/`; o README descreve a prévia e ressalva que ela é independente da loja atual.
- **Não verificado nesta missão:** execução local da aplicação, testes funcionais, versão em produção, sincronização com `www.nutricomp.com.br`, pedidos reais, cálculo de frete e persistência de histórico de compras.
- **Atenção:** informações comerciais no README da prévia podem diferir de decisões mais recentes. Não usar o README isoladamente para alterar preços ou publicar.

## Missão 001 — continuidade da documentação
**Escopo aprovado:** criar `AGENTS.md` e `PROGRESSO.md` em proposta isolada, sem modificar código funcional ou publicar o site.

### Alterações documentais propostas
- `AGENTS.md`: orientações enxutas para trabalhar com contexto mínimo, escopo explícito e verificações.
- `PROGRESSO.md`: este registro, distinguindo informações verificadas, documentadas e desconhecidas.

### Verificações e limitações
- **Verificado antes da alteração:** ambos os arquivos não existiam na raiz de `nutricomp-preview`.
- **Verificação pendente:** comparar a branch de documentação com `nutricomp-preview` e confirmar que apenas os dois arquivos foram adicionados.
- **Não executado:** build, testes de interface, verificação de pedidos ou deploy. São desnecessários para esta mudança exclusivamente documental.

## Pendências para decidir em outra missão
1. Confirmar qual código e ambiente representam a loja atualmente publicada.
2. Verificar se o cálculo automático de distância para entregas e o histórico de pedidos já existem na versão publicada.
3. Escolher **uma** alteração funcional prioritária, com critérios de aceite e testes, antes de iniciar o Codex.

## Próximo passo autorizado
Revisar somente esta proposta de documentação. Não fazer merge, deploy ou modificações funcionais sem autorização específica.
