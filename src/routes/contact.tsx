import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Shri Sant Kashimai Agro" },
      { name: "description", content: "Contact Us – Shri Sant Kashimai Agro Farmer Producer Company Limited, Ahmedpur, Latur." },
      { property: "og:title", content: "Contact Us | Shri Sant Kashimai Agro" },
      { property: "og:description", content: "Contact Us – Shri Sant Kashimai Agro Farmer Producer Company Limited." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="container-site section-pad">
      <h1 className="text-4xl font-semibold text-deep">Contact Us</h1>
    </main>
  );
}
