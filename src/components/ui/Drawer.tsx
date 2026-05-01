"use client";

import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type DrawerProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
};

export function Drawer({ children, description, isOpen, onClose, title }: DrawerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => (!open ? onClose() : null)}>
      <AnimatePresence>
        {isOpen ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                animate={{ opacity: 1 }}
                className="drawer__backdrop"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="drawer__panel"
                exit={{ opacity: 0, x: reduceMotion ? 0 : 24 }}
                initial={{ opacity: 0, x: reduceMotion ? 0 : 24 }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
              >
                <div className="drawer__header">
                  <div className="drawer__heading">
                    <Dialog.Title>{title}</Dialog.Title>
                    {description ? (
                      <Dialog.Description>{description}</Dialog.Description>
                    ) : null}
                  </div>
                  <Dialog.Close className="drawer__close" aria-label="Fechar painel">
                    <X aria-hidden="true" />
                  </Dialog.Close>
                </div>
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
