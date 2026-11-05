import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
  type RefObject,
} from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import logoCrema from "@/assets/brand/fnx-logo-crema.png";

/** Devuelve true la primera vez que el elemento entra en pantalla. */
export function useInView<T extends Element = HTMLElement>(
  threshold = 0.12,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/** Logo original de FNX (firma "Fnx" en crema). El tamaño sigue al font-size de `className`. */
export function Logo({ className, as: Tag = "span" }: { className?: string; as?: ElementType }) {
  return (
    <Tag className={cn("inline-block select-none leading-none", className)}>
      <img
        src={logoCrema}
        alt="Fnx"
        width={986}
        height={551}
        className="block h-[1.1em] w-auto"
        draggable={false}
      />
    </Tag>
  );
}

/** "Uno que se destaca entre muchos": 4 piezas grafito y 1 que se enciende al aparecer. */
export function Pieces({
  lit = 3,
  size = "md",
  className,
}: {
  lit?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [ref, on] = useInView<HTMLDivElement>(0.4);
  const sizes = {
    sm: { piece: "h-5 w-3.5 rounded-[6px]", gap: "gap-1.5" },
    md: { piece: "h-12 w-8 rounded-[12px]", gap: "gap-2.5" },
    lg: { piece: "h-20 w-12 rounded-[18px] sm:h-28 sm:w-16", gap: "gap-3" },
  }[size];
  return (
    <div ref={ref} className={cn("flex items-end", sizes.gap, className)} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            sizes.piece,
            "block border transition-[background-color,border-color,transform] duration-700 ease-out",
            i === lit && on
              ? "piece-lit -translate-y-1 border-transparent"
              : "border-border bg-card",
          )}
          style={i === lit ? { transitionDelay: "350ms" } : undefined}
        />
      ))}
    </div>
  );
}

/** Fade + subida al entrar en pantalla. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const [ref, visible] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** Recuadro destacado con una idea clave (sin etiqueta). */
export function TenSeconds({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-l-4 border-border border-l-area bg-card px-5 py-4",
        className,
      )}
    >
      <p className="text-sm font-medium text-foreground sm:text-base">{children}</p>
    </div>
  );
}

/** Titular Anton con la última palabra/frase en el color de acento. */
export function Headline({
  lead,
  accent,
  as: Tag = "h2",
  className,
  id,
}: {
  lead?: string | undefined;
  accent: string;
  as?: ElementType;
  className?: string;
  id?: string | undefined;
}) {
  const [ref, visible] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      id={id}
      className={cn("headline headline-reveal text-foreground", visible && "is-visible", className)}
    >
      {lead ? <>{lead} </> : null}
      <span className="text-area">{accent}</span>
    </Tag>
  );
}

/** Sección estándar con eyebrow, titular y, si suma algo, recuadro "En resumen". */
export function Section({
  id,
  eyebrow,
  lead,
  accent,
  tldr,
  children,
  className,
  footer,
}: {
  id?: string;
  eyebrow?: string;
  lead?: string;
  accent: string;
  tldr?: string;
  children?: ReactNode;
  className?: string;
  footer?: ReactNode;
}) {
  const headingId = id ? `${id}-titulo` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28", className)}
    >
      <Reveal className="flex flex-col gap-6">
        {eyebrow ? <p className="eyebrow text-muted-foreground">{eyebrow}</p> : null}
        <Headline
          id={headingId}
          lead={lead}
          accent={accent}
          className="text-[2.6rem] min-[420px]:text-5xl sm:text-6xl lg:text-7xl"
        />
        {tldr ? <TenSeconds className="max-w-3xl">{tldr}</TenSeconds> : null}
      </Reveal>
      {children ? <div className="mt-12">{children}</div> : null}
      {footer ? <div className="mt-12">{footer}</div> : null}
    </section>
  );
}

/** Etiqueta chica. */
export function Tag({
  children,
  className,
  tone = "area",
}: {
  children: ReactNode;
  className?: string;
  tone?: "area" | "neutral" | "naranja" | "azul" | "verde" | "amarillo";
}) {
  const tones = {
    area: "bg-area text-area-foreground",
    neutral: "border border-border text-muted-foreground",
    naranja: "bg-fnx-naranja text-fnx-negro",
    azul: "bg-fnx-azul text-fnx-negro",
    verde: "bg-fnx-verde text-fnx-negro",
    amarillo: "bg-fnx-amarillo text-fnx-negro",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Ícono de la marca en un recuadro. "solid": fondo del color del área. "outline": borde y ícono en color. "neutral": en crema. */
export function IconBadge({
  icon: Icon,
  variant = "solid",
  size = "md",
  className,
}: {
  icon: LucideIcon;
  variant?: "solid" | "outline" | "neutral";
  size?: "sm" | "md";
  className?: string;
}) {
  const variants = {
    solid: "bg-area text-area-foreground",
    outline: "border border-area text-area",
    neutral: "border border-border text-foreground",
  };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl",
        size === "sm" ? "h-9 w-9" : "h-12 w-12",
        variants[variant],
        className,
      )}
      aria-hidden="true"
    >
      <Icon className={size === "sm" ? "h-4 w-4" : "h-6 w-6"} strokeWidth={1.75} />
    </span>
  );
}
