---
description: "Task list for MVP inicial do e-commerce Ateliê Raios de Sol"
---

# Tasks: MVP Inicial Ateliê Raios de Sol

**Input**: Design documents from `/specs/001-mvp-ecommerce/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [quickstart.md](./quickstart.md), [service-contracts.md](./contracts/service-contracts.md), [routes-and-actions.md](./contracts/routes-and-actions.md), [security-rules-contract.md](./contracts/security-rules-contract.md), [AGENTS.md](../../AGENTS.md)

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

- [X] T001 Consultar o catálogo `https://github.com/sickn33/antigravity-awesome-skills` e registrar candidatos em `docs/skills.md` (Type: docs; Dependencies: none; Skills: context7-auto-research, skill-scanner; Done: catálogo consultado e candidatos listados)
- [X] T002 Avaliar segurança e escopo das skills candidatas em `docs/skills.md` (Type: security; Dependencies: T001; Skills: skill-scanner, logic-lens; Done: riscos e limitações documentados)
- [X] T003 Instalar as skills aprovadas no projeto conforme documentação do catálogo em `.agents/skills/` ou local definido pelo catálogo (Type: config; Dependencies: T002; Skills: development, documentation, design-taste-frontend; Done: skills instaladas e verificáveis localmente)
- [X] T004 Documentar em `docs/skills.md` nome, origem, motivo, ativação, data, limitações e tipos de feature de cada skill (Type: docs; Dependencies: T003; Skills: documentation; Done: matriz de skills completa)
- [X] T005 Definir em `docs/skills.md` quais skills serão usadas por catálogo, produto, carrinho, checkout, Firebase, admin, cupons, avaliações, CI e deploy (Type: docs; Dependencies: T004; Skills: documentation, verification-before-completion; Done: uso por tipo de feature documentado)
- [X] T006 Criar `README.md` inicial com visão geral, stack, status, comandos planejados, env vars planejadas, limitações e política de commit com autorização (Type: docs; Dependencies: T004; Skills: documentation; Done: README cobre seções mínimas da constitution)
- [X] T007 Criar `docs/setup.md` com pré-requisitos, Node/pnpm, Firebase CLI, Vercel CLI opcional e setup local planejado (Type: docs; Dependencies: T004; Skills: documentation, development; Done: setup local reproduzível documentado)
- [X] T008 Criar `docs/architecture.md` com estrutura planejada `src/app`, `components`, `features`, `domain`, `services`, `lib`, `validators`, `tests`, `firebase`, `docs` (Type: docs; Dependencies: T004; Skills: documentation, development; Done: responsabilidades por pasta documentadas)
- [X] T009 Criar `docs/security.md` inicial com ameaças, mitigação, roles, secrets, minimização de dados, rate limit e primeiro admin (Type: docs; Dependencies: T004; Skills: documentation, logic-lens, varlock; Done: segurança base documentada)
- [X] T010 Criar `docs/testing.md` com TDD Red -> Green -> Refactor, Vitest, Testing Library, Playwright, axe-core e Firebase rules tests planejados (Type: docs; Dependencies: T004; Skills: documentation, lambdatest-agent-skills; Done: estratégia de testes documentada)
- [X] T011 Criar `docs/firebase.md` com Firebase CLI, emuladores, Auth, Firestore, Storage condicional, rules, indexes e console steps permitidos (Type: docs; Dependencies: T004; Skills: documentation, context7-auto-research; Done: fluxo Firebase reproduzível documentado)
- [X] T012 Criar `docs/deployment.md` com Vercel preview/produção, variáveis, build, rollback e bloqueios por credenciais mockadas (Type: docs; Dependencies: T004; Skills: documentation, agentic-actions-auditor; Done: deploy planejado documentado)
- [X] T013 Criar ADR `docs/decisions/0001-stack-next-firebase-vercel.md` com contexto, decisão, alternativas e consequências da stack (Type: docs; Dependencies: T006-T012; Skills: documentation, context7-auto-research; Done: ADR da stack criado)
- [X] T014 Criar ADR `docs/decisions/0002-auth-roles-first-admin.md` com estratégia de Auth, roles, primeiro admin e alternativas (Type: docs; Dependencies: T006-T012; Skills: documentation, logic-lens; Done: ADR de auth/roles criado)
- [X] T015 Criar ADR `docs/decisions/0003-payment-shipping-mocks.md` com mocks de pagamento/frete e limites sem credenciais (Type: docs; Dependencies: T006-T012; Skills: documentation, logic-lens; Done: ADR de mocks criado)
- [X] T016 Criar ADR `docs/decisions/0004-firebase-storage-decision.md` decidindo uso de Storage no MVP ou rules deny-all até fase futura (Type: docs; Dependencies: T006-T012; Skills: documentation, logic-lens; Done: decisão Storage documentada)
- [X] T017 Validar que `docs/skills.md`, `README.md`, `docs/setup.md`, `docs/architecture.md`, `docs/security.md`, `docs/testing.md`, `docs/firebase.md`, `docs/deployment.md` e `docs/decisions/` existem (Type: validation; Dependencies: T001-T012, T013-T016; Skills: verification-before-completion; Done: checklist inicial marcado em `docs/skills.md`)

**Checkpoint**: Nenhuma implementação de app começa antes de T017.

---

## Phase 1: Bootstrap do Projeto

**Purpose**: criar base Next.js App Router + TypeScript strict + pnpm sem features de negócio.

- [X] T018 Inicializar projeto Next.js App Router com TypeScript em `package.json`, `src/app/layout.tsx`, `src/app/page.tsx` e `tsconfig.json` (Type: config; Dependencies: T017; Skills: development, context7-auto-research; Done: app inicial sobe localmente)
- [X] T019 Configurar pnpm e lockfile em `package.json` e `pnpm-lock.yaml` (Type: config; Dependencies: T018; Skills: development; Done: instalação reprodutível por `pnpm install`)
- [X] T020 Configurar TypeScript strict e aliases `@/*` em `tsconfig.json` (Type: config; Dependencies: T018; Skills: development; Done: `strict` habilitado e aliases resolvem)
- [X] T021 [P] Criar estrutura de pastas `src/app`, `src/components`, `src/features`, `src/domain`, `src/services`, `src/lib`, `src/validators`, `src/test` (Type: config; Dependencies: T018; Skills: development; Done: estrutura criada conforme plan.md)
- [X] T022 [P] Criar estrutura de testes `tests/unit`, `tests/integration`, `tests/e2e`, `tests/accessibility` (Type: config; Dependencies: T018; Skills: lambdatest-agent-skills; Done: diretórios de testes criados)
- [X] T023 [P] Criar estrutura Firebase `firebase/firestore.rules`, `firebase/firestore.indexes.json`, `firebase/storage.rules`, `firebase/seed` com placeholders seguros (Type: config; Dependencies: T018; Skills: development; Done: arquivos Firebase versionáveis existem)
- [X] T024 Configurar ESLint do Next.js em `eslint.config.*` ou `.eslintrc.*` e script `pnpm lint` em `package.json` (Type: config; Dependencies: T018; Skills: development; Done: `pnpm lint` executa)
- [X] T025 Configurar formatter Prettier ou Biome em arquivo dedicado e scripts em `package.json` (Type: config; Dependencies: T018; Skills: development; Done: comando de format documentado)
- [X] T026 Criar `.env.example` com variáveis públicas Firebase, secrets server-side, WhatsApp, redes sociais, `PAYMENT_PROVIDER=mock` e `SHIPPING_PROVIDER=mock` (Type: security; Dependencies: T018; Skills: varlock, documentation; Done: exemplo não contém secret real)
- [X] T027 Criar testes Red de env schema e bloqueio de secrets públicas em `tests/unit/security/env.test.ts` (Type: test; Dependencies: T020, T026; Skills: varlock, lambdatest-agent-skills; Done: teste falha antes do schema existir)
- [X] T028 Implementar `src/lib/env/schema.ts`, `src/lib/env/server.ts` e `src/lib/env/public.ts` para validar env vars públicas/privadas sem expor secrets (Type: security; Dependencies: T027; Skills: varlock, development; Done: testes de env ficam Green)
- [X] T029 Configurar baseline Vercel em `vercel.json` somente se necessário e documentar ausência se não for necessário (Type: config; Dependencies: T018; Skills: agentic-actions-auditor; Done: baseline de deploy claro)
- [X] T030 Atualizar `README.md`, `docs/setup.md` e `docs/deployment.md` com comandos reais do bootstrap (Type: docs; Dependencies: T018-T029; Skills: documentation; Done: docs refletem comandos criados)
- [X] T031 Rodar `pnpm install`, `pnpm lint` e `pnpm typecheck` quando scripts existirem e registrar resultado em `docs/testing.md` (Type: validation; Dependencies: T018-T030; Skills: verification-before-completion; Done: resultado documentado ou bloqueio explícito)

---

## Phase 2: Test Infrastructure

**Purpose**: configurar ferramentas de TDD antes das features.

- [X] T032 Configurar Vitest em `vitest.config.ts` e scripts `test`, `test:unit`, `test:integration` em `package.json` (Type: config; Dependencies: T031; Skills: lambdatest-agent-skills; Done: Vitest executa teste vazio/smoke)
- [X] T033 Configurar Testing Library e setup de DOM em `src/test/setup.ts` (Type: config; Dependencies: T032; Skills: lambdatest-agent-skills; Done: render de componente smoke funciona)
- [X] T034 Configurar Playwright em `playwright.config.ts` e script `test:e2e` em `package.json` (Type: config; Dependencies: T031; Skills: lambdatest-agent-skills; Done: Playwright instalado e configurado)
- [X] T035 Configurar axe-core ou equivalente para acessibilidade em `tests/accessibility/a11y-smoke.spec.ts` e script `test:a11y` (Type: config; Dependencies: T034; Skills: lambdatest-agent-skills, design-taste-frontend; Done: smoke a11y planejado executa)
- [X] T036 Configurar Firebase Emulator Suite para testes em `firebase.json` e scripts `firebase:emulators`, `test:rules` (Type: config; Dependencies: T023, T032; Skills: development; Done: emuladores configurados)
- [X] T037 Criar helpers de teste em `src/test/factories`, `src/test/fixtures` e `src/test/utils` para produtos, variantes, pedidos, cupons, reviews e usuários (Type: implementation; Dependencies: T032; Skills: lambdatest-agent-skills; Done: factories importáveis em testes)
- [X] T038 [P] Criar teste smoke unitário em `tests/unit/smoke.test.ts` que falha primeiro por falta de implementação de helper mínimo (Type: test; Dependencies: T032; Skills: lambdatest-agent-skills; Done: estado Red registrado)
- [X] T039 Implementar helper mínimo em `src/test/utils/smoke.ts` para passar `tests/unit/smoke.test.ts` (Type: implementation; Dependencies: T038; Skills: development; Done: smoke unitário Green)
- [X] T040 Configurar cobertura em `vitest.config.ts` e script `test:coverage` em `package.json` (Type: config; Dependencies: T032; Skills: lambdatest-agent-skills; Done: coverage gera relatório)
- [X] T041 Criar workflow CI básico/smoke em `.github/workflows/ci.yml` com install limpo e comandos disponíveis de lint/typecheck/test smoke, e atualizar `docs/testing.md` e `README.md` com testes, coverage, E2E, a11y, emuladores e CI básico (Type: ci; Dependencies: T032-T040; Skills: documentation, agentic-actions-auditor, lambdatest-agent-skills; Done: CI básico prepara expansão da Fase 14 e documentação de testes atualizada)

---

## Phase 3: Firebase e Segurança

**Purpose**: configurar Firebase, regras e autorização antes de dados reais.

- [X] T042 Inicializar Firebase via CLI e versionar `firebase.json`, `.firebaserc`, `firebase/firestore.rules`, `firebase/firestore.indexes.json`, `firebase/storage.rules` (Type: config; Dependencies: T041; Skills: development, context7-auto-research; Done: Firebase CLI reproduzível)
- [X] T043 [P] Criar teste Red de rules para leitura pública de produto ativo e bloqueio de produto inativo em `tests/integration/rules/products.rules.test.ts` (Type: test; Dependencies: T042; Skills: lambdatest-agent-skills; Done: teste falha com rules placeholder)
- [X] T044 [P] Criar teste Red de rules para bloquear escrita pública em produtos/categorias em `tests/integration/rules/catalog-write.rules.test.ts` (Type: test; Dependencies: T042; Skills: lambdatest-agent-skills; Done: teste falha com rules placeholder)
- [X] T045 [P] Criar teste Red de rules para cliente ler só próprios pedidos em `tests/integration/rules/orders.rules.test.ts` (Type: test; Dependencies: T042; Skills: lambdatest-agent-skills, logic-lens; Done: teste Red registrado)
- [X] T046 [P] Criar teste Red de rules para admin gerenciar produtos, pedidos, cupons e reviews em `tests/integration/rules/admin.rules.test.ts` (Type: test; Dependencies: T042; Skills: lambdatest-agent-skills, logic-lens; Done: teste Red registrado)
- [X] T047 Confirmar/atualizar decisão `docs/decisions/0004-firebase-storage-decision.md` antes de qualquer teste ou rule de Storage (Type: docs; Dependencies: T016, T042; Skills: documentation, logic-lens; Done: decisão final indica Storage ativo ou deny-all)
- [X] T048 [P] Criar teste Red de Storage rules em `tests/integration/rules/storage.rules.test.ts` conforme decisão: upload admin se Storage ativo ou deny-all se não usado (Type: test; Dependencies: T047; Skills: lambdatest-agent-skills; Done: teste Red reflete decisão Storage)
- [X] T049 Implementar regras mínimas de catálogo público e bloqueio de escrita em `firebase/firestore.rules` (Type: security; Dependencies: T043, T044; Skills: logic-lens; Done: testes de catálogo ficam Green)
- [X] T050 Implementar regras de pedidos, perfis mínimos e payment sessions em `firebase/firestore.rules` (Type: security; Dependencies: T045; Skills: logic-lens; Done: testes de pedidos ficam Green)
- [X] T051 Implementar regras admin para produtos, cupons e reviews em `firebase/firestore.rules` (Type: security; Dependencies: T046; Skills: logic-lens; Done: testes admin ficam Green)
- [X] T052 Implementar `firebase/storage.rules` conforme decisão T047: upload admin com path/tipo/tamanho ou deny-all documentado (Type: security; Dependencies: T048; Skills: logic-lens; Done: testes Storage ficam Green para a decisão escolhida)
- [X] T053 Configurar `firebase/firestore.indexes.json` com índices iniciais de products, orders, coupons e reviews (Type: config; Dependencies: T049-T051; Skills: development; Done: indexes versionados)
- [X] T054 [P] Criar testes Red de Firebase adapters client/admin/emulator em `tests/unit/services/firebase-adapters.test.ts` (Type: test; Dependencies: T042; Skills: lambdatest-agent-skills, varlock; Done: adapters ausentes falham)
- [X] T055 Criar adapters Firebase client/admin em `src/lib/firebase/client.ts`, `src/lib/firebase/admin.ts`, `src/lib/firebase/emulator.ts` (Type: implementation; Dependencies: T054; Skills: development; Done: adapters tipados e sem secrets no cliente)
- [X] T056 [P] Criar testes Red de contrato de roles/custom claims em `tests/unit/security/roles.test.ts` (Type: test; Dependencies: T055, T014; Skills: lambdatest-agent-skills, logic-lens; Done: roles ausentes falham)
- [X] T057 Criar contrato de roles em `src/lib/security/roles.ts` e estratégia de custom claims/fallback controlado em `docs/security.md` (Type: security; Dependencies: T056; Skills: varlock, logic-lens; Done: roles documentadas e tipadas)
- [X] T058 Criar testes Red de rate limit/proteção contra abuso em `tests/unit/security/rate-limit.test.ts` (Type: test; Dependencies: T041; Skills: lambdatest-agent-skills, logic-lens; Done: limitador ausente falha)
- [X] T059 Implementar `src/lib/security/rate-limit.ts` com contrato reutilizável para actions/endpoints sensíveis (Type: security; Dependencies: T058; Skills: logic-lens; Done: testes de rate limit Green)
- [X] T060 Atualizar `docs/firebase.md`, `docs/security.md`, `docs/testing.md` e `README.md` com CLI, emuladores, rules, indexes, roles e primeiro admin (Type: docs; Dependencies: T042-T059; Skills: documentation; Done: docs Firebase/segurança atualizadas)

---

## Phase 4: Modelo de Domínio e Validação

**Purpose**: criar tipos, schemas e regras puras antes da UI e integrações.

- [X] T061 [P] Criar testes Red de Product e ProductVariant em `tests/unit/domain/product.test.ts` (Type: test; Dependencies: T041; Skills: lambdatest-agent-skills; Done: validações esperadas falham)
- [X] T062 [P] Criar testes Red de schemas Product/ProductVariant em `tests/unit/validators/product.schema.test.ts` (Type: test; Dependencies: T041; Skills: lambdatest-agent-skills; Done: schemas ausentes falham)
- [X] T063 [P] Criar testes Red de sanitização/XSS para nome, descrição e campos admin públicos em `tests/unit/security/sanitize-public-fields.test.ts` (Type: test; Dependencies: T041; Skills: lambdatest-agent-skills, logic-lens; Done: payloads maliciosos falham antes do sanitizer)
- [X] T064 Implementar sanitização/escaping reutilizável em `src/lib/security/sanitize.ts` para campos públicos cadastrados por admin (Type: security; Dependencies: T063; Skills: logic-lens; Done: testes de sanitização Green)
- [X] T065 Implementar tipos e regras Product/ProductVariant em `src/domain/product/types.ts`, `src/domain/product/rules.ts` (Type: implementation; Dependencies: T061; Skills: development; Done: testes de domínio Green)
- [X] T066 Implementar schemas Product/ProductVariant em `src/validators/product.ts` usando `src/lib/security/sanitize.ts` para nome/descrição públicos (Type: implementation; Dependencies: T062, T064; Skills: development, logic-lens; Done: testes de schema e XSS Green)
- [X] T067 [P] Criar testes Red de Category em `tests/unit/domain/category.test.ts` e `tests/unit/validators/category.schema.test.ts` (Type: test; Dependencies: T041; Skills: lambdatest-agent-skills; Done: testes Red)
- [X] T068 Implementar Category em `src/domain/product/category.ts` e `src/validators/category.ts` (Type: implementation; Dependencies: T067; Skills: development; Done: categorias iniciais validadas)
- [X] T069 [P] Criar testes Red de Cart em `tests/unit/domain/cart.test.ts` para add/remove/quantity/subtotal/invalid variation (Type: test; Dependencies: T065; Skills: lambdatest-agent-skills; Done: regras de carrinho falham)
- [X] T070 Implementar Cart domain em `src/domain/cart/types.ts`, `src/domain/cart/rules.ts` (Type: implementation; Dependencies: T069; Skills: development; Done: testes Cart Green)
- [X] T071 [P] Criar testes Red de Order e state transitions em `tests/unit/domain/order.test.ts` (Type: test; Dependencies: T070; Skills: lambdatest-agent-skills; Done: transições falham)
- [X] T072 Implementar Order domain em `src/domain/order/types.ts`, `src/domain/order/rules.ts` (Type: implementation; Dependencies: T071; Skills: development, logic-lens; Done: testes Order Green)
- [X] T073 [P] Criar testes Red de CustomerProfile mínimo e AdminUser em `tests/unit/domain/user.test.ts` (Type: test; Dependencies: T057; Skills: lambdatest-agent-skills; Done: validações de dados mínimos falham)
- [X] T074 Implementar CustomerProfile/AdminUser domain em `src/domain/customer/types.ts`, `src/domain/customer/rules.ts`, `src/domain/admin/types.ts` (Type: implementation; Dependencies: T073; Skills: development, logic-lens; Done: testes user Green)
- [X] T075 [P] Criar testes Red de Coupon em `tests/unit/domain/coupon.test.ts` e schema em `tests/unit/validators/coupon.schema.test.ts` (Type: test; Dependencies: T041; Skills: lambdatest-agent-skills; Done: regras de cupom falham)
- [X] T076 Implementar Coupon domain/schema em `src/domain/coupon/types.ts`, `src/domain/coupon/rules.ts`, `src/validators/coupon.ts` (Type: implementation; Dependencies: T075; Skills: development; Done: testes Coupon Green)
- [X] T077 [P] Criar testes Red de Review em `tests/unit/domain/review.test.ts` e schema em `tests/unit/validators/review.schema.test.ts` (Type: test; Dependencies: T041; Skills: lambdatest-agent-skills; Done: regras de review falham)
- [X] T078 Implementar Review domain/schema em `src/domain/review/types.ts`, `src/domain/review/rules.ts`, `src/validators/review.ts` (Type: implementation; Dependencies: T077; Skills: development, logic-lens; Done: testes Review Green)
- [X] T079 [P] Criar testes Red de ShippingOption em `tests/unit/domain/shipping.test.ts` (Type: test; Dependencies: T041; Skills: lambdatest-agent-skills; Done: cálculo/estado mock falha)
- [X] T080 Implementar ShippingOption domain em `src/domain/shipping/types.ts`, `src/domain/shipping/rules.ts` (Type: implementation; Dependencies: T079; Skills: development; Done: testes Shipping Green)
- [X] T081 [P] Criar testes Red de PaymentSession em `tests/unit/domain/payment.test.ts` (Type: test; Dependencies: T041; Skills: lambdatest-agent-skills; Done: transições de pagamento falham)
- [X] T082 Implementar PaymentSession abstrata em `src/domain/payment/types.ts`, `src/domain/payment/rules.ts` (Type: implementation; Dependencies: T081; Skills: development, logic-lens; Done: testes Payment Green)
- [X] T083 Criar barrel exports controlados em `src/domain/index.ts` e `src/validators/index.ts` (Type: implementation; Dependencies: T065-T082; Skills: development; Done: imports limpos e sem ciclos)
- [X] T084 Atualizar `docs/architecture.md`, `docs/security.md`, `docs/testing.md` e `README.md` com entidades, validações e minimização de dados (Type: docs; Dependencies: T061-T083; Skills: documentation; Done: docs refletem domínio)

---

## Phase 5: UI Base/Design System Mobile-First

**Purpose**: base visual simples, acessível e prática para todas as telas.

- [X] T085 [P] Criar testes Red de tokens de design em `tests/unit/components/design-tokens.test.ts` (Type: test; Dependencies: T041; Skills: design-taste-frontend, lambdatest-agent-skills; Done: tokens esperados ausentes falham)
- [X] T086 Implementar tokens simples em `src/components/ui/tokens.ts` e estilos globais em `src/app/globals.css` (Type: implementation; Dependencies: T085; Skills: design-taste-frontend; Done: tokens aplicáveis e contraste documentado)
- [X] T087 [P] Criar testes Red de Button/Input/Select em `tests/unit/components/form-controls.test.tsx` (Type: test; Dependencies: T033; Skills: design-taste-frontend, lambdatest-agent-skills; Done: controles acessíveis falham)
- [X] T088 Implementar `Button`, `Input`, `Select` em `src/components/ui/` com labels, foco visível e estados (Type: implementation; Dependencies: T087; Skills: design-taste-frontend; Done: testes de controles Green)
- [X] T089 [P] Criar testes Red de Card/Badge/Price em `tests/unit/components/display.test.tsx` (Type: test; Dependencies: T033; Skills: design-taste-frontend; Done: componentes de display falham)
- [X] T090 Implementar `Card`, `Badge`, `Price` em `src/components/ui/` (Type: implementation; Dependencies: T089; Skills: design-taste-frontend; Done: testes de display Green)
- [X] T091 [P] Criar testes Red de Modal/Drawer mobile em `tests/unit/components/overlay.test.tsx` (Type: test; Dependencies: T033; Skills: design-taste-frontend, lambdatest-agent-skills; Done: foco/keyboard falha)
- [X] T092 Implementar Modal/Drawer acessível em `src/components/ui/` (Type: implementation; Dependencies: T091; Skills: design-taste-frontend; Done: foco preso e fechamento por teclado funcionam)
- [X] T093 [P] Criar testes Red de Loading/Empty/Error states em `tests/unit/components/states.test.tsx` (Type: test; Dependencies: T033; Skills: design-taste-frontend; Done: estados ausentes falham)
- [X] T094 Implementar `LoadingState`, `EmptyState`, `ErrorMessage` em `src/components/ui/` (Type: implementation; Dependencies: T093; Skills: design-taste-frontend; Done: mensagens PT-BR acessíveis)
- [X] T095 Criar teste Red de app shell em `tests/unit/components/app-shell.test.tsx` para header, footer e navegação mobile (Type: test; Dependencies: T033, T094; Skills: design-taste-frontend; Done: shell esperado falha)
- [X] T096 Implementar layout base em `src/components/layout/AppShell.tsx`, `Header.tsx`, `Footer.tsx`, `MobileNav.tsx` e conectar em `src/app/layout.tsx` (Type: implementation; Dependencies: T095; Skills: design-taste-frontend; Done: shell mobile-first Green)
- [X] T097 Criar teste de acessibilidade Red para UI base em `tests/accessibility/ui-base.spec.ts` (Type: test; Dependencies: T096; Skills: lambdatest-agent-skills, design-taste-frontend; Done: axe encontra falhas esperadas antes dos ajustes)
- [X] T098 Atualizar `docs/architecture.md`, `docs/testing.md`, `README.md` e registrar skills de frontend em `docs/skills.md` (Type: docs; Dependencies: T085-T097; Skills: documentation, design-taste-frontend; Done: design system documentado)

---

## Phase 6: Home e SEO Base

**Goal**: entregar home simples com marca, chamada, destaques, catálogo, WhatsApp, redes sociais e SEO base.

**Independent Test**: em viewport mobile, a home mostra marca, CTA de catálogo, CTA WhatsApp, destaques e links sociais; metadados existem; acessibilidade básica passa.

- [X] T099 [P] [US1] Criar teste Red de renderização da home em `tests/unit/features/home/home.test.tsx` (Type: test; Dependencies: T096; Skills: lambdatest-agent-skills, design-taste-frontend; Done: expectativa de marca/CTAs falhou antes da home existir)
- [X] T100 [P] [US1] Criar teste Red de SEO base em `tests/unit/seo/home-metadata.test.ts` cobrindo metadata, Open Graph, robots e sitemap (Type: test; Dependencies: T041; Skills: lambdatest-agent-skills; Done: metadata/OG/robots/sitemap ausentes falharam)
- [X] T101 [P] [US1] Criar teste Red de CTA WhatsApp/social links em `tests/unit/features/home/social-links.test.tsx` (Type: test; Dependencies: T096; Skills: lambdatest-agent-skills; Done: links configuráveis falharam antes da config)
- [X] T102 [US1] Implementar config de marca/social em `src/lib/config/store.ts` e validação em `src/lib/env/schema.ts` (Type: implementation; Dependencies: T101; Skills: varlock, development; Done: links leem env/config sem quebrar se ausentes)
- [X] T103 [US1] Implementar home em `src/app/(store)/page.tsx` e componentes `src/features/home/` (Type: implementation; Dependencies: T099, T102; Skills: design-taste-frontend; Done: teste home Green)
- [X] T104 [US1] Implementar metadados base e Open Graph em `src/app/layout.tsx` e `src/lib/seo/metadata.ts` (Type: implementation; Dependencies: T100; Skills: development; Done: metadata e Open Graph cobertos pelo teste SEO base)
- [X] T105 [P] [US1] Criar teste E2E Red mobile para home em `tests/e2e/home.spec.ts` (Type: test; Dependencies: T103; Skills: lambdatest-agent-skills; Done: fluxo home mobile criado para viewport celular)
- [X] T106 [US1] Ajustar home para passar E2E mobile e acessibilidade em `src/app/(store)/page.tsx` (Type: implementation; Dependencies: T105; Skills: design-taste-frontend; Done: home preparada para E2E e axe)
- [X] T107 [US1] Criar/atualizar robots e sitemap base em `src/app/robots.ts`, `src/app/sitemap.ts` (Type: implementation; Dependencies: T100, T104; Skills: development; Done: rotas SEO base existem e teste SEO base Green)
- [X] T108 [US1] Atualizar `README.md`, `docs/architecture.md`, `docs/testing.md` e `docs/skills.md` com home/SEO base (Type: docs; Dependencies: T099-T107; Skills: documentation; Done: documentação do grupo atualizada)

---

## Phase 7: Catálogo, Busca e Filtros

**Goal**: permitir navegação por catálogo, busca por nome e filtros mobile por categoria, preço e disponibilidade.

**Independent Test**: cliente encontra produto por catálogo, busca ou filtros em celular e vê estados vazio/carregando/erro.

- [X] T109 [P] [US1] Criar testes Red de ProductCatalogService em `tests/unit/services/product-catalog.test.ts` (Type: test; Dependencies: T065-T068; Skills: lambdatest-agent-skills; Done: listagem/filtros falharam antes do serviço existir)
- [X] T110 [P] [US1] Criar testes Red de query normalization/search em `tests/unit/domain/product/search.test.ts` (Type: test; Dependencies: T065; Skills: lambdatest-agent-skills; Done: busca normalizada falhou antes do domínio de busca)
- [X] T111 [P] [US1] Criar testes Red de ProductCard e filtros em `tests/unit/features/catalog/catalog-ui.test.tsx` (Type: test; Dependencies: T090; Skills: design-taste-frontend, lambdatest-agent-skills; Done: UI catálogo falhou antes dos componentes)
- [X] T112 [P] [US1] Criar teste Red de integração Firestore catálogo em `tests/integration/firebase/catalog-read.test.ts` (Type: test; Dependencies: T055; Skills: lambdatest-agent-skills; Done: leitura pública do catálogo coberta para execução com emulador)
- [X] T113 [US1] Implementar ProductCatalogService em `src/services/firebase/product-catalog.ts` (Type: implementation; Dependencies: T109, T112; Skills: development; Done: serviço local/mock lista e filtra catálogo)
- [X] T114 [US1] Implementar busca normalizada em `src/domain/product/search.ts` e campo planejado de índice em `src/domain/product/types.ts` (Type: implementation; Dependencies: T110; Skills: development; Done: testes de busca Green)
- [X] T115 [US1] Implementar ProductCard e filtros mobile em `src/components/product/ProductCard.tsx`, `src/features/catalog/CatalogFilters.tsx` (Type: implementation; Dependencies: T111; Skills: design-taste-frontend; Done: UI catálogo Green)
- [X] T116 [US1] Implementar rota catálogo em `src/app/(store)/catalog/page.tsx` com query params `q`, `category`, `minPrice`, `maxPrice`, `availability` (Type: implementation; Dependencies: T113-T115; Skills: development, design-taste-frontend; Done: catálogo renderiza e filtra em `/catalog`)
- [X] T117 [P] [US1] Criar teste E2E Red mobile de busca/filtros em `tests/e2e/catalog.spec.ts` com assertion de resposta percebida até 2s para SC-002 (Type: test; Dependencies: T116; Skills: lambdatest-agent-skills; Done: busca/filtros E2E falharam antes do fluxo final)
- [X] T118 [US1] Ajustar UX mobile de filtros, estados loading/empty/error em `src/features/catalog/` para passar E2E e métrica SC-002 (Type: implementation; Dependencies: T117; Skills: design-taste-frontend; Done: E2E catálogo Green com aplicação explícita de filtros)
- [X] T119 [US1] Adicionar seeds de catálogo em `firebase/seed/products.ts` apenas para emulador/desenvolvimento (Type: config; Dependencies: T113; Skills: development; Done: seed sem dados reais sensíveis)
- [X] T120 [US1] Atualizar índices de produtos em `firebase/firestore.indexes.json` para status/categoria/preço/disponibilidade (Type: config; Dependencies: T116; Skills: development; Done: índices necessários versionados)
- [X] T121 [US1] Atualizar `README.md`, `docs/firebase.md`, `docs/testing.md`, `docs/architecture.md`, `docs/skills.md` para catálogo/busca/filtros (Type: docs; Dependencies: T109-T120; Skills: documentation; Done: docs do catálogo atualizadas)

---

## Phase 8: Página de Produto

**Goal**: exibir detalhes, fotos, variações tamanho/cor, disponibilidade, adicionar ao carrinho e WhatsApp direto.

**Independent Test**: cliente abre produto, escolhe variação válida, vê indisponibilidade corretamente e inicia carrinho ou WhatsApp.

- [X] T122 [P] [US2] Criar testes Red de seleção de variação em `tests/unit/domain/product/variant-selection.test.ts` (Type: test; Dependencies: T065; Skills: lambdatest-agent-skills; Done: seleção falha)
- [X] T123 [P] [US2] Criar testes Red de página de produto em `tests/unit/features/product/product-page.test.tsx` (Type: test; Dependencies: T096; Skills: lambdatest-agent-skills, design-taste-frontend; Done: detalhes/CTAs falham)
- [X] T124 [P] [US2] Criar testes Red de metadata de produto em `tests/unit/seo/product-metadata.test.ts` (Type: test; Dependencies: T104; Skills: lambdatest-agent-skills; Done: metadata produto falha)
- [X] T125 [P] [US2] Criar teste Red de integração buscar produto por slug em `tests/integration/firebase/product-detail.test.ts` (Type: test; Dependencies: T113; Skills: lambdatest-agent-skills; Done: detalhe por slug falha)
- [X] T126 [US2] Implementar seleção de variação em `src/domain/product/variant-selection.ts` (Type: implementation; Dependencies: T122; Skills: development; Done: testes seleção Green)
- [X] T127 [US2] Implementar serviço de detalhe em `src/services/firebase/product-detail.ts` (Type: implementation; Dependencies: T125; Skills: development; Done: teste integração Green)
- [X] T128 [US2] Implementar componentes de fotos, variações e disponibilidade em `src/features/product/` e `src/components/product/` (Type: implementation; Dependencies: T123, T126; Skills: design-taste-frontend; Done: teste UI Green)
- [X] T129 [US2] Implementar rota `src/app/(store)/products/[slug]/page.tsx` com dados, CTAs e fallback de foto acessível (Type: implementation; Dependencies: T127, T128; Skills: development, design-taste-frontend; Done: página produto renderiza)
- [X] T130 [US2] Implementar metadata por produto em `src/app/(store)/products/[slug]/page.tsx` e `src/lib/seo/product.ts` (Type: implementation; Dependencies: T124, T129; Skills: development; Done: teste SEO produto Green)
- [X] T131 [P] [US2] Criar teste E2E Red de produto/variação/indisponibilidade em `tests/e2e/product.spec.ts` (Type: test; Dependencies: T129; Skills: lambdatest-agent-skills; Done: E2E produto falha)
- [X] T132 [US2] Ajustar página de produto para passar E2E mobile e a11y em `src/features/product/` (Type: implementation; Dependencies: T131; Skills: design-taste-frontend; Done: E2E produto Green)
- [X] T133 [US2] Atualizar `README.md`, `docs/architecture.md`, `docs/testing.md` e `docs/skills.md` com página de produto (Type: docs; Dependencies: T122-T132; Skills: documentation; Done: docs do produto atualizadas)

---

## Phase 9: Carrinho e WhatsApp

**Goal**: carrinho local persistente, subtotal correto e WhatsApp para produto/carrinho.

**Independent Test**: cliente adiciona, remove, altera quantidade, mantém carrinho local e gera mensagem WhatsApp correta.

- [ ] T134 [P] [US3] Criar testes Red de persistência local do carrinho em `tests/unit/features/cart/cart-storage.test.ts` (Type: test; Dependencies: T070; Skills: lambdatest-agent-skills; Done: storage ausente falha)
- [ ] T135 [P] [US3] Criar testes Red de Cart UI em `tests/unit/features/cart/cart-ui.test.tsx` (Type: test; Dependencies: T096; Skills: lambdatest-agent-skills, design-taste-frontend; Done: UI carrinho falha)
- [ ] T136 [P] [US2] Criar testes Red de WhatsAppService para produto em `tests/unit/services/whatsapp-product.test.ts` (Type: test; Dependencies: T126; Skills: lambdatest-agent-skills; Done: mensagem produto falha)
- [ ] T137 [P] [US3] Criar testes Red de WhatsAppService para carrinho em `tests/unit/services/whatsapp-cart.test.ts` (Type: test; Dependencies: T070; Skills: lambdatest-agent-skills; Done: mensagem carrinho falha)
- [ ] T138 [US3] Implementar cart storage em `src/features/cart/cart-storage.ts` sem dados pessoais (Type: implementation; Dependencies: T134; Skills: development, logic-lens; Done: testes storage Green)
- [ ] T139 [US3] Implementar estado/actions do carrinho em `src/features/cart/cart-state.ts` e `src/features/cart/useCart.ts` (Type: implementation; Dependencies: T070, T138; Skills: development; Done: add/remove/quantity Green)
- [ ] T140 [US2] Implementar WhatsAppService de produto em `src/services/whatsapp/product-message.ts` (Type: implementation; Dependencies: T136; Skills: development; Done: teste WhatsApp produto Green)
- [ ] T141 [US3] Implementar WhatsAppService de carrinho em `src/services/whatsapp/cart-message.ts` (Type: implementation; Dependencies: T137; Skills: development; Done: teste WhatsApp carrinho Green)
- [ ] T142 [US3] Implementar rota carrinho em `src/app/(store)/cart/page.tsx` e componentes em `src/features/cart/` (Type: implementation; Dependencies: T135, T139, T141; Skills: design-taste-frontend; Done: UI carrinho Green)
- [ ] T143 [US2] Conectar botão adicionar ao carrinho e WhatsApp em `src/features/product/` (Type: implementation; Dependencies: T129, T139, T140; Skills: development; Done: produto adiciona item válido ao carrinho)
- [ ] T144 [P] [US3] Criar teste E2E Red de carrinho e WhatsApp em `tests/e2e/cart-whatsapp.spec.ts` (Type: test; Dependencies: T142, T143; Skills: lambdatest-agent-skills; Done: E2E falha)
- [ ] T145 [US3] Ajustar carrinho e WhatsApp para passar E2E mobile em `src/features/cart/` e `src/services/whatsapp/` (Type: implementation; Dependencies: T144; Skills: design-taste-frontend; Done: E2E cart/WhatsApp Green)
- [ ] T146 [US3] Atualizar `README.md`, `docs/architecture.md`, `docs/testing.md`, `docs/security.md` e `docs/skills.md` com carrinho local e WhatsApp (Type: docs; Dependencies: T134-T145; Skills: documentation; Done: docs de carrinho/WhatsApp atualizadas)

---

## Phase 10: Checkout, Pedidos, Pagamento Mockado e Frete Mockado

**Goal**: finalizar pedido com dados mínimos, retirada/entrega, frete mockado, pagamento mockado e registro seguro de pedido.

**Independent Test**: cliente revisa carrinho, informa dados mínimos, escolhe entrega/pagamento e cria pedido com status inicial correto.

- [ ] T147 [P] [US3] Criar testes Red de ShippingService mockado em `tests/unit/services/shipping-mock.test.ts` (Type: test; Dependencies: T080; Skills: lambdatest-agent-skills; Done: cálculo mock falha)
- [ ] T148 [P] [US3] Criar testes Red de PaymentService mockado em `tests/unit/services/payment-mock.test.ts` (Type: test; Dependencies: T082; Skills: lambdatest-agent-skills; Done: sessão mock falha)
- [ ] T149 [P] [US3] Criar testes Red de OrderService em `tests/unit/services/order-service.test.ts` (Type: test; Dependencies: T072; Skills: lambdatest-agent-skills; Done: criação de pedido falha)
- [ ] T150 [P] [US3] Criar testes Red de schemas checkout/order em `tests/unit/validators/checkout.schema.test.ts` (Type: test; Dependencies: T072; Skills: lambdatest-agent-skills; Done: dados mínimos falham)
- [ ] T151 [P] [US3] Criar teste Red de Server Action `createOrder` em `tests/integration/actions/create-order.test.ts` (Type: test; Dependencies: T055, T149; Skills: lambdatest-agent-skills, logic-lens; Done: action ausente falha)
- [ ] T152 [P] [US3] Criar teste Red de `quoteShipping` em `tests/integration/actions/quote-shipping.test.ts` (Type: test; Dependencies: T147; Skills: lambdatest-agent-skills; Done: action frete falha)
- [ ] T153 [P] [US3] Criar teste Red de rate limit para `createOrder` em `tests/integration/actions/create-order-rate-limit.test.ts` (Type: test; Dependencies: T059, T151; Skills: lambdatest-agent-skills, logic-lens; Done: abuso em createOrder falha sem bloqueio)
- [ ] T154 [P] [US3] Criar teste Red de rate limit para `quoteShipping` em `tests/integration/actions/quote-shipping-rate-limit.test.ts` (Type: test; Dependencies: T059, T152; Skills: lambdatest-agent-skills, logic-lens; Done: abuso em quoteShipping falha sem bloqueio)
- [ ] T155 [US3] Implementar ShippingService mockado em `src/services/shipping/mock-shipping-service.ts` e contrato em `src/services/shipping/types.ts` (Type: implementation; Dependencies: T147; Skills: development; Done: teste frete Green)
- [ ] T156 [US3] Implementar PaymentService mockado em `src/services/payment/mock-payment-service.ts` e contrato em `src/services/payment/types.ts` (Type: implementation; Dependencies: T148; Skills: development, logic-lens; Done: teste pagamento Green)
- [ ] T157 [US3] Implementar schemas checkout/order em `src/validators/checkout.ts`, `src/validators/order.ts` (Type: implementation; Dependencies: T150; Skills: development, logic-lens; Done: teste schema Green)
- [ ] T158 [US3] Implementar OrderService em `src/services/firebase/order-service.ts` com snapshot e minimização de dados (Type: implementation; Dependencies: T149, T157; Skills: development, logic-lens; Done: teste OrderService Green)
- [ ] T159 [US3] Implementar actions `createOrder`, `quoteShipping`, `createPaymentSession` em `src/app/actions/checkout.ts` com rate limit/proteção contra abuso (Type: implementation; Dependencies: T151, T152, T155, T156, T158, T153, T154; Skills: development, logic-lens; Done: testes actions e rate limit Green)
- [ ] T160 [US3] Implementar UI checkout em `src/app/(store)/checkout/page.tsx` e `src/features/checkout/` (Type: implementation; Dependencies: T159; Skills: design-taste-frontend; Done: checkout mobile-first funcional)
- [ ] T161 [P] [US3] Criar teste E2E Red checkout em `tests/e2e/checkout.spec.ts` com assertion de fluxo principal em até 4 ações quando aplicável e cenários de carrinho SC-003 (Type: test; Dependencies: T160; Skills: lambdatest-agent-skills; Done: E2E checkout e métricas SC-001/SC-003 falham)
- [ ] T162 [US3] Ajustar checkout para passar E2E, mensagens de erro acessíveis e métricas SC-001/SC-003 em `src/features/checkout/` (Type: implementation; Dependencies: T161; Skills: design-taste-frontend; Done: E2E checkout Green e métricas registradas)
- [ ] T163 [US3] Atualizar regras/índices de pedidos em `firebase/firestore.rules`, `firebase/firestore.indexes.json` (Type: security; Dependencies: T158, T159; Skills: logic-lens; Done: rules tests de pedido continuam Green)
- [ ] T164 [US3] Atualizar `README.md`, `docs/security.md`, `docs/firebase.md`, `docs/testing.md`, `docs/architecture.md`, `docs/skills.md` com checkout, privacidade, frete/pagamento mockados (Type: docs; Dependencies: T147-T163; Skills: documentation; Done: docs de checkout atualizadas)

---

## Phase 11: Login e Autorização

**Goal**: autenticação Firebase para cliente/admin, rotas protegidas e estratégia segura de roles.

**Independent Test**: cliente navega sem login, faz login quando necessário, admin acessa painel, não-admin é bloqueado.

- [ ] T165 [P] [US5] Criar testes Red de AuthService em `tests/unit/services/auth-service.test.ts` (Type: test; Dependencies: T055; Skills: lambdatest-agent-skills; Done: auth service falha)
- [ ] T166 [P] [US5] Criar testes Red de guards/roles em `tests/unit/security/guards.test.ts` (Type: test; Dependencies: T057; Skills: lambdatest-agent-skills, logic-lens; Done: guards falham)
- [ ] T167 [P] [US5] Criar teste Red de login UI em `tests/unit/features/auth/login-page.test.tsx` (Type: test; Dependencies: T096; Skills: lambdatest-agent-skills, design-taste-frontend; Done: login UI falha)
- [ ] T168 [P] [US5] Criar teste Red de integração Auth Emulator em `tests/integration/firebase/auth.test.ts` (Type: test; Dependencies: T042; Skills: lambdatest-agent-skills; Done: auth emulator falha)
- [ ] T169 [US5] Implementar AuthService em `src/services/firebase/auth-service.ts` (Type: implementation; Dependencies: T165, T168; Skills: development; Done: testes AuthService Green)
- [ ] T170 [US5] Implementar guards e helpers de sessão/role em `src/lib/security/guards.ts`, `src/lib/security/session.ts` (Type: security; Dependencies: T166, T169; Skills: logic-lens; Done: testes guards Green)
- [ ] T171 [US5] Implementar rota login em `src/app/(auth)/login/page.tsx` e componentes em `src/features/auth/` (Type: implementation; Dependencies: T167, T169; Skills: design-taste-frontend; Done: login UI Green)
- [ ] T172 [US5] Implementar proteção de rotas admin em `src/middleware.ts` ou guards server-side em `src/app/admin/layout.tsx` (Type: security; Dependencies: T170; Skills: logic-lens; Done: não-admin bloqueado)
- [ ] T173 [P] [US5] Criar teste Red de rate limit/proteção contra abuso para login e ações admin sensíveis em `tests/integration/actions/auth-admin-rate-limit.test.ts` (Type: test; Dependencies: T059, T170; Skills: lambdatest-agent-skills, logic-lens; Done: abuso em login/admin falha sem bloqueio)
- [ ] T174 [US5] Aplicar rate limit/proteção contra abuso a login e guards/actions admin sensíveis em `src/lib/security/` e `src/features/auth/` (Type: security; Dependencies: T173, T171, T172; Skills: logic-lens; Done: testes de abuso login/admin Green)
- [ ] T175 [P] [US5] Criar teste E2E Red login/authorization em `tests/e2e/auth.spec.ts` (Type: test; Dependencies: T171, T172, T174; Skills: lambdatest-agent-skills; Done: E2E auth falha)
- [ ] T176 [US5] Ajustar login e autorização para passar E2E em `src/features/auth/`, `src/lib/security/` (Type: implementation; Dependencies: T175; Skills: development, logic-lens; Done: E2E auth Green)
- [ ] T177 [US5] Atualizar `docs/security.md`, `docs/firebase.md`, `README.md`, `docs/skills.md` com Firebase Auth, roles e primeiro admin (Type: docs; Dependencies: T165-T176; Skills: documentation; Done: primeiro admin documentado)

---

## Phase 12: Painel Admin

**Goal**: administradora cadastra/edita/desativa produtos e visualiza pedidos.

**Independent Test**: admin autenticada gerencia produtos e pedidos; cliente/visitante não acessa painel.

- [ ] T178 [P] [US4] Criar testes Red de AdminProductService em `tests/unit/services/admin-product-service.test.ts` (Type: test; Dependencies: T065-T068, T170; Skills: lambdatest-agent-skills; Done: CRUD admin falha)
- [ ] T179 [P] [US4] Criar teste Red de ProductForm schema e sanitização/XSS de campos admin públicos em `tests/unit/validators/admin-product.schema.test.ts` (Type: test; Dependencies: T066, T064; Skills: lambdatest-agent-skills, logic-lens; Done: formulário inválido e payload malicioso falham)
- [ ] T180 [P] [US4] Criar testes Red de admin UI produtos em `tests/unit/features/admin/products-admin.test.tsx` (Type: test; Dependencies: T096; Skills: design-taste-frontend, lambdatest-agent-skills; Done: UI admin falha)
- [ ] T181 [P] [US4] Criar testes Red de admin orders UI em `tests/unit/features/admin/orders-admin.test.tsx` (Type: test; Dependencies: T096; Skills: design-taste-frontend, lambdatest-agent-skills; Done: pedidos admin falham)
- [ ] T182 [P] [US4] Criar testes Red de upload/associação de foto em `tests/integration/firebase/product-images.test.ts` somente se Storage estiver ativo na decisão T047; se não, validar deny-all documentado (Type: test; Dependencies: T052, T047; Skills: lambdatest-agent-skills; Done: comportamento Storage ativo ou deny-all falha antes da implementação)
- [ ] T183 [US4] Implementar AdminProductService em `src/services/firebase/admin-product-service.ts` (Type: implementation; Dependencies: T178, T179; Skills: development, logic-lens; Done: testes serviço Green)
- [ ] T184 [US4] Implementar ProductForm e validações sanitizadas em `src/features/admin/products/ProductForm.tsx`, `src/validators/admin-product.ts` usando `src/lib/security/sanitize.ts` (Type: implementation; Dependencies: T179, T180; Skills: design-taste-frontend, logic-lens; Done: formulário admin Green e payload malicioso não executa)
- [ ] T185 [US4] Implementar rotas admin produtos em `src/app/admin/products/page.tsx`, `src/app/admin/products/[id]/page.tsx` (Type: implementation; Dependencies: T183, T184; Skills: development; Done: admin produtos funcional)
- [ ] T186 [US4] Implementar upload/associação de foto em `src/services/firebase/product-images.ts` e `src/features/admin/products/ProductImages.tsx` somente se Storage estiver ativo; se não, manter caminho desabilitado e documentado (Type: implementation; Dependencies: T182, T047; Skills: development, logic-lens; Done: upload seguro ou alternativa deny-all documentada)
- [ ] T187 [US4] Implementar AdminOrderService em `src/services/firebase/admin-order-service.ts` (Type: implementation; Dependencies: T158, T170, T181; Skills: development; Done: pedidos admin acessíveis por admin)
- [ ] T188 [US4] Implementar rotas admin pedidos em `src/app/admin/orders/page.tsx` e componentes em `src/features/admin/orders/` (Type: implementation; Dependencies: T187; Skills: design-taste-frontend; Done: pedidos aparecem com status e valores)
- [ ] T189 [US4] Criar dashboard admin simples em `src/app/admin/page.tsx` (Type: implementation; Dependencies: T185, T188; Skills: design-taste-frontend; Done: dashboard mostra atalhos e resumo simples)
- [ ] T190 [P] [US4] Criar teste Red de rate limit/proteção contra abuso em actions admin de produto/pedido em `tests/integration/actions/admin-rate-limit.test.ts` (Type: test; Dependencies: T059, T183, T187; Skills: lambdatest-agent-skills, logic-lens; Done: abuso em admin actions falha sem bloqueio)
- [ ] T191 [US4] Aplicar rate limit/proteção contra abuso em admin create/update product e update order status em `src/app/actions/admin.ts` (Type: security; Dependencies: T190, T183, T187; Skills: logic-lens; Done: testes de rate limit admin Green)
- [ ] T192 [P] [US4] Criar teste E2E Red admin produtos/pedidos em `tests/e2e/admin.spec.ts` (Type: test; Dependencies: T185, T188, T189, T191; Skills: lambdatest-agent-skills; Done: E2E admin falha)
- [ ] T193 [US4] Ajustar painel admin para passar E2E e rules tests em `src/app/admin/`, `src/features/admin/`, `firebase/firestore.rules` (Type: implementation; Dependencies: T192; Skills: logic-lens, design-taste-frontend; Done: E2E admin Green)
- [ ] T194 [US4] Atualizar `README.md`, `docs/security.md`, `docs/firebase.md`, `docs/architecture.md`, `docs/testing.md`, `docs/skills.md` com painel admin (Type: docs; Dependencies: T178-T193; Skills: documentation; Done: docs admin atualizadas)

---

## Phase 13: Cupons e Avaliações

**Goal**: suporte inicial a cupons e avaliações moderadas.

**Independent Test**: cliente aplica cupom válido/inválido e vê apenas avaliações aprovadas; admin modera avaliações.

- [ ] T195 [P] [US6] Criar testes Red de CouponService em `tests/unit/services/coupon-service.test.ts` (Type: test; Dependencies: T076; Skills: lambdatest-agent-skills; Done: aplicação de cupom falha)
- [ ] T196 [P] [US6] Criar teste Red de action `applyCoupon` e rate limit em `tests/integration/actions/apply-coupon.test.ts` (Type: test; Dependencies: T195, T059; Skills: lambdatest-agent-skills, logic-lens; Done: action cupom e abuso por tentativas excessivas falham)
- [ ] T197 [P] [US6] Criar testes Red de ReviewService em `tests/unit/services/review-service.test.ts` (Type: test; Dependencies: T078; Skills: lambdatest-agent-skills; Done: review service falha)
- [ ] T198 [P] [US6] Criar teste Red de action `submitReview` e moderação em `tests/integration/actions/reviews.test.ts` (Type: test; Dependencies: T197, T170; Skills: lambdatest-agent-skills, logic-lens; Done: actions reviews falham)
- [ ] T199 [P] [US6] Criar teste Red de rate limit para `submitReview` em `tests/integration/actions/submit-review-rate-limit.test.ts` (Type: test; Dependencies: T059, T198; Skills: lambdatest-agent-skills, logic-lens; Done: abuso em submitReview falha sem bloqueio)
- [ ] T200 [P] [US6] Criar testes Red de UI cupom/review em `tests/unit/features/coupons-reviews.test.tsx` (Type: test; Dependencies: T096; Skills: design-taste-frontend; Done: UI cupom/review falha)
- [ ] T201 [US6] Implementar CouponService em `src/services/coupons/coupon-service.ts` (Type: implementation; Dependencies: T195; Skills: development; Done: testes cupom Green)
- [ ] T202 [US6] Implementar action `applyCoupon` em `src/app/actions/coupons.ts` com validação server-side e rate limit aplicável (Type: security; Dependencies: T196, T201, T059; Skills: logic-lens; Done: action cupom e rate limit Green)
- [ ] T203 [US6] Integrar cupom no carrinho/checkout em `src/features/cart/` e `src/features/checkout/` (Type: implementation; Dependencies: T202; Skills: development, design-taste-frontend; Done: desconto aparece corretamente)
- [ ] T204 [US6] Implementar ReviewService em `src/services/reviews/review-service.ts` com sanitização (Type: implementation; Dependencies: T197; Skills: development, logic-lens; Done: testes ReviewService Green)
- [ ] T205 [US6] Implementar actions `submitReview` e `adminModerateReview` em `src/app/actions/reviews.ts` com rate limit/proteção contra abuso em envio público (Type: security; Dependencies: T198, T204, T199; Skills: logic-lens; Done: actions reviews e rate limit Green)
- [ ] T206 [US6] Implementar UI de avaliações aprovadas em `src/features/reviews/ProductReviews.tsx` e formulário pendente em `src/features/reviews/ReviewForm.tsx` (Type: implementation; Dependencies: T200, T205; Skills: design-taste-frontend; Done: UI reviews Green)
- [ ] T207 [US6] Implementar admin de cupons/reviews em `src/app/admin/coupons/page.tsx`, `src/app/admin/reviews/page.tsx` (Type: implementation; Dependencies: T201, T205; Skills: design-taste-frontend; Done: admin modera e gerencia cupons)
- [ ] T208 [P] [US6] Criar teste E2E Red de cupom e avaliação moderada em `tests/e2e/coupons-reviews.spec.ts` (Type: test; Dependencies: T203, T206, T207; Skills: lambdatest-agent-skills; Done: E2E cupom/review falha)
- [ ] T209 [US6] Ajustar cupons e avaliações para passar E2E, rules tests e a11y em `src/features/`, `src/app/actions/`, `firebase/firestore.rules` (Type: implementation; Dependencies: T208; Skills: logic-lens, design-taste-frontend; Done: E2E cupom/review Green)
- [ ] T210 [US6] Atualizar `README.md`, `docs/security.md`, `docs/testing.md`, `docs/architecture.md`, `docs/skills.md` com cupons e avaliações (Type: docs; Dependencies: T195-T209; Skills: documentation; Done: docs cupom/review atualizadas)

---

## Phase 14: Qualidade Final, CI e Deploy

**Purpose**: garantir que o MVP completo passa por checks, CI, auditoria e preview.

- [ ] T211 Expandir workflow GitHub Actions em `.github/workflows/ci.yml` com install limpo, lint, typecheck, unit, integration, rules, build e audit (Type: ci; Dependencies: T041, T060; Skills: agentic-actions-auditor; Done: workflow cobre gates mínimos completos)
- [ ] T212 Criar jobs opcionais/condicionais de E2E e acessibilidade em `.github/workflows/ci.yml` (Type: ci; Dependencies: T211; Skills: agentic-actions-auditor, lambdatest-agent-skills; Done: E2E/a11y executáveis no CI)
- [ ] T213 Auditar workflow de CI contra secrets e permissões mínimas em `.github/workflows/ci.yml` e `docs/security.md` (Type: security; Dependencies: T211, T212; Skills: agentic-actions-auditor, logic-lens; Done: permissões documentadas)
- [ ] T214 Rodar `pnpm lint` e corrigir achados nos arquivos reportados (Type: validation; Dependencies: T210-T213; Skills: verification-before-completion; Done: lint passa)
- [ ] T215 Rodar `pnpm typecheck` e corrigir achados nos arquivos reportados (Type: validation; Dependencies: T214; Skills: verification-before-completion; Done: typecheck passa)
- [ ] T216 Rodar `pnpm test:unit` e corrigir achados nos arquivos reportados (Type: validation; Dependencies: T215; Skills: verification-before-completion; Done: unit tests passam)
- [ ] T217 Rodar `pnpm test:integration` com emuladores e corrigir achados nos arquivos reportados (Type: validation; Dependencies: T216; Skills: verification-before-completion; Done: integration passa)
- [ ] T218 Rodar `pnpm test:rules` e corrigir rules/tests em `firebase/firestore.rules`, `firebase/storage.rules`, `tests/integration/rules/` (Type: validation; Dependencies: T217; Skills: verification-before-completion, logic-lens; Done: rules tests passam)
- [ ] T219 Criar ou revisar assertions de métricas SC-001, SC-002 e SC-003 em `tests/e2e/critical-user-metrics.spec.ts` cobrindo até 4 ações, resposta de busca/filtro até 2s e 95% dos cenários principais de carrinho (Type: test; Dependencies: T161, T218; Skills: lambdatest-agent-skills, verification-before-completion; Done: métricas críticas falham se limites não forem cumpridos)
- [ ] T220 Rodar `pnpm test:e2e` e corrigir fluxos em `src/app/`, `src/features/`, `tests/e2e/` incluindo assertions SC-001/SC-002/SC-003 (Type: validation; Dependencies: T218, T219; Skills: lambdatest-agent-skills, verification-before-completion; Done: E2E e métricas críticas passam)
- [ ] T221 Rodar `pnpm test:a11y` e corrigir problemas de labels, foco, contraste e semântica em `src/components/`, `src/features/` (Type: validation; Dependencies: T220; Skills: design-taste-frontend, verification-before-completion; Done: a11y passa)
- [ ] T222 Rodar `pnpm build` e corrigir falhas de build, metadata, rotas e imports (Type: validation; Dependencies: T221; Skills: verification-before-completion; Done: build passa)
- [ ] T223 Rodar `pnpm audit` ou auditoria equivalente e registrar riscos aceitos em `docs/security.md` (Type: security; Dependencies: T222; Skills: logic-lens; Done: auditoria sem bloqueios críticos)
- [ ] T224 Executar Lighthouse ou equivalente em home, catálogo, produto e checkout e registrar resultado e métricas SC-001/SC-002/SC-003 em `docs/testing.md` (Type: validation; Dependencies: T222; Skills: design-taste-frontend, verification-before-completion; Done: métricas e ajustes documentados)
- [ ] T225 Validar Git antes de push/deploy em `docs/deployment.md`: `git remote -v`, branch `main`, remote `origin` esperado e push somente após autorização explícita (Type: validation; Dependencies: T224; Skills: agentic-actions-auditor, verification-before-completion; Done: estado Git documentado ou ação pendente descrita)
- [ ] T226 Configurar e validar deploy preview Vercel com variáveis mockadas seguras em `docs/deployment.md` sem push/deploy definitivo sem autorização (Type: ci; Dependencies: T222-T224, T225; Skills: agentic-actions-auditor; Done: preview documentado ou bloqueio explícito)
- [ ] T227 Atualizar `README.md`, `docs/setup.md`, `docs/firebase.md`, `docs/testing.md`, `docs/security.md`, `docs/architecture.md`, `docs/deployment.md`, `docs/skills.md` com status final do MVP (Type: docs; Dependencies: T211-T226; Skills: documentation; Done: documentação final consistente)

---

## Phase 15: Encerramento da Feature

**Purpose**: concluir conforme constitution sem commit automático.

- [ ] T228 Revisar `README.md` contra a constitution: overview, stack, requisitos, instalação, dev, testes, build, deploy, env vars, funcionalidades, status e limitações (Type: docs; Dependencies: T227; Skills: documentation; Done: README completo)
- [ ] T229 Revisar `docs/skills.md` com skills realmente usadas, evidências, impacto e limitações por feature (Type: docs; Dependencies: T227; Skills: documentation, verification-before-completion; Done: seção "Skills usadas nesta feature" pronta)
- [ ] T230 Revisar `docs/security.md` para ameaças, mitigação, dados coletados, finalidade, armazenamento, acesso, proteção e retenção (Type: security; Dependencies: T227; Skills: logic-lens; Done: privacidade/segurança completas)
- [ ] T231 Validar escopo MVP em `specs/001-mvp-ecommerce/tasks.md`, `README.md` e `docs/architecture.md`, confirmando ausência de marketplace multi-vendedor, comissão por vendedor, painel de lojistas terceiros, app mobile nativo e integração real de pagamento/frete sem credenciais (Type: validation; Dependencies: T227; Skills: verification-before-completion, logic-lens; Done: escopo MVP confirmado sem desvios)
- [ ] T232 Rodar sequência final `pnpm lint && pnpm typecheck && pnpm test:unit && pnpm test:integration && pnpm test:rules && pnpm test:e2e && pnpm test:a11y && pnpm build` (Type: validation; Dependencies: T228-T230, T231; Skills: verification-before-completion; Done: todos os checks passam ou bloqueios documentados)
- [ ] T233 Rodar auditoria final de CI/dependências e registrar resultado em `docs/security.md` (Type: security; Dependencies: T232; Skills: agentic-actions-auditor, logic-lens; Done: sem risco crítico aberto)
- [ ] T234 Gerar resumo final de alterações, arquivos modificados, testes executados, riscos restantes e skills usadas em mensagem ao usuário (Type: validation; Dependencies: T232, T233; Skills: verification-before-completion; Done: resumo pronto)
- [ ] T235 Sugerir commit semântico ao usuário sem executar commit em `git` (Type: validation; Dependencies: T234; Skills: documentation; Done: mensagem sugerida apresentada)
- [ ] T236 Perguntar autorização explícita ao usuário antes de commitar (Type: validation; Dependencies: T235; Skills: verification-before-completion; Done: autorização recebida ou recusada explicitamente)
- [ ] T237 Após autorização, executar commit e informar hash gerado; se recusado, não commitar (Type: validation; Dependencies: T236; Skills: verification-before-completion; Done: hash informado ou recusa registrada)

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

T001 -> T017 -> T018 -> T030 -> T031 -> T032 -> T041 -> T042 -> T060 -> T061/T062 -> T065/T066 -> T085 -> T096 -> T099 -> T108 -> T109 -> T121 -> T122 -> T133 -> T134 -> T146 -> T147 -> T164 -> T165 -> T177 -> T178 -> T194 -> T195 -> T210 -> T211 -> T227 -> T228 -> T237.

### Parallel Opportunities

- Phase 0 docs can parallelize after skills are selected: T006-T012.
- Phase 1 structures can parallelize: T021-T023.
- Phase 2 test tool setup can parallelize after T031: T033-T036; CI smoke T041 waits for test scripts and coverage setup.
- Phase 3 rules tests can parallelize: T043-T048.
- Phase 4 entity tests can parallelize: T061, T062, T067, T069, T071, T073, T075, T077, T079, T081.
- UI component test groups can parallelize: T085, T087, T089, T091, T093.
- Feature test groups marked [P] can run before their implementation inside each phase.
- Validation tasks in Phase 14 are mostly sequential because later checks depend on earlier fixes.

## Parallel Examples

### Phase 4 Domain Tests

```text
Task: T061 Product/ProductVariant domain tests
Task: T067 Category tests
Task: T069 Cart tests
Task: T075 Coupon tests
Task: T077 Review tests
Task: T079 Shipping tests
Task: T081 Payment tests
```

### US1 Catalog Work

```text
Task: T109 ProductCatalogService tests
Task: T110 search normalization tests
Task: T111 catalog UI tests
Task: T112 Firestore catalog integration test
```

### US4 Admin Work

```text
Task: T178 AdminProductService tests
Task: T179 admin product schema tests
Task: T180 admin product UI tests
Task: T181 admin orders UI tests
Task: T182 product image upload tests
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
