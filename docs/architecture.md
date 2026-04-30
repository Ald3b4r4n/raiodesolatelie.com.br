# Arquitetura

## Objetivo

Organizar o MVP do Raio de Sol Atelie como um e-commerce simples, mobile-first,
seguro e facil de evoluir, sem transformar o produto em marketplace
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
- `src/components`: componentes visuais pequenos e reutilizaveis.
- `src/features`: composicao por caso de uso, como catalogo, carrinho,
  checkout, admin e avaliacoes.
- `src/domain`: regras puras de negocio, tipos e transicoes de estado.
- `src/services`: fronteiras com Firebase, WhatsApp, pagamento, frete, cupons e
  avaliacoes.
- `src/lib`: infraestrutura compartilhada, env, seguranca, Firebase e SEO.
- `src/validators`: schemas de entrada e saida.
- `tests`: testes unitarios, integracao, E2E, acessibilidade e rules.
- `firebase`: configuracao reproduzivel por CLI, rules, indexes e seeds.
- `docs`: setup, seguranca, testes, Firebase, deploy, skills e ADRs.

## Fronteiras de Dominio

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

Pedidos devem guardar snapshot dos itens para preservar historico mesmo que um
produto seja editado ou desativado.

## Servicos Isolados

- `ProductCatalogService`: busca, filtros e leitura publica de produtos ativos.
- `CartService`: regras locais de carrinho sem dados pessoais.
- `WhatsAppService`: geracao de mensagem e link.
- `ShippingService`: retirada local e frete mockado ate provider real.
- `PaymentService`: Pix/cartao mockados por contrato abstrato.
- `OrderService`: criacao e leitura autorizada de pedidos.
- `CouponService`: validacao e aplicacao de cupom.
- `ReviewService`: criacao, sanitizacao e moderacao.
- `AdminProductService`: CRUD administrativo de produtos.

## Decisoes Arquiteturais

- UI nao chama APIs externas de pagamento/frete diretamente.
- Operacoes sensiveis ficam em Server Actions ou Route Handlers.
- Firebase client SDK fica limitado ao que pode ser publico.
- Firebase Admin SDK e secrets ficam somente no servidor.
- Regras de negocio nao devem viver dentro de componentes visuais.
- Firebase Storage so sera usado se a decisao do MVP confirmar necessidade.

## Qualidade

Toda feature deve seguir TDD, atualizar README/docs e passar pelos checks
disponiveis antes de ser considerada concluida.
