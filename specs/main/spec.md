# Feature Specification: Revisao e Melhorias da Pagina de Novidades

**Feature Branch**: `main`
**Created**: 2026-05-02
**Status**: Draft
**Input**: User description: "planeje uma revisao e melhorias na pagina de novidades"

## Product Fit

- **Business Goal**: aumentar a descoberta de pecas recentes e conduzir a cliente para catalogo, produto ou WhatsApp com menos friccao.
- **Primary Audience**: clientes em celular buscando novidades do atelie, lancamentos e pecas prontas.
- **MVP Priority**: P1 para revisar conteudo, layout mobile, SEO, acessibilidade e origem dos produtos exibidos; P2 para filtros/curadoria editorial se necessario.
- **Scope Boundary**: a pagina continua sendo vitrine de produtos proprios. Nao inclui marketplace, blog completo ou area editorial complexa.
- **WhatsApp Role**: caminho claro para tirar duvidas sobre medidas, disponibilidade, encomendas e combinacoes.

## User Scenarios & Testing

### User Story 1 - Ver novidades recentes no celular (Priority: P1)

Como cliente em celular, quero abrir a pagina de novidades e entender rapidamente quais pecas sao recentes ou lancamentos, para decidir se vejo detalhes, catalogo completo ou falo no WhatsApp.

**Independent Test**: validar que `/novidades` exibe hero claro, lista/carrossel de produtos ativos recentes, CTAs para catalogo e WhatsApp, e nao quebra com poucos ou nenhum produto.

**Acceptance Scenarios**:

1. **Given** que existem produtos ativos recentes, **When** a cliente abre `/novidades`, **Then** ela ve titulo, descricao, produtos com foto/nome/preco/disponibilidade e acoes claras.
2. **Given** que a cliente toca em um produto, **When** a acao de detalhes e acionada, **Then** ela e levada a pagina do produto correspondente.
3. **Given** que a cliente quer ajuda, **When** toca no CTA de WhatsApp, **Then** o link configurado e aberto sem exigir cadastro.

### User Story 2 - Navegar sem quebra visual ou textual (Priority: P1)

Como cliente, quero ler a pagina com acentos corretos, textos simples e layout sem sobreposicao, para confiar no atelie e continuar navegando.

**Independent Test**: validar textos em portugues do Brasil, sem caracteres corrompidos, com contraste, foco visivel, HTML semantico e layout estavel em mobile e desktop.

**Acceptance Scenarios**:

1. **Given** que a pagina carrega, **When** os textos sao renderizados, **Then** acentos e cedilhas aparecem corretamente.
2. **Given** viewport mobile, **When** a cliente navega por teclado ou toque, **Then** CTAs, carrossel e cards permanecem acessiveis e sem elementos sobrepostos.
3. **Given** preferencia por reducao de movimento, **When** a pagina entra em viewport, **Then** animacoes nao criam movimento desnecessario.

### User Story 3 - Encontrar alternativas quando nao houver novidades (Priority: P1)

Como cliente, quero receber uma orientacao util quando nao houver lancamentos disponiveis, para ir ao catalogo ou falar com o atelie em vez de ver uma area vazia.

**Independent Test**: validar estado vazio e estado com poucos produtos, mantendo CTAs para catalogo e WhatsApp.

**Acceptance Scenarios**:

1. **Given** que nao existem produtos ativos para novidades, **When** a pagina abre, **Then** ela mostra mensagem simples e acoes para catalogo e WhatsApp.
2. **Given** que existem menos produtos que o esperado no carrossel, **When** a pagina renderiza, **Then** o layout continua estavel sem espacos estranhos.

## Functional Requirements

- **FR-001**: A pagina `/novidades` MUST ter metadados proprios, titulo claro, descricao curta e Open Graph adequado.
- **FR-002**: A pagina MUST exibir apenas produtos ativos e priorizar produtos recentes, destacados ou marcados como novidade quando esse dado existir.
- **FR-003**: A pagina MUST manter CTAs para catalogo completo, atendimento e WhatsApp.
- **FR-004**: A pagina MUST renderizar estado vazio quando nao houver produtos ativos elegiveis.
- **FR-005**: Textos visiveis MUST estar em portugues do Brasil sem caracteres corrompidos.
- **FR-006**: A experiencia MUST ser mobile-first, com toque confortavel, cards estaveis e imagens otimizadas.
- **FR-007**: A pagina MUST passar por verificacao de acessibilidade com axe/Playwright para a rota publica.
- **FR-008**: A revisao MUST atualizar README.md e docs relevantes com o comportamento da pagina.

## Non-Functional Requirements

- **NFR-001**: A rota deve permanecer publica e nao coletar dados pessoais.
- **NFR-002**: A pagina deve manter SEO indexavel, URLs amigaveis e compartilhamento social.
- **NFR-003**: A selecao de produtos deve ficar em camada de feature/service, evitando regra comercial embutida em componentes visuais quando evoluir.
- **NFR-004**: A implementacao futura deve seguir Red, Green, Refactor.

## Edge Cases

- Produto ativo sem imagem deve exibir fallback acessivel.
- Produto ativo sem slug valido nao deve gerar link quebrado.
- Falha futura de leitura do catalogo deve exibir estado seguro, sem vazar detalhes internos.
- WhatsApp sem configuracao valida deve usar fallback documentado ou ocultar CTA dependente.
