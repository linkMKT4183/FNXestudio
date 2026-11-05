import { describe, expect, it } from "vitest";
import { GALERIA } from "@/data/galeria";
import { IMG } from "@/data/imagenes";
import { NOTICIAS } from "@/data/noticias";

describe("Fotos de noticias", () => {
  it("cada noticia tiene su propia foto, sin repetir", () => {
    const ids = NOTICIAS.map((n) => n.image.id);
    expect(new Set(ids).size).toBe(NOTICIAS.length);
  });

  it("las fotos de noticias son del área Noticias", () => {
    for (const n of NOTICIAS) expect(n.image.area).toBe("noticias");
  });
});

describe("Galería de Marca", () => {
  it("muestra todas las fotos del sitio una sola vez", () => {
    const all = Object.values(IMG);
    expect(GALERIA).toHaveLength(all.length);
    expect(new Set(GALERIA.map((g) => g.id)).size).toBe(all.length);
  });

  it("cada noticia aparece con el título de la noticia", () => {
    const expo = GALERIA.find((g) => g.id === IMG.nExpo.id);
    expect(expo?.label).toBe("Noticia: Expo Cannabis 2026: más de 300 marcas en La Rural");
  });

  it("cada foto tiene texto alternativo", () => {
    for (const g of Object.values(IMG)) expect(g.alt.length).toBeGreaterThan(10);
  });
});

describe("Fotos de Consultoría", () => {
  it("hay diecisiete fotos de Consultoría y todas están en la galería", () => {
    const ids = Object.values(IMG)
      .filter((i) => i.area === "consultoria")
      .map((i) => i.id);
    expect(ids).toHaveLength(17);
    for (const id of ids) expect(GALERIA.find((g) => g.id === id)?.area).toBe("consultoria");
  });
});
