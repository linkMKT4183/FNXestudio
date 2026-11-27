import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Headline, Section, TenSeconds } from "@/components/fnx/primitives";
import type { Ciudad } from "@/data/ciudades";
import { Contacto, Preguntas, Proceso, ServiceLinks } from "./SeoSections";

export function CiudadPage({ city }: { city: Ciudad }) {
  const otra =
    city.slug === "mendoza"
      ? { to: "/san-juan", name: "San Juan" }
      : { to: "/mendoza", name: "Mendoza" };
  return (
    <div data-area="estudio">
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-10 sm:px-8 sm:pt-16">
        <p className="eyebrow text-area">{city.eyebrow}</p>
        <Headline
          as="h1"
          lead={city.lead}
          accent={city.accent}
          className="mt-5 max-w-4xl text-4xl leading-tight sm:text-6xl lg:text-7xl"
        />
        <TenSeconds className="mt-6 max-w-3xl">{city.summary}</TenSeconds>
      </section>
      <Section id="servicios" lead="Lo que" accent="hacemos." className="py-12 sm:py-16">
        <ServiceLinks />
      </Section>
      <Section id="donde-trabajamos" lead="Dónde" accent="trabajamos." className="py-12 sm:py-16">
        <ul className="flex flex-wrap gap-3">
          {[...city.departments, "y el resto de la provincia"].map((name) => (
            <li key={name} className="rounded-full border border-border px-4 py-2 text-sm">
              {name}
            </li>
          ))}
        </ul>
      </Section>
      <Proceso conditions={false} />
      <Preguntas faq={city.faq} />
      <Contacto topic={city.topic} />
      <nav aria-label="Otra ciudad" className="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
        <Button asChild variant="link" className="h-auto whitespace-normal px-0 text-left">
          <Link to={otra.to}>
            Agencia de branding y marketing en {otra.name}
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </nav>
    </div>
  );
}
