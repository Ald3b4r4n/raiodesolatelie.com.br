# Setup Local

Este documento descreve o setup planejado para o MVP `001-mvp-ecommerce`.
Nesta Fase 0 o app ainda nao foi criado; os comandos de desenvolvimento serao
ativados nas fases de bootstrap e infraestrutura de testes.

## Pre-requisitos Planejados

- Node.js LTS.
- pnpm.
- Firebase CLI instalado e autenticado.
- Conta/projeto Firebase definido.
- Vercel CLI opcional.
- Git.

## Estado Atual

- Nao existe `package.json`.
- Next.js ainda nao foi inicializado.
- Firebase ainda nao foi inicializado.
- A documentacao base e as skills obrigatorias foram preparadas antes do
  bootstrap, conforme a constitution v1.0.0.

## Fluxo Planejado Apos Bootstrap

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
pnpm build
```

## Variaveis de Ambiente

A fase de bootstrap deve criar `.env.example` sem valores reais. Variaveis
publicas podem usar `NEXT_PUBLIC_` quando forem realmente necessarias no
cliente. Secrets server-side nao podem ser expostas no frontend.

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
