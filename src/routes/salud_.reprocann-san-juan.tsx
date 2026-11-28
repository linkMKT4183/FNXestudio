import { createFileRoute } from "@tanstack/react-router";
import { SaludGuiaPage } from "@/components/salud/SaludGuiaPage";
import { GUIAS_SALUD } from "@/data/salud-guias";
import { guiaHead } from "@/lib/seo";

const guia = GUIAS_SALUD.find((g) => g.slug === "reprocann-san-juan")!;

export const Route = createFileRoute("/salud_/reprocann-san-juan")({
  head: () => guiaHead(guia),
  component: () => <SaludGuiaPage guia={guia} />,
});
