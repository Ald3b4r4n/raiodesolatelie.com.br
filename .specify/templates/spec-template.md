# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`  
**Created**: [DATE]  
**Status**: Draft  
**Input**: User description: "$ARGUMENTS"

## Product Fit *(mandatory)*

<!--
  ACTION REQUIRED: Explain how this feature supports the simple mobile-first
  own-product catalog/e-commerce for Ateliê Raios de Sol.
-->

- **Business Goal**: [sell products, attract customers, simplify administration, etc.]
- **Primary Audience**: Mulheres acessando principalmente pelo celular
- **MVP Priority**: [P1/P2/P3/later phase, with rationale]
- **Scope Boundary**: This feature is for own-product e-commerce/catalog. It is
  not a multi-vendor marketplace unless explicitly approved.
- **WhatsApp Role**: [buy, support, custom order, fallback contact, or N/A]

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories must be prioritized as independent mobile-first
  journeys. Each story must be independently testable and valuable.
-->

### User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain Brazilian Portuguese]

**Why this priority**: [Explain the user/business value and MVP fit]

**Independent Test**: [Describe how this can be tested independently, including
the required unit/integration/E2E coverage for this story]

**Mobile Acceptance**: [Describe expected behavior on a small mobile screen]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain Brazilian Portuguese]

**Why this priority**: [Explain the user/business value and MVP fit]

**Independent Test**: [Describe how this can be tested independently]

**Mobile Acceptance**: [Describe expected behavior on a small mobile screen]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain Brazilian Portuguese]

**Why this priority**: [Explain the user/business value and MVP fit]

**Independent Test**: [Describe how this can be tested independently]

**Mobile Acceptance**: [Describe expected behavior on a small mobile screen]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- What happens when [boundary condition]?
- How does the system handle [Firebase/API/payment/freight failure]?
- What happens on slow mobile network or image loading failure?
- What happens when a product variation is unavailable?
- What happens when WhatsApp is unavailable or the user does not continue there?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST [specific capability, e.g., "list products by category"]
- **FR-002**: System MUST [specific capability, e.g., "support size and color variations"]
- **FR-003**: Users MUST be able to [key mobile interaction]
- **FR-004**: Admin users MUST be able to [admin capability, if applicable]
- **FR-005**: System MUST validate and sanitize [input/data] on the server
- **FR-006**: System MUST enforce Firebase Security Rules for [data/resource]
- **FR-007**: System MUST update README.md and relevant docs for this feature
- **FR-008**: System MUST record skills used for this feature and evidence of application

*Example of marking unclear requirements:*

- **FR-009**: System MUST retain customer data for [NEEDS CLARIFICATION: retention period not specified]
- **FR-010**: System MUST calculate freight using [NEEDS CLARIFICATION: provider or mock not specified]

### Non-Functional Requirements

- **NFR-001 Mobile**: Feature MUST work first on mobile with touch-friendly controls.
- **NFR-002 Performance/SEO**: User-facing pages MUST preserve fast mobile performance and SEO metadata where applicable.
- **NFR-003 Accessibility**: Feature MUST provide semantic HTML, labels, visible focus, adequate contrast, and clear errors.
- **NFR-004 Security**: Sensitive operations MUST run through Server Actions or API Routes with server-side validation and authorization.
- **NFR-005 Privacy**: Personal data MUST be minimized, justified, protected, and documented.
- **NFR-006 Architecture**: Business rules and integrations MUST be isolated from visual components.

### Key Entities *(include if feature involves data)*

- **[Entity 1]**: [What it represents, key attributes, privacy classification, and access rules]
- **[Entity 2]**: [What it represents, relationships, retention needs, and access rules]

### Data & Privacy *(mandatory when data is collected or stored)*

- **Data Collected**: [List fields or N/A]
- **Purpose**: [Why each field is necessary]
- **Storage**: [Firestore/Auth/Storage/external provider/N/A]
- **Access**: [customer/admin/server-only/provider]
- **Protection**: [rules, validation, encryption by provider, secret handling, etc.]
- **Retention**: [how long it is kept or NEEDS CLARIFICATION]
- **Deletion/Correction Path**: [how user/admin can correct or remove data]

### Service Boundaries *(mandatory for integrations)*

- **Firebase**: [Auth/Firestore/Storage/rules/indexes/emulators impacted]
- **Payment**: [service interface, mock/test double, Pix/card status, or N/A]
- **Freight**: [service interface, mock/test double, Correios/local pickup, or N/A]
- **WhatsApp**: [link/message generation/service boundary, or N/A]
- **Coupons/Reviews/Invoices**: [service boundary or N/A]

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: [Mobile user can complete the primary task in X steps/time]
- **SC-002**: [Unit/integration/E2E tests cover the critical behavior]
- **SC-003**: [Security rules or authorization behavior is verified]
- **SC-004**: [Documentation and README accurately describe the feature]
- **SC-005**: [Performance/accessibility target for affected pages]

## Documentation & Skills *(mandatory)*

- **README Impact**: [What README.md sections must change]
- **Docs Impact**: [docs/setup.md, docs/testing.md, docs/deploy.md, docs/security.md, docs/privacy.md, docs/skills.md, etc.]
- **Skills Required**: [List selected skills and why each applies]
- **Evidence Required**: [What proof will be included in the final summary]

## Assumptions

- [Assumption about mobile usage, e.g., "Users may be on slow mobile networks"]
- [Assumption about scope boundaries, e.g., "Marketplace multi-vendor flows are out of scope"]
- [Assumption about data/environment, e.g., "Firebase Emulator Suite is available locally"]
- [Dependency on external service/provider, e.g., "Payment provider credentials are not yet available, so mocks are used"]
