import type { CSSProperties } from "react";
import type { FnxImg } from "@/data/imagenes";
import { cn } from "@/lib/utils";

/** Puntos hacia donde avanza la cámara: cada foto elige uno fijo según su nombre (igual en servidor y navegador). */
const ORIGENES = ["50% 50%", "35% 40%", "65% 45%", "45% 65%", "60% 30%", "30% 60%"];

function semilla(texto: string): number {
  let h = 0;
  for (let i = 0; i < texto.length; i++) h = (h * 31 + texto.charCodeAt(i)) >>> 0;
  return h;
}

/**
 * Foto FNX optimizada: elige la versión chica o grande según el ancho de pantalla.
 * Por defecto la foto nunca queda quieta: un acercamiento lento y continuo (.fnx-cam) que va y vuelve,
 * así el loop no tiene corte. Cada foto arranca en otro momento y hacia otro punto, para que no se muevan todas juntas.
 * Usá `cam={false}` en fotos que no estén dentro de un marco con overflow-hidden.
 */
export function FnxImage({
  img,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className,
  style,
  cam = true,
}: {
  img: FnxImg;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  cam?: boolean;
}) {
  const s = semilla(img.sm);
  const camStyle: CSSProperties | undefined = cam
    ? ({
        "--cam-delay": `-${(s % 90) / 10}s`,
        "--cam-origin": ORIGENES[s % ORIGENES.length],
      } as CSSProperties)
    : undefined;
  return (
    <img
      src={img.lg}
      srcSet={`${img.sm} 768w, ${img.lg} ${img.width}w`}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={img.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={cn("block", cam && "fnx-cam", className)}
      style={camStyle || style ? { ...camStyle, ...style } : undefined}
    />
  );
}
