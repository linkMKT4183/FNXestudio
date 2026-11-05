import { useEffect, useState } from "react";
import { CheckCheck, Phone, Video } from "lucide-react";
import logoCrema from "@/assets/brand/fnx-logo-crema.png";
import { cn } from "@/lib/utils";

/**
 * Maqueta de un chat de WhatsApp con FNX: la persona pregunta y FNX responde.
 * Al cambiar la pregunta, se muestra "escribiendo…" y aparece la respuesta.
 * Es una ilustración: los colores imitan el modo oscuro de WhatsApp.
 */
export function WhatsAppChat({
  question,
  answer,
  name = "FNX Salud",
  className,
}: {
  question: string;
  answer: string;
  name?: string | undefined;
  className?: string | undefined;
}) {
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setTyping(true);
    const t = window.setTimeout(() => setTyping(false), 1400);
    return () => window.clearTimeout(t);
  }, [question]);

  return (
    <figure
      className={cn(
        "mx-auto w-full max-w-sm overflow-hidden rounded-[2.2rem] border-[6px] border-[#1c1c1c] bg-[#0b141a] shadow-glow-soft",
        className,
      )}
      aria-label={`Ejemplo de conversación por WhatsApp con ${name}`}
    >
      {/* Encabezado */}
      <div className="flex items-center gap-3 bg-[#1f2c34] px-4 py-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0b0b0b] ring-1 ring-white/10">
          <img src={logoCrema} alt="" className="w-8" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#e9edef]">{name}</p>
          <p className="text-xs text-[#8696a0]">
            {typing ? <span className="text-area">escribiendo…</span> : "en línea"}
          </p>
        </div>
        <Video className="h-5 w-5 text-[#aebac1]" aria-hidden="true" />
        <Phone className="h-4 w-4 text-[#aebac1]" aria-hidden="true" />
      </div>

      {/* Conversación */}
      <div className="wa-wallpaper flex min-h-[19rem] flex-col gap-2 px-3 py-4 text-sm">
        <p className="mx-auto mb-1 rounded-md bg-[#182229] px-2.5 py-1 text-[0.7rem] text-[#8696a0]">
          Los mensajes están protegidos y son confidenciales
        </p>

        <div
          key={`q-${question}`}
          className="wa-in ml-auto max-w-[80%] rounded-lg rounded-tr-none bg-[#005c4b] px-3 py-2 text-[#e9edef]"
        >
          {question}
          <span className="mt-1 flex items-center justify-end gap-1 text-[0.65rem] text-[#8fbfb3]">
            10:24 <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" aria-hidden="true" />
          </span>
        </div>

        {typing ? (
          <div className="wa-in mr-auto flex gap-1 rounded-lg rounded-tl-none bg-[#1f2c34] px-3 py-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="wa-dot h-2 w-2 rounded-full bg-[#8696a0]"
                style={{ animationDelay: `${i * 160}ms` }}
              />
            ))}
          </div>
        ) : (
          <div
            key={`a-${question}`}
            className="wa-in mr-auto max-w-[85%] rounded-lg rounded-tl-none bg-[#1f2c34] px-3 py-2 text-[#e9edef]"
          >
            {answer}
            <span className="mt-1 block text-right text-[0.65rem] text-[#8696a0]">10:25</span>
          </div>
        )}
      </div>
    </figure>
  );
}

/** Chat que va rotando entre varias consultas, para los bloques de contacto. */
export function WhatsAppChatLoop({
  pairs,
  name,
  interval = 6000,
  className,
}: {
  pairs: { q: string; a: string }[];
  name?: string;
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((v) => (v + 1) % pairs.length), interval);
    return () => window.clearInterval(t);
  }, [pairs.length, interval]);
  const p = pairs[i] ?? pairs[0]!;
  return <WhatsAppChat question={p.q} answer={p.a} name={name} className={className} />;
}
