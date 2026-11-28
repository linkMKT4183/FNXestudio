/**
 * Notas propias de FNX Estudio (/notas). Distintas de /noticias, que son noticias con fuentes externas.
 * Para sumar una nota, agregá un objeto al principio del array.
 */
import { IMG } from "@/data/imagenes";

export const NOTAS = [
  {
    slug: "como-registrar-tu-marca-en-el-inpi",
    title: "Cómo registrar tu marca en el INPI paso a paso (2026)",
    description:
      "Guía 2026 para registrar tu marca en el INPI: búsqueda de antecedentes, clases, solicitud online, oposiciones y vigencia. Qué cambió desde marzo de 2026.",
    date: "2026-11-27",
    readingMinutes: 5,
    ctaTopic: "registro",
    related: ["registro", "identidad"],
    sections: [
      {
        h2: "Qué cambió en 2026",
        paragraphs: [
          "Desde el 1 de marzo de 2026 rige un procedimiento nuevo en el INPI: el examen de oficio se concentra en las prohibiciones absolutas y el control de marcas parecidas queda en manos de los titulares, a través de las oposiciones.",
          "En la práctica, el trámite puede salir más rápido, pero si nadie vigila tu marca, otra muy parecida puede registrarse sin que el INPI la frene.",
        ],
      },
      {
        h2: "1. Buscá antecedentes antes de empezar",
        paragraphs: [
          "Antes de pagar nada, revisá si ya existe una marca igual o parecida en tu rubro. Es el paso que más problemas evita: cambiar de nombre después de invertir en diseño y publicidad sale caro.",
        ],
      },
      {
        h2: "2. Elegí las clases correctas",
        paragraphs: [
          "Las marcas se registran por clases de productos o servicios. Una clase mal elegida puede dejar tu actividad real sin proteger, así que conviene definirlas pensando en lo que vendés hoy y en lo que vas a vender.",
        ],
      },
      {
        h2: "3. Presentá la solicitud online",
        paragraphs: [
          "El trámite es 100% online en el portal de trámites del INPI y necesitás Clave Fiscal nivel 2 o superior de ARCA. El arancel se actualiza seguido, así que consultá el valor vigente antes de empezar.",
        ],
      },
      {
        h2: "4. Estate atento a las oposiciones",
        paragraphs: [
          "La solicitud se publica en el Boletín de Marcas y terceros pueden oponerse dentro de los 30 días. Si hay oposición, el trámite se detiene hasta resolverla. Y al revés: si alguien pide una marca parecida a la tuya, solo vos podés frenarla oponiéndote a tiempo.",
        ],
      },
      {
        h2: "5. Cuánto tarda y cuánto dura",
        paragraphs: [
          "Según el INPI, el registro lleva unos 24 meses, o 12 si la solicitud pasa por el estudio simplificado; con oposiciones puede demorar más.",
          "Una vez concedida, la marca te protege 10 años en todo el país y se renueva por períodos iguales. A los 5 años hay que presentar la declaración jurada de uso.",
        ],
      },
      {
        h2: "¿Lo hacemos juntos?",
        paragraphs: [
          "En FNX Estudio te acompañamos con Aro · Estudio Jurídico: buscamos antecedentes, definimos las clases y presentamos la solicitud. Y si todavía no tenés marca, la diseñamos pensando en que se pueda registrar.",
        ],
        link: "/estudio/registro-de-marca",
      },
    ],
    image: IMG.caminoLuz,
  },
  {
    slug: "como-elegir-agencia-de-branding-en-mendoza",
    title: "Cómo elegir una agencia de branding en Mendoza y San Juan: 7 preguntas",
    description:
      "Antes de contratar una agencia de branding o marketing en Mendoza o San Juan, hacé estas 7 preguntas: proceso, entregables, archivos, plazos, precio y registro de marca.",
    date: "2026-11-27",
    readingMinutes: 4,
    ctaTopic: "marca",
    related: ["identidad", "estrategia", "redes"],
    sections: [
      {
        h2: "Elegir bien te ahorra empezar dos veces",
        paragraphs: [
          "Una marca mal hecha no solo se ve mal: obliga a rehacer logo, redes y cartelería. Estas 7 preguntas te ayudan a comparar agencias con criterio, no solo por precio.",
        ],
      },
      {
        h2: "1. ¿Cómo es su proceso?",
        paragraphs: [
          "Una agencia seria te explica qué pasa en cada etapa: primero entender tu negocio y tu público, después diseñar, después aplicar. Si arrancan directo por el logo, desconfiá.",
        ],
      },
      {
        h2: "2. ¿Qué te entregan exactamente?",
        paragraphs: [
          "Pedí la lista concreta: logo y versiones, colores, tipografías, manual de uso y aplicaciones. «Una identidad» no es una lista.",
        ],
      },
      {
        h2: "3. ¿Los archivos editables son tuyos?",
        paragraphs: [
          "Al terminar y pagar, los archivos originales tienen que quedarte a vos. Si no, cada cambio futuro depende de la agencia.",
        ],
      },
      {
        h2: "4. ¿Cuánto tarda y cuándo se paga?",
        paragraphs: [
          "Plazos claros y pagos por etapas (por ejemplo, una parte al empezar y el resto al entregar) protegen a las dos partes.",
        ],
      },
      {
        h2: "5. ¿Te dan el presupuesto antes de empezar?",
        paragraphs: [
          "Qué incluye, cuánto sale y qué no está incluido, por escrito. Sin sorpresas a mitad de camino.",
        ],
      },
      {
        h2: "6. ¿Piensan en registrar tu marca?",
        paragraphs: [
          "Un nombre o un logo que no se pueden registrar son una inversión en riesgo. Preguntá si chequean antecedentes antes de diseñar.",
        ],
      },
      {
        h2: "7. ¿Te acompañan después?",
        paragraphs: [
          "La marca se juega en el día a día: redes, contenido, tienda. Preguntá si pueden seguir con vos o si te dejan solo con un manual.",
        ],
      },
      {
        h2: "Hacé la prueba con nosotros",
        paragraphs: [
          "En FNX Estudio trabajamos desde 2019, con sedes en San Juan y Mendoza y trabajo en todo el país. La primera charla de 15 minutos es sin costo: hacenos estas 7 preguntas.",
        ],
        link: "/estudio",
      },
    ],
    image: IMG.rey,
  },
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
