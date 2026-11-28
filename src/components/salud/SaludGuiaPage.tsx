import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AgeGate } from "@/components/fnx/AgeGate";
import { Headline, Reveal, Section, TenSeconds } from "@/components/fnx/primitives";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { Preguntas } from "@/components/estudio/SeoSections";
import { CredencialEjemplo } from "@/components/salud/CredencialEjemplo";
import { GUIAS_SALUD, type GuiaSalud } from "@/data/salud-guias";

function AdultNote() {
  return (
    <p className="text-xs text-muted-foreground">
      Contenido para mayores de 18 años. Uso medicinal y responsable. La aprobación depende
      exclusivamente del organismo oficial.
    </p>
  );
}

/** Plantilla de las guías de FNX Salud: mismos bloques, contenido desde src/data/salud-guias.ts. */
export function SaludGuiaPage({ guia }: { guia: GuiaSalud }) {
  const otras = GUIAS_SALUD.filter((g) => g.slug !== guia.slug);
  return (
    <div data-area="salud">
      <AgeGate />
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-10 sm:px-8 sm:pt-16">
        <nav aria-label="Ruta" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Inicio
          </Link>{" "}
          ·{" "}
          <Link to="/salud" className="hover:text-foreground">
            FNX Salud
          </Link>{" "}
          ·{" "}
          <span className="text-foreground">
            {guia.lead} {guia.accent.replace(".", "")}
          </span>
        </nav>
        <p className="eyebrow mt-6 text-area">{guia.eyebrow}</p>
        <Headline
          as="h1"
          lead={guia.lead}
          accent={guia.accent}
          className="mt-5 max-w-4xl text-5xl leading-tight sm:text-6xl lg:text-7xl"
        />
        <Reveal delay={150}>
          <TenSeconds className="mt-6 max-w-3xl">{guia.summary}</TenSeconds>
        </Reveal>
        <Reveal delay={250} className="mt-8 flex flex-col items-start gap-4">
          <WhatsAppButton topic={guia.topic} label={guia.cta} pulse />
          <AdultNote />
        </Reveal>
      </section>

      <Section
        id="lo-que-tenes-que-saber"
        eyebrow={`Actualizado a ${guia.actualizado}`}
        lead="Lo que tenés"
        accent="que saber."
        className="py-12 sm:py-16"
      >
        <Reveal as="ul" stagger className="grid gap-4 md:grid-cols-3">
          {guia.bloques.map((b) => (
            <li
              key={b.titulo}
              className="tarjeta-viva flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6"
            >
              <h2 className="text-lg font-bold text-foreground">{b.titulo}</h2>
              {b.texto ? <p className="text-sm text-muted-foreground">{b.texto}</p> : null}
              {b.puntos ? (
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {b.puntos.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-area"
                        aria-hidden="true"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </Reveal>
      </Section>

      <Section
        id="como-te-acompanamos"
        lead="Cómo te"
        accent="acompañamos."
        className="py-12 sm:py-16"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal as="ol" stagger className="flex flex-col gap-4">
            {guia.pasos.map((paso, i) => (
              <li key={paso} className="flex items-center gap-4 border-t border-border pt-4">
                <span className="headline paso-num text-3xl text-area">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground">{paso}</span>
              </li>
            ))}
          </Reveal>
          <Reveal variant="zoom">
            <CredencialEjemplo />
          </Reveal>
        </div>
      </Section>

      <Preguntas faq={guia.faq} />

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <Reveal className="cta-vidrio flex flex-col items-start gap-6 rounded-3xl border border-border p-8 sm:p-12">
          <Headline lead="Empezá" accent="hoy." className="text-5xl sm:text-6xl" />
          <p className="max-w-lg text-muted-foreground">
            Escribinos por WhatsApp y te respondemos con los pasos para tu caso.
          </p>
          <WhatsAppButton topic={guia.topic} label={guia.cta} pulse />
          <div className="mt-2 flex flex-wrap gap-3 text-sm">
            <Link
              to="/salud"
              className="inline-flex items-center gap-1 font-semibold text-area hover:underline"
            >
              Todo sobre el REPROCANN <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {otras.map((g) => (
              <Link
                key={g.slug}
                to={g.path}
                className="inline-flex items-center gap-1 font-semibold text-area hover:underline"
              >
                {g.lead} {g.accent.replace(".", "")}{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ))}
          </div>
          <AdultNote />
        </Reveal>
      </section>
    </div>
  );
}
