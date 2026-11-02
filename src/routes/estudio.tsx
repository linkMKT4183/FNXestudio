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
  },
  {
    title: "Producción audiovisual",
    short: "Foto y video con idea.",
    detail: "Piezas para redes, campañas y web. Planificadas, filmadas y editadas por nosotros.",
  },
  {
    title: "Tienda online",
    short: "Vender mientras dormís.",
    detail: "Armamos tu tienda, cargamos productos y la dejamos lista para cobrar.",
  },
  {
    title: "Redes y contenido",
    short: "Constancia sin perder tiempo.",
    detail: "Calendario, diseño y textos. Vos aprobás, nosotros publicamos.",
  },
  {
    title: "Estrategia",
    short: "Ver la jugada antes.",
    detail: "Ordenamos objetivos, público y mensajes antes de invertir en pauta.",
  },
];

const PHRASES = [
  "Tu potencial necesita dirección.",
  "Ver la jugada antes que el mercado.",
  "Primero la marca. Después la pauta.",
  "Tu perfil es tu vidriera.",
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <ExpandCard
                title={s.title}
                kicker={<span className="text-sm text-muted-foreground">{s.short}</span>}
              >
                {s.detail}
              </ExpandCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <RotatingPhrases />

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
          <h2 id="estudio-cta" className="headline text-5xl text-foreground sm:text-7xl">
            Contanos de <span className="text-area">tu marca.</span>
          </h2>
          <WhatsAppButton topic="marca" />
        </Reveal>
      </section>
    </div>
  );
}

function RotatingPhrases() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setPaused(true);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % PHRASES.length), 4000);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <section aria-labelledby="frases-titulo" className="border-y border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-20 sm:px-8 sm:py-28">
        <h2 id="frases-titulo" className="eyebrow text-muted-foreground">
          Cómo pensamos
        </h2>
        <div className="min-h-[9rem] sm:min-h-[12rem]" aria-live="polite">
          <p key={index} className="headline phrase-in text-5xl text-foreground sm:text-7xl lg:text-8xl">
            <PhraseText text={PHRASES[index] ?? ""} />
          </p>
        </div>
        <div className="flex items-center gap-3">
          {PHRASES.map((p, i) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setIndex(i);
                setPaused(true);
              }}
              aria-label={`Frase ${i + 1}: ${p}`}
              aria-current={i === index}
              className={cn(
                "h-3 rounded-full transition-all",
                i === index ? "w-10 bg-area" : "w-3 bg-border hover:bg-muted-foreground",
              )}
            />
          ))}
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            className="ml-3 inline-flex h-9 items-center gap-2 rounded-full border border-border px-3 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {paused ? "Reproducir" : "Pausar"}
          </button>
        </div>
      </div>
    </section>
  );
}

/** Pinta la última palabra en el color de acento. */
function PhraseText({ text }: { text: string }) {
  const words = text.split(" ");
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span className="text-area">{last}</span>
    </>
  );
}
