import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Heart, Moon, Play, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Animaciones explicativas de «Lo que hacemos» (FNX Estudio). Cada escena cuenta en 6 segundos qué hace el servicio:
 * negro, grafito, crema y naranja; curva de entrada suave y siempre algo en movimiento. Corren solo mientras se ven
 * y con «reducir movimiento» quedan en su estado final.
 */
function Escena({ children, etiqueta, className }: { children: ReactNode; etiqueta: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setPlay(true);
      return;
    }
    const io = new IntersectionObserver((es) => setPlay(es.some((e) => e.isIntersecting)), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      data-play={play ? "si" : "no"}
      role="img"
      aria-label={etiqueta}
      className={cn("ev-escena relative aspect-[16/10] w-full overflow-hidden", className)}
    >
      {children}
    </div>
  );
}

const d = (s: number) => ({ animationDelay: `${s}s` });

export function EscenaBranding() {
  return (
    <Escena etiqueta="Animación: un logo se dibuja, aparecen los colores de la marca y la tipografía.">
      <p className="ev-tag">Logo · colores · tipografía</p>
      <div className="ev-logo ev-pop" style={d(0.1)}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="var(--fnx-naranja)" strokeWidth="2.5" className="ev-trazo" pathLength={1} />
        </svg>
        <span className="headline text-3xl text-fnx-crema">FNX</span>
      </div>
      <div className="ev-colores">
        {["#0B0B0B", "#1C1C1C", "#F3EEE4", "#F2552C"].map((c, i) => (
          <span key={c} className="ev-pop" style={{ background: c, ...d(0.9 + i * 0.25) }} />
        ))}
      </div>
      <div className="ev-aa ev-sube" style={d(1.2)}>
        <span className="headline text-4xl text-fnx-crema">Aa</span>
        <i>Anton · Montserrat</i>
      </div>
      <div className="ev-manual ev-sube" style={d(1.8)} aria-hidden="true">
        <b /> <b /> <b />
      </div>
    </Escena>
  );
}

export function EscenaAudiovisual() {
  return (
    <Escena etiqueta="Animación: una línea de tiempo de video con clips que se acomodan y un cursor que avanza.">
      <p className="ev-tag">Idea · filmación · edición</p>
      <div className="ev-monitor ev-pop" style={d(0.1)}>
        <Play className="h-7 w-7 fill-fnx-crema text-fnx-crema" aria-hidden="true" />
        <span className="ev-rec">REC</span>
      </div>
      <div className="ev-onda" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <i key={i} style={{ animationDelay: `${i * 0.09}s` }} />
        ))}
      </div>
      <div className="ev-timeline" aria-hidden="true">
        <span className="ev-clip ev-entra" style={{ left: "2%", width: "30%", ...d(0.6) }} />
        <span className="ev-clip ev-entra ev-clip-n" style={{ left: "34%", width: "22%", ...d(0.9) }} />
        <span className="ev-clip ev-entra" style={{ left: "58%", width: "38%", ...d(1.2) }} />
        <span className="ev-cursor" />
      </div>
    </Escena>
  );
}

export function EscenaTienda() {
  return (
    <Escena etiqueta="Animación: un cliente compra un producto, suena una venta nueva y el contador sube mientras es de noche.">
      <p className="ev-tag">Catálogo · pago · envío</p>
      <div className="ev-producto ev-pop" style={d(0.1)}>
        <div className="ev-foto">
          <ShoppingBag className="h-8 w-8 text-fnx-naranja" aria-hidden="true" />
        </div>
        <b className="headline text-lg text-fnx-crema">$ 24.900</b>
        <span className="ev-comprar">Comprar</span>
      </div>
      <div className="ev-noche ev-sube" style={d(0.8)}>
        <Moon className="h-4 w-4 text-fnx-crema" aria-hidden="true" /> 23:40
      </div>
      <div className="ev-ventas">
        {[0, 1, 2].map((i) => (
          <span key={i} className="ev-venta" style={d(1.1 + i * 1.3)}>
            <Check className="h-4 w-4 text-fnx-naranja" aria-hidden="true" /> Venta nueva
          </span>
        ))}
      </div>
    </Escena>
  );
}

export function EscenaRedes() {
  return (
    <Escena etiqueta="Animación: un calendario semanal donde cada publicación se enciende y suma me gusta.">
      <p className="ev-tag">Calendario · diseño · textos</p>
      <div className="ev-calendario" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} className={cn("ev-dia", i % 2 === 0 || i === 5 ? "ev-dia-on" : "")} style={{ animationDelay: `${0.3 + (i % 7) * 0.22}s` }} />
        ))}
      </div>
      <div className="ev-likes ev-pop" style={d(1.8)}>
        <Heart className="h-5 w-5 fill-fnx-naranja text-fnx-naranja" aria-hidden="true" />
        <b className="headline text-xl text-fnx-crema">+1.240</b>
      </div>
      <p className="ev-aprueba ev-sube" style={d(2.4)}>
        Vos aprobás · nosotros publicamos
      </p>
    </Escena>
  );
}

export function EscenaEstrategia() {
  const pasos = ["Objetivo", "Público", "Mensaje", "Pauta"];
  return (
    <Escena etiqueta="Animación: cuatro pasos conectados por una línea de luz: objetivo, público, mensaje y recién después la pauta.">
      <p className="ev-tag">Primero el plan, después la pauta</p>
      <svg viewBox="0 0 320 40" className="ev-camino" aria-hidden="true" preserveAspectRatio="none">
        <path d="M30 20 H290" stroke="rgb(243 238 228 / 0.15)" strokeWidth="3" fill="none" />
        <path d="M30 20 H290" stroke="var(--fnx-naranja)" strokeWidth="3" fill="none" pathLength={1} className="ev-trazo ev-trazo-largo" />
      </svg>
      <ol className="ev-pasos">
        {pasos.map((p, i) => (
          <li key={p} className="ev-paso ev-pop" style={d(0.3 + i * 1.1)}>
            <span>{i + 1}</span>
            <em>{p}</em>
          </li>
        ))}
      </ol>
    </Escena>
  );
}
