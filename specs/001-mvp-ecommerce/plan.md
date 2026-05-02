# Implementation Plan: MVP Inicial Ateliê Raios de Sol

**Branch**: `001-mvp-ecommerce` | **Date**: 2026-04-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-mvp-ecommerce/spec.md`

**Note**: Este plano é um artefato técnico do Spec Kit. Ele orienta a
implementação futura, mas não implementa código.

## Summary

Criar o MVP mobile-first do e-commerce/catálogo Ateliê Raios de Sol para venda
de produtos próprios, com home, catálogo, busca/filtros, página de produto,
carrinho, WhatsApp, checkout inicial, pedidos, login, painel admin simples,
cupons, avaliações, SEO, acessibilidade, segurança e documentação. A stack
obrigatória é Next.js App Router + TypeScript strict + Firebase + Vercel. Frete
e pagamento começam em camadas abstratas/mockadas até existirem credenciais e
provedores definidos. O projeto permanece fora de escopo de marketplace
multi-vendedor.

## Technical Context

**Language/Version**: TypeScript em modo strict; versão exata será fixada no bootstrap.
**Framework**: Next.js App Router com React.
**Runtime**: Node.js LTS ativo no momento da implementação, fixado em `.nvmrc` ou documentação equivalente.
**Package Manager**: pnpm recomendado por lockfile determinístico, instalação rápida e boa experiência em CI.
**Primary Dependencies**: Next.js, React, Firebase Web SDK, Firebase Admin SDK para operações server-side, biblioteca de schema validation, Testing Library, Vitest e Playwright.
**Storage**: Cloud Firestore como banco principal; Firebase Storage somente se necessário para imagens de produtos.
**Authentication**: Firebase Authentication com perfis `customer` e `admin`.
**Authorization**: Firebase custom claims ou documento controlado de roles, com regras de menor privilégio e processo seguro para primeiro admin.
**Sensitive Operations**: Server Actions ou Route Handlers do Next.js para criação de pedido, operações admin, cupom, avaliação, pagamento/frete mockados e uploads.
**Hosting/Deploy**: Vercel para preview e produção.
**Firebase Tooling**: Firebase CLI, Firebase Emulator Suite, Firestore rules, Storage rules e indexes versionados.
**Testing**: Vitest para unit/integration, Testing Library para componentes, Playwright para E2E, axe-core ou equivalente para acessibilidade, Firebase Emulator Suite e `@firebase/rules-unit-testing` para regras.
**Lint/Format**: ESLint com configuração do Next.js e Prettier ou Biome definido no bootstrap. Escolha final deve priorizar baixa configuração e CI simples.
**CI**: GitHub Actions planejado em duas etapas: CI básico/smoke na Fase 2 para validar bootstrap, scripts mínimos e execução inicial; CI completo consolidado na fase final de qualidade/deploy, com install limpo, lint, typecheck, testes unitários, integração, regras Firebase, build, auditoria e E2E quando aplicável.
**Target Platform**: Web mobile-first, com desktop responsivo.
**Performance Goals**: páginas públicas rápidas em rede móvel, imagens otimizadas, metadados, Open Graph, sitemap, robots.txt e Core Web Vitals acompanhados por Lighthouse.
**Constraints**: segurança backend/frontend, privacidade, minimização de dados, acessibilidade, UX simples, checkout curto e WhatsApp acessível.
**Scale/Scope**: e-commerce/catálogo simples para produtos próprios. Marketplace multi-vendedor está fora do MVP.
**External Services**: WhatsApp por link/mensagem; Instagram/TikTok por links; pagamento Pix/cartão e frete Correios isolados por interfaces mockadas até haver credenciais.
**Documentation Impact**: README.md e docs obrigatórios devem ser criados no bootstrap e atualizados em cada feature.
**Skills Impact**: catálogo antigravity-awesome-skills deve ser consultado antes da implementação; skills selecionadas devem ser instaladas e documentadas em `docs/skills.md`.

## Constitution Check

*GATE: Deve passar antes da Phase 0 research. Rechecado após Phase 1 design.*

- **Stack**: PASS. O plano adota Next.js App Router, TypeScript strict, Firebase e Vercel. Versões exatas serão fixadas no bootstrap, sem mudar a stack.
- **TDD**: PASS COMO GATE. Testes Red -> Green -> Refactor são planejados para cada camada. Como ainda não há app/package.json, execução real fica bloqueada até Fase 1/2.
- **Documentação**: PASS COMO GATE. README.md e `docs/` são entregáveis obrigatórios do bootstrap e devem ser atualizados por feature.
- **README**: PASS COMO GATE. Revisão do README é item obrigatório em todas as fases de entrega.
- **Commit com autorização**: PASS. Plano exige resumo, checks, mensagem sugerida e autorização explícita antes de commit.
- **Segurança**: PASS. Operações sensíveis ficam no backend, com validação, sanitização, roles, rate limiting, regras Firebase e testes.
- **Privacidade**: PASS. Dados pessoais são mínimos, justificados por pedido/entrega/contato/pagamento e documentados.
- **Mobile-first**: PASS. UI, catálogo, busca, filtros, carrinho, checkout e WhatsApp são planejados primeiro para celular.
- **UX simples**: PASS. Fases priorizam fluxos curtos, linguagem simples e painel admin pragmático.
- **Arquitetura modular**: PASS. Estrutura separa UI, features, domínio, validações, Firebase, serviços externos, segurança e testes.
- **Firebase via CLI**: PASS COMO GATE. Configuração CLI, emuladores, rules e indexes são entregáveis antes de recursos dependentes.
- **CI**: PASS COMO GATE. A Fase 2 cria CI básico/smoke para validar bootstrap e scripts mínimos após o projeto existir; o CI completo com todos os gates obrigatórios é consolidado antes da conclusão da feature, na fase final de qualidade/deploy.
- **Performance/SEO**: PASS. Metadados, Open Graph, sitemap, robots.txt, imagens otimizadas e Lighthouse entram em fases específicas.
- **Acessibilidade**: PASS. HTML semântico, labels, foco, contraste, teclado, alt text e axe/Playwright são planejados.
- **MVP**: PASS. Fases preservam home, catálogo, produto, carrinho, checkout, WhatsApp, admin, pedidos, cupons e avaliações sem expandir para marketplace.
- **Skills obrigatórias**: PASS COMO GATE. Consulta, instalação e documentação das skills são Fase 0 antes da implementação.
- **Uso de skills por feature**: PASS. Resumo final de cada feature deve registrar skills usadas, evidência e impacto.
- **Controle de escopo**: PASS. Marketplace multi-vendedor, lojistas terceiros e comissão ficam explicitamente fora.
- **Pagamento/frete abstratos**: PASS. Pix/cartão e Correios entram por interfaces mockadas/testadas até credenciais reais.
- **PT-BR**: PASS. Documentação e mensagens visíveis serão em português do Brasil; nomes técnicos podem usar inglês.

## Project Structure

### Documentation (this feature)

```text
specs/001-mvp-ecommerce/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── service-contracts.md
│   ├── routes-and-actions.md
│   └── security-rules-contract.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── (store)/
│   │   ├── page.tsx
│   │   ├── catalog/
│   │   ├── products/[slug]/
│   │   ├── cart/
│   │   └── checkout/
│   ├── (auth)/
│   │   └── login/
│   ├── admin/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── coupons/
│   │   └── reviews/
│   ├── actions/
│   ├── api/
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/
│   ├── layout/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   └── admin/
├── features/
│   ├── catalog/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   ├── auth/
│   ├── admin/
│   ├── coupons/
│   └── reviews/
├── domain/
│   ├── product/
│   ├── order/
│   ├── customer/
│   ├── coupon/
│   ├── review/
│   ├── payment/
│   └── shipping/
├── services/
│   ├── firebase/
│   ├── payment/
│   ├── shipping/
│   ├── whatsapp/
│   ├── coupons/
│   └── reviews/
├── lib/
│   ├── firebase/
│   ├── security/
│   ├── seo/
│   └── env/
├── validators/
└── test/
    ├── factories/
    ├── fixtures/
    └── utils/

tests/
├── unit/
├── integration/
│   ├── firebase/
│   ├── rules/
│   └── services/
├── e2e/
└── accessibility/

firebase/
├── firestore.rules
├── firestore.indexes.json
├── storage.rules
└── seed/

docs/
├── setup.md
├── firebase.md
├── testing.md
├── security.md
├── skills.md
├── architecture.md
├── deployment.md
└── decisions/

.github/
└── workflows/
    └── ci.yml
```

**Structure Decision**: usar um único app Next.js no repositório raiz, com
agrupamento por rotas no App Router e separação interna por responsabilidade.
`features/` organiza casos de uso; `domain/` contém regras puras; `services/`
contém integrações e adapters; `validators/` centraliza schemas; `lib/firebase`
separa cliente/admin SDK; `firebase/` mantém rules, indexes e seeds
versionados; `tests/` separa unit, integration, rules, E2E e acessibilidade.

## Implementation Phases

### Fase 0: Pesquisa Técnica e Skills

- Consultar o catálogo `antigravity-awesome-skills`.
- Usar `skill-scanner` ou equivalente para avaliar riscos antes de instalar skills.
- Selecionar, instalar e documentar skills para desenvolvimento, documentação,
  frontend, testes, segurança, pesquisa técnica, auditoria de CI e verificação.
- Criar `docs/skills.md` com nome, motivo, ativação, data de instalação,
  limitações e tipos de feature em que cada skill será usada.
- Confirmar documentação atual de Next.js, Firebase, Vercel e ferramentas de teste por meio da skill de pesquisa aprovada.
- Saída esperada: `docs/skills.md`, decisão de ferramentas e riscos atualizados em `research.md`.

### Fase 1: Bootstrap Next.js + TypeScript

- Criar app Next.js com App Router e TypeScript strict.
- Fixar runtime Node.js e package manager.
- Configurar aliases de importação e estrutura inicial.
- Criar layout base, rotas vazias essenciais e placeholders acessíveis.
- Criar README inicial e docs de setup.
- Nenhuma feature funcional deve ser entregue sem testes planejados.

### Fase 2: Qualidade, Testes e CI Básico/Smoke

- Configurar lint, format, typecheck e scripts.
- Configurar Vitest, Testing Library, Playwright e axe-core.
- Configurar utilitários de teste, factories e fixtures.
- Criar CI básico/smoke com install limpo e comandos disponíveis de lint, typecheck e teste smoke para validar bootstrap inicial e scripts mínimos.
- Registrar que o CI completo será expandido na fase final de qualidade/deploy, quando as suítes unit, integration, rules, E2E, build e audit existirem.
- Registrar comandos em README.md e `docs/testing.md`.

### Fase 3: Firebase CLI, Emuladores, Auth, Firestore, Rules e Indexes

- Inicializar Firebase via CLI.
- Versionar `firebase.json`, Firestore rules, Storage rules e indexes.
- Configurar Emulator Suite para Auth, Firestore, Storage e Functions se necessário.
- Criar adapter Firebase client/admin.
- Definir estratégia de roles customer/admin.
- Criar testes iniciais de rules para leitura pública de catálogo e bloqueio de escrita pública.

### Fase 4: Design System Simples Mobile-First

- Definir tokens mínimos: cores, espaçamentos, tipografia, foco e estados.
- Criar componentes pequenos: Button, Input, Select, Badge, Price, ProductCard, EmptyState, ErrorMessage, WhatsAppButton.
- Validar contraste, foco visível, tamanhos de toque e responsividade.
- Evitar UI pesada, hero exagerado e complexidade visual incompatível com a marca.

### Fase 5: Catálogo, Busca, Filtros e Página de Produto

- Escrever testes de regras de busca/filtro e seleção de variação.
- Implementar listagem de produtos ativos.
- Implementar categorias pronta entrega e encomenda via WhatsApp.
- Implementar busca, filtros por categoria/preço/disponibilidade.
- Implementar página de produto com fotos, descrição, preço, variações, disponibilidade, entrega/retirada e CTAs.
- Implementar SEO básico por produto e metadados.

### Fase 6: Carrinho e WhatsApp

- Escrever testes de subtotal, quantidade, remoção, variação e persistência local.
- Implementar carrinho local com invalidação quando produto/variação mudar.
- Implementar serviço de mensagem WhatsApp para produto e carrinho.
- Garantir fallback para WhatsApp Web e mensagem em português simples.

### Fase 7: Checkout Inicial, Pedidos, Frete Mockado e Pagamento Mockado

- Escrever testes de criação de pedido, validação de dados mínimos, frete e pagamento mockado.
- Implementar revisão de itens e coleta mínima de dados.
- Implementar retirada local e frete mockado por interface.
- Implementar PaymentSession abstrata para Pix/cartão com mock seguro.
- Registrar pedido com snapshot de itens, variações, valores, entrega, pagamento e status.

### Fase 8: Login e Proteção de Rotas

- Escrever testes de autenticação e autorização.
- Implementar login com Firebase Authentication.
- Implementar separação customer/admin.
- Proteger rotas admin e operações sensíveis.
- Documentar processo seguro do primeiro admin.

### Fase 9: Painel Admin

- Escrever testes E2E e integração para produto e pedidos.
- Implementar CRUD de produto com desativação segura.
- Implementar cadastro/associação de foto.
- Implementar edição de preço, categoria, variações e disponibilidade.
- Implementar visualização de pedidos.
- Garantir que alterações futuras não quebrem pedidos históricos.

### Fase 10: Cupons e Avaliações

- Escrever testes de regras de cupom, validade, status e desconto.
- Implementar aplicação de cupom no carrinho/checkout.
- Implementar envio de avaliação com nota e comentário opcional.
- Implementar moderação admin e exibição apenas de avaliações aprovadas.
- Sanitizar comentários antes de exibição.

### Fase 11: SEO, Acessibilidade, Performance e Documentação Final

- Completar metadados, Open Graph, sitemap, robots e URLs amigáveis.
- Rodar verificações de acessibilidade e corrigir bloqueios.
- Validar imagens otimizadas, lazy loading e estados de loading.
- Atualizar README.md, setup, Firebase, testing, security, architecture, deployment e ADRs.
- Registrar ameaças, mitigação e dados pessoais mínimos.

### Fase 12: Preparação para Deploy Vercel e CI Completo

- Alinhamento com `tasks.md`: esta consolidação corresponde à Phase 14 - Qualidade Final, CI e Deploy.
- Consolidar CI completo com install limpo, lint, typecheck, unit tests, integration tests, Firebase rules tests, E2E quando aplicável, build e auditoria de dependências.
- Documentar variáveis de ambiente e ambientes preview/production.
- Configurar deploy preview.
- Validar build.
- Documentar passos de rollback e limitações.
- Garantir que deploy real não dependa de secrets ausentes ou credenciais mockadas sem aviso.

## TDD Strategy

### Escolha Principal

Usar Vitest como runner principal para unit e integration porque combina bem
com TypeScript, tem execução rápida, configuração simples e boa experiência em
projetos Vite-like sem impedir uso em Next.js. Testing Library cobre componentes
React sem testar implementação interna. Playwright cobre fluxos críticos reais
em navegador. Firebase Emulator Suite com `@firebase/rules-unit-testing` cobre
regras e integração com Auth/Firestore/Storage.

### Camadas de Teste

- **Unitários**: domínio, validações, cálculo de subtotal, descontos, seleção de variações, geração de mensagem WhatsApp, mocks de frete/pagamento e helpers de SEO.
- **Componentes**: componentes de UI e features com Testing Library, foco em comportamento acessível por texto, role e label.
- **Integração**: serviços Firebase, Server Actions/Route Handlers, criação de pedido, aplicação de cupom, moderação de avaliação e adapters mockados.
- **Firebase Security Rules**: leitura pública de catálogo ativo, bloqueio de escrita pública, cliente lendo apenas seus pedidos, admin gerenciando produtos/pedidos/cupons/avaliações, uploads protegidos.
- **E2E**: home -> catálogo -> produto; busca/filtros; produto -> carrinho; carrinho -> checkout; produto/carrinho -> WhatsApp; login admin -> produto; admin -> pedidos; cupom; avaliação moderada.
- **Acessibilidade**: axe-core em fluxos principais e checks manuais de teclado/foco nas telas críticas.
- **Contratos de serviços mockados**: payment, shipping e WhatsApp devem ter contratos testados para permitir troca futura de provider.

### Fluxo Obrigatório

1. Criar teste que descreve comportamento esperado.
2. Rodar teste e confirmar falha pelo motivo esperado.
3. Implementar menor mudança possível.
4. Rodar teste e confirmar Green.
5. Refatorar mantendo testes verdes.
6. Atualizar docs e README no mesmo ciclo.

## Preliminary Data Model

O modelo detalhado está em [data-model.md](./data-model.md). Resumo:

- `products`: catálogo público de produtos ativos, editável por admin.
- `categories`: categorias iniciais e futuras.
- `orders`: pedidos com snapshot de itens e dados mínimos de cliente.
- `customerProfiles`: perfil mínimo vinculado ao usuário autenticado.
- `adminUsers` ou `userRoles`: controle seguro de admin, preferencialmente combinado com custom claims.
- `coupons`: cupons com validade e status.
- `reviews`: avaliações moderadas.
- `paymentSessions`: sessões abstratas sem dados sensíveis de cartão.
- `shippingOptions` ou configuração de retirada/frete mockado.

Índices prováveis: produtos por status/categoria/disponibilidade/preço,
produtos por slug, pedidos por customerId/status/createdAt, pedidos por status,
cupons por code/status, reviews por productId/status/createdAt.

## Security Plan

- Validar todo input com schemas compartilháveis e validação server-side.
- Sanitizar textos exibidos publicamente, especialmente avaliações e campos admin.
- Usar Server Actions/Route Handlers para operações sensíveis.
- Proteger rotas admin por sessão e role.
- Testar Firebase Security Rules com acessos permitidos e negados.
- Usar princípio de menor privilégio para clientes, admins e leitura pública.
- Nunca expor secrets no frontend; usar variáveis `NEXT_PUBLIC_` apenas para chaves públicas Firebase.
- Validar uploads por tipo, tamanho, path e ownership/admin role.
- Aplicar rate limiting ou proteção equivalente em login-sensitive flows, checkout, review, cupom e admin actions quando aplicável.
- Auditar dependências e GitHub Actions.
- Configurar primeiro admin por procedimento documentado e restrito, evitando endpoint público permanente de promoção de admin.
- Documentar ameaças e mitigação em `docs/security.md`.

## Integrations and Abstractions

- **WhatsAppService**: recebe produto ou carrinho e retorna mensagem/link; não depende da UI.
- **PaymentService**: cria PaymentSession Pix/cartão mockada; retorna status seguro; preparado para provider real.
- **ShippingService**: calcula retirada local e frete mockado; preparado para Correios.
- **CouponService**: valida e aplica desconto; não fica acoplado ao componente de carrinho.
- **ReviewService**: cria avaliação pendente, modera e lista aprovadas.
- **Firebase adapters**: isolam Auth, Firestore, Storage, Admin SDK e emuladores.
- **SocialLinksService/config**: centraliza Instagram/TikTok e permite fallback se links não forem informados.

## Required Documentation

- `README.md`: visão geral, stack, ambiente, comandos, testes, build, deploy, env vars, funcionalidades, status, limitações.
- `docs/setup.md`: setup local, Node/pnpm, Firebase CLI, emuladores, env vars.
- `docs/firebase.md`: comandos CLI, emuladores, rules, indexes, seeds e console steps inevitáveis.
- `docs/testing.md`: TDD, comandos, estrutura de testes, rules tests, E2E e acessibilidade.
- `docs/security.md`: ameaças, mitigação, roles, secrets, rate limit, privacidade e retenção.
- `docs/skills.md`: skills instaladas, motivo, ativação, limitações, data e evidência.
- `docs/architecture.md`: módulos, responsabilidades, data flow e integrações.
- `docs/deployment.md`: Vercel, ambientes, variáveis, preview, production e rollback.
- `docs/decisions/`: ADRs para escolhas de stack, testes, Firebase roles, mocks de pagamento/frete e primeiro admin.

## Mandatory Skills Plan

Antes da implementação:

1. Consultar `https://github.com/sickn33/antigravity-awesome-skills`.
2. Executar avaliação de segurança das skills com `skill-scanner` ou substituto equivalente.
3. Instalar skills adequadas conforme documentação do catálogo.
4. Documentar em `docs/skills.md`: nome, origem, motivo, uso, ativação, data, limitações e evidência.
5. Registrar em cada feature a seção "Skills usadas nesta feature".

Skills candidatas iniciais:

- `development`: workflow fullstack.
- `documentation`: README, docs técnicas e contratos.
- `design-taste-frontend`: UI mobile-first e acabamento.
- `lambdatest-agent-skills`: testes unitários, E2E e automação.
- `context7-auto-research`: documentação atualizada de Next.js/Firebase/Vercel.
- `varlock`: segurança de variáveis de ambiente.
- `logic-lens`: revisão de bugs, anti-patterns e riscos.
- `agentic-actions-auditor`: auditoria de GitHub Actions/CI.
- `verification-before-completion`: impedir conclusão sem verificação real.
- `skill-scanner`: revisar segurança de skills.

Se o catálogo tiver skills mais específicas para Next.js, Firebase, Vercel,
e-commerce, acessibilidade ou segurança, substituir as candidatas e justificar.

## Quality Gates and Planned Commands

Como ainda não há `package.json`, os comandos abaixo são planejados e devem ser
criados nas Fases 1/2:

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm test:unit
pnpm test:integration
pnpm test:rules
pnpm test:e2e
pnpm test:a11y
pnpm build
pnpm audit
pnpm firebase:emulators
pnpm firebase:rules:test
pnpm vercel:preview
```

Comandos Firebase planejados:

```bash
firebase login
firebase init
firebase emulators:start
firebase emulators:exec "pnpm test:integration && pnpm test:rules"
firebase deploy --only firestore:rules,firestore:indexes,storage
```

O CI completo deve ser obrigatório antes da conclusão da feature. A Fase 2
mantém apenas CI básico/smoke para validar bootstrap inicial e scripts mínimos;
a fase final de qualidade/deploy expande esse workflow para executar pelo
menos:

1. install limpo;
2. lint;
3. typecheck;
4. testes unitários;
5. testes de integração;
6. testes de regras Firebase;
7. build;
8. auditoria de dependências;
9. E2E e acessibilidade quando a feature tocar fluxos visuais críticos.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| WhatsApp oficial não informado | Bloqueia CTA final real | Usar placeholder documentado apenas em desenvolvimento; exigir configuração por env antes de produção |
| Links Instagram/TikTok ausentes | Reduz integração social | Centralizar configuração e ocultar links ausentes sem quebrar layout |
| Sem identidade visual/fotos | UI pode ficar genérica | Criar design simples e adaptável; usar placeholders acessíveis até assets reais |
| Produtos iniciais ausentes | Catálogo não demonstrável | Criar seed local fictício apenas para desenvolvimento/emulador |
| Pagamento sem provedor | Checkout real incompleto | Manter PaymentService mockado, testado e claramente documentado |
| Frete sem API definida | Cálculo real indisponível | Manter ShippingService mockado e retirada local funcional |
| Primeiro admin inseguro | Escalação de privilégio | Processo restrito e documentado, sem endpoint público permanente |
| Cliente não quer guardar dados | Conflito com login/pedidos | Coletar mínimo necessário e documentar finalidade/retenção |
| Escopo virar marketplace | Aumento grande de complexidade | Bloquear multi-vendedor no plano e tasks, exigir aprovação explícita |
| Firebase rules permissivas | Vazamento/alteração indevida | Escrever rules tests antes dos recursos dependentes |
| CI tardia | Regressão acumulada | Criar CI básico/smoke na Fase 2 e expandir para CI completo antes da conclusão da feature |

## Complexity Tracking

Não há violação constitucional planejada.

| Violation | Why Needed | Simpler Compliant Alternative Rejected Because | User Approval Needed |
|-----------|------------|-----------------------------------------------|----------------------|
| N/A | N/A | N/A | N/A |

## Post-Design Constitution Re-check

- `research.md` resolve decisões técnicas sem desviar da stack.
- `data-model.md` aplica minimização de dados e separa roles.
- `contracts/` documenta serviços e ações sensíveis antes da implementação.
- `quickstart.md` documenta setup planejado, emuladores, testes e deploy.
- Nenhum código foi implementado nesta etapa.
- Gates ainda pendentes por ausência de app/package.json estão registrados como tarefas de bootstrap, não como falha.
