# Data Model: Revisao e Melhorias da Pagina de Novidades

## NovidadesPageContent

- `title`: texto principal da pagina.
- `description`: resumo curto da proposta da pagina.
- `primaryCta`: link para catalogo completo.
- `supportCta`: link para atendimento/WhatsApp.
- `products`: lista de `NovidadeProductSummary`.
- `emptyState`: conteudo exibido quando nao houver produtos elegiveis.

**Validation Rules**

- Textos visiveis devem estar em portugues do Brasil e sem caracteres corrompidos.
- CTAs devem apontar para rotas internas validas ou URL configurada segura.
- A pagina nao deve exigir autenticacao nem coletar dados pessoais.

## NovidadeProductSummary

- `id`: identificador unico do produto.
- `slug`: slug publico para detalhes.
- `name`: nome do produto.
- `price`: preco exibivel.
- `image`: imagem principal ou fallback.
- `category`: categoria comercial.
- `availability`: disponibilidade para pronta entrega ou encomenda.
- `status`: apenas `active` deve aparecer.
- `isNew` ou `publishedAt`: campo futuro para curadoria real de novidades.

**Validation Rules**

- Produtos sem `status = active` nao aparecem.
- Produtos sem imagem devem usar fallback acessivel.
- Produtos sem slug valido nao devem gerar link quebrado.
- Ordenacao inicial pode usar ordem do catalogo mockado; migracao futura deve documentar criterio temporal ou editorial.

## NovidadesEmptyState

- `message`: mensagem curta informando ausencia de novidades.
- `catalogHref`: rota para catalogo.
- `whatsappHref`: URL configurada do WhatsApp.

**Validation Rules**

- Deve manter alternativa acionavel sem exigir login.
- Deve evitar prometer disponibilidade que nao existe.

## Privacy

Nenhum dado pessoal novo e coletado. Cliques em links internos seguem navegacao normal; WhatsApp abre canal externo configurado.
