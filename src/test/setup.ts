import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// next/font/google is not available in Vitest/JSDOM; mock a minimal shape used by layout.tsx.
vi.mock("next/font/google", () => {
  function fontMock(options: { variable?: string } = {}) {
    return {
      className: "",
      style: {},
      variable: options.variable ?? ""
    };
  }

  return {
    Inter: fontMock,
    Outfit: fontMock,
    Playfair_Display: fontMock
  };
});

// Embla relies on matchMedia in the browser.
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    })
  });

  class IntersectionObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }

  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: IntersectionObserverMock
  });
  Object.defineProperty(globalThis, "IntersectionObserver", {
    writable: true,
    value: IntersectionObserverMock
  });

  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    value: ResizeObserverMock
  });
  Object.defineProperty(globalThis, "ResizeObserver", {
    writable: true,
    value: ResizeObserverMock
  });
}
