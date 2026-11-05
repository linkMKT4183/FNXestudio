import { EMAILS } from "@/config/site";

/**
 * Pedidos de la guía "¿FNX puede ayudarte?".
 * Cada envío llega como mail automático a FNX con todos los datos
 * y la persona recibe una respuesta automática de confirmación.
 * Servicio: FormSubmit (sin claves). La primera vez hay que activar
 * el formulario desde el mail que FormSubmit manda a la casilla de FNX.
 */
export const LEAD_ENDPOINT = `https://formsubmit.co/ajax/${EMAILS.estudio}`;

export const LEAD_AREAS = [
  "FNX Estudio · Marca y contenido",
  "FNX Consultoría · Proyectos y trámites",
  "FNX Salud · REPROCANN (+18)",
  "Todavía no sé",
] as const;

export type LeadArea = (typeof LEAD_AREAS)[number];

export interface Lead {
  nombre: string;
  mail: string;
  whatsapp: string;
  area: LeadArea | "";
}

export type LeadErrors = Partial<Record<keyof Lead, string>>;

export function validateLead(lead: Lead): LeadErrors {
  const errors: LeadErrors = {};
  if (lead.nombre.trim().length < 2) errors.nombre = "Contanos tu nombre.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.mail.trim())) errors.mail = "Revisá el mail.";
  if (lead.whatsapp.replace(/\D/g, "").length < 8)
    errors.whatsapp = "Dejanos un WhatsApp con código de área.";
  if (!lead.area) errors.area = "Elegí un área.";
  return errors;
}

export function buildLeadPayload(lead: Lead) {
  return {
    _subject: `Nuevo pedido de guía: ${lead.nombre.trim()} (${lead.area})`,
    _template: "table",
    _captcha: "false",
    _replyto: lead.mail.trim(),
    _autoresponse:
      `Hola ${lead.nombre.trim()}, ¡gracias por escribirnos! Recibimos tu pedido de la guía "¿FNX puede ayudarte?". ` +
      "Te la mandamos en menos de 24 horas hábiles. Tus datos se tratan con confidencialidad, conforme a la Ley 25.326. — Equipo FNX",
    Nombre: lead.nombre.trim(),
    Mail: lead.mail.trim(),
    WhatsApp: lead.whatsapp.trim(),
    "Área que le interesa": lead.area,
    Origen: "fnxestudio.com · Guía ¿FNX puede ayudarte?",
  };
}

/** Envía un formulario a la casilla de FNX. Devuelve true si llegó bien. */
export async function postForm(
  payload: Record<string, string>,
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  try {
    const res = await fetchImpl(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function sendLead(lead: Lead, fetchImpl: typeof fetch = fetch): Promise<boolean> {
  return postForm(buildLeadPayload(lead), fetchImpl);
}
