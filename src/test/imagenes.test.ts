import { describe, expect, it } from "vitest";
import { GALERIA, IMG, newsImages } from "@/data/imagenes";
import { NOTICIAS } from "@/data/noticias";

describe("Fotos de noticias", () => {
  const map = newsImages(NOTICIAS);

  it("Marketing y Negocios usan la foto 12 (diarios)", () => {
    for (const n of NOTICIAS.filter((x) => x.category !== "Cannabis medicinal")) {
      expect(map[n.id]?.n).toBe(12);
    }
  });

  it("Cannabis medicinal alterna las fotos 13 y 14", () => {
    const nums = NOTICIAS.filter((x) => x.category === "Cannabis medicinal").map((n) => map[n.id]?.n);
    expect(nums.slice(0, 4)).toEqual([13, 14, 13, 14]);
  });
});

describe("Galería de Marca", () => {
  it("muestra las 15 fotos, sin repetir", () => {
    expect(GALERIA).toHaveLength(15);
    expect(new Set(GALERIA.map((g) => g.n)).size).toBe(15);
  });

  it("cada foto tiene texto alternativo", () => {
    for (const g of Object.values(IMG)) expect(g.alt.length).toBeGreaterThan(10);
  });
});
