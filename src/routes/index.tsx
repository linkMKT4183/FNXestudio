import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Headline, Logo, Pieces, Reveal, Section, Tag, TenSeconds } from "@/components/fnx/primitives";
import { FnxImage } from "@/components/fnx/FnxImage";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { IMG, type FnxImg } from "@/data/imagenes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FNX · Fénix Creativo | Estudio creativo en Mendoza" },
      {
        name: "description",
        content:
          "Creamos marcas y conectamos personas de confianza. Estudio creativo en Mendoza con cuatro áreas: Estudio, Consultoría, Salud y Noticias.",
      },
      { property: "og:title", content: "FNX · Fénix Creativo | Estudio creativo en Mendoza" },
      {
        property: "og:description",
        content: "Creamos marcas y conectamos personas de confianza. Una empresa, cuatro áreas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const AREAS = [
  {
    name: "FNX Estudio",
    tone: "naranja" as const,
    to: "/estudio" as const,
    img: IMG.rey,
    items: ["Branding", "Producción audiovisual", "Tienda online", "Redes y estrategia"],
  },
  {
    name: "FNX Consultoría",
    tone: "azul" as const,
    to: "/consultoria" as const,
    img: IMG.cHero,
    items: ["Asesoría jurídica y técnica de cultivo para proyectos cannábicos."],
  },
  {
    name: "FNX Salud",
    tone: "verde" as const,
    to: "/salud" as const,
    img: IMG.lupa,
    items: [
      "Gestión del trámite REPROCANN",
      "Profesionales verificados",
      "Vinculación con ONGs",
    ],
  },
  {
    name: "FNX Noticias",
    tone: "amarillo" as const,
    to: "/noticias" as const,
    img: IMG.nCarteles,
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

/** Parallax leve: la foto baja más lento que el scroll. Se apaga con movimiento reducido. */
function useParallax<T extends HTMLElement>(factor = 0.18, max = 90) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
      {/* Hero */}
      <section aria-labelledby="hero-titulo" className="relative overflow-hidden">
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 pt-10 sm:px-8 sm:pt-16">
          <Reveal>
            <Logo className="-ml-2 block text-[8rem] sm:text-[12rem] lg:text-[14rem]" as="p" />
          </Reveal>
          <Headline
            as="h1"
            id="hero-titulo"
            lead="Creamos marcas y conectamos personas de"
            accent="confianza."
            className="max-w-5xl text-6xl sm:text-7xl lg:text-8xl"
          />
          <Reveal delay={120} className="flex flex-wrap items-center justify-between gap-6">
            <p className="max-w-xl text-lg text-muted-foreground">
              Estudio creativo en Mendoza. Una empresa, cuatro áreas.
            </p>
            <Pieces lit={3} />
          </Reveal>
        </div>

        <div className="fade-top relative -mt-6 h-[19rem] overflow-hidden sm:-mt-28 sm:h-[30rem] lg:-mt-44 lg:h-[40rem]">
          <div ref={parallaxRef} className="absolute inset-x-0 -top-24 bottom-0">
            <FnxImage
              img={IMG.hero}
              priority
              sizes="100vw"
              className="hero-zoom h-full w-full object-cover object-[72%_70%]"
            />
          </div>
        </div>
      </section>

      {/* Tres puertas */}
      <section aria-label="Elegí por dónde empezar" className="mx-auto w-full max-w-6xl px-5 pb-8 pt-6 sm:px-8">
        <Reveal className="grid gap-4 md:grid-cols-3">
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
            title="Necesito asesoría para mi proyecto cannábico"
            img={IMG.cHero}
          />
          <Door
            to="/salud"
            tone="verde"
            kicker="FNX Salud · +18"
            title="Necesito orientación en cannabis medicinal (+18)"
            img={IMG.carpetas}
          />
        </Reveal>
      </section>

      {/* Cuatro áreas */}
      <Section
        id="areas"
        eyebrow="Una empresa"
        lead="Cuatro áreas,"
        accent="una mirada."
        tldr="Estudio para marcas, Consultoría para proyectos cannábicos, Salud para orientación y Noticias con fuentes."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AREAS.map((a, i) => (
            <Reveal key={a.name} delay={i * 90}>
              <Link
                to={a.to}
                className="group flex h-full flex-col gap-6 rounded-2xl border border-border bg-card p-4 pb-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-area hover:shadow-glow-soft"
              >
                <div className="aspect-[16/9] overflow-hidden rounded-xl">
                  <FnxImage img={a.img} className="photo-hover h-full w-full object-cover" />
                </div>
                <div className="flex items-center justify-between px-2">
                  <Tag tone={a.tone}>{a.name}</Tag>
                  <ArrowRight
                    className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </div>
                <ul className="flex flex-col gap-3 px-2">
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
          <Headline
            id="cta-titulo"
            lead="¿Arrancamos?"
            accent="Escribinos."
            className="text-5xl sm:text-7xl"
          />
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
  to,
  tone,
  kicker,
  title,
  img,
}: {
  to: "/estudio" | "/consultoria" | "/salud";
  tone: "naranja" | "azul" | "verde";
  kicker: string;
  title: string;
  img: FnxImg;
}) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-area hover:shadow-glow-soft"
    >
      <span className="block aspect-[16/9] overflow-hidden border-b border-border">
        <FnxImage
          img={img}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="photo-hover h-full w-full object-cover"
        />
      </span>
      <span className="flex flex-1 flex-col justify-between gap-8 p-7 sm:p-9 md:p-6 lg:p-8">
        <Tag tone={tone} className="self-start">
          {kicker}
        </Tag>
        <span className="flex items-end justify-between gap-6">
          <span className="headline text-4xl text-foreground sm:text-5xl md:text-3xl lg:text-4xl">{title}</span>
          <span
            className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-area text-area-foreground transition-[transform,box-shadow] group-hover:translate-x-1 group-hover:shadow-glow"
            aria-hidden="true"
          >
            <ArrowRight className="h-6 w-6" />
          </span>
        </span>
      </span>
    </Link>
  );
}
