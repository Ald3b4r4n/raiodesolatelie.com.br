# Research: MVP Inicial Ateliê Raios de Sol

**Feature**: `001-mvp-ecommerce`
**Date**: 2026-04-30
**Scope**: decisões técnicas para planejamento, sem implementação.

## Decision: Next.js App Router como framework principal

**Rationale**: a constituição exige Next.js porque o MVP precisa de SEO,
rotas server-side, operações sensíveis no backend da aplicação, integração com
Vercel e boa experiência mobile. App Router permite layouts por área, metadados
por página, server components quando útil e Server Actions/Route Handlers para
operações sensíveis.

**Alternatives considered**:

- React/Vite puro: rejeitado porque checkout, login, backoffice e SEO exigem
  backend e rotas server-side.
- Nuxt/Vue: tecnicamente viável, mas fora da escolha padrão definida pela
  constituição.

## Decision: TypeScript strict

**Rationale**: reduz erros em entidades de produto, pedido, pagamento, frete,
cupom, avaliação e roles. Também melhora contratos entre UI, domínio, services
e adapters Firebase.

**Alternatives considered**:

- JavaScript: rejeitado por menor segurança de tipos em fluxo de e-commerce.
- TypeScript sem strict: rejeitado por permitir lacunas em dados opcionais e
  estados de pedido/pagamento.

## Decision: pnpm como package manager recomendado

**Rationale**: lockfile determinístico, instalação rápida, bom suporte em CI e
boa experiência com projetos Next.js modernos.

**Alternatives considered**:

- npm: aceitável, mas mais lento em alguns cenários e menos eficiente em cache.
- yarn: aceitável, mas adiciona menos benefício para este escopo.

## Decision: Firebase Authentication + Cloud Firestore

**Rationale**: a constituição exige Firebase. Authentication cobre login de
cliente/admin; Firestore cobre catálogo, pedidos, cupons e avaliações com
regras de segurança testáveis no Emulator Suite.

**Alternatives considered**:

- Banco SQL externo: rejeitado para o MVP por contrariar stack obrigatória.
- Auth custom: rejeitado por aumentar risco de segurança e manutenção.

## Decision: Firebase Storage somente se necessário para imagens

**Rationale**: fotos de produtos podem exigir upload admin. Storage deve ser
ativado apenas quando necessário, com regras de tipo, tamanho e role admin.

**Alternatives considered**:

- Imagens em repositório: simples para assets estáticos, mas ruim para painel
  admin com cadastro de fotos.
- Serviço externo de imagens: fora do MVP sem necessidade clara.

## Decision: Roles por custom claims com fallback documentado

**Rationale**: custom claims são adequados para separar admin/customer em regras
e backend. O primeiro admin deve ser configurado por procedimento restrito.
Quando custom claims ainda não estiverem automatizadas, pode existir documento
server-only de roles apenas como etapa controlada e testada.

**Alternatives considered**:

- Campo `role` editável pelo cliente: rejeitado por risco de escalação.
- Endpoint público para promover admin: rejeitado; não deve existir de forma
  permanente.

## Decision: Vitest + Testing Library + Playwright + axe-core

**Rationale**: Vitest é rápido para unit/integration TypeScript; Testing
Library valida comportamento acessível de componentes; Playwright cobre fluxos
reais; axe-core automatiza parte da acessibilidade; Firebase Emulator Suite
cobre rules e integração local.

**Alternatives considered**:

- Jest: maduro, mas tende a exigir mais configuração em projetos modernos e é
  mais pesado para este MVP.
- Cypress: bom para E2E, mas Playwright cobre múltiplos navegadores e cenários
  mobile com menor atrito.

## Decision: PaymentService mockado no MVP

**Rationale**: pagamento Pix/cartão é requisito de produto, mas sem credenciais
reais o MVP deve usar contrato abstrato e mock testado. A aplicação não deve
armazenar dados de cartão nem acoplar UI a provider.

**Alternatives considered**:

- Integração real imediata: rejeitada sem credenciais/provedor.
- Remover pagamento do fluxo: rejeitado porque o checkout precisa prever forma
  de pagamento e status de pedido.

## Decision: ShippingService mockado com retirada local

**Rationale**: Correios exige provider/API e regras comerciais. O MVP deve
oferecer retirada local e contrato de cálculo de frete mockado, preparado para
troca futura.

**Alternatives considered**:

- Integração Correios imediata: rejeitada sem credenciais/API definida.
- Frete fixo hardcoded na UI: rejeitado por acoplamento e manutenção ruim.

## Decision: WhatsApp por serviço de geração de mensagem/link

**Rationale**: WhatsApp precisa funcionar para produto e carrinho, com texto
em português e dados corretos. Centralizar geração evita duplicação e permite
fallback para WhatsApp Web.

**Alternatives considered**:

- Links montados diretamente em componentes: rejeitado por duplicação e risco
  de divergência.

## Decision: Busca e filtros inicialmente em Firestore + lógica local controlada

**Rationale**: o MVP é pequeno. Busca por nome pode começar com campo
normalizado e filtros simples por categoria, preço e disponibilidade. Se o
catálogo crescer, uma busca dedicada pode ser planejada depois.

**Alternatives considered**:

- Search provider externo: fora do MVP.
- Busca client-side de todo catálogo sem limites: aceitável apenas para seed
  pequeno, mas deve ser controlada para não comprometer performance.

## Decision: Documentação como entrega de bootstrap

**Rationale**: README.md e docs são gate constitucional. Como ainda não existem,
devem ser criados antes ou junto da primeira implementação funcional.

**Alternatives considered**:

- Documentar apenas ao final do MVP: rejeitado pela constituição e risco de
  setup não reproduzível.

## Decision: Skills obrigatórias antes da implementação

**Rationale**: a constituição exige consultar, instalar e documentar skills do
antigravity-awesome-skills antes de implementar. O plano registra esse trabalho
como Fase 0.

**Alternatives considered**:

- Usar apenas skills locais atuais: insuficiente frente ao requisito explícito.

## Open Implementation Gates

- Fixar versões exatas de Node, Next.js, Firebase e ferramentas após consulta
  à documentação atual na Fase 0.
- Confirmar WhatsApp, redes sociais, produtos iniciais e dados de retirada.
- Definir provedor real de pagamento/frete em fase futura; MVP segue mockado.
