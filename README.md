# Raio de Sol Ateliê

Site mostruário/e-commerce simples, rápido e mobile-first para venda de
produtos próprios da marca Raio de Sol Ateliê. O MVP deve permitir que clientes
encontrem produtos, escolham variações, adicionem ao carrinho e iniciem pedido
pelo checkout ou WhatsApp, enquanto a administradora gerencia produtos e
visualiza pedidos.

## Status do Projeto

- Feature atual: `001-mvp-ecommerce`.
- Etapa atual: Fase 7 concluída com catálogo, busca e filtros mockados.
- App Next.js inicializado com App Router, TypeScript strict e pnpm.
- Firebase configurado para desenvolvimento local com projeto demo,
  `.firebaserc`, `firebase.json`, emuladores, Security Rules e índices
  versionados.
- Storage permanece desativado no MVP inicial com rules deny-all testadas.
- Modelos de domínio e validadores implementados para produto, variação,
  categoria, carrinho, pedido, cliente, admin, cupom, avaliação, frete e
  pagamento mockado.
- Sanitização reutilizável para campos públicos e snapshots exibíveis.
- UI base com tokens simples, header, footer, navegação mobile, componentes de
  formulário/display, drawer e estados loading/empty/error.
- Logo oficial copiada para `public/brand/logo-identidade.jpeg` e usada no
  header. O arquivo original permanece em `Imagens/logo_identidade.jpeg`.
- Home simples implementada com marca, chamada objetiva, destaques placeholder,
  CTA de catálogo, CTA de WhatsApp preparado e placeholders seguros para redes
  sociais.
- SEO base configurado com metadata da home, Open Graph, `robots.ts` e
  `sitemap.ts`.
- Catálogo público implementado em `/catalog` com listagem mock temporária,
  categorias, busca por nome e filtros por categoria, preço e disponibilidade.
- Seeds locais de catálogo ficam em `firebase/seed/products.ts` e usam dados
  fictícios, sem produto real da cliente.
- Carrinho funcional, checkout, login visual e painel admin ainda não foram
  implementados.

## Stack Planejada

- Next.js App Router.
- TypeScript em modo `strict`.
- Firebase Authentication para login.
- Cloud Firestore como banco principal.
- Firebase Storage somente se a decisão do MVP confirmar necessidade para
  imagens de produtos.
- Firebase Security Rules e Emulator Suite obrigatórios.
- Vercel para preview e produção.
- pnpm como package manager recomendado.
- Vitest, Testing Library, Playwright, axe-core e Firebase Emulator Suite para
  testes.

## Escopo do MVP

- Home simples com marca, chamada, produtos em destaque, catálogo, WhatsApp,
  Instagram e TikTok.
- Catálogo com busca, filtros por categoria/preço/disponibilidade e listagem
  mobile-first.
- Página de produto com fotos, descrição, preço, categoria, variações de
  tamanho/cor, disponibilidade e CTAs.
- Carrinho com persistência local, subtotal e validação de variações.
- Checkout inicial com dados mínimos, retirada local ou entrega, Pix/cartão por
  camada mockada.
- WhatsApp com mensagem automática para produto ou carrinho.
- Login com Firebase Authentication e perfis `customer` e `admin`.
- Painel admin simples para produtos e pedidos.
- Suporte inicial para cupons e avaliações moderadas.
- SEO, acessibilidade, segurança e documentação como parte da entrega.

## Fora do Escopo do MVP

- Marketplace multi-vendedor.
- Painel para lojistas terceiros.
- Comissão por vendedor.
- App mobile nativo.
- Blog completo.
- Emissão automática de nota fiscal.
- Integração real de pagamento ou frete sem credenciais/provedor definido.
- Automações avançadas de marketing ou CRM complexo.

## Requisitos de Ambiente

- Node.js `v22.17.0` validado localmente.
- pnpm `10.30.3` definido em `packageManager`.
- Firebase CLI local via `firebase-tools@14.24.0`; Java 17 validado para os
  emuladores nesta fase.
- Vercel CLI opcional para deploy local/prebuilt.
- Git.

## Comandos Disponíveis

Comandos reais habilitados pela Fase 1:

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
pnpm test:coverage
pnpm test:smoke
pnpm format
pnpm format:check
pnpm build
```

Comandos Firebase:

```bash
pnpm firebase:emulators
pnpm test:rules
firebase emulators:exec --project demo-raiodesolatelie --only firestore,storage "pnpm exec vitest run tests/integration/rules"
```

## Variáveis de Ambiente Planejadas

Valores reais não devem ser commitados. Secrets server-side nunca devem usar
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

## Documentação

- [Setup local](docs/setup.md)
- [Arquitetura](docs/architecture.md)
- [Segurança e privacidade](docs/security.md)
- [Testes](docs/testing.md)
- [Firebase](docs/firebase.md)
- [Deploy](docs/deployment.md)
- [Skills do projeto](docs/skills.md)
- [Decisões técnicas](docs/decisions/)

## Política de Desenvolvimento

- TDD obrigatório: Red → Green → Refactor.
- README e `docs/` devem ser revisados em toda feature.
- Operações sensíveis devem ser validadas no backend e protegidas por roles,
  rate limit e Firebase Security Rules.
- Pagamento e frete devem passar por serviços isolados e mockados até existirem
  credenciais reais.
- Commit e push só podem ocorrer após autorização explícita do usuário.

## Limitações Conhecidas

- O catálogo atual usa dados mock temporários em
  `src/services/firebase/catalog-mock-data.ts` e `firebase/seed/products.ts`.
- Esses dados devem ser substituídos depois pelos produtos reais, fotos reais,
  preços reais e variações reais aprovadas pela cliente.
- Número oficial de WhatsApp ainda não foi informado.
- Links oficiais de Instagram e TikTok ainda não foram informados.
- Fotos, nomes, preços e variações reais de produtos ainda não foram fornecidos.
- Endereço e instruções de retirada local ainda não foram informados.
- Provedor real de pagamento e frete ainda não foi definido.
- Processo do primeiro admin está documentado para custom claim aplicada por
  ambiente seguro, sem endpoint público permanente.
- Firebase Storage não está ativo no MVP inicial; upload de imagens dependerá
  de decisão futura e novas rules/testes.
- O CI atual é básico/smoke; o CI completo será consolidado nas fases finais.
