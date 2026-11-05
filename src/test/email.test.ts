import { describe, expect, it } from "vitest";
import { EMAILS, buildMailtoLink } from "@/config/site";

describe("Email links", () => {
  it("uses the Estudio address with a prefilled subject", () => {
    expect(buildMailtoLink("estudio", "marca")).toBe(
      `mailto:${EMAILS.estudio}?subject=${encodeURIComponent("Quiero hacer crecer mi marca")}`,
    );
  });
  it("uses the Salud address for Salud", () => {
    expect(buildMailtoLink("salud", "salud")).toMatch(/^mailto:fnxsalud@gmail\.com\?subject=/);
  });
});
