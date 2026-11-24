import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Shri Sant Kashimai Agro" },
      { name: "description", content: "About Us – Shri Sant Kashimai Agro Farmer Producer Company Limited, Ahmedpur, Latur." },
      { property: "og:title", content: "About Us | Shri Sant Kashimai Agro" },
      { property: "og:description", content: "About Us – Shri Sant Kashimai Agro Farmer Producer Company Limited." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="container-site section-pad">
      <h1 className="text-4xl font-semibold text-deep">About Us</h1>
    </main>
  );
}
