import { useState, type ReactNode } from "react";
import {
  BadgeCheck,
  Eye,
  Flame,
  HeartHandshake,
  Link2,
  PenTool,
  Scale,
  ShieldCheck,
  Target,
  Telescope,
} from "lucide-react";
import { IconBadge, Headline, Pieces, Tag, TenSeconds } from "@/components/fnx/primitives";
import { ExpandCard, FlipCard } from "@/components/fnx/cards";
import { FnxImage } from "@/components/fnx/FnxImage";
import { IMG, type FnxImg } from "@/data/imagenes";
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

function AreaSelector({
  value,
  onChange,
  label,
}: {
  value: Area;
  onChange: (a: Area) => void;
  label: string;
}) {
  const opts: { v: Area; l: string }[] = [
    { v: "estudio", l: "Estudio" },
    { v: "consultoria", l: "Consultoría" },
    { v: "salud", l: "Salud" },
    { v: "noticias", l: "Noticias" },
  ];
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex max-w-full self-start overflow-x-auto rounded-full border border-border p-1"
    >
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
            value === o.v
              ? "bg-area text-area-foreground"
              : "text-muted-foreground hover:text-foreground",
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
            Fénix Creativo es un equipo interdisciplinario con base en Mendoza. Reúne creatividad,
            producción audiovisual, asesoría jurídica y técnica, y una red de profesionales de la
            salud verificados.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Cada proyecto lo trabaja la red completa: un solo contacto, todo un equipo detrás.
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
        <ExpandCard
          title="Misión"
          icon={Target}
          kicker={<span className="eyebrow text-area">Hoy</span>}
          defaultOpen
        >
          Crear marcas con carácter y conectar a las personas con profesionales y organizaciones de
          confianza, con claridad, responsabilidad y una mirada propia.
        </ExpandCard>
        <ExpandCard
          title="Visión"
          icon={Telescope}
          kicker={<span className="eyebrow text-area">Mañana</span>}
          defaultOpen
        >
          Ser la referencia en Argentina para las marcas que quieren destacarse y para quienes
          buscan información y acompañamiento confiable en salud.
        </ExpandCard>
      </div>
    </Panel>
  );
}

/* 3. Valores */
const VALUES = [
  { icon: Flame, t: "Carácter", d: "Cada pieza tiene una idea propia." },
  { icon: Eye, t: "Claridad", d: "Decimos las cosas simples y sin vueltas." },
  {
    icon: BadgeCheck,
    t: "Confianza verificada",
    d: "Solo trabajamos con profesionales y marcas que cumplen.",
  },
  { icon: ShieldCheck, t: "Responsabilidad", d: "Comunicamos salud con cuidado y para adultos." },
  { icon: Link2, t: "Coherencia", d: "Lo que prometemos es lo que hacemos." },
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
                <div className="flex items-center justify-between">
                  <span className="headline text-2xl text-muted-foreground">0{i + 1}</span>
                  <IconBadge icon={v.icon} />
                </div>
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
const TONE_IMG: Record<Area, FnxImg> = {
  estudio: IMG.tonoEstudio,
  consultoria: IMG.tonoConsultoria,
  salud: IMG.tonoSalud,
  noticias: IMG.tonoNoticias,
};

const TONES: Record<Area, { name: string; tone: string; phrase: string }> = {
  estudio: {
    name: "FNX Estudio",
    tone: "Directo, con carácter, seguro.",
    phrase: "Marcas que se destacan.",
  },
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
          <div
            className="flex flex-col gap-6 rounded-2xl border border-area bg-card p-7"
            aria-live="polite"
          >
            <span className="eyebrow text-area">{t.name}</span>
            <p className="text-lg font-semibold text-foreground">{t.tone}</p>
            <p className="headline phrase-in text-5xl text-area sm:text-6xl" key={area}>
              {t.phrase}
            </p>
          </div>
          <div className="tono-visual relative overflow-hidden rounded-2xl border border-border bg-card">
            <div key={area} className="phrase-in h-full">
              <FnxImage
                img={TONE_IMG[area]}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="tono-zoom aspect-[3/2] h-full w-full object-cover"
              />
            </div>
            <div className="tono-glow pointer-events-none absolute inset-0" aria-hidden="true" />
            <div
              className="absolute bottom-4 left-4 flex items-end gap-1.5 rounded-full bg-background/70 px-4 py-2.5 backdrop-blur"
              aria-hidden="true"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "tono-bar w-1.5 rounded-full",
                    i === 2 ? "bg-area" : "bg-foreground/40",
                  )}
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
              <span className="ml-2 text-xs font-semibold text-foreground">La voz de {t.name}</span>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

/* 6. A quién le hablamos */
const PERSONA_ICONS = { naranja: PenTool, verde: HeartHandshake, azul: Scale } as const;
const PERSONA_AREA = { naranja: "estudio", verde: "salud", azul: "consultoria" } as const;

const PERSONAS = [
  {
    name: "Lucía",
    img: IMG.personaLucia,
    area: "FNX Estudio",
    tone: "naranja" as const,
    who: "Dueña de una pyme de Mendoza, 35 a 45 años.",
    needs: "Una marca profesional, contenido constante y vender online.",
    blocks: "No tener tiempo ni saber a quién delegar.",
    message: "Que tu marca no pase desapercibida.",
  },
  {
    name: "Dr. Martín",
    img: IMG.personaMartin,
    area: "FNX Salud",
    tone: "verde" as const,
    who: "Médico matriculado de 40 a 55 años con formación en cannabis medicinal.",
    needs: "Pacientes derivados de forma ordenada y comunicar su trabajo dentro de la norma.",
    blocks: "El estigma y el miedo a incumplir la normativa.",
    message: "Te conectamos con pacientes que buscan un profesional de confianza.",
  },
  {
    name: "Sofía",
    img: IMG.personaSofia,
    area: "FNX Salud",
    tone: "verde" as const,
    who: "Paciente adulta, mayor de 18.",
    needs: "Hacer su trámite y encontrar un médico confiable.",
    blocks: "No saber por dónde empezar y desconfiar de lo que ve en redes.",
    message: "Te acompañamos en cada paso.",
  },
  {
    name: "ONG",
    img: IMG.personaOng,
    area: "FNX Salud",
    tone: "verde" as const,
    who: "Inscripta en REPROCANN, con director médico.",
    needs: "Sumar pacientes de forma transparente y comunicar mejor.",
    blocks: "La poca visibilidad.",
    message: "Te mostramos como una opción verificada.",
  },
  {
    name: "Proyecto productivo",
    img: IMG.personaProductor,
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
      tldr="Cada texto, post o propuesta de FNX está pensado para una de estas personas. Tocá cada perfil para conocerlo."
    >
      <div className="grid gap-4 rounded-2xl border border-dashed border-border p-6 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <p className="eyebrow text-area">¿Qué es un perfil?</p>
          <p className="text-sm text-foreground">
            Es un personaje que representa a un grupo de personas a las que FNX ayuda: qué edad
            tiene, qué necesita, qué la frena y qué mensaje le habla.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="eyebrow text-area">¿Para qué sirve?</p>
          <p className="text-sm text-foreground">
            Para que todo el equipo escriba y diseñe pensando en alguien concreto, y no en
            &ldquo;todo el mundo&rdquo;. Así cada mensaje llega mejor.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="eyebrow text-area">Importante</p>
          <p className="text-sm text-foreground">
            No son clientes reales. Los nombres y las fotos son ilustrativos, creados para la marca.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {PERSONAS.map((p) => (
          <div key={p.name} data-area={PERSONA_AREA[p.tone]}>
            <ExpandCard
              title={p.name}
              icon={PERSONA_ICONS[p.tone]}
              media={
                <FnxImage
                  img={p.img}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="photo-hover h-full w-full object-cover object-[50%_25%]"
                />
              }
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
                  <dt className="eyebrow text-muted-foreground">El mensaje que le habla</dt>
                  <dd className="mt-1 text-base font-bold text-foreground">“{p.message}”</dd>
                </div>
              </dl>
            </ExpandCard>
          </div>
        ))}
      </div>
    </Panel>
  );
}
