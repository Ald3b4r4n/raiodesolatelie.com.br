# Setup Local

Este documento descreve o setup local do MVP `001-mvp-ecommerce`.
Na Fase 1 o bootstrap tecnico foi criado, mas ainda nao ha funcionalidades de
catalogo, carrinho, checkout, login ou admin.

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
- Firebase ainda nao foi configurado por CLI.
- Existem apenas placeholders seguros em `firebase/` para manter deny-all ate a
  fase propria de Firebase.

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
pnpm format:check
pnpm build
```

Teste unitario de schema de ambiente, ate a Fase 2 criar scripts de teste
consolidados:

```bash
pnpm exec vitest run tests/unit/security/env.test.ts
```

## Variaveis de Ambiente

`.env.example` foi criado sem valores reais. Variaveis publicas podem usar
`NEXT_PUBLIC_` quando forem realmente necessarias no cliente. Secrets
server-side nao podem ser expostas no frontend.

Variaveis planejadas:

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

Firebase deve ser configurado por CLI e arquivos versionaveis. Qualquer etapa
que exija Console Web precisa ser documentada com motivo, passo a passo e risco.

Na Fase 1 nao foi executado `firebase init`, nao foi criado `firebase.json` e
nao foram configurados emuladores.

Fluxo planejado:

```bash
firebase login
firebase use --add
firebase init
firebase emulators:start
```

## Dados Necessarios da Cliente

- Numero oficial do WhatsApp.
- Links oficiais de Instagram e TikTok.
- Fotos e dados iniciais dos produtos.
- Preferencias de retirada local.
- Identidade visual basica quando disponivel.
- Decisao futura sobre provedor real de pagamento e frete.

## Controle de Escopo

O projeto deve permanecer um e-commerce/catalogo de produtos proprios. Nao
devem ser adicionados fluxo multi-vendedor, comissao por lojista, painel de
terceiros ou app mobile nativo sem aprovacao explicita.
