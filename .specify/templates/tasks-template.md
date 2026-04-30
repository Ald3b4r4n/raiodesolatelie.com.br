---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories),
research.md, data-model.md, contracts/

**Tests**: Tests are mandatory by the project constitution. Write tests first,
confirm they fail for the expected reason, implement, then refactor.

**Organization**: Tasks are grouped by user story to enable independent
implementation, testing, documentation, and validation of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files and has no dependency conflict
- **[Story]**: Which user story this task belongs to, e.g., US1, US2, US3
- Include exact file paths in descriptions
- Include documentation, security, privacy, rules, and skills evidence tasks

## Path Conventions

- **Next.js App Router**: `src/app/`, `src/components/`, `src/domain/`, `src/services/`, `src/lib/`, `src/validation/`
- **Tests**: `tests/unit/`, `tests/integration/`, `tests/e2e/`
- **Firebase**: `firebase/firestore.rules`, `firebase/firestore.indexes.json`, `firebase/storage.rules`, emulator config
- **Documentation**: `README.md`, `docs/`
- **CI**: `.github/workflows/`

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md with priorities P1, P2, P3...
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints and service contracts from contracts/
  - Constitution requirements for TDD, docs, README, security, skills, mobile,
    Firebase, CI, accessibility, performance, SEO, and commit authorization

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 0: Skills & Governance (Blocking)

**Purpose**: Ensure mandatory skills and governance context are ready before
implementation starts.

- [ ] T001 Consult the antigravity-awesome-skills catalog and record selected skills in `docs/skills.md`
- [ ] T002 Run or document the skill safety review before adopting new skills
- [ ] T003 [P] Record feature-specific skills, activation method, limitations, and expected evidence in `docs/skills.md`
- [ ] T004 Confirm the feature remains own-product e-commerce/catalog scope, not marketplace scope

**Checkpoint**: Skills and scope are documented before code tasks begin.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and baseline tooling.

- [ ] T005 Create or update the Next.js App Router project structure in `src/app/`
- [ ] T006 Configure TypeScript strict mode in `tsconfig.json`
- [ ] T007 [P] Configure linting and formatting scripts in `package.json`
- [ ] T008 [P] Configure test tooling for unit, integration, and E2E tests
- [ ] T009 Configure Firebase CLI files, emulators, rules, indexes, and npm scripts
- [ ] T010 Configure environment variable documentation and safe handling
- [ ] T011 Configure Vercel deployment documentation or project linkage notes

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can
be implemented.

**CRITICAL**: No user story work can begin until this phase is complete.

Examples of foundational tasks (adjust based on the feature):

- [ ] T012 Setup Firebase Authentication boundary and role model for customer/admin users
- [ ] T013 [P] Create Firebase client/admin adapters in `src/lib/firebase/`
- [ ] T014 [P] Create shared validation schemas in `src/validation/`
- [ ] T015 Create domain entities and policies in `src/domain/`
- [ ] T016 Create service interfaces for orders, payment, freight, WhatsApp, coupons, and reviews in `src/services/`
- [ ] T017 Create baseline Firebase Security Rules and tests in `tests/integration/`
- [ ] T018 Configure error handling, logging, and abuse protection for sensitive endpoints
- [ ] T019 Create CI workflow tasks for lint, typecheck, tests, build, audit, and Firebase rules validation
- [ ] T020 Update `README.md` and relevant `docs/` files for setup, tests, deploy, security, privacy, and skills

**Checkpoint**: Foundation ready. User story implementation can now begin.

---

## Phase 3: User Story 1 - [Title] (Priority: P1) MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (write first)

> Write these tests FIRST and confirm they FAIL for the expected reason before implementation.

- [ ] T021 [P] [US1] Unit test for [business rule/component] in `tests/unit/[name].test.ts`
- [ ] T022 [P] [US1] Integration test for [Firebase/API/service/rule] in `tests/integration/[name].test.ts`
- [ ] T023 [P] [US1] E2E test for [critical mobile journey] in `tests/e2e/[name].spec.ts`
- [ ] T024 [US1] Record the failing test result and expected failure reason in the implementation notes

### Implementation for User Story 1

- [ ] T025 [P] [US1] Implement domain model or policy in `src/domain/[name].ts`
- [ ] T026 [P] [US1] Implement validation schema in `src/validation/[name].ts`
- [ ] T027 [US1] Implement service/adaptor logic in `src/services/[name].ts`
- [ ] T028 [US1] Implement Server Action or API Route for sensitive operations in `src/app/[path]/`
- [ ] T029 [US1] Implement mobile-first UI in `src/app/[path]/` and `src/components/`
- [ ] T030 [US1] Add server-side validation, authorization, sanitization, and abuse protection
- [ ] T031 [US1] Add or update Firebase Security Rules and emulator tests
- [ ] T032 [US1] Add metadata, Open Graph, accessible labels, focus states, and optimized images when user-facing pages are affected
- [ ] T033 [US1] Update `README.md` and relevant docs for this story
- [ ] T034 [US1] Record skills used, evidence, and impact for this story

**Checkpoint**: User Story 1 is fully functional, tested, documented, and independently verifiable.

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (write first)

- [ ] T035 [P] [US2] Unit test for [business rule/component] in `tests/unit/[name].test.ts`
- [ ] T036 [P] [US2] Integration test for [Firebase/API/service/rule] in `tests/integration/[name].test.ts`
- [ ] T037 [P] [US2] E2E test for [critical mobile journey] in `tests/e2e/[name].spec.ts`
- [ ] T038 [US2] Record the failing test result and expected failure reason

### Implementation for User Story 2

- [ ] T039 [P] [US2] Implement domain model or policy in `src/domain/[name].ts`
- [ ] T040 [P] [US2] Implement validation schema in `src/validation/[name].ts`
- [ ] T041 [US2] Implement service/adaptor logic in `src/services/[name].ts`
- [ ] T042 [US2] Implement Server Action or API Route for sensitive operations in `src/app/[path]/`
- [ ] T043 [US2] Implement mobile-first UI in `src/app/[path]/` and `src/components/`
- [ ] T044 [US2] Add server-side validation, authorization, sanitization, and abuse protection
- [ ] T045 [US2] Add or update Firebase Security Rules and emulator tests
- [ ] T046 [US2] Update `README.md`, relevant docs, and skills evidence

**Checkpoint**: User Stories 1 and 2 work independently and together.

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (write first)

- [ ] T047 [P] [US3] Unit test for [business rule/component] in `tests/unit/[name].test.ts`
- [ ] T048 [P] [US3] Integration test for [Firebase/API/service/rule] in `tests/integration/[name].test.ts`
- [ ] T049 [P] [US3] E2E test for [critical mobile journey] in `tests/e2e/[name].spec.ts`
- [ ] T050 [US3] Record the failing test result and expected failure reason

### Implementation for User Story 3

- [ ] T051 [P] [US3] Implement domain model or policy in `src/domain/[name].ts`
- [ ] T052 [P] [US3] Implement validation schema in `src/validation/[name].ts`
- [ ] T053 [US3] Implement service/adaptor logic in `src/services/[name].ts`
- [ ] T054 [US3] Implement Server Action or API Route for sensitive operations in `src/app/[path]/`
- [ ] T055 [US3] Implement mobile-first UI in `src/app/[path]/` and `src/components/`
- [ ] T056 [US3] Add security, privacy, Firebase rules, accessibility, performance, SEO, docs, README, and skills evidence updates

**Checkpoint**: All user stories are independently functional and integrated.

---

[Add more user story phases as needed, following the same pattern.]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final compliance.

- [ ] TXXX [P] Update `README.md` final feature status, commands, env vars, limitations, and available functionality
- [ ] TXXX [P] Update `docs/` for setup, testing, deploy, architecture, security, privacy, API/service contracts, and skills
- [ ] TXXX Run lint and fix reported issues
- [ ] TXXX Run typecheck and fix reported issues
- [ ] TXXX Run unit tests and fix reported issues
- [ ] TXXX Run Firebase emulator integration and security rules tests
- [ ] TXXX Run E2E tests for critical mobile flows affected by the feature
- [ ] TXXX Run build and fix reported issues
- [ ] TXXX Run dependency/security audit and document remaining risk
- [ ] TXXX Run accessibility checks for affected flows
- [ ] TXXX Run performance/SEO checks for affected user-facing pages
- [ ] TXXX Validate quickstart.md and setup instructions
- [ ] TXXX Prepare final summary with "Skills usadas nesta feature"
- [ ] TXXX Suggest semantic commit message and ask user before committing

---

## Dependencies & Execution Order

### Phase Dependencies

- **Skills & Governance (Phase 0)**: No dependencies; blocks implementation.
- **Setup (Phase 1)**: Depends on Phase 0.
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion.
- **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational. No dependencies on other stories.
- **User Story 2 (P2)**: Can start after Foundational. May integrate with US1 but remains independently testable.
- **User Story 3 (P3)**: Can start after Foundational. May integrate with US1/US2 but remains independently testable.

### Within Each User Story

- Skills and scope evidence before code.
- Tests before implementation.
- Confirm Red state before production code.
- Domain and validation before services.
- Services before endpoints/actions.
- Endpoints/actions before UI integration.
- Security rules and integration tests with data access changes.
- Documentation and README before final verification.
- Story complete before moving to next priority unless parallel work is explicitly coordinated.

### Parallel Opportunities

- Setup tasks marked [P] can run in parallel.
- Foundational tasks marked [P] can run in parallel within Phase 2.
- Tests for a user story marked [P] can run in parallel.
- Domain models, validation, and docs can often run in parallel when they touch different files.
- Different user stories can be worked on in parallel only if ownership and file boundaries are clear.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 0: Skills & Governance.
2. Complete Phase 1: Setup.
3. Complete Phase 2: Foundational.
4. Write failing tests for User Story 1.
5. Implement User Story 1.
6. Refactor and validate all required checks.
7. Update README/docs/skills evidence.
8. Stop and ask before committing.

### Incremental Delivery

1. Complete Setup + Foundation.
2. Add User Story 1, test independently, document, validate, ask before commit.
3. Add User Story 2, test independently, document, validate, ask before commit.
4. Add User Story 3, test independently, document, validate, ask before commit.
5. Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. Team completes Skills, Setup, and Foundation together.
2. Once Foundation is done, assign clear file ownership per story.
3. Each developer writes tests first and avoids conflicting files.
4. Integrate only after tests, docs, security, and README updates pass.

---

## Notes

- [P] tasks must touch different files and have no dependency conflict.
- [Story] label maps each task to a specific user story for traceability.
- Do not mark a story complete without tests, docs, README, skills evidence, and checks.
- Never rely only on client-side validation.
- Never expose secrets to frontend code.
- Never commit automatically; propose the commit and wait for explicit user authorization.
- Avoid vague tasks, hidden manual Firebase Console steps, and cross-story dependencies that break independent delivery.
