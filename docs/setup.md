# Setup Local

Este documento descreve o setup local do MVP `001-mvp-ecommerce`.
Na Fase 1 o bootstrap técnico foi criado, mas ainda não há funcionalidades de
catálogo, carrinho, checkout, login ou admin.

## Pre-requisitos

- Node.js `v22.17.0` validado localmente.
- pnpm `10.30.3`.
- Firebase CLI instalado e autenticado.
- Conta/projeto Firebase definido.
- Vercel CLI opcional.
- Git.

## Estado Atual

- `package.json` e `pnpm-lock.yaml` existem.
- Next.js App Router foi inicializado com TypeScript strict.
- Firebase ainda não foi configurado por CLI.
- Existem apenas placeholders seguros em `firebase/` para manter deny-all até a
  fase própria de Firebase.

## Fluxo Local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Checks planejados:

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

## Variáveis de Ambiente

`.env.example` foi criado sem valores reais. Variáveis públicas podem usar
`NEXT_PUBLIC_` quando forem realmente necessárias no cliente. Secrets
server-side não podem ser expostas no frontend.

Variáveis planejadas:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` se Storage for usado
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `STORE_WHATSAPP_PHONE`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_TIKTOK_URL`
- `PAYMENT_PROVIDER=mock`
- `SHIPPING_PROVIDER=mock`

## Firebase CLI

Firebase deve ser configurado por CLI e arquivos versionáveis. Qualquer etapa
que exija Console Web precisa ser documentada com motivo, passo a passo e risco.

Na Fase 2 foi criado `firebase.json` para emuladores locais de teste. Ainda não
foi executado `firebase init`, não existe `.firebaserc` e nenhum projeto
Firebase foi selecionado.

Fluxo planejado:

```bash
firebase login
firebase use --add
firebase init
firebase emulators:start
pnpm firebase:emulators
```

## Dados Necessários da Cliente

- Número oficial do WhatsApp.
- Links oficiais de Instagram e TikTok.
- Fotos e dados iniciais dos produtos.
- Preferências de retirada local.
- Identidade visual básica quando disponível.
- Decisão futura sobre provedor real de pagamento e frete.

## Controle de Escopo

O projeto deve permanecer um e-commerce/catálogo de produtos próprios. Não
devem ser adicionados fluxo multi-vendedor, comissão por lojista, painel de
terceiros ou app mobile nativo sem aprovação explícita.
