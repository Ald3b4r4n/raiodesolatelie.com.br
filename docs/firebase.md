# Firebase

## Estado Atual

Firebase ainda não foi inicializado por CLI. Na Fase 1 foram criados
placeholders seguros e, na Fase 2, foi adicionado `firebase.json` apenas para
configuração local de emuladores de teste:

- `firebase/firestore.rules` com deny-all;
- `firebase/storage.rules` com deny-all;
- `firebase/firestore.indexes.json` vazio;
- `firebase/seed/`.
- `firebase.json` com emuladores de Auth, Firestore, Storage e UI.

Ainda não existe `.firebaserc` e nenhum projeto Firebase foi selecionado.

## Componentes Planejados

- Firebase Authentication para login de cliente e admin.
- Cloud Firestore como banco principal.
- Firebase Security Rules versionadas e testadas.
- Firebase Emulator Suite para testes locais.
- Firebase Storage somente se a decisão do MVP confirmar necessidade.

## Configuracao por CLI

Fluxo planejado:

```bash
firebase login
firebase use --add
firebase init
firebase emulators:start
pnpm firebase:emulators
```

Arquivos esperados após configuração:

- `.firebaserc`
- `firebase.json`
- `firebase/firestore.rules`
- `firebase/firestore.indexes.json`
- `firebase/storage.rules`

Qualquer passo no Console Web precisa ser documentado com motivo e instrucao
exata.

## Emuladores

Emuladores planejados:

- Auth
- Firestore
- Storage se Storage for habilitado ou se rules deny-all forem testadas
- Functions somente se uma fase futura exigir

Fluxo planejado:

```bash
firebase emulators:exec "pnpm test:rules && pnpm test:integration"
```

## Colecoes Planejadas

- `products`
- `productVariants`
- `catégories`
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
- tamanho maximo validado;
- escrita bloqueada para public/customer;
- testes de rules para permitido e bloqueado.

Se Storage não for usado:

- rules deny-all para leitura e escrita;
- alternativa temporaria ou fase futura documentada;
- testes confirmando bloqueio total.

## Primeiro Admin

Preferencia: custom claim aplicada por procedimento seguro com Firebase Admin
SDK em ambiente controlado. Não deve existir endpoint público permanente para
promover admin.

## Indices Iniciais Provaveis

- `products`: `status + catégoryId + availability`
- `products`: `status + featured + sortOrder`
- `products`: `status + basePrice`
- `productVariants`: `productId + status`
- `orders`: `customerId + creatédAt`
- `orders`: `orderStatus + creatédAt`
- `coupons`: `code + status`
- `reviews`: `productId + status + creatédAt`
