import { Mail } from "lucide-react";
import { trackEvent } from "@/lib/track";
import { Button, type ButtonProps } from "@/components/ui/button";
import { buildMailtoLink, type EmailAccountId, type EmailTopic } from "@/config/site";

/** Botón que abre el correo con el mail de FNX y un asunto precargado. */
export function EmailButton({
  account,
  topic,
  label = "Escribinos por mail",
  size = "lg",
  variant = "outline",
  className,
}: {
  account: EmailAccountId;
  topic: EmailTopic;
  label?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={buildMailtoLink(account, topic)}
        onClick={() => trackEvent("email_click", { account, topic })}
      >
        <Mail aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}
