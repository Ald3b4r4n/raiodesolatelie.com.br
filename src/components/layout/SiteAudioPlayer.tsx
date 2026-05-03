"use client";

import { useEffect, useRef, useState } from "react";

const MOONLIGHT_SONATA_SRC = "/audio/moonlight-sonata.mp3";

export function SiteAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.play().catch(() => {
      setShowFallback(true);
    });
  }, []);

  async function handleManualPlay() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      await audio.play();
      setShowFallback(false);
    } catch {
      setShowFallback(true);
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        aria-label="Moonlight Sonata de Beethoven"
        className="site-audio-player"
        loop
        preload="none"
        src={MOONLIGHT_SONATA_SRC}
      />
      {showFallback ? (
        <button
          className="site-audio-player__fallback"
          onClick={handleManualPlay}
          type="button"
        >
          Tocar Moonlight Sonata
        </button>
      ) : null}
    </>
  );
}
