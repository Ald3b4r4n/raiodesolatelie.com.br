# ADR 0002: Auth, Roles e Primeiro Admin

**Status**: Aceita como direção inicial
**Data**: 2026-04-30

## Contexto

O MVP precisa separar cliente comum e administradora. A administradora deve
cadastrar produtos e visualizar pedidos. Clientes devem acessar apenas seus
próprios dados quando autenticadas.

## Decisão

Usar Firebase Authentication para login. Preferir roles por custom claims para
`admin`; usuários autenticados sem claim admin são `customer`. O primeiro admin
deve ser criado por procedimento seguro e documentado, sem endpoint público
permanente.

## Alternativas Consideradas

- Documento `userRoles/{uid}` como fonte principal: simples, mas exige cuidado
  extra para impedir edição indevida.
- Endpoint público de promoção: rejeitado por risco de segurança.
- Auth externo: desnecessário para o MVP.

## Consequências

- Operações admin precisam validar claim/role no backend e nas rules.
- O processo do primeiro admin deve ser testável e auditável.
- Qualquer fallback por documento de role deve ser restrito e removível.
