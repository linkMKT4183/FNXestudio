import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { HeartHandshake, Newspaper, PenTool, Scale, type LucideIcon } from "lucide-react";
import { trackEvent } from "@/lib/track";
import { cn } from "@/lib/utils";

interface Nodo {
  to: "/estudio" | "/consultoria" | "/salud" | "/noticias";
  label: string;
  icon: LucideIcon;
  /** Centro del eslabón de la cadena que representa al área (en % del cuadrado). */
  cx: number;
  cy: number;
  /** Dónde queda el ícono del área (en % del cuadrado). */
  x: number;
  y: number;
}

/**
 * Los cuatro eslabones de la cadena, de abajo a la izquierda hacia arriba a la derecha, en el orden en que se enciende la luz:
 * Estudio → Consultoría → Salud → Noticias.
 */
const NODOS: Nodo[] = [
  { to: "/estudio", label: "Estudio", icon: PenTool, cx: 26, cy: 64, x: 30, y: 84 },
  { to: "/consultoria", label: "Consultoría", icon: Scale, cx: 42, cy: 55, x: 49, y: 76 },
  { to: "/salud", label: "Salud", icon: HeartHandshake, cx: 58, cy: 45, x: 68, y: 66 },
  { to: "/noticias", label: "Noticias", icon: Newspaper, cx: 74, cy: 35, x: 86, y: 54 },
];

/**
 * La estructura de FNX: una cadena de vidrio de cuatro eslabones (video en loop, naranja sobre negro). Cada eslabón es un área
 * y la luz los recorre en orden. Al lado de cada eslabón, su área con un link. Todo en el naranja de la marca.
 */
/** Reproduce el video solo mientras se ve y respeta «reducir movimiento». */
function useVideoVisible() {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = video.current;
    if (!v || typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) void v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return video;
}

/** Cuadro de la cadena (celular y tablet). */
export function RedVidrio({ className }: { className?: string }) {
  const video = useVideoVisible();

  return (
    <div
      className={cn("relative mx-auto aspect-square w-full max-w-[34rem]", className)}
      role="group"
      aria-label="Las cuatro áreas de FNX: Estudio, Consultoría, Salud y Noticias"
    >
      <video
        ref={video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/red-vidrio-poster.webp"
        aria-hidden="true"
        className="red-video absolute inset-0 h-full w-full object-cover"
      >
        <source src="/media/red-vidrio-720.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/media/red-vidrio.mp4" type="video/mp4" />
      </video>

      {/* hilo de luz de cada eslabón a su área */}
      <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {NODOS.map((n, i) => {
          const dx = n.x - n.cx;
          const dy = n.y - n.cy;
          const len = Math.hypot(dx, dy);
          const ux = dx / len;
          const uy = dy / len;
          const x1 = n.cx + ux * 3;
          const y1 = n.cy + uy * 3;
          const x2 = n.x - ux * 6.5;
          const y2 = n.y - uy * 6.5;
          return (
            <g key={n.to}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--fnx-naranja)" strokeOpacity="0.4" strokeWidth="0.3" strokeLinecap="round" />
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                pathLength="100"
                stroke="var(--fnx-crema)"
                strokeWidth="0.6"
                strokeLinecap="round"
                className="red-cometa"
                style={{ animationDelay: `${i * 2}s`, animationDuration: "8s" }}
              />
            </g>
          );
        })}
      </svg>

      {NODOS.map((n) => {
        const Icon = n.icon;
        return (
          <Link
            key={n.to}
            to={n.to}
            onClick={() => trackEvent("door_click", { area: n.label.toLowerCase(), source: "red_vidrio" })}
            className="red-nodo group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            aria-label={`FNX ${n.label}`}
          >
            <span
              className={cn(
                "red-nodo-caja inline-flex h-[2.9rem] w-[2.9rem] items-center justify-center rounded-2xl border border-fnx-naranja/70 bg-background/70 text-fnx-naranja backdrop-blur-md sm:h-[3.8rem] sm:w-[3.8rem]",
              )}
            >
              <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span
              className={cn(
                "absolute whitespace-nowrap text-[0.66rem] font-bold uppercase tracking-[0.14em] text-foreground sm:text-xs",
                "top-full mt-2",
              )}
            >
              {n.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/** Posiciones en % de la pantalla (el video es 16:9 y cubre todo el bloque): centro de cada eslabón y su ícono. */
const NODOS_ANCHO: Nodo[] = [
  { to: "/estudio", label: "Estudio", icon: PenTool, cx: 56.5, cy: 69.8, x: 60.9, y: 83 },
  { to: "/consultoria", label: "Consultoría", icon: Scale, cx: 67.9, cy: 57.6, x: 72.3, y: 70.8 },
  { to: "/salud", label: "Salud", icon: HeartHandshake, cx: 78.2, cy: 46.5, x: 82.6, y: 59.6 },
  { to: "/noticias", label: "Noticias", icon: Newspaper, cx: 87.6, cy: 36.4, x: 91.6, y: 49.6 },
];

/**
 * La cadena a todo el ancho del bloque (solo computadora): video panorámico de borde a borde con la luz naranja repartida por
 * la escena, y los cuatro íconos de las áreas sobre sus eslabones. El bloque tiene proporción 16:9, así que todo queda alineado.
 */
export function RedVidrioAncha() {
  const video = useVideoVisible();
  return (
    <div
      className="absolute inset-0 hidden lg:block"
      role="group"
      aria-label="Las cuatro áreas de FNX en una cadena: Estudio, Consultoría, Salud y Noticias"
    >
      <video
        ref={video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/red-vidrio-ancho-poster.webp"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/media/red-vidrio-ancho.mp4" type="video/mp4" />
      </video>
      <svg viewBox="0 0 100 56.25" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {NODOS_ANCHO.map((n, i) => {
          const cy = n.cy * 0.5625;
          const y = n.y * 0.5625;
          const dx = n.x - n.cx;
          const dy = y - cy;
          const len = Math.hypot(dx, dy);
          const ux = dx / len;
          const uy = dy / len;
          const x1 = n.cx + ux * 2.2;
          const y1 = cy + uy * 2.2;
          const x2 = n.x - ux * 3.6;
          const y2 = y - uy * 3.6;
          return (
            <g key={n.to}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--fnx-naranja)" strokeOpacity="0.4" strokeWidth="0.14" strokeLinecap="round" />
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                pathLength="100"
                stroke="var(--fnx-crema)"
                strokeWidth="0.28"
                strokeLinecap="round"
                className="red-cometa"
                style={{ animationDelay: `${i * 2}s`, animationDuration: "8s" }}
              />
            </g>
          );
        })}
      </svg>
      {NODOS_ANCHO.map((n) => {
        const Icon = n.icon;
        return (
          <Link
            key={n.to}
            to={n.to}
            onClick={() => trackEvent("door_click", { area: n.label.toLowerCase(), source: "red_vidrio" })}
            className="red-nodo group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            aria-label={`FNX ${n.label}`}
          >
            <span className="red-nodo-caja inline-flex h-[4rem] w-[4rem] items-center justify-center rounded-2xl border border-fnx-naranja/70 bg-background/70 text-fnx-naranja backdrop-blur-md">
              <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="absolute top-full mt-2 whitespace-nowrap text-xs font-bold uppercase tracking-[0.14em] text-foreground">
              {n.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
