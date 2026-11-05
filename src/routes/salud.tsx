import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, Compass, FileQuestion, Lock, Users } from "lucide-react";
import { InstagramButton } from "@/components/fnx/InstagramButton";
import { Headline, Pieces, Reveal, Section, TenSeconds } from "@/components/fnx/primitives";
import { AgeGate } from "@/components/fnx/AgeGate";
import { ResourceCard } from "@/components/fnx/cards";
import { FnxImage } from "@/components/fnx/FnxImage";
import { EmailButton } from "@/components/fnx/EmailButton";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { IMG, type FnxImg } from "@/data/imagenes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { pageUrl } from "@/config/site";

export const Route = createFileRoute("/salud")({
  head: () => ({
    meta: [
      { title: "FNX Salud · Orientación REPROCANN | FNX · Fénix Creativo" },
      {
        name: "description",
        content:
          "Orientación clara sobre el trámite REPROCANN, sin estigma y sin letra chica. Profesionales y ONGs verificados. Contenido para mayores de 18 años.",
      },
      { property: "og:title", content: "FNX Salud · Te acompañamos en cada paso" },
      {
        property: "og:description",
        content: "Orientación clara sobre el trámite REPROCANN, sin estigma y sin letra chica.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl("/salud") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: pageUrl("/salud") }],
  }),
  component: Salud,
});

function AdultNote() {
  return (
    <p className="border-t border-border pt-5 text-xs text-muted-foreground">
      Contenido para mayores de 18 años. Uso medicinal y responsable.
    </p>
  );
}

const SERVICES = [
  {
    icon: Compass,
    title: "Orientación en el trámite REPROCANN",
    text: "Te explicamos qué necesitás y en qué orden.",
    img: IMG.carpetas,
  },
  {
    icon: BadgeCheck,
    title: "Profesionales verificados",
    text: "Médicos y abogados que chequeamos antes de recomendarte.",
    img: IMG.lupa,
  },
  {
    icon: Users,
    title: "Vinculación con ONGs verificadas",
    text: "Te conectamos con organizaciones que cumplen.",
    img: IMG.ongs,
  },
  {
    icon: Lock,
    title: "Tus datos, protegidos",
    text: "Te pedimos consentimiento, tratamos tu información con reserva y solo la compartimos con el profesional que elijas.",
    img: IMG.candado,
  },
];

const FAQ = [
  {
    icon: Compass,
    q: "¿Por dónde empiezo?",
    a: "Escribinos y te orientamos según tu caso.",
    img: IMG.brujulas,
    whatsapp: true,
  },
  {
    icon: FileQuestion,
    q: "¿Me garantizan la aprobación?",
    a: "No. La aprobación depende de la evaluación oficial; te ayudamos a presentar todo correctamente.",
    img: IMG.mitoRealidad,
  },
  {
    icon: Lock,
    q: "¿Qué pasa con mis datos?",
    a: "Pedimos tu consentimiento y tratamos tu información con reserva.",
    img: IMG.candado,
  },
];

/** Preguntas frecuentes: la foto de al lado cambia según la pregunta abierta. */
function FaqWithPhotos() {
  const [open, setOpen] = useState("");
  const idx = Math.max(0, FAQ.findIndex((_, i) => `faq-${i}` === open));
  const current = FAQ[idx] ?? FAQ[0]!;
  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_1fr]">
      <Reveal>
        <Accordion
          type="single"
          collapsible
          value={open}
          onValueChange={setOpen}
          className="flex flex-col gap-3"
        >
          {FAQ.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`} className="rounded-2xl border border-border bg-card px-6">
              <AccordionTrigger className="py-5 text-base font-bold text-foreground hover:no-underline">
                <span className="flex items-center gap-3">
                  <f.icon className="h-5 w-5 shrink-0 text-area" aria-hidden="true" />
                  {f.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                <p>{f.a}</p>
                {"whatsapp" in f && f.whatsapp ? (
                  <WhatsAppButton topic="salud" label="Escribinos" size="default" className="mt-4" />
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
      <Reveal delay={120}>
        <div key={current.img.id} className="phrase-in">
          <SidePhoto img={current.img} />
        </div>
      </Reveal>
    </div>
  );
}

function SidePhoto({ img }: { img: FnxImg }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card">
      <FnxImage
        img={img}
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="photo-hover aspect-[3/2] h-full w-full object-cover"
      />
    </div>
  );
}

function Salud() {
  return (
    <div data-area="salud">
      <AgeGate />

      <section className="mx-auto w-full max-w-6xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24" aria-labelledby="salud-titulo">
        <Reveal className="flex flex-col gap-8">
          <p className="eyebrow text-area">FNX Salud · +18</p>
          <Headline
            as="h1"
            id="salud-titulo"
            lead="Te acompañamos en"
            accent="cada paso."
            className="text-6xl sm:text-8xl lg:text-9xl"
          />
          <p className="max-w-xl text-lg text-muted-foreground">
            Orientación clara sobre el trámite REPROCANN, sin estigma y sin letra chica.
          </p>
          <p className="max-w-xl text-sm text-muted-foreground">
            Atendemos a pacientes. Si representás una asociación o un proyecto, te acompaña{" "}
            <Link
              to="/consultoria"
              className="font-semibold text-foreground underline underline-offset-4 hover:text-area"
            >
              FNX Consultoría
            </Link>
            .
          </p>
          <TenSeconds className="max-w-2xl">
            Te guiamos en el REPROCANN y te conectamos con gente verificada.
          </TenSeconds>
          <div className="flex flex-wrap items-center gap-6">
            <WhatsAppButton topic="salud" />
            <EmailButton account="salud" topic="salud" />
            <InstagramButton account="salud" />
            <Pieces lit={2} />
          </div>
          <AdultNote />
        </Reveal>
      </section>

      <Section
        id="que-hacemos"
        eyebrow="Qué hacemos"
        lead="Orientación con"
        accent="confianza."
        footer={<AdultNote />}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-area hover:shadow-glow-soft">
                <div className="aspect-[16/9] overflow-hidden border-b border-border">
                  <FnxImage img={s.img} className="photo-hover h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-5 p-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-area text-area-foreground">
                    <s.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="reprocann-sin-vueltas"
        eyebrow="Serie"
        lead="REPROCANN"
        accent="sin vueltas."
        footer={<AdultNote />}
      >
        <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <Accordion type="single" collapsible defaultValue="paso-1" className="flex flex-col gap-3">
              <AccordionItem value="paso-1" className="rounded-2xl border border-border bg-card px-6">
                <AccordionTrigger className="py-5 text-base font-bold text-foreground hover:no-underline">
                  <span className="flex items-center gap-4">
                    <span className="headline text-3xl text-area">01</span> La consulta médica
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Todo empieza con un médico con formación en cannabis medicinal.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <p className="mt-4 rounded-2xl border border-dashed border-border px-6 py-5 text-sm text-muted-foreground">
              Próximos pasos en preparación
            </p>
          </Reveal>
          <Reveal delay={120}>
            <SidePhoto img={IMG.escalera} />
          </Reveal>
        </div>
      </Section>

      <Section
        id="preguntas"
        eyebrow="Preguntas frecuentes"
        lead="Lo que más nos"
        accent="preguntan."
        footer={<AdultNote />}
      >
        <FaqWithPhotos />
      </Section>

      <Section
        id="guia"
        eyebrow="Recurso gratuito"
        lead="Guía REPROCANN"
        accent="paso a paso."
        footer={<AdultNote />}
      >
        <Reveal>
          <ResourceCard
            media={<FnxImage img={IMG.guia} sizes="(min-width: 768px) 40vw, 100vw" className="photo-hover h-full w-full object-cover" />}
            title="Guía REPROCANN paso a paso"
            text="Te la mandamos por WhatsApp o por mail, sin costo."
            action={
              <div className="flex flex-wrap gap-3">
                <WhatsAppButton topic="salud" label="Pedila gratis" />
                <EmailButton account="salud" topic="guia" label="Pedila por mail" />
              </div>
            }
          />
        </Reveal>
      </Section>
    </div>
  );
}
