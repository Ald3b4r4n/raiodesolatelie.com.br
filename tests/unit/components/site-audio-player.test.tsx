import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SiteAudioPlayer } from "@/components/layout/SiteAudioPlayer";

describe("site audio player", () => {
  it("tenta iniciar Moonlight Sonata automaticamente ao montar", async () => {
    const playMock = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockResolvedValueOnce(undefined);

    render(<SiteAudioPlayer />);

    const player = screen.getByLabelText(/moonlight sonata/i);

    expect(player).toHaveAttribute("src", "/audio/moonlight-sonata.mp3");
    expect(player).toHaveAttribute("loop");

    await waitFor(() => {
      expect(playMock).toHaveBeenCalledTimes(1);
    });

    expect(screen.queryByRole("button", { name: /tocar moonlight sonata/i })).not.toBeInTheDocument();
  });

  it("mostra fallback para tocar manualmente quando autoplay falha", async () => {
    const playMock = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockRejectedValueOnce(new DOMException("Autoplay blocked"))
      .mockResolvedValueOnce(undefined);

    render(<SiteAudioPlayer />);

    const action = await screen.findByRole("button", { name: /tocar moonlight sonata/i });

    expect(action).toBeInTheDocument();

    action.click();

    await waitFor(() => {
      expect(playMock.mock.calls.length).toBeGreaterThanOrEqual(2);
    });

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /tocar moonlight sonata/i })).not.toBeInTheDocument();
    });
  });
});
