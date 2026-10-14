import { createFileRoute } from "@tanstack/react-router";
import { RestaurantSite } from "@/components/restaurant/site";
import { Toaster } from "sonner";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saffron & Soul | Contemporary Indian Dining, Bengaluru" },
      {
        name: "description",
        content:
          "A taste of tradition. A touch of soul. Explore our contemporary Indian menu, dining gallery and interactive demo reservations in Bengaluru.",
      },
      { property: "og:title", content: "Saffron & Soul | A Taste of Tradition. A Touch of Soul." },
      {
        property: "og:description",
        content:
          "Discover a warm, contemporary Indian dining experience. Explore the menu and create a frontend demo reservation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});
function Index() {
  return (
    <>
      <RestaurantSite />
      <Toaster position="top-center" richColors />
    </>
  );
}
