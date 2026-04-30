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

- `creatéOrder`
- `quoteShipping`
- `applyCoupon`
- `submitReview`
- login e actions administrativas sensíveis

Os testes devem validar bloqueio/limitacao antes da implementação de cada
endpoint/action sensível.

## Firebase Security Rules

Rules devem cobrir:

- leitura pública apenas de produtos ativos;
- bloqueio de escrita pública em catálogo;
- cliente lendo apenas seus próprios pedidos;
- admin gerenciando produtos, pedidos, cupons e reviews;
- Storage ativo com admin-only upload e validações, ou deny-all se Storage não
  for usado.

Rules não substituem schemas server-side; ambas as camadas sao obrigatórias.

## Secrets e Variáveis

- Chaves públicas Firebase podem ficar em `NEXT_PUBLIC_` quando exigidas pelo
  client SDK.
- Service account, tokens e webhooks ficam apenas em ambiente seguro.
- `.env.example` não pode conter valores reais.
- Vercel deve armazenar secrets por ambiente.

## Retencao

A politica final depende de requisitos legais e operacionais. Padrao do MVP:

- pedidos: manter pelo tempo necessário para atendimento, suporte e obrigações
  legais;
- carrinho local: expirar ou limpar quando invalido;
- reviews rejeitadas: manter somente enquanto necessário para moderação;
- dados de perfil: mínimo necessário e editável pela cliente quando aplicável.
