# ADR 0002: Auth, Roles e Primeiro Admin

**Status**: Aceita como direcao inicial
**Data**: 2026-04-30

## Contexto

O MVP precisa separar cliente comum e administradora. A administradora deve
cadastrar produtos e visualizar pedidos. Clientes devem acessar apenas seus
proprios dados quando autenticadas.

## Decisao

Usar Firebase Authentication para login. Preferir roles por custom claims para
`admin`; usuarios autenticados sem claim admin sao `customer`. O primeiro admin
deve ser criado por procedimento seguro e documentado, sem endpoint publico
permanente.

## Alternativas Consideradas

- Documento `userRoles/{uid}` como fonte principal: simples, mas exige cuidado
  extra para impedir edicao indevida.
- Endpoint publico de promocao: rejeitado por risco de seguranca.
- Auth externo: desnecessario para o MVP.

## Consequencias

- Operacoes admin precisam validar claim/role no backend e nas rules.
- O processo do primeiro admin deve ser testavel e auditavel.
- Qualquer fallback por documento de role deve ser restrito e removivel.
