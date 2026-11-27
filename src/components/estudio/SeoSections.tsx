import { Link } from "@tanstack/react-router";
import { ArrowRight, FileSignature, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Headline, Reveal, Section } from "@/components/fnx/primitives";
import { FnxImage } from "@/components/fnx/FnxImage";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { EmailButton } from "@/components/fnx/EmailButton";
import { SERVICIOS, type Servicio, type Pregunta } from "@/data/servicios";
import { PASOS, CONDICIONES } from "@/data/proceso";
import type { WhatsAppTopic } from "@/config/site";

export function SeoBreadcrumb({
  name,
  section = "Estudio",
}: {
  name?: string;
  section?: "Estudio" | "Notas";
}) {
  return (
    <nav
      aria-label="Ruta de navegación"
      className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-5 pt-7 text-xs text-muted-foreground sm:px-8"
    >
      <Link to="/" className="underline hover:text-area">
        Inicio
      </Link>
      <span aria-hidden="true">›</span>
      <Link to={section === "Notas" ? "/notas" : "/estudio"} className="underline hover:text-area">
        {section}
      </Link>
      {name ? (
        <>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{name}</span>
        </>
      ) : null}
    </nav>
  );
}

export function ServiceLinks({ services = SERVICIOS }: { services?: readonly Servicio[] }) {
  return (
    <Reveal as="ul" stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.slug}>
          <Link
            to={service.path}
            className="tarjeta-viva group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card hover:border-area"
          >
            <FnxImage img={service.image} className="aspect-[3/2] w-full object-cover" />
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className="headline text-2xl leading-tight text-foreground">{service.name}</h3>
              <p className="text-sm text-muted-foreground">{service.short}</p>
              <span className="mt-auto flex items-center gap-2 text-sm font-semibold text-area">
                Ver más <ArrowRight aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only">sobre {service.name}</span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </Reveal>
  );
}

export function Proceso({ conditions = true }: { conditions?: boolean }) {
  return (
    <Section id="como-trabajamos" lead="Cómo" accent="trabajamos." className="py-12 sm:py-16">
      <Reveal as="ol" stagger className="grid gap-6 md:grid-cols-3">
        {PASOS.map((step) => (
          <li key={step.n} className="border-t border-border pt-5">
            <div className="flex items-center justify-between">
              <span className="paso-num headline text-4xl text-area">{step.n}</span>
              <step.icon className="h-5 w-5 text-area" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </Reveal>
      {conditions ? (
        <div className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
          <div>
            <p className="flex items-center gap-2 text-sm text-area">
              <FileSignature className="h-4 w-4" aria-hidden="true" />
              Para empezar
            </p>
            <p className="mt-2 text-sm">{CONDICIONES.inicio}</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm text-area">
              <FolderOpen className="h-4 w-4" aria-hidden="true" />
              Al terminar
            </p>
            <p className="mt-2 text-sm">{CONDICIONES.entrega}</p>
          </div>
        </div>
      ) : null}
    </Section>
  );
}

export function Preguntas({ faq }: { faq: readonly Pregunta[] }) {
  return (
    <Section id="preguntas" lead="Preguntas" accent="frecuentes." className="py-12 sm:py-16">
      <Reveal>
        <Accordion type="single" collapsible className="max-w-3xl">
          {faq.map((item, i) => (
            <AccordionItem key={item.question} value={String(i)}>
              <AccordionTrigger className="gap-4 text-left text-base font-semibold leading-relaxed">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                <p>{item.answer}</p>
                {item.link ? (
                  <Button asChild variant="link" className="mt-2 h-auto px-0">
                    <Link to={item.link}>
                      {item.link === "/tu-marca" ? "Hacer la prueba" : "Registro de marca"}
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}

export function Contacto({ topic }: { topic: WhatsAppTopic }) {
  return (
    <section
      className="mx-auto max-w-6xl border-t border-border px-5 py-12 sm:px-8 sm:py-16"
      aria-labelledby="contacto-titulo"
    >
      <Headline
        id="contacto-titulo"
        lead="¿Arrancamos?"
        accent="Escribinos."
        className="text-4xl sm:text-6xl"
      />
      <Reveal className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <WhatsAppButton topic={topic} pulse />
        <EmailButton account="estudio" topic="marca" />
      </Reveal>
    </section>
  );
}
