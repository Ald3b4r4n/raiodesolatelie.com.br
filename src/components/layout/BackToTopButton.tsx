"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const VISIBILITY_OFFSET = 480;

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const syncVisibility = () => {
      setIsVisible(window.scrollY > VISIBILITY_OFFSET);
    };

    syncVisibility();
    window.addEventListener("scroll", syncVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncVisibility);
    };
  }, []);

  return (
    <button
      aria-label="Voltar ao topo"
      className="back-to-top-button"
      data-visible={isVisible ? "true" : "false"}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      tabIndex={isVisible ? 0 : -1}
      type="button"
    >
      <ArrowUp aria-hidden="true" size={18} strokeWidth={2.2} />
      <span className="sr-only">Voltar ao topo</span>
    </button>
  );
}
