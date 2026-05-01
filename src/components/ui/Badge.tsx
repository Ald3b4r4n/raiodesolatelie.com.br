import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/ui/cn";

const badgeVariants = cva("ui-badge", {
  variants: {
    variant: {
      warm: "ui-badge--warm",
      subtle: "ui-badge--subtle",
      outline: "ui-badge--outline"
    }
  },
  defaultVariants: {
    variant: "warm"
  }
});

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    children: ReactNode;
  };

export function Badge({ children, className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}
