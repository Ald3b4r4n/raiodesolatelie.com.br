import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string | undefined;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

export function ExternalLink({ href, className, children, ...rest }: ExternalLinkProps) {
  if (!href) {
    return null;
  }

  return (
    <a
      {...rest}
      className={className}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
