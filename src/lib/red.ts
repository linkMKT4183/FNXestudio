import { postForm } from "./leads";

/** Postulaciones a la Red de Profesionales FNX. */

export const PROFESIONES = [
  "Medicina",
  "Abogacía",
  "Ingeniería agronómica",
  "Creatividad y comunicación",
  "Otra profesión",
] as const;

export type Profesion = (typeof PROFESIONES)[number];

/** Profesiones reguladas: la matrícula es obligatoria. */
export function requiereMatricula(p: Profesion | ""): boolean {
  return p === "Medicina" || p === "Abogacía" || p === "Ingeniería agronómica";
}

export interface Postulacion {
  nombre: string;
  mail: string;
  whatsapp: string;
  profesion: Profesion | "";
  matricula: string;
  jurisdiccion: string;
  especialidad: string;
  enlace: string;
  mensaje: string;
  consentimiento: boolean;
}

export const POSTULACION_VACIA: Postulacion = {
  nombre: "",
  mail: "",
  whatsapp: "",
  profesion: "",
  matricula: "",
  jurisdiccion: "",
  especialidad: "",
  enlace: "",
  mensaje: "",
  consentimiento: false,
};

export type PostulacionErrors = Partial<Record<keyof Postulacion, string>>;

export function validatePostulacion(p: Postulacion): PostulacionErrors {
  const e: PostulacionErrors = {};
  if (p.nombre.trim().split(/\s+/).length < 2) e.nombre = "Indicá nombre y apellido.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.mail.trim())) e.mail = "Revisá el correo electrónico.";
  if (p.whatsapp.replace(/\D/g, "").length < 8) e.whatsapp = "Indicá un número con código de área.";
  if (!p.profesion) e.profesion = "Seleccioná tu profesión.";
  if (requiereMatricula(p.profesion)) {
    if (!p.matricula.trim()) e.matricula = "La matrícula es obligatoria para tu profesión.";
    if (!p.jurisdiccion.trim()) e.jurisdiccion = "Indicá la jurisdicción de tu matrícula.";
  }
  if (!p.especialidad.trim()) e.especialidad = "Contanos tu especialidad o área de práctica.";
  if (p.profesion === "Creatividad y comunicación" && !p.enlace.trim())
    e.enlace = "Compartinos tu portfolio.";
  if (!p.consentimiento) e.consentimiento = "Necesitamos tu consentimiento para continuar.";
  return e;
}

export function buildPostulacionPayload(p: Postulacion): Record<string, string> {
  const nombre = p.nombre.trim();
  return {
    _subject: `Nueva postulación a la Red FNX: ${nombre} (${p.profesion})`,
    _template: "table",
    _captcha: "false",
    _replyto: p.mail.trim(),
    _autoresponse:
      `Estimado/a ${nombre}: recibimos su postulación a la Red de Profesionales FNX. ` +
      "Nuestro equipo verificará la información y la documentación presentadas y se comunicará con usted para coordinar una entrevista. " +
      "Sus datos se tratan con estricta confidencialidad, conforme a la Ley 25.326 de Protección de Datos Personales. — Equipo FNX",
    "Nombre y apellido": nombre,
    "Correo electrónico": p.mail.trim(),
    WhatsApp: p.whatsapp.trim(),
    Profesión: p.profesion,
    "Matrícula N.º": p.matricula.trim() || "—",
    Jurisdicción: p.jurisdiccion.trim() || "—",
    "Especialidad / área de práctica": p.especialidad.trim(),
    "Portfolio / LinkedIn / web": p.enlace.trim() || "—",
    Mensaje: p.mensaje.trim() || "—",
    Consentimiento: "Aceptó el tratamiento de datos (Ley 25.326)",
    Origen: "fnxestudio.com/red",
  };
}

export function sendPostulacion(p: Postulacion, fetchImpl: typeof fetch = fetch) {
  return postForm(buildPostulacionPayload(p), fetchImpl);
}
