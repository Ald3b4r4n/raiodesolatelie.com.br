# Contract: Rota Publica `/novidades`

## Route

`GET /novidades`

## Access

- Publica.
- Nao exige login.
- Nao coleta dados pessoais.

## Expected UI Contract

- Exibe `h1` unico com tema de lancamentos/pecas recentes.
- Exibe descricao curta em portugues do Brasil.
- Exibe CTA para `/catalog`.
- Exibe CTA para `/atendimento` e/ou WhatsApp configurado.
- Exibe lista ou carrossel de produtos ativos elegiveis.
- Exibe estado vazio quando nao houver produtos ativos elegiveis.

## Product Card Contract

Cada produto exibido deve conter:

- imagem ou fallback acessivel;
- nome;
- preco;
- disponibilidade/categoria quando disponivel no card existente;
- link para detalhes do produto quando houver slug valido;
- acao de WhatsApp quando o componente de card suportar.

## Metadata Contract

A rota deve definir:

- `title` especifico para novidades;
- `description` curta e indexavel;
- Open Graph coerente com a pagina;
- URL canonica/friendly quando helper de SEO estiver disponivel.

## Error and Empty Contract

- Sem produtos: mostrar mensagem amigavel e CTAs para catalogo e WhatsApp.
- Falha futura de service: mostrar erro seguro ou fallback, sem stack trace e sem detalhes internos.
- WhatsApp indisponivel por configuracao: documentar fallback e evitar link quebrado.

## Accessibility Contract

- Semantica com regioes nomeadas quando houver carrossel.
- Foco visivel em todos os links/botoes.
- Controles do carrossel acessiveis por teclado.
- Movimento reduzido respeitado.
- Contraste suficiente e textos sem sobreposicao em mobile.
