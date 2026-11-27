import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Headline, Reveal } from "@/components/fnx/primitives";
import { FnxImage } from "@/components/fnx/FnxImage";
import { fechaCorta } from "@/components/notas/NotaPage";
import { NOTAS } from "@/data/notas";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/notas/")({
  head: () =>
    pageHead(
      "Notas de branding y marketing para pymes | FNX Estudio",
      "Guías cortas de branding, redes, estrategia y registro de marca para pymes y emprendedores. Sedes en San Juan y Mendoza y trabajo en todo el país.",
      "/notas",
    ),
  component: Notas,
});

function Notas() {
  return (
    <div data-area="estudio" className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
      <p className="eyebrow text-area">FNX Estudio · Sedes en San Juan y Mendoza · Todo el país</p>
      <Headline
        as="h1"
        lead="Notas para que tu marca"
        accent="se destaque."
        className="mt-5 text-4xl sm:text-7xl"
      />
      <Reveal as="ul" stagger className="mt-10 grid gap-6 md:grid-cols-2">
        {NOTAS.map((note) => (
          <li key={note.slug}>
            <Link
              to="/notas/$slug"
              params={{ slug: note.slug }}
              className="tarjeta-viva flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card hover:border-area"
            >
              <FnxImage img={note.image} className="aspect-[3/2] w-full object-cover" />
              <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                <p className="text-xs text-muted-foreground">
                  <time dateTime={note.date}>{fechaCorta(note.date)}</time> · {note.readingMinutes}{" "}
                  min de lectura
                </p>
                <h2 className="text-xl font-bold leading-snug">{note.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{note.description}</p>
                <span className="mt-auto flex items-center gap-2 text-sm font-semibold text-area">
                  Leer nota <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only">: {note.title}</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </Reveal>
    </div>
  );
}
