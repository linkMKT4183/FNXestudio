import { useEffect, useState } from "react";
import { Check, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Ilustración animada: un expediente con los requisitos legales de una ONG
 * que se van verificando uno por uno, con un sello que se enciende al final.
 * Sin personas: comunica legalidad y normativa.
 */
export function LegalDocVisual({
  title = "Legajo de la ONG",
  items,
  className,
}: {
  title?: string;
  items: string[];
  className?: string;
}) {
  const [done, setDone] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setDone((d) => (d >= items.length + 2 ? 0 : d + 1)), 900);
    return () => window.clearInterval(t);
  }, [items.length]);
  const sealed = done > items.length;

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-background p-6",
        className,
      )}
      role="img"
      aria-label={`${title}: ${items.join(", ")}`}
    >
      <div className="tono-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* Hojas de fondo */}
      <div className="absolute h-[78%] w-[58%] -rotate-6 rounded-xl border border-border bg-card/60" />
      <div className="absolute h-[78%] w-[58%] rotate-3 rounded-xl border border-border bg-card/80" />

      {/* Documento principal */}
      <div className="relative flex h-[82%] w-[62%] flex-col gap-2 rounded-xl border border-area/60 bg-card p-4 shadow-glow-soft">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <Scale className="h-4 w-4 text-area" aria-hidden="true" />
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-foreground">
            {title}
          </span>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-1.5">
          {items.map((it, i) => {
            const ok = i < done;
            return (
              <li key={it} className="flex items-center gap-2 text-[0.7rem] leading-tight">
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    ok ? "border-area bg-area text-area-foreground" : "border-border",
                  )}
                >
                  {ok ? <Check className="h-3 w-3" aria-hidden="true" /> : null}
                </span>
                <span className={ok ? "text-foreground" : "text-muted-foreground"}>{it}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Sello */}
      <div
        className={cn(
          "absolute bottom-[8%] right-[14%] flex h-16 w-16 rotate-[-12deg] items-center justify-center rounded-full border-2 border-area text-center text-[0.5rem] font-bold uppercase leading-tight tracking-wider text-area transition-all duration-500",
          sealed ? "scale-100 opacity-100 shadow-glow" : "scale-150 opacity-0",
        )}
        aria-hidden="true"
      >
        En
        <br />
        regla
      </div>
    </div>
  );
}
