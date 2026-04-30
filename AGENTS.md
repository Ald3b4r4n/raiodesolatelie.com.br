# raiodesolatelie.com.br Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-04-30

## Constitution Summary

This project follows `.specify/memory/constitution.md`. The active defaults are:

- Build with Next.js App Router, TypeScript strict, Firebase, and Vercel.
- Use TDD for every feature: Red, Green, Refactor.
- Keep README.md and docs/ updated with each feature change.
- Treat security, privacy, Firebase Security Rules, and least privilege as mandatory.
- Design and verify mobile-first, accessible, fast, SEO-aware user flows.
- Keep the product scope to own-product e-commerce/catalog unless the user approves marketplace scope.
- Isolate Firebase, payment, freight, WhatsApp, coupons, orders, and reviews behind services/adapters.
- Consult, install when needed, document, and report mandatory project skills.
- Never commit automatically; ask the user for explicit authorization first.

## Active Technologies

- TypeScript strict on Next.js App Router with React. (001-mvp-ecommerce)
- Firebase Authentication, Cloud Firestore, Firebase Security Rules, Firebase Emulator Suite, and Firebase Storage only if product image uploads require it. (001-mvp-ecommerce)
- Vercel hosting/deploy with GitHub Actions CI planned. (001-mvp-ecommerce)
- Vitest, Testing Library, Playwright, axe-core or equivalent, and Firebase rules testing planned. (001-mvp-ecommerce)
- Mocked/abstract payment, shipping, and WhatsApp services until real provider credentials are available. (001-mvp-ecommerce)

## Project Structure

```text
src/
├── app/
├── components/
├── features/
├── domain/
├── services/
├── lib/
├── validators/
└── test/

tests/
├── unit/
├── integration/
├── e2e/
└── accessibility/

firebase/
docs/
specs/
.github/workflows/
```

## Commands

Planned commands after bootstrap:

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
firebase emulators:start
firebase emulators:exec "pnpm test:integration && pnpm test:rules"
```

## Code Style

- Use TypeScript strict and strong domain types.
- Keep business rules out of visual components.
- Keep Firebase, payment, shipping, WhatsApp, coupon, order, and review integrations behind services/adapters.
- Use schema validation on client boundaries and server-side operations.
- Keep user-facing text in Brazilian Portuguese.

## Recent Changes

- 001-mvp-ecommerce: Added technical plan for the initial mobile-first own-product e-commerce MVP.

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
