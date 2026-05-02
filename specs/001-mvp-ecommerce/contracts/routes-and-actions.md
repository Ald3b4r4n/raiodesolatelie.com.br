# Routes and Actions Contract: MVP Inicial Ateliê Raios de Sol

**Feature**: `001-mvp-ecommerce`
**Purpose**: definir rotas, ações sensíveis e comportamento esperado.

## Public Store Routes

### `/`

- Exibe home com marca, chamada, destaques, catálogo, WhatsApp e redes sociais.
- Deve ter metadados e Open Graph.
- Não exige autenticação.

### `/catalog`

- Exibe catálogo com busca e filtros.
- Query params planejados: `q`, `category`, `minPrice`, `maxPrice`, `availability`.
- Não exige autenticação.

### `/products/[slug]`

- Exibe produto público ativo.
- Permite selecionar variações.
- Permite adicionar ao carrinho e chamar WhatsApp.
- Deve ter metadados por produto e estrutura para compartilhamento.

### `/cart`

- Exibe carrinho local.
- Permite alterar quantidade, remover item e aplicar cupom.
- Não deve conter dados pessoais persistidos além do navegador local.

### `/checkout`

- Revisa itens.
- Coleta dados mínimos.
- Seleciona retirada local ou entrega.
- Seleciona Pix ou cartão.
- Finaliza pedido por ação server-side.

## Auth Routes

### `/login`

- Permite autenticação de cliente/admin.
- Erros devem ser claros e não revelar detalhes sensíveis.

## Admin Routes

### `/admin`

- Dashboard simples.
- Somente admin.

### `/admin/products`

- Lista, cria, edita e desativa produtos.
- Somente admin.

### `/admin/orders`

- Lista pedidos e permite acompanhamento/status.
- Somente admin.

### `/admin/coupons`

- Gerencia cupons.
- Somente admin.

### `/admin/reviews`

- Modera avaliações.
- Somente admin.

## Server Actions / Route Handlers

### `createOrder`

**Input**

- Itens do carrinho.
- Dados mínimos da cliente.
- Entrega/retirada.
- Forma de pagamento.
- Cupom opcional.

**Validation**

- Schema server-side.
- Produto ativo.
- Variação válida.
- Preço recalculado no servidor.
- Cupom válido.
- Dados mínimos por tipo de entrega.

**Output**

- Pedido criado.
- Sessão de pagamento mockada/criada.
- Status inicial.

### `quoteShipping`

**Input**

- Itens.
- CEP/endereço mínimo quando entrega.
- Tipo de entrega.

**Output**

- Opções de frete/retirada.
- Erro seguro se indisponível.

### `applyCoupon`

**Input**

- Código.
- Subtotal e itens.

**Output**

- Desconto calculado ou motivo de rejeição.

### `createPaymentSession`

**Input**

- Pedido.
- Valor.
- Método Pix/cartão.

**Output**

- PaymentSession abstrata.
- Status seguro.

### `submitReview`

**Input**

- Produto.
- Nota.
- Comentário opcional.

**Output**

- Avaliação pendente.

### `adminCreateProduct`

**Authorization**

- Admin.

**Validation**

- Schema server-side.
- Nome, preço, categoria, status, disponibilidade e variações válidas.

### `adminUpdateProduct`

**Authorization**

- Admin.

**Behavior**

- Atualiza produto sem alterar snapshots de pedidos.
- Desativação preferida em vez de remoção física quando houver histórico.

### `adminUpdateOrderStatus`

**Authorization**

- Admin.

**Behavior**

- Atualiza status de pedido com transição válida.

### `adminModerateReview`

**Authorization**

- Admin.

**Behavior**

- Aprova ou rejeita avaliação.

## Error Contract

Erros expostos para UI devem seguir categorias:

- `validation_error`: dados inválidos, com mensagem compreensível.
- `unauthorized`: login necessário.
- `forbidden`: sem permissão.
- `not_found`: recurso inexistente ou indisponível.
- `conflict`: preço/variação/cupom mudou.
- `rate_limited`: tentativa excessiva.
- `service_unavailable`: falha temporária de frete/pagamento.

Mensagens devem ser em português do Brasil e não revelar detalhes internos.
