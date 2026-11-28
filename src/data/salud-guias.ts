/**
 * Guías de FNX Salud por búsqueda concreta (/salud/...). Una página por guía, armada con la
 * plantilla SaludGuiaPage. Datos verificados a noviembre de 2026: revisar cuando cambie la norma.
 * Al sumar una guía, agregá su URL a public/sitemap.xml (un test lo controla).
 */
import type { WhatsAppTopic } from "@/config/site";
import type { Pregunta } from "@/data/servicios";

export interface BloqueGuia {
  titulo: string;
  texto?: string;
  puntos?: readonly string[];
}

export interface GuiaSalud {
  slug: string;
  path: "/salud/reprocann-mendoza" | "/salud/reprocann-san-juan" | "/salud/renovar-reprocann";
  title: string;
  description: string;
  eyebrow: string;
  lead: string;
  accent: string;
  summary: string;
  topic: WhatsAppTopic;
  cta: string;
  bloques: readonly BloqueGuia[];
  pasos: readonly string[];
  faq: readonly Pregunta[];
  actualizado: string;
}

export const GUIAS_SALUD: readonly GuiaSalud[] = [
  {
    slug: "reprocann-mendoza",
    path: "/salud/reprocann-mendoza",
    title: "REPROCANN en Mendoza: registro nacional y REPRO-Mendoza | FNX Salud (+18)",
    description:
      "Cómo tramitar el cannabis medicinal en Mendoza: REPROCANN nacional o registro provincial REPRO-Mendoza (Ley 9617). Te acompañamos en todo el trámite. Solo +18.",
    eyebrow: "FNX Salud · +18 · Mendoza",
    lead: "Tu REPROCANN",
    accent: "en Mendoza.",
    summary:
      "En Mendoza tenés dos caminos para cultivar cannabis medicinal dentro de la ley: el REPROCANN nacional o el registro provincial REPRO-Mendoza. Te decimos cuál te conviene y te acompañamos en el que elijas.",
    topic: "reprocannMendoza",
    cta: "Quiero hacer mi trámite en Mendoza",
    bloques: [
      {
        titulo: "Dos registros, un mismo objetivo",
        puntos: [
          "REPROCANN: el registro nacional, hoy operado por la SEDRONAR dentro del Ministerio de Salud de la Nación.",
          "REPRO-Mendoza: el registro provincial creado por la Ley 9617 y reglamentado por la Resolución 151/2026, para pacientes, terceros cultivadores y asociaciones.",
        ],
      },
      {
        titulo: "Qué cambió en Mendoza en 2026",
        puntos: [
          "Ley 9617 y Decreto 1928/2025: el marco para toda la cadena del cannabis medicinal y el cáñamo en la provincia.",
          "Resolución 526/2026: registro provincial de médicos que indican cannabis.",
          "Las solicitudes provinciales se hacen de forma digital.",
          "REPROVET: el programa provincial de cannabis medicinal para animales, el primero del país.",
        ],
      },
      {
        titulo: "Cuál te conviene",
        texto:
          "Depende de tu caso: dónde vivís y cultivás, quién va a cultivar y si ya tenés un trámite iniciado. Lo vemos con vos antes de empezar, para que no hagas el trámite dos veces.",
      },
    ],
    pasos: [
      "Nos escribís y vemos tu caso.",
      "Elegimos juntos el registro y la modalidad de cultivo.",
      "Te conectamos con un médico habilitado.",
      "Revisamos la documentación antes de enviarla.",
      "Hacemos el seguimiento hasta que tengas tu credencial.",
    ],
    faq: [
      {
        question: "¿Si vivo en Mendoza tengo que hacer los dos registros?",
        answer:
          "No necesariamente. Según tu caso puede alcanzar con uno. Lo vemos juntos antes de empezar.",
      },
      {
        question: "¿El médico tiene que estar inscripto en la provincia?",
        answer:
          "Para el registro provincial, Mendoza creó un registro de médicos que indican cannabis (Resolución 526/2026). Te conectamos con profesionales habilitados.",
      },
      {
        question: "¿Me garantizan la aprobación?",
        answer:
          "No. La aprobación depende del organismo oficial. Nosotros te ayudamos a presentar todo completo y correcto.",
      },
    ],
    actualizado: "noviembre de 2026",
  },
  {
    slug: "reprocann-san-juan",
    path: "/salud/reprocann-san-juan",
    title: "REPROCANN en San Juan: cómo hacer el trámite | FNX Salud (+18)",
    description:
      "Cómo tramitar el REPROCANN si vivís en San Juan: requisitos, pasos y qué cambió en 2026. Te acompañamos desde la consulta médica hasta tu credencial. Solo +18.",
    eyebrow: "FNX Salud · +18 · San Juan",
    lead: "Tu REPROCANN",
    accent: "en San Juan.",
    summary:
      "San Juan adhiere a la ley nacional de cannabis medicinal, así que el trámite se hace por el REPROCANN. Te guiamos desde la consulta médica hasta que tenés tu credencial.",
    topic: "reprocannSanJuan",
    cta: "Quiero hacer mi REPROCANN en San Juan",
    bloques: [
      {
        titulo: "El marco en San Juan",
        puntos: [
          "Ley provincial 1926-Q: San Juan adhiere a la Ley nacional 27.350.",
          "Decreto 9/2019: el Ministerio de Salud Pública provincial es la autoridad de aplicación.",
          "Los pacientes hacen el trámite por el REPROCANN nacional.",
        ],
      },
      {
        titulo: "Qué cambió en 2026",
        puntos: [
          "El REPROCANN pasó a ser operado por la SEDRONAR, dentro del Ministerio de Salud de la Nación.",
          "Rigen los requisitos de la Resolución 1780/2025: el certificado dura 3 años si cultivás vos y 1 año si es a través de una ONG.",
          "Los casos simples con documentación completa pueden salir más rápido; el resto pasa por revisión manual.",
        ],
      },
      {
        titulo: "Qué necesitás",
        puntos: [
          "Indicación de un médico con matrícula vigente e inscripto en el REFEPS.",
          "Tu cuenta validada en Mi Argentina.",
          "Elegir la modalidad: cultivás vos, un cultivador solidario o una ONG inscripta.",
        ],
      },
    ],
    pasos: [
      "Nos escribís y vemos tu caso.",
      "Te conectamos con un médico habilitado.",
      "Te guiamos con Mi Argentina y la solicitud.",
      "Revisamos la documentación antes de enviarla.",
      "Hacemos el seguimiento hasta que tengas tu credencial.",
    ],
    faq: [
      {
        question: "¿San Juan tiene un registro propio como Mendoza?",
        answer:
          "Hoy los pacientes de San Juan hacen el trámite por el REPROCANN nacional, en el marco de la adhesión provincial a la Ley 27.350.",
      },
      {
        question: "¿Puedo hacer todo a distancia?",
        answer:
          "El trámite es digital, con Mi Argentina y el aplicativo del REPROCANN. Te acompañamos por WhatsApp en cada paso.",
      },
      {
        question: "¿Me garantizan la aprobación?",
        answer:
          "No. La aprobación depende del organismo oficial. Nosotros te ayudamos a presentar todo completo y correcto.",
      },
    ],
    actualizado: "noviembre de 2026",
  },
  {
    slug: "renovar-reprocann",
    path: "/salud/renovar-reprocann",
    title: "Cómo renovar el REPROCANN en 2026 | FNX Salud (+18)",
    description:
      "El REPROCANN no se renueva solo. Cuándo vence, qué pasa si se te vence y cómo volver a tramitarlo a tiempo. Te acompañamos en la renovación. Solo +18.",
    eyebrow: "FNX Salud · +18 · Renovación",
    lead: "Renová tu REPROCANN",
    accent: "a tiempo.",
    summary:
      "El certificado del REPROCANN tiene fecha de vencimiento y no se renueva solo: al vencer, hay que volver a tramitarlo. Te avisamos antes y te acompañamos para que no te quedes sin autorización.",
    topic: "renovacion",
    cta: "Quiero renovar mi REPROCANN",
    bloques: [
      {
        titulo: "Cuánto dura",
        puntos: [
          "3 años desde la emisión si cultivás vos.",
          "1 año si cultivás a través de una ONG.",
          "La fecha exacta figura en tu credencial, que podés ver en la app Mi Argentina.",
        ],
      },
      {
        titulo: "Qué pasa si se vence",
        texto:
          "Con el certificado vencido no tenés una autorización vigente, aunque hayas iniciado un trámite nuevo. Por eso conviene empezar la renovación antes de la fecha de vencimiento.",
      },
      {
        titulo: "Qué hay que hacer",
        puntos: [
          "Una nueva indicación médica de un profesional habilitado.",
          "Un nuevo trámite en el REPROCANN, con la documentación actualizada.",
          "Revisar si cambió algo: domicilio, modalidad de cultivo o cultivador.",
        ],
      },
    ],
    pasos: [
      "Nos pasás la fecha de vencimiento de tu credencial.",
      "Te avisamos con tiempo cuándo empezar.",
      "Te conectamos con un médico habilitado.",
      "Revisamos la documentación antes de enviarla.",
      "Seguimos el trámite hasta que tengas la credencial nueva.",
    ],
    faq: [
      {
        question: "¿Con cuánta anticipación conviene empezar?",
        answer:
          "Lo antes posible antes del vencimiento, porque los tiempos de evaluación varían. Te ayudamos a planificarlo según tu fecha.",
      },
      {
        question: "¿Puedo cambiar la modalidad de cultivo al renovar?",
        answer:
          "Sí, el nuevo trámite es el momento para revisar la modalidad y los datos. Lo vemos juntos.",
      },
      {
        question: "¿Me garantizan la aprobación?",
        answer:
          "No. La aprobación depende del organismo oficial. Nosotros te ayudamos a presentar todo completo y correcto.",
      },
    ],
    actualizado: "noviembre de 2026",
  },
];
