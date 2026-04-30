# Skills do Projeto

**Feature**: `001-mvp-ecommerce`
**Data de instalacao**: 2026-04-30
**Catalogo consultado**: `https://github.com/sickn33/antigravity-awesome-skills`
**Snapshot local consultado**: commit `1a9f5ac388662b5e59696a99e2eaeb72032c35ed`
**Destino de instalacao**: `.agents/skills/`

## Resultado da Consulta

O catalogo foi consultado antes de qualquer bootstrap de app, conforme a
constitution v1.0.0. As skills foram selecionadas para cobrir desenvolvimento
fullstack, documentacao, TDD, Next.js App Router, Firebase, frontend
mobile-first, testes, seguranca, variaveis de ambiente, CI, Vercel e verificacao
antes de concluir features.

A instalacao nesta fase foi feita copiando os diretorios selecionados do
catalogo para `.agents/skills/`, preservando `SKILL.md` e arquivos auxiliares.
Nenhum `package.json` foi criado e nenhum app foi inicializado.

## Skills Selecionadas

| Skill | Risco do catalogo | Motivo de uso | Como ativar | Limitacoes conhecidas |
| --- | --- | --- | --- | --- |
| `development` | safe | Fluxo geral de desenvolvimento web/backend com pequenas entregas. | Referenciar a skill antes de tarefas de implementacao. | Generica; deve ser combinada com skills especificas. |
| `documentation` | safe | README, docs tecnicas, contratos e manutencao documental. | Usar em toda alteracao de feature/documentacao. | Nao substitui revisao de consistencia do Spec Kit. |
| `test-driven-development` | unknown | Reforcar Red -> Green -> Refactor em todas as features. | Usar antes de criar qualquer implementacao. | Requer validacao real dos testes pelo agente. |
| `nextjs-app-router-patterns` | safe | Padroes especificos de Next.js App Router. | Usar no bootstrap e rotas Server Components/Actions. | Precisa ser confirmada contra docs atuais quando houver duvida. |
| `firebase` | unknown | Firebase Auth, Firestore, rules, emuladores e integracao. | Usar em fases Firebase, Auth, rules e dados. | Contem exemplos de credenciais; nunca copiar valores reais para o repo. |
| `design-taste-frontend` | safe | UI mobile-first simples, responsiva e bem acabada. | Usar em design system, home, catalogo, produto e admin. | Deve respeitar UX simples, sem excesso visual. |
| `lambdatest-agent-skills` | safe | Planejamento de testes unitarios, E2E e acessibilidade. | Usar em infraestrutura de testes e fluxos criticos. | Dependencias externas so serao instaladas no bootstrap apropriado. |
| `context7-auto-research` | unknown | Consulta de documentacao atualizada de Next.js, Firebase e Vercel. | Usar quando houver decisao dependente de versao/documentacao. | Pode exigir acesso externo; registrar fonte consultada. |
| `varlock` | critical | Seguranca de variaveis de ambiente e secrets. | Usar em `.env.example`, env schema, Vercel e Firebase Admin. | Tratar como skill sensivel; revisar exemplos antes de aplicar. |
| `logic-lens` | safe | Revisao de bugs, anti-patterns, seguranca e regras de negocio. | Usar em services, checkout, rules, admin e revisoes. | Nao substitui testes automatizados. |
| `agentic-actions-auditor` | safe | Auditoria de GitHub Actions e CI. | Usar ao criar/alterar workflows. | CI completo so sera criado na fase final planejada. |
| `verification-before-completion` | unknown | Impedir conclusao sem validacao real. | Usar em checkpoints e encerramento de feature. | Depende dos comandos existirem no projeto. |
| `skill-scanner` | unknown | Avaliar riscos das skills antes de adocao. | Usar antes de instalar/adicionar novas skills. | Avaliacao heuristica; exige julgamento humano. |
| `security-auditor` | unknown | Revisao de ameacas, XSS, rate limit, roles e dados. | Usar nas fases de seguranca, checkout, admin e CI. | Pode apontar riscos que exigem priorizacao pelo escopo MVP. |
| `vercel-deployment` | safe | Preparacao de preview/producao na Vercel. | Usar em docs/deploy e fase de deploy. | Deploy real depende de env vars e CI completos. |
| `architecture-decision-records` | unknown | Criacao e manutencao de ADRs. | Usar em decisoes tecnicas relevantes. | ADR deve ser atualizado quando a decisao mudar. |

## Avaliacao de Segurança das Skills

Avaliacao inicial feita com leitura do catalogo, metadados `skills_index.json` e
busca heuristica por termos sensiveis. A maioria dos achados envolve exemplos de
variaveis, tokens ou comandos de instalacao dentro da documentacao das skills.
Nenhum script foi executado a partir das skills instaladas.

Pontos de atencao:

- `varlock` aparece como risco `critical` por lidar diretamente com secrets; sera
  usada apenas como guia de protecao e revisao.
- `firebase`, `vercel-deployment`, `security-auditor` e skills de teste podem
  conter exemplos de tokens/env vars; exemplos nunca devem virar valores reais.
- Novas skills so podem ser adicionadas apos nova avaliacao com `skill-scanner`.

## Uso por Tipo de Feature

| Tipo de feature | Skills obrigatorias/recomendadas |
| --- | --- |
| Bootstrap e estrutura | `development`, `documentation`, `test-driven-development`, `verification-before-completion` |
| Next.js App Router | `nextjs-app-router-patterns`, `context7-auto-research`, `development` |
| Firebase/Auth/Firestore | `firebase`, `security-auditor`, `logic-lens`, `varlock` |
| Firebase Security Rules | `firebase`, `lambdatest-agent-skills`, `logic-lens`, `security-auditor` |
| UI mobile-first | `design-taste-frontend`, `lambdatest-agent-skills`, `documentation` |
| Catalogo e produto | `test-driven-development`, `nextjs-app-router-patterns`, `design-taste-frontend`, `logic-lens` |
| Carrinho e WhatsApp | `test-driven-development`, `logic-lens`, `documentation` |
| Checkout, pedido, frete e pagamento mockados | `test-driven-development`, `security-auditor`, `logic-lens`, `firebase` |
| Login, roles e admin | `firebase`, `security-auditor`, `varlock`, `logic-lens` |
| Cupons e avaliacoes | `test-driven-development`, `security-auditor`, `logic-lens`, `lambdatest-agent-skills` |
| CI e auditoria | `agentic-actions-auditor`, `verification-before-completion`, `lambdatest-agent-skills` |
| Deploy Vercel | `vercel-deployment`, `varlock`, `agentic-actions-auditor` |
| ADRs e documentacao | `documentation`, `architecture-decision-records` |

## Skills Não Selecionadas Nesta Fase

- `nextjs-best-practices`: substituida por `nextjs-app-router-patterns`, mais
  especifica para a stack obrigatoria.
- Skills genericas de frontend: substituidas por `design-taste-frontend` para
  manter foco em UI mobile-first e simples.
- Skills de pagamento real: fora do MVP enquanto nao existirem credenciais e
  provedor definido.

## Evidencia de Instalacao

Diretorios instalados em `.agents/skills/`:

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

## Checkpoint T017

- `docs/skills.md`: criado.
- `README.md`: criado.
- `docs/setup.md`: criado.
- `docs/architecture.md`: criado.
- `docs/security.md`: criado.
- `docs/testing.md`: criado.
- `docs/firebase.md`: criado.
- `docs/deployment.md`: criado.
- `docs/decisions/`: criado com ADRs obrigatorias.
- Bootstrap de app: nao iniciado.
- Firebase: nao configurado.
- `package.json`: nao criado.
