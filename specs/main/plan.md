# Implementation Plan: Revisao e Melhorias da Pagina de Novidades

**Branch**: `main` | **Date**: 2026-05-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/main/spec.md`

**Note**: Este plano e um artefato tecnico do Spec Kit. Ele orienta a implementacao futura e nao executa alteracoes de codigo da pagina.

## Summary

Revisar e melhorar a pagina publica `/novidades` para que ela funcione como uma vitrine mobile-first de lancamentos e pecas recentes do Atelie Raios de Sol. A entrega planejada corrige texto/encoding, melhora SEO e Open Graph, torna a selecao de produtos mais explicita, adiciona estado vazio, reforca CTAs para catalogo e WhatsApp, amplia testes unitarios/E2E/a11y e atualiza README.md e docs. A stack permanece Next.js App Router, TypeScript strict, Firebase e Vercel, com dados atuais vindos do catalogo mockado ate a camada Firebase real estar consolidada.

## Technical Context

**Language/Version**: TypeScript strict no Next.js App Router existente.
**Primary Dependencies**: Next.js 16, React 19, Embla Carousel, lucide-react, motion/react, Firebase SDK conforme catalogo.
**Storage**: Cloud Firestore planejado para catalogo real; nesta revisao, a pagina pode continuar usando dados mockados centralizados em `services/firebase/catalog-mock-data` ate haver seed/admin definitivo.
**Authentication**: Nao requerida para `/novidades`; rota publica.
**Sensitive Operations**: Nenhuma operacao sensivel nova. Links de WhatsApp usam configuracao existente via `buildStoreConfig`.
**Testing**: Vitest + Testing Library para componente/feature, Playwright para rota publica, axe-core para acessibilidade.
**Target Platform**: Web mobile-first em Vercel.
**Project Type**: Next.js e-commerce/catalogo de produtos proprios.
**Performance Goals**: imagens otimizadas, primeiro produto com carregamento prioritario quando fizer sentido, layout estavel e rota indexavel.
**Constraints**: portugues do Brasil, sem coleta de dados pessoais, acessibilidade, SEO, layout mobile sem sobreposicao.
**Scale/Scope**: melhoria incremental da pagina de novidades; nao inclui marketplace, blog completo, CMS ou painel editorial novo.
**External Services**: WhatsApp por link configurado; nenhum novo provedor externo.
**Documentation Impact**: README.md, docs/skills.md e documentacao de experiencia/catalogo devem ser revisados.
**Skills Impact**: Usar `speckit-plan` neste planejamento; para implementacao futura usar `test-driven-development`, `design-taste-frontend`, `nextjs-app-router-patterns`, `verification-before-completion` e skills de documentacao/testes conforme necessidade.

## Constitution Check

*GATE: Deve passar antes da Phase 0 research. Rechecado apos Phase 1 design.*

- **Stack**: PASS. Mantem Next.js App Router, TypeScript strict, Firebase planejado e Vercel.
- **TDD**: PASS COMO PLANO. Implementacao futura deve iniciar com testes falhando para componente, rota e acessibilidade.
- **Documentacao**: PASS. README.md e docs relevantes sao entregaveis obrigatorios.
- **README**: PASS. Revisao do README e item explicito do plano.
- **Security**: PASS. Rota publica sem operacoes sensiveis; WhatsApp usa config existente; nenhuma coleta de dados pessoais.
- **Privacy**: PASS. Pagina nao coleta dados novos.
- **Mobile-first UX**: PASS. Criterios mobile, toque, carrossel e estado vazio estao no escopo.
- **Architecture**: PASS. Regras de selecao/curadoria devem sair de componentes visuais quando evoluirem.
- **Firebase reproducibility**: PASS. Nenhuma regra nova; quando catalogo real for usado, seeds/rules devem continuar versionados.
- **CI**: PASS. Comandos planejados incluem lint, typecheck, testes unitarios, E2E/a11y e build.
- **Performance/SEO**: PASS. Metadata, Open Graph, imagens e estabilidade visual estao planejados.
- **Accessibility**: PASS. Semantica, foco, contraste, texto alternativo e axe/Playwright entram como criterios.
- **MVP scope**: PASS. Continua catalogo/e-commerce de produtos proprios.
- **Skills**: PASS. Skills usadas e futuras devem ser registradas em `docs/skills.md` e no resumo final.
- **Commit governance**: PASS. Nenhum commit automatico; a implementacao futura deve pedir autorizacao.

## Project Structure

### Documentation (this feature)

```text
specs/main/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── novidades-route.md
```

### Source Code (repository root)

```text
src/
├── app/(store)/novidades/page.tsx
├── features/novidades/NovidadesPage.tsx
├── services/firebase/catalog-mock-data.ts
├── lib/config/store.ts
├── lib/seo/
└── app/globals.css

tests/
├── unit/features/novidades/
├── e2e/novidades.spec.ts
└── accessibility/novidades.spec.ts

docs/
├── skills.md
└── architecture.md
```

**Structure Decision**: manter a rota em `app/(store)/novidades/page.tsx` e a composicao visual em `features/novidades/NovidadesPage.tsx`. Se a logica de curadoria crescer, criar helper/service dedicado em `features/novidades/` ou `services/firebase/` para preservar componentes visuais simples.

## Phase 0: Research

- Confirmar comportamento atual da pagina, navegacao, dados exibidos e problemas de texto/encoding.
- Decidir criterio de "novidade": inicialmente produtos ativos ordenados por criterio disponivel; evoluir para `isNew`, `publishedAt` ou `featuredUntil` quando o modelo real suportar.
- Confirmar impacto em SEO: metadata propria para `/novidades`, Open Graph e sitemap.
- Registrar riscos de acessibilidade do carrossel e estados com poucos/nenhum produto.
- Confirmar que nao ha coleta de dados pessoais nem necessidade de regras Firebase novas.

## Phase 1: Design

- Definir modelo conceitual de `NovidadesPageContent`, `NovidadeProductSummary` e `NovidadesEmptyState`.
- Definir contrato da rota publica `/novidades`.
- Definir testes Red: componente com produtos, componente sem produtos, rota com metadata, E2E mobile, axe.
- Definir documentacao: README.md, docs/skills.md e nota em docs de arquitetura/experiencia.
- Reavaliar Constituicao apos design: sem violacoes conhecidas.

## Complexity Tracking

| Violation | Why Needed | Simpler Compliant Alternative Rejected Because | User Approval Needed |
|-----------|------------|-----------------------------------------------|----------------------|
| None | N/A | N/A | No |
