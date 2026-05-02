# Security Rules Contract: MVP Inicial Ateliê Raios de Sol

**Feature**: `001-mvp-ecommerce`
**Purpose**: definir comportamento esperado para Firebase Security Rules.

## Roles

- **public**: visitante sem autenticação.
- **customer**: usuário autenticado sem permissão admin.
- **admin**: usuário autenticado com claim/admin role validado.
- **server**: operações via backend/admin SDK quando necessário.

## Access Matrix

| Resource | Public | Customer | Admin | Server |
|----------|--------|----------|-------|--------|
| Active products | Read | Read | Read/write | Read/write |
| Draft/inactive products | No access | No access | Read/write | Read/write |
| Active categories | Read | Read | Read/write | Read/write |
| Product variants of active products | Read | Read | Read/write | Read/write |
| Orders | No access | Read own | Read/update | Create/update |
| Customer profiles | No access | Read/write own minimal profile | Read needed fields | Read/write |
| User roles | No access | No access | Read limited/admin process | Read/write restricted |
| Coupons | No listing of sensitive rules | Apply through backend | Read/write | Read/write |
| Reviews approved | Read | Read | Read/write | Read/write |
| Reviews pending/rejected | No access | Read own if applicable | Read/write | Read/write |
| Payment sessions | No access | Read own safe status | Read status | Read/write |
| Storage product images | Conditional: read public product images only if Storage is enabled for MVP | Conditional: read public product images only if Storage is enabled for MVP | Conditional: upload/manage only if Storage is enabled for MVP | Conditional: manage only if Storage is enabled for MVP |

## Conditional Storage Contract

Firebase Storage MUST NOT be treated as automatically enabled. The implementation
must follow the explicit MVP decision recorded before Storage rules work starts.

If Firebase Storage is enabled for product images in the MVP:

- Product image reads may be public only for approved product image paths.
- Upload/write/delete must require authenticated and authorized admin access.
- Rules must validate allowed path patterns.
- Rules must validate accepted image content types.
- Rules must validate maximum file size.
- Customer and public writes must be denied.
- Rule tests must cover allowed admin upload and blocked public/customer upload.
- Rule tests must cover invalid path, content-type and size rejection.

If Firebase Storage is not enabled for product images in the MVP:

- Storage rules must use deny-all for reads and writes.
- Product images must use a documented temporary alternative or be deferred to a
  future phase.
- Rule tests must confirm deny-all behavior for public, customer and admin
  client SDK access.
- Documentation must state why Storage is disabled and what will enable it later.

## Required Rule Tests

- Visitante consegue ler produto ativo.
- Visitante não consegue ler produto rascunho/inativo.
- Visitante não consegue criar/editar produto.
- Cliente não consegue criar/editar produto.
- Admin consegue criar/editar/desativar produto.
- Cliente consegue ler apenas seus próprios pedidos.
- Cliente não consegue ler pedido de outra cliente.
- Visitante não consegue ler pedidos.
- Admin consegue ler pedidos.
- Escrita direta de pedido pelo cliente é bloqueada quando bypassar backend.
- Cliente consegue criar avaliação pendente somente com campos permitidos.
- Público lê somente avaliações aprovadas.
- Admin consegue aprovar/rejeitar avaliação.
- Cupom não pode ser alterado por cliente.
- Quando Storage estiver ativo, upload de imagem de produto exige admin.
- Quando Storage estiver ativo, upload rejeita tipo/tamanho/path inválido.
- Quando Storage não estiver ativo, Storage Rules aplicam deny-all e testes confirmam bloqueio total.

## Admin Bootstrap Contract

- Não deve existir endpoint público permanente para promover admin.
- Primeiro admin deve ser configurado por procedimento documentado.
- Preferir custom claims aplicadas por ambiente seguro.
- Qualquer fallback por documento deve ser restrito e removível após bootstrap.

## Data Validation Expectations

Rules não substituem validação server-side. Elas devem bloquear acessos e
formatos claramente inválidos, enquanto schemas server-side validam regras de
negócio completas.

## Secrets Contract

- Chaves públicas Firebase podem usar prefixo público quando apropriado.
- Service account, tokens, webhooks e secrets de providers ficam somente em
  ambiente seguro.
- Nenhuma secret deve aparecer em bundle frontend, README sem redaction ou logs.
