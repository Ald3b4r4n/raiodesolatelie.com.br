# ADR 0001: Stack Next.js, Firebase e Vercel

**Status**: Aceita
**Data**: 2026-04-30

## Contexto

O projeto precisa de SEO, performance, rotas server-side, operacoes sensiveis no
backend, login, pedidos, painel admin simples, deploy rapido e boa experiencia
mobile.

## Decisao

Usar Next.js App Router com TypeScript strict, Firebase Authentication, Cloud
Firestore, Firebase Security Rules, Firebase Emulator Suite e Vercel.

## Alternativas Consideradas

- React/Vite puro: adequado para vitrine simples, mas menos direto para
  checkout, login, backend seguro e SEO server-side.
- Vue/Nuxt: tecnicamente possivel, mas fora da escolha padrao deste projeto.
- Backend custom separado: aumenta custo e complexidade para o MVP.

## Consequencias

- O projeto tem uma base coerente para SEO, Server Actions/Route Handlers,
  autenticacao e deploy.
- Firebase rules e emuladores viram parte obrigatoria da qualidade.
- O app deve cuidar para nao expor secrets no frontend.
- A stack pode evoluir para provedores reais de frete/pagamento por servicos
  isolados.
