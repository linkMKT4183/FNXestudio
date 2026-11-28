/**
 * Configuración general de FNX.
 * WHATSAPP_NUMBER: completalo con el número en formato internacional, sin "+" ni espacios.
 * Ejemplo: "5492611234567". Mientras esté vacío, los botones muestran "WhatsApp próximamente".
 */
export const WHATSAPP_NUMBER = "5492616306508";

export const MANUAL_URL = "https://www.canva.com/d/SYr8B-ZM5BWGkRt";

export const WHATSAPP_MESSAGES = {
  identidad: "Hola FNX, vengo de la web: quiero crear o renovar la identidad de mi marca",
  audiovisual: "Hola FNX, vengo de la web: quiero fotos o videos para mi marca",
  tienda: "Hola FNX, vengo de la web: quiero mi tienda online",
  redes: "Hola FNX, vengo de la web: quiero que me ayuden con mis redes",
  estrategia: "Hola FNX, vengo de la web: quiero una estrategia para mi marca",
  registro: "Hola FNX, vengo de la web: quiero registrar mi marca",
  mendoza: "Hola FNX, vengo de la web: tengo un negocio en Mendoza y quiero hacer crecer mi marca",
  sanjuan: "Hola FNX, vengo de la web: tengo un negocio en San Juan y quiero hacer crecer mi marca",
  general: "Hola FNX, quiero hacer una consulta",
  marca: "Hola FNX, quiero hacer crecer mi marca",
  consultoria: "Hola FNX, necesito asesoría para mi proyecto agrícola o del sector regulado",
  salud: "Hola FNX, vengo de la web: quiero hacer mi REPROCANN (+18)",
  renovacion: "Hola FNX, vengo de la web: tengo REPROCANN y quiero renovarlo (+18)",
  reprocannMendoza: "Hola FNX, vengo de la web: vivo en Mendoza y quiero hacer mi REPROCANN (+18)",
  reprocannSanJuan: "Hola FNX, vengo de la web: vivo en San Juan y quiero hacer mi REPROCANN (+18)",
  novedades: "Hola FNX, quiero recibir novedades",
  guia: "Hola FNX, quiero recibir la guía ¿FNX puede ayudarte?",
  consultoria15: "Hola FNX, escribo MARCA: quiero mi consultoría de 15 minutos",
  red: "Hola FNX, soy profesional y quiero postularme a la Red FNX",
} as const;

export type WhatsAppTopic = keyof typeof WHATSAPP_MESSAGES;

/** Devuelve el link de WhatsApp o null si todavía no hay número cargado. */
export function buildWhatsAppLink(
  topic: WhatsAppTopic,
  number: string = WHATSAPP_NUMBER,
): string | null {
  const clean = number.replace(/\D/g, "");
  if (!clean) return null;
  return `https://wa.me/${clean}?text=${encodeURIComponent(WHATSAPP_MESSAGES[topic])}`;
}

export const SITE_NAME = "FNX · Fénix Creativo";

/**
 * Correos de FNX. Estudio atiende inicio, Estudio, Consultoría y Noticias; Salud tiene su propio correo.
 */
export const EMAILS = {
  estudio: "fnxestudio22@gmail.com",
  salud: "fnxsalud@gmail.com",
} as const;

export type EmailAccountId = keyof typeof EMAILS;

/** Asunto precargado de cada botón de correo. */
export const EMAIL_SUBJECTS = {
  general: "Consulta desde la web de FNX",
  marca: "Quiero hacer crecer mi marca",
  consultoria: "Quiero asesoría para mi proyecto",
  salud: "Quiero hacer mi REPROCANN",
  novedades: "Quiero recibir novedades por mail",
  guia: "Quiero la guía paso a paso",
  guiaFnx: "Quiero la guía ¿FNX puede ayudarte?",
  consultoria15: "Quiero mi consultoría de 15 minutos",
  red: "Postulación a la Red de Profesionales FNX",
} as const;

export type EmailTopic = keyof typeof EMAIL_SUBJECTS;

/** Link mailto con asunto precargado. */
export function buildMailtoLink(account: EmailAccountId, topic: EmailTopic): string {
  return `mailto:${EMAILS[account]}?subject=${encodeURIComponent(EMAIL_SUBJECTS[topic])}`;
}

/** Dominio oficial de la web (comprado en Lovable el 05/11/2026). Sin barra al final. */
export const SITE_URL = "https://fnxestudio.com";

/** Imagen al compartir (1200×630, en public/). */
export const OG_IMAGE_URL = `${SITE_URL}/og-fnx.jpg`;
export const OG_IMAGE_META = [
  { property: "og:image", content: OG_IMAGE_URL },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "FNX · Fénix Creativo" },
  { name: "twitter:image", content: OG_IMAGE_URL },
];

/** Dirección completa de una página, por ejemplo pageUrl("/salud"). */
export function pageUrl(path: string = "/"): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/**
 * Cuentas de Instagram de FNX: Estudio, Salud y Noticias, cuentas separadas que trabajan en colaboración.
 * HANDLE: completalo con el usuario sin "@", por ejemplo "fnxestudio".
 * Mientras esté vacío, el botón muestra "Instagram próximamente".
 * Los nombres y las áreas de cada cuenta son provisorios: cambialos cuando estén definidas.
 */
export interface InstagramAccount {
  name: string;
  handle: string;
  covers: string;
}

export const INSTAGRAM_ACCOUNTS: Record<"estudio" | "salud" | "noticias", InstagramAccount> = {
  estudio: {
    name: "FNX Estudio",
    handle: "fnx.estudio",
    covers: "Marca, consultoría y negocios",
  },
  salud: {
    name: "FNX Salud",
    handle: "fnx.salud",
    covers: "Orientación +18 y noticias del sector",
  },
  noticias: {
    name: "FNX Noticias",
    // Completá el usuario cuando la cuenta esté creada (por ejemplo "fnx.noticias").
    handle: "",
    covers: "Marketing, negocios, emprendimiento y sector regulado, con fuentes",
  },
};

export type InstagramAccountId = keyof typeof INSTAGRAM_ACCOUNTS;

/** Devuelve el link al perfil o null si todavía no hay usuario cargado. */
export function buildInstagramLink(
  id: InstagramAccountId,
  handle: string = INSTAGRAM_ACCOUNTS[id].handle,
): string | null {
  const clean = handle.trim().replace(/^@/, "");
  if (!clean) return null;
  return `https://www.instagram.com/${clean}/`;
}

/**
 * Estudios aliados de FNX con cuenta propia de Instagram.
 * No son cuentas de FNX: se muestran como partners dentro de su área.
 */
export const PARTNERS = {
  aro: {
    name: "Aro · Estudio Jurídico",
    role: "Partner jurídico de FNX",
    handle: "aro.estudiojuridico",
  },
} as const;

export type PartnerId = keyof typeof PARTNERS;

export function buildPartnerInstagramLink(id: PartnerId): string {
  return `https://www.instagram.com/${PARTNERS[id].handle}/`;
}

/**
 * Datos legales del titular de FNX (pie de página y página Legal).
 * Completalos con los datos reales: los mismos que van al registro de marca en el INPI.
 * Mientras un dato esté vacío, no se muestra.
 */
export const LEGAL = {
  /** Nombre y apellido o razón social del titular. */
  titular: "",
  cuit: "",
  /** Domicilio legal completo. */
  domicilio: "",
  /** Fecha de la última actualización de la página Legal. */
  actualizado: "25 de noviembre de 2026",
} as const;

/**
 * Enlace obligatorio a la Ventanilla Federal Única de reclamos de Defensa del Consumidor
 * (Resolución 274/2021 de la Secretaría de Comercio Interior). El texto del enlace es fijo.
 */
export const DEFENSA_CONSUMIDOR = {
  url: "https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario",
  texto: "Defensa de las y los Consumidores. Para reclamos ingrese aquí",
} as const;

/** Sitio de la Agencia de Acceso a la Información Pública, órgano de control de la Ley 25.326. */
export const AAIP_URL = "https://www.argentina.gob.ar/aaip";
