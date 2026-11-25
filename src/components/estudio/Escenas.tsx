import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Heart, Moon, Play, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Animaciones explicativas de «Lo que hacemos» (FNX Estudio). Cada escena cuenta en 6 segundos qué hace el servicio:
 * negro, grafito, crema y naranja; curva de entrada suave y siempre algo en movimiento. Corren solo mientras se ven
 * y con «reducir movimiento» quedan en su estado final.
 */
function Escena({ children, etiqueta, className }: { children: ReactNode | ((play: boolean) => ReactNode); etiqueta: string; className?: string }) {
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
      {typeof children === "function" ? children(play) : children}
    </div>
  );
}

/** Un número que sube mientras la escena se ve. */
function useCuenta(play: boolean, desde: number, paso: number, cada = 140, tope = 99999) {
  const [n, setN] = useState(desde);
  useEffect(() => {
    if (!play) return;
    const t = window.setInterval(() => setN((v) => (v + paso > tope ? desde : v + paso)), cada);
    return () => window.clearInterval(t);
  }, [play, desde, paso, cada, tope]);
  return n;
}
const miles = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const d = (s: number) => ({ animationDelay: `${s}s` });

export function EscenaBranding() {
  return (
    <Escena etiqueta="Animación: se dibuja el logo de FNX y una chispa naranja lo lleva a una tarjeta, un perfil de Instagram y una bolsa, que se encienden una por una.">
      <p className="ev-tag">Tu identidad, aplicada</p>
      <div className="ev-logo ev-logo-s ev-logo-late">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="var(--fnx-naranja)" strokeWidth="3" className="ev-trazo" pathLength={1} />
        </svg>
        <span className="headline text-xl text-fnx-crema">FNX</span>
      </div>
      <div className="ev-colores ev-colores-s">
        {["#0B0B0B", "#1C1C1C", "#F3EEE4", "#F2552C"].map((c, i) => (
          <span key={c} className={cn("ev-pop", i === 3 && "ev-color-marca")} style={{ background: c, ...d(0.5 + i * 0.15) }} />
        ))}
      </div>
      <span className="ev-chispa" aria-hidden="true" />
      <div className="ev-apps ev-flota">
        <div className="ev-app ev-tarjeta ev-enciende" style={d(1.92)} aria-hidden="true">
          <span className="headline ev-sello text-base text-fnx-negro" style={d(1.92)}>FNX</span>
          <i /> <i /> <b />
        </div>
        <div className="ev-app ev-perfil ev-enciende" style={d(2.76)} aria-hidden="true">
          <span className="ev-avatar ev-sello" style={d(2.76)}><span className="headline text-[0.6rem] text-fnx-crema">FNX</span></span>
          <div className="ev-grilla"><i className="bg-fnx-naranja" /><i /><i /><i /><i className="bg-fnx-naranja" /><i /></div>
        </div>
        <div className="ev-app ev-bolsa ev-enciende" style={d(3.48)} aria-hidden="true">
          <u />
          <span className="headline ev-sello text-sm text-fnx-negro" style={d(3.48)}>FNX</span>
        </div>
      </div>
    </Escena>
  );
}


export function EscenaAudiovisual() {
  const reloj = (n: number) => `00:0${Math.floor(n / 24) % 10}:${String(n % 24).padStart(2, "0")}`;
  return (
    <Escena etiqueta="Animación: una línea de tiempo de edición de video con varias pistas, un cursor que avanza y un corte de cuchilla.">
      {(play) => <Edicion play={play} reloj={reloj} />}
    </Escena>
  );
}

function Edicion({ play, reloj }: { play: boolean; reloj: (n: number) => string }) {
  const f = useCuenta(play, 0, 1, 42, 239);
  return (
    <>
      <p className="ev-tag">Idea · filmación · edición</p>
      <div className="ev-monitor" aria-hidden="true">
        <Play className="h-6 w-6 fill-fnx-crema text-fnx-crema" />
        <span className="ev-rec">REC</span>
        <span className="ev-codigo">{reloj(f)}</span>
      </div>
      <div className="ev-onda" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} style={{ animationDelay: `${i * 0.09}s` }} />
        ))}
      </div>
      <div className="ev-timeline ev-pistas" aria-hidden="true">
        <div className="ev-regla">{Array.from({ length: 13 }, (_, i) => <i key={i} />)}</div>
        <div className="ev-pista"><span className="ev-clip ev-entra" style={{ left: "0%", width: "26%", ...d(0.2) }} /><span className="ev-clip ev-clip-n ev-entra" style={{ left: "28%", width: "20%", ...d(0.4) }} /><span className="ev-clip ev-entra ev-corte" style={{ left: "50%", width: "48%", ...d(0.6) }} /></div>
        <div className="ev-pista"><span className="ev-clip ev-clip-g ev-entra" style={{ left: "10%", width: "34%", ...d(0.8) }} /><span className="ev-clip ev-clip-g ev-entra" style={{ left: "46%", width: "30%", ...d(1.0) }} /></div>
        <div className="ev-pista"><span className="ev-clip ev-clip-a ev-entra" style={{ left: "0%", width: "96%", ...d(1.2) }} /></div>
        <span className="ev-cursor" />
      </div>
    </>
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
    <Escena etiqueta="Animación: un panel de redes con una publicación programada, el alcance que sube y un calendario que se enciende día por día.">
      {(play) => <PanelRedes play={play} />}
    </Escena>
  );
}

function PanelRedes({ play }: { play: boolean }) {
  const alcance = useCuenta(play, 12400, 173, 120, 48000);
  return (
    <>
      <p className="ev-tag">Calendario · diseño · textos</p>
      <div className="ev-post ev-pop" style={d(0.1)} aria-hidden="true">
        <div className="ev-post-img"><span className="headline text-lg text-fnx-crema">FNX</span></div>
        <div className="flex items-center justify-between px-1.5 pt-1">
          <Heart className="h-3.5 w-3.5 fill-fnx-naranja text-fnx-naranja" />
          <span className="ev-estado"><b>Programado</b><b>Publicado</b></span>
        </div>
      </div>
      <div className="ev-kpi ev-sube" style={d(0.6)} aria-hidden="true">
        <span>Alcance</span>
        <strong className="headline text-2xl text-fnx-crema tabular-nums">{miles(alcance)}</strong>
        <span className="ev-delta">↑ en vivo</span>
      </div>
      <div className="ev-barras" aria-hidden="true">
        {[34, 48, 40, 62, 55, 78, 92].map((h, i) => (
          <i key={i} style={{ height: `${h}%`, animationDelay: `${0.9 + i * 0.12}s` }} />
        ))}
      </div>
      <div className="ev-dias" aria-hidden="true">
        {["L", "M", "X", "J", "V", "S", "D"].map((l, i) => (
          <span key={l} className="ev-dia2" style={{ animationDelay: `${0.8 + i * 0.5}s` }}>{l}</span>
        ))}
        <em className="ev-barrido" />
      </div>
    </>
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
