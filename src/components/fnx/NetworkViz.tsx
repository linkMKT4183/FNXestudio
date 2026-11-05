import type { LucideIcon } from "lucide-react";
import logoCrema from "@/assets/brand/fnx-logo-crema.png";
import { cn } from "@/lib/utils";

export interface NetworkNode {
  label: string;
  icon: LucideIcon;
  /** Color CSS del nodo (usar variables de marca, p. ej. "var(--fnx-azul)"). */
  color: string;
}

/* Geometría en unidades del viewBox (0–100). */
const C = 50; // centro
const R = 34; // radio de la órbita donde están los nodos
const CORE = 11; // radio del núcleo FNX
const NODE = 6.5; // radio visual de cada nodo

/**
 * Red animada y simétrica: FNX en el centro y cada nodo sobre una órbita perfecta.
 * Las conexiones van del borde del núcleo al borde de cada nodo, con un pulso de luz
 * que viaja hacia afuera. Las etiquetas se ubican siempre hacia el exterior.
 */
export function NetworkViz({ nodes, className }: { nodes: NetworkNode[]; className?: string }) {
  const n = nodes.length;
  const pts = nodes.map((_, i) => {
    const a = ((-90 + (360 / n) * i) * Math.PI) / 180;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    return {
      cos,
      sin,
      x: C + R * cos,
      y: C + R * sin,
      x1: C + (CORE + 1.5) * cos,
      y1: C + (CORE + 1.5) * sin,
      x2: C + (R - NODE - 1) * cos,
      y2: C + (R - NODE - 1) * sin,
    };
  });

  return (
    <div
      className={cn("relative mx-auto aspect-square w-full max-w-[26rem]", className)}
      role="img"
      aria-label={`Red FNX: ${nodes.map((x) => x.label).join(", ")}`}
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="net-halo">
            <stop offset="0%" stopColor="var(--area)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--area)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Halo y órbitas */}
        <circle cx={C} cy={C} r={R * 0.75} fill="url(#net-halo)" className="net-halo" />
        <circle
          cx={C}
          cy={C}
          r={R}
          fill="none"
          stroke="var(--fnx-linea)"
          strokeWidth="0.3"
          strokeDasharray="0.6 1.4"
          className="net-orbit"
        />
        <circle
          cx={C}
          cy={C}
          r={R * 0.62}
          fill="none"
          stroke="var(--fnx-linea)"
          strokeWidth="0.25"
          className="net-orbit net-orbit-rev"
          strokeDasharray="0.4 2"
        />

        {/* Satélite que recorre la órbita */}
        <circle r="0.9" fill="var(--area)">
          <animateMotion
            dur="14s"
            repeatCount="indefinite"
            path={`M ${C} ${C - R} A ${R} ${R} 0 1 1 ${C - 0.01} ${C - R} Z`}
          />
        </circle>

        {/* Conexiones */}
        {pts.map((p, i) => {
          const color = nodes[i]!.color;
          const path = `M${p.x1},${p.y1} L${p.x2},${p.y2}`;
          return (
            <g key={i}>
              <line
                x1={p.x1}
                y1={p.y1}
                x2={p.x2}
                y2={p.y2}
                stroke={color}
                strokeWidth="0.35"
                strokeLinecap="round"
                className="net-line"
                style={{ animationDelay: `${(i * 3) / n}s` }}
              />
              <circle r="0.8" fill={color}>
                <animateMotion
                  dur="2.4s"
                  begin={`${(i * 2.4) / n}s`}
                  repeatCount="indefinite"
                  path={path}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.8;1"
                  dur="2.4s"
                  begin={`${(i * 2.4) / n}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Núcleo */}
      <div
        className="net-core absolute flex items-center justify-center rounded-full border border-area bg-background"
        style={{
          left: `${C - CORE}%`,
          top: `${C - CORE}%`,
          width: `${CORE * 2}%`,
          height: `${CORE * 2}%`,
        }}
      >
        <img src={logoCrema} alt="" className="w-[68%]" />
      </div>

      {/* Nodos */}
      {nodes.map((node, i) => {
        const p = pts[i]!;
        const Icon = node.icon;
        const side = Math.abs(p.cos) > 0.75;
        const labelPos = side
          ? p.cos > 0
            ? "top-full left-1/2 mt-2 -translate-x-1/2 sm:left-full sm:top-1/2 sm:mt-0 sm:ml-3 sm:translate-x-0 sm:-translate-y-1/2"
            : "top-full left-1/2 mt-2 -translate-x-1/2 sm:left-auto sm:right-full sm:top-1/2 sm:mt-0 sm:mr-3 sm:translate-x-0 sm:-translate-y-1/2"
          : p.sin > 0
            ? "top-full left-1/2 mt-3 -translate-x-1/2"
            : "bottom-full left-1/2 mb-3 -translate-x-1/2";
        return (
          <div
            key={node.label}
            className="absolute"
            style={{
              left: `${p.x - NODE}%`,
              top: `${p.y - NODE}%`,
              width: `${NODE * 2}%`,
              height: `${NODE * 2}%`,
            }}
          >
            <span
              className="net-node flex h-full w-full items-center justify-center rounded-2xl border bg-card"
              style={{
                borderColor: node.color,
                color: node.color,
                boxShadow: `0 0 24px -8px ${node.color}`,
                animationDelay: `${(i * 3) / n}s`,
              }}
            >
              <Icon className="h-[45%] w-[45%]" aria-hidden="true" />
            </span>
            <span
              className={cn(
                "absolute whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground sm:text-xs",
                labelPos,
              )}
            >
              {node.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
