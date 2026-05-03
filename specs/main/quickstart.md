# Quickstart: Revisao e Melhorias da Pagina de Novidades

## Objetivo

Orientar a implementacao futura da revisao da rota `/novidades` com TDD, mobile-first, acessibilidade e documentacao.

## Fluxo de Implementacao

1. Escrever testes falhando:
   - `tests/unit/features/novidades/novidades-page.test.tsx`
   - `tests/e2e/novidades.spec.ts`
   - `tests/accessibility/novidades.spec.ts`
2. Corrigir textos da pagina para portugues do Brasil sem caracteres corrompidos.
3. Adicionar metadata propria em `src/app/(store)/novidades/page.tsx`.
4. Extrair criterio de selecao de produtos quando necessario, mantendo apenas produtos ativos.
5. Adicionar estado vazio para nenhum produto elegivel.
6. Revisar CSS mobile, foco, espacamento, carrossel e CTAs.
7. Atualizar README.md e docs relevantes.
8. Rodar verificacoes.

## Comandos Planejados

```bash
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm test:e2e -- tests/e2e/novidades.spec.ts
pnpm test:a11y -- tests/accessibility/novidades.spec.ts
pnpm build
```

## Acceptance Checklist

- `/novidades` mostra hero, produtos ativos, catalogo, atendimento e WhatsApp.
- Textos estao em PT-BR com acentos corretos.
- Estado vazio orienta a cliente para catalogo e WhatsApp.
- Mobile nao tem sobreposicao ou texto estourado.
- axe nao encontra violacoes criticas na rota.
- README.md e docs/skills.md foram revisados.
