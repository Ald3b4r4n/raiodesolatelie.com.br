# Raio de Sol Atelie

Site mostruario/e-commerce simples, rapido e mobile-first para venda de
produtos proprios da marca Raio de Sol Atelie. O MVP deve permitir que clientes
encontrem produtos, escolham variacoes, adicionem ao carrinho e iniciem pedido
pelo checkout ou WhatsApp, enquanto a administradora gerencia produtos e
visualiza pedidos.

## Status do Projeto

- Feature atual: `001-mvp-ecommerce`.
- Etapa atual: Fase 1 concluida como bootstrap tecnico do app.
- App Next.js inicializado com App Router, TypeScript strict e pnpm.
- Firebase ainda nao foi configurado.
- Existem placeholders seguros de rules/indexes, mas sem Firebase CLI,
  emuladores, `.firebaserc` ou `firebase.json`.

## Stack Planejada

- Next.js App Router.
- TypeScript em modo `strict`.
- Firebase Authentication para login.
- Cloud Firestore como banco principal.
- Firebase Storage somente se a decisao do MVP confirmar necessidade para
  imagens de produtos.
- Firebase Security Rules e Emulator Suite obrigatorios.
- Vercel para preview e producao.
- pnpm como package manager recomendado.
- Vitest, Testing Library, Playwright, axe-core e Firebase Emulator Suite para
  testes.

## Escopo do MVP

- Home simples com marca, chamada, produtos em destaque, catalogo, WhatsApp,
  Instagram e TikTok.
- Catalogo com busca, filtros por categoria/preco/disponibilidade e listagem
  mobile-first.
- Pagina de produto com fotos, descricao, preco, categoria, variacoes de
  tamanho/cor, disponibilidade e CTAs.
- Carrinho com persistencia local, subtotal e validacao de variacoes.
- Checkout inicial com dados minimos, retirada local ou entrega, Pix/cartao por
  camada mockada.
- WhatsApp com mensagem automatica para produto ou carrinho.
- Login com Firebase Authentication e perfis `customer` e `admin`.
- Painel admin simples para produtos e pedidos.
- Suporte inicial para cupons e avaliacoes moderadas.
- SEO, acessibilidade, seguranca e documentacao como parte da entrega.

## Fora do Escopo do MVP

- Marketplace multi-vendedor.
- Painel para lojistas terceiros.
- Comissao por vendedor.
- App mobile nativo.
- Blog completo.
- Emissao automatica de nota fiscal.
- Integracao real de pagamento ou frete sem credenciais/provedor definido.
- Automacoes avancadas de marketing ou CRM complexo.

## Requisitos de Ambiente

- Node.js `v22.17.0` validado localmente.
- pnpm `10.30.3` definido em `packageManager`.
- Firebase CLI instalado e autenticado.
- Vercel CLI opcional para deploy local/prebuilt.
- Git.

## Comandos Disponiveis

Comandos reais habilitados pela Fase 1:

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm format
pnpm format:check
pnpm build
```

Teste unitario de env executado diretamente ate a Fase 2 consolidar scripts de
teste:

```bash
pnpm exec vitest run tests/unit/security/env.test.ts
```

Comandos Firebase planejados:

```bash
firebase init
firebase emulators:start
firebase emulators:exec "pnpm test:integration && pnpm test:rules"
```

## Variaveis de Ambiente Planejadas

Valores reais nao devem ser commitados. Secrets server-side nunca devem usar
prefixo `NEXT_PUBLIC_`.

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

## Documentacao

- [Setup local](docs/setup.md)
- [Arquitetura](docs/architecture.md)
- [Seguranca e privacidade](docs/security.md)
- [Testes](docs/testing.md)
- [Firebase](docs/firebase.md)
- [Deploy](docs/deployment.md)
- [Skills do projeto](docs/skills.md)
- [Decisoes tecnicas](docs/decisions/)

## Politica de Desenvolvimento

- TDD obrigatorio: Red -> Green -> Refactor.
- README e `docs/` devem ser revisados em toda feature.
- Operacoes sensiveis devem ser validadas no backend e protegidas por roles,
  rate limit e Firebase Security Rules.
- Pagamento e frete devem passar por servicos isolados e mockados ate existirem
  credenciais reais.
- Commit e push so podem ocorrer apos autorizacao explicita do usuario.

## Limitacoes Conhecidas

- Numero oficial de WhatsApp ainda nao foi informado.
- Identidade visual e fotos reais de produtos ainda nao foram fornecidas.
- Provedor real de pagamento e frete ainda nao foi definido.
- Processo do primeiro admin sera criado em fase posterior, sem endpoint publico
  permanente.
- Firebase Storage permanece condicional ate a decisao da fase de Firebase.
- CI, Testing Library, Playwright, axe-core e emuladores serao configurados nas
  proximas fases.
