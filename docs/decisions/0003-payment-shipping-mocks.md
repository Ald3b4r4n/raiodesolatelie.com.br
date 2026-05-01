# ADR 0003: Pagamento e Frete Mockados

**Status**: Aceita
**Data**: 2026-04-30

## Contexto

A cliente deseja Pix, cartão, Correios e retirada local, mas ainda não existem
credenciais ou provider real definido para pagamento e frete.

## Decisão

Criar contratos de serviço para pagamento e frete. No MVP inicial, usar mocks
testados para Pix/cartão e frete, mantendo retirada local disponível quando
configurada.

## Alternativas Consideradas

- Integrar provider real agora: rejeitado sem credenciais e requisitos
  operacionais.
- Acoplar UI direto a APIs externas: rejeitado por manutenção e segurança.
- Remover checkout do MVP: rejeitado porque venda direta pelo site e objetivo
  principal.

## Consequências

- Checkout pode ser testado de ponta a ponta sem provider real.
- Produção não deve prometer pagamento/frete real sem configuração.
- Troca para provider real deve ocorrer dentro de adapters/services, sem
  refatorar UI.
