import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/ui/cn";

const cardVariants = cva("ui-card", {
  variants: {
    variant: {
      elevated: "ui-card--elevated",
      editorial: "ui-card--editorial",
      soft: "ui-card--soft"
    }
  },
  defaultVariants: {
    variant: "elevated"
  }
});

type CardProps = VariantProps<typeof cardVariants> & {
  children: ReactNode;
  title?: string;
  className?: string;
};

export function Card({ children, className, title, variant }: CardProps) {
  return (
    <section className={cn(cardVariants({ variant }), className)} aria-label={title}>
      {title ? <h2 className="ui-card__title">{title}</h2> : null}
      {children}
    </section>
  );
}
