import { CheckCircle2, Leaf, QrCode } from "lucide-react";

/**
 * Credencial de ejemplo del REPROCANN, en estilo FNX.
 * Muestra los mismos campos que trae la credencial que se otorga (datos de la persona,
 * dirección de cultivo, vigencia, QR de control y la autorización con sus límites), pero con
 * los colores de FNX, sin escudo ni logos del Estado, con datos inventados y el sello EJEMPLO,
 * para que se entienda sin que sirva como molde de una credencial falsa.
 * Mide como una tarjeta (85,6 × 54 mm) en cualquier pantalla; el texto escala con el ancho.
 */
export function CredencialEjemplo() {
  return (
    <figure className="flex w-full flex-col items-center gap-4">
      <div className="w-full max-w-md [container-type:inline-size]">
        <div
          className="credencial-flota relative flex aspect-[85.6/54] w-full flex-col overflow-hidden rounded-[4cqw] border border-area/60 bg-card shadow-glow"
          role="img"
          aria-label="Credencial de ejemplo del REPROCANN con datos inventados: nombre y apellido, documento, vigencia, dirección de cultivo, QR de control y autorización para cultivo controlado y transporte. No es un documento oficial."
        >
          {/* Franja superior */}
          <div className="flex items-center justify-between gap-[2cqw] bg-area px-[5cqw] py-[2.4cqw] text-area-foreground">
            <div className="flex items-center gap-[2.2cqw]">
              <Leaf className="h-[7cqw] w-[7cqw] shrink-0" aria-hidden="true" />
              <div className="leading-none">
                <p className="headline text-[6.6cqw]">REPROCANN</p>
                <p className="mt-[0.6cqw] text-[2.4cqw] font-semibold opacity-80">
                  Registro del Programa de Cannabis
                </p>
              </div>
            </div>
            <span className="rounded-full border border-current px-[2.4cqw] py-[0.9cqw] text-[2.2cqw] font-bold uppercase tracking-wider">
              Ejemplo
            </span>
          </div>

          {/* Datos y QR */}
          <div className="flex flex-1 items-center gap-[4cqw] px-[5cqw]">
            <dl className="grid flex-1 grid-cols-2 gap-x-[3cqw] gap-y-[2cqw]">
              <div className="col-span-2">
                <dt className="text-[2.4cqw] text-muted-foreground">Nombre y apellido</dt>
                <dd className="text-[3.6cqw] font-bold leading-tight text-foreground">
                  Nombre Apellido
                </dd>
              </div>
              <div>
                <dt className="text-[2.4cqw] text-muted-foreground">Documento</dt>
                <dd className="text-[3.6cqw] font-bold leading-tight text-foreground">
                  00.000.000
                </dd>
              </div>
              <div>
                <dt className="text-[2.4cqw] text-muted-foreground">Vigente hasta</dt>
                <dd className="text-[3.6cqw] font-bold leading-tight text-foreground">
                  00/00/0000
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-[2.4cqw] text-muted-foreground">Dirección de cultivo</dt>
                <dd className="text-[3.6cqw] font-bold leading-tight text-foreground">
                  Calle Ejemplo 123 · Mendoza
                </dd>
              </div>
            </dl>
            <div className="flex flex-col items-center gap-[1cqw]">
              <div className="flex h-[19cqw] w-[19cqw] items-center justify-center rounded-[2cqw] border border-dashed border-area/60 bg-background/60">
                <QrCode className="h-[11cqw] w-[11cqw] text-area/70" aria-hidden="true" />
              </div>
              <span className="text-[2.1cqw] text-muted-foreground">QR de control</span>
            </div>
          </div>

          {/* Franja de autorización */}
          <div className="border-t border-area/40 bg-area/15 px-[5cqw] py-[2.2cqw]">
            <p className="flex items-center gap-[1.6cqw] whitespace-nowrap text-[2.45cqw] font-bold text-area">
              <CheckCircle2 className="h-[4cqw] w-[4cqw] shrink-0" aria-hidden="true" />
              Paciente autorizado para cultivo controlado y transporte
            </p>
            <p className="mt-[0.6cqw] whitespace-nowrap pl-[5.6cqw] text-[2.2cqw] text-muted-foreground">
              Hasta 9 plantas en floración · Transporte: 40 g de flores o 6 goteros de 30 ml
            </p>
          </div>

          {/* Sello */}
          <span
            className="headline pointer-events-none absolute left-[42%] top-[54%] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] select-none text-[16cqw] leading-none text-foreground/[0.07]"
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
