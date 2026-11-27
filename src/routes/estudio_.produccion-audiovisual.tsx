import { createFileRoute } from "@tanstack/react-router";
import { ServicioPage } from "@/components/estudio/ServicioPage";
import { SERVICIOS } from "@/data/servicios";
import { serviceHead } from "@/lib/seo";

const SERVICIO = SERVICIOS[1];

export const Route = createFileRoute("/estudio_/produccion-audiovisual")({
  head: () => serviceHead(SERVICIO),
  component: () => <ServicioPage service={SERVICIO} />,
});
