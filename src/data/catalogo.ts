/**
 * Catálogo de FNX Consultoría: 8 líneas agrupadas en 4 frentes.
 * Solo lo público. Los importes y criterios internos no van en el repositorio.
 */
export interface Linea {
  n: string;
  titulo: string;
  para: string;
  items: string[];
}

export interface Frente {
  id: string;
  titulo: string;
  lineas: Linea[];
}

export const FRENTES: Frente[] = [
  {
    id: "estrategia",
    titulo: "Estrategia y organización",
    lineas: [
      {
        n: "01",
        titulo: "Consultoría empresarial",
        para: "Emprendedores, pymes y organizaciones",
        items: [
          "Diagnóstico empresarial, costos y procesos.",
          "Modelos de negocio y planes empresariales.",
          "Reorganización y acompañamiento estratégico.",
        ],
      },
      {
        n: "08",
        titulo: "Capacitación y mentoría",
        para: "Emprendedores, empresas e instituciones",
        items: [
          "Consultas profesionales y mentoría.",
          "Talleres y formación de equipos.",
          "Manuales y acompañamiento de emprendedores.",
        ],
      },
    ],
  },
  {
    id: "proyectos",
    titulo: "Proyectos e inversión",
    lineas: [
      {
        n: "02",
        titulo: "Dirección y gestión de proyectos",
        para: "Empresas, inversores y desarrolladores",
        items: [
          "Prefactibilidad, presupuestos y cronogramas.",
          "Evaluación y coordinación de proveedores y equipos.",
          "Dirección, supervisión y puesta en marcha.",
        ],
      },
      {
        n: "05",
        titulo: "Proyectos de inversión",
        para: "Inversores, empresarios y emprendedores",
        items: [
          "Evaluación preliminar y presupuesto de inversión.",
          "Proyecciones económicas y presentaciones para inversores.",
          "Coordinación y seguimiento de la ejecución.",
        ],
      },
    ],
  },
  {
    id: "mercados",
    titulo: "Mercados y alianzas",
    lineas: [
      {
        n: "04",
        titulo: "Desarrollo y representación comercial",
        para: "Empresas y fabricantes nacionales e internacionales",
        items: [
          "Investigación de mercados, canales y proveedores.",
          "Representación de marcas y captación de clientes B2B.",
          "Negociación y alianzas estratégicas.",
        ],
      },
      {
        n: "06",
        titulo: "Relaciones empresariales e institucionales",
        para: "Empresas, asociaciones e instituciones",
        items: [
          "Vinculación público-privada y convenios de colaboración.",
          "Representación institucional y coordinación de equipos.",
          "Acompañamiento administrativo junto a especialistas regulatorios.",
        ],
      },
    ],
  },
  {
    id: "sectores",
    titulo: "Sectores",
    lineas: [
      {
        n: "03",
        titulo: "Agrícola y agroindustrial",
        para: "Productores, fincas y empresas agrícolas",
        items: [
          "Evaluación de unidades productivas.",
          "Planificación, infraestructura, tecnificación y riego.",
          "Equipamiento y gestión eficiente de recursos.",
        ],
      },
      {
        n: "07",
        titulo: "Cannabis y cáñamo",
        para: "Empresas y organizaciones, dentro del marco legal aplicable",
        items: [
          "Evaluación de proyectos y planificación empresarial.",
          "Coordinación regulatoria, gestión documental y revisión de cumplimiento.",
          "Gestión organizacional, trazabilidad y coordinación de investigación y desarrollo.",
        ],
      },
    ],
  },
];
