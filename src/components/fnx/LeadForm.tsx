import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Lock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEAD_AREAS, sendLead, validateLead, type Lead, type LeadErrors } from "@/lib/leads";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "./WhatsAppButton";

const EMPTY: Lead = { nombre: "", mail: "", whatsapp: "", area: "", consentimiento: false };

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-area focus:outline-none focus:ring-2 focus:ring-area/30";

/** Formulario para pedir la guía "¿FNX puede ayudarte?" por mail, con alternativa por WhatsApp. */
export function LeadForm() {
  const [lead, setLead] = useState<Lead>(EMPTY);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const set = (key: Exclude<keyof Lead, "consentimiento">) => (value: string) => {
    setLead((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validateLead(lead);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStatus("sending");
    setStatus((await sendLead(lead)) ? "ok" : "error");
  }

  if (status === "ok") {
    return (
      <div role="status" className="flex w-full flex-col gap-3 rounded-2xl border border-area p-6">
        <CheckCircle2 className="h-7 w-7 text-area" aria-hidden="true" />
        <p className="text-lg font-bold text-foreground">¡Listo, {lead.nombre.trim()}!</p>
        <p className="text-sm text-muted-foreground">
          Te mandamos la guía a {lead.mail.trim()} en menos de 24 horas hábiles. Revisá también la
          carpeta de spam.
        </p>
      </div>
    );
  }

  const field = (key: keyof Lead, label: string, input: React.ReactNode) => (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
      {label}
      {input}
      {errors[key] ? (
        <span id={`lead-${key}-error`} className="text-xs font-normal text-destructive">
          {errors[key]}
        </span>
      ) : null}
    </label>
  );

  const aria = (key: keyof Lead) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `lead-${key}-error` : undefined,
  });

  return (
    <form noValidate onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {field(
          "nombre",
          "Nombre",
          <input
            className={fieldClass}
            autoComplete="name"
            value={lead.nombre}
            onChange={(e) => set("nombre")(e.target.value)}
            {...aria("nombre")}
          />,
        )}
        {field(
          "mail",
          "Mail",
          <input
            type="email"
            className={fieldClass}
            autoComplete="email"
            value={lead.mail}
            onChange={(e) => set("mail")(e.target.value)}
            {...aria("mail")}
          />,
        )}
        {field(
          "whatsapp",
          "WhatsApp",
          <input
            type="tel"
            className={fieldClass}
            autoComplete="tel"
            placeholder="261 555 1234"
            value={lead.whatsapp}
            onChange={(e) => set("whatsapp")(e.target.value)}
            {...aria("whatsapp")}
          />,
        )}
        {field(
          "area",
          "Área que te interesa",
          <select
            className={cn(fieldClass, !lead.area && "text-muted-foreground")}
            value={lead.area}
            onChange={(e) => set("area")(e.target.value)}
            {...aria("area")}
          >
            <option value="">Elegí una opción</option>
            {LEAD_AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>,
        )}
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--area)]"
          checked={lead.consentimiento}
          onChange={(e) => {
            const checked = e.target.checked;
            setLead((prev) => ({ ...prev, consentimiento: checked }));
            setErrors((prev) => ({ ...prev, consentimiento: undefined }));
          }}
          {...aria("consentimiento")}
        />
        <span>
          Acepto que FNX use estos datos solo para mandarme la guía y responder mi consulta. Leí la{" "}
          <Link to="/legal" hash="privacidad" className="underline hover:text-foreground">
            política de privacidad
          </Link>
          .
          {errors.consentimiento ? (
            <span id="lead-consentimiento-error" className="mt-1 block text-xs text-destructive">
              {errors.consentimiento}
            </span>
          ) : null}
        </span>
      </label>

      {status === "error" ? (
        <p role="alert" className="text-sm text-destructive">
          No pudimos enviar el pedido. Probá de nuevo o pedila por WhatsApp.
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="area" size="lg" disabled={status === "sending"}>
          <Send className="h-5 w-5" aria-hidden="true" />
          {status === "sending" ? "Enviando…" : "Recibila por mail"}
        </Button>
        <WhatsAppButton topic="guia" label="Pedila por WhatsApp" variant="outline" />
      </div>

      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Tratamos tus datos con confidencialidad, según la Ley 25.326 de Protección de Datos
        Personales. No los vendemos ni los cedemos. Podés pedir verlos, corregirlos o borrarlos
        cuando quieras.
      </p>
    </form>
  );
}
