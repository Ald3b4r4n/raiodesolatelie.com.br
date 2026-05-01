import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  children,
  className,
  disabled,
  isLoading = false,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = ["ui-button", `ui-button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      type={type}
      aria-busy={isLoading || undefined}
      aria-label={isLoading ? "Salvando" : props["aria-label"]}
      {...props}
    >
      {isLoading ? "Salvando..." : children}
    </button>
  );
}
