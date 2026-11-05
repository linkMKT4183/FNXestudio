/**
 * Configuración general de FNX.
 * WHATSAPP_NUMBER: completalo con el número en formato internacional, sin "+" ni espacios.
 * Ejemplo: "5492611234567". Mientras esté vacío, los botones muestran "WhatsApp próximamente".
 */
export const WHATSAPP_NUMBER = "5492616306508";

export const MANUAL_URL = "https://www.canva.com/d/SYr8B-ZM5BWGkRt";

export const WHATSAPP_MESSAGES = {
  general: "Hola FNX, quiero hacer una consulta",
  marca: "Hola FNX, quiero hacer crecer mi marca",
  consultoria: "Hola FNX, necesito asesoría para mi proyecto agrícola o cannábico",
  salud: "Hola FNX, necesito orientación en cannabis medicinal",
  novedades: "Hola FNX, quiero recibir novedades",
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
  salud: "Consulta FNX Salud",
  novedades: "Quiero recibir novedades por mail",
  checklist: "Quiero el checklist de marca",
  guia: "Quiero la guía paso a paso",
} as const;

export type EmailTopic = keyof typeof EMAIL_SUBJECTS;

/** Link mailto con asunto precargado. */
export function buildMailtoLink(account: EmailAccountId, topic: EmailTopic): string {
  return `mailto:${EMAILS[account]}?subject=${encodeURIComponent(EMAIL_SUBJECTS[topic])}`;
}

/** Dominio oficial de la web (comprado en Lovable el 05/11/2026). Sin barra al final. */
export const SITE_URL = "https://fnxestudio.com";

/** Dirección completa de una página, por ejemplo pageUrl("/salud"). */
export function pageUrl(path: string = "/"): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/**
 * Cuentas de Instagram de FNX. Son dos cuentas separadas que trabajan en colaboración.
 * HANDLE: completalo con el usuario sin "@", por ejemplo "fnxestudio".
 * Mientras esté vacío, el botón muestra "Instagram próximamente".
 * Los nombres y las áreas de cada cuenta son provisorios: cambialos cuando estén definidas.
 */
export interface InstagramAccount {
  name: string;
  handle: string;
  covers: string;
}

export const INSTAGRAM_ACCOUNTS: Record<"estudio" | "salud", InstagramAccount> = {
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
