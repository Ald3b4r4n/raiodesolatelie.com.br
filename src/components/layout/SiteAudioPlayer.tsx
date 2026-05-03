"use client";

import { useRef, useState } from "react";

const MOONLIGHT_SONATA_SRC = "/audio/moonlight-sonata.mp3";

export function SiteAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [showBlockedHint, setShowBlockedHint] = useState(false);

  async function handleEntry() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    try {
      await audio.play();
      setShowBlockedHint(false);
      setIsVisible(false);
    } catch {
      setShowBlockedHint(true);
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
      {isVisible ? (
        <section
          aria-labelledby="site-audio-player-title"
          aria-modal="false"
          className="site-audio-player__welcome"
          role="dialog"
        >
          <div className="site-audio-player__accent" aria-hidden="true" />
          <p className="site-audio-player__eyebrow">Ateliê Raios de Sol</p>
          <h2 id="site-audio-player-title">Bem-vinda ao Ateliê Raios de Sol</h2>
          <p className="site-audio-player__copy">
            Preparamos uma chegada delicada para acompanhar sua entrada na coleção.
          </p>
          {showBlockedHint ? (
            <p className="site-audio-player__hint">
              Se algo impedir sua entrada agora, toque novamente para continuar.
            </p>
          ) : null}
          <button className="site-audio-player__action" onClick={handleEntry} type="button">
            Entrar no ateliê
          </button>
        </section>
      ) : null}
    </>
  );
}
