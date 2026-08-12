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
    id: "ring-light-18",
    name: "18\" LED Ring Light Kit",
    category: "Lighting",
    pricePerDay: 15000,
    description: "Dimable ring light with phone mount and stand — ideal for beauty and talking-head content.",
    image: "/rentals/rental-ringlight.jpg",
    available: true,
  },
  {
    id: "softbox-duo",
    name: "Softbox Continuous Duo",
    category: "Lighting",
    pricePerDay: 25000,
    description: "Two softbox continuous lights with stands for flattering, even studio illumination.",
    image: "/rentals/rental-softbox.jpg",
    available: true,
  },
  {
    id: "wireless-mic",
    name: "Wireless Lav Mic Kit",
    category: "Audio",
    pricePerDay: 20000,
    description: "Dual wireless lavalier kit for interviews, reels, and clean on-camera audio.",
    image: "/rentals/rental-mic.jpg",
    available: true,
  },
  {
    id: "statement-chair",
    name: "Statement Accent Chair",
    category: "Furniture",
    pricePerDay: 12000,
    description: "Designer armchair prop to elevate portraits, interviews, and product lifestyle frames.",
    image: "/rentals/rental-chair.jpg",
    available: true,
  },
  {
    id: "seamless-rolls",
    name: "Seamless Paper Backdrop Set",
    category: "Backdrops",
    pricePerDay: 10000,
    description: "Color seamless rolls for clean product and portrait backgrounds.",
    image: "/rentals/rental-backdrop.jpg",
    available: true,
  },
  {
    id: "reflector-kit",
    name: "5-in-1 Reflector Kit",
    category: "Lighting",
    pricePerDay: 5000,
    description: "Portable reflector kit for shaping natural and continuous light on set.",
    image: "/rentals/rental-softbox.jpg",
    available: true,
  },
  {
    id: "boom-arm",
    name: "Boom Mic Arm Stand",
    category: "Audio",
    pricePerDay: 8000,
    description: "Adjustable boom arm for podcasts and overhead audio placement.",
    image: "/rentals/rental-mic.jpg",
    available: true,
  },
  {
    id: "styling-table",
    name: "Styling Side Table",
    category: "Props",
    pricePerDay: 7000,
    description: "Minimal side table for product styling, flat lays, and lifestyle vignettes.",
    image: "/rentals/rental-chair.jpg",
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
