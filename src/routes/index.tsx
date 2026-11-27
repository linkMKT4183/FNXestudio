import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
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
import { IconBadge, Headline, Pieces, Reveal, Section, Tag } from "@/components/fnx/primitives";
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
    a: "Perfecto. ¿Es un proyecto agro o del sector regulado? Según eso, te decimos qué profesionales lo resuelven.",
  },
  {
    q: "¿Mis datos quedan protegidos?",
    a: "Sí. Lo que nos contás es confidencial y solo lo compartimos con tu acuerdo.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FNX · Agencia de branding y marketing en Mendoza y San Juan | Fénix Creativo" },
      {
        name: "description",
        content:
          "Branding, redes, contenido, tienda online y estrategia para pymes y emprendedores. Sedes en San Juan y Mendoza y trabajo en todo el país. Primera charla de 15 minutos sin costo.",
      },
      {
        property: "og:title",
        content: "FNX · Fénix Creativo | Creamos marcas y conectamos personas de confianza",
      },
      {
        property: "og:description",
        content:
          "Una empresa, cuatro áreas. Sedes en San Juan y Mendoza, trabajamos en todo el país.",
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
    title: "Entendemos qué necesitás",
    text: "Unas preguntas por WhatsApp o, si es por tu marca, una charla de 15 minutos sin costo.",
  },
  {
    n: "03",
    icon: FileCheck2,
    title: "Te pasamos una propuesta clara",
    text: "Qué hacemos, cuándo y cuánto sale.",
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
            style={{ backgroundImage: "url(/media/inicio-fondo-poster.webp)" }}
            className="absolute inset-x-0 -top-16 bottom-0 bg-cover bg-[position:50%_0%] opacity-70 md:left-auto md:bg-none md:opacity-100 md:w-[62%] md:[mask-image:linear-gradient(to_right,transparent,black_35%)] lg:w-[55%]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/media/inicio-fondo-poster.webp"
              aria-hidden="true"
              className="h-full w-full object-cover object-[50%_0%] max-md:hidden md:pt-16"
            >
              <source
                src="/media/inicio-fondo-720.mp4"
                type="video/mp4"
                media="(max-width: 767px)"
              />
              <source src="/media/inicio-fondo.mp4" type="video/mp4" />
            </video>
          </div>
          <span className="hero-sweep" />
          <span className="absolute inset-0 bg-background/75 md:bg-transparent md:bg-gradient-to-r md:from-background md:via-background/60 md:to-transparent" />
          <span className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 pb-8 pt-5 md:gap-5 md:px-5 sm:px-8 sm:pt-14 lg:pt-12">
          <p className="eyebrow text-area">
            Agencia de branding y marketing · Sedes en San Juan y Mendoza · Todo el país
          </p>
          <Headline
            as="h1"
            id="hero-titulo"
            lead="Creamos marcas y conectamos personas de"
            accent="confianza."
            className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={120}>
            <p className="max-w-xl text-sm text-muted-foreground md:text-lg">
              Branding y marketing para tu marca, asesoría para proyectos agro y regulados,
              acompañamiento en el REPROCANN y noticias de tu rubro. Elegí tu área y te respondemos por
              WhatsApp.
            </p>
          </Reveal>

          <div className="mt-2 sm:mt-4">
            <Puertas />
          </div>
          <div className="h-16 md:hidden" aria-hidden="true" />
          <div className="fixed inset-x-4 bottom-4 z-30 md:hidden">
            <WhatsAppButton topic="general" className="w-full shadow-lg" />
          </div>
        </div>
      </section>

      {/* Propuesta de valor */}
      <section
        aria-labelledby="valor-titulo"
        className="red-fondo-movil relative overflow-hidden border-y border-border bg-background max-lg:flex max-lg:min-h-[max(100svh,46rem)] max-lg:flex-col lg:flex lg:aspect-video lg:min-h-[36rem] lg:items-center"
      >
        <RedVidrioAncha />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:py-0">
          <Reveal className="flex max-w-xl flex-col gap-6 lg:max-w-[44%]">
            <Headline
              id="valor-titulo"
              lead="Todo lo que necesitás,"
              accent="en un solo lugar."
              className="max-w-4xl text-5xl sm:text-7xl lg:text-6xl xl:text-7xl"
            />
            <p className="max-w-xl text-lg text-muted-foreground">
              Estudio le da forma a tu marca. Consultoría pone tu proyecto en regla. Salud te
              acompaña en el trámite del REPROCANN. Noticias te cuenta lo que pasa en tu rubro, con
              fuentes. Y si tu caso necesita más de un área, lo coordinamos nosotros.
            </p>
          </Reveal>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-0 lg:hidden">
          <RedVidrio />
        </div>
      </section>

      {/* Prueba de marca: las 5 señales se encienden de a una y la luz lleva hasta el botón */}
      <Section
        id="prueba-marca"
        lead="¿Te ven o te pasan"
        accent="de largo?"
        className="pb-0 pt-12 sm:pt-16"
      >
        <Reveal className="flex flex-col items-start gap-5">
          <p className="max-w-2xl text-lg text-muted-foreground">
            5 señales, 1 minuto. Marcá las que te pasan y sabé por dónde empezar.
          </p>
          <ul
            className="guia-senales flex flex-wrap gap-2"
            aria-label="Las 5 señales de una marca que pasa desapercibida"
          >
            {["Identidad", "Imagen", "Tienda", "Constancia", "Estrategia"].map((t, i) => (
              <li key={t} className="guia-chip" style={{ animationDelay: `${i * 0.45}s` }}>
                {t}
              </li>
            ))}
          </ul>
          <div className="guia-flecha" aria-hidden="true">
            <ArrowDown className="h-6 w-6" />
          </div>
          <Button asChild variant="area" size="lg" pulse className="guia-boton">
            <Link to="/tu-marca">Hacer la prueba</Link>
          </Button>
        </Reveal>
      </Section>

      {/* Cómo trabajamos */}
      <Section
        id="como-trabajamos"
        eyebrow="Proceso"
        lead="Cómo"
        accent="trabajamos."
        className="pt-10 sm:pt-14"
        tldr="Del primer mensaje a la entrega, hablás siempre con FNX."
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
              Firmás el presupuesto y abonás el 50%.
            </p>
          </div>
          <div className="rounded-2xl border border-border p-6">
            <p className="eyebrow flex items-center gap-2 text-muted-foreground">
              <FolderOpen className="h-4 w-4 text-area" aria-hidden="true" />
              Al terminar
            </p>
            <p className="mt-2 font-semibold text-foreground">
              Con el 100% pago, te llevás todos los archivos editables. Son tuyos.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Instagram */}
      <Section
        id="instagram"
        eyebrow="Instagram"
        lead="Tres cuentas,"
        accent="un equipo."
        tldr="@fnx.estudio muestra cómo nace cada marca. FNX Noticias cuenta lo que pasa en marketing, negocios, emprendimiento y sector regulado. @fnx.salud orienta a mayores de 18."
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
              Contanos a qué te dedicás y qué querés lograr. Si es por tu marca, la primera charla
              de 15 minutos es sin costo.
            </p>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton topic="general" pulse />
              <EmailButton account="estudio" topic="general" />
            </div>
          </div>
          <WhatsAppChatLoop name="FNX" pairs={CHAT_INICIO} />
        </Reveal>
      </section>
    </>
  );
}
