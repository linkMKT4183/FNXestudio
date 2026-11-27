import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { buildWhatsAppLink, type WhatsAppTopic } from "@/config/site";
import { SERVICIOS } from "@/data/servicios";
import { CIUDADES } from "@/data/ciudades";
import { NOTAS } from "@/data/notas";
import { serviceHead, cityHead, articleHead } from "@/lib/seo";

const sitemap = readFileSync("public/sitemap.xml", "utf8");

describe("SEO local de FNX Estudio", () => {
  it("cada servicio, ciudad y nota está en el sitemap", () => {
    const paths = [
      ...SERVICIOS.map((s) => s.path),
      ...CIUDADES.map((c) => c.path),
      "/notas",
      ...NOTAS.map((n) => `/notas/${n.slug}`),
    ];
    for (const path of paths) expect(sitemap).toContain(`<loc>https://fnxestudio.com${path}</loc>`);
  });

  it("los WhatsApp nuevos usan el número de FNX y su mensaje", () => {
    const topics: WhatsAppTopic[] = [
      "identidad",
      "audiovisual",
      "tienda",
      "redes",
      "estrategia",
      "registro",
      "mendoza",
      "sanjuan",
    ];
    for (const topic of topics) {
      const link = buildWhatsAppLink(topic);
      expect(link).toMatch(/^https:\/\/wa\.me\/5492616306508\?text=/);
      expect(decodeURIComponent(link!.split("text=")[1] ?? "")).toContain("vengo de la web");
    }
  });

  it("títulos únicos, con la ubicación correcta y JSON-LD válido", () => {
    const heads = [
      ...SERVICIOS.map(serviceHead),
      ...CIUDADES.map(cityHead),
      ...NOTAS.map(articleHead),
    ];
    const titles = heads.map((h) => (h.meta[0] as { title: string }).title);
    expect(new Set(titles).size).toBe(titles.length);
    for (const h of heads) {
      const ld = JSON.parse(h.scripts[0]!.children);
      expect(ld["@graph"].length).toBeGreaterThan(1);
      expect(h.links[0]!.href).toMatch(/^https:\/\/fnxestudio\.com\//);
    }
    for (const s of SERVICIOS)
      expect(s.description).toContain("Sedes en San Juan y Mendoza y trabajo en todo el país");
  });
});
