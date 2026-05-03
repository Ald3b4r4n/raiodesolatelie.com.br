# Research: Revisao e Melhorias da Pagina de Novidades

## Decision: tratar `/novidades` como vitrine publica de descoberta

**Rationale**: a pagina ja existe como rota publica e deve ajudar a cliente a encontrar pecas recentes, seguir para detalhes/catalogo ou chamar no WhatsApp. Isso melhora descoberta sem criar um produto editorial complexo.

**Alternatives considered**: criar blog/CMS de lancamentos; rejeitado por aumentar escopo, dados e operacao para uma necessidade que pode ser atendida com catalogo curado.

## Decision: corrigir conteudo e encoding como parte da revisao

**Rationale**: o arquivo atual contem textos com caracteres corrompidos em portugues. Isso afeta confianca, acessibilidade, SEO e qualidade percebida.

**Alternatives considered**: deixar para refatoracao geral de textos; rejeitado porque a pagina de novidades depende diretamente de copy clara em PT-BR.

## Decision: manter dados mockados ate catalogo Firebase real estar pronto

**Rationale**: `mockCatalogProducts` ja centraliza produtos do catalogo e reduz risco para uma melhoria de UI/rota. A selecao deve ficar preparada para migrar para service real.

**Alternatives considered**: conectar Firestore agora; rejeitado para esta revisao porque exigiria regras/seeds/estado de loading adicionais fora do objetivo principal.

## Decision: adicionar estado vazio e poucos produtos

**Rationale**: uma pagina de novidades pode nao ter lancamentos ativos. A pagina deve continuar util com CTAs para catalogo e WhatsApp.

**Alternatives considered**: ocultar a rota quando vazia; rejeitado por quebrar navegacao, SEO e links existentes.

## Decision: validar com unit, E2E mobile e a11y

**Rationale**: a Constituicao exige TDD, mobile-first e acessibilidade. A pagina e publica e afeta descoberta, entao testes devem cobrir renderizacao, navegacao e axe.

**Alternatives considered**: apenas snapshot ou teste manual; rejeitado por nao cobrir comportamento nem regressao mobile/a11y.
