# Data Model: MVP Inicial Raio de Sol Ateliê

**Feature**: `001-mvp-ecommerce`
**Date**: 2026-04-30

## Principles

- Coletar o mínimo de dados pessoais necessário para pedido, entrega, pagamento
  e contato.
- Preservar snapshot de itens em pedidos para manter histórico mesmo que produto
  seja editado/desativado.
- Separar leitura pública de catálogo das escritas admin.
- Não armazenar dados sensíveis de cartão.
- Preferir status explícitos em vez de booleanos ambíguos.

## Collections

### `products`

Produto próprio vendido ou divulgado.

**Required fields**

- `id`: identificador.
- `slug`: URL amigável única.
- `name`: nome público.
- `description`: descrição pública.
- `basePrice`: preço base em centavos.
- `categoryId`: referência a `categories`.
- `status`: `active` | `inactive` | `draft`.
- `availability`: `available` | `unavailable` | `made_to_order`.
- `salesMode`: `ready_to_ship` | `whatsapp_order` | `both`.
- `createdAt`: data de criação.
- `updatedAt`: data de atualização.

**Optional fields**

- `imageUrls`: lista de URLs de fotos.
- `featured`: destaque na home.
- `seoTitle`: título SEO customizado.
- `seoDescription`: descrição SEO customizada.
- `sortOrder`: ordem manual.

**Relationships**

- Tem muitas `ProductVariant`.
- Tem muitas `Review`.
- Pertence a uma `Category`.

**Access**

- Público pode ler somente produtos `active`.
- Admin pode criar, editar, desativar e ler todos.
- Escrita pública é proibida.

**Indexes likely needed**

- `status + categoryId + availability`.
- `status + featured + sortOrder`.
- `status + basePrice`.
- `slug`.

### `productVariants`

Variação de produto por tamanho, cor ou combinação.

**Required fields**

- `id`: identificador.
- `productId`: referência ao produto.
- `size`: tamanho ou `null` quando não aplicável.
- `color`: cor ou `null` quando não aplicável.
- `status`: `active` | `inactive`.
- `availability`: `available` | `unavailable`.
- `createdAt`.
- `updatedAt`.

**Optional fields**

- `priceOverride`: preço em centavos quando diferente do produto.
- `stockQuantity`: quantidade, se controle simples for usado.
- `sku`: código interno opcional.

**Access**

- Público lê variações ativas de produtos ativos.
- Admin gerencia.

**Indexes likely needed**

- `productId + status`.
- `productId + availability`.

### `categories`

Categoria de navegação.

**Required fields**

- `id`.
- `slug`.
- `name`.
- `status`: `active` | `inactive`.
- `sortOrder`.

**Initial values**

- `pronta-entrega`.
- `encomenda-via-whatsapp`.

**Access**

- Público lê ativas.
- Admin gerencia se necessário.

### `orders`

Pedido criado no checkout.

**Required fields**

- `id`.
- `orderNumber`: número amigável.
- `customerId`: auth uid ou `null` quando checkout convidado for permitido.
- `customerSnapshot`: dados mínimos de contato.
- `items`: snapshots de itens.
- `subtotal`: centavos.
- `discountTotal`: centavos.
- `shippingTotal`: centavos.
- `total`: centavos.
- `deliveryMethod`: `local_pickup` | `shipping`.
- `paymentMethod`: `pix` | `card`.
- `paymentStatus`: `pending` | `mock_approved` | `approved` | `failed` | `cancelled`.
- `orderStatus`: `draft` | `placed` | `confirmed` | `preparing` | `ready` | `shipped` | `completed` | `cancelled`.
- `createdAt`.
- `updatedAt`.

**Optional fields**

- `shippingAddress`: somente quando `deliveryMethod = shipping`.
- `shippingOptionSnapshot`.
- `couponSnapshot`.
- `notes`: observação operacional.
- `paymentSessionId`.

**Item snapshot fields**

- `productId`.
- `productName`.
- `productSlug`.
- `variantId`.
- `size`.
- `color`.
- `unitPrice`.
- `quantity`.
- `lineTotal`.

**Customer snapshot minimal fields**

- `name`.
- `email` ou `phone`, conforme fluxo.
- `phone` quando necessário para contato.

**Access**

- Cliente autenticada lê apenas seus pedidos.
- Admin lê e atualiza status de pedidos.
- Criação de pedido ocorre por backend validado.
- Escrita direta pública no Firestore é proibida.

**Indexes likely needed**

- `customerId + createdAt`.
- `orderStatus + createdAt`.
- `paymentStatus + createdAt`.

### `customerProfiles`

Perfil mínimo da cliente.

**Required fields**

- `uid`: mesmo id do Firebase Auth.
- `createdAt`.
- `updatedAt`.

**Optional fields**

- `displayName`.
- `email`.
- `phone`.
- `defaultPickupPreference`.

**Data minimization**

- Endereço não deve ser mantido no perfil por padrão no MVP.
- Endereço deve ficar no pedido quando necessário para entrega.

**Access**

- Cliente lê/edita seu próprio perfil mínimo.
- Admin lê dados mínimos necessários para atendimento de pedidos.

### `userRoles` ou custom claims

Controle de permissão.

**Preferred model**

- `admin` definido por custom claim.
- `customer` é usuário autenticado sem claim admin.

**Fallback controlled document**

- `userRoles/{uid}` com `role = admin | customer`, legível apenas por backend/admin
  se necessário para bootstrap.

**Access**

- Usuário comum não pode editar seu role.
- Processo do primeiro admin deve ser documentado e restrito.

### `coupons`

Cupom de desconto.

**Required fields**

- `id`.
- `code`: normalizado e único.
- `discountType`: `percentage` | `fixed_amount`.
- `discountValue`.
- `status`: `active` | `inactive`.
- `validFrom`.
- `validUntil`.
- `createdAt`.
- `updatedAt`.

**Optional fields**

- `minimumSubtotal`.
- `maxUses`.
- `usedCount`.
- `description`.

**Access**

- Backend valida aplicação.
- Admin gerencia.
- Público não deve conseguir listar regras internas sensíveis.

**Indexes likely needed**

- `code + status`.
- `status + validUntil`.

### `reviews`

Avaliação de produto.

**Required fields**

- `id`.
- `productId`.
- `rating`: 1 a 5.
- `status`: `pending` | `approved` | `rejected`.
- `createdAt`.
- `updatedAt`.

**Optional fields**

- `comment`.
- `customerId`.
- `authorNameSnapshot`.
- `moderationReason`.

**Access**

- Público lê apenas `approved`.
- Cliente autenticada pode criar avaliação pendente.
- Admin modera.

**Indexes likely needed**

- `productId + status + createdAt`.
- `status + createdAt`.

### `paymentSessions`

Sessão abstrata de pagamento.

**Required fields**

- `id`.
- `orderId`.
- `method`: `pix` | `card`.
- `amount`.
- `status`: `created` | `mock_approved` | `approved` | `failed` | `cancelled`.
- `provider`: `mock` ou provider futuro.
- `createdAt`.
- `updatedAt`.

**Optional fields**

- `providerReference`.
- `expiresAt`.
- `failureReason`.

**Restrictions**

- Não armazenar dados de cartão.
- Cliente acessa apenas sessão vinculada ao seu pedido, se necessário.
- Admin pode ler status para atendimento.

### `shippingOptions`

Opção de entrega/retirada calculada.

**Required fields**

- `id`.
- `type`: `local_pickup` | `shipping`.
- `label`.
- `price`.
- `available`.

**Optional fields**

- `estimatedDays`.
- `postalCode`.
- `provider`: `mock` | `correios_future`.
- `reasonUnavailable`.

**Usage**

- Pode ser persistida como snapshot dentro do pedido em vez de coleção pública.
- Configurações globais de retirada local devem ficar em documento admin/config.

## Validation Rules

- Preços e valores monetários devem ser inteiros em centavos e nunca negativos.
- Quantidade deve ser inteiro positivo.
- Produto comprado deve estar ativo e disponível no momento do checkout.
- Variação deve pertencer ao produto e estar ativa/disponível.
- Cupom deve estar ativo, dentro da validade e compatível com subtotal.
- Avaliação deve ter rating entre 1 e 5 e comentário opcional sanitizado.
- Endereço é obrigatório somente para entrega.
- Retirada local não deve exigir endereço completo.

## State Transitions

### Order

```text
draft -> placed -> confirmed -> preparing -> ready -> completed
placed -> cancelled
confirmed -> cancelled
preparing -> cancelled
ready -> shipped -> completed
```

### PaymentSession

```text
created -> mock_approved
created -> approved
created -> failed
created -> cancelled
```

### Review

```text
pending -> approved
pending -> rejected
approved -> rejected
rejected -> approved
```

## Privacy Notes

- Não coletar CPF/CNPJ no MVP salvo decisão explícita posterior.
- Não salvar dados de cartão.
- Evitar endereço salvo em perfil; armazenar no pedido apenas quando entrega exigir.
- Comentários de avaliações não devem permitir dados pessoais sensíveis sem moderação.
- Retenção de pedidos deve ser documentada por necessidade operacional/legal.
