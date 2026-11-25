import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Headline, Reveal } from "@/components/fnx/primitives";
import {
  AAIP_URL,
  DEFENSA_CONSUMIDOR,
  EMAILS,
  LEGAL,
  OG_IMAGE_META,
  buildMailtoLink,
  pageUrl,
} from "@/config/site";

const TITLE = "Privacidad y términos | FNX · Fénix Creativo";
const DESC =
  "Cómo cuidamos tus datos y cómo trabajamos en FNX: política de privacidad (Ley 25.326) y términos y condiciones (Ley 24.240).";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: pageUrl("/legal") },
      ...OG_IMAGE_META,
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: pageUrl("/legal") }],
  }),
  component: Legal,
});

/** Bloque de texto legal: título corto y párrafos legibles. */
function Bloque({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-bold text-foreground">{titulo}</h3>
      <div className="flex flex-col gap-3 text-base leading-relaxed text-muted-foreground [&_a]:underline [&_a:hover]:text-foreground [&_li]:ml-5 [&_li]:list-disc">
        {children}
      </div>
    </div>
  );
}

function Titular() {
  const partes = [
    LEGAL.titular || "Fénix Creativo (FNX)",
    LEGAL.cuit ? `CUIT ${LEGAL.cuit}` : null,
    LEGAL.domicilio || null,
  ].filter(Boolean);
  return <>{partes.join(" · ")}</>;
}

export function Legal() {
  const mailDatos = buildMailtoLink("estudio", "general");
  return (
    <div data-area="estudio">
      <section className="mx-auto w-full max-w-3xl px-5 pb-10 pt-28 sm:px-8 sm:pt-36">
        <Reveal className="flex flex-col gap-6">
          <p className="eyebrow text-muted-foreground">Información legal</p>
          <Headline
            as="h1"
            lead="Tus datos y"
            accent="cómo trabajamos."
            className="text-5xl min-[420px]:text-6xl sm:text-7xl"
          />
          <p className="text-lg text-muted-foreground">
            Lo importante primero: no vendemos tus datos, no te pedimos datos de salud por la web y
            podés pedir que los borremos cuando quieras.
          </p>
          <p className="text-sm text-muted-foreground">Última actualización: {LEGAL.actualizado}.</p>
          <nav aria-label="En esta página" className="flex flex-wrap gap-3 text-sm font-semibold">
            <a href="#privacidad" className="rounded-full border border-border px-4 py-2 hover:border-foreground">
              Política de privacidad
            </a>
            <a href="#terminos" className="rounded-full border border-border px-4 py-2 hover:border-foreground">
              Términos y condiciones
            </a>
          </nav>
        </Reveal>
      </section>

      {/* ---------------- PRIVACIDAD ---------------- */}
      <section
        id="privacidad"
        aria-labelledby="privacidad-titulo"
        className="mx-auto flex w-full max-w-3xl scroll-mt-28 flex-col gap-10 px-5 py-14 sm:px-8"
      >
        <h2 id="privacidad-titulo" className="headline text-4xl text-foreground sm:text-5xl">
          Política de <span className="text-area">privacidad</span>
        </h2>

        <Bloque titulo="Quién cuida tus datos">
          <p>
            El responsable de la base de datos es <Titular />. Sedes en San Juan y Mendoza.
            Contacto: <a href={mailDatos}>{EMAILS.estudio}</a> o WhatsApp 261 630-6508. Para FNX
            Salud: <a href={buildMailtoLink("salud", "salud")}>{EMAILS.salud}</a>.
          </p>
          <p>Cumplimos la Ley 25.326 de Protección de los Datos Personales.</p>
        </Bloque>

        <Bloque titulo="Qué datos pedimos y para qué">
          <ul>
            <li>
              <strong className="text-foreground">Formulario de la guía:</strong> nombre, mail,
              WhatsApp y el área que te interesa. Los usamos para mandarte la guía y responder tu
              consulta.
            </li>
            <li>
              <strong className="text-foreground">Postulación a la red de profesionales:</strong> los
              datos del formulario y tu matrícula si corresponde. Los usamos solo para evaluar tu
              incorporación.
            </li>
            <li>
              <strong className="text-foreground">WhatsApp y mail:</strong> lo que vos nos escribas,
              para responderte y armar una propuesta.
            </li>
          </ul>
          <p>
            Pedimos solo lo necesario. Ningún dato es obligatorio para navegar la web: si no querés
            completar un formulario, podés escribirnos directo por WhatsApp.
          </p>
          <p>
            <strong className="text-foreground">Datos de salud:</strong> la web no pide datos de
            salud. Si más adelante FNX Salud los necesita para acompañarte en un trámite, te lo
            explicamos antes y te pedimos tu consentimiento por escrito.
          </p>
        </Bloque>

        <Bloque titulo="Con quién los compartimos">
          <p>No vendemos, alquilamos ni cedemos tus datos. Para funcionar usamos estos servicios:</p>
          <ul>
            <li>FormSubmit, que recibe los formularios y nos los reenvía por mail.</li>
            <li>Gmail (Google), donde recibimos los mails.</li>
            <li>WhatsApp (Meta), si nos escribís por ahí.</li>
            <li>Lovable, que aloja esta web.</li>
          </ul>
          <p>
            Algunos de estos servicios guardan la información en servidores fuera de la Argentina,
            por ejemplo en Estados Unidos. Al mandarnos un formulario aceptás esa transferencia.
          </p>
          <p>
            Si un profesional de la red tiene que atender tu consulta, te avisamos antes de pasarle
            tus datos.
          </p>
        </Bloque>

        <Bloque titulo="Cuánto tiempo los guardamos">
          <p>
            Mientras dure la consulta o el trabajo, y después el tiempo que exijan las normas
            contables e impositivas. Si no avanzamos, los borramos dentro de los 12 meses.
          </p>
        </Bloque>

        <Bloque titulo="Lo que guarda tu navegador">
          <p>
            La web no usa cookies de publicidad ni de seguimiento. Solo guarda en tu navegador dos
            preferencias: si activaste el sonido y si confirmaste que sos mayor de 18 para entrar a
            Salud. Podés borrarlas desde la configuración de tu navegador.
          </p>
          <p>
            Si en el futuro sumamos herramientas para medir visitas, te lo vamos a avisar con un
            cartel y vas a poder rechazarlas con un solo botón.
          </p>
        </Bloque>

        <Bloque titulo="Menores de edad">
          <p>
            La web no está pensada para menores de 18 años y no buscamos recolectar sus datos. La
            sección Salud tiene un filtro de mayoría de edad.
          </p>
        </Bloque>

        <Bloque titulo="Tus derechos">
          <p>
            Podés pedir <strong className="text-foreground">ver, corregir, actualizar o borrar</strong>{" "}
            tus datos, y retirar tu consentimiento cuando quieras. Escribinos a{" "}
            <a href={mailDatos}>{EMAILS.estudio}</a> con el asunto «Mis datos».
          </p>
          <p>
            Te respondemos en los plazos de la ley: 10 días corridos para mostrarte tus datos y 5
            días hábiles para corregirlos o borrarlos.
          </p>
          <p>
            El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a
            los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se
            acredite un interés legítimo al efecto conforme lo establecido en el artículo 14,
            inciso 3 de la Ley N° 25.326.
          </p>
          <p>
            La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la
            Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan
            quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en
            materia de protección de datos personales.{" "}
            <a href={AAIP_URL} target="_blank" rel="noopener noreferrer">
              Sitio de la Agencia
              <span className="sr-only"> (abre en una pestaña nueva)</span>
            </a>
            .
          </p>
        </Bloque>

        <Bloque titulo="Seguridad">
          <p>
            Cuidamos tus datos con medidas razonables: accesos con contraseña, cuentas separadas por
            área y solo las personas de FNX que los necesitan pueden verlos.
          </p>
        </Bloque>
      </section>

      {/* ---------------- TÉRMINOS ---------------- */}
      <section
        id="terminos"
        aria-labelledby="terminos-titulo"
        className="mx-auto flex w-full max-w-3xl scroll-mt-28 flex-col gap-10 px-5 py-14 sm:px-8"
      >
        <h2 id="terminos-titulo" className="headline text-4xl text-foreground sm:text-5xl">
          Términos y <span className="text-area">condiciones</span>
        </h2>

        <Bloque titulo="Qué es esta web">
          <p>
            fnxestudio.com es la web de <Titular />. Es informativa: cuenta qué hacemos y te lleva a
            escribirnos. Desde la web no se compra ni se paga nada.
          </p>
        </Bloque>

        <Bloque titulo="Cómo se contrata">
          <ul>
            <li>Nos escribís por WhatsApp o por mail.</li>
            <li>Te hacemos unas preguntas y te mandamos una propuesta: qué hacemos, cuándo y cuánto sale.</li>
            <li>Si te sirve, firmás el presupuesto y abonás el 50% de anticipo para empezar.</li>
            <li>Con el 100% pago te entregamos todos los archivos editables, claves y accesos.</li>
          </ul>
          <p>
            Los precios se informan siempre en la propuesta, como precio final y en su moneda (pesos
            o dólares). Si hay impuestos, tasas, sellados u honorarios de terceros (por ejemplo, un
            escribano), los detallamos aparte antes de que aceptes.
          </p>
        </Bloque>

        <Bloque titulo="Si querés cancelar">
          <p>
            Si sos consumidor final y contrataste a distancia (por WhatsApp, mail o la web), tenés
            10 días corridos desde que aceptaste para arrepentirte, sin costo y sin dar
            explicaciones, como indica el artículo 34 de la Ley 24.240 de Defensa del Consumidor.
            Avisanos por el mismo medio por el que contrataste.
          </p>
          <p>
            Pasado ese plazo, si cancelás antes de que empecemos, te devolvemos el anticipo completo.
            Si el trabajo ya empezó, el anticipo cubre lo realizado hasta ese momento y te
            entregamos lo que esté hecho.
          </p>
        </Bloque>

        <Bloque titulo="Lo que no prometemos">
          <p>
            Trabajamos con dedicación y profesionales de la red, pero no garantizamos resultados que
            dependen de terceros: por ejemplo, la aprobación de un trámite (la decide el organismo
            público) o el alcance de una publicación en redes.
          </p>
          <p>
            La información de FNX Salud y FNX Consultoría es orientativa. No reemplaza la consulta
            con un médico ni el asesoramiento legal personalizado de un profesional matriculado.
          </p>
        </Bloque>

        <Bloque titulo="Contenidos e imágenes">
          <p>
            Los textos, imágenes, animaciones y la marca FNX son propiedad de FNX. Podés compartir
            los enlaces, pero no copiar ni usar el contenido para fines comerciales sin permiso.
          </p>
          <p>
            Los casos que mostramos son reales y se publican con permiso del cliente. Las cifras de
            ejemplo dicen «TU MARCA» y son ilustrativas, no resultados de FNX.
          </p>
        </Bloque>

        <Bloque titulo="Reclamos">
          <p>
            Si algo no salió como esperabas, escribinos primero: queremos resolverlo. También podés
            hacer tu reclamo ante Defensa del Consumidor:{" "}
            <a href={DEFENSA_CONSUMIDOR.url} target="_blank" rel="noopener noreferrer">
              {DEFENSA_CONSUMIDOR.texto}
              <span className="sr-only"> (abre en una pestaña nueva)</span>
            </a>
            .
          </p>
          <p>Estos términos se rigen por las leyes de la República Argentina.</p>
        </Bloque>
      </section>
    </div>
  );
}
