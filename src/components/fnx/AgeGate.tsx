import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo, Pieces } from "./primitives";

const KEY = "fnx-mayor-18";

/** Aviso de edad a pantalla completa para FNX Salud. */
export function AgeGate() {
  const [status, setStatus] = useState<"unknown" | "ask" | "ok">("unknown");
  const navigate = useNavigate();
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ok = false;
    try {
      ok = window.localStorage.getItem(KEY) === "si";
    } catch {
      ok = false;
    }
    setStatus(ok ? "ok" : "ask");
  }, []);

  useEffect(() => {
    if (status === "ok") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    if (status === "ask") acceptRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [status]);

  if (status === "ok") return null;

  if (status === "unknown") {
    return <div className="fixed inset-0 z-50 bg-background" aria-hidden="true" />;
  }

  const accept = () => {
    try {
      window.localStorage.setItem(KEY, "si");
    } catch {
      /* sin almacenamiento disponible */
    }
    setStatus("ok");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="aviso-edad-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background px-6"
    >
      <div className="flex max-w-xl flex-col items-center gap-8 text-center">
        <Logo className="text-7xl" />
        <Pieces lit={2} />
        <h1 id="aviso-edad-titulo" className="headline text-4xl text-foreground sm:text-5xl">
          Este contenido es para <span className="text-area">mayores de 18 años.</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Información de uso medicinal y responsable.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button ref={acceptRef} variant="area" size="lg" onClick={accept}>
            Soy mayor de 18
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate({ to: "/" })}>
            Salir
          </Button>
        </div>
      </div>
    </div>
  );
}
