import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/ui/cn";

export const buttonVariants = cva("ui-button", {
  variants: {
    variant: {
      primary: "ui-button--primary",
      secondary: "ui-button--secondary",
      ghost: "ui-button--ghost",
      quiet: "ui-button--quiet"
    },
    size: {
      sm: "ui-button--sm",
      md: "ui-button--md",
      lg: "ui-button--lg"
    },
    width: {
      auto: "",
      full: "ui-button--full"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    width: "auto"
  }
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  };

export function Button({
  asChild = false,
  children,
  className,
  disabled,
  isLoading = false,
  size,
  type = "button",
  variant,
  width,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      aria-busy={isLoading || undefined}
      aria-label={isLoading ? "Salvando" : props["aria-label"]}
      className={cn(buttonVariants({ variant, size, width }), className)}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? "Salvando..." : children}
    </Comp>
  );
}
