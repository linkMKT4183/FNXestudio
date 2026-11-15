import { useEffect, useRef, useState } from "react";
import { Globe, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const miles = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const PUNTOS = 26;

/** Serie que solo sube (con pequeños altibajos) para el gráfico. */
function inicial(): number[] {
  const a: number[] = [];
  let v = 40;
  for (let i = 0; i < PUNTOS; i++) {
    v += 1.6 + Math.sin(i * 1.7) * 1.4 + (i % 3) * 0.6;
    a.push(v);
  }
  return a;
}

/**
 * Animación nueva de «Tu marca»: la home actual de FNX flotando, sin recuadro ni fondo, con un panel de crecimiento
 * que no para de subir (visitas, consultas y un gráfico que avanza). Se mueve solo mientras se ve; con «reducir movimiento»
 * queda quieta.
 */
export function CrecimientoFlotante({ className }: { className?: string }) {
  const caja = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducido, setReducido] = useState(false);
  const [visitas, setVisitas] = useState(48250);
  const [consultas, setConsultas] = useState(115);
  const [serie, setSerie] = useState<number[]>(inicial);
  const [aviso, setAviso] = useState(0);

  useEffect(() => {
    setReducido(Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches));
    const el = caja.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver((es) => setVisible(es.some((e) => e.isIntersecting)), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reducido) return;
    const t = window.setInterval(() => {
      setVisitas((v) => v + 38 + Math.floor(Math.random() * 54));
      setSerie((s) => {
        const ult = s[s.length - 1] ?? 40;
        return [...s.slice(1), ult + 1.2 + Math.random() * 2.6 - (Math.random() < 0.18 ? 1.4 : 0)];
      });
    }, 900);
    const c = window.setInterval(() => {
      setConsultas((v) => v + 1);
      setAviso((a) => a + 1);
    }, 2600);
    return () => {
      window.clearInterval(t);
      window.clearInterval(c);
    };
  }, [visible, reducido]);

  const min = Math.min(...serie);
  const max = Math.max(...serie);
  const pts = serie.map((v, i) => [(i / (PUNTOS - 1)) * 220, 64 - ((v - min) / (max - min || 1)) * 56] as const);
  const linea = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${linea} L220 72 L0 72 Z`;
  const [ux, uy] = pts[pts.length - 1] ?? [220, 8];
  const crecimiento = 312 + Math.floor((visitas - 48250) / 90);

  return (
    <div ref={caja} className={cn("crec-escena relative mx-auto w-full max-w-[34rem] pb-16 pt-6", className)}>
      <div className="crec-halo" aria-hidden="true" />

      {/* La home actual de FNX, en un navegador que flota */}
      <div className={cn("crec-navegador relative", !reducido && "crec-flota")}>
        <div className="crec-barra" aria-hidden="true">
          <span /> <span /> <span />
          <em>fnxestudio.com</em>
        </div>
        <img
          src="/media/tu-marca-inicio.webp"
          alt="La página de inicio de FNX Estudio"
          width={1100}
          height={688}
          loading="lazy"
          className="block w-full"
        />
      </div>

      {/* Ícono de la web */}
      <div className={cn("crec-globo icon-glossy", !reducido && "crec-flota-b")} aria-hidden="true">
        <Globe className="h-9 w-9 text-fnx-crema" strokeWidth={1.8} />
      </div>

      {/* Panel de crecimiento: sube sin parar */}
      <div className={cn("crec-panel", !reducido && "crec-flota-c")} role="img" aria-label="Panel de ejemplo: visitas y consultas que crecen todo el tiempo">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-fnx-crema/60">Tu marca · visitas</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <span className="headline text-4xl leading-none text-fnx-crema tabular-nums">{miles(visitas)}</span>
          <span className="rounded-full bg-fnx-naranja px-2.5 py-1 text-xs font-extrabold text-fnx-negro tabular-nums">↑ +{crecimiento}%</span>
        </div>
        <svg viewBox="0 0 220 72" className="mt-2 block h-16 w-full" aria-hidden="true" preserveAspectRatio="none">
          <defs>
            <linearGradient id="crec-g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--fnx-naranja)" stopOpacity="0.45" />
              <stop offset="1" stopColor="var(--fnx-naranja)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#crec-g)" />
          <path d={linea} fill="none" stroke="var(--fnx-naranja)" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx={ux} cy={uy} r="3.6" fill="#fff" />
          <circle cx={ux} cy={uy} r="8" fill="var(--fnx-naranja)" opacity="0.35" className={cn(!reducido && "crec-pulso")} />
        </svg>
        <div className="mt-2 flex items-center justify-between border-t border-fnx-crema/10 pt-2 text-xs text-fnx-crema/70">
          <span className="font-semibold">Consultas por WhatsApp</span>
          <span key={consultas} className="num-roll headline text-xl text-fnx-naranja tabular-nums">{consultas}</span>
        </div>
      </div>

      {/* Aviso que aparece con cada consulta nueva */}
      {aviso > 0 && !reducido ? (
        <div key={aviso} className="crec-aviso" aria-hidden="true">
          <MessageCircle className="h-4 w-4 text-fnx-naranja" />
          <span>Nueva consulta</span>
        </div>
      ) : null}
    </div>
  );
}
