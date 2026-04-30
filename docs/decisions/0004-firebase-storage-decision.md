# ADR 0004: Firebase Storage Condicional

**Status**: Decisao condicional, a confirmar na fase Firebase
**Data**: 2026-04-30

## Contexto

O admin precisa cadastrar fotos de produtos, mas o MVP ainda nao definiu se as
imagens serao armazenadas no Firebase Storage, em URLs externas controladas ou
por outra alternativa temporaria.

## Decisao

Firebase Storage nao fica automaticamente habilitado. Antes de criar rules ou
upload, a task decisoria da fase Firebase deve confirmar uma das opcoes:

1. Habilitar Storage para imagens de produtos no MVP.
2. Manter Storage com deny-all e documentar alternativa temporaria ou fase
   futura.

Decisao inicial para Fase 0: tratar Storage como condicional e nao configurar
upload ainda.

## Alternativas Consideradas

- Habilitar Storage desde o inicio: pode ser correto, mas exige rules, testes,
  limites de tipo/tamanho e fluxo admin antes de haver necessidade confirmada.
- Usar URLs externas temporarias: reduz setup inicial, mas exige cuidado com
  disponibilidade e origem confiavel.
- Adiar fotos: nao atende bem catalogo/e-commerce, mas pode ser fallback se nao
  houver imagens.

## Consequencias

Se Storage for habilitado:

- upload apenas por admin autenticado/autorizado;
- validar path permitido;
- validar content-type;
- validar tamanho maximo;
- negar escrita para clientes comuns e publico;
- testar upload permitido e bloqueios.

Se Storage nao for habilitado:

- rules deny-all para leitura e escrita;
- testes confirmando bloqueio total;
- documentar alternativa temporaria e criterio para habilitar depois.
