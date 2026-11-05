import { describe, expect, it, vi } from "vitest";
import { buildLeadPayload, LEAD_ENDPOINT, sendLead, validateLead, type Lead } from "@/lib/leads";

const ok: Lead = {
  nombre: "Ana",
  mail: "ana@mail.com",
  whatsapp: "261 555 1234",
  area: "Todavía no sé",
};

describe("leads", () => {
  it("valida campos obligatorios", () => {
    expect(validateLead(ok)).toEqual({});
    const e = validateLead({ nombre: "", mail: "x", whatsapp: "12", area: "" });
    expect(Object.keys(e).sort()).toEqual(["area", "mail", "nombre", "whatsapp"]);
  });

  it("arma el mail con todos los datos", () => {
    const p = buildLeadPayload(ok);
    expect(p.Nombre).toBe("Ana");
    expect(p.WhatsApp).toBe("261 555 1234");
    expect(p["Área que le interesa"]).toBe("Todavía no sé");
    expect(p._replyto).toBe("ana@mail.com");
  });

  it("envía al endpoint y maneja errores", async () => {
    const f = vi.fn().mockResolvedValue({ ok: true });
    expect(await sendLead(ok, f as unknown as typeof fetch)).toBe(true);
    expect(f.mock.calls[0]?.[0]).toBe(LEAD_ENDPOINT);
    const bad = vi.fn().mockRejectedValue(new Error("x"));
    expect(await sendLead(ok, bad as unknown as typeof fetch)).toBe(false);
  });
});
