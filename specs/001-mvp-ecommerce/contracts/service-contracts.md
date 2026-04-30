# Service Contracts: MVP Inicial Raio de Sol Ateliê

**Feature**: `001-mvp-ecommerce`
**Purpose**: documentar fronteiras de serviços antes da implementação.

## Contract Principles

- UI não chama APIs externas de pagamento/frete diretamente.
- Serviços recebem dados validados ou validam novamente na fronteira server-side.
- Serviços retornam erros tipados e mensagens seguras para a UI.
- Mocks devem seguir o mesmo contrato dos providers futuros.
- Nenhum contrato de pagamento aceita ou retorna dados sensíveis de cartão.

## Product Catalog Service

**Responsibilities**

- Listar produtos ativos.
- Buscar por nome normalizado.
- Filtrar por categoria, preço e disponibilidade.
- Obter produto por slug.
- Validar produto e variação antes de carrinho/checkout.

**Inputs**

- `query`: texto opcional.
- `categorySlug`: opcional.
- `priceMin`, `priceMax`: opcionais em centavos.
- `availability`: opcional.
- `slug`: obrigatório para detalhe.

**Outputs**

- Lista de produtos públicos.
- Produto detalhado com variações ativas.
- Erro `not_found` ou `unavailable` quando aplicável.

## Cart Domain Service

**Responsibilities**

- Adicionar item com variação válida.
- Remover item.
- Alterar quantidade.
- Recalcular subtotal.
- Invalidar itens que não existem mais ou ficaram indisponíveis.
- Aplicar cupom validado.

**Storage**

- Persistência local no navegador.
- Nenhum dado pessoal no carrinho local.

## WhatsApp Service

**Responsibilities**

- Gerar mensagem para produto.
- Gerar mensagem para carrinho.
- Incluir nome, variações, quantidade, subtotal/valor e contexto de encomenda.
- Gerar link compatível com app mobile e WhatsApp Web.

**Inputs**

- Número da loja em configuração segura.
- Produto ou itens do carrinho.
- Origem da mensagem: `product` | `cart` | `checkout`.

**Outputs**

- `message`: texto em PT-BR.
- `url`: link final.
- Erro `missing_store_phone` se número não estiver configurado.

## Shipping Service

**Responsibilities**

- Retornar retirada local.
- Calcular frete mockado para entrega enquanto Correios não estiver definido.
- Preservar interface para provider futuro.

**Inputs**

- Itens do carrinho.
- CEP e endereço mínimo quando entrega.
- Tipo de entrega desejado.

**Outputs**

- Lista de `ShippingOption`.
- Erro seguro quando frete indisponível.

**Mock rules**

- Retirada local sempre disponível quando habilitada em configuração.
- Frete mockado deve ser explícito em ambiente de desenvolvimento/preview.
- Produção não deve prometer frete real sem provider configurado.

## Payment Service

**Responsibilities**

- Criar sessão de pagamento Pix ou cartão.
- Retornar status rastreável.
- Permitir mock/test double no MVP.
- Preparar troca por provider real.

**Inputs**

- `orderId`.
- `amount`.
- `method`: `pix` | `card`.
- Dados mínimos de contexto do pedido.

**Outputs**

- `paymentSessionId`.
- `status`: `created` | `mock_approved` | `approved` | `failed` | `cancelled`.
- `expiresAt` quando aplicável.
- Nenhum dado sensível de cartão.

## Order Service

**Responsibilities**

- Validar itens, variações, valores, cupom e entrega no servidor.
- Criar pedido com snapshot.
- Associar pedido à cliente autenticada quando houver login.
- Permitir leitura por cliente dona do pedido e admin.
- Permitir atualização de status por admin.

**Inputs**

- Itens do carrinho.
- Dados mínimos da cliente.
- Método de entrega.
- Método de pagamento.
- Cupom opcional.

**Outputs**

- `orderId`.
- `orderNumber`.
- `orderStatus`.
- `paymentStatus`.
- Confirmação com próximos passos.

## Coupon Service

**Responsibilities**

- Validar código.
- Verificar ativo/inativo, validade, subtotal mínimo e limite de uso quando houver.
- Calcular desconto.
- Retornar motivo seguro de rejeição.

## Review Service

**Responsibilities**

- Criar avaliação pendente.
- Sanitizar comentário.
- Listar avaliações aprovadas.
- Permitir moderação por admin.

**Rules**

- Comentário é opcional.
- Nota é obrigatória entre 1 e 5.
- Avaliações públicas devem estar aprovadas.

## Admin Product Service

**Responsibilities**

- Criar, editar, desativar produtos.
- Gerenciar variações e disponibilidade.
- Associar fotos.
- Preservar histórico de pedidos.

**Authorization**

- Somente admin.
- Toda operação validada server-side e por Firebase rules.
