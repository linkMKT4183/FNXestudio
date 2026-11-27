import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FnxImage } from "@/components/fnx/FnxImage";
import { Reveal, Section } from "@/components/fnx/primitives";
import { SERVICIOS } from "@/data/servicios";
import type { Nota } from "@/data/notas";
import { Contacto, SeoBreadcrumb, ServiceLinks } from "@/components/estudio/SeoSections";

export function fechaCorta(date: string) {
  return date.split("-").reverse().join("/");
}

export function NotaPage({ note }: { note: Nota }) {
  return (
    <div data-area="estudio">
      <SeoBreadcrumb section="Notas" name={note.title} />
      <article className="mx-auto max-w-6xl px-5 pt-8 sm:px-8 sm:pt-14">
        <header className="max-w-4xl">
          <p className="eyebrow text-area">Notas · FNX Estudio</p>
          <h1 className="headline mt-5 text-4xl leading-tight text-foreground sm:text-6xl">
            {note.title}
          </h1>
          <p className="mt-5 text-sm text-muted-foreground">
            <time dateTime={note.date}>{fechaCorta(note.date)}</time> · {note.readingMinutes} min de
            lectura
          </p>
        </header>
        <Reveal variant="zoom" delay={200} className="cam-marco mt-8 rounded-2xl">
          <FnxImage
            img={note.image}
            priority
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="aspect-[3/2] w-full object-cover sm:aspect-[2/1]"
          />
        </Reveal>
        <div className="mx-auto max-w-3xl py-10 sm:py-16">
          {note.sections.map((section) => (
            <Reveal as="section" key={section.h2} className="mb-9">
              <h2 className="text-xl font-bold leading-snug sm:text-2xl">{section.h2}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {"link" in section ? (
                <Button asChild variant="link" className="mt-3 px-0">
                  <Link to={section.link}>
                    Hacer la prueba
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              ) : null}
            </Reveal>
          ))}
        </div>
      </article>
      <Contacto topic={note.ctaTopic} />
      <Section
        id="servicios-relacionados"
        lead="Servicios"
        accent="relacionados."
        className="py-12 sm:py-16"
      >
        <ServiceLinks
          services={SERVICIOS.filter((service) =>
            note.related.some((topic) => topic === service.topic),
          )}
        />
      </Section>
    </div>
  );
}
