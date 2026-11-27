# Nutricomp | PROGRESSO do Codex

**Criado em 27/11/2026.** Este arquivo é o checkpoint para economizar saldo e evitar recontar histórico.

## Estado de referência

- [x] Briefing consolidado no GitHub.
- [x] Regras de segurança para edições em `nutricomp/` e `hostgator/`.
- [x] Site oficial Nutricomp publicado e checkout WhatsApp validado manualmente pelo proprietário.
- [ ] Confirmar qual commit corresponde ao código da produção. **A branch original não é espelho confirmado da HostGator.**
- [ ] Sprint 0: auditar home, produzir prévia premium com imagem de comida ao fundo + versões desktop/mobile + auditoria SEO.
- [ ] Sprint 1: implementar e testar histórico de pedidos e km estimado na HostGator com banco privado.
- [ ] Sprint 2: cadastrar/bloquear pratos e campanhas promocionais no painel com validação no servidor.
- [ ] Sprint 3: backup, instalação controlada, reversão e validação em produção.

## Regra de trabalho
Uma sprint pequena por sessão. **Não implementar a próxima sprint sem validação da anterior.** Não consumir saldo com instalações pagas ou verificações repetitivas. Não publicar sem aprovação.

## Campos para registrar a PR atual
- Sprint:
- Objetivo em uma frase:
- Arquivos alterados:
- Prévia / screenshots:
- Testes feitos e resultados:
- Pendências reais:
- Próxima única ação:
- Commit / PR:

## Testes básicos de aceite
- Combo 30/20/10 e totais corretos; avulsas secundárias.
- Fluxo "Me ajude a escolher" mantém seleção no checkout.
- Pedido WhatsApp não revela CPF/CNPJ.
- Promoção calculada no servidor, com vigência; prato bloqueado nunca vendido.
- Painel com login e dados guardados fora da raiz web; histórico de confirmados diferente de solicitações.
- 360 e 390 px sem rolagem lateral, foco de teclado, sem sobreposição de botões.
- SEO técnico sem indexar painel/preview e sem dados inventados.