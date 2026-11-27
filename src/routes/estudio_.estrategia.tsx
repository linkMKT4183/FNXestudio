import { createFileRoute } from "@tanstack/react-router";
import { ServicioPage } from "@/components/estudio/ServicioPage";
import { SERVICIOS } from "@/data/servicios";
import { serviceHead } from "@/lib/seo";

const SERVICIO = SERVICIOS[4];

export const Route = createFileRoute("/estudio_/estrategia")({
  head: () => serviceHead(SERVICIO),
  component: () => <ServicioPage service={SERVICIO} />,
});
