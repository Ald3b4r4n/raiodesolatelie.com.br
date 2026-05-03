# Tasks: Revisao e Melhorias da Pagina de Novidades

**Input**: Artefatos em `specs/main/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md, contracts/novidades-route.md

## Phase 1: Setup

- [X] T001 Verificar hooks, prerequisitos e arquivos de ignore existentes.
- [X] T002 Criar testes unitarios, E2E e acessibilidade da pagina de novidades antes da implementacao.

## Phase 2: Tests First

- [X] T003 Executar testes focados e confirmar falha esperada por comportamento ausente.

## Phase 3: Core Implementation

- [X] T004 Corrigir textos em portugues do Brasil e remover caracteres corrompidos na pagina.
- [X] T005 Extrair selecao de produtos ativos de novidades para helper testavel.
- [X] T006 Adicionar estado vazio para a pagina de novidades.
- [X] T007 Adicionar metadata propria e Open Graph para `/novidades`.
- [X] T008 Revisar CSS mobile, foco, layout do showcase e CTA.

## Phase 4: Documentation

- [X] T009 Atualizar README.md e docs/skills.md com a revisao da pagina de novidades.

## Phase 5: Validation

- [X] T010 Rodar lint, typecheck, testes unitarios focados, E2E/a11y focados e build.

## Additional Request: Audio Global

- [X] T011 Criar teste unitario para autoplay global da trilha e fallback manual.
- [X] T012 Implementar player global com tentativa de autoplay de Moonlight Sonata no layout.
- [X] T013 Validar teste focado e checks tecnicos apos integrar o audio.
