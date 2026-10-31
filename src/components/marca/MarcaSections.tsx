import { useState, type ReactNode } from "react";
import { Check, Copy, ExternalLink, X } from "lucide-react";
import { toast } from "sonner";
import { Headline, Logo, Pieces, Tag, TenSeconds } from "@/components/fnx/primitives";
import { ExpandCard, FlipCard } from "@/components/fnx/cards";
import { Button } from "@/components/ui/button";
import { MANUAL_URL } from "@/config/site";
import { cn } from "@/lib/utils";

type Area = "estudio" | "salud" | "noticias";

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
    { v: "salud", l: "Salud" },
    { v: "noticias", l: "Noticias" },
  ];
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-full border border-border p-1">
      {opts.map((o) => (
        <button
          key={o.v}
          type="button"
          role="radio"
          aria-checked={value === o.v}
          data-area={o.v}
          onClick={() => onChange(o.v)}
          className={cn(
            "h-10 rounded-full px-5 text-sm font-semibold transition-colors",
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

/* 4. Personalidad */
const TRAITS = [
  { a: "Seria", b: "Juguetona", v: 28 },
  { a: "Clásica", b: "Moderna", v: 74 },
  { a: "Discreta", b: "Audaz", v: 78 },
  { a: "Distante", b: "Cercana", v: 80 },
];

export function Personalidad() {
  return (
    <Panel
      eyebrow="Personalidad"
      lead="La Creadora"
      accent="que guía."
      tldr="Moderna, audaz y cercana, pero más seria que juguetona."
    >
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-7">
        <p className="text-sm text-muted-foreground">
          Arquetipo: <span className="font-semibold text-foreground">la Creadora que guía</span>
        </p>
        <ul className="flex flex-col gap-7">
          {TRAITS.map((t) => (
            <li key={t.a} className="flex flex-col gap-2">
              <div className="flex justify-between text-sm font-semibold">
                <span className={t.v < 50 ? "text-foreground" : "text-muted-foreground"}>{t.a}</span>
                <span className={t.v >= 50 ? "text-foreground" : "text-muted-foreground"}>{t.b}</span>
              </div>
              <div
                className="relative h-3 rounded-full bg-background"
                role="meter"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={t.v}
                aria-label={`${t.a} a ${t.b}: ${t.v}%`}
              >
                <div className="absolute inset-y-0 left-0 rounded-full bg-area" style={{ width: `${t.v}%` }} />
                <span
                  className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-card bg-foreground"
                  style={{ left: `${t.v}%` }}
                  aria-hidden="true"
                />
              </div>
              <span className="text-xs text-muted-foreground">{t.v}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}

/* 5. Tono */
const TONES: Record<Area, { name: string; tone: string; phrase: string }> = {
  estudio: { name: "FNX Estudio", tone: "Directo, con carácter, seguro.", phrase: "Desatamos tu marca." },
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
        accent="tres registros."
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
];

export function Publico() {
  return (
    <Panel
      eyebrow="A quién le hablamos"
      lead="Cuatro personas,"
      accent="un mensaje."
      tldr="Lucía, Dr. Martín, Sofía y las ONGs. Tocá para conocerlas."
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

/* 7. Identidad visual */
const SWATCHES = [
  { name: "Negro", hex: "#0B0B0B", cls: "bg-fnx-negro text-fnx-crema" },
  { name: "Grafito", hex: "#1C1C1C", cls: "bg-fnx-grafito text-fnx-crema" },
  { name: "Crema", hex: "#F3EEE4", cls: "bg-fnx-crema text-fnx-negro" },
  { name: "Gris", hex: "#A3A3A3", cls: "bg-fnx-gris text-fnx-negro" },
  { name: "Naranja fuego", hex: "#F2552C", cls: "bg-fnx-naranja text-fnx-negro" },
  { name: "Verde", hex: "#3CCB7F", cls: "bg-fnx-verde text-fnx-negro" },
  { name: "Amarillo", hex: "#FFD23F", cls: "bg-fnx-amarillo text-fnx-negro" },
];

const POST: Record<Area, { lead: string; accent: string; tag: string }> = {
  estudio: { lead: "Primero la marca.", accent: "Después la pauta.", tag: "FNX Estudio" },
  salud: { lead: "Te acompañamos en", accent: "cada paso.", tag: "FNX Salud · +18" },
  noticias: { lead: "Lo que pasa, contado", accent: "con fuentes.", tag: "FNX Noticias" },
};

export function IdentidadVisual() {
  const [area, setArea] = useState<Area>("estudio");
  const post = POST[area];

  const copy = async (hex: string, name: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      toast.success(`${name} ${hex} copiado`);
    } catch {
      toast.error(`No pudimos copiar. El código es ${hex}`);
    }
  };

  return (
    <Panel
      eyebrow="Identidad visual"
      lead="Negro, crema y"
      accent="una chispa."
      tldr="Fondo negro, texto crema y un solo color de acento por pieza."
    >
      {/* Logo */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex min-h-64 items-center justify-center rounded-2xl border border-border bg-background p-8">
          <Logo className="text-[9rem]" />
        </div>
        <div className="flex flex-col justify-center gap-3 rounded-2xl border border-border bg-card p-7">
          <p className="eyebrow text-area">Logo</p>
          <p className="text-foreground">Solo la palabra Fnx, en Mrs Saint Delafield y color crema.</p>
          <p className="text-sm text-muted-foreground">Nada debajo ni al lado.</p>
        </div>
      </div>

      {/* Paleta */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-foreground">Paleta · tocá para copiar</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {SWATCHES.map((s) => (
            <button
              key={s.hex}
              type="button"
              onClick={() => copy(s.hex, s.name)}
              aria-label={`Copiar ${s.name} ${s.hex}`}
              className={cn(
                "group flex aspect-square flex-col justify-between rounded-2xl border border-border p-4 text-left",
                s.cls,
              )}
            >
              <Copy className="h-4 w-4 opacity-60 group-hover:opacity-100" aria-hidden="true" />
              <span className="flex flex-col">
                <span className="text-sm font-bold">{s.name}</span>
                <span className="font-mono text-xs opacity-80">{s.hex}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex h-10 overflow-hidden rounded-full border border-border" aria-hidden="true">
            <span className="w-[70%] bg-fnx-negro" />
            <span className="w-[20%] bg-fnx-crema" />
            <span className="w-[10%] bg-area" />
          </div>
          <p className="text-sm text-muted-foreground">
            Regla <span className="font-semibold text-foreground">70/20/10</span>: 70% negro, 20%
            crema y grafito, 10% el color del área.
          </p>
        </div>
      </div>

      {/* Tipografías */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
          <p className="eyebrow text-muted-foreground">Titulares</p>
          <p className="headline text-6xl text-foreground">Anton</p>
          <p className="text-sm text-muted-foreground">Mayúsculas, muy grande, interlineado cerrado.</p>
        </div>
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
          <p className="eyebrow text-muted-foreground">Textos</p>
          <p className="text-4xl font-semibold text-foreground">Montserrat</p>
          <p className="text-sm text-muted-foreground">Para leer cómodo, en todos los tamaños.</p>
        </div>
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
          <p className="eyebrow text-muted-foreground">Logo</p>
          <p className="logo-script text-6xl">Mrs Saint Delafield</p>
          <p className="text-sm text-muted-foreground">Solo para la firma Fnx.</p>
        </div>
      </div>

      {/* Post 4:5 */}
      <div className="grid items-center gap-8 lg:grid-cols-2" data-area={area}>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-foreground">Post de ejemplo · 4:5</h3>
          <p className="text-sm text-muted-foreground">Elegí un área y mirá cómo cambia el acento.</p>
          <AreaSelector value={area} onChange={setArea} label="Área del post" />
        </div>
        <div
          className="mx-auto flex aspect-[4/5] w-full max-w-sm flex-col justify-between rounded-2xl border border-border bg-background p-7 shadow-glow-soft"
          aria-label={`Post de ejemplo de ${post.tag}`}
          role="img"
        >
          <div className="flex items-center justify-between">
            <Logo className="text-5xl" />
            <Tag>{post.tag}</Tag>
          </div>
          <p className="headline text-5xl text-foreground" key={area}>
            {post.lead} <span className="text-area">{post.accent}</span>
          </p>
          <Pieces lit={3} size="sm" />
        </div>
      </div>
    </Panel>
  );
}

/* 8. Manual de marca */
const CHAPTERS = [
  { t: "Portada e índice", p: "1–2", items: ["Portada", "Índice de capítulos"] },
  {
    t: "Identidad",
    p: "3–13",
    items: [
      "Esencia",
      "Misión y visión",
      "Valores",
      "Propuesta de valor",
      "Personalidad",
      "Tono",
      "Mensajes clave",
      "Así sí y así no",
      "Lo que nunca hacemos",
    ],
  },
  { t: "Tres áreas", p: "14–15", items: ["FNX Estudio", "FNX Salud", "FNX Noticias"] },
  { t: "Personas", p: "16–20", items: ["Lucía", "Dr. Martín", "Sofía", "ONG"] },
  { t: "Logo", p: "21–22", items: ["Construcción", "Usos correctos e incorrectos"] },
  { t: "Color", p: "23–25", items: ["Paleta base", "Color por área", "Regla 70/20/10"] },
  { t: "Tipografía", p: "26–27", items: ["Anton", "Montserrat", "Mrs Saint Delafield"] },
  { t: "Fotografía", p: "28–30", items: ["Estilo", "Composición", "Elementos gráficos"] },
  { t: "Por área", p: "31–33", items: ["Estudio", "Salud", "Noticias"] },
  {
    t: "Aplicaciones",
    p: "34–41",
    items: [
      "Papelería",
      "Stickers",
      "Banners",
      "Redes sociales",
      "Página web",
      "Merchandising",
      "Firma de email",
    ],
  },
  { t: "Cierre", p: "42", items: ["Contacto y cierre"] },
];

export function Manual() {
  const [active, setActive] = useState(1);
  const ch = CHAPTERS[active];
  return (
    <Panel
      eyebrow="Manual de marca"
      lead="Todo en"
      accent="un lugar."
      tldr="42 páginas con todas las reglas. Abrilo o recorré los capítulos acá."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-6">
          <div className="flex aspect-[4/5] flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-glow-soft">
            <Logo className="text-8xl" />
            <div className="flex flex-col gap-4">
              <Pieces lit={4} size="sm" />
              <p className="headline text-5xl text-foreground">
                Manual de <span className="text-area">marca</span>
              </p>
              <p className="text-sm text-muted-foreground">42 páginas · 11 capítulos</p>
            </div>
          </div>
          <Button asChild variant="area" size="lg" className="w-full">
            <a href={MANUAL_URL} target="_blank" rel="noopener noreferrer">
              Abrir el manual completo
              <ExternalLink aria-hidden="true" />
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-foreground">Mapa de capítulos</h3>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Capítulos del manual">
            {CHAPTERS.map((c, i) => (
              <button
                key={c.t}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={cn(
                  "h-10 rounded-full border px-4 text-sm font-semibold transition-colors",
                  active === i
                    ? "border-area bg-area text-area-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {c.t}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-7" aria-live="polite">
            <div className="flex items-baseline justify-between gap-4">
              <p className="headline text-4xl text-foreground">{ch.t}</p>
              <span className="text-sm text-muted-foreground">Págs. {ch.p}</span>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {ch.items.map((it) => (
                <li key={it} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="block h-2.5 w-2 shrink-0 rounded-[3px] bg-area" aria-hidden="true" />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Panel>
  );
}
