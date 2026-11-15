import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/track";
import { cn } from "@/lib/utils";

/** Las 9 placas del carrusel «Tu marca pasa desapercibida», con la duración de cada animación en segundos. */
export const PLACAS = [
  { n: "01", dur: 8, label: "Portada: tu marca pasa desapercibida" },
  { n: "02", dur: 6, label: "Las cinco señales" },
  { n: "03", dur: 6, label: "Señal 1: identidad" },
  { n: "04", dur: 6, label: "Señal 2: imagen" },
  { n: "05", dur: 6, label: "Señal 3: tienda" },
  { n: "06", dur: 6, label: "Señal 4: constancia" },
  { n: "07", dur: 6, label: "Señal 5: estrategia" },
  { n: "08", dur: 6, label: "FNX Estudio creativo" },
  { n: "09", dur: 8, label: "Escribí MARCA" },
] as const;

/**
 * El carrusel animado de Instagram, adentro de la web: cada placa es el video original (en silencio, en loop).
 * Solo se reproduce la placa que se ve y solo mientras el carrusel está en pantalla. Pasa solo según la duración de cada
 * placa hasta que la persona lo toca. Con «reducir movimiento» no se reproduce: se ven las imágenes y se navega a mano.
 */
export function CarruselTuMarca({ className }: { className?: string }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [actual, setActual] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reducido, setReducido] = useState(false);
  const caja = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setReducido(Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches));
  }, []);

  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver((es) => setVisible(es.some((e) => e.isIntersecting)), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setActual(embla.selectedScrollSnap());
    onSelect();
    embla.on("select", onSelect);
    embla.on("pointerDown", () => setAuto(false));
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla]);

  // solo corre la placa activa
  useEffect(() => {
    videos.current.forEach((v, k) => {
      if (!v) return;
      if (k === actual && visible && !reducido) {
        v.currentTime = 0;
        void v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [actual, visible, reducido]);

  // paso automático según la duración de la placa
  useEffect(() => {
    if (!embla || !auto || !visible || reducido) return;
    const t = window.setTimeout(() => embla.scrollNext(), PLACAS[actual]!.dur * 1000);
    return () => window.clearTimeout(t);
  }, [embla, auto, visible, reducido, actual]);

  const ir = useCallback(
    (k: number) => {
      setAuto(false);
      embla?.scrollTo(k);
      trackEvent("carrusel_marca", { placa: k + 1 });
    },
    [embla],
  );
  const paso = useCallback(
    (d: 1 | -1) => {
      setAuto(false);
      if (d === 1) embla?.scrollNext();
      else embla?.scrollPrev();
      trackEvent("carrusel_marca", { direccion: d === 1 ? "siguiente" : "anterior" });
    },
    [embla],
  );

  return (
    <div
      ref={caja}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Carrusel animado: tu marca pasa desapercibida"
      className={cn("mx-auto w-full max-w-[22rem]", className)}
    >
      <div className="carrusel-marco rounded-[2rem] p-2.5">
        <div className="flex gap-1 px-1 pb-2.5 pt-1" role="group" aria-label="Elegir placa">
          {PLACAS.map((p, k) => (
            <button
              key={p.n}
              type="button"
              onClick={() => ir(k)}
              aria-label={`Ir a la placa ${k + 1} de ${PLACAS.length}: ${p.label}`}
              aria-current={k === actual ? "true" : undefined}
              className="group flex-1 py-1.5"
            >
              <span className="block h-[3px] overflow-hidden rounded-full bg-fnx-crema/20">
                {k < actual ? (
                  <span className="block h-full w-full bg-fnx-naranja" />
                ) : k === actual ? (
                  <span
                    key={actual}
                    className={cn("carrusel-prog block h-full w-full bg-fnx-naranja", !(auto && visible && !reducido) && "carrusel-prog-quieto")}
                    style={{ animationDuration: `${p.dur}s` }}
                  />
                ) : null}
              </span>
            </button>
          ))}
        </div>

        <div ref={emblaRef} className="overflow-hidden rounded-[1.45rem]">
          <div className="flex">
            {PLACAS.map((p, k) => (
              <div
                key={p.n}
                role="group"
                aria-roledescription="placa"
                aria-label={`${k + 1} de ${PLACAS.length}: ${p.label}`}
                className="min-w-0 shrink-0 grow-0 basis-full"
              >
                <div className="relative aspect-[4/5] bg-background">
                  <video
                    ref={(el) => {
                      videos.current[k] = el;
                    }}
                    muted
                    loop
                    playsInline
                    preload={k === actual || k === (actual + 1) % PLACAS.length ? "auto" : "none"}
                    poster={`/media/carrusel/placa-${p.n}.webp`}
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  >
                    <source src={`/media/carrusel/placa-${p.n}.mp4`} type="video/mp4" />
                  </video>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between px-1 pb-0.5 pt-3">
          <button type="button" onClick={() => paso(-1)} aria-label="Placa anterior" className="carrusel-boton">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground" aria-live="polite">
            <span className="text-foreground">{String(actual + 1).padStart(2, "0")}</span> / {String(PLACAS.length).padStart(2, "0")}
          </p>
          <button type="button" onClick={() => paso(1)} aria-label="Placa siguiente" className="carrusel-boton">
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
