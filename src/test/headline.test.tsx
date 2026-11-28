import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Headline } from "@/components/fnx/primitives";

describe("Headline animado", () => {
  it("conserva el texto completo para lectores de pantalla", () => {
    render(<Headline as="h1" lead="Tu marca" accent="pasa desapercibida." />);
    const h = screen.getByRole("heading", { level: 1, name: "Tu marca pasa desapercibida." });
    expect(h.textContent).toBe("Tu marca pasa desapercibida.");
  });

  it("las palabras animadas no se leen una por una", () => {
    const { container } = render(<Headline lead="Hola" accent="mundo." />);
    const palabras = container.querySelectorAll(".w-reveal");
    expect(palabras).toHaveLength(2);
    palabras.forEach((p) => expect(p.closest("[aria-hidden='true']")).not.toBeNull());
  });

  it("cada palabra entra desde una máscara", () => {
    const { container } = render(<Headline lead="Hola" accent="mundo." />);
    expect(container.querySelectorAll(".w-mask > .w-reveal")).toHaveLength(2);
  });

  it("la parte en color lleva el brillo y el subrayado opcional", () => {
    const { container } = render(<Headline lead="Tu" accent="marca visible" underline />);
    expect(container.querySelectorAll(".w-accent")).toHaveLength(2);
    expect(container.querySelectorAll(".u-draw")).toHaveLength(1);
  });

  it("el titular principal (h1) ya viene visible para que se vea enseguida", () => {
    render(<Headline as="h1" lead="Tu marca" accent="visible." />);
    const h = screen.getByRole("heading", { level: 1 });
    expect(h.className).toContain("is-visible");
    expect(h.className).toContain("headline-pronto");
  });
});
