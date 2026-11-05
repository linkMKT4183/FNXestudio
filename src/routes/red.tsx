import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Briefcase,
  ClipboardCheck,
  FileSignature,
  GraduationCap,
  Handshake,
  Megaphone,
  MessagesSquare,
  Scale,
  ShieldCheck,
  Stethoscope,
  Sprout,
  Palette,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Headline, IconBadge, Pieces, Reveal, Section } from "@/components/fnx/primitives";
import { FnxImage } from "@/components/fnx/FnxImage";
import { EmailButton } from "@/components/fnx/EmailButton";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { PostulacionForm } from "@/components/fnx/PostulacionForm";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IMG, type FnxImg } from "@/data/imagenes";
import { pageUrl } from "@/config/site";

export const Route = createFileRoute("/red")({
  head: () => ({
    meta: [
      { title: "Red de Profesionales FNX · Médicos, abogados, agrónomos y creativos | FNX" },
      {
        name: "description",
        content:
          "Sumate a la Red de Profesionales FNX: derivación de casos, respaldo administrativo, visibilidad y comunidad, con verificación de matrícula y estricta confidencialidad.",
      },
      { property: "og:title", content: "Red de Profesionales FNX · Ejercé con respaldo" },
      {
        property: "og:description",
        content:
          "Médicos/as, abogados/as, ingenieros/as agrónomos/as y creativos/as que trabajan en red, con ética y confidencialidad.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl("/red") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: pageUrl("/red") }],
  }),
  component: Red,
});

interface Perfil {
  area: "salud" | "consultoria" | "estudio";
  icon: LucideIcon;
  titulo: string;
  rol: string;
  requisitos: string[];
  img: FnxImg;
}

const PERFILES: Perfil[] = [
  {
    area: "salud",
    icon: Stethoscope,
    titulo: "Médicos/as prescriptores",
    rol: "Atención y seguimiento de pacientes que inician o renuevan su inscripción en el REPROCANN.",
    requisitos: [
      "Matrícula profesional vigente",
      "Inscripción en el REFEPS",
      "Formación acreditada en la materia",
      "Firma digital registrada",
    ],
    img: IMG.lupa,
  },
  {
    area: "consultoria",
    icon: Scale,
    titulo: "Abogados/as",
    rol: "Asesoramiento y patrocinio en derecho de la salud, societario, administrativo, regulatorio y agrario.",
    requisitos: [
      "Matrícula vigente en el colegio de su jurisdicción",
      "Sin sanciones disciplinarias vigentes",
      "Experiencia acreditable en el área de práctica",
    ],
    img: IMG.cJuridico,
  },
  {
    area: "consultoria",
    icon: Sprout,
    titulo: "Ingenieros/as agrónomos/as",
    rol: "Dirección técnica, habilitaciones, riego y tecnificación de proyectos productivos.",
    requisitos: [
      "Matrícula vigente en el consejo profesional",
      "Experiencia en proyectos productivos o regulados",
      "Disponibilidad para trabajo de campo",
    ],
    img: IMG.cTecnico,
  },
  {
    area: "estudio",
    icon: Palette,
    titulo: "Creativos/as",
    rol: "Diseño, fotografía, video, redacción y contenido para las marcas que acompaña FNX Estudio.",
    requisitos: [
      "Portfolio con trabajos comprobables",
      "Experiencia con marcas o clientes reales",
      "Compromiso con plazos y confidencialidad",
    ],
    img: IMG.audiovisual,
  },
];

const BENEFICIOS: { icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    icon: Handshake,
    titulo: "Derivación de casos",
    texto:
      "Te acercamos pacientes y clientes de tu especialidad, ya orientados y con la documentación en orden.",
  },
  {
    icon: Briefcase,
    titulo: "Respaldo administrativo",
    texto: "Nos ocupamos de la agenda, los formularios y el seguimiento. Vos te dedicás a ejercer.",
  },
  {
    icon: Megaphone,
    titulo: "Visibilidad profesional",
    texto:
      "Perfil en la web de FNX y difusión en nuestras redes, con el cuidado de marca que nos caracteriza.",
  },
  {
    icon: GraduationCap,
    titulo: "Capacitación y comunidad",
    texto: "Encuentros, actualización normativa e intercambio con colegas de otras disciplinas.",
  },
];

const PROCESO: { icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    icon: ClipboardCheck,
    titulo: "Postulación",
    texto: "Completás el formulario con tus datos profesionales.",
  },
  {
    icon: BadgeCheck,
    titulo: "Verificación",
    texto: "Constatamos matrícula, habilitaciones y antecedentes en los registros oficiales.",
  },
  {
    icon: MessagesSquare,
    titulo: "Entrevista",
    texto: "Una conversación para conocernos y definir cómo vas a trabajar con la red.",
  },
  {
    icon: FileSignature,
    titulo: "Convenio",
    texto:
      "Firmamos un convenio de colaboración y un acuerdo de confidencialidad. Todo queda por escrito.",
  },
  {
    icon: UserCheck,
    titulo: "Alta en la red",
    texto: "Empezás a recibir casos y a formar parte de la comunidad FNX.",
  },
];

const PRINCIPIOS: { icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    icon: ShieldCheck,
    titulo: "Secreto profesional y confidencialidad",
    texto:
      "La información de pacientes y clientes se trata con reserva, conforme a la Ley 25.326 de Protección de Datos Personales y a la normativa de cada profesión.",
  },
  {
    icon: Scale,
    titulo: "Independencia de criterio",
    texto:
      "FNX coordina y gestiona; nunca interfiere en el criterio médico, jurídico o técnico de cada profesional.",
  },
  {
    icon: FileSignature,
    titulo: "Honorarios claros",
    texto:
      "Las condiciones económicas se acuerdan por escrito antes de empezar, sin cargos ocultos.",
  },
  {
    icon: Users,
    titulo: "Ética y cumplimiento normativo",
    texto:
      "Trabajamos dentro del marco legal vigente y respetamos los códigos de ética de cada colegio y consejo profesional.",
  },
];

const FAQ = [
  {
    q: "¿Sumarme a la red afecta mi independencia profesional?",
    a: "No. Mantenés tu matrícula, tu consultorio o estudio y tu criterio profesional. FNX coordina, gestiona y deriva; las decisiones profesionales son siempre tuyas.",
  },
  {
    q: "¿Cómo se formaliza la colaboración?",
    a: "Mediante un convenio de colaboración entre partes y un acuerdo de confidencialidad, donde quedan establecidos el alcance, las condiciones económicas y las obligaciones de cada uno.",
  },
  {
    q: "¿Qué documentación tengo que presentar?",
    a: "Para profesiones reguladas, la constancia de matrícula vigente y, según el caso, la inscripción en los registros correspondientes (por ejemplo, el REFEPS para médicos/as). Para perfiles creativos, un portfolio con trabajos comprobables.",
  },
  {
    q: "¿Qué pasa con los datos que envío?",
    a: "Se usan únicamente para evaluar tu incorporación. Podés pedir el acceso, la rectificación o la supresión de tus datos en cualquier momento.",
  },
];

function Red() {
  return (
    <div>
      {/* Portada */}
      <section aria-labelledby="red-titulo" className="relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[3fr_2fr]">
          <Reveal className="flex flex-col gap-8">
            <p className="eyebrow text-area">Red de Profesionales FNX</p>
            <Headline
              as="h1"
              id="red-titulo"
              lead="Ejercé con"
              accent="respaldo."
              className="text-6xl sm:text-8xl"
            />
            <p className="max-w-xl text-lg text-muted-foreground">
              Convocamos a médicos/as, abogados/as, ingenieros/as agrónomos/as y creativos/as que
              quieran ampliar su práctica dentro de una red seria, verificada y con estricta
              confidencialidad.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="area" size="lg">
                <a href="#postulacion">Postulate a la red</a>
              </Button>
              <WhatsAppButton topic="red" label="Consultar por WhatsApp" variant="outline" />
            </div>
            <Pieces lit={4} />
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-3xl border border-border">
              <FnxImage
                img={IMG.redHero}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="hero-zoom aspect-[4/5] h-full w-full object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Perfiles */}
      <Section
        id="perfiles"
        eyebrow="A quién convocamos"
        lead="Cuatro disciplinas,"
        accent="una sola red."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {PERFILES.map((p, i) => (
            <Reveal key={p.titulo} delay={i * 80}>
              <article
                data-area={p.area}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-[border-color,box-shadow] duration-300 hover:border-area hover:shadow-glow-soft"
              >
                <div className="aspect-[16/9] overflow-hidden border-b border-border">
                  <FnxImage
                    img={p.img}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="photo-hover h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-8">
                  <div className="flex items-center gap-3">
                    <IconBadge icon={p.icon} />
                    <h3 className="text-2xl font-bold text-foreground">{p.titulo}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.rol}</p>
                  <div>
                    <p className="eyebrow mb-2 text-area">Requisitos</p>
                    <ul className="flex flex-col gap-1.5 text-sm text-foreground">
                      {p.requisitos.map((r) => (
                        <li key={r} className="flex items-start gap-2">
                          <BadgeCheck
                            className="mt-0.5 h-4 w-4 shrink-0 text-area"
                            aria-hidden="true"
                          />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Beneficios */}
      <section aria-labelledby="beneficios-titulo" className="border-y border-border bg-card">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal className="flex flex-col gap-6">
            <p className="eyebrow text-muted-foreground">Qué te ofrece FNX</p>
            <Headline
              id="beneficios-titulo"
              lead="Vos ejercés."
              accent="Nosotros sumamos el resto."
              className="text-5xl sm:text-6xl lg:text-7xl"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFICIOS.map((b, i) => (
              <Reveal key={b.titulo} delay={i * 80}>
                <div className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-background p-7">
                  <IconBadge icon={b.icon} />
                  <h3 className="text-lg font-bold text-foreground">{b.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{b.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <Section
        id="proceso"
        eyebrow="Cómo es la incorporación"
        lead="Cinco pasos,"
        accent="todo por escrito."
      >
        <ol className="grid gap-4 md:grid-cols-5">
          {PROCESO.map((s, i) => (
            <Reveal as="li" key={s.titulo} delay={i * 80} className="h-full">
              <div className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-card p-6">
                <span className="headline text-4xl text-area">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <s.icon className="h-5 w-5 text-foreground" aria-hidden="true" />
                <h3 className="text-base font-bold text-foreground">{s.titulo}</h3>
                <p className="text-sm text-muted-foreground">{s.texto}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Principios */}
      <Section
        id="principios"
        eyebrow="Nuestros compromisos"
        lead="Confianza que"
        accent="se firma."
        className="pt-0 sm:pt-0"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {PRINCIPIOS.map((p, i) => (
            <Reveal key={p.titulo} delay={i * 80}>
              <div className="flex h-full gap-5 rounded-3xl border border-border bg-card p-7">
                <IconBadge icon={p.icon} variant="outline" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-foreground">{p.titulo}</h3>
                  <p className="text-sm text-muted-foreground">{p.texto}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Postulación */}
      <Section
        id="postulacion"
        eyebrow="Postulación"
        lead="Tu lugar en la red"
        accent="empieza acá."
      >
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          <Reveal>
            <div className="flex flex-col gap-4 text-muted-foreground">
              <p>
                Completá el formulario con tus datos profesionales. Revisamos cada postulación de
                manera individual y te contactamos para coordinar una entrevista.
              </p>
              <p>
                La incorporación está sujeta a la verificación de la información presentada y a la
                firma del convenio de colaboración.
              </p>
              <EmailButton account="estudio" topic="red" label="Prefiero escribir por mail" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <PostulacionForm />
          </Reveal>
        </div>
      </Section>

      {/* Preguntas frecuentes */}
      <Section
        id="faq-red"
        eyebrow="Preguntas frecuentes"
        lead="Lo que suelen"
        accent="preguntarnos."
        className="pt-0 sm:pt-0"
      >
        <Accordion type="single" collapsible className="flex max-w-3xl flex-col gap-3">
          {FAQ.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className="rounded-2xl border border-border bg-card px-6"
            >
              <AccordionTrigger className="py-5 text-left text-base font-bold text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                <p>{f.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </div>
  );
}
