# ADR 0001: Stack Next.js, Firebase e Vercel

**Status**: Aceita
**Data**: 2026-04-30

## Contexto

O projeto precisa de SEO, performance, rotas server-side, operações sensíveis no
backend, login, pedidos, painel admin simples, deploy rápido e boa experiência
mobile.

## Decisão

Usar Next.js App Router com TypeScript strict, Firebase Authentication, Cloud
Firestore, Firebase Security Rules, Firebase Emulator Suite e Vercel.

## Alternativas Consideradas

- React/Vite puro: adequado para vitrine simples, mas menos direto para
  checkout, login, backend seguro e SEO server-side.
- Vue/Nuxt: tecnicamente possível, mas fora da escolha padrão deste projeto.
- Backend custom separado: aumenta custo e complexidade para o MVP.

## Consequências

- O projeto tem uma base coerente para SEO, Server Actions/Route Handlers,
  autenticação e deploy.
- Firebase rules e emuladores viram parte obrigatória da qualidade.
- O app deve cuidar para não expor secrets no frontend.
- A stack pode evoluir para provedores reais de frete/pagamento por serviços
  isolados.
