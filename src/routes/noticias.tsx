import { createFileRoute } from "@tanstack/react-router";
import {
  Briefcase,
  ExternalLink,
  Landmark,
  LayoutGrid,
  Megaphone,
  type LucideIcon,
} from "lucide-react";
import { InstagramDuo } from "@/components/fnx/InstagramButton";
import { useMemo, useState } from "react";
import { IconBadge, Headline, Reveal, Tag } from "@/components/fnx/primitives";
import { FnxImage } from "@/components/fnx/FnxImage";
import { EmailButton } from "@/components/fnx/EmailButton";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { WhatsAppChatLoop } from "@/components/fnx/WhatsAppChat";
import { NewsMosaic, NewsTicker } from "@/components/fnx/NewsHero";

import { NEWS_CATEGORIES, NOTICIAS, type NewsCategory } from "@/data/noticias";
import { cn } from "@/lib/utils";

import { pageUrl } from "@/config/site";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "FNX Noticias · Marketing, negocios y sector regulado | FNX · Fénix Creativo" },
      {
        name: "description",
        content:
          "Lo que pasa, contado con fuentes. Noticias de marketing, negocios, emprendimiento y sector regulado, con link a cada fuente.",
      },
      { property: "og:title", content: "FNX Noticias · Lo que pasa, contado con fuentes" },
      {
        property: "og:description",
        content: "Marketing, negocios y sector regulado, siempre con fuentes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl("/noticias") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: pageUrl("/noticias") }],
  }),
  component: Noticias,
});

const CHAT_NOTICIAS = [
  {
    q: "Hola FNX, quiero recibir las novedades",
    a: "¡Listo! Te mandamos lo importante, corto y siempre con el link a la fuente.",
  },
  {
    q: "¿Cada cuánto llegan?",
    a: "Una vez por semana, con las noticias de marketing, negocios y del sector que te interesan.",
  },
];

type Filter = "Todas" | NewsCategory;
const FILTERS: Filter[] = ["Todas", ...NEWS_CATEGORIES];

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Todas: LayoutGrid,
  Marketing: Megaphone,
  Negocios: Briefcase,
  "Sector regulado": Landmark,
};

function Noticias() {
  const [filter, setFilter] = useState<Filter>("Todas");
  const items = useMemo(
    () => (filter === "Todas" ? NOTICIAS : NOTICIAS.filter((n) => n.category === filter)),
    [filter],
  );

  return (
    <div data-area="noticias">
      <section
        className="mx-auto w-full max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24"
        aria-labelledby="noticias-titulo"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="flex flex-col gap-8">
            <p className="eyebrow text-area">FNX Noticias</p>
            <Headline
              as="h1"
              id="noticias-titulo"
              lead="Lo que pasa, contado"
              accent="con fuentes."
              className="text-6xl sm:text-8xl"
            />
            <p className="max-w-xl text-lg text-muted-foreground">
              Marketing, negocios y sector regulado en noticias cortas, cada una con el link a su
              fuente.
            </p>
            <div className="flex flex-wrap gap-3">
              {NEWS_CATEGORIES.map((c) => {
                const Icon = CATEGORY_ICONS[c];
                const count = NOTICIAS.filter((n) => n.category === c).length;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setFilter(c);
                      document.getElementById("listado")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left transition-colors hover:border-area"
                  >
                    {Icon ? <IconBadge icon={Icon} variant="outline" size="sm" /> : null}
                    <span className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">{c}</span>
                      <span className="text-xs text-muted-foreground">
                        {count} {count === 1 ? "noticia" : "noticias"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <NewsMosaic items={NOTICIAS} icons={CATEGORY_ICONS} />
          </Reveal>
        </div>
      </section>

      <NewsTicker items={NOTICIAS} icons={CATEGORY_ICONS} />

      <section
        id="listado"
        aria-label="Noticias"
        className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 pb-20 pt-14 sm:px-8"
      >
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
                return Icon ? (
                  <Icon className="mr-2 inline h-4 w-4 align-[-3px]" aria-hidden="true" />
                ) : null;
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
                          return Icon ? (
                            <IconBadge icon={Icon} variant="outline" size="sm" />
                          ) : null;
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
                      {n.category === "Sector regulado" ? (
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

      <section
        className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8"
        aria-labelledby="noticias-cta"
      >
        <Reveal className="grid items-center gap-10 rounded-3xl border border-border bg-card p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col items-start gap-6">
            <Headline
              id="noticias-cta"
              lead="Recibí las novedades"
              accent="por WhatsApp."
              className="text-5xl sm:text-7xl"
            />
            <p className="text-muted-foreground">Lo importante, corto y con fuente.</p>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton topic="novedades" label="Quiero recibir novedades" />
              <EmailButton account="estudio" topic="novedades" label="Recibirlas por mail" />
            </div>
          </div>
          <WhatsAppChatLoop name="FNX Noticias" pairs={CHAT_NOTICIAS} />
        </Reveal>
        <Reveal className="mt-8 flex flex-col gap-5">
          <p className="eyebrow text-muted-foreground">También en Instagram</p>
          <InstagramDuo />
        </Reveal>
      </section>
    </div>
  );
}
