"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type DrawerProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export function Drawer({ children, isOpen, onClose, title }: DrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="drawer" role="presentation">
      <button
        className="drawer__backdrop"
        type="button"
        aria-label="Fechar menu"
        onClick={onClose}
      />
      <div className="drawer__panel" role="dialog" aria-modal="true" aria-label={title}>
        <div className="drawer__header">
          <h2>{title}</h2>
          <button
            className="drawer__close"
            type="button"
            onClick={onClose}
            ref={closeButtonRef}
          >
            Fechar
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
