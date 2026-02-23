export type Product = {
  seo?: {
    title?: string
    description?: string
    imageAlt?: string
    longCopy?: string
  }
  dimensions?: { heightCm?: number; widthCm?: number }
  materials?: string[]
  id: string;
  slug: string;
  name: string;
  priceCents: number; // prezzo comprensivo di spedizione
  description: string;
  images: string[]; // path in /public
  isSoldOut: boolean; // pezzi unici: se venduto => true
  details?: string[];
};

const trecciatoLongCopy = `
  <p>La Borsa all'uncinetto Trecciato Rosso è una borsa artigianale italiana realizzata interamente a mano con tecnica all'uncinetto. Un accessorio unico, ideale per chi ama borse fatte a mano dallo stile caldo, originale e distintivo.</p>
  <p>Creata con marshmallow da 1 cm e fettuccia pelosa, questa borsa trecciata combina struttura, morbidezza e resistenza. Le tonalità rosse intense intrecciate con sfumature calde la rendono perfetta per la stagione autunno/inverno e per completare outfit quotidiani con un tocco artigianale raffinato.</p>
  <p>Ogni borsa è un pezzo unico, frutto di lavorazione artigianale italiana.</p>
  <p>🎁 Inclusa nel prezzo: braccialetto all'uncinetto coordinato in regalo.</p>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Caratteristiche della Borsa Artigianale</h3>
  <ul class="list-disc list-inside space-y-1 text-black/75">
    <li>Borsa all'uncinetto fatta a mano in Italia</li>
    <li>Lavorazione in marshmallow da 1 cm</li>
    <li>Fettuccia pelosa per effetto morbido e caldo</li>
    <li>Design trecciato rosso intenso</li>
    <li>Pezzo unico artigianale</li>
    <li>Braccialetto coordinato incluso</li>
  </ul>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Dimensioni</h3>
  <p>Altezza: 17 cm · Larghezza: 26 cm</p>
  <p class="mt-1">Compatta ma capiente, ideale come borsa da giorno per portare con sé l'essenziale.</p>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Perché scegliere una borsa all'uncinetto fatta a mano?</h3>
  <p>Scegliere una borsa artigianale italiana significa valorizzare qualità, cura dei dettagli e unicità. Ogni borsa all'uncinetto è diversa dall'altra, realizzata con passione e attenzione, lontana dalla produzione industriale.</p>
  <p class="mt-2">La Trecciato Rosso è perfetta per:</p>
  <ul class="list-disc list-inside space-y-1 text-black/75 mt-1">
    <li>Uso quotidiano</li>
    <li>Regalo originale fatto a mano</li>
    <li>Chi cerca una borsa in fettuccia morbida e resistente</li>
    <li>Amanti dello stile artigianale contemporaneo</li>
  </ul>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Cura del prodotto</h3>
  <p>Per mantenere la tua borsa all'uncinetto in perfette condizioni:</p>
  <ul class="list-disc list-inside space-y-1 text-black/75 mt-1">
    <li>Non lavare in lavatrice</li>
    <li>Pulire delicatamente con panno umido</li>
    <li>Conservare lontano da fonti di calore diretto</li>
  </ul>
`;

export const products: Product[] = [
  {
    seo: {
      title: "Borsa all'Uncinetto Trecciato Rosso – Fatta a Mano in Italia",
      description:
        "Borsa all'uncinetto trecciato rosso fatta a mano in Italia con marshmallow 1 cm e fettuccia pelosa. Pezzo unico + braccialetto coordinato in regalo.",
      imageAlt:
        "Borsa all'uncinetto trecciato rosso fatta a mano con fettuccia pelosa e manici rossi",
      longCopy: trecciatoLongCopy,
    },
    dimensions: { heightCm: 17, widthCm: 26 },
    materials: ["Marshmallow 1 cm", "Fettuccia pelosa"],
    id: "trecciato-rosso",
    slug: "trecciato-rosso",
    name: "Trecciato Rosso",
    priceCents: 4000,
    description:
      "Borsa all'uncinetto trecciato rosso fatta a mano in Italia. Marshmallow 1 cm e fettuccia pelosa. Pezzo unico con braccialetto coordinato in regalo.",
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
    isSoldOut: true,
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
