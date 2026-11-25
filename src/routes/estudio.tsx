import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Clapperboard, Palette, ShoppingBag, Smartphone, Target } from "lucide-react";
import { InstagramButton } from "@/components/fnx/InstagramButton";
import { Headline, Reveal, Section } from "@/components/fnx/primitives";
import { EscenaAudiovisual, EscenaBranding, EscenaEstrategia, EscenaRedes, EscenaTienda } from "@/components/estudio/Escenas";
import { PhraseCarousel, type PhraseSlide } from "@/components/fnx/PhraseCarousel";
import { EmailButton } from "@/components/fnx/EmailButton";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { WhatsAppChatLoop } from "@/components/fnx/WhatsAppChat";
import { IMG } from "@/data/imagenes";

import { OG_IMAGE_META, pageUrl } from "@/config/site";

const CHAT_ESTUDIO = [
  {
    q: "Hola FNX, quiero renovar mi marca",
    a: "Hola. Arranquemos con 15 minutos sin costo: miramos tu marca juntos y te decimos qué cambiaríamos primero.",
  },
  {
    q: "Necesito contenido para redes",
    a: "Armamos un plan con fotos, videos y publicaciones pensado para tu público. ¿Qué cuentas tenés hoy?",
  },
  {
    q: "Quiero vender online",
    a: "Te ayudamos a montar la tienda y a que tu marca se vea profesional desde el primer día.",
  },
];

export const Route = createFileRoute("/estudio")({
  head: () => ({
    meta: [
      { title: "FNX Estudio · Branding, contenido y estrategia | FNX · Fénix Creativo" },
      {
        name: "description",
        content:
          "Identidad, contenido, redes y tienda online para marcas de todo el país, con sedes en San Juan y Mendoza. Consultoría de 15 minutos sin costo.",
      },
      { property: "og:title", content: "FNX Estudio · Marcas que se destacan" },
      {
        property: "og:description",
        content: "Identidad, contenido y estrategia para que tu marca deje de ser una más.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl("/estudio") },
      ...OG_IMAGE_META,
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: pageUrl("/estudio") }],
  }),
  component: Estudio,
});

const SERVICES = [
  {
    icon: Palette,
    title: "Identidad de marca",
    short: "Que te reconozcan de lejos.",
    detail:
      "Nombre, logo, colores, tipografías y manual de uso. La misma marca en el local, las redes, el packaging y la web.",
    escena: EscenaBranding,
  },
  {
    icon: Clapperboard,
    title: "Producción audiovisual",
    short: "Foto y video con idea.",
    detail: "Piezas para redes, campañas y web. Planificadas, filmadas y editadas por nosotros.",
    escena: EscenaAudiovisual,
  },
  {
    icon: ShoppingBag,
    title: "Tienda online",
    short: "Tu local, abierto las 24 horas.",
    detail: "Armamos tu tienda, cargamos tus productos y la dejamos lista para cobrar.",
    escena: EscenaTienda,
  },
  {
    icon: Smartphone,
    title: "Redes y contenido",
    short: "Constancia sin perder tiempo.",
    detail: "Calendario, diseño y textos. Vos aprobás, nosotros publicamos.",
    escena: EscenaRedes,
  },
  {
    icon: Target,
    title: "Estrategia",
    short: "Saber a quién le hablás.",
    detail: "Ordenamos objetivo, público y mensaje antes de que inviertas un peso en publicidad.",
    escena: EscenaEstrategia,
  },
];

const PHRASES: PhraseSlide[] = [
  { text: "Una buena idea también necesita un camino.", img: IMG.caminoLuz, focusX: "40%" },
  { text: "Si no te eligen, no siempre es el precio.", img: IMG.manoFigura, focusX: "45%" },
  { text: "Primero la marca. Después la pauta.", img: IMG.cerebro, focusX: "55%" },
  { text: "Tu marca habla antes que vos.", img: IMG.megafonos, focusX: "76%" },
];

const HERO_TAGS = ["Identidad", "Redes y contenido", "Audiovisual", "Tienda online", "Estrategia"];

function Estudio() {
  return (
    <div data-area="estudio">
      <section
        className="mx-auto w-full max-w-6xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24"
        aria-labelledby="estudio-titulo"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal className="flex flex-col gap-8">
            <p className="eyebrow text-area">FNX Estudio · Sedes en San Juan y Mendoza · Todo el país</p>
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
              <WhatsAppButton topic="marca" pulse />
              <EmailButton account="estudio" topic="marca" />
            </div>
          </Reveal>
          <Reveal delay={120} className="relative">
            {/* Animación de FNX Estudio (post de Instagram "Tu potencial necesita dirección").
                Video liviano en loop en lugar del GIF original de 29 MB; versión 720 para celular. */}
            <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-glow-soft">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/media/estudio-hero-poster.webp"
                aria-label="Animación de FNX Estudio: una mano con luz naranja sostiene a una persona pequeña. Texto: Tu potencial necesita dirección. Las ideas crecen más rápido cuando la estrategia marca el camino."
                className="aspect-[4/5] h-full w-full object-cover"
              >
                <source
                  src="/media/estudio-hero-720.mp4"
                  type="video/mp4"
                  media="(max-width: 767px)"
                />
                <source src="/media/estudio-hero.mp4" type="video/mp4" />
              </video>
            </div>
          </Reveal>
        </div>
      </section>

      <Section id="servicios" eyebrow="Servicios" lead="Lo que" accent="hacemos.">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Escena = s.escena;
            return (
              <Reveal as="li" key={s.title} delay={i * 70}>
                <article className="carrusel-marco flex h-full flex-col gap-4 rounded-[1.6rem] p-2.5">
                  <div className="overflow-hidden rounded-[1.2rem]">
                    <Escena />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 px-3.5 pb-4">
                    <p className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      <span>
                        <span className="text-foreground">{String(i + 1).padStart(2, "0")}</span> / {String(SERVICES.length).padStart(2, "0")}
                      </span>
                      <s.icon className="h-4 w-4 text-area" aria-hidden="true" />
                    </p>
                    <h3 className="headline text-3xl text-foreground">{s.title}</h3>
                    <p className="font-semibold text-area">{s.short}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </Section>

      <PhraseCarousel title="Cómo pensamos" slides={PHRASES} />

      <section className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8" aria-label="Prueba de marca">
        <Reveal className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base font-semibold text-foreground">
            ¿Cuántas de las 5 señales te pasan? Descubrilo en 1 minuto.
          </p>
          <Button asChild variant="area" size="default">
            <Link to="/tu-marca">Hacer la prueba</Link>
          </Button>
        </Reveal>
      </section>

      <section
        className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8"
        aria-labelledby="estudio-cta"
      >
        <Reveal className="grid items-center gap-10 border-t border-border pt-16 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col items-start gap-6">
            <Headline
              id="estudio-cta"
              lead="Tu marca está lista para"
              accent="levantar vuelo."
              className="text-5xl sm:text-7xl"
            />
            <p className="max-w-2xl text-lg text-muted-foreground">
              Una consultoría de 15 minutos alcanza para saber dónde está tu marca hoy y hasta dónde
              puede llegar. Sin costo y sin compromiso.
            </p>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton topic="marca" label="Agendá tus 15 minutos gratis" />
              <EmailButton account="estudio" topic="marca" />
              <InstagramButton account="estudio" />
            </div>
          </div>
          <WhatsAppChatLoop name="FNX Estudio" pairs={CHAT_ESTUDIO} />
        </Reveal>
      </section>
    </div>
  );
}
