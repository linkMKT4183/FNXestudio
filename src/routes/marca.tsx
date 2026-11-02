import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Esencia,
  IdentidadVisual,
  Manual,
  MisionVision,
  Personalidad,
  Publico,
  Tono,
  Valores,
} from "@/components/marca/MarcaSections";
import { Headline, Logo } from "@/components/fnx/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/marca")({
  head: () => ({
    meta: [
      { title: "Marca · Identidad de FNX | FNX · Fénix Creativo" },
      {
        name: "description",
        content:
          "Conocé la identidad de Fénix Creativo: esencia, valores, personalidad, tono, público, identidad visual y manual de marca.",
      },
      { property: "og:title", content: "Marca · Identidad de FNX" },
      {
        property: "og:description",
        content: "La identidad de Fénix Creativo, presentada de forma interactiva.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Marca,
});

const SECTIONS = [
  { id: "esencia", label: "Esencia", C: Esencia },
  { id: "mision", label: "Misión y visión", C: MisionVision },
  { id: "valores", label: "Valores", C: Valores },
  { id: "personalidad", label: "Personalidad", C: Personalidad },
  { id: "tono", label: "Tono", C: Tono },
  { id: "publico", label: "A quién le hablamos", C: Publico },
  { id: "identidad", label: "Identidad visual", C: IdentidadVisual },
  { id: "manual", label: "Manual", C: Manual },
];

function Marca() {
  const [index, setIndex] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = useCallback((next: number, focusTab = false) => {
    const n = (next + SECTIONS.length) % SECTIONS.length;
    setIndex(n);
    if (focusTab) tabRefs.current[n]?.focus();
    const el = topRef.current;
    if (el && el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ block: "start" });
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (t?.getAttribute("role") === "radio") return;
      if (t?.closest('[role="dialog"]') || document.querySelector('[role="dialog"]')) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1, t?.getAttribute("role") === "tab");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1, t?.getAttribute("role") === "tab");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  const current = SECTIONS[index] ?? SECTIONS[0]!;
  const Current = current.C;
  const prev = SECTIONS[(index - 1 + SECTIONS.length) % SECTIONS.length]!;
  const next = SECTIONS[(index + 1) % SECTIONS.length]!;

  return (
    <div data-area="estudio">
      <section className="mx-auto w-full max-w-6xl px-5 pb-8 pt-16 sm:px-8 sm:pt-24" aria-labelledby="marca-titulo">
        <Logo className="mb-4 block text-7xl" />
        <Headline
          as="h1"
          id="marca-titulo"
          lead="Así es"
          accent="Fénix Creativo."
          className="text-6xl sm:text-8xl"
        />
        <p className="mt-6 max-w-xl text-muted-foreground">
          La identidad de la marca en 8 partes. Usá las pestañas, los botones o las flechas del
          teclado.
        </p>
      </section>

      <div ref={topRef} className="sticky top-16 z-30 scroll-mt-16 border-y border-border bg-background/95 backdrop-blur-md sm:top-20 sm:scroll-mt-20">
        <div
          role="tablist"
          aria-label="Secciones de la marca"
          className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 py-3 sm:px-8"
        >
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`tab-${s.id}`}
              role="tab"
              type="button"
              aria-selected={i === index}
              aria-controls={`panel-${s.id}`}
              tabIndex={i === index ? 0 : -1}
              onClick={() => go(i)}
              className={cn(
                "h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors",
                i === index
                  ? "bg-area text-area-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="mr-1.5 opacity-70">{String(i + 1).padStart(2, "0")}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <section
        id={`panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${current.id}`}
        className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20"
      >
        <div key={current.id} className="phrase-in">
          <Current />
        </div>
      </section>

      <nav
        aria-label="Navegación entre secciones"
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 border-t border-border px-5 py-8 pb-24 sm:px-8"
      >
        <Button variant="outline" size="lg" onClick={() => go(index - 1)}>
          <ArrowLeft aria-hidden="true" />
          <span className="hidden sm:inline">Anterior: {prev.label}</span>
          <span className="sm:hidden">Anterior</span>
        </Button>
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {index + 1} / {SECTIONS.length}
        </span>
        <Button variant="area" size="lg" onClick={() => go(index + 1)}>
          <span className="hidden sm:inline">Siguiente: {next.label}</span>
          <span className="sm:hidden">Siguiente</span>
          <ArrowRight aria-hidden="true" />
        </Button>
      </nav>
    </div>
  );
}
