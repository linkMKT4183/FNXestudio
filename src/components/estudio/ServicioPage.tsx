import { Instagram, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FnxImage } from "@/components/fnx/FnxImage";
import { Headline, Reveal, Section, TenSeconds } from "@/components/fnx/primitives";
import { SERVICIOS, type Servicio } from "@/data/servicios";
import { buildPartnerInstagramLink } from "@/config/site";
import { trackEvent } from "@/lib/track";
import { Contacto, Preguntas, Proceso, SeoBreadcrumb, ServiceLinks } from "./SeoSections";

export function ServicioPage({ service }: { service: Servicio }) {
  return (
    <div data-area="estudio">
      <SeoBreadcrumb name={service.name} />
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-8 sm:px-8 sm:pt-14">
        <p className="eyebrow text-area">
          FNX Estudio · Sedes en San Juan y Mendoza · Todo el país
        </p>
        <Headline
          as="h1"
          lead={service.lead}
          accent={service.accent}
          className="mt-5 max-w-4xl text-4xl leading-tight sm:text-6xl lg:text-7xl"
        />
        <Reveal delay={150}>
          <TenSeconds className="mt-6 max-w-3xl">{service.summary}</TenSeconds>
        </Reveal>
        <Reveal variant="zoom" delay={250} className="cam-marco mt-8 rounded-2xl">
          <FnxImage
            img={service.image}
            priority
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="aspect-[3/2] w-full object-cover sm:aspect-[2/1]"
          />
        </Reveal>
      </section>
      <Section id="incluye" lead="Qué" accent="incluye." className="py-12 sm:py-16">
        <Reveal as="ul" stagger className="grid gap-x-10 sm:grid-cols-2">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 border-b border-border py-4">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-area" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </Reveal>
        {service.topic === "registro" ? (
          <Reveal variant="left" className="mt-8 border-l-2 border-area pl-5">
            <p className="max-w-3xl text-lg">
              Branding y registro en un solo lugar: diseñamos tu marca y la protegemos, sin que
              tengas que coordinar a dos equipos.
            </p>
            <Button asChild variant="outline" className="mt-5">
              <a
                href={buildPartnerInstagramLink("aro")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("instagram_click", { account: "aro" })}
              >
                <Instagram aria-hidden="true" />
                Aro · Estudio Jurídico
                <span className="sr-only"> (abre Instagram en una pestaña nueva)</span>
              </a>
            </Button>
          </Reveal>
        ) : null}
      </Section>
      <Proceso />
      <Preguntas faq={service.faq} />
      <Contacto topic={service.topic} />
      <Section id="otros-servicios" lead="Otros" accent="servicios." className="py-12 sm:py-16">
        <ServiceLinks services={SERVICIOS.filter((item) => item.slug !== service.slug)} />
      </Section>
    </div>
  );
}
