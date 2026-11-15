import { useEffect, useRef, useState } from "react";
import { Calendar, Camera, Fingerprint, ShoppingBag, Target, type LucideIcon } from "lucide-react";
import { IconBadge, TenSeconds } from "@/components/fnx/primitives";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { trackEvent } from "@/lib/track";
import { cn } from "@/lib/utils";

export const SENALES: { id: string; icon: LucideIcon; title: string; text: string }[] = [
  { id: "identidad", icon: Fingerprint, title: "Identidad", text: "Si cada posteo usa otro color y otra letra, nadie te recuerda. Un logo fijo, dos colores y un manual alcanzan para que te reconozcan antes de leer tu nombre." },
  { id: "imagen", icon: Camera, title: "Imagen", text: "Una foto sacada a las apuradas dice «improvisado». Con una idea, buena luz y edición, lo mismo se ve como una marca." },
  { id: "tienda", icon: ShoppingBag, title: "Tienda", text: "Si cada venta depende de que contestes un mensaje, perdés las que llegan a la noche. Una tienda online cobra mientras dormís." },
  { id: "constancia", icon: Calendar, title: "Constancia", text: "Tres posteos en una semana y después nada: tu público se olvida rápido. Con un calendario, vos aprobás y nosotros publicamos." },
  { id: "estrategia", icon: Target, title: "Estrategia", text: "Pauta sin objetivo es plata que se va. Primero el público y el mensaje; después la inversión." },
];

export function resultadoMarca(n: number): string {
  return n <= 1
    ? "Vas bien. Con una consultoría de 15 minutos afinamos lo que falta."
    : "Tu marca tiene margen para crecer. Y se arregla. Empecemos por una consultoría de 15 minutos.";
}

export function PruebaMarca() {
  const [marcadas, setMarcadas] = useState<Set<string>>(new Set());
  const n = marcadas.size;
  const tier = n <= 1 ? 0 : 1;
  const prev = useRef<number | null>(null);
  useEffect(() => {
    if (prev.current !== null && prev.current !== tier) trackEvent("test_marca_resultado", { senales: n });
    prev.current = tier;
  }, [tier, n]);

  const toggle = (id: string) =>
    setMarcadas((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="flex flex-col gap-8">
      <fieldset className="grid gap-4 md:grid-cols-2">
        <legend className="sr-only">Señales de una marca que pasa desapercibida</legend>
        {SENALES.map((s) => {
          const on = marcadas.has(s.id);
          return (
            <label
              key={s.id}
              className={cn(
                "flex cursor-pointer gap-4 rounded-2xl border bg-card p-5 transition-[border-color,transform] duration-300 motion-reduce:transition-none",
                on ? "border-area" : "border-border hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
              )}
            >
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 shrink-0 accent-[var(--area)]"
                checked={on}
                onChange={() => toggle(s.id)}
              />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <IconBadge icon={s.icon} size="sm" variant={on ? "solid" : "outline"} />
                  <span className="text-lg font-bold text-foreground">{s.title}</span>
                </div>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            </label>
          );
        })}
      </fieldset>
      <div className="flex flex-col items-start gap-4" aria-live="polite">
        <p className="headline text-4xl text-foreground">
          Te pasan <span className="text-area">{n}</span> de 5
        </p>
        <TenSeconds className="max-w-3xl">{resultadoMarca(n)}</TenSeconds>
        <WhatsAppButton topic="consultoria15" label="Quiero mi consultoría de 15 minutos" />
      </div>
    </div>
  );
}
