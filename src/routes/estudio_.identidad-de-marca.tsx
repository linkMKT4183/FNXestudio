import { createFileRoute } from "@tanstack/react-router";
import { ServicioPage } from "@/components/estudio/ServicioPage";
import { SERVICIOS } from "@/data/servicios";
import { serviceHead } from "@/lib/seo";

const SERVICIO = SERVICIOS[0];

export const Route = createFileRoute("/estudio_/identidad-de-marca")({
  head: () => serviceHead(SERVICIO),
  component: () => <ServicioPage service={SERVICIO} />,
});
