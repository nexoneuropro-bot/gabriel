# Regras para arquivos HostGator

- Leia [handoff Nutricomp](../docs/NUTRICOMP_CODEX_BRIEFING_COMPLETO.md) e [contrato técnico](../docs/NUTRICOMP_CONTRATO_TECNICO.md) primeiro.
- Este diretório é um pacote **histórico**. O domínio oficial pode ter build mais novo que o GitHub. **Não copiar estes arquivos cegamente para public_html**.
- Antes de qualquer deploy: confirmar backup fora de public_html, revisão de caminhos da aplicação, rotas relativas, permissões do cPanel, PHP/PDO_SQLite e rollback.
- Não publicar .sqlite, dumps CSV com PII, .env, senhas, código privado de ativação ou chaves secretas. Verificar arquivos ocultos e .htaccess antes de extração.
- Mudança para `/nutricomp-novo/` deve isolar o banco de testes para não contaminar pedidos reais.
- Alterar produção somente após autorização expressa, diffs revisados e testes no domínio de teste.
- Respeitar LGPD, não guardar CPF/CNPJ, separar opt-in de marketing e preservar WhatsApp como fallback.
- Não sobrescrever pasta .well-known do certificado TLS/SSL.
- A cada edição, registrar progresso em `docs/NUTRICOMP_PROGRESSO.md`.