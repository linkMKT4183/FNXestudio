import { describe, expect, it } from "vitest";
import {
  POSTULACION_VACIA,
  buildPostulacionPayload,
  validatePostulacion,
  type Postulacion,
} from "@/lib/red";

const medica: Postulacion = {
  ...POSTULACION_VACIA,
  nombre: "Laura Pérez",
  mail: "laura@mail.com",
  whatsapp: "261 555 1234",
  profesion: "Medicina",
  matricula: "12345",
  jurisdiccion: "Mendoza",
  especialidad: "Clínica médica",
  consentimiento: true,
};

describe("red de profesionales", () => {
  it("acepta una postulación completa", () => {
    expect(validatePostulacion(medica)).toEqual({});
  });
  it("exige matrícula a profesiones reguladas y consentimiento", () => {
    const e = validatePostulacion({ ...medica, matricula: "", consentimiento: false });
    expect(e.matricula).toBeDefined();
    expect(e.consentimiento).toBeDefined();
  });
  it("no exige matrícula a creativos pero sí portfolio", () => {
    const e = validatePostulacion({
      ...medica,
      profesion: "Creatividad y comunicación",
      matricula: "",
      jurisdiccion: "",
    });
    expect(e.matricula).toBeUndefined();
    expect(e.enlace).toBeDefined();
  });
  it("arma el mail con los datos profesionales", () => {
    const p = buildPostulacionPayload(medica);
    expect(p["Matrícula N.º"]).toBe("12345");
    expect(p["_subject"]).toContain("Laura Pérez");
  });
});
