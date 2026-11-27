import { createFileRoute } from "@tanstack/react-router";
import { CiudadPage } from "@/components/estudio/CiudadPage";
import { CIUDADES } from "@/data/ciudades";
import { cityHead } from "@/lib/seo";

const CIUDAD = CIUDADES[1];

export const Route = createFileRoute("/san-juan")({
  head: () => cityHead(CIUDAD),
  component: () => <CiudadPage city={CIUDAD} />,
});
