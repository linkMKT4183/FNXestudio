import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PruebaMarca, resultadoMarca } from "@/components/tu-marca/PruebaMarca";

describe("/tu-marca prueba", () => {
  it("muestra Te pasan 2 de 5 al marcar 2 señales", () => {
    render(<PruebaMarca />);
    expect(screen.getByText(/Te pasan/).textContent).toBe("Te pasan 0 de 5");
    fireEvent.click(screen.getByLabelText(/Identidad/));
    fireEvent.click(screen.getByLabelText(/Tienda/));
    expect(screen.getByText(/Te pasan/).textContent).toBe("Te pasan 2 de 5");
    expect(screen.getByText(/margen para crecer/)).toBeTruthy();
  });

  it("con 0 o 1 señales dice Vas bien", () => {
    expect(resultadoMarca(1)).toMatch(/^Vas bien/);
    expect(resultadoMarca(2)).toMatch(/^Tu marca tiene margen/);
  });
});

import { TuMarca } from "@/routes/tu-marca";
  // embla (el carrusel) necesita IntersectionObserver; jsdom no lo trae. Solo se simula en este bloque.
  beforeAll(() => {
    class IO {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IO;
    (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = IO;
    HTMLMediaElement.prototype.pause = () => {};
    HTMLMediaElement.prototype.play = () => Promise.resolve();
  });
  afterAll(() => {
    delete (globalThis as unknown as { IntersectionObserver?: unknown }).IntersectionObserver;
    delete (globalThis as unknown as { ResizeObserver?: unknown }).ResizeObserver;
  });describe("/tu-marca página", () => {

  it("renderiza el titular", () => {
    render(<TuMarca />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Tu marca pasa desapercibida.");
  });
});

describe("carrusel animado", () => {
  it("tiene las 9 placas, sin repetir el titular, con el botón de WhatsApp abajo", () => {
    render(<TuMarca />);
    expect(screen.getAllByRole("group", { name: /de 9:/ }).length).toBe(9);
    expect(screen.queryByText(/Uno que se destaca/)).toBeNull();
    expect(screen.getAllByText("Escribinos por WhatsApp").length).toBeGreaterThan(0);
  });
});
