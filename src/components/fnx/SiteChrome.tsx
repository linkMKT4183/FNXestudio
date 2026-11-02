import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./primitives";
import { WhatsAppButton } from "./WhatsAppButton";
import type { WhatsAppTopic } from "@/config/site";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/estudio", label: "Estudio" },
  { to: "/consultoria", label: "Consultoría" },
  { to: "/salud", label: "Salud" },
  { to: "/noticias", label: "Noticias" },
  { to: "/marca", label: "Marca" },
] as const;

export type Area = "estudio" | "consultoria" | "salud" | "noticias";

export function areaFromPath(pathname: string): Area {
  if (pathname.startsWith("/consultoria")) return "consultoria";
  if (pathname.startsWith("/salud")) return "salud";
  if (pathname.startsWith("/noticias")) return "noticias";
  return "estudio";
}

function topicFromPath(pathname: string): WhatsAppTopic {
  if (pathname.startsWith("/consultoria")) return "consultoria";
  if (pathname.startsWith("/salud")) return "salud";
  if (pathname.startsWith("/noticias")) return "novedades";
  return "marca";
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const topic = topicFromPath(pathname);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link to="/" className="rounded-md px-1" aria-label="Fnx, ir al inicio">
          <Logo className="block pt-4 text-[2.6rem] sm:text-5xl" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground", "aria-current": "page" }}
            >
              {item.label}
            </Link>
          ))}
          <WhatsAppButton
            topic={topic}
            label="Escribinos"
            size="default"
            className="ml-3"
          />
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="menu-movil"
        className={cn("border-t border-border bg-background lg:hidden", open ? "block" : "hidden")}
      >
        <nav aria-label="Menú móvil" className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="headline rounded-xl px-2 py-3 text-4xl text-muted-foreground"
              activeProps={{ className: "text-foreground", "aria-current": "page" }}
            >
              {item.label}
            </Link>
          ))}
          <WhatsAppButton topic={topic} label="Escribinos" className="mt-4 w-full" />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-14 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3">
          <Logo className="text-7xl" />
          <p className="text-sm text-muted-foreground">Mendoza, Argentina</p>
        </div>
        <nav aria-label="Pie de página" className="flex flex-wrap gap-x-6 gap-y-3">
          <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
            Inicio
          </Link>
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-6 text-xs text-muted-foreground sm:px-8">
          © 2026 Fénix Creativo
        </p>
      </div>
    </footer>
  );
}
