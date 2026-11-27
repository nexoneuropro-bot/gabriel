# Nutricomp | PROGRESSO do Codex

**Criado em 27/11/2026.** Este arquivo é o checkpoint para economizar saldo e evitar recontar histórico.

- [x] Especificado [portal da cozinha e rastreamento](NUTRICOMP_COZINHA_RASTREIO_PEDIDOS.md) (ainda não implementado).\n- [x] Especificadas [notificações por e-mail/WhatsApp e link privado de status](NUTRICOMP_NOTIFICACOES_CLIENTE.md) (ainda não implementadas).\n- [ ] Implementar após backend seguro: portal cozinha → aviso por e-mail/fila + rastreio privado → WhatsApp assistido. Automação oficial WhatsApp só após autorização de custos.\n\n## Estado de referência

- [x] Especificação funcional detalhada do **painel de gestão**: [NUTRICOMP_PAINEL_GESTAO_COMPLETO.md](NUTRICOMP_PAINEL_GESTAO_COMPLETO.md).
- [ ] Planejar implementação do painel **em tarefas curtas**: autenticação/pedidos → cardápio/disponibilidade → promoções → clientes/produção/logística → publicação segura.

- [x] Briefing consolidado no GitHub.
- [x] Regras de segurança para edições em `nutricomp/` e `hostgator/`.
- [x] Site oficial Nutricomp publicado e checkout WhatsApp validado manualmente pelo proprietário.
- [ ] Confirmar qual commit corresponde ao código da produção. **A branch original não é espelho confirmado da HostGator.**
- [x] Sprint 0: prévia premium, auditoria SEO e capturas desktop/mobile entregues; aprovação comercial pendente.
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

## Sprint 0 | 27/11/2026 · Entrega para revisão

- Objetivo: revisar a home e priorizar SEO antes de editar produção.
- Arquivos: `docs/nutricomp-sprint-0/previa.html`, `docs/nutricomp-sprint-0/README.md` e este registro.
- Prévia e relatório: [Sprint 0](nutricomp-sprint-0/README.md). Prévia autônoma responsiva, com fotos públicas e finalização simulada. Nenhuma publicação.
- Testes iniciais: GETs públicos, comparação SHA-256, sintaxe JS e lógica de preços, seleção manual/assistida, resumo sem documentos e âncoras com DOM simulado.
- Continuação em 27/11/2026: revisão no navegador em 360/390/768/1440 px, sem rolagem horizontal da página. Hero, menu móvel, combos, assistente e resumo simulado revisados. Capturas [desktop](nutricomp-sprint-0/captura-desktop.jpg) e [celular](nutricomp-sprint-0/captura-mobile.jpg) registradas.
- Correções isoladas na prévia: foco mantido nos ajustes de quantidade e perfil, foco no título ao avançar etapas, contato flutuante oculto até 830 px para não cobrir controles.
- Aceite funcional observado: R$ 220/380/510 para 10/20/30, limite de dois peixes, 30 unidades sugeridas preservadas no resumo, marketing desmarcado e mensagem apenas local com dados fictícios. Skip link, Tab no assistente, Escape e retorno do foco verificados; noindex mantido. `node --check` passou.
- Pendências: aprovação da prévia; Lighthouse/Search Console e auditoria completa de acessibilidade não executados. ZIP administrativo segue fora do GitHub e commit de produção não identificado. Nada enviado à HostGator.
- Próxima ação única: responsável Nutricomp aprovar ou apontar ajustes nesta prévia antes de iniciar a Sprint 1.
- Entrega: commit nesta branch de handoff.
