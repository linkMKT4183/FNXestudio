import { useEffect } from "react";

/**
 * Efectos que necesitan saber dónde está el cursor:
 *  - las tarjetas con clase .spot se iluminan donde pasa el mouse;
 *  - los botones .btn-cta largan una onda desde el punto que se toca.
 * Un solo oyente para toda la web; no hace nada si la persona pidió reducir movimiento.
 */
export function EfectosGlobales() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const el = t.closest<HTMLElement>(".spot");
      if (!el) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const el = t.closest<HTMLElement>(".btn-cta");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--rx", `${e.clientX - r.left}px`);
      el.style.setProperty("--ry", `${e.clientY - r.top}px`);
      el.classList.remove("rip");
      void el.offsetWidth;
      el.classList.add("rip");
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);
  return null;
}
