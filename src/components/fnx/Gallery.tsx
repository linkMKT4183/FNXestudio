import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { FnxImage } from "@/components/fnx/FnxImage";
import { Tag } from "@/components/fnx/primitives";
import { GALLERY_GROUPS, type GalleryItem } from "@/data/galeria";
import { AREA_LABEL, type ImageArea } from "@/data/imagenes";
import { cn } from "@/lib/utils";

const TONE: Record<ImageArea, "naranja" | "azul" | "verde" | "amarillo" | "neutral"> = {
  estudio: "naranja",
  consultoria: "azul",
  salud: "verde",
  noticias: "amarillo",
  general: "neutral",
};

type Filter = "todas" | "estudio" | "consultoria" | "salud" | "noticias";
const FILTERS: { v: Filter; l: string }[] = [
  { v: "todas", l: "Todas" },
  { v: "estudio", l: "Estudio" },
  { v: "consultoria", l: "Consultoría" },
  { v: "salud", l: "Salud" },
  { v: "noticias", l: "Noticias" },
];

function AreaTag({ area }: { area: ImageArea }) {
  return <Tag tone={TONE[area]}>{AREA_LABEL[area]}</Tag>;
}

/**
 * Galería agrupada por área, con filtros. Al tocar una foto se abre en grande,
 * con flechas para pasar (dentro del filtro elegido) y Escape para cerrar.
 */
export function Gallery({ images }: { images: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("todas");
  const [open, setOpen] = useState<number | null>(null);

  const groups = useMemo(
    () =>
      GALLERY_GROUPS.filter((g) => filter === "todas" || g.area === filter)
        .map((g) => ({ ...g, items: images.filter((i) => i.area === g.area) }))
        .filter((g) => g.items.length > 0),
    [filter, images],
  );
  const visible = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const n = visible.length;
  const current = open == null ? null : visible[open];
  const go = (d: number) => setOpen((i) => (i == null ? i : (i + d + n) % n));

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label="Filtrar fotos por área" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.v}
            type="button"
            aria-pressed={filter === f.v}
            onClick={() => setFilter(f.v)}
            className={cn(
              "h-10 rounded-full border px-5 text-sm font-semibold transition-colors",
              filter === f.v
                ? "border-area bg-area text-area-foreground"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground",
            )}
          >
            {f.l}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {n} fotos
      </p>

      {groups.map((g) => (
        <section key={g.area} aria-label={g.title} className="flex flex-col gap-4">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <AreaTag area={g.area} />
            <h4 className="text-sm font-semibold text-foreground">{g.title}</h4>
            <span className="text-xs text-muted-foreground">
              {g.items.length} {g.items.length === 1 ? "foto" : "fotos"}
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-3 lg:grid-cols-4">
            {g.items.map((img) => {
              const index = visible.indexOf(img);
              return (
                <li key={`${filter}-${img.id}`} className="phrase-in flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(index)}
                    aria-label={`Ampliar: ${img.label}`}
                    className="group relative block aspect-[3/2] overflow-hidden rounded-xl border border-border bg-card transition-[border-color,box-shadow] duration-300 hover:border-foreground hover:shadow-glow-soft"
                  >
                    <FnxImage
                      img={img}
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="photo-hover absolute inset-0 h-full w-full object-cover"
                    />
                    <span
                      className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                      aria-hidden="true"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                    </span>
                  </button>
                  <p className="text-xs leading-snug text-muted-foreground">{img.label}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <DialogPrimitive.Root open={open != null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 outline-none sm:p-10"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                e.stopPropagation();
                go(1);
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                e.stopPropagation();
                go(-1);
              }
            }}
          >
            {current ? (
              <>
                <DialogPrimitive.Title className="sr-only">
                  Foto {(open ?? 0) + 1} de {n}: {current.label}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  {current.alt}
                </DialogPrimitive.Description>
                <figure key={current.id} className="phrase-in flex w-full max-w-6xl flex-col gap-4">
                  <FnxImage
                    img={current}
                    sizes="100vw"
                    priority
                    className="max-h-[70svh] w-full rounded-2xl border border-border object-contain"
                  />
                  <figcaption className="flex flex-col gap-2">
                    <span className="flex flex-wrap items-center gap-3">
                      <AreaTag area={current.area} />
                      <span className="text-sm font-semibold text-foreground">{current.label}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">{current.alt}</span>
                  </figcaption>
                </figure>
                <div className="flex items-center gap-3">
                  <LightboxButton label="Foto anterior" onClick={() => go(-1)}>
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  </LightboxButton>
                  <span
                    className="min-w-16 text-center text-sm text-muted-foreground"
                    aria-live="polite"
                  >
                    {(open ?? 0) + 1} / {n}
                  </span>
                  <LightboxButton label="Foto siguiente" onClick={() => go(1)}>
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </LightboxButton>
                </div>
                <DialogPrimitive.Close
                  className="absolute right-4 top-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-foreground hover:bg-secondary sm:right-8 sm:top-8"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </DialogPrimitive.Close>
              </>
            ) : null}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}

function LightboxButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-area hover:bg-area hover:text-area-foreground"
    >
      {children}
    </button>
  );
}
