/**
 * Noticias de FNX Noticias. Para sumar una nueva, agregá un objeto al principio del array.
 * category: "Marketing" | "Negocios" | "Cannabis medicinal"
 */
export type NewsCategory = "Marketing" | "Negocios" | "Cannabis medicinal";

export interface NewsItem {
  id: string;
  category: NewsCategory;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
}

export const NEWS_CATEGORIES: NewsCategory[] = ["Marketing", "Negocios", "Cannabis medicinal"];

const AGENDA_CANNABIS_URL =
  "https://agendacannabis.com.ar/2026/10/13/cannabis-en-argentina-industria-en-expansion-ley-penal-congelada/";

export const NOTICIAS: NewsItem[] = [
  {
    id: "instagram-90-minutos",
    category: "Marketing",
    title: "Instagram prueba videos de hasta 90 minutos",
    summary: "Se llama Features, es horizontal y por ahora tiene acceso limitado.",
    source: "Publimetro",
    date: "29/10/2026",
    url: "https://www.publimetro.co/tecnologia/2026/10/29/instagram-prepara-un-cambio-que-podria-transformar-la-app-videos-de-90-minutos-nuevas-formas-de-monetizacion-y-mas-ia/",
  },
  {
    id: "aviso-personalizado",
    category: "Marketing",
    title: "La publicidad entra en la era del aviso personalizado",
    summary: "Con IA, una campaña puede tener cientos de versiones según quién la vea.",
    source: "La Nación",
    date: "31/10/2026",
    url: "https://www.lanacion.com.ar/economia/negocios/la-publicidad-entra-en-la-era-del-aviso-personalizado-nid31102026/",
  },
  {
    id: "pymes-recesion",
    category: "Negocios",
    title: "Pymes: advierten recesión en el último trimestre",
    summary:
      "El 80,9% de los gerentes comerciales prevé estancamiento o contracción, según Industriales Pymes Argentinos.",
    source: "Noticias Argentinas",
    date: "01/10/2026",
    url: "https://noticiasargentinas.com/economia/advierten-que-el-entramado-pyme-entra-al-ultimo-trimestre-en-recesion_a6abe5a7d8419983d4254f506",
  },
  {
    id: "endeavor-cuyo",
    category: "Negocios",
    title: "La Experiencia Endeavor Cuyo llegó a Mendoza",
    summary: "Mentorías en validación de negocio, financiamiento, IA y ventas.",
    source: "Descubre.vc",
    date: "06/10/2026",
    url: "https://www.descubre.vc/noticia/mendoza-recibe-la-experiencia-endeavor-cuyo-2026-para-potenciar-emprendedores-2026-10-06",
  },
  {
    id: "expo-cannabis-300-marcas",
    category: "Cannabis medicinal",
    title: "Expo Cannabis 2026: más de 300 marcas en La Rural",
    summary: "Del 23 al 25 de octubre, en Buenos Aires.",
    source: "MDZ",
    date: "26/10/2026",
    url: "https://www.mdzol.com/sociedad/2026/10/26/expo-cannabis-2026-la-rural-junto-mas-de-300-marcas-clubes-cannabicos-y-una-industria-en-alza-1990700.html",
  },
  {
    id: "conicet-muestras",
    category: "Cannabis medicinal",
    title: "El CONICET analizó más de 60 muestras en la Expo",
    summary: "Con el servicio de control de calidad de la unidad ENyS.",
    source: "ENyS-CONICET",
    date: "octubre 2026",
    url: "https://enys.conicet.gov.ar/expo-cannabis-2026/",
  },
  {
    id: "mercado-834-millones",
    category: "Cannabis medicinal",
    title: "Un mercado potencial de US$ 834 millones",
    summary:
      "Es una proyección del informe El Otro Blanqueo para el cannabis medicinal, no ventas reales.",
    source: "Análisis Digital",
    date: "13/10/2026",
    url: "https://www.analisisdigital.com.ar/interes-general/2026/10/13/cannabis-medicinal-un-mercado-potencial-de-us-834-millones-que-la-falta-de-regulacion-mantiene-frenado",
  },
  {
    id: "ariccame-prorroga",
    category: "Cannabis medicinal",
    title: "Prorrogan un año la intervención de ARICCAME",
    summary: "Lo dispuso el Decreto 1147/2026, del 6 de octubre.",
    source: "Agenda Cannabis",
    date: "13/10/2026",
    url: AGENDA_CANNABIS_URL,
  },
  {
    id: "canamo-licencias",
    category: "Cannabis medicinal",
    title: "Cáñamo hortícola: nuevas licencias por 5 años",
    summary: "La Resolución 69/2026 de ARICCAME crea cuatro tipos de licencia.",
    source: "Agenda Cannabis",
    date: "13/10/2026",
    url: AGENDA_CANNABIS_URL,
  },
  {
    id: "reprocann-sedronar",
    category: "Cannabis medicinal",
    title: "El REPROCANN ahora depende de la SEDRONAR",
    summary: "El cambio llegó con el Decreto 27/2026; el sector sigue reclamando por las demoras.",
    source: "Revista THC",
    date: "22/10/2026",
    url: "https://revistathc.com/reprocann-en-expo-cannabis-2026-aprovecha-para-hacer-tu-registro-con-descuento/",
  },
];
