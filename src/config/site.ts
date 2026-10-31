/**
 * Configuración general de FNX.
 * WHATSAPP_NUMBER: completalo con el número en formato internacional, sin "+" ni espacios.
 * Ejemplo: "5492611234567". Mientras esté vacío, los botones muestran "WhatsApp próximamente".
 */
export const WHATSAPP_NUMBER = "";

export const MANUAL_URL = "https://www.canva.com/d/SYr8B-ZM5BWGkRt";

export const WHATSAPP_MESSAGES = {
  marca: "Hola FNX, quiero hacer crecer mi marca",
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
