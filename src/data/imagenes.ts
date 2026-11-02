/**
 * Fotos de FNX. Todas siguen el mismo estilo: estudio oscuro, fondo negro, luz de contorno
 * y "uno que se destaca entre muchos" en el color del área.
 */
import img01lg from "@/assets/fnx/01-estudio-rey-lg.webp";
import img01sm from "@/assets/fnx/01-estudio-rey-sm.webp";
import img02lg from "@/assets/fnx/02-estudio-mano-figura-lg.webp";
import img02sm from "@/assets/fnx/02-estudio-mano-figura-sm.webp";
import img03lg from "@/assets/fnx/03-estudio-rompecabezas-lg.webp";
import img03sm from "@/assets/fnx/03-estudio-rompecabezas-sm.webp";
import img04lg from "@/assets/fnx/04-estudio-iman-lg.webp";
import img04sm from "@/assets/fnx/04-estudio-iman-sm.webp";
import img05lg from "@/assets/fnx/05-estudio-megafonos-lg.webp";
import img05sm from "@/assets/fnx/05-estudio-megafonos-sm.webp";
import img06lg from "@/assets/fnx/06-estudio-enter-lg.webp";
import img06sm from "@/assets/fnx/06-estudio-enter-sm.webp";
import img07lg from "@/assets/fnx/07-salud-carpetas-lg.webp";
import img07sm from "@/assets/fnx/07-salud-carpetas-sm.webp";
import img08lg from "@/assets/fnx/08-salud-lupa-lg.webp";
import img08sm from "@/assets/fnx/08-salud-lupa-sm.webp";
import img09lg from "@/assets/fnx/09-salud-brujulas-lg.webp";
import img09sm from "@/assets/fnx/09-salud-brujulas-sm.webp";
import img10lg from "@/assets/fnx/10-salud-candado-lg.webp";
import img10sm from "@/assets/fnx/10-salud-candado-sm.webp";
import img11lg from "@/assets/fnx/11-salud-escalera-lg.webp";
import img11sm from "@/assets/fnx/11-salud-escalera-sm.webp";
import img12lg from "@/assets/fnx/12-noticias-diarios-lg.webp";
import img12sm from "@/assets/fnx/12-noticias-diarios-sm.webp";
import img13lg from "@/assets/fnx/13-noticias-llaves-lg.webp";
import img13sm from "@/assets/fnx/13-noticias-llaves-sm.webp";
import img14lg from "@/assets/fnx/14-noticias-tubos-lg.webp";
import img14sm from "@/assets/fnx/14-noticias-tubos-sm.webp";
import img15lg from "@/assets/fnx/15-hero-ajedrez-lg.webp";
import img15sm from "@/assets/fnx/15-hero-ajedrez-sm.webp";
import type { NewsItem } from "@/data/noticias";

export type ImageArea = "estudio" | "salud" | "noticias" | "general";

export interface FnxImg {
  n: number;
  lg: string;
  sm: string;
  width: number;
  height: number;
  alt: string;
  area: ImageArea;
}

const W = 1536;
const H = 1024;

function img(n: number, lg: string, sm: string, area: ImageArea, alt: string): FnxImg {
  return { n, lg, sm, width: W, height: H, alt, area };
}

export const IMG = {
  rey: img(1, img01lg, img01sm, "estudio", "Tablero de ajedrez con muchos peones negros y un solo rey naranja."),
  manoFigura: img(
    2,
    img02lg,
    img02sm,
    "estudio",
    "Una mano sostiene entre dos dedos una figura humana diminuta, iluminada con luz naranja.",
  ),
  rompecabezas: img(
    3,
    img03lg,
    img03sm,
    "estudio",
    "Una mano coloca una pieza de rompecabezas naranja entre piezas negras.",
  ),
  iman: img(
    4,
    img04lg,
    img04sm,
    "estudio",
    "Un imán naranja en forma de herradura atrae a un grupo de figuritas negras.",
  ),
  megafonos: img(5, img05lg, img05sm, "estudio", "Una fila de megáfonos negros con uno solo naranja."),
  enter: img(
    6,
    img06lg,
    img06sm,
    "estudio",
    "Una tecla Enter gigante se abre como una puerta y deja salir luz naranja.",
  ),
  carpetas: img(7, img07lg, img07sm, "salud", "Una fila de carpetas negras con una sola carpeta verde."),
  lupa: img(
    8,
    img08lg,
    img08sm,
    "salud",
    "Una lupa sobre credenciales negras resalta la única credencial verde.",
  ),
  brujulas: img(9, img09lg, img09sm, "salud", "Una fila de brújulas negras con una sola brújula verde."),
  candado: img(10, img10lg, img10sm, "salud", "Un candado verde entre candados negros."),
  escalera: img(
    11,
    img11lg,
    img11sm,
    "salud",
    "Una escalera de bloques negros cuyo primer escalón es verde.",
  ),
  diarios: img(12, img12lg, img12sm, "noticias", "Una pila de diarios negros con un solo diario amarillo."),
  llaves: img(13, img13lg, img13sm, "noticias", "Una fila de llaves negras con una sola llave amarilla."),
  tubos: img(
    14,
    img14lg,
    img14sm,
    "noticias",
    "Una gradilla de tubos de ensayo negros con un solo tubo amarillo.",
  ),
  hero: {
    n: 15,
    lg: img15lg,
    sm: img15sm,
    width: 1920,
    height: 1088,
    alt: "Muchas piezas de ajedrez negras sobre un tablero oscuro y un solo rey naranja encendido.",
    area: "general",
  } satisfies FnxImg,
} as const;

/** Las 15 fotos en orden, para la galería de Marca. */
export const GALERIA: FnxImg[] = [
  IMG.hero,
  IMG.rey,
  IMG.manoFigura,
  IMG.rompecabezas,
  IMG.iman,
  IMG.megafonos,
  IMG.enter,
  IMG.carpetas,
  IMG.lupa,
  IMG.brujulas,
  IMG.candado,
  IMG.escalera,
  IMG.diarios,
  IMG.llaves,
  IMG.tubos,
];

export const AREA_LABEL: Record<ImageArea, string> = {
  estudio: "Estudio",
  salud: "Salud",
  noticias: "Noticias",
  general: "General",
};

/**
 * Foto de cada noticia según su categoría: Marketing y Negocios usan los diarios;
 * Cannabis medicinal alterna llaves y tubos de ensayo, en el orden de la lista completa.
 */
export function newsImages(items: NewsItem[]): Record<string, FnxImg> {
  const out: Record<string, FnxImg> = {};
  let cannabis = 0;
  for (const n of items) {
    if (n.category === "Cannabis medicinal") {
      out[n.id] = cannabis % 2 === 0 ? IMG.llaves : IMG.tubos;
      cannabis += 1;
    } else {
      out[n.id] = IMG.diarios;
    }
  }
  return out;
}
