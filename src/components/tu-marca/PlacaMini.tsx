import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** La placa animada del carrusel que explica cada señal («así no / así sí»), en loop y en silencio solo mientras se ve. */
export function PlacaMini({ n, className }: { n: string; className?: string }) {
  const caja = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducido, setReducido] = useState(false);

  useEffect(() => {
    setReducido(Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches));
    const el = caja.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver((es) => setVisible(es.some((e) => e.isIntersecting)), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (visible && !reducido) void v.play().catch(() => {});
    else v.pause();
  }, [visible, reducido]);

  return (
    <div ref={caja} className={cn("overflow-hidden rounded-xl border border-border bg-background", className)}>
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        poster={`/media/carrusel/placa-${n}.webp`}
        aria-hidden="true"
        className="block aspect-[4/5] w-full object-cover"
      >
        <source src={`/media/carrusel/placa-${n}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
