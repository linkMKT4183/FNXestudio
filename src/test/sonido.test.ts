import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { __resetSonido, getSoundEnabled, playSound, setSoundEnabled } from "@/lib/sonido";

let creados = 0;
let osciladores = 0;

function nodo(): Record<string, unknown> {
  const p = { value: 0, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() };
  return {
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    gain: p,
    frequency: p,
    threshold: p,
    knee: p,
    ratio: p,
    attack: p,
    release: p,
    Q: p,
    type: "",
    buffer: null,
  };
}

class FakeAudioContext {
  state = "running";
  currentTime = 0;
  sampleRate = 8000;
  destination = {};
  constructor() {
    creados += 1;
  }
  resume = vi.fn();
  createDynamicsCompressor = () => nodo();
  createGain = () => nodo();
  createBiquadFilter = () => nodo();
  createBufferSource = () => nodo();
  createBuffer = (_c: number, n: number) => ({ getChannelData: () => new Float32Array(n) });
  createOscillator = () => {
    osciladores += 1;
    return nodo();
  };
}

beforeEach(() => {
  creados = 0;
  osciladores = 0;
  window.localStorage.clear();
  __resetSonido();
  Object.defineProperty(window, "AudioContext", {
    writable: true,
    configurable: true,
    value: FakeAudioContext,
  });
});

afterEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("sonido", () => {
  it("está apagado por defecto y no crea el AudioContext", () => {
    expect(getSoundEnabled()).toBe(false);
    playSound("click");
    playSound("notif");
    expect(creados).toBe(0);
  });

  it("al activarlo crea el contexto, suena el aviso y guarda la elección", () => {
    setSoundEnabled(true);
    expect(creados).toBe(1);
    expect(osciladores).toBeGreaterThan(0);
    expect(window.localStorage.getItem("fnx-sonido")).toBe("1");
    expect(getSoundEnabled()).toBe(true);
  });

  it("respeta lo guardado en localStorage", () => {
    window.localStorage.setItem("fnx-sonido", "1");
    __resetSonido();
    expect(getSoundEnabled()).toBe(true);
  });

  it("al silenciarlo deja de sonar", () => {
    setSoundEnabled(true);
    const antes = osciladores;
    setSoundEnabled(false);
    playSound("pop", 2);
    expect(osciladores).toBe(antes);
    expect(window.localStorage.getItem("fnx-sonido")).toBe("0");
  });

  it("con reducir movimiento no suenan hover ni navegación, pero sí el clic", () => {
    setSoundEnabled(true);
    vi.spyOn(window, "matchMedia").mockImplementation(
      (q: string) => ({ matches: q.includes("reduce"), media: q }) as MediaQueryList,
    );
    const antes = osciladores;
    playSound("hover");
    playSound("nav");
    expect(osciladores).toBe(antes);
    playSound("click");
    expect(osciladores).toBeGreaterThan(antes);
  });

  it("el hover no suena más de una vez cada 120 ms", () => {
    setSoundEnabled(true);
    const antes = osciladores;
    playSound("hover");
    const unaVez = osciladores;
    playSound("hover");
    expect(unaVez).toBeGreaterThan(antes);
    expect(osciladores).toBe(unaVez);
  });
});
