import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

export function Card({ children, className, title }: CardProps) {
  const classes = ["ui-card", className].filter(Boolean).join(" ");

  return (
    <section className={classes} aria-label={title}>
      {title ? <h2 className="ui-card__title">{title}</h2> : null}
      {children}
    </section>
  );
}
