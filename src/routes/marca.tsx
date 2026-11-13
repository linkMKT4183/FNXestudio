import { createFileRoute, redirect } from "@tanstack/react-router";

// The Marca page was removed from the site. Old links and search results land on the home page.
export const Route = createFileRoute("/marca")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
