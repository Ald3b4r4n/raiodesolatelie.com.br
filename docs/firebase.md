# Firebase

## Estado Atual

Firebase ainda nao foi configurado por CLI. Na Fase 1 foram criados apenas
placeholders seguros:

- `firebase/firestore.rules` com deny-all;
- `firebase/storage.rules` com deny-all;
- `firebase/firestore.indexes.json` vazio;
- `firebase/seed/`.

Ainda nao existem `.firebaserc`, `firebase.json`, emuladores ou projeto
selecionado.

## Componentes Planejados

- Firebase Authentication para login de cliente e admin.
- Cloud Firestore como banco principal.
- Firebase Security Rules versionadas e testadas.
- Firebase Emulator Suite para testes locais.
- Firebase Storage somente se a decisao do MVP confirmar necessidade.

## Configuracao por CLI

Fluxo planejado:

```bash
firebase login
firebase use --add
firebase init
firebase emulators:start
```

Arquivos esperados apos configuracao:

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
- `categories`
- `orders`
- `customerProfiles`
- `userRoles` ou custom claims
- `coupons`
- `reviews`
- `paymentSessions`

Pedidos devem ser criados por backend validado e guardar snapshots de itens.

## Storage Condicional

Storage nao e obrigatorio por padrao. A decisao documentada em
`docs/decisions/0004-firebase-storage-decision.md` deve ser confirmada antes de
qualquer rule ou upload.

Se Storage for usado:

- upload apenas por admin autenticado/autorizado;
- path permitido;
- content-type de imagem permitido;
- tamanho maximo validado;
- escrita bloqueada para public/customer;
- testes de rules para permitido e bloqueado.

Se Storage nao for usado:

- rules deny-all para leitura e escrita;
- alternativa temporaria ou fase futura documentada;
- testes confirmando bloqueio total.

## Primeiro Admin

Preferencia: custom claim aplicada por procedimento seguro com Firebase Admin
SDK em ambiente controlado. Nao deve existir endpoint publico permanente para
promover admin.

## Indices Iniciais Provaveis

- `products`: `status + categoryId + availability`
- `products`: `status + featured + sortOrder`
- `products`: `status + basePrice`
- `productVariants`: `productId + status`
- `orders`: `customerId + createdAt`
- `orders`: `orderStatus + createdAt`
- `coupons`: `code + status`
- `reviews`: `productId + status + createdAt`
