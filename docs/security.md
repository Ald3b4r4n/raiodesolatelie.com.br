# Segurança e Privacidade

## Principios

- Validar dados no frontend e no backend.
- Nunca depender apenas de validacao client-side.
- Aplicar menor privilegio nas Firebase Security Rules.
- Separar claramente cliente comum e admin.
- Proteger operacoes sensiveis com autorizacao, rate limit e validacao por
  schema.
- Coletar apenas dados pessoais tecnicamente necessarios.
- Nao expor secrets no frontend, README, logs ou bundle.

## Ameaças e Mitigações Iniciais

| Risco | Mitigacao planejada |
| --- | --- |
| Escrita publica em catalogo/pedidos | Firebase Security Rules com testes e operacoes sensiveis no backend. |
| Acesso indevido ao admin | Firebase Auth, roles/custom claims e protecao de rotas. |
| XSS em campos de produto/review | Sanitizacao/escaping de campos exibidos publicamente e testes especificos. |
| Abuso em checkout/cupom/review/login | Rate limit reutilizavel em actions/endpoints sensiveis. |
| Vazamento de secrets | Separacao de env publicas/privadas e revisao com `varlock`. |
| Upload inseguro | Storage condicional com rules de path, tipo e tamanho, ou deny-all. |
| Coleta excessiva de dados | Modelos minimos e documentacao de finalidade/retencao. |

## Roles

- `public`: visitante sem autenticacao; pode ler catalogo publico e avaliacoes
  aprovadas.
- `customer`: usuario autenticado; pode ler/editar seu perfil minimo e seus
  pedidos.
- `admin`: usuario autorizado; pode gerenciar produtos, pedidos, cupons e
  avaliacoes.
- `server`: backend com Firebase Admin SDK para operacoes sensiveis.

## Primeiro Admin

Nao deve existir endpoint publico permanente para promover usuarios a admin. A
estrategia preferida e aplicar custom claim por procedimento seguro, executado
em ambiente controlado, e documentado antes do uso. Qualquer fallback por
documento de role deve ser restrito, auditavel e removivel apos bootstrap.

## Dados Pessoais Minimos

| Dado | Quando coletar | Motivo | Armazenamento planejado |
| --- | --- | --- | --- |
| Nome | Checkout/pedido | Identificar atendimento do pedido | Snapshot do pedido e perfil minimo se necessario |
| E-mail | Login ou pedido | Autenticacao/contato | Firebase Auth e pedido quando necessario |
| Telefone | Checkout/WhatsApp | Contato sobre pedido | Pedido quando necessario |
| Endereco | Somente entrega | Envio do pedido | Pedido; nao salvar no perfil por padrao |
| Comentario de review | Opcional | Avaliacao do produto | Review pendente/aprovada apos moderacao |

Carrinho local nao deve armazenar dados pessoais. Dados de cartao nao devem ser
armazenados. Pagamento no MVP sera mockado por contrato abstrato.

## Rate Limit e Proteção Contra Abuso

Deve haver contrato reutilizavel para limitar abuso em:

- `createOrder`
- `quoteShipping`
- `applyCoupon`
- `submitReview`
- login e actions administrativas sensiveis

Os testes devem validar bloqueio/limitacao antes da implementacao de cada
endpoint/action sensivel.

## Firebase Security Rules

Rules devem cobrir:

- leitura publica apenas de produtos ativos;
- bloqueio de escrita publica em catalogo;
- cliente lendo apenas seus proprios pedidos;
- admin gerenciando produtos, pedidos, cupons e reviews;
- Storage ativo com admin-only upload e validacoes, ou deny-all se Storage nao
  for usado.

Rules nao substituem schemas server-side; ambas as camadas sao obrigatorias.

## Secrets e Variaveis

- Chaves publicas Firebase podem ficar em `NEXT_PUBLIC_` quando exigidas pelo
  client SDK.
- Service account, tokens e webhooks ficam apenas em ambiente seguro.
- `.env.example` nao pode conter valores reais.
- Vercel deve armazenar secrets por ambiente.

## Retencao

A politica final depende de requisitos legais e operacionais. Padrao do MVP:

- pedidos: manter pelo tempo necessario para atendimento, suporte e obrigacoes
  legais;
- carrinho local: expirar ou limpar quando invalido;
- reviews rejeitadas: manter somente enquanto necessario para moderacao;
- dados de perfil: minimo necessario e editavel pela cliente quando aplicavel.
