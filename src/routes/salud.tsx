import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  BellRing,
  CalendarClock,
  ClipboardCheck,
  Compass,
  FileCheck2,
  FileQuestion,
  Gift,
  HandHeart,
  Landmark,
  Leaf,
  Lock,
  MapPin,
  PawPrint,
  Scale,
  ShieldCheck,
  Sprout,
  Stethoscope,
  Timer,
  UserRound,
  Users,
} from "lucide-react";
import { InstagramButton } from "@/components/fnx/InstagramButton";
import { Headline, Pieces, Reveal, Section } from "@/components/fnx/primitives";
import { AgeGate } from "@/components/fnx/AgeGate";
import { FnxImage } from "@/components/fnx/FnxImage";
import { EmailButton } from "@/components/fnx/EmailButton";
import { WhatsAppChat } from "@/components/fnx/WhatsAppChat";
import { NetworkViz, type NetworkNode } from "@/components/fnx/NetworkViz";
import { WhatsAppButton } from "@/components/fnx/WhatsAppButton";
import { IMG } from "@/data/imagenes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { breadcrumbLd, faqLd, pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

const RED_SALUD: NetworkNode[] = [
  { label: "Médicos", icon: Stethoscope, color: "var(--fnx-verde)" },
  { label: "Trámite", icon: FileCheck2, color: "var(--fnx-verde)" },
  { label: "ONGs", icon: Users, color: "var(--fnx-verde)" },
  { label: "Abogados", icon: Scale, color: "var(--fnx-verde)" },
  { label: "Tus datos", icon: Lock, color: "var(--fnx-verde)" },
];

/** Lo básico del REPROCANN, para quien llega sin saber qué es. */
const BASICO = [
  {
    icon: Landmark,
    title: "Un registro oficial",
    text: "Es el Registro del Programa de Cannabis, creado a partir de la Ley 27.350. Desde 2026 lo opera la SEDRONAR, dentro del Ministerio de Salud de la Nación.",
  },
  {
    icon: Leaf,
    title: "Te habilita a cultivar",
    text: "Con el certificado accedés al cultivo controlado de cannabis con fines medicinales, terapéuticos o para aliviar el dolor, dentro de la ley.",
  },
  {
    icon: Sprout,
    title: "Tres formas de cultivo",
    text: "Cultivás vos, lo hace una persona de tu confianza (cultivador solidario) o una ONG inscripta en el registro.",
  },
  {
    icon: Gift,
    title: "Inscripción gratuita",
    text: "El trámite ante el Estado no tiene costo. El certificado dura 3 años si cultivás vos y 1 año si es a través de una ONG.",
  },
];

const PASOS_REPROCANN = [
  {
    titulo: "La consulta médica",
    texto:
      "Un médico habilitado evalúa tu caso y, si corresponde, te indica el tratamiento. Debe tener matrícula vigente, inscripción en el REFEPS y la formación que hoy exige la normativa.",
    fnx: "te conectamos con médicos verificados.",
  },
  {
    titulo: "Tu cuenta en Mi Argentina",
    texto:
      "Creás o validás tu cuenta en Mi Argentina (web o app). El sistema la usa para verificar tu identidad.",
    fnx: "te guiamos para crearla o validarla sin errores.",
  },
  {
    titulo: "Inicio de la solicitud",
    texto:
      "Iniciás el trámite en el aplicativo del REPROCANN con tus datos y elegís la modalidad: cultivo propio, a través de un tercero o mediante una ONG inscripta.",
    fnx: "te explicamos cada modalidad para que elijas con información.",
  },
  {
    titulo: "Documentación del profesional",
    texto:
      "Firmás el consentimiento informado y la declaración jurada. El médico los adjunta en PDF y vincula la modalidad de cultivo elegida.",
    fnx: "revisamos que la documentación esté completa antes de enviarla.",
  },
  {
    titulo: "Autorización",
    texto:
      "El programa evalúa la solicitud y, si la aprueba, emite tu certificado. Los casos simples con todo completo pueden salir más rápido; el resto pasa por revisión manual y puede demorar.",
    fnx: "hacemos el seguimiento hasta que tengas tu certificado.",
  },
  {
    titulo: "Vigencia y renovación",
    texto:
      "El certificado dura 3 años si cultivás vos y 1 año si lo hacés a través de una ONG. No se renueva solo: al vencer, hay que volver a tramitarlo.",
    fnx: "te avisamos antes del vencimiento para que no se te pase la fecha.",
  },
];

/** Qué hace FNX Salud, en concreto. */
const INCLUYE = [
  {
    icon: Compass,
    title: "Te explicamos todo",
    text: "Qué necesitás, en qué orden y qué modalidad de cultivo te conviene, en un lenguaje simple.",
    img: IMG.brujulas,
  },
  {
    icon: BadgeCheck,
    title: "Médicos y ONGs verificados",
    text: "Te conectamos con médicos habilitados para indicar el tratamiento y con ONGs inscriptas que cumplen.",
    img: IMG.lupa,
  },
  {
    icon: ClipboardCheck,
    title: "Revisamos y seguimos tu trámite",
    text: "Chequeamos que la documentación esté completa antes de enviarla y te acompañamos hasta que tenés el certificado.",
    img: IMG.carpetas,
  },
  {
    icon: BellRing,
    title: "Te avisamos la renovación",
    text: "El certificado no se renueva solo. Te avisamos antes de que venza para que no te quedes sin él.",
    img: IMG.ongs,
  },
];

/** Normativa vigente, por jurisdicción. Revisar cada vez que cambie la ley. */
const NORMATIVA = [
  {
    lugar: "Nación",
    puntos: [
      "Ley 27.350: uso medicinal del cannabis y creación del registro.",
      "Resolución 1780/2025: nuevos requisitos, categorías y vigencia (3 años autocultivo, 1 año ONG).",
      "Decreto 27/2026: el REPROCANN pasa a ser operado por la SEDRONAR, dentro del Ministerio de Salud.",
      "2026: circuito más ágil para casos simples con documentación completa.",
    ],
  },
  {
    lugar: "Mendoza",
    puntos: [
      "Ley 9617 y Decreto 1928/2025: marco para la cadena de valor del cannabis medicinal y el cáñamo.",
      "Resolución 151/2026: registro provincial REPRO-Mendoza para pacientes, terceros cultivadores y asociaciones.",
      "Resolución 526/2026: registro provincial de médicos que indican cannabis.",
      "REPROVET: programa provincial de cannabis medicinal para animales, el primero del país.",
      "FNX también te acompaña con el trámite provincial.",
    ],
  },
  {
    lugar: "San Juan",
    puntos: [
      "Ley 1926-Q: adhesión a la Ley 27.350.",
      "El trámite de pacientes se hace por el REPROCANN nacional.",
    ],
  },
];

const PARA_QUIEN = [
  {
    icon: UserRound,
    title: "Querés empezar tu tratamiento",
    text: "Nunca hiciste el trámite y querés saber por dónde arrancar.",
  },
  {
    icon: HandHeart,
    title: "Acompañás a alguien",
    text: "Sos familiar o responsable de un paciente y hacés el trámite por él o ella.",
  },
  {
    icon: CalendarClock,
    title: "Tu certificado vence",
    text: "Ya tenés REPROCANN y necesitás renovarlo a tiempo.",
  },
  {
    icon: PawPrint,
    title: "Tu mascota necesita tratamiento",
    text: "En Mendoza existe el REPROVET, el programa provincial de cannabis medicinal para animales. Te orientamos con el trámite.",
  },
];

const FAQ = [
  {
    icon: Compass,
    q: "¿Por dónde empiezo?",
    a: "Escribinos por WhatsApp y contanos si es tu primer trámite o una renovación. Te decimos qué necesitás y en qué orden.",
    whatsapp: true,
  },
  {
    icon: ShieldCheck,
    q: "¿Es legal?",
    a: "Sí. El uso medicinal del cannabis está regulado por la Ley 27.350, y el certificado del REPROCANN acredita que tu cultivo cumple las condiciones del programa.",
  },
  {
    icon: Stethoscope,
    q: "¿Necesito una consulta médica?",
    a: "Sí. El trámite empieza con la indicación de un médico con matrícula vigente e inscripto en el REFEPS. Si no tenés uno, te conectamos con médicos verificados.",
  },
  {
    icon: Timer,
    q: "¿Cuánto tarda?",
    a: "Depende de la evaluación oficial. Desde 2026 los casos simples con documentación completa pueden resolverse más rápido; otros siguen en revisión manual y demoran. Por eso nos ocupamos de que tu solicitud salga completa.",
  },
  {
    icon: FileQuestion,
    q: "¿Me garantizan la aprobación?",
    a: "No. La aprobación depende de la evaluación oficial; te ayudamos a presentar todo correctamente.",
  },
  {
    icon: FileCheck2,
    q: "¿Cuánto cuesta?",
    a: "La inscripción ante el Estado es gratuita. Nuestro acompañamiento tiene un valor, y te lo pasamos antes de empezar.",
  },
  {
    icon: MapPin,
    q: "¿Vivo en Mendoza o San Juan, cambia algo?",
    a: "En San Juan el trámite se hace por el REPROCANN nacional. En Mendoza, además, existe el registro provincial (REPRO-Mendoza) y también te acompañamos con ese trámite. Te decimos cuál te conviene según tu caso.",
  },
  {
    icon: Lock,
    q: "¿Qué pasa con mis datos?",
    a: "Te pedimos consentimiento, tratamos tu información con reserva y solo la compartimos con el profesional que elijas.",
  },
];

const TITULO = "REPROCANN: te acompañamos en el trámite | FNX Salud (+18)";
const DESCRIPCION =
  "Te acompañamos a tramitar o renovar tu REPROCANN: consulta médica, documentación y seguimiento hasta tu certificado. Médicos y ONGs verificados. Solo mayores de 18 años.";

export const Route = createFileRoute("/salud")({
  head: () =>
    pageHead(TITULO, DESCRIPCION, "/salud", [
      faqLd(FAQ.map((f) => ({ question: f.q, answer: f.a }))),
      breadcrumbLd([
        { name: "Inicio", path: "/" },
        { name: "FNX Salud", path: "/salud" },
      ]),
    ]),
  component: Salud,
});

function AdultNote() {
  return (
    <p className="border-t border-border pt-5 text-xs text-muted-foreground">
      Contenido para mayores de 18 años. Uso medicinal y responsable.
    </p>
  );
}

/** Pasos del trámite: acordeón a la izquierda y panel visual que sigue el paso abierto. */
function PasosReprocann() {
  const [open, setOpen] = useState("paso-1");
  const idx = Math.max(0, Number(open.replace("paso-", "")) - 1);
  const actual = PASOS_REPROCANN[idx] ?? PASOS_REPROCANN[0]!;
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <Reveal>
        <Accordion
          type="single"
          collapsible
          value={open}
          onValueChange={(v) => setOpen(v || open)}
          className="flex flex-col gap-3"
        >
          {PASOS_REPROCANN.map((p, i) => (
            <AccordionItem
              key={p.titulo}
              value={`paso-${i + 1}`}
              className="rounded-2xl border border-border bg-card px-6 data-[state=open]:border-area"
            >
              <AccordionTrigger className="py-5 text-left text-base font-bold text-foreground hover:no-underline">
                <span className="flex items-center gap-4">
                  <span className="headline paso-num text-3xl text-area">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p.titulo}
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3 text-base text-muted-foreground">
                <p>{p.texto}</p>
                <p className="text-sm text-foreground">
                  <span className="font-bold text-area">FNX te acompaña:</span> {p.fnx}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-4 text-xs text-muted-foreground">
          Información basada en la Ley 27.350, la Resolución 1780/2025 y el Decreto 27/2026. El
          trámite es personal y la aprobación depende exclusivamente del organismo oficial.
        </p>
      </Reveal>
      <Reveal delay={120} className="h-full">
        <div className="relative h-full min-h-[28rem] overflow-hidden rounded-2xl border border-border bg-card">
          <FnxImage
            img={IMG.escalera}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="tono-zoom absolute inset-0 h-full w-full object-cover object-[70%_50%]"
          />
          <div className="tono-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent p-6 pt-24">
            <div key={idx} className="phrase-in flex flex-col gap-2" aria-live="polite">
              <p className="eyebrow text-area">
                Paso {String(idx + 1).padStart(2, "0")} de{" "}
                {String(PASOS_REPROCANN.length).padStart(2, "0")}
              </p>
              <p className="headline text-4xl text-foreground">{actual.titulo}</p>
              <p className="text-sm text-muted-foreground">FNX te acompaña: {actual.fnx}</p>
            </div>
            <div className="mt-5 flex gap-2" aria-hidden="true">
              {PASOS_REPROCANN.map((p, i) => (
                <button
                  key={p.titulo}
                  type="button"
                  tabIndex={-1}
                  onClick={() => setOpen(`paso-${i + 1}`)}
                  className={cn(
                    "h-2 flex-1 rounded-full transition-all duration-500",
                    i < idx ? "bg-area/50" : i === idx ? "bg-area shadow-glow" : "bg-foreground/15",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/** Preguntas frecuentes: el chat de WhatsApp de al lado muestra la pregunta abierta y su respuesta. */
function FaqWithPhotos() {
  const [open, setOpen] = useState("");
  const idx = Math.max(
    0,
    FAQ.findIndex((_, i) => `faq-${i}` === open),
  );
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
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className="rounded-2xl border border-border bg-card px-6"
            >
              <AccordionTrigger className="py-5 text-left text-base font-bold text-foreground hover:no-underline">
                <span className="flex items-center gap-3">
                  <f.icon className="h-5 w-5 shrink-0 text-area" aria-hidden="true" />
                  {f.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                <p>{f.a}</p>
                {"whatsapp" in f && f.whatsapp ? (
                  <WhatsAppButton
                    topic="salud"
                    label="Escribinos"
                    size="default"
                    className="mt-4"
                  />
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
      <Reveal delay={120} className="max-lg:hidden">
        <WhatsAppChat question={current.q} answer={current.a} />
      </Reveal>
    </div>
  );
}

function Salud() {
  return (
    <div data-area="salud">
      <AgeGate />

      <section
        className="mx-auto w-full max-w-6xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24"
        aria-labelledby="salud-titulo"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="flex flex-col gap-7">
            <p className="eyebrow text-area">FNX Salud · +18 · Cannabis medicinal</p>
            <Headline
              as="h1"
              id="salud-titulo"
              lead="Te acompañamos con tu"
              accent="REPROCANN."
              className="text-5xl sm:text-7xl xl:text-8xl"
            />
            <p className="max-w-xl text-lg text-muted-foreground">
              El REPROCANN es el registro nacional que te autoriza a cultivar cannabis con fines
              medicinales. Te guiamos desde la consulta médica hasta que tenés tu certificado, y te
              avisamos cuando toca renovarlo. En Mendoza también te acompañamos con el registro
              provincial.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <WhatsAppButton topic="salud" label="Quiero hacer mi REPROCANN" pulse />
              <WhatsAppButton topic="renovacion" label="Quiero renovarlo" variant="outline" />
            </div>
            <AdultNote />
          </Reveal>
          <Reveal delay={150}>
            <NetworkViz nodes={RED_SALUD} />
          </Reveal>
        </div>
      </section>

      <Section
        id="que-es"
        eyebrow="Lo básico"
        lead="¿Qué es el"
        accent="REPROCANN?"
        tldr="En Argentina el cannabis medicinal está regulado. Pacientes, cultivadores solidarios y ONGs se inscriben en un registro oficial y cumplen reglas claras. Trabajamos siempre dentro de ese marco."
      >
        <Reveal as="ul" stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BASICO.map((b) => (
            <li
              key={b.title}
              className="tarjeta-viva flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-area text-area-foreground">
                <b.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-foreground">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.text}</p>
            </li>
          ))}
        </Reveal>
      </Section>

      <Section
        id="ley-al-dia"
        eyebrow="Actualizado a noviembre de 2026"
        lead="La ley,"
        accent="al día."
        tldr="Las reglas cambiaron en los últimos meses. Esto es lo que rige hoy en el país, en Mendoza y en San Juan."
      >
        <Reveal as="ul" stagger className="grid gap-4 md:grid-cols-3">
          {NORMATIVA.map((n) => (
            <li
              key={n.lugar}
              className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6"
            >
              <p className="headline text-3xl text-area">{n.lugar}</p>
              <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                {n.puntos.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-area"
                      aria-hidden="true"
                    />
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>
      </Section>

      <Section
        id="que-hacemos"
        eyebrow="Qué hacemos"
        lead="Lo que incluye el"
        accent="acompañamiento."
        footer={<AdultNote />}
      >
        <Reveal as="ul" stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUYE.map((s) => (
            <li
              key={s.title}
              className="group tarjeta-viva flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[border-color,box-shadow] duration-300 hover:border-area hover:shadow-glow-soft"
            >
              <div className="cam-marco aspect-[16/9] border-b border-border">
                <FnxImage img={s.img} className="photo-hover h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-area text-area-foreground">
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Section>

      <Section
        id="reprocann-paso-a-paso"
        eyebrow="Paso a paso"
        lead="Cómo se tramita,"
        accent="sin vueltas."
        footer={<AdultNote />}
      >
        <PasosReprocann />
      </Section>

      <Section id="para-quien" eyebrow="Para quién es" lead="¿Es para" accent="vos?">
        <Reveal as="ul" stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARA_QUIEN.map((p) => (
            <li
              key={p.title}
              className="tarjeta-viva flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6"
            >
              <p.icon className="h-6 w-6 text-area" aria-hidden="true" />
              <h3 className="text-lg font-bold text-foreground">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.text}</p>
            </li>
          ))}
        </Reveal>
        <Reveal className="mt-4 rounded-2xl border border-border p-6">
          <p className="eyebrow text-muted-foreground">Sector regulado</p>
          <p className="mt-2 text-foreground">
            ¿Tenés una ONG, un proyecto de cultivo o una empresa del sector? Para eso está{" "}
            <Link
              to="/consultoria"
              className="font-semibold underline underline-offset-4 hover:text-area"
            >
              FNX Consultoría
            </Link>
            : inscripción, plan de cultivo, documentación y respaldo legal.
          </p>
        </Reveal>
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

      <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8" aria-labelledby="salud-cta">
        <Reveal className="cta-vidrio flex flex-col items-start gap-6 rounded-3xl border border-border p-8 sm:p-14">
          <Pieces lit={2} />
          <Headline
            id="salud-cta"
            lead="Empezá tu REPROCANN"
            accent="hoy."
            className="text-5xl sm:text-7xl"
          />
          <p className="max-w-lg text-muted-foreground">
            Escribinos por WhatsApp y te respondemos con los pasos para tu caso.
          </p>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton topic="salud" label="Quiero hacer mi REPROCANN" pulse />
            <EmailButton account="salud" topic="salud" />
            <InstagramButton account="salud" />
          </div>
          <AdultNote />
        </Reveal>
      </section>
    </div>
  );
}
