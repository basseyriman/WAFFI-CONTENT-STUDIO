export type RentalItem = {
  id: string;
  name: string;
  category: "Lighting" | "Audio" | "Props" | "Backdrops" | "Furniture";
  pricePerDay: number;
  description: string;
  image: string;
  available: boolean;
};

export const rentals: RentalItem[] = [
  {
    id: "costumes",
    name: "Costumes",
    category: "Props",
    pricePerDay: 10000,
    description: "Shoot costumes and wardrobe pieces prepared for your booking day. Tell us what you need when you book.",
    image: "/rentals/rental-christmas-pyjamas.jpg",
    available: true,
  },
  {
    id: "other-props",
    name: "Other props / styling",
    category: "Props",
    pricePerDay: 12000,
    description: "Additional props or styling pieces for your shoot. Share the details in your booking message.",
    image: "/rentals/rental-maternity-gowns.jpg",
    available: true,
  },
];

export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}
