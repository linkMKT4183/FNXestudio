/**
 * Notas propias de FNX Estudio (/notas). Distintas de /noticias, que son noticias con fuentes externas.
 * Para sumar una nota, agregá un objeto al principio del array.
 */
import { IMG } from "@/data/imagenes";

export const NOTAS = [
  {
    slug: "tu-marca-pasa-desapercibida-5-senales",
    title: "Tu marca pasa desapercibida: 5 señales para darte cuenta",
    description:
      "Identidad, imagen, tienda, constancia y estrategia: las 5 señales de una marca que la gente ve pero no elige. Guía para pymes de Mendoza y San Juan.",
    date: "2026-11-27",
    readingMinutes: 4,
    ctaTopic: "marca",
    related: ["identidad", "redes", "estrategia"],
    sections: [
      {
        h2: "No es que tu marca sea mala. Es invisible.",
        paragraphs: [
          "Pasa mucho: buen producto, buen servicio, y aun así la gente pasa de largo. Casi nunca es el precio. Casi siempre es que tu marca no se ve, no se entiende o no transmite confianza.",
        ],
      },
      {
        h2: "1. Identidad: no te reconocen de lejos",
        paragraphs: [
          "Si tu logo, tus colores y tu tipografía cambian según dónde te vean, el público no te recuerda. Una marca se reconoce cuando se repite igual en todos lados.",
        ],
      },
      {
        h2: "2. Imagen: tus fotos no te representan",
        paragraphs: [
          "Fotos oscuras, borrosas o sacadas de internet le dicen al cliente que no te tomás en serio tu negocio, aunque sí lo hagas.",
        ],
      },
      {
        h2: "3. Tienda: comprarte es difícil",
        paragraphs: [
          "Si para comprarte hay que preguntar precios por mensaje y esperar, muchos se van antes de preguntar.",
        ],
      },
      {
        h2: "4. Constancia: publicás cuando podés",
        paragraphs: [
          "Las redes premian la constancia. Publicar mucho una semana y nada el mes siguiente hace que el algoritmo y la gente se olviden de vos.",
        ],
      },
      {
        h2: "5. Estrategia: no sabés a quién le hablás",
        paragraphs: [
          "Sin un objetivo y un público claros, cada publicación es una apuesta. Primero el plan, después la pauta.",
        ],
      },
      {
        h2: "¿Cuántas te pasan?",
        paragraphs: [
          "Hacé la prueba de 1 minuto y sabé por dónde empezar. O escribinos y lo vemos juntos en 15 minutos sin costo.",
        ],
        link: "/tu-marca",
      },
    ],
    image: IMG.manoFigura,
  },
  {
    slug: "registrar-tu-marca-antes-de-invertir",
    title: "Por qué registrar tu marca antes de invertir en ella",
    description:
      "Tu logo no es tu marca hasta que la registrás. Qué es el registro en el INPI y por qué conviene hacerlo antes de gastar en diseño y publicidad.",
    date: "2026-11-27",
    readingMinutes: 3,
    ctaTopic: "registro",
    related: ["registro", "identidad"],
    sections: [
      {
        h2: "Diseñar no es lo mismo que proteger",
        paragraphs: [
          "Podés tener el mejor logo de tu rubro y, aun así, no ser dueño de tu marca. En Argentina, la marca se protege registrándola en el INPI, el Instituto Nacional de la Propiedad Industrial.",
        ],
      },
      {
        h2: "El riesgo de esperar",
        paragraphs: [
          "Si otra persona registra antes un nombre igual o parecido en tu rubro, te puede obligar a cambiarlo. Y con el cambio se pierde lo invertido en cartelería, packaging, redes y publicidad.",
        ],
      },
      {
        h2: "Cuándo conviene hacerlo",
        paragraphs: [
          "Lo ideal es revisar que tu marca esté disponible antes de diseñarla, y registrarla antes de invertir fuerte en hacerla conocida.",
        ],
      },
      {
        h2: "Branding y registro, en un solo lugar",
        paragraphs: [
          "En FNX diseñamos tu marca y, junto a Aro · Estudio Jurídico, nuestro partner jurídico, te acompañamos para registrarla. Sin coordinar a dos equipos.",
        ],
      },
    ],
    image: IMG.checklist,
  },
] as const;

export type Nota = (typeof NOTAS)[number];
