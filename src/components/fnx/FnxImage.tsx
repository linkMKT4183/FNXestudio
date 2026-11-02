import type { FnxImg } from "@/data/imagenes";
import { cn } from "@/lib/utils";

/** Foto FNX optimizada: elige la versión chica o grande según el ancho de pantalla. */
export function FnxImage({
  img,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  className,
  style,
}: {
  img: FnxImg;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
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
      className={cn("block", className)}
      style={style}
    />
  );
}
