# Ateliê Raios de Sol

Storefront mobile-first em Next.js para o Ateliê Raios de Sol, com foco em catálogo visual, novidades, página de produto e atendimento direto pelo WhatsApp.

## Estado atual

- Home comercial pronta, com hero, destaques, coleções e CTA de atendimento.
- Catálogo público em `/catalog` com busca e filtros.
- Página `/novidades` revisada como vitrine editorial:
  - mostra todas as fotos disponíveis dos produtos ativos;
  - usa enquadramento ajustado, sem corte nas imagens da vitrine;
  - mantém vitrine centralizada no desktop e controles completos no mobile;
  - mantém CTA para catálogo e WhatsApp;
  - possui testes unitários, E2E e acessibilidade.
- Página de produto em `/products/[slug]` com galeria, preço, variações e CTA.
- Botão global de voltar ao topo para melhorar navegação em páginas longas.

Ainda não estão concluídos: carrinho persistente completo, checkout final, login de cliente e painel admin.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript strict
- Firebase
- Embla Carousel
- Radix UI
- lucide-react
- motion
- Vitest + Testing Library
- Playwright + axe-core
- pnpm

## Requisitos

- Node.js
- pnpm
- Git

Para uso com Firebase local:

- Java 17
- Firebase CLI

## Como rodar

```bash
pnpm install
pnpm dev
```

App local:

```text
http://localhost:3000
```

## Deploy na Vercel

O projeto usa o fluxo padrão de Next.js na Vercel, sem `vercel.json`.

Se a build terminar com sucesso e a Vercel ainda mostrar `404: NOT_FOUND` no domínio principal, o problema tende a estar fora do código da aplicação, normalmente em um destes pontos:

- domínio/alias conectado ao projeto errado;
- domínio de produção ainda não atribuído ao deployment mais recente;
- acesso por uma URL antiga de outro projeto;
- configuração de ambiente da Vercel apontando para outro repositório/projeto.

Sinal importante: quando o log de build lista rotas como `/`, `/novidades` e `/catalog`, o app foi compilado corretamente e o erro costuma ser de roteamento da própria Vercel, não de ausência da página no Next.js.

## Comandos principais

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:unit
pnpm test:e2e
pnpm test:a11y
pnpm build
```

## Variáveis de ambiente

Exemplo mínimo:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

STORE_WHATSAPP_PHONE=61996632269
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_TIKTOK_URL=
```

## Estrutura

```text
src/
├── app/
├── components/
├── domain/
├── features/
├── lib/
├── services/
└── validators/

tests/
├── accessibility/
├── e2e/
├── integration/
└── unit/
```

## Documentação

- [Arquitetura](docs/architecture.md)
- [Testes](docs/testing.md)
- [Firebase](docs/firebase.md)
- [Deploy](docs/deployment.md)
- [Skills](docs/skills.md)

## Observações

- O catálogo atual ainda usa dados mockados centralizados em `src/services/firebase/catalog-mock-data.ts`.
- As imagens já são reais, mas nomes, preços e parte das descrições ainda podem ser refinados após validação da cliente.
- Commit e push só devem acontecer com autorização explícita do responsável pelo projeto.
