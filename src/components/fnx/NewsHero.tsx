import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { FnxImage } from "@/components/fnx/FnxImage";
import type { NewsItem } from "@/data/noticias";
import { cn } from "@/lib/utils";

/**
 * Portada de Noticias: mosaico de fotos donde una por vez se "enciende" en amarillo
 * (uno que se destaca entre muchos), con su categoría y título.
 */
export function NewsMosaic({
  items,
  icons,
}: {
  items: NewsItem[];
  icons: Record<string, LucideIcon>;
}) {
  const tiles = items.slice(0, 6);
  const [lit, setLit] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setLit((v) => (v + 1) % tiles.length), 2800);
    return () => window.clearInterval(t);
  }, [tiles.length]);
  const current = tiles[lit];
  const CurrentIcon = current ? icons[current.category] : undefined;

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 sm:gap-3" aria-hidden="true">
        {tiles.map((n, i) => (
          <div
            key={n.id}
            className={cn(
              "relative aspect-square overflow-hidden rounded-xl border transition-all duration-700",
              i === lit
                ? "scale-[1.04] border-area shadow-glow"
                : "border-border opacity-50 grayscale",
            )}
          >
            <FnxImage
              img={n.image}
              sizes="200px"
              className="tono-zoom h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      {current ? (
        <div
          key={current.id}
          className="phrase-in absolute -bottom-6 left-4 right-4 flex items-center gap-3 rounded-2xl border border-area bg-background/90 p-4 backdrop-blur sm:left-8 sm:right-8"
          aria-live="polite"
        >
          {CurrentIcon ? (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-area text-area-foreground">
              <CurrentIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          ) : null}
          <div className="min-w-0">
            <p className="eyebrow text-area">{current.category}</p>
            <p className="truncate text-sm font-bold text-foreground">{current.title}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Cinta de titulares que se desplaza sola. */
export function NewsTicker({
  items,
  icons,
}: {
  items: NewsItem[];
  icons: Record<string, LucideIcon>;
}) {
  const list = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden border-y border-border bg-card py-4"
      aria-label="Últimos titulares"
    >
      <div className="ticker flex w-max gap-10">
        {list.map((n, i) => {
          const Icon = icons[n.category];
          return (
            <span
              key={`${n.id}-${i}`}
              className="flex items-center gap-3 whitespace-nowrap text-sm text-foreground"
              aria-hidden={i >= items.length}
            >
              {Icon ? <Icon className="h-4 w-4 text-area" aria-hidden="true" /> : null}
              <span className="font-semibold">{n.title}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-area" aria-hidden="true" />
            </span>
          );
        })}
      </div>
    </div>
  );
}
