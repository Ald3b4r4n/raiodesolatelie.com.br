"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type ProductGalleryCarouselProps = {
  productName: string;
  imageUrls: string[];
};

export function ProductGalleryCarousel({
  productName,
  imageUrls
}: ProductGalleryCarouselProps) {
  const [mainRef, mainApi] = useEmblaCarousel({ loop: false });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const galleryId = useMemo(
    () => `gallery-${productName.toLowerCase().replace(/\s+/g, "-")}`,
    [productName]
  );

  const onSelect = useCallback(() => {
    if (!mainApi) {
      return;
    }
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbApi?.scrollTo(index);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) {
      return;
    }
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);

    // Inicializacao via callback async para satisfazer react-hooks/set-state-in-effect.
    const timer = window.setTimeout(onSelect, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [mainApi, onSelect]);

  const scrollPrev = useCallback(() => mainApi?.scrollPrev(), [mainApi]);
  const scrollNext = useCallback(() => mainApi?.scrollNext(), [mainApi]);

  const scrollTo = useCallback(
    (index: number) => {
      mainApi?.scrollTo(index);
    },
    [mainApi]
  );

  if (imageUrls.length === 0) {
    return (
      <div className="product-gallery__fallback">
        Não foi possível carregar as fotos deste produto agora.
      </div>
    );
  }

  return (
    <section
      aria-label="Fotos do produto"
      aria-roledescription="carrossel"
      className="gallery"
    >
      <div className="gallery__main">
        <div className="gallery__viewport" ref={mainRef}>
          <div className="gallery__container" id={galleryId}>
            {imageUrls.map((imageUrl, index) => (
              <div className="gallery__slide" key={imageUrl}>
                <Image
                  alt={`${productName} - foto ${index + 1}`}
                  className="gallery__image"
                  height={1200}
                  sizes="(max-width: 719px) calc(100vw - 4.3rem), (max-width: 1039px) calc(100vw - 5.8rem), 670px"
                  src={imageUrl}
                  width={1200}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="gallery__arrow gallery__arrow--prev"
          aria-controls={galleryId}
          aria-label="Foto anterior"
          onClick={scrollPrev}
        >
          <ChevronLeft aria-hidden="true" focusable="false" />
        </button>
        <button
          type="button"
          className="gallery__arrow gallery__arrow--next"
          aria-controls={galleryId}
          aria-label="Próxima foto"
          onClick={scrollNext}
        >
          <ChevronRight aria-hidden="true" focusable="false" />
        </button>
      </div>

      <div className="gallery__thumbs" aria-label="Miniaturas" ref={thumbRef}>
        <div className="gallery__thumbs-container">
          {imageUrls.map((imageUrl, index) => (
            <button
              key={`${imageUrl}-thumb`}
              type="button"
              className={
                index === selectedIndex ? "gallery__thumb is-selected" : "gallery__thumb"
              }
              aria-label={`Ver foto ${index + 1}`}
              aria-current={index === selectedIndex}
              onClick={() => scrollTo(index)}
            >
              <Image
                alt=""
                aria-hidden="true"
                className="gallery__thumb-image"
                height={240}
                sizes="5.6rem"
                src={imageUrl}
                width={240}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
