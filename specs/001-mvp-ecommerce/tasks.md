---
description: "Task list for MVP inicial do e-commerce Raio de Sol Ateliê"
---

# Tasks: MVP Inicial Raio de Sol Ateliê

**Input**: Design documents from `/specs/001-mvp-ecommerce/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [quickstart.md](./quickstart.md), [contracts/](./contracts/)

**Tests**: Obrigatórios pela constitution v1.0.0. Toda implementação funcional começa por teste em estado Red, depois Green, depois Refactor.

**Organization**: Tarefas agrupadas por fases e user stories para permitir implementação incremental, validação independente e documentação por grupo funcional.

## Format

- **[P]**: pode rodar em paralelo porque toca arquivos diferentes e não depende de tarefas incompletas.
- **[US1]**: Descobrir Produtos no Celular.
- **[US2]**: Escolher Produto, Variações e WhatsApp.
- **[US3]**: Comprar com Carrinho e Checkout Inicial.
- **[US4]**: Administrar Produtos e Pedidos.
- **[US5]**: Login de Cliente e Dados Mínimos.
- **[US6]**: Cupons e Avaliações Iniciais.
- Cada tarefa informa tipo, dependências, skills recomendadas e critério de conclusão.

## Phase 0: Gates Iniciais Obrigatórios

**Purpose**: bloquear implementação até skills, documentação inicial e governança mínima existirem.

- [ ] T001 Consultar o catálogo `https://github.com/sickn33/antigravity-awesome-skills` e registrar candidatos em `docs/skills.md` (Type: docs; Dependencies: none; Skills: context7-auto-research, skill-scanner; Done: catálogo consultado e candidatos listados)
- [ ] T002 Avaliar segurança e escopo das skills candidatas em `docs/skills.md` (Type: security; Dependencies: T001; Skills: skill-scanner, logic-lens; Done: riscos e limitações documentados)
- [ ] T003 Instalar as skills aprovadas no projeto conforme documentação do catálogo em `.agents/skills/` ou local definido pelo catálogo (Type: config; Dependencies: T002; Skills: development, documentation, design-taste-frontend; Done: skills instaladas e verificáveis localmente)
- [ ] T004 Documentar em `docs/skills.md` nome, origem, motivo, ativação, data, limitações e tipos de feature de cada skill (Type: docs; Dependencies: T003; Skills: documentation; Done: matriz de skills completa)
- [ ] T005 Definir em `docs/skills.md` quais skills serão usadas por catálogo, produto, carrinho, checkout, Firebase, admin, cupons, avaliações, CI e deploy (Type: docs; Dependencies: T004; Skills: documentation, verification-before-completion; Done: uso por tipo de feature documentado)
- [ ] T006 Criar `README.md` inicial com visão geral, stack, status, comandos planejados, env vars planejadas, limitações e política de commit com autorização (Type: docs; Dependencies: T004; Skills: documentation; Done: README cobre seções mínimas da constitution)
- [ ] T007 Criar `docs/setup.md` com pré-requisitos, Node/pnpm, Firebase CLI, Vercel CLI opcional e setup local planejado (Type: docs; Dependencies: T004; Skills: documentation, development; Done: setup local reproduzível documentado)
- [ ] T008 Criar `docs/architecture.md` com estrutura planejada `src/app`, `components`, `features`, `domain`, `services`, `lib`, `validators`, `tests`, `firebase`, `docs` (Type: docs; Dependencies: T004; Skills: documentation, development; Done: responsabilidades por pasta documentadas)
- [ ] T009 Criar `docs/security.md` inicial com ameaças, mitigação, roles, secrets, minimização de dados, rate limit e primeiro admin (Type: docs; Dependencies: T004; Skills: documentation, logic-lens, varlock; Done: segurança base documentada)
- [ ] T010 Criar `docs/testing.md` com TDD Red -> Green -> Refactor, Vitest, Testing Library, Playwright, axe-core e Firebase rules tests planejados (Type: docs; Dependencies: T004; Skills: documentation, lambdatest-agent-skills; Done: estratégia de testes documentada)
- [ ] T011 Criar `docs/firebase.md` com Firebase CLI, emuladores, Auth, Firestore, Storage condicional, rules, indexes e console steps permitidos (Type: docs; Dependencies: T004; Skills: documentation, context7-auto-research; Done: fluxo Firebase reproduzível documentado)
- [ ] T012 Criar `docs/deployment.md` com Vercel preview/produção, variáveis, build, rollback e bloqueios por credenciais mockadas (Type: docs; Dependencies: T004; Skills: documentation, agentic-actions-auditor; Done: deploy planejado documentado)
- [ ] T013 Validar que `docs/skills.md`, `README.md`, `docs/setup.md`, `docs/architecture.md`, `docs/security.md`, `docs/testing.md`, `docs/firebase.md` e `docs/deployment.md` existem (Type: validation; Dependencies: T001-T012; Skills: verification-before-completion; Done: checklist inicial marcado em `docs/skills.md`)

**Checkpoint**: Nenhuma implementação de app começa antes de T013.

---

## Phase 1: Bootstrap do Projeto

**Purpose**: criar base Next.js App Router + TypeScript strict + pnpm sem features de negócio.

- [ ] T014 Inicializar projeto Next.js App Router com TypeScript em `package.json`, `src/app/layout.tsx`, `src/app/page.tsx` e `tsconfig.json` (Type: config; Dependencies: T013; Skills: development, context7-auto-research; Done: app inicial sobe localmente)
- [ ] T015 Configurar pnpm e lockfile em `package.json` e `pnpm-lock.yaml` (Type: config; Dependencies: T014; Skills: development; Done: instalação reprodutível por `pnpm install`)
- [ ] T016 Configurar TypeScript strict e aliases `@/*` em `tsconfig.json` (Type: config; Dependencies: T014; Skills: development; Done: `strict` habilitado e aliases resolvem)
- [ ] T017 [P] Criar estrutura de pastas `src/app`, `src/components`, `src/features`, `src/domain`, `src/services`, `src/lib`, `src/validators`, `src/test` (Type: config; Dependencies: T014; Skills: development; Done: estrutura criada conforme plan.md)
- [ ] T018 [P] Criar estrutura de testes `tests/unit`, `tests/integration`, `tests/e2e`, `tests/accessibility` (Type: config; Dependencies: T014; Skills: lambdatest-agent-skills; Done: diretórios de testes criados)
- [ ] T019 [P] Criar estrutura Firebase `firebase/firestore.rules`, `firebase/firestore.indexes.json`, `firebase/storage.rules`, `firebase/seed` com placeholders seguros (Type: config; Dependencies: T014; Skills: development; Done: arquivos Firebase versionáveis existem)
- [ ] T020 Configurar ESLint do Next.js em `eslint.config.*` ou `.eslintrc.*` e script `pnpm lint` em `package.json` (Type: config; Dependencies: T014; Skills: development; Done: `pnpm lint` executa)
- [ ] T021 Configurar formatter Prettier ou Biome em arquivo dedicado e scripts em `package.json` (Type: config; Dependencies: T014; Skills: development; Done: comando de format documentado)
- [ ] T022 Criar `.env.example` com variáveis públicas Firebase, secrets server-side, WhatsApp, redes sociais, `PAYMENT_PROVIDER=mock` e `SHIPPING_PROVIDER=mock` (Type: security; Dependencies: T014; Skills: varlock, documentation; Done: exemplo não contém secret real)
- [ ] T023 Criar `src/lib/env/schema.ts` para validação planejada de env vars públicas/privadas (Type: implementation; Dependencies: T016, T022; Skills: varlock, development; Done: schema de env tipado existe)
- [ ] T024 Configurar baseline Vercel em `vercel.json` somente se necessário e documentar ausência se não for necessário (Type: config; Dependencies: T014; Skills: agentic-actions-auditor; Done: baseline de deploy claro)
- [ ] T025 Atualizar `README.md`, `docs/setup.md` e `docs/deployment.md` com comandos reais do bootstrap (Type: docs; Dependencies: T014-T024; Skills: documentation; Done: docs refletem comandos criados)
- [ ] T026 Rodar `pnpm install`, `pnpm lint` e `pnpm typecheck` quando scripts existirem e registrar resultado em `docs/testing.md` (Type: validation; Dependencies: T014-T025; Skills: verification-before-completion; Done: resultado documentado ou bloqueio explícito)

---

## Phase 2: Test Infrastructure

**Purpose**: configurar ferramentas de TDD antes das features.

- [ ] T027 Configurar Vitest em `vitest.config.ts` e scripts `test`, `test:unit`, `test:integration` em `package.json` (Type: config; Dependencies: T026; Skills: lambdatest-agent-skills; Done: Vitest executa teste vazio/smoke)
- [ ] T028 Configurar Testing Library e setup de DOM em `src/test/setup.ts` (Type: config; Dependencies: T027; Skills: lambdatest-agent-skills; Done: render de componente smoke funciona)
- [ ] T029 Configurar Playwright em `playwright.config.ts` e script `test:e2e` em `package.json` (Type: config; Dependencies: T026; Skills: lambdatest-agent-skills; Done: Playwright instalado e configurado)
- [ ] T030 Configurar axe-core ou equivalente para acessibilidade em `tests/accessibility/a11y-smoke.spec.ts` e script `test:a11y` (Type: config; Dependencies: T029; Skills: lambdatest-agent-skills, design-taste-frontend; Done: smoke a11y planejado executa)
- [ ] T031 Configurar Firebase Emulator Suite para testes em `firebase.json` e scripts `firebase:emulators`, `test:rules` (Type: config; Dependencies: T019, T027; Skills: development; Done: emuladores configurados)
- [ ] T032 Criar helpers de teste em `src/test/factories`, `src/test/fixtures` e `src/test/utils` para produtos, variantes, pedidos, cupons, reviews e usuários (Type: implementation; Dependencies: T027; Skills: lambdatest-agent-skills; Done: factories importáveis em testes)
- [ ] T033 [P] Criar teste smoke unitário em `tests/unit/smoke.test.ts` que falha primeiro por falta de implementação de helper mínimo (Type: test; Dependencies: T027; Skills: lambdatest-agent-skills; Done: estado Red registrado)
- [ ] T034 Implementar helper mínimo em `src/test/utils/smoke.ts` para passar `tests/unit/smoke.test.ts` (Type: implementation; Dependencies: T033; Skills: development; Done: smoke unitário Green)
- [ ] T035 [P] Criar teste smoke de componente em `tests/unit/components/app-shell.test.tsx` para layout acessível base (Type: test; Dependencies: T028; Skills: lambdatest-agent-skills, design-taste-frontend; Done: teste Red registrado)
- [ ] T036 Configurar cobertura em `vitest.config.ts` e script `test:coverage` em `package.json` (Type: config; Dependencies: T027; Skills: lambdatest-agent-skills; Done: coverage gera relatório)
- [ ] T037 Atualizar `docs/testing.md` e `README.md` com comandos reais de testes, coverage, E2E, a11y e emuladores (Type: docs; Dependencies: T027-T036; Skills: documentation; Done: documentação de testes atualizada)

---

## Phase 3: Firebase e Segurança

**Purpose**: configurar Firebase, regras e autorização antes de dados reais.

- [ ] T038 Inicializar Firebase via CLI e versionar `firebase.json`, `.firebaserc`, `firebase/firestore.rules`, `firebase/firestore.indexes.json`, `firebase/storage.rules` (Type: config; Dependencies: T037; Skills: development, context7-auto-research; Done: Firebase CLI reproduzível)
- [ ] T039 [P] Criar teste Red de rules para leitura pública de produto ativo e bloqueio de produto inativo em `tests/integration/rules/products.rules.test.ts` (Type: test; Dependencies: T038; Skills: lambdatest-agent-skills; Done: teste falha com rules placeholder)
- [ ] T040 [P] Criar teste Red de rules para bloquear escrita pública em produtos/categorias em `tests/integration/rules/catalog-write.rules.test.ts` (Type: test; Dependencies: T038; Skills: lambdatest-agent-skills; Done: teste falha com rules placeholder)
- [ ] T041 [P] Criar teste Red de rules para cliente ler só próprios pedidos em `tests/integration/rules/orders.rules.test.ts` (Type: test; Dependencies: T038; Skills: lambdatest-agent-skills, logic-lens; Done: teste Red registrado)
- [ ] T042 [P] Criar teste Red de rules para admin gerenciar produtos, pedidos, cupons e reviews em `tests/integration/rules/admin.rules.test.ts` (Type: test; Dependencies: T038; Skills: lambdatest-agent-skills, logic-lens; Done: teste Red registrado)
- [ ] T043 [P] Criar teste Red de Storage rules para upload de imagem exigir admin em `tests/integration/rules/storage.rules.test.ts` (Type: test; Dependencies: T038; Skills: lambdatest-agent-skills; Done: teste Red registrado)
- [ ] T044 Implementar regras mínimas de catálogo público e bloqueio de escrita em `firebase/firestore.rules` (Type: security; Dependencies: T039, T040; Skills: logic-lens; Done: testes de catálogo ficam Green)
- [ ] T045 Implementar regras de pedidos, perfis mínimos e payment sessions em `firebase/firestore.rules` (Type: security; Dependencies: T041; Skills: logic-lens; Done: testes de pedidos ficam Green)
- [ ] T046 Implementar regras admin para produtos, cupons e reviews em `firebase/firestore.rules` (Type: security; Dependencies: T042; Skills: logic-lens; Done: testes admin ficam Green)
- [ ] T047 Implementar regras de upload de imagens em `firebase/storage.rules` com admin, path, tipo e tamanho (Type: security; Dependencies: T043; Skills: logic-lens; Done: testes Storage ficam Green)
- [ ] T048 Configurar `firebase/firestore.indexes.json` com índices iniciais de products, orders, coupons e reviews (Type: config; Dependencies: T044-T046; Skills: development; Done: indexes versionados)
- [ ] T049 Criar adapters Firebase client/admin em `src/lib/firebase/client.ts`, `src/lib/firebase/admin.ts`, `src/lib/firebase/emulator.ts` (Type: implementation; Dependencies: T038; Skills: development; Done: adapters tipados e sem secrets no cliente)
- [ ] T050 Criar contrato de roles em `src/lib/security/roles.ts` e estratégia de custom claims/fallback controlado em `docs/security.md` (Type: security; Dependencies: T049; Skills: varlock, logic-lens; Done: roles documentadas e tipadas)
- [ ] T051 Criar testes Red de proteção de secrets/env em `tests/unit/security/env.test.ts` (Type: test; Dependencies: T023; Skills: varlock, lambdatest-agent-skills; Done: falha se secret pública vazar)
- [ ] T052 Implementar validação de env em `src/lib/env/schema.ts` e uso seguro em `src/lib/env/server.ts`, `src/lib/env/public.ts` (Type: security; Dependencies: T051; Skills: varlock; Done: teste de env Green)
- [ ] T053 Atualizar `docs/firebase.md`, `docs/security.md`, `docs/testing.md` e `README.md` com CLI, emuladores, rules, indexes, roles e primeiro admin (Type: docs; Dependencies: T038-T052; Skills: documentation; Done: docs Firebase/segurança atualizadas)

---

## Phase 4: Modelo de Domínio e Validação

**Purpose**: criar tipos, schemas e regras puras antes da UI e integrações.

- [ ] T054 [P] Criar testes Red de Product e ProductVariant em `tests/unit/domain/product.test.ts` (Type: test; Dependencies: T037; Skills: lambdatest-agent-skills; Done: validações esperadas falham)
- [ ] T055 [P] Criar testes Red de schemas Product/ProductVariant em `tests/unit/validators/product.schema.test.ts` (Type: test; Dependencies: T037; Skills: lambdatest-agent-skills; Done: schemas ausentes falham)
- [ ] T056 Implementar tipos e regras Product/ProductVariant em `src/domain/product/types.ts`, `src/domain/product/rules.ts` (Type: implementation; Dependencies: T054; Skills: development; Done: testes de domínio Green)
- [ ] T057 Implementar schemas Product/ProductVariant em `src/validators/product.ts` (Type: implementation; Dependencies: T055; Skills: development, logic-lens; Done: testes de schema Green)
- [ ] T058 [P] Criar testes Red de Category em `tests/unit/domain/category.test.ts` e `tests/unit/validators/category.schema.test.ts` (Type: test; Dependencies: T037; Skills: lambdatest-agent-skills; Done: testes Red)
- [ ] T059 Implementar Category em `src/domain/product/category.ts` e `src/validators/category.ts` (Type: implementation; Dependencies: T058; Skills: development; Done: categorias iniciais validadas)
- [ ] T060 [P] Criar testes Red de Cart em `tests/unit/domain/cart.test.ts` para add/remove/quantity/subtotal/invalid variation (Type: test; Dependencies: T056; Skills: lambdatest-agent-skills; Done: regras de carrinho falham)
- [ ] T061 Implementar Cart domain em `src/domain/cart/types.ts`, `src/domain/cart/rules.ts` (Type: implementation; Dependencies: T060; Skills: development; Done: testes Cart Green)
- [ ] T062 [P] Criar testes Red de Order e state transitions em `tests/unit/domain/order.test.ts` (Type: test; Dependencies: T061; Skills: lambdatest-agent-skills; Done: transições falham)
- [ ] T063 Implementar Order domain em `src/domain/order/types.ts`, `src/domain/order/rules.ts` (Type: implementation; Dependencies: T062; Skills: development, logic-lens; Done: testes Order Green)
- [ ] T064 [P] Criar testes Red de CustomerProfile mínimo e AdminUser em `tests/unit/domain/user.test.ts` (Type: test; Dependencies: T050; Skills: lambdatest-agent-skills; Done: validações de dados mínimos falham)
- [ ] T065 Implementar CustomerProfile/AdminUser domain em `src/domain/customer/types.ts`, `src/domain/customer/rules.ts`, `src/domain/admin/types.ts` (Type: implementation; Dependencies: T064; Skills: development, logic-lens; Done: testes user Green)
- [ ] T066 [P] Criar testes Red de Coupon em `tests/unit/domain/coupon.test.ts` e schema em `tests/unit/validators/coupon.schema.test.ts` (Type: test; Dependencies: T037; Skills: lambdatest-agent-skills; Done: regras de cupom falham)
- [ ] T067 Implementar Coupon domain/schema em `src/domain/coupon/types.ts`, `src/domain/coupon/rules.ts`, `src/validators/coupon.ts` (Type: implementation; Dependencies: T066; Skills: development; Done: testes Coupon Green)
- [ ] T068 [P] Criar testes Red de Review em `tests/unit/domain/review.test.ts` e schema em `tests/unit/validators/review.schema.test.ts` (Type: test; Dependencies: T037; Skills: lambdatest-agent-skills; Done: regras de review falham)
- [ ] T069 Implementar Review domain/schema em `src/domain/review/types.ts`, `src/domain/review/rules.ts`, `src/validators/review.ts` (Type: implementation; Dependencies: T068; Skills: development, logic-lens; Done: testes Review Green)
- [ ] T070 [P] Criar testes Red de ShippingOption em `tests/unit/domain/shipping.test.ts` (Type: test; Dependencies: T037; Skills: lambdatest-agent-skills; Done: cálculo/estado mock falha)
- [ ] T071 Implementar ShippingOption domain em `src/domain/shipping/types.ts`, `src/domain/shipping/rules.ts` (Type: implementation; Dependencies: T070; Skills: development; Done: testes Shipping Green)
- [ ] T072 [P] Criar testes Red de PaymentSession em `tests/unit/domain/payment.test.ts` (Type: test; Dependencies: T037; Skills: lambdatest-agent-skills; Done: transições de pagamento falham)
- [ ] T073 Implementar PaymentSession abstrata em `src/domain/payment/types.ts`, `src/domain/payment/rules.ts` (Type: implementation; Dependencies: T072; Skills: development, logic-lens; Done: testes Payment Green)
- [ ] T074 Criar barrel exports controlados em `src/domain/index.ts` e `src/validators/index.ts` (Type: implementation; Dependencies: T056-T073; Skills: development; Done: imports limpos e sem ciclos)
- [ ] T075 Atualizar `docs/architecture.md`, `docs/security.md`, `docs/testing.md` e `README.md` com entidades, validações e minimização de dados (Type: docs; Dependencies: T054-T074; Skills: documentation; Done: docs refletem domínio)

---

## Phase 5: UI Base/Design System Mobile-First

**Purpose**: base visual simples, acessível e prática para todas as telas.

- [ ] T076 [P] Criar testes Red de tokens de design em `tests/unit/components/design-tokens.test.ts` (Type: test; Dependencies: T037; Skills: design-taste-frontend, lambdatest-agent-skills; Done: tokens esperados ausentes falham)
- [ ] T077 Implementar tokens simples em `src/components/ui/tokens.ts` e estilos globais em `src/app/globals.css` (Type: implementation; Dependencies: T076; Skills: design-taste-frontend; Done: tokens aplicáveis e contraste documentado)
- [ ] T078 [P] Criar testes Red de Button/Input/Select em `tests/unit/components/form-controls.test.tsx` (Type: test; Dependencies: T028; Skills: design-taste-frontend, lambdatest-agent-skills; Done: controles acessíveis falham)
- [ ] T079 Implementar `Button`, `Input`, `Select` em `src/components/ui/` com labels, foco visível e estados (Type: implementation; Dependencies: T078; Skills: design-taste-frontend; Done: testes de controles Green)
- [ ] T080 [P] Criar testes Red de Card/Badge/Price em `tests/unit/components/display.test.tsx` (Type: test; Dependencies: T028; Skills: design-taste-frontend; Done: componentes de display falham)
- [ ] T081 Implementar `Card`, `Badge`, `Price` em `src/components/ui/` (Type: implementation; Dependencies: T080; Skills: design-taste-frontend; Done: testes de display Green)
- [ ] T082 [P] Criar testes Red de Modal/Drawer mobile em `tests/unit/components/overlay.test.tsx` (Type: test; Dependencies: T028; Skills: design-taste-frontend, lambdatest-agent-skills; Done: foco/keyboard falha)
- [ ] T083 Implementar Modal/Drawer acessível em `src/components/ui/` (Type: implementation; Dependencies: T082; Skills: design-taste-frontend; Done: foco preso e fechamento por teclado funcionam)
- [ ] T084 [P] Criar testes Red de Loading/Empty/Error states em `tests/unit/components/states.test.tsx` (Type: test; Dependencies: T028; Skills: design-taste-frontend; Done: estados ausentes falham)
- [ ] T085 Implementar `LoadingState`, `EmptyState`, `ErrorMessage` em `src/components/ui/` (Type: implementation; Dependencies: T084; Skills: design-taste-frontend; Done: mensagens PT-BR acessíveis)
- [ ] T086 Criar teste Red de app shell em `tests/unit/components/app-shell.test.tsx` para header, footer e navegação mobile (Type: test; Dependencies: T035; Skills: design-taste-frontend; Done: shell esperado falha)
- [ ] T087 Implementar layout base em `src/components/layout/AppShell.tsx`, `Header.tsx`, `Footer.tsx`, `MobileNav.tsx` e conectar em `src/app/layout.tsx` (Type: implementation; Dependencies: T086; Skills: design-taste-frontend; Done: shell mobile-first Green)
- [ ] T088 Criar teste de acessibilidade Red para UI base em `tests/accessibility/ui-base.spec.ts` (Type: test; Dependencies: T087; Skills: lambdatest-agent-skills, design-taste-frontend; Done: axe encontra falhas esperadas antes dos ajustes)
- [ ] T089 Atualizar `docs/architecture.md`, `docs/testing.md`, `README.md` e registrar skills de frontend em `docs/skills.md` (Type: docs; Dependencies: T076-T088; Skills: documentation, design-taste-frontend; Done: design system documentado)

---

## Phase 6: Home e SEO Base

**Goal**: entregar home simples com marca, chamada, destaques, catálogo, WhatsApp, redes sociais e SEO base.

**Independent Test**: em viewport mobile, a home mostra marca, CTA de catálogo, CTA WhatsApp, destaques e links sociais; metadados existem; acessibilidade básica passa.

- [ ] T090 [P] [US1] Criar teste Red de renderização da home em `tests/unit/features/home/home.test.tsx` (Type: test; Dependencies: T087; Skills: lambdatest-agent-skills, design-taste-frontend; Done: expectativa de marca/CTAs falha)
- [ ] T091 [P] [US1] Criar teste Red de metadados base em `tests/unit/seo/home-metadata.test.ts` (Type: test; Dependencies: T037; Skills: lambdatest-agent-skills; Done: metadata ausente falha)
- [ ] T092 [P] [US1] Criar teste Red de CTA WhatsApp/social links em `tests/unit/features/home/social-links.test.tsx` (Type: test; Dependencies: T087; Skills: lambdatest-agent-skills; Done: links configuráveis falham)
- [ ] T093 [US1] Implementar config de marca/social em `src/lib/config/store.ts` e validação em `src/lib/env/schema.ts` (Type: implementation; Dependencies: T092; Skills: varlock, development; Done: links leem env/config sem quebrar se ausentes)
- [ ] T094 [US1] Implementar home em `src/app/(store)/page.tsx` e componentes `src/features/home/` (Type: implementation; Dependencies: T090, T093; Skills: design-taste-frontend; Done: teste home Green)
- [ ] T095 [US1] Implementar metadados base em `src/app/layout.tsx` e `src/lib/seo/metadata.ts` (Type: implementation; Dependencies: T091; Skills: development; Done: teste metadata Green)
- [ ] T096 [P] [US1] Criar teste E2E Red mobile para home em `tests/e2e/home.spec.ts` (Type: test; Dependencies: T094; Skills: lambdatest-agent-skills; Done: fluxo home mobile falha antes de ajustes finais)
- [ ] T097 [US1] Ajustar home para passar E2E mobile e acessibilidade em `src/app/(store)/page.tsx` (Type: implementation; Dependencies: T096; Skills: design-taste-frontend; Done: E2E home Green)
- [ ] T098 [US1] Criar/atualizar robots e sitemap base em `src/app/robots.ts`, `src/app/sitemap.ts` (Type: implementation; Dependencies: T095; Skills: development; Done: rotas SEO base existem)
- [ ] T099 [US1] Atualizar `README.md`, `docs/architecture.md`, `docs/testing.md` e `docs/skills.md` com home/SEO base (Type: docs; Dependencies: T090-T098; Skills: documentation; Done: documentação do grupo atualizada)

---

## Phase 7: Catálogo, Busca e Filtros

**Goal**: permitir navegação por catálogo, busca por nome e filtros mobile por categoria, preço e disponibilidade.

**Independent Test**: cliente encontra produto por catálogo, busca ou filtros em celular e vê estados vazio/carregando/erro.

- [ ] T100 [P] [US1] Criar testes Red de ProductCatalogService em `tests/unit/services/product-catalog.test.ts` (Type: test; Dependencies: T056-T059; Skills: lambdatest-agent-skills; Done: listagem/filtros falham)
- [ ] T101 [P] [US1] Criar testes Red de query normalization/search em `tests/unit/domain/product/search.test.ts` (Type: test; Dependencies: T056; Skills: lambdatest-agent-skills; Done: busca normalizada falha)
- [ ] T102 [P] [US1] Criar testes Red de ProductCard e filtros em `tests/unit/features/catalog/catalog-ui.test.tsx` (Type: test; Dependencies: T081; Skills: design-taste-frontend, lambdatest-agent-skills; Done: UI catálogo falha)
- [ ] T103 [P] [US1] Criar teste Red de integração Firestore catálogo em `tests/integration/firebase/catalog-read.test.ts` (Type: test; Dependencies: T049; Skills: lambdatest-agent-skills; Done: leitura de produtos ativos falha)
- [ ] T104 [US1] Implementar ProductCatalogService em `src/services/firebase/product-catalog.ts` (Type: implementation; Dependencies: T100, T103; Skills: development; Done: testes serviço/integração Green)
- [ ] T105 [US1] Implementar busca normalizada em `src/domain/product/search.ts` e campo planejado de índice em `src/domain/product/types.ts` (Type: implementation; Dependencies: T101; Skills: development; Done: testes de busca Green)
- [ ] T106 [US1] Implementar ProductCard e filtros mobile em `src/components/product/ProductCard.tsx`, `src/features/catalog/CatalogFilters.tsx` (Type: implementation; Dependencies: T102; Skills: design-taste-frontend; Done: UI catálogo Green)
- [ ] T107 [US1] Implementar rota catálogo em `src/app/(store)/catalog/page.tsx` com query params `q`, `category`, `minPrice`, `maxPrice`, `availability` (Type: implementation; Dependencies: T104-T106; Skills: development, design-taste-frontend; Done: catálogo renderiza e filtra)
- [ ] T108 [P] [US1] Criar teste E2E Red mobile de busca/filtros em `tests/e2e/catalog.spec.ts` (Type: test; Dependencies: T107; Skills: lambdatest-agent-skills; Done: busca/filtros E2E falham)
- [ ] T109 [US1] Ajustar UX mobile de filtros, estados loading/empty/error em `src/features/catalog/` (Type: implementation; Dependencies: T108; Skills: design-taste-frontend; Done: E2E catálogo Green)
- [ ] T110 [US1] Adicionar seeds de catálogo em `firebase/seed/products.ts` apenas para emulador/desenvolvimento (Type: config; Dependencies: T104; Skills: development; Done: seed sem dados reais sensíveis)
- [ ] T111 [US1] Atualizar índices de produtos em `firebase/firestore.indexes.json` para status/categoria/preço/disponibilidade (Type: config; Dependencies: T107; Skills: development; Done: índices necessários versionados)
- [ ] T112 [US1] Atualizar `README.md`, `docs/firebase.md`, `docs/testing.md`, `docs/architecture.md`, `docs/skills.md` para catálogo/busca/filtros (Type: docs; Dependencies: T100-T111; Skills: documentation; Done: docs do catálogo atualizadas)

---

## Phase 8: Página de Produto

**Goal**: exibir detalhes, fotos, variações tamanho/cor, disponibilidade, adicionar ao carrinho e WhatsApp direto.

**Independent Test**: cliente abre produto, escolhe variação válida, vê indisponibilidade corretamente e inicia carrinho ou WhatsApp.

- [ ] T113 [P] [US2] Criar testes Red de seleção de variação em `tests/unit/domain/product/variant-selection.test.ts` (Type: test; Dependencies: T056; Skills: lambdatest-agent-skills; Done: seleção falha)
- [ ] T114 [P] [US2] Criar testes Red de página de produto em `tests/unit/features/product/product-page.test.tsx` (Type: test; Dependencies: T087; Skills: lambdatest-agent-skills, design-taste-frontend; Done: detalhes/CTAs falham)
- [ ] T115 [P] [US2] Criar testes Red de metadata de produto em `tests/unit/seo/product-metadata.test.ts` (Type: test; Dependencies: T095; Skills: lambdatest-agent-skills; Done: metadata produto falha)
- [ ] T116 [P] [US2] Criar teste Red de integração buscar produto por slug em `tests/integration/firebase/product-detail.test.ts` (Type: test; Dependencies: T104; Skills: lambdatest-agent-skills; Done: detalhe por slug falha)
- [ ] T117 [US2] Implementar seleção de variação em `src/domain/product/variant-selection.ts` (Type: implementation; Dependencies: T113; Skills: development; Done: testes seleção Green)
- [ ] T118 [US2] Implementar serviço de detalhe em `src/services/firebase/product-detail.ts` (Type: implementation; Dependencies: T116; Skills: development; Done: teste integração Green)
- [ ] T119 [US2] Implementar componentes de fotos, variações e disponibilidade em `src/features/product/` e `src/components/product/` (Type: implementation; Dependencies: T114, T117; Skills: design-taste-frontend; Done: teste UI Green)
- [ ] T120 [US2] Implementar rota `src/app/(store)/products/[slug]/page.tsx` com dados, CTAs e fallback de foto acessível (Type: implementation; Dependencies: T118, T119; Skills: development, design-taste-frontend; Done: página produto renderiza)
- [ ] T121 [US2] Implementar metadata por produto em `src/app/(store)/products/[slug]/page.tsx` e `src/lib/seo/product.ts` (Type: implementation; Dependencies: T115, T120; Skills: development; Done: teste SEO produto Green)
- [ ] T122 [P] [US2] Criar teste E2E Red de produto/variação/indisponibilidade em `tests/e2e/product.spec.ts` (Type: test; Dependencies: T120; Skills: lambdatest-agent-skills; Done: E2E produto falha)
- [ ] T123 [US2] Ajustar página de produto para passar E2E mobile e a11y em `src/features/product/` (Type: implementation; Dependencies: T122; Skills: design-taste-frontend; Done: E2E produto Green)
- [ ] T124 [US2] Atualizar `README.md`, `docs/architecture.md`, `docs/testing.md` e `docs/skills.md` com página de produto (Type: docs; Dependencies: T113-T123; Skills: documentation; Done: docs do produto atualizadas)

---

## Phase 9: Carrinho e WhatsApp

**Goal**: carrinho local persistente, subtotal correto e WhatsApp para produto/carrinho.

**Independent Test**: cliente adiciona, remove, altera quantidade, mantém carrinho local e gera mensagem WhatsApp correta.

- [ ] T125 [P] [US3] Criar testes Red de persistência local do carrinho em `tests/unit/features/cart/cart-storage.test.ts` (Type: test; Dependencies: T061; Skills: lambdatest-agent-skills; Done: storage ausente falha)
- [ ] T126 [P] [US3] Criar testes Red de Cart UI em `tests/unit/features/cart/cart-ui.test.tsx` (Type: test; Dependencies: T087; Skills: lambdatest-agent-skills, design-taste-frontend; Done: UI carrinho falha)
- [ ] T127 [P] [US2] Criar testes Red de WhatsAppService para produto em `tests/unit/services/whatsapp-product.test.ts` (Type: test; Dependencies: T117; Skills: lambdatest-agent-skills; Done: mensagem produto falha)
- [ ] T128 [P] [US3] Criar testes Red de WhatsAppService para carrinho em `tests/unit/services/whatsapp-cart.test.ts` (Type: test; Dependencies: T061; Skills: lambdatest-agent-skills; Done: mensagem carrinho falha)
- [ ] T129 [US3] Implementar cart storage em `src/features/cart/cart-storage.ts` sem dados pessoais (Type: implementation; Dependencies: T125; Skills: development, logic-lens; Done: testes storage Green)
- [ ] T130 [US3] Implementar estado/actions do carrinho em `src/features/cart/cart-state.ts` e `src/features/cart/useCart.ts` (Type: implementation; Dependencies: T061, T129; Skills: development; Done: add/remove/quantity Green)
- [ ] T131 [US2] Implementar WhatsAppService de produto em `src/services/whatsapp/product-message.ts` (Type: implementation; Dependencies: T127; Skills: development; Done: teste WhatsApp produto Green)
- [ ] T132 [US3] Implementar WhatsAppService de carrinho em `src/services/whatsapp/cart-message.ts` (Type: implementation; Dependencies: T128; Skills: development; Done: teste WhatsApp carrinho Green)
- [ ] T133 [US3] Implementar rota carrinho em `src/app/(store)/cart/page.tsx` e componentes em `src/features/cart/` (Type: implementation; Dependencies: T126, T130, T132; Skills: design-taste-frontend; Done: UI carrinho Green)
- [ ] T134 [US2] Conectar botão adicionar ao carrinho e WhatsApp em `src/features/product/` (Type: implementation; Dependencies: T120, T130, T131; Skills: development; Done: produto adiciona item válido ao carrinho)
- [ ] T135 [P] [US3] Criar teste E2E Red de carrinho e WhatsApp em `tests/e2e/cart-whatsapp.spec.ts` (Type: test; Dependencies: T133, T134; Skills: lambdatest-agent-skills; Done: E2E falha)
- [ ] T136 [US3] Ajustar carrinho e WhatsApp para passar E2E mobile em `src/features/cart/` e `src/services/whatsapp/` (Type: implementation; Dependencies: T135; Skills: design-taste-frontend; Done: E2E cart/WhatsApp Green)
- [ ] T137 [US3] Atualizar `README.md`, `docs/architecture.md`, `docs/testing.md`, `docs/security.md` e `docs/skills.md` com carrinho local e WhatsApp (Type: docs; Dependencies: T125-T136; Skills: documentation; Done: docs de carrinho/WhatsApp atualizadas)

---

## Phase 10: Checkout, Pedidos, Pagamento Mockado e Frete Mockado

**Goal**: finalizar pedido com dados mínimos, retirada/entrega, frete mockado, pagamento mockado e registro seguro de pedido.

**Independent Test**: cliente revisa carrinho, informa dados mínimos, escolhe entrega/pagamento e cria pedido com status inicial correto.

- [ ] T138 [P] [US3] Criar testes Red de ShippingService mockado em `tests/unit/services/shipping-mock.test.ts` (Type: test; Dependencies: T071; Skills: lambdatest-agent-skills; Done: cálculo mock falha)
- [ ] T139 [P] [US3] Criar testes Red de PaymentService mockado em `tests/unit/services/payment-mock.test.ts` (Type: test; Dependencies: T073; Skills: lambdatest-agent-skills; Done: sessão mock falha)
- [ ] T140 [P] [US3] Criar testes Red de OrderService em `tests/unit/services/order-service.test.ts` (Type: test; Dependencies: T063; Skills: lambdatest-agent-skills; Done: criação de pedido falha)
- [ ] T141 [P] [US3] Criar testes Red de schemas checkout/order em `tests/unit/validators/checkout.schema.test.ts` (Type: test; Dependencies: T063; Skills: lambdatest-agent-skills; Done: dados mínimos falham)
- [ ] T142 [P] [US3] Criar teste Red de Server Action `createOrder` em `tests/integration/actions/create-order.test.ts` (Type: test; Dependencies: T049, T140; Skills: lambdatest-agent-skills, logic-lens; Done: action ausente falha)
- [ ] T143 [P] [US3] Criar teste Red de `quoteShipping` em `tests/integration/actions/quote-shipping.test.ts` (Type: test; Dependencies: T138; Skills: lambdatest-agent-skills; Done: action frete falha)
- [ ] T144 [US3] Implementar ShippingService mockado em `src/services/shipping/mock-shipping-service.ts` e contrato em `src/services/shipping/types.ts` (Type: implementation; Dependencies: T138; Skills: development; Done: teste frete Green)
- [ ] T145 [US3] Implementar PaymentService mockado em `src/services/payment/mock-payment-service.ts` e contrato em `src/services/payment/types.ts` (Type: implementation; Dependencies: T139; Skills: development, logic-lens; Done: teste pagamento Green)
- [ ] T146 [US3] Implementar schemas checkout/order em `src/validators/checkout.ts`, `src/validators/order.ts` (Type: implementation; Dependencies: T141; Skills: development, logic-lens; Done: teste schema Green)
- [ ] T147 [US3] Implementar OrderService em `src/services/firebase/order-service.ts` com snapshot e minimização de dados (Type: implementation; Dependencies: T140, T146; Skills: development, logic-lens; Done: teste OrderService Green)
- [ ] T148 [US3] Implementar actions `createOrder`, `quoteShipping`, `createPaymentSession` em `src/app/actions/checkout.ts` (Type: implementation; Dependencies: T142, T143, T144, T145, T147; Skills: development, logic-lens; Done: testes actions Green)
- [ ] T149 [US3] Implementar UI checkout em `src/app/(store)/checkout/page.tsx` e `src/features/checkout/` (Type: implementation; Dependencies: T148; Skills: design-taste-frontend; Done: checkout mobile-first funcional)
- [ ] T150 [P] [US3] Criar teste E2E Red checkout em `tests/e2e/checkout.spec.ts` (Type: test; Dependencies: T149; Skills: lambdatest-agent-skills; Done: E2E checkout falha)
- [ ] T151 [US3] Ajustar checkout para passar E2E e mensagens de erro acessíveis em `src/features/checkout/` (Type: implementation; Dependencies: T150; Skills: design-taste-frontend; Done: E2E checkout Green)
- [ ] T152 [US3] Atualizar regras/índices de pedidos em `firebase/firestore.rules`, `firebase/firestore.indexes.json` (Type: security; Dependencies: T147, T148; Skills: logic-lens; Done: rules tests de pedido continuam Green)
- [ ] T153 [US3] Atualizar `README.md`, `docs/security.md`, `docs/firebase.md`, `docs/testing.md`, `docs/architecture.md`, `docs/skills.md` com checkout, privacidade, frete/pagamento mockados (Type: docs; Dependencies: T138-T152; Skills: documentation; Done: docs de checkout atualizadas)

---

## Phase 11: Login e Autorização

**Goal**: autenticação Firebase para cliente/admin, rotas protegidas e estratégia segura de roles.

**Independent Test**: cliente navega sem login, faz login quando necessário, admin acessa painel, não-admin é bloqueado.

- [ ] T154 [P] [US5] Criar testes Red de AuthService em `tests/unit/services/auth-service.test.ts` (Type: test; Dependencies: T049; Skills: lambdatest-agent-skills; Done: auth service falha)
- [ ] T155 [P] [US5] Criar testes Red de guards/roles em `tests/unit/security/guards.test.ts` (Type: test; Dependencies: T050; Skills: lambdatest-agent-skills, logic-lens; Done: guards falham)
- [ ] T156 [P] [US5] Criar teste Red de login UI em `tests/unit/features/auth/login-page.test.tsx` (Type: test; Dependencies: T087; Skills: lambdatest-agent-skills, design-taste-frontend; Done: login UI falha)
- [ ] T157 [P] [US5] Criar teste Red de integração Auth Emulator em `tests/integration/firebase/auth.test.ts` (Type: test; Dependencies: T038; Skills: lambdatest-agent-skills; Done: auth emulator falha)
- [ ] T158 [US5] Implementar AuthService em `src/services/firebase/auth-service.ts` (Type: implementation; Dependencies: T154, T157; Skills: development; Done: testes AuthService Green)
- [ ] T159 [US5] Implementar guards e helpers de sessão/role em `src/lib/security/guards.ts`, `src/lib/security/session.ts` (Type: security; Dependencies: T155, T158; Skills: logic-lens; Done: testes guards Green)
- [ ] T160 [US5] Implementar rota login em `src/app/(auth)/login/page.tsx` e componentes em `src/features/auth/` (Type: implementation; Dependencies: T156, T158; Skills: design-taste-frontend; Done: login UI Green)
- [ ] T161 [US5] Implementar proteção de rotas admin em `src/middleware.ts` ou guards server-side em `src/app/admin/layout.tsx` (Type: security; Dependencies: T159; Skills: logic-lens; Done: não-admin bloqueado)
- [ ] T162 [P] [US5] Criar teste E2E Red login/authorization em `tests/e2e/auth.spec.ts` (Type: test; Dependencies: T160, T161; Skills: lambdatest-agent-skills; Done: E2E auth falha)
- [ ] T163 [US5] Ajustar login e autorização para passar E2E em `src/features/auth/`, `src/lib/security/` (Type: implementation; Dependencies: T162; Skills: development, logic-lens; Done: E2E auth Green)
- [ ] T164 [US5] Atualizar `docs/security.md`, `docs/firebase.md`, `README.md`, `docs/skills.md` com Firebase Auth, roles e primeiro admin (Type: docs; Dependencies: T154-T163; Skills: documentation; Done: primeiro admin documentado)

---

## Phase 12: Painel Admin

**Goal**: administradora cadastra/edita/desativa produtos e visualiza pedidos.

**Independent Test**: admin autenticada gerencia produtos e pedidos; cliente/visitante não acessa painel.

- [ ] T165 [P] [US4] Criar testes Red de AdminProductService em `tests/unit/services/admin-product-service.test.ts` (Type: test; Dependencies: T056-T059, T159; Skills: lambdatest-agent-skills; Done: CRUD admin falha)
- [ ] T166 [P] [US4] Criar teste Red de ProductForm schema em `tests/unit/validators/admin-product.schema.test.ts` (Type: test; Dependencies: T057; Skills: lambdatest-agent-skills; Done: formulário inválido não valida)
- [ ] T167 [P] [US4] Criar testes Red de admin UI produtos em `tests/unit/features/admin/products-admin.test.tsx` (Type: test; Dependencies: T087; Skills: design-taste-frontend, lambdatest-agent-skills; Done: UI admin falha)
- [ ] T168 [P] [US4] Criar testes Red de admin orders UI em `tests/unit/features/admin/orders-admin.test.tsx` (Type: test; Dependencies: T087; Skills: design-taste-frontend, lambdatest-agent-skills; Done: pedidos admin falham)
- [ ] T169 [P] [US4] Criar testes Red de upload/associação de foto em `tests/integration/firebase/product-images.test.ts` se Storage for usado (Type: test; Dependencies: T047; Skills: lambdatest-agent-skills; Done: comportamento Storage falha ou decisão de não usar Storage documentada)
- [ ] T170 [US4] Implementar AdminProductService em `src/services/firebase/admin-product-service.ts` (Type: implementation; Dependencies: T165, T166; Skills: development, logic-lens; Done: testes serviço Green)
- [ ] T171 [US4] Implementar ProductForm e validações em `src/features/admin/products/ProductForm.tsx`, `src/validators/admin-product.ts` (Type: implementation; Dependencies: T166, T167; Skills: design-taste-frontend; Done: formulário admin Green)
- [ ] T172 [US4] Implementar rotas admin produtos em `src/app/admin/products/page.tsx`, `src/app/admin/products/[id]/page.tsx` (Type: implementation; Dependencies: T170, T171; Skills: development; Done: admin produtos funcional)
- [ ] T173 [US4] Implementar upload/associação de foto em `src/services/firebase/product-images.ts` e `src/features/admin/products/ProductImages.tsx` se Storage for usado (Type: implementation; Dependencies: T169; Skills: development, logic-lens; Done: upload seguro ou alternativa documentada)
- [ ] T174 [US4] Implementar AdminOrderService em `src/services/firebase/admin-order-service.ts` (Type: implementation; Dependencies: T147, T159, T168; Skills: development; Done: pedidos admin acessíveis por admin)
- [ ] T175 [US4] Implementar rotas admin pedidos em `src/app/admin/orders/page.tsx` e componentes em `src/features/admin/orders/` (Type: implementation; Dependencies: T174; Skills: design-taste-frontend; Done: pedidos aparecem com status e valores)
- [ ] T176 [US4] Criar dashboard admin simples em `src/app/admin/page.tsx` (Type: implementation; Dependencies: T172, T175; Skills: design-taste-frontend; Done: dashboard mostra atalhos e resumo simples)
- [ ] T177 [P] [US4] Criar teste E2E Red admin produtos/pedidos em `tests/e2e/admin.spec.ts` (Type: test; Dependencies: T172, T175, T176; Skills: lambdatest-agent-skills; Done: E2E admin falha)
- [ ] T178 [US4] Ajustar painel admin para passar E2E e rules tests em `src/app/admin/`, `src/features/admin/`, `firebase/firestore.rules` (Type: implementation; Dependencies: T177; Skills: logic-lens, design-taste-frontend; Done: E2E admin Green)
- [ ] T179 [US4] Atualizar `README.md`, `docs/security.md`, `docs/firebase.md`, `docs/architecture.md`, `docs/testing.md`, `docs/skills.md` com painel admin (Type: docs; Dependencies: T165-T178; Skills: documentation; Done: docs admin atualizadas)

---

## Phase 13: Cupons e Avaliações

**Goal**: suporte inicial a cupons e avaliações moderadas.

**Independent Test**: cliente aplica cupom válido/inválido e vê apenas avaliações aprovadas; admin modera avaliações.

- [ ] T180 [P] [US6] Criar testes Red de CouponService em `tests/unit/services/coupon-service.test.ts` (Type: test; Dependencies: T067; Skills: lambdatest-agent-skills; Done: aplicação de cupom falha)
- [ ] T181 [P] [US6] Criar teste Red de action `applyCoupon` em `tests/integration/actions/apply-coupon.test.ts` (Type: test; Dependencies: T180; Skills: lambdatest-agent-skills; Done: action cupom falha)
- [ ] T182 [P] [US6] Criar testes Red de ReviewService em `tests/unit/services/review-service.test.ts` (Type: test; Dependencies: T069; Skills: lambdatest-agent-skills; Done: review service falha)
- [ ] T183 [P] [US6] Criar teste Red de action `submitReview` e moderação em `tests/integration/actions/reviews.test.ts` (Type: test; Dependencies: T182, T159; Skills: lambdatest-agent-skills, logic-lens; Done: actions reviews falham)
- [ ] T184 [P] [US6] Criar testes Red de UI cupom/review em `tests/unit/features/coupons-reviews.test.tsx` (Type: test; Dependencies: T087; Skills: design-taste-frontend; Done: UI cupom/review falha)
- [ ] T185 [US6] Implementar CouponService em `src/services/coupons/coupon-service.ts` (Type: implementation; Dependencies: T180; Skills: development; Done: testes cupom Green)
- [ ] T186 [US6] Implementar action `applyCoupon` em `src/app/actions/coupons.ts` com validação server-side e rate limit aplicável (Type: security; Dependencies: T181, T185; Skills: logic-lens; Done: action cupom Green)
- [ ] T187 [US6] Integrar cupom no carrinho/checkout em `src/features/cart/` e `src/features/checkout/` (Type: implementation; Dependencies: T186; Skills: development, design-taste-frontend; Done: desconto aparece corretamente)
- [ ] T188 [US6] Implementar ReviewService em `src/services/reviews/review-service.ts` com sanitização (Type: implementation; Dependencies: T182; Skills: development, logic-lens; Done: testes ReviewService Green)
- [ ] T189 [US6] Implementar actions `submitReview` e `adminModerateReview` em `src/app/actions/reviews.ts` (Type: security; Dependencies: T183, T188; Skills: logic-lens; Done: actions reviews Green)
- [ ] T190 [US6] Implementar UI de avaliações aprovadas em `src/features/reviews/ProductReviews.tsx` e formulário pendente em `src/features/reviews/ReviewForm.tsx` (Type: implementation; Dependencies: T184, T189; Skills: design-taste-frontend; Done: UI reviews Green)
- [ ] T191 [US6] Implementar admin de cupons/reviews em `src/app/admin/coupons/page.tsx`, `src/app/admin/reviews/page.tsx` (Type: implementation; Dependencies: T185, T189; Skills: design-taste-frontend; Done: admin modera e gerencia cupons)
- [ ] T192 [P] [US6] Criar teste E2E Red de cupom e avaliação moderada em `tests/e2e/coupons-reviews.spec.ts` (Type: test; Dependencies: T187, T190, T191; Skills: lambdatest-agent-skills; Done: E2E cupom/review falha)
- [ ] T193 [US6] Ajustar cupons e avaliações para passar E2E, rules tests e a11y em `src/features/`, `src/app/actions/`, `firebase/firestore.rules` (Type: implementation; Dependencies: T192; Skills: logic-lens, design-taste-frontend; Done: E2E cupom/review Green)
- [ ] T194 [US6] Atualizar `README.md`, `docs/security.md`, `docs/testing.md`, `docs/architecture.md`, `docs/skills.md` com cupons e avaliações (Type: docs; Dependencies: T180-T193; Skills: documentation; Done: docs cupom/review atualizadas)

---

## Phase 14: Qualidade Final, CI e Deploy

**Purpose**: garantir que o MVP completo passa por checks, CI, auditoria e preview.

- [ ] T195 Criar workflow GitHub Actions em `.github/workflows/ci.yml` com install limpo, lint, typecheck, unit, integration, rules, build e audit (Type: ci; Dependencies: T037, T053; Skills: agentic-actions-auditor; Done: workflow cobre gates mínimos)
- [ ] T196 Criar jobs opcionais/condicionais de E2E e acessibilidade em `.github/workflows/ci.yml` (Type: ci; Dependencies: T195; Skills: agentic-actions-auditor, lambdatest-agent-skills; Done: E2E/a11y executáveis no CI)
- [ ] T197 Auditar workflow de CI contra secrets e permissões mínimas em `.github/workflows/ci.yml` e `docs/security.md` (Type: security; Dependencies: T195, T196; Skills: agentic-actions-auditor, logic-lens; Done: permissões documentadas)
- [ ] T198 Rodar `pnpm lint` e corrigir achados nos arquivos reportados (Type: validation; Dependencies: T194-T197; Skills: verification-before-completion; Done: lint passa)
- [ ] T199 Rodar `pnpm typecheck` e corrigir achados nos arquivos reportados (Type: validation; Dependencies: T198; Skills: verification-before-completion; Done: typecheck passa)
- [ ] T200 Rodar `pnpm test:unit` e corrigir achados nos arquivos reportados (Type: validation; Dependencies: T199; Skills: verification-before-completion; Done: unit tests passam)
- [ ] T201 Rodar `pnpm test:integration` com emuladores e corrigir achados nos arquivos reportados (Type: validation; Dependencies: T200; Skills: verification-before-completion; Done: integration passa)
- [ ] T202 Rodar `pnpm test:rules` e corrigir rules/tests em `firebase/firestore.rules`, `firebase/storage.rules`, `tests/integration/rules/` (Type: validation; Dependencies: T201; Skills: verification-before-completion, logic-lens; Done: rules tests passam)
- [ ] T203 Rodar `pnpm test:e2e` e corrigir fluxos em `src/app/`, `src/features/`, `tests/e2e/` (Type: validation; Dependencies: T202; Skills: lambdatest-agent-skills, verification-before-completion; Done: E2E passa)
- [ ] T204 Rodar `pnpm test:a11y` e corrigir problemas de labels, foco, contraste e semântica em `src/components/`, `src/features/` (Type: validation; Dependencies: T203; Skills: design-taste-frontend, verification-before-completion; Done: a11y passa)
- [ ] T205 Rodar `pnpm build` e corrigir falhas de build, metadata, rotas e imports (Type: validation; Dependencies: T204; Skills: verification-before-completion; Done: build passa)
- [ ] T206 Rodar `pnpm audit` ou auditoria equivalente e registrar riscos aceitos em `docs/security.md` (Type: security; Dependencies: T205; Skills: logic-lens; Done: auditoria sem bloqueios críticos)
- [ ] T207 Executar Lighthouse ou equivalente em home, catálogo, produto e checkout e registrar resultado em `docs/testing.md` (Type: validation; Dependencies: T205; Skills: design-taste-frontend, verification-before-completion; Done: métricas e ajustes documentados)
- [ ] T208 Configurar e validar deploy preview Vercel com variáveis mockadas seguras em `docs/deployment.md` (Type: ci; Dependencies: T205-T207; Skills: agentic-actions-auditor; Done: preview documentado ou bloqueio explícito)
- [ ] T209 Atualizar `README.md`, `docs/setup.md`, `docs/firebase.md`, `docs/testing.md`, `docs/security.md`, `docs/architecture.md`, `docs/deployment.md`, `docs/skills.md` com status final do MVP (Type: docs; Dependencies: T195-T208; Skills: documentation; Done: documentação final consistente)

---

## Phase 15: Encerramento da Feature

**Purpose**: concluir conforme constitution sem commit automático.

- [ ] T210 Revisar `README.md` contra a constitution: overview, stack, requisitos, instalação, dev, testes, build, deploy, env vars, funcionalidades, status e limitações (Type: docs; Dependencies: T209; Skills: documentation; Done: README completo)
- [ ] T211 Revisar `docs/skills.md` com skills realmente usadas, evidências, impacto e limitações por feature (Type: docs; Dependencies: T209; Skills: documentation, verification-before-completion; Done: seção "Skills usadas nesta feature" pronta)
- [ ] T212 Revisar `docs/security.md` para ameaças, mitigação, dados coletados, finalidade, armazenamento, acesso, proteção e retenção (Type: security; Dependencies: T209; Skills: logic-lens; Done: privacidade/segurança completas)
- [ ] T213 Rodar sequência final `pnpm lint && pnpm typecheck && pnpm test:unit && pnpm test:integration && pnpm test:rules && pnpm test:e2e && pnpm test:a11y && pnpm build` (Type: validation; Dependencies: T210-T212; Skills: verification-before-completion; Done: todos os checks passam ou bloqueios documentados)
- [ ] T214 Rodar auditoria final de CI/dependências e registrar resultado em `docs/security.md` (Type: security; Dependencies: T213; Skills: agentic-actions-auditor, logic-lens; Done: sem risco crítico aberto)
- [ ] T215 Gerar resumo final de alterações, arquivos modificados, testes executados, riscos restantes e skills usadas em mensagem ao usuário (Type: validation; Dependencies: T213, T214; Skills: verification-before-completion; Done: resumo pronto)
- [ ] T216 Sugerir commit semântico ao usuário sem executar commit em `git` (Type: validation; Dependencies: T215; Skills: documentation; Done: mensagem sugerida apresentada)
- [ ] T217 Perguntar autorização explícita ao usuário antes de commitar (Type: validation; Dependencies: T216; Skills: verification-before-completion; Done: autorização recebida ou recusada explicitamente)
- [ ] T218 Após autorização, executar commit e informar hash gerado; se recusado, não commitar (Type: validation; Dependencies: T217; Skills: verification-before-completion; Done: hash informado ou recusa registrada)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 0** blocks all app implementation.
- **Phase 1** depends on Phase 0 and creates project/package baseline.
- **Phase 2** depends on Phase 1 and blocks feature TDD.
- **Phase 3** depends on Phase 2 and blocks Firebase-backed stories.
- **Phase 4** depends on Phase 2/3 and blocks feature services/UI.
- **Phase 5** depends on Phase 2 and blocks user-facing UI.
- **Phases 6-8** can proceed after Phase 4/5, in order: Home -> Catalog -> Product.
- **Phase 9** depends on Product and Cart domain.
- **Phase 10** depends on Cart, Order, Payment and Shipping domains.
- **Phase 11** depends on Firebase/Auth setup and blocks admin.
- **Phase 12** depends on Auth, Admin rules and Product/Order services.
- **Phase 13** depends on Cart/Checkout/Admin foundations.
- **Phase 14** depends on all functional phases.
- **Phase 15** depends on all validations and docs.

### User Story Dependencies

- **US1 Descobrir Produtos no Celular**: Phases 6 and 7; depends on foundational setup, Firebase read model and UI base.
- **US2 Escolher Produto, Variações e WhatsApp**: Phase 8 and product WhatsApp tasks in Phase 9; depends on catalog/product domain.
- **US3 Comprar com Carrinho e Checkout Inicial**: Phases 9 and 10; depends on product detail and cart/order/payment/shipping domains.
- **US4 Administrar Produtos e Pedidos**: Phase 12; depends on auth/roles and Firebase admin rules.
- **US5 Login de Cliente e Dados Mínimos**: Phase 11; depends on Firebase Auth and security foundations.
- **US6 Cupons e Avaliações Iniciais**: Phase 13; depends on cart/checkout, review/coupon domain and admin moderation.

### Critical Path

T001 -> T013 -> T014 -> T026 -> T027 -> T037 -> T038 -> T053 -> T054/T055 -> T056/T057 -> T076 -> T087 -> T090 -> T099 -> T100 -> T112 -> T113 -> T124 -> T125 -> T137 -> T138 -> T153 -> T154 -> T164 -> T165 -> T179 -> T180 -> T194 -> T195 -> T209 -> T210 -> T218.

### Parallel Opportunities

- Phase 0 docs can parallelize after skills are selected: T006-T012.
- Phase 1 structures can parallelize: T017-T019.
- Phase 2 test tool setup can parallelize after T026: T028-T031.
- Phase 3 rules tests can parallelize: T039-T043.
- Phase 4 entity tests can parallelize: T054, T055, T058, T060, T062, T064, T066, T068, T070, T072.
- UI component test groups can parallelize: T076, T078, T080, T082, T084.
- Feature test groups marked [P] can run before their implementation inside each phase.
- Validation tasks in Phase 14 are mostly sequential because later checks depend on earlier fixes.

## Parallel Examples

### Phase 4 Domain Tests

```text
Task: T054 Product/ProductVariant domain tests
Task: T058 Category tests
Task: T060 Cart tests
Task: T066 Coupon tests
Task: T068 Review tests
Task: T070 Shipping tests
Task: T072 Payment tests
```

### US1 Catalog Work

```text
Task: T100 ProductCatalogService tests
Task: T101 search normalization tests
Task: T102 catalog UI tests
Task: T103 Firestore catalog integration test
```

### US4 Admin Work

```text
Task: T165 AdminProductService tests
Task: T166 admin product schema tests
Task: T167 admin product UI tests
Task: T168 admin orders UI tests
Task: T169 product image upload tests
```

## Implementation Strategy

### MVP First

1. Complete Phases 0-5.
2. Complete US1 through Phases 6-7.
3. Complete US2 through Phase 8 and product WhatsApp in Phase 9.
4. Complete US3 through Phases 9-10.
5. Complete US5 before US4 because admin depends on auth.
6. Complete US4 admin.
7. Complete US6 coupons/reviews.
8. Complete Phase 14 quality/deploy and Phase 15 closure.

### Incremental Delivery

- After US1: demo browsing and discovery.
- After US2: demo product detail and variation choice.
- After US3: demo purchase start via cart/checkout/WhatsApp.
- After US5/US4: demo admin product/order operations.
- After US6: demo conversion extras.

## Risks Still Dependent on Client Data

- Official WhatsApp number.
- Instagram and TikTok URLs.
- Product photos, names, prices, categories, variations and availability.
- Local pickup city/address or safe public pickup instructions.
- Decision on whether product images require Firebase Storage in MVP.
- Real payment provider and credentials.
- Real freight provider/API credentials.
- First admin identity and secure bootstrap channel.
- Legal/operational retention expectations for orders and minimal customer data.

## Notes

- Do not implement real payment or Correios integration without credentials and explicit approval.
- Do not add marketplace multi-vendor tasks without explicit scope change.
- Keep all customer-facing text in Brazilian Portuguese.
- Every task group must update README/docs before being considered done.
- Next recommended Spec Kit command after this file: `/speckit.analyze`.
