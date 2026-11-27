import { createFileRoute, notFound } from "@tanstack/react-router";
import { NOTAS } from "@/data/notas";
import { NotaPage } from "@/components/notas/NotaPage";
import { articleHead } from "@/lib/seo";

export const Route = createFileRoute("/notas/$slug")({
  loader: ({ params }) => {
    const note = NOTAS.find((item) => item.slug === params.slug);
    if (!note) throw notFound();
    return note;
  },
  head: ({ loaderData }) =>
    loaderData
      ? articleHead(loaderData)
      : {
          meta: [
            { title: "Nota no disponible | FNX Estudio" },
            { name: "robots", content: "noindex" },
          ],
        },
  component: Article,
});

function Article() {
  const note = Route.useLoaderData();
  return <NotaPage note={note} />;
}
