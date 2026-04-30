# Deploy

## Plataforma

O deploy planejado e na Vercel, com previews por branch/PR e producao apos CI,
variaveis e Firebase estarem configurados.

## Estado Atual

- App Next.js inicial foi criado.
- Nenhum projeto Vercel foi linkado.
- Nenhum deploy foi executado.
- Nenhum `vercel.json` foi criado na Fase 1 porque o baseline padrao da Vercel
  para Next.js e suficiente neste momento. Criar `vercel.json` apenas quando
  houver configuracao real de rotas, headers, cron, regions ou build custom.

## Fluxo Planejado

```bash
pnpm install
pnpm build
vercel pull
vercel build
vercel deploy --prebuilt
```

Deploy real so deve ocorrer depois de:

- README e docs atualizados;
- secrets configuradas no ambiente correto;
- Firebase rules e indexes versionados;
- emuladores/testes executados;
- CI completo passando;
- pagamento/frete mockados claramente documentados ou providers reais definidos.

## Variaveis

Variaveis publicas podem ir para o cliente somente quando forem realmente
necessarias. Secrets server-side devem ficar no ambiente seguro da Vercel e
nunca no bundle.

Ambientes planejados:

- development/local;
- preview;
- production.

## CI

- Fase 2: workflow basico/smoke para validar bootstrap e scripts minimos.
- Fase 14: workflow completo com install limpo, lint, typecheck, unit tests,
  integration tests, Firebase rules tests, E2E, build e audit.

## Git

Configuracao esperada quando o usuario autorizar:

```bash
git remote add origin https://github.com/Ald3b4r4n/raiodesolatelie.com.br.git
git branch -M main
git push -u origin main
```

Commit, push e deploy dependem de autorizacao explicita do usuario.

## Rollback

Rollback deve usar historico de deployments da Vercel e commits identificaveis.
Antes de promover producao, registrar o build, ambiente, variaveis relevantes e
checks executados.
