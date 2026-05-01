type PriceProps = {
  amountInCents: number;
};

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

export function Price({ amountInCents }: PriceProps) {
  return <span className="ui-price">{priceFormatter.format(amountInCents / 100)}</span>;
}
