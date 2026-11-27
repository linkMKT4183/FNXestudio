import { OG_IMAGE_META, pageUrl } from "@/config/site";
import type { Servicio, Pregunta } from "@/data/servicios";
import type { Ciudad } from "@/data/ciudades";
import type { Nota } from "@/data/notas";

const ORG = { "@id": pageUrl("/#org") };
export const COBERTURA = [
  { "@type": "State", name: "Mendoza" },
  { "@type": "State", name: "San Juan" },
  { "@type": "Country", name: "Argentina" },
];
export type Breadcrumb = { name: string; path: string };
export function breadcrumbLd(items: readonly Breadcrumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  };
}
export function faqLd(faq: readonly Pregunta[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
export function pageHead(
  title: string,
  description: string,
  path: string,
  graph: unknown[] = [],
  type = "website",
) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: type },
      { property: "og:url", content: pageUrl(path) },
      ...OG_IMAGE_META,
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: pageUrl(path) }],
    scripts: graph.length
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
          },
        ]
      : [],
  };
}
export function serviceHead(service: Servicio) {
  return pageHead(service.title, service.description, service.path, [
    {
      "@type": "Service",
      "@id": pageUrl(service.path) + "#service",
      name: service.name,
      description: service.description,
      url: pageUrl(service.path),
      provider: ORG,
      areaServed: COBERTURA,
    },
    faqLd(service.faq),
    breadcrumbLd([
      { name: "Inicio", path: "/" },
      { name: "Estudio", path: "/estudio" },
      { name: service.name, path: service.path },
    ]),
  ]);
}
export function cityHead(city: Ciudad) {
  return pageHead(city.title, city.description, city.path, [
    {
      "@type": "ProfessionalService",
      "@id": pageUrl(city.path) + "#service",
      name: city.title,
      description: city.description,
      url: pageUrl(city.path),
      parentOrganization: ORG,
      areaServed: [
        { "@type": "State", name: city.name },
        ...city.departments.map((name) => ({
          "@type": "AdministrativeArea",
          name,
          containedInPlace: { "@type": "State", name: city.name },
        })),
      ],
    },
    faqLd(city.faq),
    breadcrumbLd([
      { name: "Inicio", path: "/" },
      { name: city.name, path: city.path },
    ]),
  ]);
}
export function articleHead(note: Nota) {
  const path = `/notas/${note.slug}`;
  return pageHead(
    note.title,
    note.description,
    path,
    [
      {
        "@type": "Article",
        "@id": pageUrl(path) + "#article",
        headline: note.title,
        description: note.description,
        datePublished: note.date,
        author: ORG,
        publisher: ORG,
        mainEntityOfPage: pageUrl(path),
        inLanguage: "es-AR",
      },
      breadcrumbLd([
        { name: "Inicio", path: "/" },
        { name: "Notas", path: "/notas" },
        { name: note.title, path },
      ]),
    ],
    "article",
  );
}
