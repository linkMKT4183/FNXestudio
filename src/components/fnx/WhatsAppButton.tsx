import { Button, type ButtonProps } from "@/components/ui/button";
import { buildWhatsAppLink, type WhatsAppTopic } from "@/config/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { trackEvent } from "@/lib/track";

interface Props {
  topic: WhatsAppTopic;
  label?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
  showIcon?: boolean;
}

/** Botón de WhatsApp con mensaje precargado. Sin número: "WhatsApp próximamente" deshabilitado. */
export function WhatsAppButton({
  topic,
  label = "Escribinos por WhatsApp",
  size = "lg",
  variant = "area",
  className,
  showIcon = true,
}: Props) {
  const href = buildWhatsAppLink(topic);
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
        {showIcon ? <WhatsAppIcon className="h-5 w-5 shrink-0" /> : null}
        WhatsApp próximamente
      </Button>
    );
  }
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { topic, page: window.location.pathname })}
      >
        {showIcon ? <WhatsAppIcon className="h-5 w-5 shrink-0" /> : null}
        {label}
        <span className="sr-only"> (se abre WhatsApp en una pestaña nueva)</span>
      </a>
    </Button>
  );
}
