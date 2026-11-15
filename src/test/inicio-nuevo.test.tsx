import { QueryClient } from "@tanstack/react-query";
import { RouterProvider, createMemoryHistory, createRouter } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";

async function abrir(path: string) {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [path] }),
    context: { queryClient: new QueryClient() },
  });
  await router.load();
  return render(<RouterProvider router={router} />);
}

beforeAll(() => {
  // jsdom no implementa scrollTo en elementos y la barra de secciones lo usa
  Element.prototype.scrollTo = () => {};
});

describe("Inicio", () => {
  it("las puertas son cuatro y Noticias vuelve a ser una de ellas", async () => {
    await abrir("/");
    const nav = await screen.findByRole("navigation", { name: "Elegí por dónde empezar" });
    const hrefs = Array.from(nav.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["/estudio", "/consultoria", "/salud", "/noticias", "/red"]);
  });

  it("la cadena enlaza cada área con su página (a pantalla completa y en celular)", async () => {
    await abrir("/");
    const grupos = await screen.findAllByRole("group", { name: /cuatro áreas de FNX/ });
    expect(grupos.length).toBe(2);
    for (const g of grupos) {
      const hrefs = Array.from(g.querySelectorAll("a")).map((x) => x.getAttribute("href"));
      expect(hrefs).toEqual(["/estudio", "/consultoria", "/salud", "/noticias"]);
    }
  });

  it("Noticias es una página y no una redirección", async () => {
    await abrir("/noticias");
    expect(await screen.findByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("no se usa la tipografía de la firma en los titulares", async () => {
    const { container } = await abrir("/");
    await screen.findByRole("navigation", { name: "Elegí por dónde empezar" });
    expect(container.querySelectorAll(".w-script")).toHaveLength(0);
  });
});
