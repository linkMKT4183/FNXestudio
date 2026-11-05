import type { LucideIcon } from "lucide-react";
import logoCrema from "@/assets/brand/fnx-logo-crema.png";
import { cn } from "@/lib/utils";

export interface NetworkNode {
  label: string;
  icon: LucideIcon;
  /** Color CSS del nodo (usar variables de marca, p. ej. "var(--fnx-azul)"). */
  color: string;
}

/**
 * Red animada: FNX en el centro, conectado a cada nodo por líneas con pulsos de luz.
 * Ilustra "un solo contacto, todo un equipo" y "tenemos la red".
 */
export function NetworkViz({ nodes, className }: { nodes: NetworkNode[]; className?: string }) {
  const n = nodes.length;
  const R = 34; // radio en % del contenedor
  const pos = nodes.map((_, i) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180);
    return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
  });

  return (
    <div
      className={cn("net-viz relative mx-auto aspect-square w-full max-w-md", className)}
      role="img"
      aria-label={`Red FNX: ${nodes.map((x) => x.label).join(", ")}`}
    >
      {/* Anillos */}
      <div className="net-ring absolute inset-[12%] rounded-full border border-border" />
      <div className="net-ring net-ring-2 absolute inset-[26%] rounded-full border border-border/60" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {pos.map((p, i) => (
          <g key={i}>
            <line
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke={nodes[i]!.color}
              strokeOpacity="0.35"
              strokeWidth="0.4"
              className="net-line"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
            <circle r="1" fill={nodes[i]!.color}>
              <animateMotion
                dur="2.6s"
                begin={`${i * 0.45}s`}
                repeatCount="indefinite"
                path={`M50,50 L${p.x},${p.y}`}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="2.6s"
                begin={`${i * 0.45}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
        {/* Conexiones entre vecinos */}
        {pos.map((p, i) => {
          const q = pos[(i + 1) % n]!;
          return (
            <line
              key={`e-${i}`}
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              stroke="var(--fnx-linea)"
              strokeWidth="0.3"
              strokeDasharray="1 1.5"
            />
          );
        })}
      </svg>

      {/* Centro */}
      <div className="net-core absolute left-1/2 top-1/2 flex h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-area bg-background shadow-glow">
        <img src={logoCrema} alt="" className="w-[70%]" />
      </div>

      {/* Nodos */}
      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <div
            key={node.label}
            className="net-node absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
            style={{
              left: `${pos[i]!.x}%`,
              top: `${pos[i]!.y}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl border bg-card sm:h-14 sm:w-14"
              style={{
                borderColor: node.color,
                color: node.color,
                boxShadow: `0 0 28px -6px ${node.color}`,
              }}
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="whitespace-nowrap rounded-full bg-background/80 px-2.5 py-0.5 text-xs font-semibold text-foreground">
              {node.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
