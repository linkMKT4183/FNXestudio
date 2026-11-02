import { createFileRoute } from "@tanstack/react-router";
import { Headline, Pieces, Reveal, Section, TenSeconds } from "@/components/fnx/primitives";
import { ExpandCard } from "@/components/fnx/cards";
import { FnxImage } from "@/components/fnx/FnxImage";
import { PhraseCarousel, type PhraseSlide } from "@/components/fnx/PhraseCarousel";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { IMG } from "@/data/imagenes";


export const Route = createFileRoute("/estudio")({
  head: () => ({
    meta: [
      { title: "FNX Estudio · Branding, contenido y estrategia | FNX · Fénix Creativo" },
      {
        name: "description",
        content:
          "Desatamos tu marca. Branding, producción audiovisual, tienda online, redes y estrategia para marcas de cualquier rubro, desde Mendoza.",
      },
      { property: "og:title", content: "FNX Estudio · Desatamos tu marca" },
      {
        property: "og:description",
        content: "Branding, contenido y estrategia para marcas de cualquier rubro.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Estudio,
});

const SERVICES = [
  {
    title: "Branding e identidad",
    short: "Que tu marca se reconozca.",
    detail: "Nombre, logo, colores, tipografías y manual. Una identidad que funciona en todos lados.",
    img: IMG.branding,
  },
  {
    title: "Producción audiovisual",
    short: "Foto y video con idea.",
    detail: "Piezas para redes, campañas y web. Planificadas, filmadas y editadas por nosotros.",
    img: IMG.audiovisual,
  },
  {
    title: "Tienda online",
    short: "Vender mientras dormís.",
    detail: "Armamos tu tienda, cargamos productos y la dejamos lista para cobrar.",
    img: IMG.tienda,
  },
  {
    title: "Redes y contenido",
    short: "Constancia sin perder tiempo.",
    detail: "Calendario, diseño y textos. Vos aprobás, nosotros publicamos.",
    img: IMG.redes,
  },
  {
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

function Estudio() {
  return (
    <div data-area="estudio">
      <section className="mx-auto w-full max-w-6xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24" aria-labelledby="estudio-titulo">
        <Reveal className="flex flex-col gap-8">
          <p className="eyebrow text-area">FNX Estudio</p>
          <Headline
            as="h1"
            id="estudio-titulo"
            lead="Desatamos"
            accent="tu marca."
            className="text-7xl sm:text-8xl lg:text-9xl"
          />
          <p className="max-w-xl text-lg text-muted-foreground">
            Branding, contenido y estrategia para marcas de cualquier rubro.
          </p>
          <TenSeconds className="max-w-2xl">
            Te ayudamos a que tu marca se vea bien, diga algo y venda.
          </TenSeconds>
          <div className="flex flex-wrap items-center gap-6">
            <WhatsAppButton topic="marca" />
            <Pieces lit={0} />
          </div>
        </Reveal>
      </section>

      <Section
        id="servicios"
        eyebrow="Servicios"
        lead="Lo que"
        accent="hacemos."
        tldr="Cinco servicios. Tocá cada uno para ver qué incluye."
      >
        <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <ExpandCard
                title={s.title}
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

      <Section
        id="recurso"
        eyebrow="Recurso gratuito"
        lead="Checklist de"
        accent="marca."
        tldr="10 puntos para revisar antes de poner plata en redes."
      >
        <Reveal className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-foreground">
              Checklist de marca: 10 puntos antes de invertir en redes
            </h3>
            <p className="text-sm text-muted-foreground">Te lo mandamos por WhatsApp, sin costo.</p>
          </div>
          <WhatsAppButton topic="marca" label="Pedilo gratis" />
        </Reveal>
      </Section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8" aria-labelledby="estudio-cta">
        <Reveal className="flex flex-col items-start gap-6 border-t border-border pt-16">
          <Headline
            id="estudio-cta"
            lead="Contanos de"
            accent="tu marca."
            className="text-5xl sm:text-7xl"
          />
          <WhatsAppButton topic="marca" />
        </Reveal>
      </section>
    </div>
  );
}
