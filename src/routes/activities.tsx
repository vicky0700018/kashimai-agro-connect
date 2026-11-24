import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Agricultural Activities | Shri Sant Kashimai Agro" },
      { name: "description", content: "Agricultural Activities – Shri Sant Kashimai Agro Farmer Producer Company Limited, Ahmedpur, Latur." },
      { property: "og:title", content: "Agricultural Activities | Shri Sant Kashimai Agro" },
      { property: "og:description", content: "Agricultural Activities – Shri Sant Kashimai Agro Farmer Producer Company Limited." },
    ],
  }),
  component: ActivitiesPage,
});

function ActivitiesPage() {
  return (
    <main className="container-site section-pad">
      <h1 className="text-4xl font-semibold text-deep">Agricultural Activities</h1>
    </main>
  );
}
