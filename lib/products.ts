export type Product = {
  id: string;
  slug: string;
  name: string;
  priceCents: number; // prezzo comprensivo di spedizione
  description: string;
  images: string[]; // path in /public
  isSoldOut: boolean; // pezzi unici: se venduto => true
  details?: string[];
};

export const products: Product[] = [
  {
    id: "trecciato-rosso",
    slug: "trecciato-rosso",
    name: "Trecciato Rosso",
    priceCents: 4000,
    description:
      "Borsa all'uncinetto in trecciato rosso, fatta a mano. Pezzo unico, ideale per l'uso quotidiano.",
    images: [
      "/products/trecciato_rosso/trecciato_rosso_1.jpeg",
      "/products/trecciato_rosso/trecciato_rosso_2.jpeg",
      "/products/trecciato_rosso/trecciato_rosso_3.jpeg",
    ],
    isSoldOut: false,
    details: ["Pezzo unico", "Fatta a mano", "Spedizione inclusa (Italia)"],
  },
  {
    id: "macrame",
    slug: "macrame",
    name: "Macramè",
    priceCents: 4000,
    description:
      "Borsa in macramè con linee pulite e look raffinato. Un accessorio versatile per ogni occasione.",
    images: [
      "/products/macrame/macrame_1.jpeg",
      "/products/macrame/macrame_2.jpeg",
    ],
    isSoldOut: false,
    details: ["Pezzo unico", "Fatta a mano", "Spedizione inclusa (Italia)"],
  },
  {
    id: "ecofur",
    slug: "ecofur",
    name: "Ecofur",
    priceCents: 4000,
    description:
      "Borsa in ecofur, tonalità neutra e texture artigianale. Perfetta per la stagione primavera/estate.",
    images: [
      "/products/ecofur/ecofur_1.jpeg",
      "/products/ecofur/ecofur_2.jpeg",
      "/products/ecofur/ecofur_3.jpeg",
    ],
    isSoldOut: false,
    details: ["Pezzo unico", "Fatta a mano", "Spedizione inclusa (Italia)"],
  },
];

// Helpers
export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPriceEUR(priceCents: number) {
  const euros = priceCents / 100;
  return euros.toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
  });
}
