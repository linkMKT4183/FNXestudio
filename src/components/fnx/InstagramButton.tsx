import { Instagram } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  INSTAGRAM_ACCOUNTS,
  buildInstagramLink,
  type InstagramAccountId,
} from "@/config/site";
import { cn } from "@/lib/utils";

/** Botón al perfil de Instagram. Sin usuario cargado: "Instagram próximamente" deshabilitado. */
export function InstagramButton({
  account,
  label,
  size = "lg",
  variant = "outline",
  className,
}: {
  account: InstagramAccountId;
  label?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  const acc = INSTAGRAM_ACCOUNTS[account];
  const href = buildInstagramLink(account);
  const text = label ?? (acc.handle ? `@${acc.handle}` : acc.name);
  if (!href) {
    return (
      <Button
        type="button"
        variant="disabled"
        size={size}
        disabled
        aria-disabled="true"
        className={cn(className)}
      >
        <Instagram aria-hidden="true" />
        {acc.name} · próximamente
      </Button>
    );
  }
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Instagram aria-hidden="true" />
        {text}
        <span className="sr-only"> (abre Instagram en una pestaña nueva)</span>
      </a>
    </Button>
  );
}

/** Bloque "Seguinos en Instagram": las dos cuentas de FNX, que publican en colaboración. */
export function InstagramDuo({ className }: { className?: string }) {
  const ids = Object.keys(INSTAGRAM_ACCOUNTS) as InstagramAccountId[];
  return (
    <div className={cn("grid gap-4 md:grid-cols-2", className)}>
      {ids.map((id) => {
        const acc = INSTAGRAM_ACCOUNTS[id];
        return (
          <div
            key={id}
            className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-area"
          >
            <div className="flex items-center gap-4">
              <span
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-area text-area-foreground"
                aria-hidden="true"
              >
                <Instagram className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">{acc.name}</span>
                <span className="text-sm text-muted-foreground">{acc.covers}</span>
              </div>
            </div>
            <InstagramButton account={id} size="default" className="self-start" />
          </div>
        );
      })}
    </div>
  );
}
