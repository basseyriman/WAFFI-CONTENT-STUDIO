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
    id: "christmas-pyjamas",
    name: "Christmas Pyjamas — All Sizes",
    category: "Props",
    pricePerDay: 10000,
    description: "Festive pyjama sets for holiday shoots, stocked in every size: Kids, XS, S, M, L, XL, and XXL.",
    image: "/rentals/rental-christmas-pyjamas.jpg",
    available: true,
  },
  {
    id: "maternity-long-gown",
    name: "Maternity Long Gown",
    category: "Props",
    pricePerDay: 12000,
    description: "A set of flowing floor-length gowns shaped for pregnancy, in several colors, for maternity portraits and bump shoots.",
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
