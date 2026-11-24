import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Shri Sant Kashimai Agro" },
      { name: "description", content: "Gallery – Shri Sant Kashimai Agro Farmer Producer Company Limited, Ahmedpur, Latur." },
      { property: "og:title", content: "Gallery | Shri Sant Kashimai Agro" },
      { property: "og:description", content: "Gallery – Shri Sant Kashimai Agro Farmer Producer Company Limited." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <main className="container-site section-pad">
      <h1 className="text-4xl font-semibold text-deep">Gallery</h1>
    </main>
  );
}
