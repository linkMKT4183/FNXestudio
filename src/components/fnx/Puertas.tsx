import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, HeartHandshake, Newspaper, PenTool, Scale, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/fnx/primitives";
import { trackEvent } from "@/lib/track";
import { cn } from "@/lib/utils";

type Area = "estudio" | "consultoria" | "salud" | "noticias";

interface Puerta {
  to: "/estudio" | "/consultoria" | "/salud" | "/noticias" | "/red";
  area?: Area;
  kicker: string;
  title: string;
  icon: LucideIcon;
  /** En computadora no se muestra: ahí Profesionales está en la barra de secciones. */
  soloCelular?: boolean;
}

const PUERTAS: Puerta[] = [
  { to: "/consultoria", area: "consultoria", kicker: "FNX Consultoría", title: "Quiero impulsar mi negocio", icon: Scale },
  { to: "/estudio", area: "estudio", kicker: "FNX Estudio", title: "Quiero hacer crecer mi marca", icon: PenTool },
  { to: "/salud", area: "salud", kicker: "FNX Salud · +18", title: "Quiero hacer mi REPROCANN (+18)", icon: HeartHandshake },
  { to: "/noticias", area: "noticias", kicker: "FNX Noticias", title: "Quiero estar al día", icon: Newspaper },
  { to: "/red", kicker: "Profesionales", title: "Soy profesional y quiero sumarme", icon: Users, soloCelular: true },
];

/**
 * Las puertas del inicio en formato barras: ícono redondo del color del área, etiqueta, título y flecha.
 * Una columna en celular, cuatro en computadora. Entran escalonadas desde la izquierda.
 */
export function Puertas() {
  return (
    <nav aria-label="¿Qué necesitás hoy?">
      <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-fnx-crema/70 md:hidden">
        ¿Qué necesitás hoy?
        <ArrowDown className="h-4 w-4 text-area" aria-hidden="true" />
      </p>
      <Reveal as="ul" stagger variant="left" className="grid gap-2.5 md:grid-cols-4 md:gap-4">
        {PUERTAS.map((p) => (
          <li key={p.to} data-area={p.area} className={cn("min-w-0", p.soloCelular && "md:hidden")}>
            <PuertaBarra {...p} />
          </li>
        ))}
      </Reveal>
    </nav>
  );
}

function PuertaBarra({ to, area, kicker, title, icon: Icon }: Puerta) {
  const color = area ? "area" : "crema";
  // En celular un solo color: la puerta principal (Consultoría) va en su color y las demás en neutro, para que se vea dónde tocar.
  const principal = area === "consultoria";
  return (
    <Link
      to={to}
      onClick={() => trackEvent("door_click", { area: area ?? "red" })}
      className={cn(
        "puerta spot group relative flex h-[68px] min-w-0 items-center gap-3 rounded-full border bg-background/60 p-2.5 pr-3 backdrop-blur-md md:h-[76px]",
        color === "area"
          ? principal
            ? "border-area/60 hover:border-area"
            : "border-area/50 hover:border-area md:border-area/40"
          : "border-fnx-crema/30 hover:border-fnx-crema",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "puerta-icono inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full md:h-[52px] md:w-[52px]",
          color === "area"
            ? principal
              ? "bg-area text-area-foreground icon-glossy"
              : "bg-area text-area-foreground icon-glossy"
            : "bg-fnx-grafito text-fnx-crema ring-1 ring-fnx-crema/15 md:bg-fnx-crema md:text-fnx-negro md:ring-0",
        )}
      >
        <Icon className="h-6 w-6" strokeWidth={1.9} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span
          className={cn(
            "truncate text-[0.62rem] font-bold uppercase tracking-[0.14em]",
            color === "area" ? "text-area" : "text-fnx-crema",
          )}
        >
          {kicker}
          {principal ? <span className="ml-2 rounded-full bg-area/15 px-2 py-0.5 text-[0.58rem] tracking-[0.1em] text-area md:hidden">Empezá acá</span> : null}
        </span>
        <span className="headline line-clamp-2 pt-[0.28em] text-[0.98rem] leading-[1.05] text-foreground md:text-[1.02rem]">
          {title}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "puerta-flecha inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full md:h-10 md:w-10",
          color === "area"
            ? principal
              ? "bg-area text-area-foreground icon-glossy"
              : "bg-area text-area-foreground icon-glossy"
            : "bg-fnx-crema/10 text-fnx-crema md:bg-fnx-crema md:text-fnx-negro",
        )}
      >
        <ArrowRight className="h-[1.1rem] w-[1.1rem]" strokeWidth={2.2} />
      </span>
    </Link>
  );
}
