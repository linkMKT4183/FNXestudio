import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { useState } from "react";
import { FnxImage } from "@/components/fnx/FnxImage";
import { Tag } from "@/components/fnx/primitives";
import { AREA_LABEL, type FnxImg, type ImageArea } from "@/data/imagenes";
import { cn } from "@/lib/utils";

const TONE: Record<ImageArea, "naranja" | "verde" | "amarillo" | "neutral"> = {
  estudio: "naranja",
  salud: "verde",
  noticias: "amarillo",
  general: "neutral",
};

function AreaTag({ area }: { area: ImageArea }) {
  return <Tag tone={TONE[area]}>{AREA_LABEL[area]}</Tag>;
}

/** Mosaico de fotos. Al tocar una se abre en grande, con flechas y Escape para cerrar. */
export function Gallery({ images }: { images: FnxImg[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const n = images.length;
  const current = open == null ? null : images[open];
  const go = (d: number) => setOpen((i) => (i == null ? i : (i + d + n) % n));

  return (
    <>
      <ul className="grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-4">
        {images.map((img, i) => {
          const big = i === 0;
          const wide = i >= n - 2;
          return (
            <li
              key={img.n}
              className={cn(
                "flex flex-col gap-2",
                big && "col-span-2 md:row-span-2",
                wide && "col-span-2",
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Ampliar foto ${img.n}: ${img.alt}`}
                className={cn(
                  "group relative block overflow-hidden rounded-xl border border-border bg-card transition-[border-color,box-shadow] duration-300 hover:border-foreground hover:shadow-glow-soft",
                  big ? "aspect-[16/9] md:aspect-auto md:flex-1" : wide ? "aspect-[2/1]" : "aspect-[3/2]",
                )}
              >
                <FnxImage
                  img={img}
                  sizes={big || wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="photo-hover absolute inset-0 h-full w-full object-cover"
                />
                <span
                  className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                </span>
              </button>
              <div className="flex items-center gap-2">
                <AreaTag area={img.area} />
                <span className="text-xs text-muted-foreground">{String(img.n).padStart(2, "0")}</span>
              </div>
            </li>
          );
        })}
      </ul>

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
                  Foto {(open ?? 0) + 1} de {n}
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">{current.alt}</DialogPrimitive.Description>
                <figure key={current.n} className="phrase-in flex w-full max-w-6xl flex-col gap-4">
                  <FnxImage
                    img={current}
                    sizes="100vw"
                    priority
                    className="max-h-[72svh] w-full rounded-2xl border border-border object-contain"
                  />
                  <figcaption className="flex flex-wrap items-center gap-3">
                    <AreaTag area={current.area} />
                    <span className="text-sm text-foreground">{current.alt}</span>
                  </figcaption>
                </figure>
                <div className="flex items-center gap-3">
                  <LightboxButton label="Foto anterior" onClick={() => go(-1)}>
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  </LightboxButton>
                  <span className="min-w-16 text-center text-sm text-muted-foreground" aria-live="polite">
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
    </>
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
