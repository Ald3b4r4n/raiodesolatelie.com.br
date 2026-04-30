# Testes

## Regra Central

Todo desenvolvimento deve seguir TDD:

1. Escrever teste Red antes da implementacao.
2. Confirmar falha pelo motivo esperado.
3. Implementar o minimo para Green.
4. Refatorar mantendo testes verdes.
5. Atualizar README e docs.
6. Rodar checks disponiveis antes de concluir.

## Ferramentas Planejadas

- Vitest para testes unitarios e parte dos testes de integracao.
- Testing Library para componentes React.
- Playwright para E2E.
- axe-core ou equivalente para acessibilidade.
- Firebase Emulator Suite e `@firebase/rules-unit-testing` para rules e
  integracao com Firebase.

## Camadas de Teste

- Unitarios: dominio, validadores, sanitizacao, rate limit, services puros.
- Componentes: renderizacao, acessibilidade, estados e interacoes.
- Integracao: Firebase adapters, services, Server Actions/Route Handlers.
- Security Rules: Firestore e Storage condicional.
- E2E: home, catalogo, produto, carrinho, checkout, login, admin, busca e
  filtros.
- Acessibilidade: fluxos principais com teclado, foco, labels e contraste.

## Comandos Planejados

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:unit
pnpm test:integration
pnpm test:rules
pnpm test:e2e
pnpm test:a11y
pnpm test:coverage
pnpm build
```

Esses comandos ainda nao existem na Fase 0 porque o app nao foi inicializado.

## CI

- Fase 2: CI basico/smoke para validar bootstrap, install limpo e scripts
  minimos disponiveis.
- Fase 14: CI completo com lint, typecheck, unit tests, integration tests,
  Firebase rules tests, E2E, build, audit e validacoes finais.

Isso respeita a constitution porque o CI completo continua obrigatorio antes da
conclusao da feature.

## Criterios Especificos do MVP

- Fluxos principais de carrinho devem cobrir pelo menos os cenarios definidos na
  spec.
- Busca/filtro devem ter validacao de resposta percebida em ate 2s quando
  aplicavel.
- Compra/carrinho devem ser avaliados para ate 4 acoes principais quando
  aplicavel.
- Firebase Security Rules devem ter testes antes das rules definitivas.
- Rate limit deve ser testado nos endpoints/actions sensiveis.
