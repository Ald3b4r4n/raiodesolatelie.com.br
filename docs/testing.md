# Testes

## Regra Central

Todo desenvolvimento deve seguir TDD:

1. Escrever teste Red antes da implementação.
2. Confirmar falha pelo motivo esperado.
3. Implementar o mínimo para Green.
4. Refatorar mantendo testes verdes.
5. Atualizar README e docs.
6. Rodar checks disponíveis antes de concluir.

## Ferramentas Planejadas

- Vitest para testes unitários e parte dos testes de integração.
- Testing Library para componentes React.
- Playwright para E2E.
- axe-core ou equivalente para acessibilidade.
- Firebase Emulator Suite e `@firebase/rules-unit-testing` para rules e
  integração com Firebase.

## Camadas de Teste

- Unitários: domínio, validadores, sanitização, rate limit, services puros.
- Componentes: renderização, acessibilidade, estados e interações.
- Integração: Firebase adapters, services, Server Actions/Route Handlers.
- Security Rules: Firestore e Storage condicional.
- E2E: home, catálogo, produto, carrinho, checkout, login, admin, busca e
  filtros.
- Acessibilidade: fluxos principais com teclado, foco, labels e contraste.

## Comandos Disponíveis

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:unit
pnpm test:integration
pnpm test:rules
pnpm test:e2e
pnpm test:a11y
pnpm test:coverage
pnpm test:smoke
pnpm format:check
pnpm build
```

`test:integration` e `test:rules` aceitam ausência temporária de arquivos de
teste até as fases de Firebase e domínio criarem os testes específicos.

## Registro de Validação da Fase 1

- Red: `pnpm exec vitest run tests/unit/security/env.test.ts` falhou antes de
  existir `src/lib/env/public.ts` e `src/lib/env/server.ts`.
- Green: o mesmo comando passou com 1 arquivo e 4 testes.
- `pnpm lint`: passou.
- `pnpm typecheck`: passou.
- `pnpm build`: passou com Next.js 16.2.4.

## Registro de Validação da Fase 2

- Red: `pnpm exec vitest run tests/unit/smoke.test.ts` falhou antes de existir
  `src/test/utils/smoke.ts`.
- Green: `pnpm exec vitest run tests/unit/smoke.test.ts` passou com 1 teste.
- `pnpm test:unit`: passou com 3 arquivos e 6 testes.
- `pnpm test:integration`: passou sem testes de integração ainda.
- `pnpm test:rules`: passou sem testes de rules ainda.
- `pnpm test:e2e`: passou com 1 teste Playwright.
- `pnpm test:a11y`: passou com 1 teste axe/Playwright.
- `pnpm test:coverage`: passou e gerou relatório em `coverage/`.
- `pnpm lint`, `pnpm typecheck` e `pnpm build`: passaram.

## CI

- Fase 2: CI básico/smoke para validar bootstrap, install limpo e scripts
  mínimos disponíveis.
- Fase 14: CI completo com lint, typecheck, unit tests, integration tests,
  Firebase rules tests, E2E, build, audit e validações finais.

Isso respeita a constitution porque o CI completo continua obrigatório antes da
conclusão da feature.

## Critérios Específicos do MVP

- Fluxos principais de carrinho devem cobrir pelo menos os cenários definidos na
  spec.
- Busca/filtro devem ter validação de resposta percebida em até 2s quando
  aplicável.
- Compra/carrinho devem ser avaliados para até 4 ações principais quando
  aplicável.
- Firebase Security Rules devem ter testes antes das rules definitivas.
- Rate limit deve ser testado nos endpoints/actions sensíveis.
