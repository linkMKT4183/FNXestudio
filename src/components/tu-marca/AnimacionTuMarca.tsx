import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * La animación de la primera placa del carrusel (el navegador 3D con la web y la tarjeta de crecimiento), recortada
 * para que no repita el titular. Video en silencio y en loop: corre solo mientras se ve; con «reducir movimiento» queda la imagen.
 */
export function AnimacionTuMarca({ className }: { className?: string }) {
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
    const io = new IntersectionObserver((es) => setVisible(es.some((e) => e.isIntersecting)), { threshold: 0.2 });
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
    <div ref={caja} className={cn("carrusel-marco mx-auto w-full rounded-[2rem] p-2.5", className)}>
      <div className="overflow-hidden rounded-[1.45rem] bg-background">
        <video
          ref={video}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/tu-marca-animacion.webp"
          aria-hidden="true"
          className="aspect-[900/584] h-full w-full object-cover"
        >
          <source src="/media/tu-marca-animacion.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
