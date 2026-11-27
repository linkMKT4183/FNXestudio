import { createFileRoute } from "@tanstack/react-router";
import { CiudadPage } from "@/components/estudio/CiudadPage";
import { CIUDADES } from "@/data/ciudades";
import { cityHead } from "@/lib/seo";

const CIUDAD = CIUDADES[0];

export const Route = createFileRoute("/mendoza")({
  head: () => cityHead(CIUDAD),
  component: () => <CiudadPage city={CIUDAD} />,
});
