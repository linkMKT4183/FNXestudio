/**
 * Servicios de FNX Estudio. Cada uno tiene su página en /estudio/<slug>.
 * Para sumar un servicio, agregá un objeto (y su ruta en src/routes/estudio_.<slug>.tsx).
 */
import { IMG, type FnxImg } from "@/data/imagenes";
import type { WhatsAppTopic } from "@/config/site";

export interface Pregunta {
  question: string;
  answer: string;
  link?: "/estudio/registro-de-marca" | "/tu-marca";
}

export const SERVICIOS = [
  {
    slug: "identidad-de-marca",
    topic: "identidad",
    name: "Identidad de marca",
    title: "Diseño de identidad de marca en Mendoza y San Juan | FNX Estudio",
    description:
      "Logo, nombre, colores, tipografías y manual de uso para que te reconozcan de lejos. Sedes en San Juan y Mendoza y trabajo en todo el país.",
    lead: "Identidad de marca que se",
    accent: "reconoce de lejos.",
    summary:
      "Creamos o renovamos tu marca para que se vea igual de bien en el local, en las redes, en el packaging y en la web. Una sola marca, en todos lados.",
    includes: [
      "Nombre o revisión del nombre",
      "Logo y sus versiones",
      "Paleta de colores",
      "Tipografías",
      "Manual de uso",
      "Aplicaciones (redes, papelería, packaging, cartelería)",
    ],
    faq: [
      {
        question: "¿Qué recibo al terminar?",
        answer: "Todos los archivos editables y el manual de uso. Con el 100% pago, son tuyos.",
      },
      {
        question: "¿Pueden renovar una marca que ya tengo?",
        answer:
          "Sí. Partimos de lo que funciona y ordenamos lo que no, para que no pierdas lo que tu público ya reconoce.",
      },
      {
        question: "¿Conviene registrar la marca?",
        answer:
          "Sí, y mejor antes de invertir fuerte en diseño y publicidad. Lo hacemos junto a Aro · Estudio Jurídico.",
        link: "/estudio/registro-de-marca",
      },
    ],
    short: "Que te reconozcan de lejos.",
    detail:
      "Nombre, logo, colores, tipografías y manual de uso. La misma marca en el local, las redes, el packaging y la web.",
    path: "/estudio/identidad-de-marca",
    image: IMG.branding,
  },
  {
    slug: "produccion-audiovisual",
    topic: "audiovisual",
    name: "Producción audiovisual",
    title: "Producción de foto y video para marcas en Mendoza y San Juan | FNX Estudio",
    description:
      "Foto y video con idea para redes, campañas y web: planificamos, filmamos y editamos. Sedes en San Juan y Mendoza y trabajo en todo el país.",
    lead: "Foto y video",
    accent: "con idea.",
    summary:
      "Piezas para redes, campañas y web pensadas antes de filmar. Planificamos, filmamos y editamos para que cada video tenga un motivo.",
    includes: [
      "Idea y guion",
      "Fotografía de producto y de marca",
      "Video para redes (reels)",
      "Edición y animación",
      "Piezas para campañas y web",
    ],
    faq: [
      {
        question: "¿Hacen reels para Instagram?",
        answer:
          "Sí. Los planificamos según tu objetivo y los editamos en formato vertical, listos para publicar.",
      },
      {
        question: "¿Qué necesito tener listo?",
        answer:
          "Solo contarnos qué querés lograr. La idea, el guion y la planificación los armamos con vos.",
      },
    ],
    short: "Foto y video con idea.",
    detail: "Piezas para redes, campañas y web. Planificadas, filmadas y editadas por nosotros.",
    path: "/estudio/produccion-audiovisual",
    image: IMG.audiovisual,
  },
  {
    slug: "tienda-online",
    topic: "tienda",
    name: "Tienda online",
    title: "Tienda online para tu negocio en Mendoza y San Juan | FNX Estudio",
    description:
      "Armamos tu tienda online, cargamos tus productos y la dejamos lista para cobrar. Sedes en San Juan y Mendoza y trabajo en todo el país.",
    lead: "Tu local, abierto",
    accent: "las 24 horas.",
    summary:
      "Armamos tu tienda online, cargamos tus productos y la dejamos lista para cobrar y vender, con tu marca en cada detalle.",
    includes: [
      "Diseño de la tienda con tu marca",
      "Carga de productos",
      "Medios de pago y envío",
      "Conexión con WhatsApp e Instagram",
      "Capacitación para que la administres",
    ],
    faq: [
      {
        question: "¿La tienda queda a mi nombre?",
        answer: "Sí. La cuenta y los accesos son tuyos.",
      },
      {
        question: "¿Me enseñan a usarla?",
        answer: "Sí. Al entregarla te mostramos cómo cargar productos y gestionar pedidos.",
      },
    ],
    short: "Tu local, abierto las 24 horas.",
    detail: "Armamos tu tienda, cargamos tus productos y la dejamos lista para cobrar.",
    path: "/estudio/tienda-online",
    image: IMG.tienda,
  },
  {
    slug: "redes-y-contenido",
    topic: "redes",
    name: "Redes y contenido",
    title: "Gestión de redes sociales y contenido en Mendoza y San Juan | FNX Estudio",
    description:
      "Calendario, diseño y textos para tus redes con constancia. Vos aprobás, nosotros publicamos. Sedes en San Juan y Mendoza y trabajo en todo el país.",
    lead: "Redes con constancia,",
    accent: "sin perder tiempo.",
    summary:
      "Planificamos, diseñamos y escribimos el contenido de tus redes. Vos aprobás, nosotros publicamos. Cada posteo con un objetivo.",
    includes: [
      "Estrategia y calendario mensual",
      "Diseño de posteos, carruseles y reels",
      "Textos y llamados a la acción",
      "Publicación programada",
      "Informe de resultados",
    ],
    faq: [
      {
        question: "¿Cuántas publicaciones por semana?",
        answer: "Depende de tu objetivo y tu presupuesto. Lo definimos juntos en la propuesta.",
      },
      {
        question: "¿Tengo que aprobar cada publicación?",
        answer: "Sí. Nada se publica sin tu OK.",
      },
    ],
    short: "Constancia sin perder tiempo.",
    detail: "Calendario, diseño y textos. Vos aprobás, nosotros publicamos.",
    path: "/estudio/redes-y-contenido",
    image: IMG.redes,
  },
  {
    slug: "estrategia",
    topic: "estrategia",
    name: "Estrategia",
    title: "Estrategia de marketing para pymes en Mendoza y San Juan | FNX Estudio",
    description:
      "Ordenamos objetivo, público y mensaje antes de que inviertas en publicidad. Sedes en San Juan y Mendoza y trabajo en todo el país.",
    lead: "Primero el plan,",
    accent: "después la pauta.",
    summary:
      "Antes de invertir un peso en publicidad, ordenamos qué querés lograr, a quién le hablás y qué le vas a decir.",
    includes: [
      "Diagnóstico de tu marca",
      "Objetivo y público",
      "Mensaje y propuesta de valor",
      "Plan de canales (redes, web y WhatsApp)",
      "Plan de pauta",
    ],
    faq: [
      {
        question: "¿Por dónde empiezo si no sé qué necesito?",
        answer:
          "Por los 15 minutos sin costo: miramos tu marca juntos y te decimos qué cambiaríamos primero.",
        link: "/tu-marca",
      },
      {
        question: "¿La estrategia incluye publicidad paga?",
        answer: "Incluye el plan de pauta. Si querés, después también la gestionamos.",
      },
    ],
    short: "Saber a quién le hablás.",
    detail: "Ordenamos objetivo, público y mensaje antes de que inviertas un peso en publicidad.",
    path: "/estudio/estrategia",
    image: IMG.estrategia,
  },
  {
    slug: "registro-de-marca",
    topic: "registro",
    name: "Registro de marca",
    title: "Registro de marca en el INPI · Mendoza y San Juan | FNX Estudio + Aro",
    description:
      "Protegé tu marca antes de invertir en ella. Te acompañamos junto a Aro · Estudio Jurídico en el registro ante el INPI. Sedes en San Juan y Mendoza y trabajo en todo el país.",
    lead: "Tu logo no es tu marca hasta que la",
    accent: "registrás.",
    summary:
      "Diseñar una marca y no registrarla es construir sobre un terreno que no es tuyo. Junto a Aro · Estudio Jurídico, partner jurídico de FNX, te acompañamos para que tu marca quede a tu nombre.",
    includes: [
      "Revisión de que tu marca esté disponible",
      "Elección de las clases correctas",
      "Presentación ante el INPI",
      "Seguimiento del trámite",
      "Diseño o ajuste de la marca si hace falta",
    ],
    faq: [
      {
        question: "¿Dónde se registra una marca en Argentina?",
        answer: "En el INPI, el Instituto Nacional de la Propiedad Industrial.",
      },
      {
        question: "¿Cuándo conviene registrarla?",
        answer:
          "Antes de invertir fuerte en diseño, cartelería o publicidad. Así evitás tener que cambiarla después.",
      },
      {
        question: "¿Quién hace el trámite?",
        answer:
          "Lo coordinamos desde FNX junto a Aro · Estudio Jurídico, nuestro partner jurídico.",
      },
    ],
    short: "Que tu marca sea tuya.",
    detail: "Junto a Aro · Estudio Jurídico, te acompañamos a proteger tu marca ante el INPI.",
    path: "/estudio/registro-de-marca",
    image: IMG.checklist,
  },
] as const satisfies readonly {
  slug: string;
  topic: WhatsAppTopic;
  name: string;
  title: string;
  description: string;
  lead: string;
  accent: string;
  summary: string;
  includes: readonly string[];
  faq: readonly Pregunta[];
  image: FnxImg;
  short: string;
  detail: string;
  path: string;
}[];

export type Servicio = (typeof SERVICIOS)[number];
