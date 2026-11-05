import { createFileRoute } from "@tanstack/react-router";
import { Clapperboard, Palette, ShoppingBag, Smartphone, Target } from "lucide-react";
import { InstagramButton } from "@/components/fnx/InstagramButton";
import { Headline, Pieces, Reveal, Section } from "@/components/fnx/primitives";
import { ExpandCard, ResourceCard } from "@/components/fnx/cards";
import { FnxImage } from "@/components/fnx/FnxImage";
import { PhraseCarousel, type PhraseSlide } from "@/components/fnx/PhraseCarousel";
import { LeadForm } from "@/components/fnx/LeadForm";
import { EmailButton } from "@/components/fnx/EmailButton";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { IMG } from "@/data/imagenes";

import { pageUrl } from "@/config/site";

export const Route = createFileRoute("/estudio")({
  head: () => ({
    meta: [
      { title: "FNX Estudio · Branding, contenido y estrategia | FNX · Fénix Creativo" },
      {
        name: "description",
        content:
          "Marcas que se destacan. Branding, producción audiovisual, tienda online, redes y estrategia en Mendoza para que tu marca deje de ser una más.",
      },
      { property: "og:title", content: "FNX Estudio · Marcas que se destacan" },
      {
        property: "og:description",
        content: "Identidad, contenido y estrategia para que tu marca deje de ser una más.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl("/estudio") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: pageUrl("/estudio") }],
  }),
  component: Estudio,
});

const SERVICES = [
  {
    icon: Palette,
    title: "Branding e identidad",
    short: "Que tu marca se reconozca.",
    detail:
      "Nombre, logo, colores, tipografías y manual. Una identidad que funciona en todos lados.",
    img: IMG.branding,
  },
  {
    icon: Clapperboard,
    title: "Producción audiovisual",
    short: "Foto y video con idea.",
    detail: "Piezas para redes, campañas y web. Planificadas, filmadas y editadas por nosotros.",
    img: IMG.audiovisual,
  },
  {
    icon: ShoppingBag,
    title: "Tienda online",
    short: "Vender mientras dormís.",
    detail: "Armamos tu tienda, cargamos productos y la dejamos lista para cobrar.",
    img: IMG.tienda,
  },
  {
    icon: Smartphone,
    title: "Redes y contenido",
    short: "Constancia sin perder tiempo.",
    detail: "Calendario, diseño y textos. Vos aprobás, nosotros publicamos.",
    img: IMG.redes,
  },
  {
    icon: Target,
    title: "Estrategia",
    short: "Ver la jugada antes.",
    detail: "Ordenamos objetivos, público y mensajes antes de invertir en pauta.",
    img: IMG.estrategia,
  },
];

const PHRASES: PhraseSlide[] = [
  { text: "Tu potencial necesita dirección.", img: IMG.manoFigura, focusX: "45%" },
  { text: "Ver la jugada antes que el mercado.", img: IMG.caminoLuz, focusX: "40%" },
  { text: "Primero la marca. Después la pauta.", img: IMG.cerebro, focusX: "55%" },
  { text: "Anuncios que se escuchan.", img: IMG.megafonos, focusX: "76%" },
];

const HERO_TAGS = ["Branding", "Redes y contenido", "Audiovisual", "Tienda online", "Estrategia"];

function Estudio() {
  return (
    <div data-area="estudio">
      <section
        className="mx-auto w-full max-w-6xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24"
        aria-labelledby="estudio-titulo"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal className="flex flex-col gap-8">
            <p className="eyebrow text-area">FNX Estudio · Mendoza</p>
            <Headline
              as="h1"
              id="estudio-titulo"
              lead="Marcas que"
              accent="se destacan."
              className="text-6xl sm:text-7xl lg:text-8xl"
            />
            <p className="max-w-xl text-lg text-muted-foreground">
              Diseñamos la identidad, el contenido y la estrategia para que tu marca deje de ser una
              más y empiece a ser la elegida.
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Servicios de FNX Estudio">
              {HERO_TAGS.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <WhatsAppButton topic="marca" />
              <EmailButton account="estudio" topic="marca" />
            </div>
          </Reveal>
          <Reveal delay={120} className="relative">
            <div className="overflow-hidden rounded-3xl border border-border shadow-glow-soft">
              <FnxImage
                img={IMG.rey}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="hero-zoom aspect-[4/5] h-full w-full object-cover"
              />
            </div>
            <Pieces
              lit={0}
              className="absolute -bottom-6 left-6 rounded-2xl bg-background/80 p-3 backdrop-blur"
            />
          </Reveal>
        </div>
      </section>

      <Section id="servicios" eyebrow="Servicios" lead="Lo que" accent="hacemos.">
        <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <ExpandCard
                title={s.title}
                icon={s.icon}
                kicker={<span className="text-sm text-muted-foreground">{s.short}</span>}
                media={<FnxImage img={s.img} className="photo-hover h-full w-full object-cover" />}
              >
                {s.detail}
              </ExpandCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <PhraseCarousel title="Cómo pensamos" slides={PHRASES} />

      <Section id="recurso" eyebrow="Recurso gratuito" lead="¿FNX puede" accent="ayudarte?">
        <Reveal>
          <ResourceCard
            media={
              <FnxImage
                img={IMG.checklist}
                sizes="(min-width: 768px) 40vw, 100vw"
                className="photo-hover h-full w-full object-cover"
              />
            }
            title="Guía rápida: cómo saber si FNX es para vos"
            text="En cinco minutos sabés si tu marca, tu proyecto o tu trámite es algo en lo que podemos acompañarte, y qué conviene tener a mano para empezar. Te la enviamos sin costo."
            action={<LeadForm />}
          />
        </Reveal>
      </Section>

      <section
        className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8"
        aria-labelledby="estudio-cta"
      >
        <Reveal className="flex flex-col items-start gap-6 border-t border-border pt-16">
          <Headline
            id="estudio-cta"
            lead="Tu marca está lista para"
            accent="levantar vuelo."
            className="text-5xl sm:text-7xl"
          />
          <p className="max-w-2xl text-lg text-muted-foreground">
            Una charla de 15 minutos alcanza para saber dónde está tu marca hoy y hasta dónde puede
            llegar. Sin costo y sin compromiso.
          </p>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton topic="marca" label="Agendá tu charla" />
            <EmailButton account="estudio" topic="marca" />
            <InstagramButton account="estudio" />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
