/**
 * Fotos de FNX. Todas siguen el mismo estilo: estudio oscuro, fondo negro, luz de contorno
 * y "uno que se destaca entre muchos" en el color del área.
 * Cada foto acompaña un contenido concreto; `label` dice qué representa (se ve en la galería de Marca).
 */
const files = import.meta.glob<string>("../assets/fnx/*.webp", { eager: true, import: "default" });

export type ImageArea = "estudio" | "consultoria" | "salud" | "noticias" | "general";

export interface FnxImg {
  id: string;
  lg: string;
  sm: string;
  width: number;
  height: number;
  alt: string;
  area: ImageArea;
  /** Qué representa en el sitio. Las fotos de noticias toman el título de la noticia. */
  label?: string | undefined;
}

function img(
  file: string,
  area: ImageArea,
  alt: string,
  label?: string,
  size: [number, number] = [1536, 1024],
): FnxImg {
  const lg = files[`../assets/fnx/${file}-lg.webp`];
  const sm = files[`../assets/fnx/${file}-sm.webp`];
  if (!lg || !sm) throw new Error(`Falta la foto ${file}`);
  return { id: file, lg, sm, width: size[0], height: size[1], alt, area, label };
}

export const IMG = {
  /* Inicio */
  hero: img(
    "15-hero-ajedrez",
    "general",
    "Muchas piezas de ajedrez negras sobre un tablero oscuro y un solo rey naranja encendido.",
    "Inicio: imagen principal",
    [1920, 1088],
  ),
  rey: img(
    "01-estudio-rey",
    "estudio",
    "Tablero de ajedrez con muchos peones negros y un solo rey naranja.",
    "Inicio: Quiero hacer crecer mi marca",
  ),

  /* Estudio: servicios y recurso */
  branding: img(
    "e-branding",
    "estudio",
    "Un sello de lacre naranja sobre una fila de tarjetas de presentación negras.",
    "Branding e identidad",
  ),
  audiovisual: img(
    "e-audiovisual",
    "estudio",
    "Una fila de cámaras de cine negras con una sola cámara naranja.",
    "Producción audiovisual",
  ),
  tienda: img(
    "e-tienda",
    "estudio",
    "Una fila de cajas de envío negras con una caja naranja y un carrito de compras negro al lado.",
    "Tienda online",
  ),
  redes: img(
    "e-redes",
    "estudio",
    "Una fila de celulares negros parados y uno solo con la pantalla encendida en naranja.",
    "Redes y contenido",
  ),
  estrategia: img(
    "e-estrategia",
    "estudio",
    "Tablero de ajedrez negro con un caballo naranja y una línea de luz naranja que marca la jugada.",
    "Estrategia",
  ),
  checklist: img(
    "e-checklist",
    "estudio",
    "Un portapapeles negro con casillas vacías y una sola tilde naranja.",
    "Recurso: Checklist de marca",
  ),

  /* Estudio: carrusel de frases */
  manoFigura: img(
    "02-estudio-mano-figura",
    "estudio",
    "Una mano sostiene entre dos dedos una figura humana diminuta, iluminada con luz naranja.",
    "Frase: Tu potencial necesita dirección.",
  ),
  caminoLuz: img(
    "e-camino-luz",
    "estudio",
    "Tablero de ajedrez con piezas negras y un camino de luz naranja que atraviesa las casillas.",
    "Frase: Ver la jugada antes que el mercado.",
  ),
  cerebro: img(
    "e-cerebro",
    "estudio",
    "Un cerebro escultórico gris con muchos cables negros conectados y uno solo naranja.",
    "Frase: Primero la marca. Después la pauta.",
  ),
  megafonos: img(
    "05-estudio-megafonos",
    "estudio",
    "Una fila de megáfonos negros con uno solo naranja.",
    "Frase: Anuncios que se escuchan.",
  ),

  /* Consultoría */
  cHero: img(
    "c-hero",
    "consultoria",
    "Una balanza de justicia azul entre objetos de escritorio negros.",
    "Consultoría: imagen principal",
  ),
  cJuridico: img(
    "c-juridico",
    "consultoria",
    "Un sello de goma azul sobre una pila de documentos negros.",
    "Servicios jurídicos",
  ),
  cTecnico: img(
    "c-tecnico",
    "consultoria",
    "Una fila de instrumentos de medición negros, con termómetros y reglas, y un higrómetro azul.",
    "Servicios técnicos de cultivo",
  ),
  cDerivaciones: img(
    "c-derivaciones",
    "consultoria",
    "Una fila de compases negros con un solo compás azul.",
    "Derivaciones a la red de profesionales",
  ),
  cLlave: img(
    "c-llave",
    "consultoria",
    "Una fila de llaves negras con una sola llave azul.",
    "Combo: Asociación llave en mano",
  ),
  cCarpetas: img(
    "c-carpetas",
    "consultoria",
    "Una fila de biblioratos negros ordenados con uno solo azul.",
    "Combo: Regularización",
  ),
  cCalendario: img(
    "c-calendario",
    "consultoria",
    "Un calendario de escritorio negro con un solo día marcado en azul.",
    "Combo: Mantenimiento",
  ),
  cEscudo: img(
    "c-escudo",
    "consultoria",
    "Una fila de escudos negros con un solo escudo azul.",
    "Combo: Marca protegida",
  ),
  cEscalera: img(
    "c-escalera",
    "consultoria",
    "Una escalera de bloques negros cuyo último escalón es azul.",
    "Inversores y proyectos industriales",
  ),
  cMaqueta: img(
    "c-maqueta",
    "consultoria",
    "Una maqueta de campo con surcos negros y una sola línea de riego azul.",
    "Agro: imagen principal",
  ),
  cSensor: img(
    "c-sensor",
    "consultoria",
    "Una fila de postes negros y una sola estación de monitoreo azul.",
    "Agro: servicios técnicos y monitoreo",
  ),
  cValvula: img(
    "c-valvula",
    "consultoria",
    "Tuberías de riego negras con una sola válvula azul.",
    "Agro: tecnificación y riego",
  ),
  cAspersores: img(
    "c-aspersores",
    "consultoria",
    "Una fila de goteros de riego negros con uno solo azul.",
    "Combo: Riego eficiente",
  ),

  /* Salud */
  carpetas: img(
    "07-salud-carpetas",
    "salud",
    "Una fila de carpetas negras con una sola carpeta verde.",
    "Orientación en el trámite REPROCANN",
  ),
  lupa: img(
    "08-salud-lupa",
    "salud",
    "Una lupa sobre credenciales negras resalta la única credencial verde.",
    "Profesionales verificados",
  ),
  ongs: img(
    "s-ongs",
    "salud",
    "Una mano une dos piezas de rompecabezas negras con una pieza verde en el centro.",
    "Vinculación con ONGs verificadas",
  ),
  escalera: img(
    "11-salud-escalera",
    "salud",
    "Una escalera de bloques negros cuyo primer escalón es verde.",
    "REPROCANN sin vueltas: la consulta médica",
  ),
  brujulas: img(
    "09-salud-brujulas",
    "salud",
    "Una fila de brújulas negras con una sola brújula verde.",
    "Pregunta: ¿Por dónde empiezo?",
  ),
  mitoRealidad: img(
    "s-mito-realidad",
    "salud",
    "Dos tarjetas: una negra con la palabra MITO tachada y una verde con la palabra REALIDAD.",
    "Pregunta: ¿Me garantizan la aprobación?",
  ),
  candado: img(
    "10-salud-candado",
    "salud",
    "Un candado verde entre candados negros.",
    "Pregunta: ¿Qué pasa con mis datos?",
  ),
  guia: img(
    "s-guia",
    "salud",
    "Un cuaderno negro cerrado con una cinta señaladora verde.",
    "Recurso: Guía REPROCANN paso a paso",
  ),

  /* Noticias: una por noticia (el título sale del registro de cada noticia) */
  nInstagram: img(
    "n-instagram",
    "noticias",
    "Una pantalla horizontal amarilla entre teléfonos verticales negros.",
  ),
  nCarteles: img(
    "n-carteles",
    "noticias",
    "Una fila de carteles publicitarios negros con uno solo encendido en amarillo.",
  ),
  nPymes: img(
    "n-pymes",
    "noticias",
    "Un gráfico de barras negro que desciende, con una flecha amarilla hacia abajo.",
  ),
  nEndeavor: img(
    "n-endeavor",
    "noticias",
    "Siluetas de montañas negras con un punto de luz amarillo en la cima más alta.",
  ),
  nExpo: img(
    "n-expo",
    "noticias",
    "Una fila de credenciales de feria negras colgando y una sola amarilla.",
  ),
  nConicet: img(
    "14-noticias-tubos",
    "noticias",
    "Una gradilla de tubos de ensayo negros con un solo tubo amarillo.",
  ),
  nMercado: img(
    "n-mercado",
    "noticias",
    "Pilas de monedas negras con una sola moneda amarilla arriba.",
  ),
  nAriccame: img(
    "n-sello",
    "noticias",
    "Un sello de goma negro sobre un documento negro con una marca de tinta amarilla.",
  ),
  nLicencias: img(
    "13-noticias-llaves",
    "noticias",
    "Una fila de llaves negras con una sola llave amarilla.",
  ),
  nReprocann: img(
    "n-reprocann",
    "noticias",
    "Un archivo de carpetas negras con una carpeta amarilla que sobresale.",
  ),
} satisfies Record<string, FnxImg>;

export const AREA_LABEL: Record<ImageArea, string> = {
  estudio: "Estudio",
  consultoria: "Consultoría",
  salud: "Salud",
  noticias: "Noticias",
  general: "Inicio",
};
