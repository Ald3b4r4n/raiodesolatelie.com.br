# ADR 0003: Pagamento e Frete Mockados

**Status**: Aceita
**Data**: 2026-04-30

## Contexto

A cliente deseja Pix, cartao, Correios e retirada local, mas ainda nao existem
credenciais ou provider real definido para pagamento e frete.

## Decisao

Criar contratos de servico para pagamento e frete. No MVP inicial, usar mocks
testados para Pix/cartao e frete, mantendo retirada local disponivel quando
configurada.

## Alternativas Consideradas

- Integrar provider real agora: rejeitado sem credenciais e requisitos
  operacionais.
- Acoplar UI direto a APIs externas: rejeitado por manutencao e seguranca.
- Remover checkout do MVP: rejeitado porque venda direta pelo site e objetivo
  principal.

## Consequencias

- Checkout pode ser testado de ponta a ponta sem provider real.
- Producao nao deve prometer pagamento/frete real sem configuracao.
- Troca para provider real deve ocorrer dentro de adapters/services, sem
  refatorar UI.
