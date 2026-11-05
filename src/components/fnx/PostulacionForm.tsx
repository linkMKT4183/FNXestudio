import { useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Lock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  POSTULACION_VACIA,
  PROFESIONES,
  requiereMatricula,
  sendPostulacion,
  validatePostulacion,
  type Postulacion,
  type PostulacionErrors,
} from "@/lib/red";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "./WhatsAppButton";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-area focus:outline-none focus:ring-2 focus:ring-area/30";

type TextKey = Exclude<keyof Postulacion, "consentimiento">;

/** Formulario de postulación a la Red de Profesionales FNX. */
export function PostulacionForm() {
  const [data, setData] = useState<Postulacion>(POSTULACION_VACIA);
  const [errors, setErrors] = useState<PostulacionErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  function update<K extends keyof Postulacion>(key: K, value: Postulacion[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validatePostulacion(data);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    setStatus((await sendPostulacion(data)) ? "ok" : "error");
  }

  if (status === "ok") {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-3xl border border-area bg-card p-8">
        <CheckCircle2 className="h-8 w-8 text-area" aria-hidden="true" />
        <p className="text-xl font-bold text-foreground">Recibimos tu postulación.</p>
        <p className="text-sm text-muted-foreground">
          Te enviamos una confirmación a {data.mail.trim()}. Vamos a verificar tu información y te
          contactaremos para coordinar una entrevista.
        </p>
      </div>
    );
  }

  const aria = (key: keyof Postulacion) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `red-${key}-error` : undefined,
  });

  const error = (key: keyof Postulacion) =>
    errors[key] ? (
      <span id={`red-${key}-error`} className="text-xs font-normal text-destructive">
        {errors[key]}
      </span>
    ) : null;

  const field = (key: TextKey, label: string, control: ReactNode, className?: string) => (
    <label className={cn("flex flex-col gap-1.5 text-sm font-medium text-foreground", className)}>
      {label}
      {control}
      {error(key)}
    </label>
  );

  const text = (key: TextKey, extra: Record<string, string> = {}) => (
    <input
      className={fieldClass}
      value={data[key]}
      onChange={(e) => update(key, e.target.value)}
      {...aria(key)}
      {...extra}
    />
  );

  const matriculaObligatoria = requiereMatricula(data.profesion);

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {field("nombre", "Nombre y apellido", text("nombre", { autoComplete: "name" }))}
        {field(
          "mail",
          "Correo electrónico",
          text("mail", { type: "email", autoComplete: "email" }),
        )}
        {field(
          "whatsapp",
          "WhatsApp",
          text("whatsapp", { type: "tel", autoComplete: "tel", placeholder: "261 555 1234" }),
        )}
        {field(
          "profesion",
          "Profesión",
          <select
            className={cn(fieldClass, !data.profesion && "text-muted-foreground")}
            value={data.profesion}
            onChange={(e) => update("profesion", e.target.value as Postulacion["profesion"])}
            {...aria("profesion")}
          >
            <option value="">Seleccioná una opción</option>
            {PROFESIONES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>,
        )}
        {field(
          "matricula",
          matriculaObligatoria ? "Matrícula N.º" : "Matrícula N.º (si corresponde)",
          text("matricula"),
        )}
        {field(
          "jurisdiccion",
          matriculaObligatoria
            ? "Jurisdicción / colegio o consejo"
            : "Jurisdicción (si corresponde)",
          text("jurisdiccion", { placeholder: "Ej.: Mendoza" }),
        )}
        {field(
          "especialidad",
          "Especialidad o área de práctica",
          text("especialidad"),
          "sm:col-span-2",
        )}
        {field(
          "enlace",
          data.profesion === "Creatividad y comunicación"
            ? "Portfolio"
            : "LinkedIn, web o portfolio (opcional)",
          text("enlace", { type: "url", placeholder: "https://" }),
          "sm:col-span-2",
        )}
        {field(
          "mensaje",
          "¿Qué te gustaría aportar a la red? (opcional)",
          <textarea
            rows={4}
            className={fieldClass}
            value={data.mensaje}
            onChange={(e) => update("mensaje", e.target.value)}
          />,
          "sm:col-span-2",
        )}
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--area)]"
          checked={data.consentimiento}
          onChange={(e) => update("consentimiento", e.target.checked)}
          {...aria("consentimiento")}
        />
        <span>
          Declaro que la información es veraz y presto consentimiento para que FNX trate mis datos
          personales con el único fin de evaluar mi incorporación a la red, conforme a la Ley 25.326
          de Protección de Datos Personales.
          {error("consentimiento") ? (
            <span className="mt-1 block">{error("consentimiento")}</span>
          ) : null}
        </span>
      </label>

      {status === "error" ? (
        <p role="alert" className="text-sm text-destructive">
          No pudimos enviar la postulación. Intentá nuevamente o escribinos por WhatsApp.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="area" size="lg" disabled={status === "sending"}>
          <Send className="h-5 w-5" aria-hidden="true" />
          {status === "sending" ? "Enviando…" : "Enviar postulación"}
        </Button>
        <WhatsAppButton topic="red" label="Consultar por WhatsApp" variant="outline" />
      </div>

      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Podés solicitar el acceso, la rectificación o la supresión de tus datos en cualquier momento
        escribiendo a fnxestudio22@gmail.com.
      </p>
    </form>
  );
}
