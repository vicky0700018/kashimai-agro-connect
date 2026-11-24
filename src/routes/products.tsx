import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Agro Products | Shri Sant Kashimai Agro" },
      { name: "description", content: "Agro Products – Shri Sant Kashimai Agro Farmer Producer Company Limited, Ahmedpur, Latur." },
      { property: "og:title", content: "Agro Products | Shri Sant Kashimai Agro" },
      { property: "og:description", content: "Agro Products – Shri Sant Kashimai Agro Farmer Producer Company Limited." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <main className="container-site section-pad">
      <h1 className="text-4xl font-semibold text-deep">Agro Products</h1>
    </main>
  );
}
