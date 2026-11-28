import { useEffect, useRef } from "react";

/**
 * Capas vivas del fondo de tela (van dentro de .fondo-fnx, entre la tela y los resplandores del área):
 *  - una luz suave que sigue al mouse o al dedo y se apaga sola cuando dejás de tocar;
 *  - un barrido de luz fina del color del área que cruza cada tanto (solo CSS).
 * La luz se acerca al punto con suavidad en un solo bucle que descansa cuando llega.
 * Con "reducir movimiento" no se monta nada que se mueva, y con la pestaña oculta todo se pausa.
 */
export function FondoVivo() {
  const luzRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const luz = luzRef.current;
    if (!luz || typeof window === "undefined") return;

    const onVisibility = () => document.body.classList.toggle("paused", document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (reduce?.matches) {
      return () => document.removeEventListener("visibilitychange", onVisibility);
    }

    let tx = window.innerWidth * 0.7;
    let ty = window.innerHeight * 0.3;
    let x = tx;
    let y = ty;
    let raf = 0;
    let last = 0;
    let idle = 0;
    let on = false;

    const paint = () => {
      luz.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };
    const tick = (now: number) => {
      const dt = Math.min(100, now - (last || now));
      last = now;
      // Suavizado independiente de los Hz de la pantalla (referencia 60 fps).
      const f = 1 - Math.pow(1 - 0.09, dt / 16.667);
      x += (tx - x) * f;
      y += (ty - y) * f;
      paint();
      if (Math.abs(tx - x) < 0.5 && Math.abs(ty - y) < 0.5) {
        raf = 0;
        last = 0;
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    const show = (cx: number, cy: number, touch: boolean) => {
      tx = cx;
      ty = cy;
      if (!on) {
        on = true;
        luz.classList.add("on");
      }
      if (!raf) raf = requestAnimationFrame(tick);
      window.clearTimeout(idle);
      // En el celular la luz se apaga sola al rato; con mouse queda donde lo dejaste.
      if (touch) {
        idle = window.setTimeout(() => {
          on = false;
          luz.classList.remove("on");
        }, 1800);
      }
    };

    const onPointer = (e: PointerEvent) => show(e.clientX, e.clientY, e.pointerType !== "mouse");
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) show(t.clientX, t.clientY, true);
    };
    const onLeave = () => {
      on = false;
      luz.classList.remove("on");
    };

    paint();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("touchmove", onTouch);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <span ref={luzRef} className="fondo-luz" aria-hidden="true" />
      <span className="fondo-barrido" aria-hidden="true" />
    </>
  );
}
