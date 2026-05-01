# Segurança e Privacidade

## Princípios

- Validar dados no frontend e no backend.
- Nunca depender apenas de validação client-side.
- Aplicar menor privilégio nas Firebase Security Rules.
- Separar claramente cliente comum e admin.
- Proteger operações sensíveis com autorização, rate limit e validação por
  schema.
- Coletar apenas dados pessoais tecnicamente necessários.
- Não expor secrets no frontend, README, logs ou bundle.

## Ameaças e Mitigações Iniciais

| Risco                                | Mitigação planejada                                                        |
| ------------------------------------ | -------------------------------------------------------------------------- |
| Escrita pública em catálogo/pedidos  | Firebase Security Rules com testes e operações sensíveis no backend.       |
| Acesso indevido ao admin             | Firebase Auth, roles/custom claims e proteção de rotas.                    |
| XSS em campos de produto/review      | Sanitização/escaping de campos exibidos publicamente e testes específicos. |
| Abuso em checkout/cupom/review/login | Rate limit reutilizável em actions/endpoints sensíveis.                    |
| Vazamento de secrets                 | Separação de env públicas/privadas e revisão com `varlock`.                |
| Upload inseguro                      | Storage condicional com rules de path, tipo e tamanho, ou deny-all.        |
| Coleta excessiva de dados            | Modelos mínimos e documentação de finalidade/retenção.                     |

## Sanitização e Schemas

- Campos públicos de produto, variação, categoria, carrinho persistido, snapshot
  de pedido, cupom, avaliação e opção de entrega devem ser sanitizados antes de
  exibição.
- A sanitização reutilizável foi centralizada em `src/lib/security/sanitize.ts`.
- Schemas de validação em `src/validators/` cobrem as entidades de domínio da
  Fase 4 e garantem consistência antes das actions e services.
- Valores monetários são validados como inteiros em centavos; quantidades,
  estoque, notas e ordenações usam inteiros dentro dos limites do domínio.
- `PaymentSession` rejeita campos sensíveis de cartão, como número, CVV e data
  de validade. O provider permitido nesta fase é apenas `mock`.
- `CustomerProfile` não persiste endereço por padrão, e schemas de pedido/perfil
  não preservam CPF/CNPJ recebido indevidamente no payload.

## Roles

- `public`: visitante sem autenticação; pode ler catálogo público e avaliações
  aprovadas.
- `customer`: usuário autenticado; pode ler/editar seu perfil mínimo e seus
  pedidos.
- `admin`: usuário autorizado; pode gerenciar produtos, pedidos, cupons e
  avaliações.
- `server`: backend com Firebase Admin SDK para operações sensíveis.

## Primeiro Admin

Não deve existir endpoint público permanente para promover usuários a admin. A
estratégia preferida é aplicar custom claim por procedimento seguro, executado
em ambiente controlado, e documentado antes do uso. Qualquer fallback por
documento de role deve ser restrito, auditável e removível após bootstrap.

## Dados Pessoais Mínimos

| Dado                 | Quando coletar    | Motivo                            | Armazenamento planejado                          |
| -------------------- | ----------------- | --------------------------------- | ------------------------------------------------ |
| Nome                 | Checkout/pedido   | Identificar atendimento do pedido | Snapshot do pedido e perfil mínimo se necessário |
| E-mail               | Login ou pedido   | Autenticação/contato              | Firebase Auth e pedido quando necessário         |
| Telefone             | Checkout/WhatsApp | Contato sobre pedido              | Pedido quando necessário                         |
| Endereço             | Somente entrega   | Envio do pedido                   | Pedido; não salvar no perfil por padrão          |
| Comentário de review | Opcional          | Avaliação do produto              | Review pendente/aprovada após moderação          |

Carrinho local não deve armazenar dados pessoais. Dados de cartão não devem ser
armazenados. Pagamento no MVP será mockado por contrato abstrato.

## Rate Limit e Proteção Contra Abuso

Deve haver contrato reutilizável para limitar abuso em:

- `createOrder`
- `quoteShipping`
- `applyCoupon`
- `submitReview`
- login e actions administrativas sensíveis

Os testes devem validar bloqueio/limitação antes da implementação de cada
endpoint/action sensível.

Na Fase 3 foi criado `src/lib/security/rate-limit.ts`, um contrato em memória
para testes e desenvolvimento. Ele será aplicado às Server Actions/endpoints
sensíveis nas fases em que essas operações forem implementadas.

## Firebase Security Rules

Rules devem cobrir:

- leitura pública apenas de produtos ativos;
- bloqueio de escrita pública em catálogo;
- cliente lendo apenas seus próprios pedidos;
- admin gerenciando produtos, pedidos, cupons e reviews;
- Storage ativo com upload apenas para admin e validações, ou deny-all se
  Storage não for usado.

Na Fase 3, `firebase/firestore.rules` cobre catálogo público ativo, bloqueio de
escrita pública, leitura de pedidos próprios, permissões admin para produtos,
pedidos, cupons e avaliações, além de bloqueio de `userRoles` no client SDK.
`firebase/storage.rules` permanece deny-all porque Storage não está ativo no
MVP inicial.

Rules não substituem schemas server-side; ambas as camadas são obrigatórias.

## Primeiro Admin

O primeiro admin deve ser configurado por custom claim usando Firebase Admin SDK
em ambiente controlado. O processo recomendado é:

1. Criar a conta da administradora no Firebase Authentication.
2. Executar um script local/CI restrito, fora do bundle frontend, usando service
   account segura.
3. Aplicar `admin: true` no UID da administradora.
4. Registrar data, responsável e UID em canal interno seguro, sem commit de
   secrets.
5. Remover ou manter o script sem credenciais e sem endpoint público.

Não foi criado endpoint público de promoção de admin.

## Secrets e Variáveis

- Chaves públicas Firebase podem ficar em `NEXT_PUBLIC_` quando exigidas pelo
  client SDK.
- Service account, tokens e webhooks ficam apenas em ambiente seguro.
- `.env.example` não pode conter valores reais.
- Vercel deve armazenar secrets por ambiente.

## Retenção

A política final depende de requisitos legais e operacionais. Padrão do MVP:

- pedidos: manter pelo tempo necessário para atendimento, suporte e obrigações
  legais;
- carrinho local: expirar ou limpar quando inválido;
- reviews rejeitadas: manter somente enquanto necessário para moderação;
- dados de perfil: mínimo necessário e editável pela cliente quando aplicável.
