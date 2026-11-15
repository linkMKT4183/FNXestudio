import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Volume2, VolumeX } from "lucide-react";
import { playSound, setSoundEnabled, useSoundEnabled } from "@/lib/sonido";
import { cn } from "@/lib/utils";

/** Botón de altavoz de la cabecera. Apagado por defecto; la elección se guarda. */
export function SoundToggle({ className }: { className?: string }) {
  const on = useSoundEnabled();
  return (
    <button
      type="button"
      data-sonido="off"
      aria-pressed={on}
      aria-label={on ? "Silenciar sonido" : "Activar sonido"}
      title={on ? "Silenciar sonido" : "Activar sonido"}
      onClick={() => setSoundEnabled(!on)}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-full border px-3 text-sm font-semibold transition-[border-color,color,background-color] duration-200 hover:border-area",
        on ? "border-area text-area" : "border-border text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {on ? (
        <Volume2 className="h-5 w-5" aria-hidden="true" />
      ) : (
        <VolumeX className="h-5 w-5" aria-hidden="true" />
      )}
      <span className="hidden lg:inline">Sonido</span>
    </button>
  );
}

/**
 * Un solo oyente para toda la web: clic en links y botones, hover en los botones principales ([data-sonido="hover"])
 * y el barrido al cambiar de página. Los botones con data-sonido="off" no suenan (el botón de sonido tiene el suyo).
 */
export function SoundDelegate() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const primera = useRef(true);

  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    playSound("nav");
  }, [pathname]);

  useEffect(() => {
    const buscar = (e: Event): HTMLElement | null => {
      const t = e.target;
      if (!(t instanceof Element)) return null;
      return t.closest<HTMLElement>("a, button, [data-sonido]");
    };
    const onClick = (e: Event) => {
      const el = buscar(e);
      if (!el || el.dataset["sonido"] === "off") return;
      const href = el instanceof HTMLAnchorElement ? el.href : "";
      playSound(href.includes("wa.me") ? "notif" : "click");
    };
    const puedeHover =
      typeof window.matchMedia === "function" && window.matchMedia("(hover: hover)").matches;
    const onOver = (e: Event) => {
      const el = buscar(e);
      if (!el || el.dataset["sonido"] !== "hover") return;
      const from = (e as MouseEvent).relatedTarget;
      if (from instanceof Node && el.contains(from)) return;
      playSound("hover");
    };
    document.addEventListener("click", onClick);
    if (puedeHover) document.addEventListener("mouseover", onOver);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return null;
}
