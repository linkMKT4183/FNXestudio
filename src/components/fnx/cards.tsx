import { useId, useState, type ReactNode } from "react";
import { Plus, RotateCw, type LucideIcon } from "lucide-react";
import { IconBadge } from "./primitives";
import { cn } from "@/lib/utils";

/** Tarjeta que se da vuelta al tocarla. Opcionalmente lleva una foto arriba en el frente. */
export function FlipCard({
  front,
  back,
  label,
  className,
  media,
  heightClass = "h-56",
}: {
  front: ReactNode;
  back: ReactNode;
  label: string;
  className?: string;
  media?: ReactNode;
  heightClass?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      aria-pressed={flipped}
      aria-label={`${label}. ${flipped ? "Tocá para volver" : "Tocá para ver más"}`}
      className={cn("flip-scene group block w-full rounded-2xl text-left", className)}
    >
      <div className={cn("flip-inner", heightClass, flipped && "is-flipped")}>
        {media ? (
          <div
            className="flip-face flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors group-hover:border-area"
            aria-hidden={flipped}
          >
            <div className="aspect-[16/9] shrink-0 overflow-hidden border-b border-border">
              {media}
            </div>
            <div className="flex flex-1 flex-col justify-between gap-4 p-6">
              {front}
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <RotateCw className="h-3.5 w-3.5" aria-hidden="true" /> Tocá para dar vuelta
              </span>
            </div>
          </div>
        ) : null}
        <div
          className={cn(
            "flip-face flex flex-col justify-between rounded-2xl border border-border bg-card p-6",
            media && "hidden",
          )}
          aria-hidden={flipped}
        >
          {front}
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <RotateCw className="h-3.5 w-3.5" aria-hidden="true" /> Tocá para dar vuelta
          </span>
        </div>
        <div
          className="flip-face flip-back flex flex-col justify-center rounded-2xl bg-area p-6 text-area-foreground"
          aria-hidden={!flipped}
        >
          {back}
        </div>
      </div>
    </button>
  );
}

/** Tarjeta que se abre al tocarla. Opcionalmente lleva una foto arriba. */
export function ExpandCard({
  title,
  kicker,
  children,
  className,
  media,
  icon,
  defaultOpen = false,
}: {
  icon?: LucideIcon;
  title: ReactNode;
  kicker?: ReactNode;
  children: ReactNode;
  className?: string;
  media?: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div
      className={cn(
        "group overflow-hidden rounded-2xl border bg-card transition-[border-color,transform,box-shadow] duration-300",
        open ? "border-area" : "border-border hover:border-muted-foreground",
        media && "hover:-translate-y-1 hover:shadow-glow-soft",
        className,
      )}
    >
      {media ? (
        <div className="aspect-[16/9] overflow-hidden border-b border-border">{media}</div>
      ) : null}
      <button
        type="button"
        className="flex w-full items-start justify-between gap-4 rounded-2xl p-6 text-left"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-start gap-4">
          {icon ? <IconBadge icon={icon} /> : null}
          <span className="flex flex-col gap-2">
            {kicker}
            <span className="text-xl font-bold text-foreground">{title}</span>
          </span>
        </span>
        <span
          className={cn(
            "mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all",
            open
              ? "rotate-45 border-area bg-area text-area-foreground"
              : "border-border text-foreground group-hover:border-foreground",
          )}
          aria-hidden="true"
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <div
        id={id}
        role="region"
        hidden={!open}
        className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground"
      >
        {children}
      </div>
    </div>
  );
}

/** Tarjeta de recurso gratuito: foto a la izquierda, texto y botón a la derecha. */
export function ResourceCard({
  media,
  title,
  text,
  action,
}: {
  media: ReactNode;
  title: ReactNode;
  text: ReactNode;
  action: ReactNode;
}) {
  return (
    <div className="group grid overflow-hidden rounded-3xl border border-border bg-card transition-[border-color,box-shadow] duration-300 hover:border-area hover:shadow-glow-soft md:grid-cols-[2fr_3fr]">
      <div className="aspect-[16/9] overflow-hidden border-b border-border md:aspect-auto md:border-b-0 md:border-r">
        {media}
      </div>
      <div className="flex flex-col items-start justify-center gap-6 p-8 sm:p-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{text}</p>
        </div>
        {action}
      </div>
    </div>
  );
}
