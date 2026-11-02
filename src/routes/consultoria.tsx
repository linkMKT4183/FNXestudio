import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Headline, Pieces, Reveal, Section, TenSeconds } from "@/components/fnx/primitives";
import { FlipCard } from "@/components/fnx/cards";
import { FnxImage } from "@/components/fnx/FnxImage";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IMG, type FnxImg } from "@/data/imagenes";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/consultoria")({
  head: () => ({
    meta: [
      { title: "FNX Consultoría · Asesoría jurídica y técnica de cultivo | FNX · Fénix Creativo" },
      {
        name: "description",
        content:
          "Asesoría jurídica y técnica de cultivo para que los proyectos cannábicos se constituyan, se regularicen y crezcan dentro de la ley. Desde Mendoza.",
      },
      { property: "og:title", content: "FNX Consultoría · Crecer en regla" },
      {
        property: "og:description",
        content:
          "Asociaciones civiles, regularización, plan de cultivo y registro de marca, coordinado por FNX.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Consultoria,
});

const AUDIENCE: { who: string; need: string; door: string; img?: FnxImg }[] = [
  {
    who: "Grupos que quieren armar una asociación civil",
    need: "Constituirla bien desde el primer día",
    door: "Asociación llave en mano",
  },
  {
    who: "Asociaciones que ya funcionan, pero desordenadas",
    need: "Libros, actas y padrón al día",
    door: "Regularización y mantenimiento",
  },
  {
    who: "Quienes cultivan en la informalidad y quieren pasar a la legalidad",
    need: "Un plan de cultivo y trazabilidad presentables",
    door: "Plan de cultivo y asesoramiento técnico",
  },
  {
    who: "Emprendimientos y marcas de productos",
    need: "Sociedad, registro de marca y comunicación",
    door: "Marca protegida",
  },
  {
    who: "Inversores y proyectos industriales",
    need: "Licencias y presentaciones ante organismos",
    door: "Mentoría de proyectos",
    img: IMG.cEscalera,
  },
];

const SERVICES = [
  {
    id: "juridico",
    label: "Jurídico",
    who: "Abogados de la red de FNX, elegidos según cada caso.",
    img: IMG.cJuridico,
    items: [
      "Constitución de asociaciones civiles cannábicas.",
      "Sociedades comerciales (incluidas SAS) y cooperativas.",
      "Regularización y cumplimiento normativo: libros, actas con respaldo y reglamentos.",
      "Mantenimiento mensual de asociaciones y gestión del padrón de socios.",
      "Informe semestral y carpetas para REPROCANN y el régimen de Mendoza.",
      "Registro de marca: legajo, solicitud y seguimiento.",
      "Contratos y acuerdos entre socios.",
      "Revisión de estatutos y documentación institucional.",
      "Derecho administrativo, recursos ante organismos y amparos de salud.",
      "Asesoramiento regulatorio para licencias de CBD y capacitación jurídica.",
    ],
  },
  {
    id: "tecnico",
    label: "Técnico de cultivo",
    who: "Profesional en Gestión Ambiental especializado en dirección técnica de cultivo.",
    img: IMG.cTecnico,
    items: [
      "Plan de cultivo para REPROCANN y el régimen de Mendoza, según el padrón real de socios.",
      "Redacción de los documentos del director técnico.",
      "Trazabilidad y asesoramiento sobre genéticas registradas.",
      "Diseño, dimensionamiento y cotización de infraestructura por escala.",
      "Asesoramiento en dirección técnica y conexión con profesionales que la asuman.",
      "Mentoría de proyectos e industriales.",
    ],
  },
  {
    id: "derivaciones",
    label: "Derivaciones",
    who: "Lo que Consultoría no hace se deriva a profesionales de la red.",
    img: IMG.cDerivaciones,
    items: ["Derecho penal.", "Habilitaciones de alimentos.", "Casos en otras provincias."],
  },
];

const COMBOS: { name: string; forWho: string; includes: string; img?: FnxImg }[] = [
  {
    name: "Asociación llave en mano",
    forWho: "Grupos que arrancan de cero",
    includes: "Constitución + registro de marca + plan de cultivo + identidad visual de FNX Estudio.",
    img: IMG.cLlave,
  },
  {
    name: "Constitución con acompañamiento",
    forWho: "Toda asociación nueva",
    includes: "Constitución + 6 meses de mantenimiento.",
  },
  {
    name: "Regularización",
    forWho: "Organizaciones desordenadas",
    includes: "Diagnóstico + actas atrasadas con respaldo real + libros al día + trazabilidad.",
    img: IMG.cCarpetas,
  },
  {
    name: "Mantenimiento",
    forWho: "Asociaciones en funcionamiento",
    includes: "Actas mensuales + padrón + informe semestral. Abono mensual, semestral o anual.",
    img: IMG.cCalendario,
  },
  {
    name: "Marca protegida",
    forWho: "Emprendimientos y productos",
    includes: "Registro de marca + identidad visual y redes de FNX Estudio.",
    img: IMG.cEscudo,
  },
];

const STEPS = [
  "Nos escribís por WhatsApp o redes.",
  "Completás un formulario con tus datos y lo que necesitás.",
  "Entrevista inicial: definimos qué necesitás y qué profesionales intervienen.",
  "Recibís un presupuesto integral antes de empezar (presupuesto firmado y 50% de anticipo).",
  "La red de profesionales de FNX hace su parte y FNX coordina y entrega.",
  "Te ofrecemos un servicio recurrente, como el mantenimiento, para seguir acompañándote.",
];

const LIMITS = [
  "Ante una zona gris, te mostramos el camino para regularizar, nunca el atajo.",
  "No armamos actas que no reflejen hechos reales ni declaramos más plantas de las que justifica el padrón.",
  "No prometemos protección penal ni plazos que dependen del Estado.",
  "Ningún documento legal hecho con IA se entrega sin revisión de un abogado de la red.",
];

function Bullet() {
  return <span className="mt-1.5 block h-2.5 w-2 shrink-0 rounded-[3px] bg-area" aria-hidden="true" />;
}

function Consultoria() {
  return (
    <div data-area="consultoria">
      {/* Hero */}
      <section
        className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-10 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.15fr_1fr]"
        aria-labelledby="consultoria-titulo"
      >
        <Reveal className="flex flex-col gap-8">
          <p className="eyebrow text-area">FNX Consultoría</p>
          <Headline
            as="h1"
            id="consultoria-titulo"
            lead="Crecer en"
            accent="regla."
            className="text-7xl sm:text-8xl lg:text-9xl"
          />
          <p className="max-w-xl text-lg text-muted-foreground">
            Asesoría jurídica y técnica de cultivo para que los proyectos cannábicos se constituyan,
            se regularicen y crezcan dentro de la ley.
          </p>
          <TenSeconds className="max-w-2xl">
            Todo lo que un proyecto cannábico necesita para ser legal y funcionar en regla,
            coordinado por FNX y resuelto por profesionales especializados.
          </TenSeconds>
          <div className="flex flex-wrap items-center gap-6">
            <WhatsAppButton topic="consultoria" label="Contanos tu proyecto" />
            <Pieces lit={1} />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="group overflow-hidden rounded-3xl border border-border bg-card">
            <FnxImage
              img={IMG.cHero}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="photo-hover aspect-[3/2] h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* A quién le hablamos */}
      <Section
        id="a-quien"
        eyebrow="A quién le hablamos"
        lead="Cada proyecto tiene"
        accent="su puerta."
        tldr="Cinco tipos de proyecto, cada uno con su forma de empezar."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {AUDIENCE.map((a, i) => (
            <Reveal
              key={a.who}
              delay={i * 70}
              className={cn(a.img && "md:col-span-2 lg:col-span-2")}
            >
              <article
                className={cn(
                  "group flex h-full overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-area hover:shadow-glow-soft",
                  a.img ? "flex-col sm:flex-row" : "flex-col",
                )}
              >
                {a.img ? (
                  <div className="aspect-[16/9] overflow-hidden border-b border-border sm:aspect-auto sm:w-1/2 sm:border-b-0 sm:border-r">
                    <FnxImage
                      img={a.img}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="photo-hover h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <span className="headline text-3xl text-muted-foreground">0{i + 1}</span>
                  <h3 className="text-lg font-bold leading-snug text-foreground">{a.who}</h3>
                  <p className="text-sm text-muted-foreground">{a.need}</p>
                  <div className="mt-auto border-t border-border pt-4">
                    <p className="eyebrow text-muted-foreground">Puerta de entrada</p>
                    <p className="mt-1 font-semibold text-area">{a.door}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <p className="text-sm text-muted-foreground">
            Si sos paciente, te acompaña{" "}
            <Link to="/salud" className="font-semibold text-foreground underline underline-offset-4 hover:text-area">
              FNX Salud
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      {/* Servicios en pestañas */}
      <Section
        id="servicios"
        eyebrow="Servicios"
        lead="Jurídico y"
        accent="técnico."
        tldr="Tres frentes: lo jurídico, lo técnico de cultivo y lo que derivamos a la red."
      >
        <Reveal>
          <Tabs defaultValue="juridico" className="flex flex-col gap-8">
            <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-full border border-border bg-transparent p-1 sm:w-auto sm:self-start">
              {SERVICES.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="h-10 shrink-0 rounded-full px-5 text-sm font-semibold text-muted-foreground hover:text-foreground data-[state=active]:bg-area data-[state=active]:text-area-foreground data-[state=active]:shadow-none"
                >
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {SERVICES.map((s) => (
              <TabsContent key={s.id} value={s.id} className="mt-0">
                <div className="phrase-in grid items-start gap-6 lg:grid-cols-[1fr_1.3fr]">
                  <div className="group overflow-hidden rounded-2xl border border-border bg-card">
                    <FnxImage
                      img={s.img}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="photo-hover aspect-[3/2] h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
                    <p className="text-sm text-muted-foreground">{s.who}</p>
                    <ul className="flex flex-col gap-3">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                          <Bullet />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </Section>

      {/* Combos */}
      <Section
        id="combos"
        eyebrow="Combos"
        lead="Todo junto,"
        accent="más simple."
        tldr="Cinco combos. Tocá cada tarjeta para ver qué incluye."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMBOS.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}>
              <FlipCard
                label={c.name}
                heightClass="h-[24rem]"
                media={
                  c.img ? (
                    <FnxImage img={c.img} className="photo-hover h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-background">
                      <Pieces lit={2} />
                    </div>
                  )
                }
                front={
                  <div className="flex flex-col gap-2">
                    <span className="text-xl font-bold leading-snug text-foreground">{c.name}</span>
                    <span className="text-sm text-muted-foreground">{c.forWho}</span>
                  </div>
                }
                back={
                  <div className="flex flex-col gap-3">
                    <span className="eyebrow">{c.name}</span>
                    <p className="text-xl font-bold leading-snug">{c.includes}</p>
                  </div>
                }
              />
            </Reveal>
          ))}
          <Reveal delay={COMBOS.length * 70}>
            <div className="flex h-full min-h-40 flex-col justify-center gap-4 rounded-2xl border border-dashed border-border p-6">
              <p className="eyebrow text-muted-foreground">Con FNX Estudio</p>
              <p className="text-sm leading-relaxed text-foreground">
                Los combos que suman marca o redes se resuelven con FNX Estudio, en un solo
                presupuesto.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Cómo trabajamos */}
      <Section
        id="como-trabajamos"
        eyebrow="Proceso"
        lead="Cómo"
        accent="trabajamos."
        tldr="Seis pasos, del primer mensaje al acompañamiento recurrente."
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s} delay={i * 70}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                <span className="headline text-5xl text-area">0{i + 1}</span>
                <p className="font-semibold leading-snug text-foreground">{s}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Red de profesionales */}
      <section aria-labelledby="red-titulo" className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal className="flex flex-col gap-6">
            <p className="eyebrow text-muted-foreground">Red de profesionales de FNX</p>
            <Headline
              id="red-titulo"
              lead="Vos sos cliente"
              accent="de FNX."
              className="text-5xl sm:text-7xl"
            />
            <p className="max-w-xl text-lg text-muted-foreground">
              Trabajamos con una red de abogados y técnicos especializados. Vos sos siempre cliente
              de FNX: nosotros coordinamos, presupuestamos y entregamos.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Pieces lit={4} size="lg" />
          </Reveal>
        </div>
      </section>

      {/* Nuestros límites */}
      <Section
        id="limites"
        eyebrow="Nuestros límites"
        lead="El camino,"
        accent="nunca el atajo."
        tldr="Hacemos las cosas en regla. Esto es lo que no hacemos."
      >
        <Reveal>
          <ul className="grid gap-4 md:grid-cols-2">
            {LIMITS.map((l) => (
              <li key={l} className="flex items-start gap-4 rounded-2xl border border-border p-6">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-area text-area">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed text-foreground">{l}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8" aria-labelledby="consultoria-cta">
        <Reveal className="flex flex-col items-start gap-8 rounded-3xl border border-border bg-card p-8 sm:p-14">
          <Pieces lit={1} />
          <Headline
            id="consultoria-cta"
            lead="Contanos"
            accent="tu proyecto."
            className="text-5xl sm:text-7xl"
          />
          <p className="max-w-lg text-muted-foreground">
            Te respondemos por WhatsApp y vemos juntos por dónde empezar.
          </p>
          <WhatsAppButton topic="consultoria" label="Contanos tu proyecto" />
          <Link
            to="/salud"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            ¿Sos paciente? Te acompaña FNX Salud <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
