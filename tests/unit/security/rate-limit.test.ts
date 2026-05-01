import { describe, expect, it } from "vitest";

import { createMemoryRateLimiter } from "@/lib/security/rate-limit";

describe("rate limit em memória", () => {
  it("bloqueia chave depois do limite dentro da janela", () => {
    const currentTime = 1_000;
    const limiter = createMemoryRateLimiter({
      maxAttempts: 2,
      windowMs: 60_000,
      now: () => currentTime
    });

    expect(limiter.check("ip:127.0.0.1").allowed).toBe(true);
    expect(limiter.check("ip:127.0.0.1").allowed).toBe(true);

    const blocked = limiter.check("ip:127.0.0.1");

    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.resetAt).toBe(61_000);
  });

  it("reinicia a janela depois do tempo configurado", () => {
    let currentTime = 1_000;
    const limiter = createMemoryRateLimiter({
      maxAttempts: 1,
      windowMs: 5_000,
      now: () => currentTime
    });

    expect(limiter.check("login:user@example.com").allowed).toBe(true);
    expect(limiter.check("login:user@example.com").allowed).toBe(false);

    currentTime = 6_500;

    expect(limiter.check("login:user@example.com").allowed).toBe(true);
  });
});
