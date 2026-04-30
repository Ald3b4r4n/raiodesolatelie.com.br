<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Placeholder principles -> I. Test-Driven Development Is Mandatory
- Placeholder principles -> II. Documentation Is Delivery
- Placeholder principles -> III. README Reflects Every Feature
- Placeholder principles -> IV. Commit Requires Explicit Authorization
- Placeholder principles -> V. Security by Design
- Placeholder principles -> VI. Privacy and Data Minimization
- Placeholder principles -> VII. Mobile-First Commerce
- Placeholder principles -> VIII. Simple Practical UX
- Placeholder principles -> IX. Clean Modular Architecture
- Placeholder principles -> X. Reproducible Firebase Configuration
- Placeholder principles -> XI. CI Quality Gates
- Placeholder principles -> XII. Performance and SEO
- Placeholder principles -> XIII. Accessibility
- Placeholder principles -> XIV. MVP-First Feature Prioritization
- Placeholder principles -> XV. Project Skills Are Mandatory
- Placeholder principles -> XVI. Skills Usage Is Recorded Per Feature
- Placeholder principles -> XVII. Scope Control and Product Boundaries
- Placeholder principles -> XVIII. Payment and Shipping Service Isolation
- Placeholder principles -> XIX. Feature Completion Definition
- Placeholder principles -> XX. Brazilian Portuguese Project Language
Added sections:
- Product Scope and Required Stack
- Development Workflow and Quality Gates
Removed sections:
- Placeholder section names and placeholder governance text
Templates requiring updates:
- .specify/templates/plan-template.md: updated
- .specify/templates/spec-template.md: updated
- .specify/templates/tasks-template.md: updated
- .specify/templates/checklist-template.md: updated
- .specify/templates/agent-file-template.md: updated
- .specify/templates/commands/*.md: not present in this repository
Follow-up TODOs: none
-->

# Raio de Sol Ateliê Constitution

## Core Principles

### I. Test-Driven Development Is Mandatory
Every feature MUST follow Red, Green, Refactor. Tests MUST be written before
implementation and MUST fail for the expected reason before production code is
changed. A feature is incomplete without unit tests, integration tests when it
touches Firebase, APIs, services, business rules, or security rules, and E2E
tests for critical flows such as purchase, login, cart, checkout, admin panel,
search, and filters. Test execution MUST be reported before completion.

Rationale: selling and administration flows affect money, customer trust, and
business operations. Tests are the first contract for behavior.

### II. Documentation Is Delivery
Documentation MUST be updated in the same change as the behavior, dependency,
architecture, command, environment variable, user flow, API contract, service
contract, or business rule being changed. Required documentation includes
README.md, docs/, architecture notes, setup guide, testing guide, deployment
guide, service/API contracts, changelog, and decision records when applicable.

Rationale: the project is intended to evolve quickly without losing operational
clarity for future maintainers and the shop owner.

### III. README Reflects Every Feature
README.md MUST be reviewed for every feature addition, behavior change, or
removal. It MUST keep at least project overview, current stack, environment
requirements, installation commands, development commands, test commands, build
commands, deployment commands, environment variables, available functionality,
project status, and known limitations.

Rationale: the README is the entry point for local setup, deployment, and
handoff.

### IV. Commit Requires Explicit Authorization
After each completed feature, the agent MUST run the available required checks,
summarize changes, list changed files, report executed tests and results,
suggest a semantic commit message, and ask the user for explicit authorization
before committing. The agent MUST NOT create commits automatically. After an
authorized commit, the generated hash MUST be reported.

Rationale: the user owns repository history and release timing.

### V. Security by Design
Security MUST be implemented in frontend and backend paths. All sensitive
operations MUST use Server Actions or Next.js API Routes with server-side
validation, sanitization, authorization, abuse protection, and rate limiting
where applicable. Firebase Security Rules MUST apply least privilege, separate
customer and admin access, and be tested. Secrets MUST never be exposed to the
frontend, dependencies and GitHub Actions MUST be audited, and threat
mitigations MUST be documented.

Rationale: e-commerce flows handle identity, orders, payments, and customer
communication.

### VI. Privacy and Data Minimization
The project MUST collect only data that is technically necessary for login,
orders, payment, delivery, invoices, support, or fraud prevention. For every
stored personal data element, documentation MUST state why it is needed, where
it is stored, who can access it, how it is protected, and how long it is kept.
Because the client does not want to store unnecessary customer data, optional
or speculative customer profiling data MUST NOT be collected.

Rationale: privacy requirements must match the client's stated preference while
still supporting the minimum legal and operational data needed for commerce.

### VII. Mobile-First Commerce
Every user-facing interface MUST be designed and tested first for mobile.
Required criteria include responsive layout, touch-friendly controls, simple
checkout, usable mobile search and filters, optimized images, high performance
on mobile networks, accessibility on small screens, and a visible WhatsApp
contact path that does not block purchase completion.

Rationale: the primary audience accesses the store by phone.

### VIII. Simple Practical UX
The product experience MUST prioritize clarity, few steps, easy categories,
clear product photos, price, variations, availability, direct purchase actions,
WhatsApp contact, and a simple admin panel. Interfaces MUST avoid unnecessary
complexity, heavy visual effects, premium-looking clutter, or workflows that
require technical knowledge from the shop owner.

Rationale: the desired customer feeling is practicality.

### IX. Clean Modular Architecture
Code MUST be organized by responsibility. UI components MUST stay small and
reusable. Business rules MUST stay outside visual components. Firebase, freight,
payment, WhatsApp, coupon, order, validation, and product logic MUST be isolated
in services, adapters, modules, or domain layers with strong TypeScript types,
clear names, low duplication, and useful comments only where rules are not
obvious.

Rationale: a simple project still needs boundaries so future payment, freight,
and admin changes do not become risky.

### X. Reproducible Firebase Configuration
Firebase setup MUST be reproducible through Firebase CLI and versioned files
whenever possible. Firestore rules, indexes, emulator configuration, and npm
scripts MUST be versioned. Firebase Emulator Suite MUST be configured for local
tests. Any required Firebase Console step MUST be documented with the reason
and exact instructions. Undocumented manual console configuration is not
acceptable.

Rationale: local development, CI, and production setup must remain repeatable.

### XI. CI Quality Gates
The project MUST have CI before it is considered production-ready. CI MUST run
clean install, lint, typecheck, unit tests, integration tests, build,
dependency audit, E2E tests when applicable, and Firebase Security Rules
validation when applicable. Pull requests and merges to main MUST NOT pass when
minimum quality gates fail.

Rationale: the store must remain deployable as features are added.

### XII. Performance and SEO
The site MUST be fast, indexable, and shareable. Pages MUST define metadata,
Open Graph data, friendly URLs, sitemap, robots.txt, optimized images, lazy
loading where appropriate, and product pages that can be indexed when possible.
Core Web Vitals and Lighthouse results MUST be used as quality references.

Rationale: the site must sell products and attract new customers.

### XIII. Accessibility
The site MUST use semantic HTML, sufficient contrast, keyboard navigation,
visible focus, labels for fields, relevant alt text, clear error messages, and
accessibility checks for main flows.

Rationale: usability and trust require the store to work for more customers and
more devices.

### XIV. MVP-First Feature Prioritization
The project MUST start with a simple MVP and evolve in phases. Initial priority
is home, catalog, product page, size and color variations, ready-to-ship and
WhatsApp-order categories, search, filters, cart, checkout with Pix/card behind
an isolated service layer, WhatsApp flow, admin products, login, orders,
coupons, and reviews. Complex capabilities MUST be planned in later phases
unless explicitly authorized.

Rationale: the client asked for a simple and fast project with room to evolve.

### XV. Project Skills Are Mandatory
Before implementation work begins, the agent MUST consult the
antigravity-awesome-skills catalog, select suitable skills, install them
according to the catalog documentation, and document the selection in
docs/skills.md. The initial candidate skills are development, documentation,
design-taste-frontend, lambdatest-agent-skills, context7-auto-research,
varlock, logic-lens, agentic-actions-auditor, verification-before-completion,
and skill-scanner. More specific skills for Next.js, Firebase, Vercel,
e-commerce, accessibility, security, or testing MUST replace weaker candidates
when justified.

Rationale: the project requires repeatable specialist workflows for quality,
security, documentation, and verification.

### XVI. Skills Usage Is Recorded Per Feature
Every feature MUST record which skills were used, why they were used, evidence
of application, and impact on the result. The final feature summary MUST
include a section named "Skills usadas nesta feature".

Rationale: mandatory skills are useful only when their use is traceable.

### XVII. Scope Control and Product Boundaries
The project MUST be treated as a catalog/e-commerce for the client's own
products, not as a multi-vendor marketplace. Multi-seller accounts,
commissioning, seller dashboards, marketplace dispute handling, and independent
vendor onboarding are outside the MVP unless explicitly approved.

Rationale: the customer answers describe own-product sales, not a marketplace.

### XVIII. Payment and Shipping Service Isolation
Payment and shipping MUST be implemented behind clear service interfaces for
freight calculation, order creation, coupon application, Pix payment, card
payment, and payment status. UI code MUST NOT call external payment or freight
APIs directly. Until real credentials are available, mocks or test doubles MUST
be used and tested.

Rationale: payment and freight providers may change and carry security,
compliance, and failure-mode risk.

### XIX. Feature Completion Definition
A feature can be marked complete only when Red, Green, Refactor has happened,
documentation and README were updated, lint passed, typecheck passed, tests
passed, build passed, security was reviewed, used skills were reported, the
final summary was delivered, and the user authorized or explicitly declined
the proposed commit.

Rationale: completion must mean the work is usable, verified, documented, and
under user control.

### XX. Brazilian Portuguese Project Language
Internal documentation and communication with the user MUST be in Brazilian
Portuguese. Customer-facing messages MUST use simple and clear Brazilian
Portuguese. Code, variable names, function names, commit messages, and file
names MAY use English technical terms when that better matches ecosystem
conventions.

Rationale: the shop owner and customers are Portuguese-speaking, while the
technical stack commonly uses English naming.

## Product Scope and Required Stack

Raio de Sol Ateliê is a simple, practical, mobile-first catalog/e-commerce for
the client's own products. The site MUST support direct sales on the site and
contact or order continuation through WhatsApp. Initial product types include
ready-to-ship products and products ordered by WhatsApp, with size and color
variations.

The required stack is:

- Next.js with App Router as the primary application framework.
- TypeScript with strict mode enabled.
- Hosting and deployment on Vercel.
- Firebase created and configured through Firebase CLI.
- Firebase Authentication for login.
- Cloud Firestore as the primary database.
- Firebase Storage only when needed for product images.
- Firebase Security Rules written, versioned, and tested.
- Firebase Emulator Suite for local integration and rules tests.
- Server Actions or Next.js API Routes for sensitive operations.

React with Vite is only acceptable for a pure showcase without checkout, login,
or backoffice. Vue/Nuxt is technically possible but not the default choice for
this project because the current scope benefits from Next.js, Vercel, server
routes, SEO, and secure backend operations.

Expected repository configuration:

```bash
git remote add origin https://github.com/Ald3b4r4n/raiodesolatelie.com.br.git
git branch -M main
git push -u origin main
```

## Development Workflow and Quality Gates

Every feature MUST proceed in small, reviewable changes:

1. Clarify scope, risks, data needs, and MVP priority.
2. Select and record mandatory skills for the feature.
3. Write failing tests first.
4. Implement the smallest production code needed to pass.
5. Refactor without changing behavior.
6. Update README.md and relevant docs.
7. Run lint, typecheck, tests, build, security checks, and relevant audits.
8. Summarize changes, risks, files, checks, and suggested semantic commit.
9. Ask the user before committing.

Plans, specs, and tasks MUST explicitly address architecture, security,
privacy, Firebase rules, CI, mobile-first UX, accessibility, performance, SEO,
documentation, and the use of skills. Any deviation from this constitution
MUST be justified in the plan with the simpler compliant alternative that was
considered.

## Governance

This constitution supersedes conflicting project practices, templates, and
feature plans. Amendments require a documented rationale, a version bump,
updates to dependent Spec Kit templates, and a clear summary of compatibility
impact. The user must approve governance changes before they are treated as
active project rules.

Versioning follows semantic governance versioning:

- MAJOR: removes or redefines existing principles in a way that weakens or
  changes required behavior.
- MINOR: adds principles, required sections, or materially expands governance.
- PATCH: clarifies wording, fixes typos, or makes non-semantic refinements.

Every plan, spec, task list, implementation summary, and review MUST check
compliance with this constitution. If a feature cannot comply, work MUST pause
until the trade-off is documented and approved by the user.

**Version**: 1.0.0 | **Ratified**: 2026-04-30 | **Last Amended**: 2026-04-30
