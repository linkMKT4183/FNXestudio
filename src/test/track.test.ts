import { afterEach, describe, expect, it, vi } from "vitest";
import { trackEvent } from "@/lib/track";

afterEach(() => {
  delete window.gtag;
  delete window.dataLayer;
});

describe("trackEvent", () => {
  it("llama a gtag con el evento y sus datos", () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    trackEvent("whatsapp_click", { topic: "general", page: "/" });
    expect(gtag).toHaveBeenCalledWith("event", "whatsapp_click", { topic: "general", page: "/" });
  });

  it("empuja el evento al dataLayer", () => {
    trackEvent("door_click", { area: "salud" });
    expect(window.dataLayer).toEqual([{ event: "door_click", area: "salud" }]);
  });

  it("no rompe si no hay analytics", () => {
    expect(() => trackEvent("email_click")).not.toThrow();
  });

  it("no rompe si gtag falla", () => {
    window.gtag = () => {
      throw new Error("x");
    };
    expect(() => trackEvent("instagram_click", { account: "estudio" })).not.toThrow();
  });
});
