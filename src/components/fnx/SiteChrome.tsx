import { Link, useRouterState } from "@tanstack/react-router";
import { Instagram, Mail, Menu, Scale, X } from "lucide-react";
import {
  EMAILS,
  INSTAGRAM_ACCOUNTS,
  PARTNERS,
  buildInstagramLink,
  buildMailtoLink,
  buildPartnerInstagramLink,
  buildWhatsAppLink,
  type InstagramAccountId,
} from "@/config/site";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Logo } from "./primitives";
import { WhatsAppButton } from "./WhatsAppButton";
import type { WhatsAppTopic } from "@/config/site";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/track";

const NAV = [
  { to: "/estudio", label: "Estudio" },
  { to: "/consultoria", label: "Consultoría" },
  { to: "/salud", label: "Salud" },
  { to: "/noticias", label: "Noticias" },
  { to: "/red", label: "Profesionales" },
] as const;

const NAV_AREA: Record<string, Area | undefined> = {
  "/estudio": "estudio",
  "/consultoria": "consultoria",
  "/salud": "salud",
  "/noticias": "noticias",
};

/** Sticky row of section chips under the header, on every screen size (phone, tablet, desktop). */
export function MobileNavBlocks() {
  // The chips "beat" softly (see .fnx-chip-pulse in styles.css) to invite people to switch
  // section. The beat stops once the visitor scrolls the row or taps a chip.
  const [calm, setCalm] = useState(false);
  return (
    <div className="sticky top-16 z-30 h-[60px] border-b border-border bg-background/95 backdrop-blur-md sm:top-20">
      <nav
        aria-label="Secciones"
        className="no-scrollbar h-full overflow-x-auto"
        onScroll={() => setCalm(true)}
      >
        <ul className="mx-auto flex h-full w-max items-center gap-2 px-4 pr-10 md:gap-3 md:pr-4">
          {NAV.map((item, i) => {
            const area = NAV_AREA[item.to];
            return (
              <li key={item.to} data-area={area}>
                <Link
                  to={item.to}
                  onClick={() => {
                    setCalm(true);
                    trackEvent("nav_click", { section: item.label, source: "chips" });
                  }}
                  style={
                    {
                      "--chip-glow": area ? "var(--area)" : "var(--fnx-crema)",
                      "--chip-delay": `${i * 0.45}s`,
                    } as CSSProperties
                  }
                  className={cn(
                    "relative flex h-11 items-center gap-2 whitespace-nowrap rounded-full border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-[var(--chip-glow)] md:px-5",
                    !calm && "fnx-chip-pulse",
                  )}
                  activeProps={{
                    className: cn(
                      "border-transparent",
                      area ? "bg-area text-area-foreground" : "bg-fnx-crema text-fnx-negro",
                    ),
                    "aria-current": "page",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      area ? "bg-area" : "bg-fnx-crema",
                      "[[aria-current=page]_&]:bg-fnx-negro",
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent md:hidden"
      />
    </div>
  );
}

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

        <WhatsAppButton
          topic={topic}
          label="Escribinos"
          size="default"
          className="hidden md:inline-flex"
        />

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground md:hidden"
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
        className={cn("border-t border-border bg-background md:hidden", open ? "block" : "hidden")}
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
          <p className="text-sm text-muted-foreground">
            Sedes en Mendoza y San Juan · Trabajamos en todo el país y en el exterior
          </p>
          <SocialLinks />
          <a
            href={buildPartnerInstagramLink("aro")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-3 self-start rounded-2xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            <Scale className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              Partner jurídico:{" "}
              <strong className="font-semibold text-foreground">{PARTNERS.aro.name}</strong>
            </span>
            <span className="sr-only"> (abre Instagram en una pestaña nueva)</span>
          </a>
        </div>
        <nav aria-label="Pie de página" className="flex flex-wrap gap-x-6 gap-y-3">
          <Link
            to="/"
            className="text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
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

/** Contacto del pie: WhatsApp, los dos correos y las dos cuentas de Instagram. */
function SocialLinks() {
  const wa = buildWhatsAppLink("marca");
  const ids = Object.keys(INSTAGRAM_ACCOUNTS) as InstagramAccountId[];
  const base =
    "inline-flex h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold text-muted-foreground transition-colors hover:border-foreground hover:text-foreground";
  return (
    <ul className="mt-2 flex flex-wrap gap-2" aria-label="Redes y contacto">
      {wa ? (
        <li>
          <a href={wa} target="_blank" rel="noopener noreferrer" className={base}>
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </li>
      ) : null}
      <li>
        <a href={buildMailtoLink("estudio", "general")} className={base}>
          <Mail className="h-4 w-4" aria-hidden="true" />
          {EMAILS.estudio}
        </a>
      </li>
      <li>
        <a href={buildMailtoLink("salud", "salud")} className={base}>
          <Mail className="h-4 w-4" aria-hidden="true" />
          {EMAILS.salud}
        </a>
      </li>
      {ids.map((id) => {
        const href = buildInstagramLink(id);
        const acc = INSTAGRAM_ACCOUNTS[id];
        return (
          <li key={id}>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
                <Instagram className="h-4 w-4" aria-hidden="true" />
                {acc.name}
              </a>
            ) : (
              <span className={`${base} cursor-default opacity-60`} title="Instagram próximamente">
                <Instagram className="h-4 w-4" aria-hidden="true" />
                {acc.name}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
