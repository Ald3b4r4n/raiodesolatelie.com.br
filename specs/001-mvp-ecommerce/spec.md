# Feature Specification: MVP Inicial Ateliê Raios de Sol

**Feature Branch**: `001-mvp-ecommerce`
**Created**: 2026-04-30
**Status**: Draft
**Input**: User description: "/speckit.specify Crie a especificação funcional do MVP inicial do projeto Ateliê Raios de Sol"

## Product Fit *(mandatory)*

- **Business Goal**: vender produtos próprios, atrair clientes e permitir administração simples dos produtos e pedidos.
- **Primary Audience**: mulheres acessando principalmente pelo celular.
- **MVP Priority**: P1 para descoberta de produtos, carrinho, checkout inicial, WhatsApp e painel admin básico; P2/P3 para cupons e avaliações iniciais.
- **Scope Boundary**: este MVP é um e-commerce/catálogo de produtos próprios. Não é marketplace multi-vendedor.
- **WhatsApp Role**: canal rápido para contato, encomendas, dúvidas e continuação de compra quando o pedido não for concluído pelo site.

O MVP deve entregar uma primeira versão funcional, simples, rápida e confiável
para que clientes encontrem produtos, escolham variações, adicionem ao carrinho
e iniciem pedido pelo checkout ou WhatsApp. A administradora deve conseguir
cadastrar produtos e visualizar pedidos sem depender de suporte técnico.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Descobrir Produtos no Celular (Priority: P1)

Como cliente em um celular, quero abrir a loja, entender rapidamente a marca,
ver produtos em destaque, acessar o catálogo e encontrar produtos por busca ou
filtros, para decidir o que comprar com poucos passos.

**Why this priority**: descoberta e navegação são o primeiro contato comercial
da loja e precisam funcionar antes de qualquer compra.

**Independent Test**: validar com testes de aceitação que a home abre, exibe
marca, chamadas, produtos, acesso ao catálogo, WhatsApp e redes sociais; validar
busca por nome, filtro por categoria, faixa de preço e disponibilidade; validar
usabilidade em viewport mobile. Criar testes unitários para regras de filtro e
busca, e teste E2E para navegação home -> catálogo -> produto.

**Mobile Acceptance**: a cliente deve conseguir navegar com uma mão, tocar nos
botões sem erro, ler nomes/preços sem zoom e acessar filtros sem perder o
contexto da listagem.

**Acceptance Scenarios**:

1. **Given** que há produtos ativos cadastrados, **When** a cliente abre a home, **Then** ela vê o nome da marca, chamada principal, produtos em destaque, acesso ao catálogo, WhatsApp, Instagram e TikTok.
2. **Given** que há produtos de pronta entrega e encomenda, **When** a cliente filtra por categoria, **Then** a listagem mostra apenas produtos da categoria escolhida.
3. **Given** que há produtos em diferentes faixas de preço, **When** a cliente aplica um filtro de preço, **Then** apenas produtos dentro da faixa selecionada aparecem.
4. **Given** que a cliente digita parte do nome de um produto, **When** a busca é aplicada, **Then** produtos correspondentes aparecem com foto, nome, preço, categoria e disponibilidade.
5. **Given** que nenhum produto corresponde à busca, **When** a busca é aplicada, **Then** o sistema exibe uma mensagem simples e opção de limpar filtros ou chamar no WhatsApp.

---

### User Story 2 - Escolher Produto, Variações e WhatsApp (Priority: P1)

Como cliente, quero abrir a página de um produto, ver fotos, descrição, preço,
categoria, disponibilidade, tamanhos e cores, para escolher a variação correta
e comprar pelo site ou chamar no WhatsApp.

**Why this priority**: a página de produto transforma interesse em intenção de
compra e precisa dar confiança antes do carrinho.

**Independent Test**: validar seleção de variação, bloqueio de variações
indisponíveis, botões de adicionar ao carrinho e WhatsApp. Criar testes
unitários para seleção/validação de variações e teste E2E produto -> variação
-> adicionar ao carrinho -> WhatsApp.

**Mobile Acceptance**: fotos, preço, descrição, opções de tamanho/cor e CTAs
devem caber em fluxo vertical simples, sem elementos sobrepostos.

**Acceptance Scenarios**:

1. **Given** um produto ativo com fotos e variações, **When** a cliente abre a página do produto, **Then** ela vê fotos, nome, descrição, preço, categoria, disponibilidade, variações e opções de compra.
2. **Given** que uma variação está indisponível, **When** a cliente tenta selecioná-la, **Then** o sistema impede a compra dessa variação e explica o motivo.
3. **Given** que a cliente escolheu tamanho e cor válidos, **When** toca em adicionar ao carrinho, **Then** o item é incluído com produto, variação, quantidade e preço corretos.
4. **Given** que a cliente quer encomendar via WhatsApp, **When** toca no botão de WhatsApp, **Then** o sistema abre uma mensagem com produto, variação, quantidade e valor.

---

### User Story 3 - Comprar com Carrinho e Checkout Inicial (Priority: P1)

Como cliente, quero revisar produtos no carrinho, alterar quantidades, escolher
retirada local ou entrega, informar somente dados necessários e finalizar um
pedido com Pix ou cartão planejado, para comprar sem fricção.

**Why this priority**: o carrinho e o checkout são o fluxo principal de venda
direta pelo site.

**Independent Test**: validar persistência local do carrinho, alteração de
quantidade, subtotal, cupom quando disponível, escolha de entrega, pagamento
mockado e criação do pedido. Criar testes unitários para cálculo de subtotal,
cupom e frete; integração para criação de pedido e permissões; E2E para
produto -> carrinho -> checkout -> pedido criado.

**Mobile Acceptance**: o checkout deve pedir dados em etapas curtas, com
labels claros, mensagens de erro compreensíveis e botões fáceis de tocar.

**Acceptance Scenarios**:

1. **Given** que há itens no carrinho, **When** a cliente altera quantidade ou remove item, **Then** subtotal e lista de itens são atualizados corretamente.
2. **Given** que a cliente fecha e reabre o site no mesmo dispositivo, **When** acessa o carrinho, **Then** os itens válidos ainda estão disponíveis localmente.
3. **Given** que a cliente escolhe retirada local, **When** finaliza o pedido, **Then** o sistema não exige endereço de entrega.
4. **Given** que a cliente escolhe entrega, **When** informa CEP e endereço mínimo, **Then** o sistema apresenta opção de frete disponível ou uma mensagem clara de indisponibilidade.
5. **Given** que credenciais reais de pagamento ainda não existem, **When** a cliente escolhe Pix ou cartão, **Then** o sistema usa uma sessão de pagamento abstrata/mockada e registra status rastreável do pedido.
6. **Given** que o pedido é finalizado, **When** a operação é concluída, **Then** o sistema mostra confirmação e registra itens, variações, valores, entrega, pagamento, status e data.

---

### User Story 4 - Administrar Produtos e Pedidos (Priority: P1)

Como administradora, quero fazer login e gerenciar produtos, fotos, preço,
categoria, variações, disponibilidade e pedidos, para controlar vendas sem
editar código.

**Why this priority**: a loja só é sustentável se a cliente conseguir operar o
catálogo e acompanhar pedidos por conta própria.

**Independent Test**: validar autenticação, separação de cliente/admin,
proteção de rotas administrativas, CRUD de produtos, upload/cadastro de foto
quando disponível e visualização de pedidos. Criar testes de regra de acesso,
testes de integração para operações administrativas e E2E login admin ->
cadastrar produto -> editar -> visualizar pedido.

**Mobile Acceptance**: o painel admin deve ser simples e utilizável em celular,
mas pode priorizar telas maiores para tarefas de edição mais longas desde que
não bloqueie uso básico em mobile.

**Acceptance Scenarios**:

1. **Given** uma pessoa sem perfil admin, **When** tenta acessar o painel admin, **Then** o acesso é negado.
2. **Given** uma administradora autenticada, **When** cadastra produto com campos válidos, **Then** o produto fica disponível conforme status e categoria definidos.
3. **Given** uma administradora autenticada, **When** edita preço, variação ou disponibilidade, **Then** a alteração aparece no catálogo sem quebrar pedidos antigos.
4. **Given** uma administradora autenticada, **When** desativa um produto, **Then** o produto deixa de aparecer para compra sem excluir histórico de pedidos.
5. **Given** que existem pedidos registrados, **When** a administradora abre a área de pedidos, **Then** ela vê itens, variações, valores, status, entrega, pagamento e data.

---

### User Story 5 - Login de Cliente e Dados Mínimos (Priority: P2)

Como cliente, quero fazer login somente quando necessário e informar o mínimo
de dados para pedido, para comprar com confiança e sem cadastro excessivo.

**Why this priority**: login melhora rastreabilidade de pedidos, mas não deve
criar fricção nem coletar dados sem necessidade.

**Independent Test**: validar autenticação de cliente, isolamento de dados entre
clientes, acesso somente aos próprios pedidos e ausência de campos obrigatórios
desnecessários. Criar testes de permissão e E2E login cliente -> finalizar
pedido -> visualizar confirmação.

**Mobile Acceptance**: login deve ser curto, com campos rotulados, erros claros
e sem interromper WhatsApp como alternativa de contato.

**Acceptance Scenarios**:

1. **Given** uma cliente sem login, **When** acessa a loja, **Then** ela pode navegar no catálogo sem autenticação.
2. **Given** uma cliente autenticada, **When** finaliza um pedido, **Then** o pedido fica associado a ela com dados mínimos necessários.
3. **Given** uma cliente autenticada, **When** tenta acessar pedido de outra cliente, **Then** o acesso é bloqueado.

---

### User Story 6 - Cupons e Avaliações Iniciais (Priority: P3)

Como cliente, quero aplicar cupom válido e ver avaliações moderadas de produtos,
para ter incentivo de compra e mais confiança.

**Why this priority**: cupons e avaliações ajudam conversão, mas dependem do
catálogo, carrinho, pedidos e painel admin.

**Independent Test**: validar aplicação de cupom ativo/inativo, validade,
desconto, moderação de avaliações e exibição apenas de avaliações aprovadas.
Criar testes unitários para regras de desconto e integração para permissões de
criação/moderação.

**Mobile Acceptance**: campo de cupom e avaliações devem ser simples, sem
poluir o checkout ou a página de produto.

**Acceptance Scenarios**:

1. **Given** um cupom ativo e válido, **When** a cliente aplica o código no carrinho ou checkout, **Then** o desconto correto aparece antes da finalização.
2. **Given** um cupom expirado ou inativo, **When** a cliente aplica o código, **Then** o sistema rejeita com mensagem clara.
3. **Given** uma avaliação enviada, **When** ainda não foi aprovada, **Then** ela não aparece publicamente.
4. **Given** uma avaliação aprovada, **When** outra cliente abre o produto, **Then** nota e comentário opcional aparecem de forma acessível.

### Edge Cases

- Produto ativo sem foto deve exibir fallback visual acessível e não quebrar layout.
- Produto sem estoque ou indisponível deve bloquear adição ao carrinho e oferecer WhatsApp quando aplicável.
- Variação removida depois de estar no carrinho deve exigir nova escolha antes do checkout.
- Preço alterado depois de item estar no carrinho deve ser recalculado antes de finalizar pedido.
- Carrinho com dados locais corrompidos deve ser limpo ou recuperado com mensagem clara.
- Checkout com entrega indisponível deve permitir trocar para retirada local ou WhatsApp.
- Falha no serviço de pagamento mockado/real deve manter pedido em status seguro e explicar próximo passo.
- Falha no cálculo de frete deve não travar retirada local nem WhatsApp.
- Cliente sem aplicativo WhatsApp deve receber link web compatível quando possível.
- Usuário não-admin tentando criar, editar ou remover produto deve ser bloqueado.
- Admin removendo/desativando produto com pedido existente deve preservar histórico do pedido.
- Avaliação ofensiva, vazia ou com dados pessoais deve poder ser bloqueada/moderada.
- Redes móveis lentas devem manter navegação utilizável, imagens otimizadas e estados de carregamento claros.
- Falhas de autenticação devem exibir erro compreensível sem revelar detalhes sensíveis.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST exibir uma home simples com nome da marca, chamada principal, produtos em destaque, acesso ao catálogo, WhatsApp, Instagram e TikTok.
- **FR-002**: O sistema MUST exibir catálogo de produtos ativos com foto, nome, preço, categoria, disponibilidade, ação de detalhes e ação de WhatsApp quando aplicável.
- **FR-003**: O sistema MUST suportar as categorias iniciais "pronta entrega" e "encomenda via WhatsApp".
- **FR-004**: O sistema MUST permitir busca por nome do produto.
- **FR-005**: O sistema MUST permitir filtros por categoria, faixa de preço e disponibilidade.
- **FR-006**: O sistema MUST manter busca e filtros utilizáveis em celular, sem exigir tela grande.
- **FR-007**: O sistema MUST exibir página de produto com fotos, nome, descrição, preço, categoria, variações de tamanho/cor, disponibilidade, retirada local ou envio e CTAs de compra.
- **FR-008**: O sistema MUST impedir compra de produto ou variação indisponível.
- **FR-009**: O sistema MUST permitir adicionar produto ao carrinho somente com variação válida quando o produto tiver tamanho ou cor.
- **FR-010**: O carrinho MUST permitir adicionar, remover, alterar quantidade, revisar variações e visualizar subtotal.
- **FR-011**: O carrinho MUST persistir localmente no dispositivo da cliente até expirar, ser limpo pela cliente ou ficar inválido por alteração de produto.
- **FR-012**: O checkout MUST permitir revisar produtos antes de finalizar pedido.
- **FR-013**: O checkout MUST coletar apenas dados mínimos necessários para contato, entrega, pagamento e registro do pedido.
- **FR-014**: O checkout MUST permitir escolher retirada local ou entrega.
- **FR-015**: O checkout MUST permitir selecionar Pix ou cartão como forma de pagamento planejada.
- **FR-016**: O sistema MUST usar camada abstrata/mockada para pagamento enquanto credenciais reais não existirem.
- **FR-017**: O sistema MUST registrar pedido com itens, variações, valores, status, forma de entrega, forma de pagamento, data e dados mínimos do cliente.
- **FR-018**: O sistema MUST gerar mensagem automática de WhatsApp para produto selecionado ou carrinho com nome, variações, quantidade e valor.
- **FR-019**: O fluxo de WhatsApp MUST funcionar em celular e ser adequado para encomendas.
- **FR-020**: O sistema MUST oferecer abstração de cálculo de frete e suportar retirada local.
- **FR-021**: O sistema MUST usar mock/service layer documentado e testado para frete enquanto integração real com Correios não estiver definida.
- **FR-022**: O sistema MUST permitir login com perfis de cliente e admin.
- **FR-023**: O sistema MUST separar permissões de cliente e admin.
- **FR-024**: O sistema MUST proteger rotas e ações administrativas contra usuários sem perfil admin.
- **FR-025**: O painel admin MUST permitir cadastrar produto.
- **FR-026**: O painel admin MUST permitir editar produto.
- **FR-027**: O painel admin MUST permitir remover ou desativar produto sem apagar histórico de pedidos.
- **FR-028**: O painel admin MUST permitir cadastrar ou associar foto de produto.
- **FR-029**: O painel admin MUST permitir definir preço, categoria, variações de tamanho/cor e disponibilidade.
- **FR-030**: O painel admin MUST permitir visualizar pedidos.
- **FR-031**: O sistema MUST suportar cupom com código, tipo de desconto, validade e status ativo/inativo.
- **FR-032**: O sistema MUST permitir aplicar cupom no carrinho ou checkout.
- **FR-033**: O sistema MUST impedir uso de cupom expirado, inativo ou incompatível.
- **FR-034**: O sistema MUST suportar avaliação de produto com nota e comentário opcional.
- **FR-035**: O sistema MUST permitir moderação/admin antes de exibir avaliações publicamente quando aplicável.
- **FR-036**: O sistema MUST exibir apenas avaliações aprovadas publicamente.
- **FR-037**: O sistema MUST incluir metadados, Open Graph, sitemap, robots.txt e estrutura para compartilhamento de produto.
- **FR-038**: O sistema MUST exibir links para Instagram e TikTok.
- **FR-039**: O sistema MUST validar dados com schemas no cliente e no servidor, sem depender apenas de validação client-side.
- **FR-040**: O sistema MUST sanitizar entradas de texto exibidas publicamente, incluindo avaliações e dados de produto.
- **FR-041**: O sistema MUST aplicar regras de segurança por papel de usuário para produtos, pedidos, cupons, avaliações e dados administrativos.
- **FR-042**: O sistema MUST testar regras de segurança do Firebase para acessos permitidos e negados.
- **FR-043**: O sistema MUST aplicar rate limit ou proteção equivalente em endpoints/formulários sensíveis quando aplicável.
- **FR-044**: O sistema MUST impedir exposição de secrets no frontend.
- **FR-045**: O projeto MUST criar ou atualizar README.md com visão geral, stack, comandos, variáveis, funcionalidades, status e limitações.
- **FR-046**: O projeto MUST criar `docs/setup.md`, `docs/firebase.md`, `docs/testing.md`, `docs/security.md` e `docs/skills.md`.
- **FR-047**: O projeto MUST documentar dados coletados, finalidade, armazenamento, acesso, proteção e retenção.
- **FR-048**: Antes da implementação, o agente MUST consultar o catálogo antigravity-awesome-skills, escolher skills adequadas, instalar conforme documentação e registrar uso em `docs/skills.md`.
- **FR-049**: Cada feature MUST registrar skills usadas, motivo, evidência e impacto no resumo final.
- **FR-050**: O agente MUST propor commit somente após checks e aguardar autorização explícita do usuário.
- **FR-051**: O MVP MUST excluir marketplace multi-vendedor, painel de lojistas terceiros e comissão por vendedor.
- **FR-052**: O MVP MUST manter pagamento, frete, WhatsApp, cupons e pedidos isolados em camadas/serviços substituíveis.

### Non-Functional Requirements

- **NFR-001 Mobile**: A experiência MUST ser desenhada primeiro para celular, com botões fáceis de tocar e layout responsivo.
- **NFR-002 Simplicity**: A interface MUST ser simples, prática, leve e confiável, sem fluxos longos ou linguagem técnica para a cliente final.
- **NFR-003 Performance/SEO**: Páginas públicas MUST ser rápidas em rede móvel, indexáveis quando apropriado e preparadas para compartilhamento social.
- **NFR-004 Accessibility**: A interface MUST usar HTML semântico, contraste adequado, labels, foco visível, navegação por teclado, textos alternativos e mensagens de erro claras.
- **NFR-005 Security**: Operações sensíveis MUST ocorrer no backend da aplicação, com validação, autorização, sanitização, proteção contra abuso e regras de menor privilégio.
- **NFR-006 Privacy**: Dados pessoais MUST ser mínimos, justificados por funcionalidade real e documentados.
- **NFR-007 Architecture**: Regras de negócio e integrações MUST ficar separadas de componentes visuais.
- **NFR-008 Testability**: Cada comportamento relevante MUST ter teste definido antes da implementação.
- **NFR-009 Maintainability**: Nomes, tipos, entidades e contratos MUST ser claros para permitir evolução sem reescrita.
- **NFR-010 Reproducibility**: Configurações Firebase MUST ser reproduzíveis por CLI e arquivos versionados sempre que possível.
- **NFR-011 CI**: O projeto MUST estar preparado para pipeline com install limpo, lint, typecheck, testes, build, auditoria e validação de regras.
- **NFR-012 Compatibility**: O fluxo de WhatsApp MUST funcionar em navegadores móveis comuns e oferecer fallback web.
- **NFR-013 Data Integrity**: Pedidos finalizados MUST preservar snapshot suficiente de produto, variação, preço e descontos para auditoria simples.
- **NFR-014 Admin Safety**: Remoções administrativas MUST preferir desativação quando houver histórico relacionado.

### Key Entities *(include if feature involves data)*

- **Product**: produto próprio vendido ou divulgado; atributos incluem nome, descrição, fotos, preço base, categoria, disponibilidade, status ativo/inativo e flags de pronta entrega/encomenda.
- **ProductVariant**: combinação ou opção de tamanho/cor; pertence a um produto e define disponibilidade, preço opcional e seleção obrigatória quando aplicável.
- **Category**: classificação inicial do produto, incluindo pronta entrega e encomenda via WhatsApp.
- **Cart**: conjunto local de itens selecionados, quantidades, variações, subtotal e cupom aplicado; não deve exigir login para existir.
- **Order**: registro de pedido com itens, variações, valores, status, entrega, pagamento, data e dados mínimos da cliente.
- **Customer**: identidade mínima da cliente quando login ou pedido exigir; inclui identificador, contato e dados necessários ao pedido.
- **AdminUser**: usuária com permissão administrativa para gerenciar produtos, cupons, avaliações e pedidos.
- **Coupon**: código promocional com tipo de desconto, validade, status e regras simples de aplicação.
- **Review**: avaliação de produto com nota, comentário opcional, status de moderação, autor mínimo e vínculo ao produto.
- **ShippingOption**: opção de retirada local ou entrega com custo, prazo estimado e disponibilidade.
- **PaymentIntent/PaymentSession**: sessão abstrata de pagamento com método, valor, status e referência ao pedido, sem armazenar dados de cartão.

### Data & Privacy *(mandatory when data is collected or stored)*

- **Data Collected**: nome ou identificador de contato, e-mail/telefone quando necessário, endereço somente para entrega, itens comprados, variações, valores, forma de entrega, forma de pagamento, status e data. Dados fiscais não devem ser coletados no MVP salvo confirmação explícita de necessidade operacional.
- **Purpose**: permitir contato sobre pedido, entrega/retirada, pagamento, confirmação de compra, suporte e controle administrativo.
- **Storage**: autenticação para identidade, banco principal para produtos/pedidos/cupons/avaliações, armazenamento de imagens apenas se necessário para fotos de produtos.
- **Access**: cliente acessa seus próprios dados e pedidos; admin acessa produtos, pedidos, cupons e avaliações; operações sensíveis ficam restritas ao backend; provedores externos recebem apenas dados necessários.
- **Protection**: regras de segurança por papel, validação por schema, sanitização, segredo fora do frontend, menor privilégio, auditoria de dependências e testes de acesso permitido/negado.
- **Retention**: pedidos devem ser mantidos pelo período operacional/legal necessário; carrinho local deve poder expirar ou ser limpo; avaliações rejeitadas devem poder ser removidas; política detalhada deve ser documentada em `docs/security.md` ou documento de privacidade.
- **Deletion/Correction Path**: cliente deve poder solicitar correção/remoção por canal de contato; admin deve poder corrigir pedidos quando operacionalmente permitido, desativar produtos e moderar/remover avaliações.

### Service Boundaries *(mandatory for integrations)*

- **Firebase**: autenticação, banco principal, regras de segurança, índices, emuladores e testes locais são obrigatórios; configuração deve ser reproduzível por CLI.
- **Payment**: Pix e cartão devem usar interface abstrata; mocks/test doubles são obrigatórios enquanto não houver credenciais reais; nenhum dado de cartão deve ser armazenado pela aplicação.
- **Freight**: cálculo de frete deve usar interface abstrata; mock/service layer documentado deve suportar entrega e retirada local até haver integração definida com Correios.
- **WhatsApp**: geração de link/mensagem deve ser isolada para produto e carrinho, com texto claro em português e dados de item, variação, quantidade e valor.
- **Coupons/Reviews/Invoices**: cupons e avaliações devem ter regras próprias testáveis; emissão automática de nota fiscal fica fora do MVP, mas o projeto deve não bloquear integração futura.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Em celular, uma cliente consegue sair da home, encontrar um produto e abrir a página de produto em até 4 ações principais.
- **SC-002**: A busca por nome e os filtros de categoria, preço e disponibilidade retornam resultado ou mensagem vazia compreensível em até 2 segundos em condições normais.
- **SC-003**: Uma cliente consegue escolher tamanho/cor, adicionar ao carrinho e revisar subtotal sem erro em pelo menos 95% dos cenários de teste definidos.
- **SC-004**: Uma cliente consegue iniciar pedido pelo checkout ou WhatsApp com produto, variações, quantidade e valor corretos.
- **SC-005**: A administradora consegue cadastrar e editar produto completo sem editar código.
- **SC-006**: A administradora consegue visualizar pedidos com itens, valores, entrega, pagamento, status e data.
- **SC-007**: Acesso admin indevido, acesso a pedido de outra cliente e escrita pública não autorizada são bloqueados em testes de segurança.
- **SC-008**: Testes unitários, integração e E2E cobrem os fluxos críticos do MVP antes de conclusão.
- **SC-009**: README.md e docs obrigatórios existem, descrevem setup, Firebase, testes, segurança, skills e limitações do MVP.
- **SC-010**: O projeto fica pronto para build e deploy na Vercel, com variáveis e passos documentados.
- **SC-011**: Páginas públicas principais possuem metadados, Open Graph, sitemap/robots e textos alternativos em imagens relevantes.
- **SC-012**: Fluxos principais passam por verificação básica de acessibilidade com teclado, labels, foco visível e mensagens de erro claras.

## Documentation & Skills *(mandatory)*

- **README Impact**: criar/atualizar visão geral, stack, requisitos de ambiente, instalação, desenvolvimento, testes, build, deploy, variáveis de ambiente, funcionalidades do MVP, status e limitações conhecidas.
- **Docs Impact**: criar `docs/setup.md`, `docs/firebase.md`, `docs/testing.md`, `docs/security.md`, `docs/skills.md` e atualizar documentação de arquitetura/serviços quando o plano detalhar contratos.
- **Skills Required**: antes de implementar, consultar o catálogo antigravity-awesome-skills e selecionar skills para desenvolvimento fullstack, documentação, frontend mobile/acessível, testes unitários/E2E, pesquisa de documentação atualizada, segurança de variáveis, revisão de bugs/segurança, auditoria de CI e verificação antes da conclusão.
- **Evidence Required**: cada feature deve registrar skills usadas, motivo, evidência de aplicação, impacto, checks executados, riscos remanescentes e decisão de commit autorizada ou recusada.

## Dependencies

- Número oficial de WhatsApp da loja.
- Links oficiais de Instagram e TikTok.
- Fotos, nomes, descrições, preços, categorias, variações e disponibilidade dos primeiros produtos.
- Dados operacionais de retirada local, incluindo cidade/endereço ou instrução pública permitida.
- Política de entrega inicial e decisão sobre quando usar mock de frete versus integração real.
- Credenciais reais de pagamento quando a integração deixar de ser mockada.
- Configuração Firebase e Vercel do projeto.
- Definição do primeiro usuário admin e processo seguro de concessão desse papel.

## Risks & Ambiguities

- Dados mínimos de checkout ainda dependem da decisão entre retirada local, entrega e eventual emissão de nota fiscal manual.
- Endereço público de retirada local pode exigir cuidado de privacidade/segurança se for residência ou local sensível.
- Pagamento Pix/cartão real depende de provedor e credenciais; no MVP deve permanecer abstrato/mockado até definição.
- Frete real pelos Correios depende de API, credenciais e regras comerciais; no MVP deve permanecer isolado em serviço substituível.
- Moderação de avaliações precisa equilibrar confiança e operação simples para a administradora.
- O painel admin em celular é obrigatório para uso básico, mas edição de catálogo com muitas fotos pode ser mais confortável em tela maior.
- A cliente informou que não quer guardar dados desnecessários; qualquer dado adicional deve ser tratado como exceção justificada.

## Explicit Exclusions

- Marketplace multi-vendedor.
- Painel para lojistas terceiros.
- Comissão por vendedor.
- App mobile nativo.
- Blog completo.
- Emissão automática de nota fiscal.
- Integração real de pagamento sem credenciais.
- Integração real de frete sem credenciais ou API definida.
- Automações avançadas de marketing.
- Sistema complexo de CRM.
- Gestão avançada de estoque, logística reversa ou múltiplos centros de distribuição.

## Assumptions

- A cliente aceitará começar com pagamento e frete em camadas mockadas/testadas até credenciais reais existirem.
- A venda por WhatsApp é alternativa e complemento ao checkout, não substitui todo o fluxo do site.
- Produtos são próprios do Ateliê Raios de Sol e não haverá vendedores independentes no MVP.
- Clientes podem navegar sem login; login é necessário apenas quando a funcionalidade exigir identidade ou associação segura de pedido.
- Retirada local estará disponível para clientes da cidade, com instruções claras no checkout ou confirmação.
- O primeiro admin será configurado por processo documentado e restrito.
- O MVP pode começar com poucas categorias e evoluir depois sem alterar o modelo de own-product e-commerce.
