import { CheckCircle2, Leaf } from "lucide-react";

/**
 * Credencial de ejemplo del REPROCANN, en estilo FNX.
 * Respeta el formato de la credencial (tarjeta horizontal, franja superior, datos y franja de
 * autorización) pero es ilustrativa a propósito: no lleva escudo ni logos del Estado, usa datos
 * inventados y tiene el sello EJEMPLO, para que nadie la confunda con un documento válido.
 * Mide como una tarjeta (85,6 × 54 mm) en cualquier pantalla; el texto escala con el ancho.
 */
export function CredencialEjemplo() {
  return (
    <figure className="flex w-full flex-col items-center gap-4">
      <div className="w-full max-w-md [container-type:inline-size]">
        <div
          className="credencial-flota relative flex aspect-[85.6/54] w-full flex-col overflow-hidden rounded-[4cqw] border border-area/60 bg-card shadow-glow"
          role="img"
          aria-label="Credencial de ejemplo del REPROCANN con datos inventados. No es un documento oficial."
        >
          {/* Franja superior */}
          <div className="flex items-center justify-between gap-[2cqw] bg-area px-[5cqw] py-[3cqw] text-area-foreground">
            <div className="flex items-center gap-[2.5cqw]">
              <Leaf className="h-[8cqw] w-[8cqw] shrink-0" aria-hidden="true" />
              <div className="leading-none">
                <p className="headline text-[7.5cqw]">REPROCANN</p>
                <p className="mt-[0.8cqw] text-[2.6cqw] font-semibold opacity-80">
                  Registro del Programa de Cannabis
                </p>
              </div>
            </div>
            <span className="rounded-full border border-current px-[2.5cqw] py-[1cqw] text-[2.4cqw] font-bold uppercase tracking-wider">
              Ejemplo
            </span>
          </div>

          {/* Datos */}
          <dl className="grid flex-1 grid-cols-[1.4fr_1fr] content-center gap-x-[4cqw] gap-y-[3cqw] px-[5cqw]">
            <div>
              <dt className="text-[2.7cqw] text-muted-foreground">Nombre y apellido</dt>
              <dd className="text-[4cqw] font-bold text-foreground">Nombre Apellido</dd>
            </div>
            <div>
              <dt className="text-[2.7cqw] text-muted-foreground">Documento</dt>
              <dd className="text-[4cqw] font-bold text-foreground">00.000.000</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-[2.7cqw] text-muted-foreground">Dirección</dt>
              <dd className="text-[4cqw] font-bold text-foreground">
                Calle Ejemplo 123 · Ciudad · Mendoza
              </dd>
            </div>
          </dl>

          {/* Franja de autorización */}
          <div className="flex items-center gap-[2cqw] border-t border-area/40 bg-area/15 px-[5cqw] py-[3cqw] text-[2.9cqw] font-bold text-area whitespace-nowrap">
            <CheckCircle2 className="h-[4.5cqw] w-[4.5cqw] shrink-0" aria-hidden="true" />
            Paciente autorizado para cultivo controlado y transporte
          </div>

          {/* Sello */}
          <span
            className="headline pointer-events-none absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] select-none text-[17cqw] leading-none text-foreground/[0.07]"
            aria-hidden="true"
          >
            EJEMPLO
          </span>
        </div>
      </div>
      <figcaption className="max-w-md text-center text-xs text-muted-foreground">
        Imagen ilustrativa con datos inventados. No es la credencial oficial ni tiene validez.
      </figcaption>
    </figure>
  );
}
