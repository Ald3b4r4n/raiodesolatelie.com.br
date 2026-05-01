# Firebase

## Estado Atual

Na Fase 3, o Firebase foi configurado para desenvolvimento local e testes com
projeto demo:

- `.firebaserc` apontando para `demo-raiodesolatelie`;
- `firebase.json` com emuladores de Auth, Firestore, Storage e UI;
- `firebase/firestore.rules` com regras mínimas de catálogo, pedidos, perfis,
  sessões de pagamento, cupons, avaliações e admin;
- `firebase/storage.rules` com deny-all porque Storage não está ativo no MVP
  inicial;
- `firebase/firestore.indexes.json` com índices iniciais;
- `tests/integration/rules/` com testes de Security Rules.

Nenhum projeto Firebase real foi selecionado nesta fase. O projeto demo evita
uso acidental de serviços reais durante testes locais.

## Componentes Planejados

- Firebase Authentication para login de cliente e admin.
- Cloud Firestore como banco principal.
- Firebase Security Rules versionadas e testadas.
- Firebase Emulator Suite para testes locais.
- Firebase Storage somente se a decisão do MVP confirmar necessidade.

## Configuração por CLI

Fluxo local:

```bash
pnpm install
pnpm firebase:emulators
pnpm test:rules
```

Para vincular um projeto real em fase futura:

```bash
firebase login
firebase use --add
firebase init
```

Antes de trocar o projeto demo, documentar o motivo, revisar rules e confirmar
que nenhum dado real será usado em testes.

Arquivos versionados:

- `.firebaserc`
- `firebase.json`
- `firebase/firestore.rules`
- `firebase/firestore.indexes.json`
- `firebase/storage.rules`

Qualquer passo no Console Web precisa ser documentado com motivo e instrução
exata.

## Emuladores

Emuladores planejados:

- Auth
- Firestore
- Storage se Storage for habilitado ou se rules deny-all forem testadas
- Functions somente se uma fase futura exigir

Fluxo validado:

```bash
pnpm test:rules
```

Observação: `firebase-tools@14.24.0` foi fixado como dependência de
desenvolvimento porque a versão 15 exige Java 21. O ambiente atual usa Java 17.

## Coleções Planejadas

- `products`
- `productVariants`
- `categories`
- `orders`
- `customerProfiles`
- `userRoles` ou custom claims
- `coupons`
- `reviews`
- `paymentSessions`

Pedidos devem ser criados por backend validado e guardar snapshots de itens.

## Storage Condicional

Storage não é obrigatório por padrão. A decisão documentada em
`docs/decisions/0004-firebase-storage-decision.md` deve ser confirmada antes de
qualquer rule ou upload.

Se Storage for usado:

- upload apenas por admin autenticado/autorizado;
- path permitido;
- content-type de imagem permitido;
- tamanho máximo validado;
- escrita bloqueada para public/customer;
- testes de rules para permitido e bloqueado.

Se Storage não for usado:

- rules deny-all para leitura e escrita;
- alternativa temporária ou fase futura documentada;
- testes confirmando bloqueio total.

## Primeiro Admin

Preferência: custom claim aplicada por procedimento seguro com Firebase Admin
SDK em ambiente controlado. Não deve existir endpoint público permanente para
promover admin.

## Índices Iniciais Prováveis

- `products`: `status + categoryId + availability`
- `products`: `status + featured + sortOrder`
- `products`: `status + basePrice`
- `productVariants`: `productId + status`
- `orders`: `customerId + createdAt`
- `orders`: `status + createdAt`
- `coupons`: `code + status`
- `reviews`: `productId + status + createdAt`

## Regras Implementadas na Fase 3

- Produtos, categorias e variações ativas podem ser lidos publicamente.
- Escrita em catálogo é permitida somente para `admin`.
- Clientes autenticadas leem apenas os próprios pedidos.
- Escrita direta de pedidos pelo cliente fica bloqueada; criação/alteração deve
  passar por backend com Admin SDK em fase futura.
- Perfis mínimos podem ser lidos/criados/atualizados pela própria cliente ou
  admin.
- Sessões de pagamento são somente leitura segura para dono/admin; escrita
  direta fica bloqueada.
- Cupons são gerenciados por admin.
- Avaliações aprovadas são públicas; avaliações pendentes podem ser lidas pela
  própria cliente ou admin; aprovação/rejeição é admin.
- `userRoles` fica bloqueado para cliente SDK.
