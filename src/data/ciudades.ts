/** Páginas por ciudad de FNX Estudio (/mendoza y /san-juan). */
const FAQ_COMUN = (name: string) =>
  [
    {
      question: `¿Trabajan solo con negocios de ${name}?`,
      answer: "No. Tenemos sedes en San Juan y Mendoza y trabajamos en todo el país.",
    },
    {
      question: "¿Cómo empezamos?",
      answer:
        "Con un mensaje por WhatsApp. Te hacemos 3 preguntas y te pasamos una propuesta clara: qué hacemos, cuándo y cuánto sale.",
    },
    {
      question: "¿La primera charla tiene costo?",
      answer: "No. Los primeros 15 minutos son sin costo y sin compromiso.",
    },
  ] as const;

export const CIUDADES = [
  {
    slug: "mendoza",
    path: "/mendoza",
    name: "Mendoza",
    topic: "mendoza",
    title: "Agencia de branding y marketing en Mendoza | FNX Estudio",
    description:
      "Identidad de marca, redes, contenido, tienda online, estrategia y registro de marca para pymes y emprendedores de Mendoza. Primera charla de 15 minutos sin costo.",
    eyebrow: "FNX Estudio · Mendoza",
    lead: "Agencia de branding y marketing en",
    accent: "Mendoza.",
    summary:
      "Ayudamos a pymes y emprendedores mendocinos a que su marca se vea, se entienda y se elija. Sedes en San Juan y Mendoza y trabajo en todo el país.",
    departments: ["Capital", "Godoy Cruz", "Guaymallén", "Las Heras", "Luján de Cuyo", "Maipú"],
    faq: FAQ_COMUN("Mendoza"),
  },
  {
    slug: "san-juan",
    path: "/san-juan",
    name: "San Juan",
    topic: "sanjuan",
    title: "Agencia de branding y marketing en San Juan | FNX Estudio",
    description:
      "Identidad de marca, redes, contenido, tienda online, estrategia y registro de marca para pymes y emprendedores de San Juan. Primera charla de 15 minutos sin costo.",
    eyebrow: "FNX Estudio · San Juan",
    lead: "Agencia de branding y marketing en",
    accent: "San Juan.",
    summary:
      "Ayudamos a pymes y emprendedores sanjuaninos a que su marca se vea, se entienda y se elija. Sedes en San Juan y Mendoza y trabajo en todo el país.",
    departments: ["Capital", "Rivadavia", "Santa Lucía", "Chimbas", "Rawson", "Pocito"],
    faq: FAQ_COMUN("San Juan"),
  },
] as const;

export type Ciudad = (typeof CIUDADES)[number];
