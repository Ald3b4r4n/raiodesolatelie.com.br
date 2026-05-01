# Arquitetura

## Objetivo

Organizar o MVP do Raio de Sol Ateliê como um e-commerce simples, mobile-first,
seguro e fácil de evoluir, sem transformar o produto em marketplace
multi-vendedor.

## Stack Planejada

- Next.js App Router.
- TypeScript strict.
- Firebase Authentication.
- Cloud Firestore.
- Firebase Storage condicional para imagens.
- Firebase Security Rules e Emulator Suite.
- Vercel.

## Estrutura Planejada

```text
src/
├── app/
├── components/
├── features/
├── domain/
├── services/
├── lib/
├── validators/
└── test/

tests/
├── unit/
├── integration/
├── e2e/
└── accessibility/

firebase/
├── firestore.rules
├── firestore.indexes.json
├── storage.rules
└── seed/

docs/
└── decisions/
```

## Responsabilidades

- `src/app`: rotas, layouts, Server Actions e Route Handlers do Next.js.
- `src/components`: componentes visuais pequenos e reutilizáveis.
- `src/features`: composição por caso de uso, como catálogo, carrinho,
  checkout, admin e avaliações.
- `src/domain`: regras puras de negócio, tipos e transições de estado.
- `src/services`: fronteiras com Firebase, WhatsApp, pagamento, frete, cupons e
  avaliações.
- `src/lib`: infraestrutura compartilhada, env, segurança, Firebase e SEO.
- `src/validators`: schemas de entrada e saída.
- `tests`: testes unitários, integração, E2E, acessibilidade e rules.
- `firebase`: configuração reproduzível por CLI, rules, indexes e seeds.
- `docs`: setup, segurança, testes, Firebase, deploy, skills e ADRs.

## Fronteiras de Domínio

Entidades principais:

- `Product`
- `ProductVariant`
- `Category`
- `Cart`
- `Order`
- `CustomerProfile`
- `AdminUser`
- `Coupon`
- `Review`
- `ShippingOption`
- `PaymentSession`

Implementação atual:

- Tipos e regras puras em `src/domain/` para produto, carrinho, pedido, cliente,
  admin, cupom, review, frete e pagamento.
- Schemas de validação em `src/validators/` para `Product`, `ProductVariant`,
  `Category`, `Cart`, `Order`, `CustomerProfile`, `AdminUser`, `Coupon`,
  `Review`, `ShippingOption` e `PaymentSession`.
- Primitivas reutilizáveis de validação em `src/validators/primitives.ts`.
- Sanitização de campos públicos e snapshots exibíveis em
  `src/lib/security/sanitize.ts`, usada pelos schemas.

Pedidos devem guardar snapshot dos itens para preservar histórico mesmo que um
produto seja editado ou desativado.

`ShippingOption` usa provider `mock` ou marcador futuro `correios_future`, sem
integração real com Correios nesta fase. `PaymentSession` aceita somente
provider `mock` e rejeita dados de cartão no payload.

## UI Base e Assets

- A UI base mobile-first está em `src/components/ui/` e `src/components/layout/`.
- Tokens simples de cor, raio, sombra e tamanho de toque ficam em
  `src/components/ui/tokens.ts` e são refletidos em `src/app/globals.css`.
- O layout base usa `AppShell`, `Header`, `Footer` e `MobileNav`.
- A logo oficial foi copiada de `Imagens/logo_identidade.jpeg` para
  `public/brand/logo-identidade.jpeg`, sem alterar o arquivo original.
- O visual deve permanecer simples, leve e prático, com foco visível, contraste
  adequado e navegação mobile por teclado.
- Componentes de UI não carregam regras de negócio; eles recebem texto, estado e
  callbacks por props.

## Home, Configuração da Loja e SEO

- A home pública fica em `src/app/(store)/page.tsx` e compõe
  `src/features/home/HomePage.tsx`.
- Configurações de marca, WhatsApp e redes sociais ficam em
  `src/lib/config/store.ts`.
- URLs públicas de Instagram e TikTok passam por validação HTTPS antes de serem
  expostas na interface.
- Enquanto o número oficial de WhatsApp e links oficiais não forem informados, a
  home usa placeholders textuais e não publica links falsos.
- Os metadados da home e Open Graph ficam em `src/lib/seo/metadata.ts` e são
  aplicados por `src/app/layout.tsx`.
- `src/app/robots.ts` e `src/app/sitemap.ts` entregam a base de indexação do
  domínio `https://raiodesolatelie.com.br`.
- A logo oficial em `public/brand/logo-identidade.jpeg` é usada como asset de
  marca e imagem Open Graph base.

## Catálogo, Busca e Filtros

- A rota pública do catálogo fica em `src/app/(store)/catalog/page.tsx`.
- `src/services/firebase/product-catalog.ts` concentra a leitura e a aplicação
  de filtros, com dependências injetáveis para mock local ou leitura por
  Firestore.
- `src/services/firebase/catalog-mock-data.ts` mantém os produtos e categorias
  temporários usados em desenvolvimento e testes.
- `src/domain/product/search.ts` centraliza normalização de consulta,
  construção de `searchIndex` e correspondência por termos.
- `src/features/catalog/` separa a UI de filtros e listagem da camada de
  serviço.
- `src/components/product/ProductCard.tsx` exibe resumo do item e linka para a
  estrutura futura de detalhe sem depender de carrinho ou checkout.
- O catálogo atual usa query params `q`, `category`, `minPrice`, `maxPrice` e
  `availability`.
- O fluxo desta fase usa formulário GET mobile-first com aplicação explícita de
  filtros para reduzir estados inconsistentes no navegador móvel.

## Serviços Isolados

- `ProductCatalogService`: busca, filtros e leitura pública de produtos ativos.
- `CartService`: regras locais de carrinho sem dados pessoais.
- `WhatsAppService`: geração de mensagem e link.
- `ShippingService`: retirada local e frete mockado até existir provider real.
- `PaymentService`: Pix/cartão mockados por contrato abstrato.
- `OrderService`: criação e leitura autorizada de pedidos.
- `CouponService`: validação e aplicação de cupom.
- `ReviewService`: criação, sanitização e moderação.
- `AdminProductService`: CRUD administrativo de produtos.

## Decisões Arquiteturais

- UI não chama APIs externas de pagamento/frete diretamente.
- Operações sensíveis ficam em Server Actions ou Route Handlers.
- Firebase client SDK fica limitado ao que pode ser público.
- Firebase Admin SDK e secrets ficam somente no servidor.
- Regras de negócio não devem viver dentro de componentes visuais.
- Firebase Storage só será usado se a decisão do MVP confirmar necessidade.

## Qualidade

Toda feature deve seguir TDD, atualizar README/docs e passar pelos checks
disponíveis antes de ser considerada concluída.
