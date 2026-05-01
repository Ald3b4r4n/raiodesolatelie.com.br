"use client";

import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

type EmblaCarouselProps = {
  label: string;
  slides: ReactNode[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  className?: string;
};

export function EmblaCarousel({ label, slides, options, className }: EmblaCarouselProps) {
  const [viewportRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const canLoop = Boolean(options?.loop);
  const carouselId = useMemo(() => {
    return `carousel-${label.toLowerCase().replace(/\s+/g, "-")}`;
  }, [label]);

  const updateState = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const handleReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      updateState(emblaApi);
    };

    const handleSelect = () => updateState(emblaApi);

    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleReInit);

    // Inicializacao via callback async para satisfazer react-hooks/set-state-in-effect.
    const timer = window.setTimeout(handleReInit, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [emblaApi, updateState]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <section
      aria-label={label}
      aria-roledescription="carrossel"
      className={className ? `embla ${className}` : "embla"}
    >
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container" id={carouselId}>
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <button
          className="embla__arrow"
          type="button"
          aria-controls={carouselId}
          aria-label="Slide anterior"
          onClick={scrollPrev}
        >
          <ChevronLeft aria-hidden="true" focusable="false" />
        </button>
        <div className="embla__dots" role="tablist" aria-label="Selecionar slide">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              className={
                index === selectedIndex ? "embla__dot is-selected" : "embla__dot"
              }
              aria-label={`Ir para slide ${index + 1}`}
              aria-selected={index === selectedIndex}
              role="tab"
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
        <button
          className="embla__arrow"
          type="button"
          aria-controls={carouselId}
          aria-label="Próximo slide"
          onClick={scrollNext}
        >
          <ChevronRight aria-hidden="true" focusable="false" />
        </button>
      </div>

      {canLoop ? <span className="sr-only">Carrossel em loop</span> : null}
    </section>
  );
}
