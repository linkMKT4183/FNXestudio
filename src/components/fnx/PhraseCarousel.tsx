import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FnxImage } from "@/components/fnx/FnxImage";
import type { FnxImg } from "@/data/imagenes";
import { cn } from "@/lib/utils";

export interface PhraseSlide {
  text: string;
  img: FnxImg;
  /** Encuadre horizontal en celular, para que el objeto de color quede a la vista. */
  focusX?: string;
}

const AUTOPLAY_MS = 6000;

/** Pinta la última palabra en el color de acento. */
function PhraseText({ text }: { text: string }) {
  const words = text.split(" ");
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span className="text-area">{last}</span>
    </>
  );
}

/**
 * Carrusel a pantalla ancha: cada frase sobre su foto. Flechas, puntos, deslizamiento táctil,
 * avance automático cada 6 segundos; se pausa con el botón o al navegarlo con teclado.
 */
export function PhraseCarousel({ slides, title }: { slides: PhraseSlide[]; title: string }) {
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  // El carrusel avanza solo siempre: es parte de la identidad de la web. Se puede pausar con el botón.
  const reduce = false;

  const go = useCallback((i: number) => setIndex(((i % n) + n) % n), [n]);

  const running = !paused && !focused;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [running, index, go]);

  return (
    <section
      aria-roledescription="carrusel"
      aria-labelledby="carrusel-titulo"
      className="relative overflow-hidden border-y border-border bg-background"
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(index + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(index - 1);
        }
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchX.current;
        const end = e.changedTouches[0]?.clientX;
        touchX.current = null;
        if (start == null || end == null) return;
        const dx = end - start;
        if (Math.abs(dx) > 45) go(dx < 0 ? index + 1 : index - 1);
      }}
    >
      <div className="relative h-[34rem] sm:h-[40rem] lg:h-[46rem]">
        <div
          className={cn("flex h-full", !reduce && "transition-transform duration-700 ease-out")}
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live={running ? "off" : "polite"}
        >
          {slides.map((s, i) => {
            const active = i === index;
            return (
              <div
                key={s.text}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${i + 1} de ${n}`}
                aria-hidden={!active}
                inert={!active}
                className="relative h-full w-full shrink-0"
              >
                <FnxImage
                  img={s.img}
                  sizes="100vw"
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ease-out",
                    active && !reduce ? "scale-[1.04]" : "scale-100",
                  )}
                  style={{ objectPosition: `${s.focusX ?? "60%"} 80%` }}
                />
                <div className="absolute inset-0 bg-background/30" aria-hidden="true" />
                <div className="relative mx-auto flex h-full max-w-6xl flex-col px-5 pt-14 sm:px-8 sm:pt-20">
                  <p
                    key={active ? `on-${index}` : "off"}
                    className={cn(
                      "headline max-w-4xl text-5xl text-foreground sm:text-7xl lg:text-8xl",
                      active && "phrase-in",
                    )}
                  >
                    <PhraseText text={s.text} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <h2
          id="carrusel-titulo"
          className="eyebrow pointer-events-none absolute left-1/2 top-6 w-full max-w-6xl -translate-x-1/2 px-5 text-muted-foreground sm:px-8"
        >
          {title}
        </h2>

        {/* Controles */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="flex items-center gap-3">
              {slides.map((s, i) => (
                <button
                  key={s.text}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Ir a la frase ${i + 1}: ${s.text}`}
                  aria-current={i === index}
                  className="group/dot flex h-8 items-center"
                >
                  <span
                    className={cn(
                      "block h-3 rounded-full transition-all",
                      i === index
                        ? "w-10 bg-area"
                        : "w-3 bg-muted-foreground/50 group-hover/dot:bg-foreground",
                    )}
                  />
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPaused((v) => !v)}
                className="ml-2 inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background/80 px-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                {paused ? (
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {paused ? "Reproducir" : "Pausar"}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <ArrowButton label="Frase anterior" onClick={() => go(index - 1)}>
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              </ArrowButton>
              <ArrowButton label="Frase siguiente" onClick={() => go(index + 1)}>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </ArrowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
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
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/80 text-foreground transition-colors hover:border-area hover:bg-area hover:text-area-foreground"
    >
      {children}
    </button>
  );
}
