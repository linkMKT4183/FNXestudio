import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, ExternalLink, Landmark, LayoutGrid, Megaphone, type LucideIcon } from "lucide-react";
import { InstagramDuo } from "@/components/fnx/InstagramButton";
import { useMemo, useState } from "react";
import { IconBadge, Headline, Pieces, Reveal, Tag, TenSeconds } from "@/components/fnx/primitives";
import { FnxImage } from "@/components/fnx/FnxImage";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";

import { NEWS_CATEGORIES, NOTICIAS, type NewsCategory } from "@/data/noticias";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "FNX Noticias · Marketing, negocios y cannabis medicinal | FNX · Fénix Creativo" },
      {
        name: "description",
        content:
          "Lo que pasa, contado con fuentes. Noticias de marketing, negocios, emprendimiento y cannabis medicinal, con link a cada fuente.",
      },
      { property: "og:title", content: "FNX Noticias · Lo que pasa, contado con fuentes" },
      {
        property: "og:description",
        content: "Marketing, negocios y cannabis medicinal, siempre con fuentes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Noticias,
});

type Filter = "Todas" | NewsCategory;
const FILTERS: Filter[] = ["Todas", ...NEWS_CATEGORIES];

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Todas: LayoutGrid,
  Marketing: Megaphone,
  Negocios: Briefcase,
  "Cannabis medicinal": Landmark,
};

function Noticias() {
  const [filter, setFilter] = useState<Filter>("Todas");
  const items = useMemo(
    () => (filter === "Todas" ? NOTICIAS : NOTICIAS.filter((n) => n.category === filter)),
    [filter],
  );

  return (
    <div data-area="noticias">
      <section className="mx-auto w-full max-w-6xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24" aria-labelledby="noticias-titulo">
        <Reveal className="flex flex-col gap-8">
          <p className="eyebrow text-area">FNX Noticias</p>
          <Headline
            as="h1"
            id="noticias-titulo"
            lead="Lo que pasa, contado"
            accent="con fuentes."
            className="text-6xl sm:text-8xl lg:text-9xl"
          />
          <TenSeconds className="max-w-2xl">
            Noticias cortas de marketing, negocios y cannabis medicinal, con su fuente.
          </TenSeconds>
          <Pieces lit={4} />
        </Reveal>
      </section>

      <section aria-label="Noticias" className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <div role="group" aria-label="Filtrar por categoría" className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "h-10 rounded-full border px-5 text-sm font-semibold transition-colors",
                filter === f
                  ? "border-area bg-area text-area-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {(() => {
                const Icon = CATEGORY_ICONS[f];
                return Icon ? <Icon className="mr-2 inline h-4 w-4 align-[-3px]" aria-hidden="true" /> : null;
              })()}
              {f}
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {items.length} noticias
        </p>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n, i) => {
            const img = n.image;
            return (
              <Reveal as="li" key={`${filter}-${n.id}`} delay={(i % 6) * 80}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-area hover:shadow-glow-soft">
                  <div className="aspect-[16/9] overflow-hidden border-b border-border">
                    <FnxImage img={img} className="photo-hover h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="flex items-center gap-2">
                        {(() => {
                          const Icon = CATEGORY_ICONS[n.category];
                          return Icon ? <IconBadge icon={Icon} variant="outline" size="sm" /> : null;
                        })()}
                        <Tag>{n.category}</Tag>
                      </span>
                      <time className="text-xs text-muted-foreground">{n.date}</time>
                    </div>
                    <h2 className="text-xl font-bold leading-snug text-foreground">{n.title}</h2>
                    <p className="text-sm text-muted-foreground">{n.summary}</p>
                    <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4">
                      <a
                        href={n.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-area hover:underline"
                      >
                        Fuente: {n.source}
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="sr-only">(se abre en una pestaña nueva)</span>
                      </a>
                      {n.category === "Cannabis medicinal" ? (
                        <p className="text-xs text-muted-foreground">
                          Contenido para mayores de 18 años
                        </p>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8" aria-labelledby="noticias-cta">
        <Reveal className="flex flex-col items-start gap-6 rounded-3xl border border-border bg-card p-8 sm:p-14">
          <Headline
            id="noticias-cta"
            lead="Recibí las novedades"
            accent="por WhatsApp."
            className="text-5xl sm:text-7xl"
          />
          <p className="text-muted-foreground">Lo importante, corto y con fuente.</p>
          <WhatsAppButton topic="novedades" label="Quiero recibir novedades" />
        </Reveal>
        <Reveal className="mt-8 flex flex-col gap-5">
          <p className="eyebrow text-muted-foreground">También en Instagram</p>
          <InstagramDuo />
        </Reveal>
      </section>
    </div>
  );
}
