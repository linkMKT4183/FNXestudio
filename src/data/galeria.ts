/**
 * Galería de Marca: todas las fotos que se usan en el sitio, una sola vez cada una,
 * con una línea que dice qué representan. Las noticias suman su foto automáticamente.
 */
import { IMG, type FnxImg, type ImageArea } from "@/data/imagenes";
import { NOTICIAS } from "@/data/noticias";

export interface GalleryItem extends FnxImg {
  label: string;
}

export const GALLERY_GROUPS: { area: ImageArea; title: string }[] = [
  { area: "general", title: "Inicio" },
  { area: "estudio", title: "FNX Estudio" },
  { area: "consultoria", title: "FNX Consultoría" },
  { area: "salud", title: "FNX Salud" },
  { area: "noticias", title: "FNX Noticias" },
];

export function buildGallery(): GalleryItem[] {
  const out: GalleryItem[] = [];
  const seen = new Set<string>();
  const add = (img: FnxImg, label: string | undefined) => {
    if (seen.has(img.id) || !label) return;
    seen.add(img.id);
    out.push({ ...img, label });
  };
  for (const img of Object.values(IMG)) if (img.area !== "noticias") add(img, img.label);
  for (const n of NOTICIAS) add(n.image, `Noticia: ${n.title}`);
  return out;
}

export const GALERIA = buildGallery();
