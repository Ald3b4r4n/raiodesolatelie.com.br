# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See
`.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement, MVP priority, and technical approach]

## Technical Context

<!--
  ACTION REQUIRED: Replace this section with the concrete technical details for
  the feature. The defaults below reflect the project constitution and must not
  be changed without documenting a constitution violation.
-->

- **Language/Version**: TypeScript strict on Next.js App Router, or NEEDS CLARIFICATION
- **Primary Dependencies**: Next.js, React, Firebase SDK/Admin SDK as needed, or NEEDS CLARIFICATION
- **Storage**: Cloud Firestore; Firebase Storage only for product images when needed
- **Authentication**: Firebase Authentication
- **Sensitive Operations**: Next.js Server Actions or API Routes; never client-only validation
- **Testing**: Unit, integration with Firebase Emulator Suite/rules, and E2E for critical flows
- **Target Platform**: Mobile-first web on Vercel
- **Project Type**: Next.js e-commerce/catalog application
- **Performance Goals**: Mobile Core Web Vitals and Lighthouse used as quality references
- **Constraints**: Security, privacy minimization, accessibility, SEO, and fast mobile checkout
- **Scale/Scope**: Simple own-product e-commerce MVP, not multi-vendor marketplace
- **External Services**: Payment, freight, WhatsApp, coupons, and invoices isolated behind services
- **Documentation Impact**: README.md and relevant docs/ updates required for every feature
- **Skills Impact**: Required skills selected, installed when needed, and documented in docs/skills.md

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Stack**: Plan uses Next.js App Router, TypeScript strict, Firebase, and Vercel. Any deviation is justified with trade-offs and user approval path.
- **TDD**: Failing tests are planned before implementation. Unit tests are mandatory; Firebase/API/business logic needs integration tests; critical flows need E2E tests.
- **Documentation**: README.md and docs/ updates are listed as deliverables, including setup, tests, deploy, contracts, and decisions when impacted.
- **README**: The feature plan includes an explicit README review task.
- **Security**: Server-side validation, sanitization, authorization, rate limiting where applicable, secret handling, and Firebase Security Rules tests are planned.
- **Privacy**: Data collection is minimized and documented with purpose, storage, access, protection, and retention.
- **Mobile-first UX**: Mobile layout, touch targets, search/filter usability, checkout simplicity, image optimization, and WhatsApp access are planned.
- **Architecture**: Business logic and integrations are isolated in domain/services/adapters; UI does not call payment or freight providers directly.
- **Firebase reproducibility**: Firebase CLI, emulators, rules, indexes, scripts, and any unavoidable console steps are documented.
- **CI**: lint, typecheck, tests, build, dependency audit, E2E when applicable, and Firebase rules validation are included in CI scope.
- **Performance/SEO**: Metadata, Open Graph, sitemap, robots.txt, friendly URLs, optimized images, and product indexability are addressed when user-facing pages change.
- **Accessibility**: Semantic HTML, labels, focus, contrast, keyboard navigation, alt text, and clear errors are included.
- **MVP scope**: The feature keeps the project as a simple own-product e-commerce/catalog. Marketplace capabilities are excluded unless explicitly approved.
- **Skills**: Selected skills, reasons, activation method, evidence, and limitations are planned and will be reported in the final summary.
- **Commit governance**: The plan ends with checks, summary, suggested semantic commit, and explicit user authorization before commit.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Keep the Next.js/Firebase boundaries unless the constitution
  violation is explicitly documented and approved.
-->

```text
src/
├── app/                 # Next.js App Router routes, layouts, metadata, actions
├── components/          # Small reusable UI components
├── domain/              # Business entities, policies, and domain logic
├── services/            # Payment, freight, WhatsApp, coupon, order services
├── lib/
│   └── firebase/        # Firebase client/admin adapters
└── validation/          # Shared schemas and server/client validation

tests/
├── unit/
├── integration/         # Firebase Emulator Suite and service integration tests
└── e2e/                 # Critical purchase/login/cart/checkout/admin/search flows

firebase/
├── firestore.rules
├── firestore.indexes.json
└── storage.rules

docs/
├── setup.md
├── testing.md
├── deploy.md
├── architecture.md
├── security.md
├── privacy.md
└── skills.md

.github/
└── workflows/
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Phase 0: Research

- Confirm current documentation for Next.js, Firebase, Vercel, testing tools,
  and any payment/freight providers through approved project skills.
- Record security, privacy, architecture, accessibility, performance, SEO, and
  integration risks.
- Decide which parts belong in UI, domain, services, adapters, rules, and tests.
- Document any Firebase Console steps that cannot be handled through CLI.

## Phase 1: Design

- Define data model with minimal personal data.
- Define service/API contracts for sensitive operations.
- Define Firebase Security Rules and indexes needed by the feature.
- Define mobile-first UX acceptance criteria.
- Define test strategy and required failing tests.
- Define documentation updates and README impact.

## Complexity Tracking

> Fill ONLY if Constitution Check has violations that must be justified.

| Violation | Why Needed | Simpler Compliant Alternative Rejected Because | User Approval Needed |
|-----------|------------|-----------------------------------------------|----------------------|
| [e.g., client-side payment API call] | [current need] | [service/API route boundary] | [yes/no] |
| [e.g., marketplace seller model] | [current need] | [own-product catalog] | [yes/no] |
