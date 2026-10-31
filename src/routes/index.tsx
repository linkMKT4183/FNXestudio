import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Headline, Logo, Pieces, Reveal, Section, Tag, TenSeconds } from "@/components/fnx/primitives";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FNX · Fénix Creativo | Estudio creativo en Mendoza" },
      {
        name: "description",
        content:
          "Creamos marcas y conectamos personas de confianza. Estudio creativo en Mendoza con tres áreas: Estudio, Salud y Noticias.",
      },
      { property: "og:title", content: "FNX · Fénix Creativo | Estudio creativo en Mendoza" },
      {
        property: "og:description",
        content: "Creamos marcas y conectamos personas de confianza. Una empresa, tres áreas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const AREAS = [
  {
    area: "estudio" as const,
    name: "FNX Estudio",
    tone: "naranja" as const,
    to: "/estudio" as const,
    items: ["Branding", "Producción audiovisual", "Tienda online", "Redes y estrategia"],
  },
  {
    area: "salud" as const,
    name: "FNX Salud",
    tone: "verde" as const,
    to: "/salud" as const,
    items: [
      "Gestión del trámite REPROCANN",
      "Profesionales verificados",
      "Vinculación con ONGs",
    ],
  },
  {
    area: "noticias" as const,
    name: "FNX Noticias",
    tone: "amarillo" as const,
    to: "/noticias" as const,
    items: ["Marketing", "Negocios", "Emprendimiento", "Cannabis medicinal, siempre con fuentes"],
  },
];

const STEPS = [
  { n: "01", title: "Nos escribís por WhatsApp", text: "Un mensaje alcanza para arrancar." },
  {
    n: "02",
    title: "Te hacemos 3 preguntas",
    text: "Para entender qué necesitás, sin vueltas.",
  },
  { n: "03", title: "Te pasamos una propuesta clara", text: "Qué hacemos, cuándo y cómo." },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="hero-titulo"
        className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-16 pt-14 sm:px-8 sm:pt-20"
      >
        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Logo className="-ml-2 text-[9rem] sm:text-[13rem] lg:text-[16rem]" as="p" />
            <Pieces lit={3} size="lg" className="mb-6" />
          </div>
          <Headline
            as="h1"
            id="hero-titulo"
            lead="Creamos marcas y conectamos personas de"
            accent="confianza."
            className="max-w-5xl text-6xl sm:text-7xl lg:text-8xl"
          />
          <p className="max-w-xl text-lg text-muted-foreground">
            Estudio creativo en Mendoza. Una empresa, tres áreas.
          </p>
        </Reveal>

        {/* Dos puertas */}
        <Reveal delay={120} className="grid gap-4 md:grid-cols-2">
          <Door
            area="estudio"
            to="/estudio"
            kicker="FNX Estudio"
            title="Quiero hacer crecer mi marca"
          />
          <Door
            area="salud"
            to="/salud"
            kicker="FNX Salud · +18"
            title="Necesito orientación en cannabis medicinal (+18)"
          />
        </Reveal>
      </section>

      {/* Tres áreas */}
      <Section
        id="areas"
        eyebrow="Una empresa"
        lead="Tres áreas,"
        accent="una mirada."
        tldr="Estudio para marcas, Salud para orientación y Noticias con fuentes."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {AREAS.map((a, i) => (
            <Reveal key={a.name} delay={i * 90}>
              <Link
                to={a.to}
                data-area={a.area}
                className="group flex h-full flex-col gap-6 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-area"
              >
                <div className="flex items-center justify-between">
                  <Tag tone={a.tone}>{a.name}</Tag>
                  <ArrowRight
                    className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </div>
                <ul className="flex flex-col gap-3">
                  {a.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-sm text-foreground">
                      <span
                        className="mt-1.5 block h-2.5 w-2 shrink-0 rounded-[3px] bg-area"
                        aria-hidden="true"
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Propuesta de valor */}
      <section
        aria-labelledby="valor-titulo"
        className="border-y border-border bg-card"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="flex flex-col gap-6">
            <TenSeconds className="max-w-2xl bg-background">
              Sabemos del sector y tenemos los contactos.
            </TenSeconds>
            <h2 id="valor-titulo" className="headline max-w-4xl text-5xl text-foreground sm:text-7xl">
              Conocemos el sector y tenemos <span className="text-area">la red.</span>
            </h2>
            <p className="max-w-xl text-lg text-muted-foreground">
              Pocas agencias pueden hacer las tres cosas a la vez.
            </p>
            <Pieces lit={1} className="mt-4" />
          </Reveal>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <Section
        id="como-trabajamos"
        eyebrow="Proceso"
        lead="Cómo"
        accent="trabajamos."
        tldr="Escribís, te preguntamos 3 cosas y recibís una propuesta clara."
      >
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                <span className="headline text-5xl text-area">{s.n}</span>
                <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border p-6">
            <p className="eyebrow text-muted-foreground">Para empezar</p>
            <p className="mt-2 font-semibold text-foreground">
              Presupuesto firmado y 50% de anticipo.
            </p>
          </div>
          <div className="rounded-2xl border border-border p-6">
            <p className="eyebrow text-muted-foreground">Al terminar</p>
            <p className="mt-2 font-semibold text-foreground">
              Archivos editables con el 100% pago.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* CTA final */}
      <section id="contacto" aria-labelledby="cta-titulo" className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        <Reveal className="flex flex-col items-start gap-8 rounded-3xl border border-border bg-card p-8 sm:p-14">
          <Pieces lit={4} />
          <h2 id="cta-titulo" className="headline text-5xl text-foreground sm:text-7xl">
            ¿Arrancamos? <span className="text-area">Escribinos.</span>
          </h2>
          <p className="max-w-lg text-muted-foreground">
            Contanos qué necesitás y te respondemos por WhatsApp.
          </p>
          <WhatsAppButton topic="marca" />
        </Reveal>
      </section>
    </>
  );
}

function Door({
  area,
  to,
  kicker,
  title,
}: {
  area: "estudio" | "salud";
  to: "/estudio" | "/salud";
  kicker: string;
  title: string;
}) {
  return (
    <Link
      to={to}
      data-area={area}
      className={cn(
        "group relative flex min-h-64 flex-col justify-between gap-10 overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all hover:border-area hover:shadow-glow-soft sm:p-9",
      )}
    >
      <span className="absolute inset-x-0 top-0 h-1.5 bg-area" aria-hidden="true" />
      <span className="eyebrow text-area">{kicker}</span>
      <span className="flex items-end justify-between gap-6">
        <span className="headline text-4xl text-foreground sm:text-5xl">{title}</span>
        <span
          className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-area text-area-foreground transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        >
          <ArrowRight className="h-6 w-6" />
        </span>
      </span>
    </Link>
  );
}
