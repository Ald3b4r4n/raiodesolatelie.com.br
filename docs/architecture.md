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
