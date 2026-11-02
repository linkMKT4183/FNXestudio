import { describe, expect, it } from "vitest";
import { MANUAL_URL, WHATSAPP_NUMBER, buildWhatsAppLink } from "@/config/site";

describe("WhatsApp links", () => {
  it("returns no link while the number is empty", () => {
    expect(buildWhatsAppLink("marca", "")).toBeNull();
  });

  it("ships with an empty number for the owner to fill in", () => {
    expect(WHATSAPP_NUMBER).toBe("");
  });

  it("builds the brand message link", () => {
    expect(buildWhatsAppLink("marca", "5492611234567")).toBe(
      "https://wa.me/5492611234567?text=Hola%20FNX%2C%20quiero%20hacer%20crecer%20mi%20marca",
    );
  });

  it("builds the health message link", () => {
    expect(buildWhatsAppLink("salud", "5492611234567")).toBe(
      `https://wa.me/5492611234567?text=${encodeURIComponent("Hola FNX, necesito orientación en cannabis medicinal")}`,
    );
  });

  it("builds the consultoría message link", () => {
    expect(buildWhatsAppLink("consultoria", "5492611234567")).toBe(
      `https://wa.me/5492611234567?text=${encodeURIComponent("Hola FNX, necesito asesoría para mi proyecto agrícola o cannábico")}`,
    );
  });

  it("builds the news message link", () => {
    expect(buildWhatsAppLink("novedades", "+54 9 261 123-4567")).toBe(
      `https://wa.me/5492611234567?text=${encodeURIComponent("Hola FNX, quiero recibir novedades")}`,
    );
  });

  it("points the manual to the Canva link", () => {
    expect(MANUAL_URL).toBe("https://www.canva.com/d/SYr8B-ZM5BWGkRt");
  });
});
