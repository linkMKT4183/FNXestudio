import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  ClipboardCheck,
  ClipboardList,
  Droplets,
  FileSignature,
  FolderKanban,
  Handshake,
  Instagram,
  MessagesSquare,
  Network,
  PenTool,
  RefreshCw,
  Route as RouteIcon,
  Scale,
  Ban,
  Sprout,
  Stamp,
  Tractor,
  TrendingUp,
  Users,
  UsersRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { InstagramButton } from "@/components/fnx/InstagramButton";
import {
  Headline,
  IconBadge,
  Pieces,
  Reveal,
  Section,
  Tag,
  TenSeconds,
} from "@/components/fnx/primitives";
import { FlipCard } from "@/components/fnx/cards";
import { FnxImage } from "@/components/fnx/FnxImage";
import { EmailButton } from "@/components/fnx/EmailButton";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { WhatsAppChatLoop } from "@/components/fnx/WhatsAppChat";
import { NetworkViz, type NetworkNode } from "@/components/fnx/NetworkViz";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IMG, type FnxImg } from "@/data/imagenes";
import { cn } from "@/lib/utils";
import { PARTNERS, buildPartnerInstagramLink, type PartnerId, pageUrl, OG_IMAGE_META } from "@/config/site";
import { Button } from "@/components/ui/button";

const RED_CONSULTORIA: NetworkNode[] = [
  { label: "Jurídico", icon: Scale, color: "var(--fnx-azul)" },
  { label: "Técnico", icon: Wrench, color: "var(--fnx-azul)" },
  { label: "Agronomía", icon: Sprout, color: "var(--fnx-azul)" },
  { label: "Riego", icon: Droplets, color: "var(--fnx-azul)" },
  { label: "Marca", icon: PenTool, color: "var(--fnx-naranja)" },
];

const CHAT_CONSULTORIA = [
  {
    q: "Hola FNX, quiero regularizar mi proyecto",
    a: "¡Hola! Contanos en qué etapa está y qué documentación tenés. Relevamos y te pasamos un presupuesto a medida.",
  },
  {
    q: "¿Pueden constituir la estructura legal?",
    a: "Sí. La red jurídica de FNX se ocupa de la constitución y del mantenimiento posterior.",
  },
  {
    q: "Necesito tecnificar el riego del campo",
    a: "Coordinamos con los técnicos de la red el diseño, el dimensionamiento y la cotización.",
  },
];

export const Route = createFileRoute("/consultoria")({
  head: () => ({
    meta: [
      { title: "FNX Consultoría · Asesoría jurídica y técnica | FNX · Fénix Creativo" },
      {
        name: "description",
        content:
          "Asesoría jurídica y técnica para proyectos agrícolas y del sector regulado: que se constituyan, se regularicen y crezcan en regla. Con sedes en Mendoza y San Juan y alcance en todo el país.",
      },
      { property: "og:title", content: "FNX Consultoría · Crecer en regla" },
      {
        property: "og:description",
        content:
          "Del campo al cultivo regulado: riego, tecnificación, estructuras legales y fortalecimiento organizacional, coordinado por FNX.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl("/consultoria") },
      ...OG_IMAGE_META,
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: pageUrl("/consultoria") }],
  }),
  component: Consultoria,
});

type Sector = "agro" | "regulado";

interface Audience {
  icon?: LucideIcon;
  who: string;
  need: string;
  door: string;
  img?: FnxImg;
}

interface Service {
  icon?: LucideIcon;
  id: string;
  label: string;
  who: string;
  img: FnxImg;
  items: string[];
  partner?: PartnerId;
}

interface Combo {
  name: string;
  forWho: string;
  includes: string;
  img?: FnxImg;
}

/* ---------- Agro ---------- */

const AUDIENCE_AGRO: Audience[] = [
  {
    icon: Droplets,
    who: "Productores que quieren tecnificar su producción",
    need: "Riego eficiente, monitoreo y mejores rindes",
    door: "Tecnificación y riego",
    img: IMG.cValvula,
  },
  {
    icon: Tractor,
    who: "Proyectos agrícolas de gran escala",
    need: "Diseño, dimensionamiento y cotización de infraestructura",
    door: "Proyectos a escala",
  },
  {
    icon: ClipboardCheck,
    who: "Productores que necesitan trazabilidad",
    need: "Registros ordenados y presentables",
    door: "Monitoreo y trazabilidad",
  },
  {
    icon: Handshake,
    who: "Formalización de la actividad agrícola",
    need: "Redacción de contratos, convenios y constitución de estructuras legales",
    door: "Constitución y contratos",
  },
];

const SERVICES_AGRO: Service[] = [
  {
    icon: Wrench,
    id: "tecnico-agro",
    label: "Técnico",
    who: "Profesional en Gestión Ambiental con amplia experiencia en riego y proyectos de gran escala.",
    img: IMG.cSensor,
    items: [
      "Diseño y dimensionamiento de sistemas de riego.",
      "Tecnificación de la producción.",
      "Monitoreo de cultivos.",
      "Trazabilidad de productores.",
      "Diseño, dimensionamiento y cotización de infraestructura por escala.",
      "Mentoría de proyectos agrícolas e industriales.",
    ],
  },
  {
    icon: Scale,
    id: "juridico-agro",
    partner: "aro",
    label: "Jurídico",
    who: "Abogados de la red de FNX, elegidos según cada caso.",
    img: IMG.cJuridico,
    items: [
      "Constitución de estructuras legales.",
      "Contratos, convenios y acuerdos entre socios.",
      "Registro de marca.",
      "Trámites ante organismos públicos.",
    ],
  },
];

const COMBOS_AGRO: Combo[] = [
  {
    name: "Riego eficiente",
    forWho: "Productores que quieren tecnificar",
    includes:
      "Diagnóstico + diseño y dimensionamiento del sistema de riego + cotización por escala.",
    img: IMG.cAspersores,
  },
  {
    name: "Proyecto a escala",
    forWho: "Proyectos agrícolas e industriales",
    includes: "Diseño de infraestructura + cotización + mentoría del proyecto.",
    img: IMG.cEscala,
  },
];

/* ---------- Sector regulado ---------- */

const AUDIENCE_REGULADO: Audience[] = [
  {
    icon: Users,
    who: "Grupos que quieren constituir una estructura legal",
    need: "Constituirla bien desde el primer día",
    door: "Estructura legal llave en mano",
  },
  {
    icon: FolderKanban,
    who: "Fortalecimiento organizacional",
    need: "Libros, actas y padrón al día",
    door: "Regularización y mantenimiento",
  },
  {
    icon: RouteIcon,
    who: "Plan de cultivo y trazabilidad",
    need: "Un plan de cultivo y trazabilidad presentables",
    door: "Plan de cultivo y asesoramiento técnico",
  },
  {
    icon: Stamp,
    who: "Emprendimientos y trámites ante el INPI",
    need: "Sociedades, registro de marcas de productos y servicios, patentes y modelos de utilidad",
    door: "Marca protegida",
  },
  {
    icon: TrendingUp,
    who: "Inversores y proyectos industriales",
    need: "Licencias y presentaciones ante organismos públicos",
    door: "Mentoría de proyectos",
    img: IMG.cEscalera,
  },
];

const SERVICES_REGULADO: Service[] = [
  {
    icon: Scale,
    id: "juridico",
    partner: "aro",
    label: "Jurídico",
    who: "Abogados de la red de FNX, elegidos según cada caso.",
    img: IMG.cJuridico,
    items: [
      "Constitución de estructuras legales.",
      "Regularización y cumplimiento normativo: libros, actas con respaldo y reglamentos.",
      "Mantenimiento mensual de estructuras legales y gestión del padrón de socios.",
      "Informe semestral y carpetas para REPROCANN y el régimen de Mendoza.",
      "Registro de marca: legajo, solicitud y seguimiento.",
      "Contratos y acuerdos entre socios.",
      "Revisión de estatutos y documentación institucional.",
      "Trámites y recursos ante organismos públicos y amparos de salud.",
      "Asesoramiento regulatorio para licencias de CBD y capacitación jurídica.",
    ],
  },
  {
    icon: Wrench,
    id: "tecnico",
    label: "Técnico de cultivo",
    who: "Profesional en Gestión Ambiental especializado en dirección técnica de cultivo.",
    img: IMG.cTecnico,
    items: [
      "Plan de cultivo para REPROCANN y el régimen de Mendoza, según el padrón real de socios.",
      "Redacción de los documentos del director técnico.",
      "Trazabilidad y asesoramiento sobre genéticas registradas.",
      "Diseño, dimensionamiento y cotización de infraestructura por escala.",
      "Dirección técnica a cargo de profesionales de la red.",
      "Mentoría de proyectos e industriales.",
    ],
  },
  {
    icon: Network,
    id: "red",
    label: "Red de especialistas",
    who: "Todo lo que tu proyecto necesite se resuelve dentro de la red de FNX, con profesionales especializados y coordinados por nosotros.",
    img: IMG.cDerivaciones,
    items: [
      "Asesoramiento y defensa en derecho penal.",
      "Habilitaciones bromatológicas y de alimentos.",
      "Proyectos en otras provincias, con profesionales matriculados en cada jurisdicción.",
      "Coordinación integral: un solo contacto, un solo presupuesto y una sola entrega.",
    ],
  },
];

const COMBOS_REGULADO: Combo[] = [
  {
    name: "Estructura legal llave en mano",
    forWho: "Grupos que arrancan de cero",
    includes:
      "Constitución + registro de marca + plan de cultivo + identidad visual de FNX Estudio.",
    img: IMG.cLlave,
  },
  {
    name: "Constitución con acompañamiento",
    forWho: "Toda estructura legal nueva",
    includes: "Constitución + 6 meses de mantenimiento.",
    img: IMG.cConstitucion,
  },
  {
    name: "Regularización",
    forWho: "Fortalecimiento organizacional",
    includes: "Diagnóstico + actas atrasadas con respaldo real + libros al día + trazabilidad.",
    img: IMG.cCarpetas,
  },
  {
    name: "Mantenimiento",
    forWho: "Estructuras legales en funcionamiento",
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

const STEP_ICONS: LucideIcon[] = [
  MessagesSquare,
  ClipboardList,
  UsersRound,
  FileSignature,
  Network,
  RefreshCw,
];

const STEPS = [
  "Nos escribís por WhatsApp o redes.",
  "Completás un formulario con tus datos y lo que necesitás.",
  "Entrevista inicial: definimos qué necesitás y qué profesionales intervienen.",
  "Recibís un presupuesto integral antes de empezar (presupuesto firmado y 50% de anticipo).",
  "La red de profesionales de FNX hace su parte y FNX coordina y entrega.",
  "Te ofrecemos un servicio recurrente, como el mantenimiento, para seguir acompañándote.",
];

const NETWORK_POINTS = [
  { title: "Un solo contacto", text: "Todas tus consultas pasan por FNX." },
  { title: "Un solo presupuesto", text: "Con el trabajo de todos los profesionales incluido." },
  { title: "Una sola entrega", text: "Coordinamos y te entregamos todo terminado." },
];

const LIMITS: { no: string; text: string; note?: string }[] = [
  {
    no: "No tomamos atajos.",
    text: "Si algo de tu proyecto está pendiente de regularizar, te acompañamos a ponerlo en regla, paso a paso.",
    note: "Para cualquier proyecto, agrícola o del sector regulado",
  },
  {
    no: "No armamos actas",
    text: "que no reflejen hechos reales, ni declaramos más plantas de las que justifica el padrón.",
  },
  {
    no: "No prometemos",
    text: "protección legal absoluta ni plazos que dependen de organismos públicos.",
  },
  {
    no: "No entregamos",
    text: "ningún documento legal hecho con IA sin la revisión de un abogado de la red.",
  },
];

const SECTORS: { v: Sector; l: string }[] = [
  { v: "agro", l: "Agro" },
  { v: "regulado", l: "Sector regulado" },
];

function Bullet() {
  return (
    <span className="mt-1.5 block h-2.5 w-2 shrink-0 rounded-[3px] bg-area" aria-hidden="true" />
  );
}

function AudienceGrid({ items }: { items: Audience[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((a, i) => (
        <Reveal key={a.who} delay={i * 70} className={cn(a.img && "md:col-span-2 lg:col-span-2")}>
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
              <div className="flex items-center justify-between">
                <span className="headline text-3xl text-muted-foreground">0{i + 1}</span>
                {a.icon ? <IconBadge icon={a.icon} /> : null}
              </div>
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
  );
}

function ServiceTabs({ services }: { services: Service[] }) {
  return (
    <Reveal>
      <Tabs defaultValue={services[0]?.id ?? ""} className="flex flex-col gap-8">
        <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-full border border-border bg-transparent p-1 sm:w-auto sm:self-start">
          {services.map((s) => (
            <TabsTrigger
              key={s.id}
              value={s.id}
              className="h-10 shrink-0 rounded-full px-5 text-sm font-semibold text-muted-foreground hover:text-foreground data-[state=active]:bg-area data-[state=active]:text-area-foreground data-[state=active]:shadow-none"
            >
              {s.icon ? <s.icon className="mr-2 h-4 w-4" aria-hidden="true" /> : null}
              {s.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {services.map((s) => (
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
                    <li
                      key={it}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                    >
                      <Bullet />
                      {it}
                    </li>
                  ))}
                </ul>
                {s.partner ? <PartnerInstagram id={s.partner} /> : null}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Reveal>
  );
}

/** Partner con cuenta propia de Instagram, dentro del área donde trabaja con FNX. */
function PartnerInstagram({ id }: { id: PartnerId }) {
  const p = PARTNERS[id];
  return (
    <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-wider text-area">{p.role}</span>
        <span className="text-base font-bold text-foreground">{p.name}</span>
      </div>
      <Button asChild variant="outline" size="default" className="self-start sm:self-auto">
        <a href={buildPartnerInstagramLink(id)} target="_blank" rel="noopener noreferrer">
          <Instagram aria-hidden="true" />@{p.handle}
          <span className="sr-only"> (abre Instagram en una pestaña nueva)</span>
        </a>
      </Button>
    </div>
  );
}

function ComboGroup({ tag, combos, extra }: { tag: string; combos: Combo[]; extra?: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <Tag className="self-start">{tag}</Tag>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {combos.map((c, i) => (
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
        {extra ? <Reveal delay={combos.length * 70}>{extra}</Reveal> : null}
      </div>
    </div>
  );
}

function Consultoria() {
  // The sector tabs beat softly until the visitor switches once.
  const [sectorTouched, setSectorTouched] = useState(false);
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
            Asesoría jurídica y técnica para proyectos agrícolas y del sector regulado: que se constituyan,
            se regularicen y crezcan en regla.
          </p>
          <TenSeconds className="max-w-2xl">
            Todo lo que un proyecto productivo necesita para funcionar en regla y crecer, del campo
            al cultivo regulado, coordinado por FNX y resuelto por profesionales especializados.
          </TenSeconds>
          <div className="flex flex-wrap items-center gap-6">
            <WhatsAppButton topic="consultoria" label="Contanos tu proyecto" />
            <EmailButton account="estudio" topic="consultoria" />
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

      {/* Línea bajo el hero */}
      <div className="border-y border-border">
        <Reveal className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
          <Headline
            as="p"
            lead="Del campo al"
            accent="cultivo regulado."
            className="text-4xl sm:text-6xl"
          />
        </Reveal>
      </div>

      {/* Selector de sector: controla "A quién le hablamos" y "Servicios" */}
      <Tabs defaultValue="agro" className="block" onValueChange={() => setSectorTouched(true)}>
        <div className="sticky top-[124px] z-20 border-b border-border bg-background/90 backdrop-blur-md sm:top-[140px]">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3 sm:px-8">
            <p className="eyebrow hidden text-muted-foreground sm:block" aria-hidden="true">
              Elegí tu sector
            </p>
            <TabsList
              aria-label="Elegí tu sector"
              className="h-auto gap-1 rounded-full border border-border bg-transparent p-1"
            >
              {SECTORS.map((s) => (
                <TabsTrigger
                  key={s.v}
                  value={s.v}
                  className={cn(
                    "relative h-10 rounded-full px-6 text-sm font-semibold text-muted-foreground hover:text-foreground data-[state=active]:bg-area data-[state=active]:text-area-foreground data-[state=active]:shadow-none",
                    !sectorTouched && "fnx-chip-pulse",
                  )}
                  style={{ "--chip-glow": "var(--area)", "--chip-delay": "0.6s" } as CSSProperties}
                >
                  {s.l}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        <TabsContent value="agro" className="mt-0">
          {/* Hero de la pestaña Agro */}
          <div className="mx-auto w-full max-w-6xl px-5 pt-12 sm:px-8 sm:pt-16">
            <Reveal>
              <figure className="group relative overflow-hidden rounded-3xl border border-border bg-card">
                <FnxImage
                  img={IMG.cMaqueta}
                  sizes="(min-width: 1152px) 1152px, 100vw"
                  className="photo-hover aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-3 bg-background/80 px-5 py-4 backdrop-blur-sm sm:px-8">
                  <Tag>Agro</Tag>
                  <span className="text-sm font-semibold text-foreground">
                    Riego, tecnificación, trazabilidad y proyectos a escala.
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <Section
            id="a-quien-agro"
            eyebrow="A quién le hablamos · Agro"
            lead="Cada proyecto tiene"
            accent="su puerta."
          >
            <AudienceGrid items={AUDIENCE_AGRO} />
          </Section>

          <Section
            id="servicios-agro"
            eyebrow="Servicios · Agro"
            lead="Técnico y"
            accent="jurídico."
          >
            <ServiceTabs services={SERVICES_AGRO} />
          </Section>
        </TabsContent>

        <TabsContent value="regulado" className="mt-0">
          <Section
            id="a-quien"
            eyebrow="A quién le hablamos · Sector regulado"
            lead="Cada proyecto tiene"
            accent="su puerta."
          >
            <AudienceGrid items={AUDIENCE_REGULADO} />
            <Reveal className="mt-6">
              <p className="text-sm text-muted-foreground">
                Si sos paciente, te acompaña{" "}
                <Link
                  to="/salud"
                  className="font-semibold text-foreground underline underline-offset-4 hover:text-area"
                >
                  FNX Salud
                </Link>
                .
              </p>
            </Reveal>
          </Section>

          <Section
            id="servicios"
            eyebrow="Servicios · Sector regulado"
            lead="Jurídico y"
            accent="técnico."
          >
            <ServiceTabs services={SERVICES_REGULADO} />
          </Section>
        </TabsContent>
      </Tabs>

      {/* Combos */}
      <Section
        id="combos"
        eyebrow="Combos"
        lead="Todo junto,"
        accent="más simple."
        className="border-t border-border"
      >
        <div className="flex flex-col gap-14">
          <ComboGroup tag="Agro" combos={COMBOS_AGRO} />
          <ComboGroup
            tag="Sector regulado"
            combos={COMBOS_REGULADO}
            extra={
              <div className="flex h-full min-h-40 flex-col justify-center gap-4 rounded-2xl border border-dashed border-border p-6">
                <p className="eyebrow text-area">Presupuesto a medida</p>
                <p className="text-sm leading-relaxed text-foreground">
                  Cada proyecto se presupuesta en forma individual, según su infraestructura, la
                  documentación disponible y su situación legal y técnica actual. Primero relevamos;
                  después cotizamos solo lo que efectivamente necesitás.
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Si el proyecto suma marca o redes, lo integramos con FNX Estudio en una única
                  propuesta.
                </p>
                <WhatsAppButton
                  topic="consultoria"
                  label="Solicitar presupuesto"
                  size="default"
                  className="self-start"
                />
              </div>
            }
          />
        </div>
      </Section>

      {/* Cómo trabajamos */}
      <Section
        id="como-trabajamos"
        eyebrow="Proceso"
        lead="Cómo"
        accent="trabajamos."
        tldr="Todo lo que nos contás sobre tu proyecto es confidencial: solo lo conocen los profesionales que trabajan en él, con tu acuerdo."
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s} delay={i * 70}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="headline text-5xl text-area">0{i + 1}</span>
                  {STEP_ICONS[i] ? <IconBadge icon={STEP_ICONS[i]!} /> : null}
                </div>
                <p className="font-semibold leading-snug text-foreground">{s}</p>
                {i === 0 ? (
                  <div className="mt-auto flex flex-wrap gap-2">
                    <WhatsAppButton topic="consultoria" label="Escribinos" size="default" />
                    <InstagramButton account="estudio" label="Instagram" size="default" />
                  </div>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Red de profesionales */}
      <section aria-labelledby="red-titulo" className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <Reveal className="flex flex-col gap-6">
            <p className="eyebrow text-muted-foreground">Red de profesionales de FNX</p>
            <Headline
              id="red-titulo"
              lead="Un solo contacto,"
              accent="todo un equipo."
              className="text-5xl sm:text-7xl"
            />
            <p className="max-w-xl text-lg text-muted-foreground">
              Detrás de FNX trabaja una red de abogados y técnicos especializados, como el estudio
              jurídico Aro. No tenés que buscar ni coordinar a cada profesional: hablás solo con FNX
              y nosotros organizamos todo el trabajo.
            </p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {NETWORK_POINTS.map((pt) => (
                <li
                  key={pt.title}
                  className="flex flex-col gap-1 rounded-2xl border border-border p-4"
                >
                  <span className="font-bold text-foreground">{pt.title}</span>
                  <span className="text-sm text-muted-foreground">{pt.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <NetworkViz nodes={RED_CONSULTORIA} />
          </Reveal>
        </div>
      </section>

      {/* Nuestros límites */}
      <Section
        id="limites"
        eyebrow="Nuestros límites"
        lead="Lo que"
        accent="NO hacemos."
        tldr="Trabajamos siempre en regla. Estos límites no se negocian, para ningún cliente."
      >
        <Reveal>
          <ul className="grid gap-4 md:grid-cols-2">
            {LIMITS.map((l) => (
              <li
                key={l.no}
                className="flex items-start gap-4 rounded-2xl border border-border p-6"
              >
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-area text-area-foreground">
                  <Ban className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="flex flex-col gap-2">
                  {l.note ? <span className="eyebrow text-muted-foreground">{l.note}</span> : null}
                  <span className="text-sm leading-relaxed text-foreground">
                    <strong className="font-bold text-area">{l.no}</strong> {l.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* CTA */}
      <section
        className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8"
        aria-labelledby="consultoria-cta"
      >
        <Reveal className="grid items-center gap-10 rounded-3xl border border-border bg-card p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col items-start gap-8">
            <Pieces lit={1} />
            <Headline
              id="consultoria-cta"
              lead="Contanos"
              accent="tu proyecto."
              className="text-5xl sm:text-7xl"
            />
            <p className="max-w-lg text-muted-foreground">
              Te respondemos por WhatsApp o por mail y vemos juntos por dónde empezar.
            </p>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton topic="consultoria" label="Contanos tu proyecto" />
              <EmailButton account="estudio" topic="consultoria" />
              <InstagramButton account="estudio" />
            </div>
          </div>
          <WhatsAppChatLoop name="FNX Consultoría" pairs={CHAT_CONSULTORIA} />
        </Reveal>
      </section>
    </div>
  );
}
