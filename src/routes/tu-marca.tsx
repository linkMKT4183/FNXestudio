import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, FileCheck2, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Headline, IconBadge, Reveal, Section } from "@/components/fnx/primitives";
import { EmailButton } from "@/components/fnx/EmailButton";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { CrecimientoFlotante } from "@/components/tu-marca/CrecimientoFlotante";
import { CarruselTuMarca } from "@/components/tu-marca/CarruselTuMarca";
import { PruebaMarca } from "@/components/tu-marca/PruebaMarca";
import { OG_IMAGE_META, pageUrl } from "@/config/site";

const TITLE = "¿Tu marca pasa desapercibida? Prueba de 1 minuto | FNX Estudio · San Juan, Mendoza y todo el país";
const DESC =
  "Hacé la prueba de 1 minuto: 5 señales de que tu marca no se nota. Identidad, imagen, tienda, constancia y estrategia. Consultoría de 15 minutos gratis.";

export const Route = createFileRoute("/tu-marca")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl("/tu-marca") },
      ...OG_IMAGE_META,
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: pageUrl("/tu-marca") }],
  }),
  component: TuMarca,
});

const PASOS = [
  { n: "01", icon: MessagesSquare, title: "Nos escribís MARCA por WhatsApp" },
  { n: "02", icon: ClipboardList, title: "Te regalamos 15 minutos de consultoría para ver dónde está tu marca hoy" },
  { n: "03", icon: FileCheck2, title: "Si decidís avanzar, te decimos qué hacemos primero y cuánto sale" },
];

export function TuMarca() {
  return (
    <div data-area="estudio">
      <div className="luz-diagonal">
        <span className="luz-linea" aria-hidden="true" />
      <section className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 pb-20 pt-28 sm:px-8 sm:pt-36 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Reveal stagger className="flex min-w-0 flex-col items-start gap-6">
          <p className="eyebrow text-muted-foreground">Prueba de marca · FNX Estudio</p>
          <Headline
            as="h1"
            lead="Tu marca"
            accent="pasa desapercibida."
            underline
            className="text-5xl min-[420px]:text-6xl sm:text-7xl lg:text-8xl"
          />
          <p className="max-w-2xl text-lg text-muted-foreground">
            El producto es bueno, la atención también, y aun así la gente pasa de largo. No es mala
            suerte ni falta de talento: es que no se nota.
          </p>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton topic="consultoria15" label="Quiero mi consultoría de 15 minutos" pulse className="h-auto min-h-14 max-w-full whitespace-normal py-3 text-center" />
            <Button asChild variant="outline" size="lg">
              <a href="#prueba">Hacé la prueba de 1 minuto</a>
            </Button>
          </div>
        </Reveal>
              <Reveal delay={200} variant="zoom" className="mx-auto w-full">
          <CrecimientoFlotante />
        </Reveal>
      </section>
      </div>

      <Section id="carrusel" eyebrow="El carrusel" lead="Mirá cómo se ve una marca" accent="que se nota.">
        <Reveal variant="zoom">
          <CarruselTuMarca />
        </Reveal>
      </Section>

      <Section id="prueba" eyebrow="Prueba de 1 minuto" lead="Marcá cuántas te pasan" accent="a vos.">
        <PruebaMarca />
      </Section>

      <Section id="como-trabajamos" eyebrow="Proceso" lead="Cómo trabajamos" accent="en Estudio.">
        <ol className="grid gap-4 md:grid-cols-3">
          {PASOS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90}>
              <div className="spot neon-card flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="headline text-5xl text-area">{s.n}</span>
                  <IconBadge icon={s.icon} />
                </div>
                <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8" aria-labelledby="tu-marca-cta">
        <Reveal className="flex flex-col items-start gap-6 border-t border-border pt-16">
          <Headline id="tu-marca-cta" lead="¿Arrancamos?" accent="Escribí MARCA." className="text-5xl sm:text-7xl" />
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton topic="consultoria15" label="Quiero mi consultoría de 15 minutos" />
            <EmailButton account="estudio" topic="marca" />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
