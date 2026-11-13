import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Noticias está pausada hasta definir qué noticias se suben y cómo se plantea el sector.
 * La página completa sigue en el historial de git (commit c265d90, src/routes/noticias.tsx);
 * los datos siguen en src/data/noticias.ts y la portada en components/fnx/NewsHero.tsx.
 * Para volver a publicarla: restaurar ese archivo y sumar "/noticias" a NAV y EXPLORE
 * (SiteChrome.tsx), a las puertas y bloques del inicio y a public/sitemap.xml.
 */
export const Route = createFileRoute("/noticias")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
