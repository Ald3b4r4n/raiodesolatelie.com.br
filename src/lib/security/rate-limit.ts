export type RateLimitDecision = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

export type MemoryRateLimiterOptions = {
  maxAttempts: number;
  windowMs: number;
  now?: () => number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

export function createMemoryRateLimiter(options: MemoryRateLimiterOptions) {
  const buckets = new Map<string, Bucket>();
  const now = options.now ?? Date.now;

  return {
    check(key: string): RateLimitDecision {
      const currentTime = now();
      const currentBucket = buckets.get(key);

      if (!currentBucket || currentBucket.resetAt <= currentTime) {
        const resetAt = currentTime + options.windowMs;
        buckets.set(key, { count: 1, resetAt });

        return {
          allowed: true,
          remaining: Math.max(options.maxAttempts - 1, 0),
          resetAt
        };
      }

      if (currentBucket.count >= options.maxAttempts) {
        return {
          allowed: false,
          remaining: 0,
          resetAt: currentBucket.resetAt
        };
      }

      currentBucket.count += 1;

      return {
        allowed: true,
        remaining: Math.max(options.maxAttempts - currentBucket.count, 0),
        resetAt: currentBucket.resetAt
      };
    },
    reset(key: string): void {
      buckets.delete(key);
    }
  };
}
