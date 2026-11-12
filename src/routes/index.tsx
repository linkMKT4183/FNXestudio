import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ClipboardList,
  FileCheck2,
  FileSignature,
  FolderOpen,
  HeartHandshake,
  MessagesSquare,
  Newspaper,
  PenTool,
  Scale,
} from "lucide-react";
import { InstagramButton, InstagramDuo } from "@/components/fnx/InstagramButton";
import { useEffect, useRef } from "react";
import {
  IconBadge,
  Headline,
  Pieces,
  Reveal,
  Section,
  Tag,
} from "@/components/fnx/primitives";
import { FnxImage } from "@/components/fnx/FnxImage";
import { EmailButton } from "@/components/fnx/EmailButton";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { WhatsAppChatLoop } from "@/components/fnx/WhatsAppChat";
import { NetworkViz, type NetworkNode } from "@/components/fnx/NetworkViz";
import { IMG, type FnxImg } from "@/data/imagenes";

import { pageUrl, OG_IMAGE_META } from "@/config/site";
import { trackEvent } from "@/lib/track";

const AREA_NODES: NetworkNode[] = [
  { label: "Estudio", icon: PenTool, color: "var(--fnx-naranja)" },
  { label: "Consultoría", icon: Scale, color: "var(--fnx-azul)" },
  { label: "Salud", icon: HeartHandshake, color: "var(--fnx-verde)" },
  { label: "Noticias", icon: Newspaper, color: "var(--fnx-amarillo)" },
];

const CHAT_INICIO = [
  {
    q: "Hola FNX, quiero hacer crecer mi marca",
    a: "¡Hola! Contanos a qué te dedicás y qué querés lograr, y te armamos una propuesta a medida.",
  },
  {
    q: "Necesito asesoría para mi proyecto",
    a: "Perfecto. Te hacemos 3 preguntas para entender tu caso y te decimos qué profesionales intervienen.",
  },
  {
    q: "¿Mis datos quedan protegidos?",
    a: "Sí. Lo que nos contás es confidencial y solo lo compartimos con tu acuerdo.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FNX · Fénix Creativo | Estudio creativo · Mendoza, San Juan y todo el país" },
      {
        name: "description",
        content:
          "Creamos marcas y conectamos personas de confianza. Estudio creativo con sedes en Mendoza y San Juan y alcance nacional e internacional, con cuatro áreas: Estudio, Consultoría, Salud y Noticias.",
      },
      {
        property: "og:title",
        content: "FNX · Fénix Creativo | Creamos marcas y conectamos personas de confianza",
      },
      {
        property: "og:description",
        content: "Creamos marcas y conectamos personas de confianza. Una empresa, cuatro áreas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl("/") },
      ...OG_IMAGE_META,
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: pageUrl("/") }],
  }),
  component: Home,
});

const STEPS = [
  {
    n: "01",
    icon: MessagesSquare,
    title: "Nos escribís por WhatsApp",
    text: "Un mensaje alcanza para arrancar.",
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Te hacemos 3 preguntas",
    text: "Para entender qué necesitás, sin vueltas.",
  },
  {
    n: "03",
    icon: FileCheck2,
    title: "Te pasamos una propuesta clara",
    text: "Qué hacemos, cuándo y cómo.",
  },
];

/** Parallax leve: la foto baja más lento que el scroll. */
function useParallax<T extends HTMLElement>(factor = 0.18, max = 90) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY * factor, max);
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(raf);
    };
  }, [factor, max]);
  return ref;
}

function Home() {
  const parallaxRef = useParallax<HTMLDivElement>();
  return (
    <>
      {/* Hero + cuatro puertas: todo en el primer pantallazo */}
      <section aria-labelledby="hero-titulo" className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div ref={parallaxRef} className="absolute inset-x-0 -top-16 bottom-0">
            <FnxImage
              img={IMG.hero}
              priority
              sizes="100vw"
              className="hero-zoom h-full w-full object-cover object-[72%_70%]"
            />
            <span className="hero-glow" />
          </div>
          <span className="hero-sweep" />
          <span className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/10" />
          <span className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-5 pb-8 pt-10 sm:px-8 sm:pt-14 lg:pt-12">
          <Headline
            as="h1"
            id="hero-titulo"
            lead="Creamos marcas y conectamos personas de"
            accent="confianza."
            className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={120}>
            <p className="max-w-xl text-lg text-muted-foreground">
              Sedes en Mendoza y San Juan. Trabajamos en todo el país y en el exterior.
            </p>
          </Reveal>

          <nav aria-label="Elegí por dónde empezar" className="mt-4 sm:mt-6">
            <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Door
                to="/estudio"
                tone="naranja"
                kicker="FNX Estudio"
                title="Quiero hacer crecer mi marca"
                img={IMG.rey}
              />
              <Door
                to="/consultoria"
                tone="azul"
                kicker="FNX Consultoría"
                title="Necesito asesoría para mi proyecto agrícola o del sector regulado"
                img={IMG.cHero}
              />
              <Door
                to="/salud"
                tone="verde"
                kicker="FNX Salud · +18"
                title="Necesito orientación en salud (+18)"
                img={IMG.carpetas}
              />
              <Door
                to="/noticias"
                tone="amarillo"
                kicker="FNX Noticias"
                title="Quiero estar al día con noticias con fuentes"
                img={IMG.tonoNoticias}
              />
            </Reveal>
          </nav>
        </div>
      </section>

      {/* Propuesta de valor */}
      <section aria-labelledby="valor-titulo" className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="flex flex-col gap-6">
            <Headline
              id="valor-titulo"
              lead="Conocemos el sector y tenemos"
              accent="la red."
              className="max-w-4xl text-5xl sm:text-7xl"
            />
            <p className="max-w-xl text-lg text-muted-foreground">
              Estudio crea la marca, Consultoría ordena el proyecto, Salud conecta con profesionales
              verificados y Noticias informa con fuentes.
            </p>
            <Pieces lit={1} className="mt-4" />
          </Reveal>
          <Reveal delay={150}>
            <NetworkViz nodes={AREA_NODES} />
          </Reveal>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <Section
        id="como-trabajamos"
        eyebrow="Proceso"
        lead="Cómo"
        accent="trabajamos."
        tldr="Lo que nos contás es confidencial: cuidamos tus datos y solo los compartimos con los profesionales que trabajen en tu caso, con tu acuerdo."
      >
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="headline text-5xl text-area">{s.n}</span>
                  <IconBadge icon={s.icon} />
                </div>
                <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
                {i === 0 ? (
                  <div className="mt-auto flex flex-wrap gap-2">
                    <WhatsAppButton topic="general" label="Escribinos" size="default" />
                    <InstagramButton account="estudio" label="Instagram" size="default" />
                  </div>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border p-6">
            <p className="eyebrow flex items-center gap-2 text-muted-foreground">
              <FileSignature className="h-4 w-4 text-area" aria-hidden="true" />
              Para empezar
            </p>
            <p className="mt-2 font-semibold text-foreground">
              Presupuesto firmado y 50% de anticipo.
            </p>
          </div>
          <div className="rounded-2xl border border-border p-6">
            <p className="eyebrow flex items-center gap-2 text-muted-foreground">
              <FolderOpen className="h-4 w-4 text-area" aria-hidden="true" />
              Al terminar
            </p>
            <p className="mt-2 font-semibold text-foreground">
              Archivos editables con el 100% pago.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Instagram */}
      <Section
        id="instagram"
        eyebrow="Instagram"
        lead="Dos cuentas,"
        accent="un equipo."
        tldr="Seguinos para ver trabajos, novedades y consejos antes que nadie."
      >
        <Reveal>
          <InstagramDuo />
        </Reveal>
      </Section>

      {/* CTA final */}
      <section
        id="contacto"
        aria-labelledby="cta-titulo"
        className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8"
      >
        <Reveal className="grid items-center gap-10 rounded-3xl border border-border bg-card p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col items-start gap-8">
            <Pieces lit={4} />
            <Headline
              id="cta-titulo"
              lead="¿Arrancamos?"
              accent="Escribinos."
              className="text-5xl sm:text-7xl"
            />
            <p className="max-w-lg text-muted-foreground">
              Contanos qué necesitás y te respondemos por WhatsApp o por mail.
            </p>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton topic="marca" />
              <EmailButton account="estudio" topic="general" />
            </div>
          </div>
          <WhatsAppChatLoop name="FNX" pairs={CHAT_INICIO} />
        </Reveal>
      </section>
    </>
  );
}

const DOOR_AREA = {
  naranja: "estudio",
  azul: "consultoria",
  verde: "salud",
  amarillo: "noticias",
} as const;

function Door({
  to,
  tone,
  kicker,
  title,
  img,
}: {
  to: "/estudio" | "/consultoria" | "/salud" | "/noticias";
  tone: "naranja" | "azul" | "verde" | "amarillo";
  kicker: string;
  title: string;
  img: FnxImg;
}) {
  return (
    <Link
      to={to}
      data-area={DOOR_AREA[tone]}
      onClick={() => trackEvent("door_click", { area: DOOR_AREA[tone] })}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/90 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:border-area hover:shadow-glow-soft"
    >
      <span className="block aspect-[16/9] overflow-hidden border-b lg:aspect-[2/1] border-border">
        <FnxImage
          img={img}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="photo-hover h-full w-full object-cover"
        />
      </span>
      <span className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-7 lg:gap-4 lg:p-5">
        <Tag tone={tone} className="self-start">
          {kicker}
        </Tag>
        <span className="flex items-end justify-between gap-6">
          <span className="headline min-w-0 text-3xl text-foreground sm:text-4xl lg:text-2xl">{title}</span>
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-area text-area-foreground transition-[transform,box-shadow] duration-200 ease-out group-hover:translate-x-1 group-hover:shadow-glow"
            aria-hidden="true"
          >
            <ArrowRight className="h-6 w-6" />
          </span>
        </span>
      </span>
    </Link>
  );
}
