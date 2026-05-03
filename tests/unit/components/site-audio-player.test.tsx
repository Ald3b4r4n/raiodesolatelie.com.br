import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SiteAudioPlayer } from "@/components/layout/SiteAudioPlayer";

describe("site audio player", () => {
  it("mostra uma saudacao discreta e inicia o audio quando a cliente entra na experiencia", async () => {
    const playMock = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValueOnce(undefined);

    render(<SiteAudioPlayer />);

    const player = screen.getByLabelText(/moonlight sonata/i);
    const toast = screen.getByRole("dialog", { name: /bem-vinda ao ateliê raios de sol/i });
    const action = screen.getByRole("button", { name: /entrar no ateliê/i });

    expect(player).toHaveAttribute("src", "/audio/moonlight-sonata.mp3");
    expect(player).toHaveAttribute("loop");
    expect(toast).toHaveTextContent(/preparamos uma chegada delicada/i);
    expect(playMock).not.toHaveBeenCalled();

    fireEvent.click(action);

    await waitFor(() => {
      expect(playMock).toHaveBeenCalledTimes(1);
    });

    expect(screen.queryByRole("dialog", { name: /bem-vinda ao ateliê raios de sol/i })).not.toBeInTheDocument();
  });

  it("mantem a saudacao visivel quando o navegador bloqueia a reproducao", async () => {
    const playMock = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockRejectedValueOnce(new DOMException("Autoplay blocked"));

    render(<SiteAudioPlayer />);

    fireEvent.click(screen.getByRole("button", { name: /entrar no ateliê/i }));

    await waitFor(() => {
      expect(playMock.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    expect(screen.getByRole("dialog", { name: /bem-vinda ao ateliê raios de sol/i })).toBeInTheDocument();
    expect(screen.getByText(/se algo impedir sua entrada/i)).toBeInTheDocument();
  });
});
