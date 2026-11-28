import type { WhatsAppTopic } from "@/config/site";

/**
 * Las seis soluciones de FNX Consultoría (desarrollo empresarial).
 * Datos planos: para sumar o cambiar una solución no hace falta tocar la interfaz.
 * Acá solo va lo que se publica. Importes, tramos de pago y criterios internos NO van en este archivo
 * (el repositorio es público): viven en Notion.
 */
export interface Solucion {
  id: "diagnostic" | "start" | "project" | "growth" | "plan360" | "partnerships";
  n: string;
  nombre: string;
  /** Etapa del cliente a la que responde. */
  etapa: string;
  /** Frase corta en voseo. */
  frase: string;
  para: string;
  incluye: string;
  entregables: string;
  /** Plazo orientativo. */
  plazo: string;
  alcance: string;
  /** Si la solución suma servicios de FNX Estudio. */
  estudio?: boolean;
  whatsapp: WhatsAppTopic;
}

export const SOLUCIONES: Solucion[] = [
  {
    id: "diagnostic",
    n: "01",
    nombre: "FNX Diagnostic",
    etapa: "Diagnóstico",
    frase: "Entendé el problema y definí prioridades.",
    para: "Empresas en funcionamiento y emprendedores con una idea definida.",
    incluye:
      "Reunión de relevamiento, análisis de situación, riesgos, oportunidades y prioridades.",
    entregables: "Informe ejecutivo, plan de acción priorizado y reunión de devolución.",
    plazo: "1 a 2 semanas",
    alcance: "No incluye implementación ni auditorías certificadas.",
    whatsapp: "diagnostic",
  },
  {
    id: "start",
    n: "02",
    nombre: "FNX Start",
    etapa: "Lanzamiento",
    frase: "Creá y lanzá tu negocio.",
    para: "Emprendedores e inversores que quieren estructurar o lanzar un negocio.",
    incluye:
      "Modelo de negocio, prefactibilidad, presupuesto inicial, estrategia de marca, canales y coordinación de especialistas.",
    entregables:
      "Plan de lanzamiento, hoja de ruta, presupuesto base y propuesta creativa según el alcance.",
    plazo: "4 a 8 semanas",
    alcance:
      "El diseño, las campañas, los trámites y los estudios específicos se definen en la propuesta.",
    estudio: true,
    whatsapp: "start",
  },
  {
    id: "project",
    n: "03",
    nombre: "FNX Project",
    etapa: "Implementación",
    frase: "Planificá y coordiná la ejecución de tu proyecto.",
    para: "Empresas que necesitan ejecutar una inversión, una ampliación o un proyecto productivo.",
    incluye:
      "Planificación, cronograma, coordinación de proveedores, seguimiento de costos y avances.",
    entregables: "Plan de ejecución, tablero de hitos, informes y reuniones de seguimiento.",
    plazo: "Según la dimensión y las etapas del proyecto",
    alcance: "No incluye la ejecución material de obras ni firmas técnicas.",
    whatsapp: "project",
  },
  {
    id: "growth",
    n: "04",
    nombre: "FNX Growth",
    etapa: "Expansión",
    frase: "Conseguí clientes y abrí mercados.",
    para: "Empresas que buscan más clientes, canales o presencia en nuevos mercados.",
    incluye:
      "Diagnóstico comercial, propuesta de valor, prospección B2B, alianzas y coordinación con marketing.",
    entregables: "Plan comercial, registro de oportunidades, indicadores y reporte de avance.",
    plazo: "Ciclo inicial sugerido de 3 meses, según objetivos y alcance",
    alcance: "Las campañas y las piezas creativas se definen según la necesidad de cada cliente.",
    estudio: true,
    whatsapp: "growth",
  },
  {
    id: "plan360",
    n: "05",
    nombre: "FNX 360",
    etapa: "Acompañamiento",
    frase: "Un equipo externo que acompaña tu gestión.",
    para: "Pymes y organizaciones que necesitan un equipo externo de dirección y acompañamiento.",
    incluye:
      "Estrategia, seguimiento operativo, desarrollo comercial, coordinación de marketing y de especialistas.",
    entregables:
      "Plan de trabajo, reuniones de gestión, tablero de indicadores e informe ejecutivo.",
    plazo: "Revisión periódica de prioridades y resultados",
    alcance: "No sustituye a los órganos de dirección ni a profesionales matriculados.",
    whatsapp: "plan360",
  },
  {
    id: "partnerships",
    n: "06",
    nombre: "FNX Partnerships",
    etapa: "Alianzas",
    frase: "Desarrollemos negocios junto a aliados estratégicos.",
    para: "Empresas, emprendedores, inversores y organizaciones con un proyecto con potencial.",
    incluye:
      "Nuevos negocios, alianzas empresariales, expansión y nuevos mercados, y proyectos conjuntos.",
    entregables: "Una hoja de ruta con responsabilidades y objetivos compartidos.",
    plazo: "Según el proyecto",
    alcance:
      "Evaluamos oportunidades de colaboración y diseñamos propuestas a medida, sujetas a una evaluación previa: evaluar, diseñar, validar e implementar.",
    whatsapp: "partnerships",
  },
];
