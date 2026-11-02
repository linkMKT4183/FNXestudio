import { useState, type ReactNode } from "react";
import { Check, X } from "lucide-react";
import { Headline, Pieces, Tag, TenSeconds } from "@/components/fnx/primitives";
import { ExpandCard, FlipCard } from "@/components/fnx/cards";
import { cn } from "@/lib/utils";

type Area = "estudio" | "consultoria" | "salud" | "noticias";

function Panel({
  eyebrow,
  lead,
  accent,
  tldr,
  children,
}: {
  eyebrow: string;
  lead?: string;
  accent: string;
  tldr: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <p className="eyebrow text-muted-foreground">{eyebrow}</p>
        <Headline lead={lead} accent={accent} className="text-5xl sm:text-7xl" />
        <TenSeconds className="max-w-3xl">{tldr}</TenSeconds>
      </div>
      {children}
    </div>
  );
}

function AreaSelector({ value, onChange, label }: { value: Area; onChange: (a: Area) => void; label: string }) {
  const opts: { v: Area; l: string }[] = [
    { v: "estudio", l: "Estudio" },
    { v: "consultoria", l: "Consultoría" },
    { v: "salud", l: "Salud" },
    { v: "noticias", l: "Noticias" },
  ];
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex max-w-full self-start overflow-x-auto rounded-full border border-border p-1">
      {opts.map((o) => (
        <button
          key={o.v}
          type="button"
          role="radio"
          aria-checked={value === o.v}
          data-area={o.v}
          onClick={() => onChange(o.v)}
          className={cn(
            "h-10 shrink-0 rounded-full px-3.5 text-sm font-semibold transition-colors sm:px-5",
            value === o.v ? "bg-area text-area-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

/* 1. Esencia */
export function Esencia() {
  return (
    <Panel
      eyebrow="Esencia"
      lead="Renacer y"
      accent="transformar."
      tldr="Tomamos lo que existe y lo hacemos renacer con más fuerza."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-7">
          <p className="text-lg leading-relaxed text-foreground">
            Fénix Creativo es el estudio de Nadin Reus en Mendoza. Une creatividad, producción
            audiovisual y una red de confianza en salud.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Toma lo que existe y lo hace renacer con más claridad y más fuerza.
          </p>
        </div>
        <div className="flex flex-col justify-between gap-8 rounded-2xl border border-border p-7">
          <p className="eyebrow text-area">Concepto</p>
          <Pieces lit={2} size="lg" />
          <p className="leading-relaxed text-foreground">
            Uno que se destaca entre muchos: cada pieza es un mundo negro donde una sola cosa se
            enciende en el color del área.
          </p>
        </div>
      </div>
    </Panel>
  );
}

/* 2. Misión y visión */
export function MisionVision() {
  return (
    <Panel
      eyebrow="Misión y visión"
      lead="Para qué"
      accent="existimos."
      tldr="Crear marcas con carácter y conectar con gente de confianza."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <ExpandCard title="Misión" kicker={<span className="eyebrow text-area">Hoy</span>} defaultOpen>
          Crear marcas con carácter y conectar a las personas con profesionales y organizaciones de
          confianza, con claridad, responsabilidad y una mirada propia.
        </ExpandCard>
        <ExpandCard title="Visión" kicker={<span className="eyebrow text-area">Mañana</span>} defaultOpen>
          Ser la referencia en Argentina para las marcas que quieren destacarse y para quienes buscan
          información y acompañamiento confiable en salud.
        </ExpandCard>
      </div>
    </Panel>
  );
}

/* 3. Valores */
const VALUES = [
  { t: "Carácter", d: "Cada pieza tiene una idea propia." },
  { t: "Claridad", d: "Decimos las cosas simples y sin vueltas." },
  { t: "Confianza verificada", d: "Solo trabajamos con profesionales y marcas que cumplen." },
  { t: "Responsabilidad", d: "Comunicamos salud con cuidado y para adultos." },
  { t: "Coherencia", d: "Lo que prometemos es lo que hacemos." },
];

export function Valores() {
  return (
    <Panel
      eyebrow="Valores"
      lead="Lo que nos"
      accent="sostiene."
      tldr="Cinco valores. Tocá cada tarjeta para darla vuelta."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VALUES.map((v, i) => (
          <FlipCard
            key={v.t}
            label={v.t}
            front={
              <div className="flex flex-col gap-4">
                <span className="headline text-2xl text-muted-foreground">0{i + 1}</span>
                <span className="headline text-4xl text-foreground">{v.t}</span>
              </div>
            }
            back={
              <div className="flex flex-col gap-3">
                <span className="eyebrow">{v.t}</span>
                <p className="text-xl font-bold leading-snug">{v.d}</p>
              </div>
            }
          />
        ))}
      </div>
    </Panel>
  );
}

/* 5. Tono */
const TONES: Record<Area, { name: string; tone: string; phrase: string }> = {
  estudio: { name: "FNX Estudio", tone: "Directo, con carácter, seguro.", phrase: "Desatamos tu marca." },
  consultoria: {
    name: "FNX Consultoría",
    tone: "Experto, claro y sin juzgar.",
    phrase: "Crecer en regla.",
  },
  salud: {
    name: "FNX Salud",
    tone: "Cercano, claro, sin estigma, responsable.",
    phrase: "Te acompañamos en cada paso.",
  },
  noticias: {
    name: "FNX Noticias",
    tone: "Informativo, preciso, con fuentes.",
    phrase: "Lo que pasa, contado con fuentes.",
  },
};

export function Tono() {
  const [area, setArea] = useState<Area>("estudio");
  const t = TONES[area];
  return (
    <div data-area={area}>
      <Panel
        eyebrow="Tono"
        lead="Una voz,"
        accent="cuatro registros."
        tldr="Hablamos igual de claro, pero cambiamos el registro según el área."
      >
        <AreaSelector value={area} onChange={setArea} label="Elegí un área" />
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-6 rounded-2xl border border-area bg-card p-7" aria-live="polite">
            <span className="eyebrow text-area">{t.name}</span>
            <p className="text-lg font-semibold text-foreground">{t.tone}</p>
            <p className="headline phrase-in text-5xl text-area sm:text-6xl" key={area}>
              {t.phrase}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-border p-6">
              <p className="eyebrow mb-4 text-foreground">Así sí</p>
              <ul className="flex flex-col gap-3">
                {["Desatamos tu marca.", "Elegís vos.", "Te acompañamos en cada paso."].map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-area" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border p-6">
              <p className="eyebrow mb-4 text-foreground">Así no</p>
              <ul className="flex flex-col gap-3">
                {[
                  "Frases largas.",
                  "Promesas exageradas.",
                  "Adjetivos vacíos como innovador o disruptivo.",
                ].map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* 6. A quién le hablamos */
const PERSONAS = [
  {
    name: "Lucía",
    area: "FNX Estudio",
    tone: "naranja" as const,
    who: "Dueña de una pyme de Mendoza, 35 a 45 años.",
    needs: "Una marca profesional, contenido constante y vender online.",
    blocks: "No tener tiempo ni saber a quién delegar.",
    message: "Que tu marca no pase desapercibida.",
  },
  {
    name: "Dr. Martín",
    area: "FNX Salud",
    tone: "verde" as const,
    who: "Médico matriculado de 40 a 55 años con formación en cannabis medicinal.",
    needs: "Pacientes derivados de forma ordenada y comunicar su trabajo dentro de la norma.",
    blocks: "El estigma y el miedo a incumplir la normativa.",
    message: "Te conectamos con pacientes que buscan un profesional de confianza.",
  },
  {
    name: "Sofía",
    area: "FNX Salud",
    tone: "verde" as const,
    who: "Paciente adulta, mayor de 18.",
    needs: "Hacer su trámite y encontrar un médico confiable.",
    blocks: "No saber por dónde empezar y desconfiar de lo que ve en redes.",
    message: "Te acompañamos en cada paso.",
  },
  {
    name: "ONG",
    area: "FNX Salud",
    tone: "verde" as const,
    who: "Inscripta en REPROCANN, con director médico.",
    needs: "Sumar pacientes de forma transparente y comunicar mejor.",
    blocks: "La poca visibilidad.",
    message: "Te mostramos como una opción verificada.",
  },
  {
    name: "Proyecto productivo",
    area: "FNX Consultoría",
    tone: "azul" as const,
    who: "Productores, cooperativas, emprendimientos agrícolas y proyectos cannábicos que quieren profesionalizarse.",
    needs: "Ordenar, tecnificar y crecer dentro de la ley.",
    blocks: "No tener la parte técnica o legal en regla.",
    message: "Crecer en regla.",
  },
];

export function Publico() {
  return (
    <Panel
      eyebrow="A quién le hablamos"
      lead="Cinco perfiles,"
      accent="un mensaje."
      tldr="Lucía, Dr. Martín, Sofía, las ONGs y los proyectos productivos. Tocá para conocerlos."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {PERSONAS.map((p) => (
          <ExpandCard
            key={p.name}
            title={p.name}
            kicker={
              <Tag tone={p.tone} className="self-start">
                {p.area}
              </Tag>
            }
          >
            <dl className="flex flex-col gap-4">
              <div>
                <dt className="eyebrow text-muted-foreground">Quién es</dt>
                <dd className="mt-1 text-foreground">{p.who}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">Necesita</dt>
                <dd className="mt-1 text-foreground">{p.needs}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted-foreground">La frena</dt>
                <dd className="mt-1 text-foreground">{p.blocks}</dd>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <dt className="eyebrow text-muted-foreground">Mensaje</dt>
                <dd className="mt-1 text-base font-bold text-foreground">“{p.message}”</dd>
              </div>
            </dl>
          </ExpandCard>
        ))}
      </div>
    </Panel>
  );
}
