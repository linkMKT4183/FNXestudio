import { createFileRoute } from "@tanstack/react-router";
import { ServicioPage } from "@/components/estudio/ServicioPage";
import { SERVICIOS } from "@/data/servicios";
import { serviceHead } from "@/lib/seo";

const SERVICIO = SERVICIOS[3];

export const Route = createFileRoute("/estudio_/redes-y-contenido")({
  head: () => serviceHead(SERVICIO),
  component: () => <ServicioPage service={SERVICIO} />,
});
