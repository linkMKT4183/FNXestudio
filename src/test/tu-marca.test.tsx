import { describe, expect, it } from "vitest";
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
describe("/tu-marca página", () => {
  it("renderiza el titular", () => {
    render(<TuMarca />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Tu marca pasa desapercibida.");
  });
});
