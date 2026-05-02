# Deploy

## Plataforma

O deploy planejado e na Vercel, com previews por branch/PR e produção após CI,
variáveis e Firebase estarem configurados.

## Estado Atual

- App Next.js inicial foi criado.
- Nenhum projeto Vercel foi linkado.
- Nenhum deploy foi executado.
- A identidade visual oficial atual usa
  `public/brand/logo-identidade.png`, cópia pública otimizada a partir da origem
  externa preservada
  `D:\Projetos\raiodesolatelie.com.br\Imagens\logo_identidade.png`.
- Nenhum `vercel.json` foi criado na Fase 1 porque o baseline padrão da Vercel
  para Next.js e suficiente neste momento. Criar `vercel.json` apenas quando
  houver configuração real de rotas, headers, cron, regions ou build custom.

## Fluxo Planejado

```bash
pnpm install
pnpm build
vercel pull
vercel build
vercel deploy --prebuilt
```

Deploy real só deve ocorrer depois de:

- README e docs atualizados;
- secrets configuradas no ambiente correto;
- Firebase rules e indexes versionados;
- emuladores/testes executados;
- CI completo passando;
- pagamento/frete mockados claramente documentados ou providers reais definidos.

## Variáveis

Variáveis públicas podem ir para o cliente somente quando forem realmente
necessárias. Secrets server-side devem ficar no ambiente seguro da Vercel e
nunca no bundle.

Ambientes planejados:

- development/local;
- preview;
- production.

## CI

- Fase 2: workflow básico/smoke para validar bootstrap e scripts mínimos.
- Fase 14: workflow completo com install limpo, lint, typecheck, unit tests,
  integration tests, Firebase rules tests, E2E, build e audit.

O workflow atual em `.github/workflows/ci.yml` executa instalação limpa, lint,
typecheck e `pnpm test:smoke`. Ele não substitui o CI completo exigido antes da
conclusão da feature.

## Git

Configuração esperada quando o usuário autorizar:

```bash
git remote add origin https://github.com/Ald3b4r4n/raiodesolatelie.com.br.git
git branch -M main
git push -u origin main
```

Commit, push e deploy dependem de autorização explícita do usuário.

## Rollback

Rollback deve usar historico de deployments da Vercel e commits identificaveis.
Antes de promover produção, registrar o build, ambiente, variáveis relevantes e
checks executados.
