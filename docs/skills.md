# Skills do Projeto

**Feature**: `001-mvp-ecommerce`
**Data de instalação**: 2026-04-30
**Catálogo consultado**: `https://github.com/sickn33/antigravity-awesome-skills`
**Snapshot local consultado**: commit `1a9f5ac388662b5e59696a99e2eaeb72032c35ed`
**Destino de instalação**: `.agents/skills/`

## Resultado da Consulta

O catálogo foi consultado antes de qualquer bootstrap de app, conforme a
constitution v1.0.0. As skills foram selecionadas para cobrir desenvolvimento
fullstack, documentação, TDD, Next.js App Router, Firebase, frontend
mobile-first, testes, segurança, variáveis de ambiente, CI, Vercel e verificação
antes de concluir features.

A instalação nesta fase foi feita copiando os diretórios selecionados do
catálogo para `.agents/skills/`, preservando `SKILL.md` e arquivos auxiliares.
Nenhum `package.json` foi criado e nenhum app foi inicializado.

## Skills Selecionadas

| Skill                            | Risco do catálogo | Motivo de uso                                                      | Como ativar                                                   | Limitações conhecidas                                                   |
| -------------------------------- | ----------------- | ------------------------------------------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `development`                    | safe              | Fluxo geral de desenvolvimento web/backend com pequenas entregas.  | Referenciar a skill antes de tarefas de implementação.        | Genérica; deve ser combinada com skills específicas.                    |
| `documentation`                  | safe              | README, docs técnicas, contratos e manutenção documental.          | Usar em toda alteração de feature/documentação.               | Não substitui revisão de consistência do Spec Kit.                      |
| `test-driven-development`        | unknown           | Reforçar Red -> Green -> Refactor em todas as features.            | Usar antes de criar qualquer implementação.                   | Requer validação real dos testes pelo agente.                           |
| `nextjs-app-router-patterns`     | safe              | Padrões específicos de Next.js App Router.                         | Usar no bootstrap e rotas Server Components/Actions.          | Precisa ser confirmada contra docs atuais quando houver dúvida.         |
| `firebase`                       | unknown           | Firebase Auth, Firestore, rules, emuladores e integração.          | Usar em fases Firebase, Auth, rules e dados.                  | Contém exemplos de credenciais; nunca copiar valores reais para o repo. |
| `design-taste-frontend`          | safe              | UI mobile-first simples, responsiva e bem acabada.                 | Usar em design system, home, catálogo, produto e admin.       | Deve respeitar UX simples, sem excesso visual.                          |
| `lambdatest-agent-skills`        | safe              | Planejamento de testes unitários, E2E e acessibilidade.            | Usar em infraestrutura de testes e fluxos críticos.           | Dependências externas só serão instaladas no bootstrap apropriado.      |
| `context7-auto-research`         | unknown           | Consulta de documentação atualizada de Next.js, Firebase e Vercel. | Usar quando houver decisão dependente de versão/documentação. | Pode exigir acesso externo; registrar fonte consultada.                 |
| `varlock`                        | critical          | Segurança de variáveis de ambiente e secrets.                      | Usar em `.env.example`, env schema, Vercel e Firebase Admin.  | Tratar como skill sensível; revisar exemplos antes de aplicar.          |
| `logic-lens`                     | safe              | Revisão de bugs, anti-patterns, segurança e regras de negócio.     | Usar em services, checkout, rules, admin e revisões.          | Não substitui testes automatizados.                                     |
| `agentic-actions-auditor`        | safe              | Auditoria de GitHub Actions e CI.                                  | Usar ao criar/alterar workflows.                              | CI completo só será criado na fase final planejada.                     |
| `verification-before-completion` | unknown           | Impedir conclusão sem validação real.                              | Usar em checkpoints e encerramento de feature.                | Depende dos comandos existirem no projeto.                              |
| `skill-scanner`                  | unknown           | Avaliar riscos das skills antes de adoção.                         | Usar antes de instalar/adicionar novas skills.                | Avaliação heurística; exige julgamento humano.                          |
| `security-auditor`               | unknown           | Revisão de ameaças, XSS, rate limit, roles e dados.                | Usar nas fases de segurança, checkout, admin e CI.            | Pode apontar riscos que exigem priorização pelo escopo MVP.             |
| `vercel-deployment`              | safe              | Preparação de preview/produção na Vercel.                          | Usar em docs/deploy e fase de deploy.                         | Deploy real depende de env vars e CI completos.                         |
| `architecture-decision-records`  | unknown           | Criação e manutenção de ADRs.                                      | Usar em decisões técnicas relevantes.                         | ADR deve ser atualizado quando a decisão mudar.                         |

## Avaliação de Segurança das Skills

Avaliação inicial feita com leitura do catálogo, metadados `skills_index.json` e
busca heurística por termos sensíveis. A maioria dos achados envolve exemplos de
variáveis, tokens ou comandos de instalação dentro da documentação das skills.
Nenhum script foi executado a partir das skills instaladas.

Pontos de atenção:

- `varlock` aparece como risco `critical` por lidar diretamente com secrets; será
  usada apenas como guia de proteção e revisão.
- `firebase`, `vercel-deployment`, `security-auditor` e skills de teste podem
  conter exemplos de tokens/env vars; exemplos nunca devem virar valores reais.
- Novas skills só podem ser adicionadas após nova avaliação com `skill-scanner`.

## Uso por Tipo de Feature

| Tipo de feature                              | Skills obrigatórias/recomendadas                                                               |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Bootstrap e estrutura                        | `development`, `documentation`, `test-driven-development`, `verification-before-completion`    |
| Next.js App Router                           | `nextjs-app-router-patterns`, `context7-auto-research`, `development`                          |
| Firebase/Auth/Firestore                      | `firebase`, `security-auditor`, `logic-lens`, `varlock`                                        |
| Firebase Security Rules                      | `firebase`, `lambdatest-agent-skills`, `logic-lens`, `security-auditor`                        |
| UI mobile-first                              | `design-taste-frontend`, `lambdatest-agent-skills`, `documentation`                            |
| Catálogo e produto                           | `test-driven-development`, `nextjs-app-router-patterns`, `design-taste-frontend`, `logic-lens` |
| Carrinho e WhatsApp                          | `test-driven-development`, `logic-lens`, `documentation`                                       |
| Checkout, pedido, frete e pagamento mockados | `test-driven-development`, `security-auditor`, `logic-lens`, `firebase`                        |
| Login, roles e admin                         | `firebase`, `security-auditor`, `varlock`, `logic-lens`                                        |
| Cupons e avaliações                          | `test-driven-development`, `security-auditor`, `logic-lens`, `lambdatest-agent-skills`         |
| CI e auditoria                               | `agentic-actions-auditor`, `verification-before-completion`, `lambdatest-agent-skills`         |
| Deploy Vercel                                | `vercel-deployment`, `varlock`, `agentic-actions-auditor`                                      |
| ADRs e documentação                          | `documentation`, `architecture-decision-records`                                               |

## Skills Não Selecionadas Nesta Fase

- `nextjs-best-practices`: substituída por `nextjs-app-router-patterns`, mais
  específica para a stack obrigatória.
- Skills genéricas de frontend: substituídas por `design-taste-frontend` para
  manter foco em UI mobile-first e simples.
- Skills de pagamento real: fora do MVP enquanto não existirem credenciais e
  provedor definido.

## Evidência de Instalação

Diretórios instalados em `.agents/skills/`:

- `agentic-actions-auditor`
- `architecture-decision-records`
- `context7-auto-research`
- `design-taste-frontend`
- `development`
- `documentation`
- `firebase`
- `lambdatest-agent-skills`
- `logic-lens`
- `nextjs-app-router-patterns`
- `security-auditor`
- `skill-scanner`
- `test-driven-development`
- `varlock`
- `vercel-deployment`
- `verification-before-completion`

## Checkpoint T017 (Fase 0)

- `docs/skills.md`: criado.
- `README.md`: criado.
- `docs/setup.md`: criado.
- `docs/architecture.md`: criado.
- `docs/security.md`: criado.
- `docs/testing.md`: criado.
- `docs/firebase.md`: criado.
- `docs/deployment.md`: criado.
- `docs/decisions/`: criado com ADRs obrigatórias.
- Bootstrap de app naquele momento: não iniciado.
- Firebase naquele momento: não configurado.
- `package.json` naquele momento: não criado.

## Uso Registrado: Fase 1 Bootstrap

| Skill                            | Evidência de uso                                                | Impacto                                           |
| -------------------------------- | --------------------------------------------------------------- | ------------------------------------------------- |
| `speckit-implement`              | Execução limitada a T018-T031.                                  | Manteve escopo da Fase 1 sem features de negócio. |
| `development`                    | Bootstrap Next.js, pnpm, estrutura de pastas e scripts.         | Base técnica inicial criada.                      |
| `nextjs-app-router-patterns`     | App Router em `src/app/layout.tsx` e `src/app/page.tsx`.        | Estrutura compatível com a stack definida.        |
| `test-driven-development`        | Teste Red de env antes de implementar `src/lib/env/*`.          | Fluxo Red -> Green aplicado na segurança de env.  |
| `varlock`                        | `.env.example` sem valores reais e separação public/server env. | Reduz risco de secrets no frontend.               |
| `lambdatest-agent-skills`        | Teste unitário de env com Vitest.                               | Verificação automatizada inicial antes da Fase 2. |
| `documentation`                  | README, setup, deploy, Firebase, testing e skills atualizados.  | Documentação acompanha o bootstrap.               |
| `agentic-actions-auditor`        | Decisão de não criar `vercel.json` sem necessidade real.        | Evita configuração de deploy/CI prematura.        |
| `verification-before-completion` | Lint, typecheck, teste de env e `git diff --check`.             | Evidência antes de declarar a fase pronta.        |

## Uso Registrado: Fase 2 Infraestrutura de Testes

| Skill                            | Evidência de uso                                                        | Impacto                                                 |
| -------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------- |
| `speckit-implement`              | Execução limitada a T032-T041.                                          | Manteve o escopo em infraestrutura de testes.           |
| `test-driven-development`        | Teste smoke em Red antes de criar `src/test/utils/smoke.ts`.            | Ciclo Red -> Green aplicado na fase.                    |
| `lambdatest-agent-skills`        | Vitest, Testing Library, Playwright, axe-core e cobertura configurados. | Suítes de teste ficaram executáveis antes das features. |
| `development`                    | Scripts npm/pnpm, helpers e configuração de emuladores.                 | Base técnica de testes preparada.                       |
| `documentation`                  | README e docs atualizados com comandos e validações.                    | Documentação acompanha a mudança operacional.           |
| `agentic-actions-auditor`        | Workflow CI básico/smoke criado com permissões mínimas.                 | CI inicial sem ações de agente ou secrets.              |
| `verification-before-completion` | Lint, typecheck, build, testes da fase e `git diff --check`.            | Evidência fresca antes de encerrar a fase.              |

## Uso Registrado: Fase 3 Firebase e Segurança

| Skill                            | Evidência de uso                                                            | Impacto                                                            |
| -------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `speckit-implement`              | Execução limitada a T042-T060.                                              | Manteve o escopo em Firebase e segurança, sem features de negócio. |
| `firebase`                       | Rules, emuladores, `.firebaserc`, indexes e adapters Firebase configurados. | Base Firebase reproduzível para desenvolvimento local.             |
| `test-driven-development`        | Testes Red de rules, adapters, roles e rate limit antes da implementação.   | Fluxo Red → Green aplicado à segurança da fase.                    |
| `lambdatest-agent-skills`        | Testes Vitest e Security Rules com `@firebase/rules-unit-testing`.          | Cobertura automatizada para permissões críticas.                   |
| `logic-lens`                     | Revisão de menor privilégio em rules, roles e bloqueios de escrita direta.  | Reduziu risco de acesso indevido a catálogo, pedidos e admin.      |
| `varlock`                        | Separação entre env públicas e credenciais server-side nos adapters.        | Evitou dependência de secrets no frontend.                         |
| `documentation`                  | README e docs de setup, Firebase, segurança, testes e ADRs atualizados.     | Documentação acompanha a configuração real.                        |
| `verification-before-completion` | Execução dos checks obrigatórios da fase antes de propor commit.            | Evidência de validação antes de encerrar a fase.                   |

## Uso Registrado: Fase 4 Domínio e Validação

| Skill                            | Evidência de uso                                                                            | Impacto                                                              |
| -------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `speckit-implement`              | Execução limitada a tipos, regras puras, schemas, sanitização e documentação.               | Evitou avançar para UI, catálogo visual, checkout visual ou admin.   |
| `test-driven-development`        | Testes Red de validators antes dos parsers de carrinho, pedido, usuário, frete e pagamento. | Manteve o ciclo Red → Green para as lacunas da Fase 4.               |
| `development`                    | Organização modular entre `src/domain`, `src/validators` e `src/lib/security`.              | Separou domínio, validação e sanitização reutilizável.               |
| `logic-lens`                     | Revisão de minimização de dados, centavos inteiros e rejeição de dados de cartão.           | Reduziu risco de XSS, inconsistência monetária e exposição de dados. |
| `documentation`                  | README, arquitetura, segurança e testes atualizados com os novos schemas.                   | Documentação reflete modelos e decisões técnicas alteradas.          |
| `verification-before-completion` | Suíte focada de validators e domínios executada após a implementação.                       | Evidência fresca antes dos checks finais obrigatórios.               |

## Uso Registrado: Fase 5 UI Base/Design System

| Skill                            | Evidência de uso                                                               | Impacto                                                              |
| -------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `speckit-implement`              | Execução limitada a T085-T098.                                                 | Manteve o escopo na UI base, sem catálogo, checkout, login ou admin. |
| `test-driven-development`        | Testes Red de tokens, controles, display, drawer, estados e app shell.         | UI base foi implementada após falha esperada dos testes.             |
| `design-taste-frontend`          | Tokens simples, layout mobile-first, foco visível e estados de UI.             | Visual ficou leve, prático e compatível com a marca.                 |
| `documentation`                  | README, arquitetura, testes e skills atualizados com assets e padrões visuais. | Estrutura visual e destino da logo ficaram documentados.             |
| `verification-before-completion` | Checks obrigatórios executados antes de sugerir commit.                        | Evidência de lint, tipos, testes, acessibilidade, build e formato.   |

## Uso Registrado: Fase 6 Home e SEO Base

| Skill                            | Evidência de uso                                                            | Impacto                                                                |
| -------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `speckit-implement`              | Execução limitada a T099-T108.                                              | Manteve o escopo em home e SEO, sem catálogo real, checkout ou admin.  |
| `test-driven-development`        | Testes Red de home, SEO, links sociais e E2E antes da implementação.        | Ciclo Red → Green aplicado à entrega da home.                          |
| `design-taste-frontend`          | Home simples, leve, mobile-first, com CTAs claros e placeholders seguros.   | Interface alinhada ao pedido de visual prático e feminino sem excesso. |
| `documentation`                  | README, arquitetura, testes e skills atualizados com SEO e dados pendentes. | Documentação reflete placeholders e rotas SEO criadas.                 |
| `verification-before-completion` | Checks obrigatórios previstos para a fase antes de sugerir commit.          | Encerramento condicionado à validação real dos comandos.               |

## Uso Registrado: Fase 7 Catálogo, Busca e Filtros

| Skill                            | Evidência de uso                                                                | Impacto                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `speckit-implement`              | Execução limitada a T109-T121.                                                  | Manteve o escopo em catálogo mockado, sem carrinho, checkout ou login.  |
| `test-driven-development`        | Testes Red de busca, serviço, UI, integração e E2E antes da implementação.      | Catálogo foi construído seguindo Red → Green → Refactor.                |
| `design-taste-frontend`          | Layout leve, filtros mobile-first e cards simples para catálogo.                | A experiência visual permaneceu prática, confiável e focada em celular. |
| `development`                    | Serviço com filtros, query params e seed local desacoplado da UI.               | Separação entre domínio, serviço, rota e componentes foi preservada.    |
| `documentation`                  | README e docs atualizados com seeds, mocks, rota `/catalog` e integração local. | Substituição futura dos dados temporários ficou documentada.            |
| `verification-before-completion` | Bateria completa de validação exigida pela fase antes de sugerir commit.        | Encerramento da fase ficou condicionado aos checks reais.               |

## Uso Registrado: Fase 8 Página de Produto

| Skill                            | Evidência de uso                                                                        | Impacto                                                                          |
| -------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `speckit-implement`              | Execução limitada a T122-T133.                                                          | Manteve o escopo em detalhe do produto, sem checkout, login ou admin.            |
| `test-driven-development`        | Testes Red de seleção de variação, detalhe, metadata, integração, E2E e acessibilidade. | A fase foi implementada em ciclo Red → Green → Refactor.                         |
| `design-taste-frontend`          | Layout mobile-first, galeria simples, variações claras e CTAs diretos.                  | A página ficou leve, prática e coerente com a estética já adotada.               |
| `development`                    | Separação entre domínio, serviço, UI, rota e SEO do detalhe.                            | Preservou coesão alta e baixo acoplamento para a evolução da Fase 9.             |
| `documentation`                  | README, arquitetura e testes atualizados com mocks, placeholders e fluxo do produto.    | Troca futura de dados mock por dados reais ficou registrada.                     |
| `verification-before-completion` | Checks obrigatórios da fase previstos antes de sugerir encerramento.                    | O fechamento da fase continua condicionado à evidência real dos comandos finais. |

## Uso Registrado: Revisão Visual do Storefront

| Skill                            | Evidência de uso                                                                 | Impacto                                                                                 |
| -------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `speckit-implement`              | Revisão profunda da implementação atual sem abrir escopo de backend marketplace. | Manteve o foco em storefront, UX e vitrine comercial.                                   |
| `test-driven-development`        | Testes Red primeiro para home, catálogo, produto e links reais de contato.       | A revisão visual foi guiada por comportamento verificável, não por ajuste cosmético.    |
| `design-taste-frontend`          | Hero comercial, vitrine, cards, navegação, galeria e composição mobile-first.    | A interface foi reposicionada para linguagem de loja de moda feminina mais convincente. |
| `development`                    | Refatoração modular entre config da loja, dados mock, componentes e serviços.    | Preservou separação entre UI, domínio, catálogo, SEO e WhatsApp.                        |
| `documentation`                  | README, arquitetura e testes atualizados com assets reais e contatos oficiais.   | A troca futura de dados temporários por dados comerciais finais ficou documentada.      |
| `verification-before-completion` | Lint, typecheck, testes focados, E2E e checagem visual manual antes de fechar.   | A revisão só avançou após evidência técnica e visual.                                   |

## Bibliotecas Obrigatórias da Revisão Visual

| Biblioteca                               | Uso real nesta revisão                                                 |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| `embla-carousel`, `embla-carousel-react` | Hero da home, carrossel de novidades e galeria do produto.             |
| `lucide-react`                           | Busca, menu, filtros, setas, WhatsApp, benefícios, navegação e rodapé. |
| `motion`                                 | Entrada suave de seções, hover de cards e transições do drawer.        |
| `@radix-ui/react-dialog`                 | Drawer mobile do menu e drawer de filtros do catálogo.                 |
| `@radix-ui/react-tabs`                   | Abas de detalhes, entrega e cuidados na página de produto.             |
| `@radix-ui/react-select`                 | Select acessível dos filtros.                                          |
| `@radix-ui/react-navigation-menu`        | Navegação desktop no header.                                           |
| `@radix-ui/react-slot`                   | Composição `asChild` nos botões.                                       |
| `clsx`                                   | Combinação segura de classes em `cn()`.                                |
| `class-variance-authority`               | Variantes de `Button`, `Badge` e `Card`.                               |
| `tailwind-merge`                         | Não se aplica nesta fase porque Tailwind não foi adotado.              |
| `tailwindcss-animate`                    | Não se aplica nesta fase porque Tailwind não foi adotado.              |
| `tailwindcss`, `@tailwindcss/postcss`    | Não instalados pela mesma decisão técnica acima.                       |

## Uso Registrado: Rodada Curta da Nova Logomarca

| Skill                            | Evidência de uso                                                                        | Impacto                                                                     |
| -------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `speckit-implement`              | Rodada limitada à identidade visual da logo, sem carrinho, checkout, login ou admin.    | Preservou o escopo funcional e manteve a melhoria concentrada em marca.     |
| `test-driven-development`        | Testes Red para header/footer, home e metadata antes da implementação.                  | A troca da logo foi guiada por comportamento verificável.                   |
| `design-taste-frontend`          | Ajustes de proporção, respiro, nitidez e presença da marca no header, footer e home.    | A nova logo ganhou leitura mais premium e artesanal sem redesenhar o site.  |
| `development`                    | Asset PNG copiado para `public/brand/` e referências centralizadas nos pontos públicos. | O arquivo original externo foi preservado e a versão pública ficou estável. |
| `documentation`                  | README, arquitetura, deployment e skills atualizados com origem/destino da nova logo.   | A logo oficial atual em `.png` ficou documentada para próximas rodadas.     |
| `verification-before-completion` | Validações obrigatórias da rodada executadas antes de solicitar autorização de commit.  | O encerramento ficou condicionado à evidência real dos comandos.            |
