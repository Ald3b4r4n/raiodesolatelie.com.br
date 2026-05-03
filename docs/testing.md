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

## Registro de Validação da Fase 5

- Red de UI base: `pnpm exec vitest run tests/unit/components` falhou antes da
  implementação por ausência de tokens, componentes `ui` e `layout`.
- Green de UI base: `pnpm exec vitest run tests/unit/components` passou com 7
  arquivos e 16 testes após implementar tokens, controles, display, drawer,
  estados e app shell.
- Acessibilidade base: `tests/accessibility/ui-base.spec.ts` cobre viewport
  mobile, abertura do menu e verificação com axe-core.

## Registro de Validação da Fase 6

- Red de home, SEO e links sociais: `pnpm exec vitest run tests/unit/features/home tests/unit/seo/home-metadata.test.ts`
  falhou antes de existirem `src/features/home/HomePage.tsx`,
  `src/lib/config/store.ts`, `src/lib/seo/metadata.ts`, `src/app/robots.ts` e
  `src/app/sitemap.ts`.
- Green focado: `pnpm exec vitest run tests/unit/features/home tests/unit/seo/home-metadata.test.ts tests/unit/components/bootstrap-page.test.tsx`
  passou com 4 arquivos e 9 testes após implementar a home, os placeholders
  seguros, a configuração da loja e o SEO base.
- E2E mobile da home: `tests/e2e/home.spec.ts` cobre marca, CTA de catálogo,
  WhatsApp em modo pendente e destaques placeholder em viewport de celular.

## Registro de Validação da Fase 7

- Red de catálogo: `pnpm exec vitest run tests/unit/domain/product/search.test.ts tests/unit/services/product-catalog.test.ts tests/unit/features/catalog/catalog-ui.test.tsx`
  falhou antes de existirem a busca normalizada, o serviço e os componentes de
  catálogo.
- Green focado: `pnpm exec vitest run tests/unit/domain/product/search.test.ts tests/unit/services/product-catalog.test.ts tests/unit/features/catalog/catalog-ui.test.tsx tests/integration/firebase/catalog-read.test.ts tests/unit/features/home/home.test.tsx`
  passou com 4 arquivos verdes e 1 integração marcada como `skip` fora do
  emulador.
- O teste `tests/integration/firebase/catalog-read.test.ts` roda quando
  `FIRESTORE_EMULATOR_HOST` está disponível, para não quebrar `pnpm test` fora
  do ambiente de emuladores.
- E2E mobile do catálogo: `tests/e2e/catalog.spec.ts` cobre busca, categoria e
  disponibilidade com resposta percebida em até 2 segundos.

## Registro de Validação da Fase 8

- Red da fase: `pnpm exec vitest run tests/unit/domain/product/variant-selection.test.ts tests/unit/features/product/product-page.test.tsx tests/unit/seo/product-metadata.test.ts tests/integration/firebase/product-detail.test.ts`
  falhou antes de existirem a seleção de variações, o serviço por slug, a UI da
  página de produto e o SEO por item.
- Green focado: o mesmo comando passou com 4 arquivos e 10 testes após a
  implementação mínima da rota `/products/[slug]`, do serviço de detalhe, da
  seleção local de variações e da metadata por produto.
- E2E mobile da página de produto: `tests/e2e/product.spec.ts` cobre abertura do
  detalhe, seleção válida e CTA estrutural do carrinho.
- Acessibilidade da página de produto: `tests/accessibility/product.spec.ts`
  cobre a tela pública com axe-core.

## Registro de Validação da Revisão Visual do Storefront

- Red focado da revisão: `pnpm test -- --run tests/unit/features/home/home.test.tsx tests/unit/features/home/social-links.test.tsx tests/unit/features/catalog/catalog-ui.test.tsx tests/e2e/home.spec.ts`
  falhou antes da refatoração visual, da integração dos contatos reais e da
  reorganização dos assets.
- Green focado da revisão: os testes unitários de home, catálogo, produto,
  serviço e integração passaram após a refatoração comercial da interface.
- E2E da revisão: `tests/e2e/home.spec.ts`, `tests/e2e/catalog.spec.ts` e
  `tests/e2e/product.spec.ts` passaram validando hero, vitrine, filtros e CTA
  real de WhatsApp.
- Checagem visual manual complementar: a home foi aberta em `http://127.0.0.1:3000`
  com screenshot full page para confirmar presença visual de hero, vitrine,
  categorias e bloco social.
- Testes unitários atualizados cobrem:
  - links externos com `target="_blank"` e `rel="noopener noreferrer"`;
  - ausência do número cru de WhatsApp no header;
  - renderização de hero, vitrine, editorial e bloco social;
  - interação básica de select com Radix;
  - tabs comerciais da página de produto.

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
