# ADR 0004: Firebase Storage Condicional

**Status**: Aceita para o MVP inicial
**Data**: 2026-04-30

## Contexto

O admin precisa cadastrar fotos de produtos, mas o MVP ainda não definiu se as
imagens serão armazenadas no Firebase Storage, em URLs externas controladas ou
por outra alternativa temporária. A pasta local `Imagens/` contém assets da
marca, mas ela não exige ativação imediata de upload no Firebase Storage.

## Decisão

Firebase Storage não fica automaticamente habilitado. Na Fase 3, a decisão é
manter Storage com `deny-all` para leitura e escrita até existir necessidade
confirmada de upload de imagens pelo admin.

Imagens do produto serão tratadas em fase futura, usando alternativa
documentada ou ativando Storage com regras e testes específicos.

## Alternativas Consideradas

- Habilitar Storage desde o início: pode ser correto, mas exige rules, testes,
  limites de tipo/tamanho e fluxo admin antes de haver necessidade confirmada.
- Usar URLs externas temporárias: reduz setup inicial, mas exige cuidado com
  disponibilidade e origem confiável.
- Adiar fotos: não atende bem catálogo/e-commerce, mas pode ser fallback se não
  houver imagens.

## Consequências

Se Storage for habilitado em fase futura:

- upload apenas por admin autenticado/autorizado;
- validar path permitido;
- validar content-type;
- validar tamanho máximo;
- negar escrita para clientes comuns e público;
- testar upload permitido e bloqueios.

Para o MVP inicial:

- rules deny-all para leitura e escrita;
- testes confirmando bloqueio total;
- documentar alternativa temporária e critério para habilitar depois.
