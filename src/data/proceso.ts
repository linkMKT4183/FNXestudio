import { ClipboardList, FileCheck2, MessagesSquare } from "lucide-react";

export const PASOS = [
  {
    n: "01",
    icon: MessagesSquare,
    title: "Nos escribís por WhatsApp",
    text: "Un mensaje alcanza para arrancar.",
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Te hacemos 3 preguntas",
    text: "Para entender qué necesitás, sin vueltas.",
  },
  {
    n: "03",
    icon: FileCheck2,
    title: "Te pasamos una propuesta clara",
    text: "Qué hacemos, cuándo y cuánto sale.",
  },
] as const;
export const CONDICIONES = {
  inicio: "Firmás el presupuesto y abonás el 50%.",
  entrega: "Con el 100% pago, te llevás todos los archivos editables. Son tuyos.",
} as const;
