# Quickstart: MVP Inicial Ateliê Raios de Sol

**Feature**: `001-mvp-ecommerce`
**Status**: planejado. O app ainda não foi criado nesta etapa.

## Prerequisites

- Node.js LTS ativo no momento da implementação.
- pnpm instalado.
- Firebase CLI instalado e autenticado.
- Conta/projeto Firebase definido.
- Projeto Vercel definido para deploy.
- Número oficial do WhatsApp, links Instagram/TikTok e dados iniciais de produtos.

## Planned Setup

```bash
pnpm install
cp .env.example .env.local
firebase login
firebase use --add
```

## Planned Environment Variables

Variáveis públicas Firebase podem usar `NEXT_PUBLIC_` quando necessárias ao
cliente. Secrets devem ficar apenas no ambiente seguro.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

STORE_WHATSAPP_PHONE=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_TIKTOK_URL=

PAYMENT_PROVIDER=mock
SHIPPING_PROVIDER=mock
```

## Planned Development Commands

```bash
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
```

## Planned Firebase Commands

```bash
firebase init
firebase emulators:start
firebase emulators:exec "pnpm test:integration && pnpm test:rules"
firebase deploy --only firestore:rules,firestore:indexes,storage
```

## Planned TDD Workflow

1. Escolher a menor história ou regra.
2. Escrever teste unitário/integration/E2E conforme risco.
3. Rodar teste e confirmar falha esperada.
4. Implementar o mínimo.
5. Rodar teste e confirmar sucesso.
6. Refatorar.
7. Atualizar README.md e docs relevantes.
8. Rodar gates.
9. Resumir e pedir autorização de commit.

## Planned Local Firebase Emulator Flow

```bash
firebase emulators:start
pnpm test:rules
pnpm test:integration
```

Para CI, preferir:

```bash
firebase emulators:exec "pnpm test:rules && pnpm test:integration"
```

## Planned Deploy Preview

```bash
pnpm build
vercel pull
vercel build
vercel deploy --prebuilt
```

O deploy real só deve ocorrer depois de variáveis, Firebase rules, indexes,
emuladores, CI e documentação estarem prontos.

## Documentation Checklist

- README.md criado/atualizado.
- `docs/setup.md` com setup local.
- `docs/firebase.md` com CLI, emuladores, rules e indexes.
- `docs/testing.md` com TDD e comandos.
- `docs/security.md` com ameaças, roles, secrets e privacidade.
- `docs/skills.md` com skills instaladas e evidência.
- `docs/architecture.md` com módulos e integrações.
- `docs/deployment.md` com Vercel.
- `docs/decisions/` com ADRs relevantes.

## Known Blockers Before Implementation Completion

- Instalar e documentar skills do antigravity-awesome-skills.
- Criar app/package.json.
- Definir versões exatas e scripts.
- Configurar Firebase CLI/emuladores.
- Confirmar WhatsApp e redes sociais.
- Criar processo seguro para primeiro admin.
- Configurar CI.
