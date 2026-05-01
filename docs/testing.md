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

`pnpm test` executa unitários e integrações comuns, mas exclui
`tests/integration/rules/` porque esses testes dependem dos emuladores.
`test:integration` aceita ausência temporária de arquivos de teste fora de
rules. `test:rules` executa `vitest.rules.config.ts` dentro dos emuladores de
Firestore e Storage com `firebase emulators:exec`.

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

## Registro de Validação da Fase 3

- Red de adapters: `pnpm exec vitest run tests/unit/services/firebase-adapters.test.ts`
  falhou antes de existir `src/lib/firebase/client.ts`,
  `src/lib/firebase/admin.ts` e `src/lib/firebase/emulator.ts`.
- Red de roles: `pnpm exec vitest run tests/unit/security/roles.test.ts` falhou
  antes de existir `src/lib/security/roles.ts`.
- Red de rate limit: `pnpm exec vitest run tests/unit/security/rate-limit.test.ts`
  falhou antes de existir `src/lib/security/rate-limit.ts`.
- Red de Security Rules: `pnpm test:rules` falhou contra as rules deny-all em
  leitura de produto ativo, pedido próprio e permissões admin.
- Green de Security Rules: `pnpm test:rules` passou com 5 arquivos e 13 testes.
- Storage deny-all passou conforme decisão do MVP inicial.

## Registro de Validação da Fase 4

- Red de domínio/validators/sanitização: `pnpm exec vitest run tests/unit/domain/product.test.ts tests/unit/validators/product.schema.test.ts tests/unit/security/sanitize-public-fields.test.ts tests/unit/domain/category.test.ts tests/unit/validators/category.schema.test.ts tests/unit/domain/cart.test.ts tests/unit/domain/order.test.ts tests/unit/domain/user.test.ts tests/unit/domain/coupon.test.ts tests/unit/validators/coupon.schema.test.ts tests/unit/domain/review.test.ts tests/unit/validators/review.schema.test.ts tests/unit/domain/shipping.test.ts tests/unit/domain/payment.test.ts` falhou antes da implementação.
- Green da mesma suíte: o comando acima passou com 14 arquivos e 43 testes.
- Red complementar de schemas das entidades restantes: `pnpm exec vitest run tests/unit/validators` falhou antes da implementação com imports ausentes para `cart`, `order`, `user`, `shipping` e `payment`, além de falhas esperadas de centavos inteiros, sanitização e limites de domínio.
- Green complementar: `pnpm exec vitest run tests/unit/validators tests/unit/domain/shipping.test.ts tests/unit/domain/payment.test.ts tests/unit/domain/order.test.ts tests/unit/domain/review.test.ts` passou com 13 arquivos e 47 testes após implementar os parsers e ajustes de domínio.

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
