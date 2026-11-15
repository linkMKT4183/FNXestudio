/**
 * Efectos de sonido de la web de FNX.
 * Todo se sintetiza con la Web Audio API (sin archivos de audio). Está APAGADO por defecto: la persona lo activa con el
 * botón de la cabecera y la elección queda guardada. El AudioContext se crea recién cuando se activa (un gesto del usuario).
 */
import { useSyncExternalStore } from "react";
import { trackEvent } from "@/lib/track";

export type SoundName =
  "hover" | "click" | "nav" | "pop" | "popDown" | "correcto" | "suave" | "notif" | "on";

const KEY = "fnx-sonido";
/** Sonidos de "movimiento": no suenan si la persona pidió reducir movimiento. */
const MOVIMIENTO = new Set<SoundName>(["hover", "nav"]);

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = false;
let loaded = false;
let lastHover = 0;
const listeners = new Set<() => void>();

function load(): void {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    enabled = window.localStorage.getItem(KEY) === "1";
  } catch {
    enabled = false;
  }
}

function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function emit(): void {
  listeners.forEach((l) => l());
}

function ensureCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 12;
    comp.ratio.value = 8;
    comp.attack.value = 0.003;
    comp.release.value = 0.15;
    master = ctx.createGain();
    master.gain.value = 0.18;
    master.connect(comp);
    comp.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Un tono con caída exponencial (frecuencia f0 → f1). */
function tono(
  c: AudioContext,
  t0: number,
  f0: number,
  f1: number,
  dur: number,
  vol: number,
  tipo: OscillatorType = "sine",
): void {
  if (!master) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = tipo;
  o.frequency.setValueAtTime(f0, t0);
  o.frequency.exponentialRampToValueAtTime(Math.max(1, f1), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g);
  g.connect(master);
  o.start(t0);
  o.stop(t0 + dur + 0.03);
}

/** Aire filtrado que barre de f0 a f1 (barrido tonal limpio, no ruido blanco). */
function barrido(
  c: AudioContext,
  t0: number,
  f0: number,
  f1: number,
  dur: number,
  vol: number,
): void {
  if (!master) return;
  const n = Math.ceil(c.sampleRate * dur);
  const buf = c.createBuffer(1, n, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 1.4;
  bp.frequency.setValueAtTime(f0, t0);
  bp.frequency.exponentialRampToValueAtTime(f1, t0 + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + dur * 0.4);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(bp);
  bp.connect(g);
  g.connect(master);
  src.start(t0);
}

/** Reproduce un efecto. `n` sube el tono de "pop" con cada señal marcada. Si el sonido está apagado, no hace nada. */
export function playSound(name: SoundName, n = 0): void {
  load();
  if (!enabled) return;
  if (MOVIMIENTO.has(name) && reducedMotion()) return;
  if (name === "hover") {
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    if (now - lastHover < 120) return;
    lastHover = now;
  }
  const c = ensureCtx();
  if (!c || !master) return;
  const t = c.currentTime + 0.005;
  switch (name) {
    case "hover":
      tono(c, t, 1800, 1500, 0.05, 0.12);
      break;
    case "click":
      tono(c, t, 900, 520, 0.07, 0.5, "triangle");
      barrido(c, t, 3000, 6000, 0.03, 0.12);
      break;
    case "nav":
      barrido(c, t, 400, 3200, 0.28, 0.35);
      tono(c, t, 500, 1100, 0.25, 0.12);
      break;
    case "pop": {
      const f = 520 + Math.min(n, 5) * 70;
      tono(c, t, f, f * 2.2, 0.09, 0.5);
      break;
    }
    case "popDown":
      tono(c, t, 260, 140, 0.12, 0.5);
      break;
    case "correcto":
      tono(c, t, 1047, 1047, 0.12, 0.35);
      tono(c, t + 0.1, 1568, 1568, 0.4, 0.35);
      tono(c, t + 0.1, 3136, 3136, 0.3, 0.08);
      break;
    case "suave":
      tono(c, t, 880, 880, 0.3, 0.25);
      break;
    case "notif":
      tono(c, t, 1319, 1319, 0.14, 0.4);
      tono(c, t + 0.14, 1760, 1760, 0.5, 0.4);
      break;
    case "on":
      tono(c, t, 660, 990, 0.18, 0.4);
      tono(c, t + 0.1, 1320, 1320, 0.35, 0.3);
      break;
  }
}

export function getSoundEnabled(): boolean {
  load();
  return enabled;
}

/** Activa o apaga el sonido (y lo guarda). Al activar se crea el AudioContext, porque viene de un click. */
export function setSoundEnabled(value: boolean): void {
  load();
  enabled = value;
  try {
    window.localStorage.setItem(KEY, value ? "1" : "0");
  } catch {
    /* sin almacenamiento: el estado vale solo para esta visita */
  }
  if (value) {
    ensureCtx();
    playSound("on");
  }
  trackEvent("sonido_toggle", { activo: value });
  emit();
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useSoundEnabled(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => getSoundEnabled(),
    () => false,
  );
}

/** Solo para tests. */
export function __resetSonido(): void {
  ctx = null;
  master = null;
  enabled = false;
  loaded = false;
  lastHover = 0;
  listeners.clear();
}
