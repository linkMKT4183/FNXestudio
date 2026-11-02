import { useId, useState, type ReactNode } from "react";
import { Plus, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

/** Tarjeta que se da vuelta al tocarla. */
export function FlipCard({
  front,
  back,
  label,
  className,
}: {
  front: ReactNode;
  back: ReactNode;
  label: string;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      aria-pressed={flipped}
      aria-label={`${label}. ${flipped ? "Tocá para volver" : "Tocá para ver más"}`}
      className={cn("flip-scene block w-full rounded-2xl text-left", className)}
    >
      <div className={cn("flip-inner h-56", flipped && "is-flipped")}>
        <div
          className="flip-face flex flex-col justify-between rounded-2xl border border-border bg-card p-6"
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
  defaultOpen = false,
}: {
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
        <span className="flex flex-col gap-2">
          {kicker}
          <span className="text-xl font-bold text-foreground">{title}</span>
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
