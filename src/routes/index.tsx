import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ClipboardList,
  FileCheck2,
  FileSignature,
  FolderOpen,
  MessagesSquare,
  Users,
  type LucideIcon,
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
import { EmailButton } from "@/components/fnx/EmailButton";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { WhatsAppChatLoop } from "@/components/fnx/WhatsAppChat";
import { RedVidrio, RedVidrioAncha } from "@/components/fnx/RedVidrio";
import { Puertas } from "@/components/fnx/Puertas";

import { pageUrl, OG_IMAGE_META } from "@/config/site";
import { trackEvent } from "@/lib/track";

const CHAT_INICIO = [
  {
    q: "Hola FNX, quiero hacer crecer mi marca",
    a: "Hola. Contanos a qué te dedicás y qué querés lograr, y te armamos una propuesta a medida.",
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
          {/* Video de fondo (pin naranja y personas en camino). Vertical: en celular ocupa todo el
              fondo; en computadora va a la derecha y el degradé deja el título legible. */}
          <div
            ref={parallaxRef}
            className="absolute inset-x-0 -top-16 bottom-0 md:left-auto md:w-[62%] md:[mask-image:linear-gradient(to_right,transparent,black_35%)] lg:w-[55%]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/media/inicio-fondo-poster.webp"
              aria-hidden="true"
              className="h-full w-full object-cover object-[50%_0%] md:pt-16"
            >
              <source src="/media/inicio-fondo-720.mp4" type="video/mp4" media="(max-width: 767px)" />
              <source src="/media/inicio-fondo.mp4" type="video/mp4" />
            </video>
          </div>
          <span className="hero-sweep" />
          <span className="absolute inset-0 bg-background/45 md:bg-transparent md:bg-gradient-to-r md:from-background md:via-background/60 md:to-transparent" />
          <span className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-8 pt-5 md:gap-5 md:px-5 sm:px-8 sm:pt-14 lg:pt-12">
          <Headline
            as="h1"
            id="hero-titulo"
            lead="Creamos marcas y conectamos personas de"
            accent="confianza."
            className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={120}>
            <p className="max-w-xl text-sm text-muted-foreground md:text-lg">
              Sedes en Mendoza y San Juan. Trabajamos en todo el país y en el exterior.
            </p>
          </Reveal>

          <div className="mt-2 sm:mt-4">
            <Puertas />
          </div>
          <div className="h-16 md:hidden" aria-hidden="true" />
          <div className="fixed inset-x-4 bottom-4 z-30 md:hidden">
            <WhatsAppButton topic="marca" label="Escribinos" className="w-full shadow-lg" />
          </div>
        </div>
      </section>

      {/* Propuesta de valor */}
      <section
        aria-labelledby="valor-titulo"
        className="relative overflow-hidden border-y border-border bg-background lg:flex lg:aspect-video lg:min-h-[36rem] lg:items-center"
      >
        <RedVidrioAncha />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:py-0">
          <Reveal className="flex max-w-xl flex-col gap-6 lg:max-w-[44%]">
            <Headline
              id="valor-titulo"
              lead="Conocemos el sector y tenemos"
              accent="la red."
              className="max-w-4xl text-5xl sm:text-7xl lg:text-6xl xl:text-7xl"
            />
            <p className="max-w-xl text-lg text-muted-foreground">
              Estudio crea la marca, Consultoría ordena el proyecto, Salud conecta con profesionales
              verificados y Noticias informa con fuentes.
            </p>
            <Pieces lit={1} className="mt-4" />
          </Reveal>
        </div>
        <div className="red-aura relative z-10 -mt-6 pb-16 lg:hidden">
          <RedVidrio />
        </div>
      </section>

      {/* Prueba de marca */}
      <Section id="prueba-marca" lead="¿Tu marca" accent="pasa desapercibida?" className="py-16 sm:py-20">
        <Reveal className="flex flex-col items-start gap-6">
          <p className="max-w-2xl text-lg text-muted-foreground">
            Hacé la prueba de 1 minuto y mirá cuántas de las 5 señales te pasan.
          </p>
          <Button asChild variant="area" size="lg">
            <Link to="/tu-marca">Hacé la prueba</Link>
          </Button>
        </Reveal>
      </Section>

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
              <div className="spot neon-card flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6">
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
        <Reveal className="cta-vidrio grid items-center gap-10 rounded-3xl border border-border p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr]">
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
              <WhatsAppButton topic="marca" pulse />
              <EmailButton account="estudio" topic="general" />
            </div>
          </div>
          <WhatsAppChatLoop name="FNX" pairs={CHAT_INICIO} />
        </Reveal>
      </section>
    </>
  );
}
