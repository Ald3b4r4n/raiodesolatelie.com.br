# Ateliê Raios de Sol

Site mostruário/e-commerce simples, rápido e mobile-first para venda de
produtos próprios da marca Ateliê Raios de Sol. O MVP deve permitir que clientes
encontrem produtos, escolham variações, adicionem ao carrinho e iniciem pedido
pelo checkout ou WhatsApp, enquanto a administradora gerencia produtos e
visualiza pedidos.

## Status do Projeto

- Feature atual: `001-mvp-ecommerce`.
- Etapa atual: revisão visual profunda do storefront concluída sobre as Fases 6,
  7 e 8, com home, catálogo e produto reposicionados para linguagem comercial
  de loja de moda feminina.
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
- Assets reais organizados em `public/brand/`, `public/banners/`,
  `public/products/` e `public/lookbook/`, preservando os arquivos originais da
  pasta externa `Imagens/`.
- Logo oficial atual em PNG copiada de
  `D:\Projetos\raiodesolatelie.com.br\Imagens\logo_identidade.png` para
  `public/brand/logo-identidade.png`, com cópia pública otimizada para web e
  preservação do arquivo original externo. Ela é usada no header, no footer, na
  home, em fallbacks visuais e no SEO/Open Graph base.
- Home refeita com hero comercial, vitrine de novidades, coleções, CTA real de
  WhatsApp e presença visível de Instagram e TikTok.
- SEO base configurado com metadata da home, Open Graph, `robots.ts` e
  `sitemap.ts`.
- Catálogo público implementado em `/catalog` com vitrine comercial, busca,
  filtros por categoria/preço/disponibilidade e foco visual nas fotos.
- Página de produto implementada em `/products/[slug]` com galeria, bloco de
  compra reforçado, seleção de tamanho/cor, CTA estrutural de carrinho e CTA
  real de WhatsApp.
- Seeds locais de catálogo ficam em `firebase/seed/products.ts` e usam dados
  fictícios, sem produto real da cliente.
- O botão de adicionar ao carrinho já valida a variação e prepara o item, mas a
  persistência e o fluxo completo do carrinho continuam reservados para a Fase 9.
- Carrinho funcional completo, checkout, login visual e painel admin ainda não
  foram implementados.

## Stack Planejada

- Next.js App Router.
- TypeScript em modo `strict`.
- Embla Carousel para hero, vitrine de novidades e galeria do produto.
- `lucide-react` para ícones de navegação, busca, filtros, CTA e benefícios.
- `motion` para transições leves de entrada, hover e drawer.
- Radix UI (`Dialog`, `Tabs`, `Select`, `Navigation Menu`, `Slot`) para interações acessíveis.
- `clsx` e `class-variance-authority` para variantes visuais consistentes.
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

- Home com hero forte, vitrine de destaques, coleções, catálogo, WhatsApp,
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

STORE_WHATSAPP_PHONE=61996632269
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/atelieraiode.sol?igsh=cDFrbGdzaHg0eDN0
NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@atelieraiode.sol?is_from_webapp=1&sender_device=pc

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
- A home, o catálogo e a página de produto já usam imagens reais copiadas de
  `Imagens/`, mas nomes, descrições, preços e parte das variações continuam
  temporários até a aprovação comercial da cliente.
- Esses dados devem ser substituídos depois pelos produtos reais, preços reais e
  variações reais aprovadas pela cliente.
- Endereço e instruções de retirada local ainda não foram informados.
- Provedor real de pagamento e frete ainda não foi definido.
- Processo do primeiro admin está documentado para custom claim aplicada por
  ambiente seguro, sem endpoint público permanente.
- Firebase Storage não está ativo no MVP inicial; upload de imagens dependerá
  de decisão futura e novas rules/testes.
- O CI atual é básico/smoke; o CI completo será consolidado nas fases finais.
- Tailwind CSS não foi adotado nesta revisão porque a base existente em CSS global
  já permitia atingir a direção visual premium exigida com menor risco estrutural.
  Por isso `tailwind-merge` e `tailwindcss-animate` não se aplicam nesta fase.
