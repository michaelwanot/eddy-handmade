export type ProductVariant = {
  id: string
  label: string
  priceCents?: number
  image?: string
  isSoldOut?: boolean
}

export type Product = {
  variants?: ProductVariant[]
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

const macrameLongCopy = `
  <p>La Borsa in Macramè in cordino è un accessorio artigianale dal design pulito e raffinato, perfetto per chi ama uno stile elegante ma naturale.</p>
  <p>Realizzata a mano con tecnica macramè, questa borsa unisce texture ricercata e linee essenziali, creando un equilibrio perfetto tra modernità e artigianalità. Il cordino dona struttura e resistenza, mentre i dettagli intrecciati valorizzano ogni look con un tocco distintivo.</p>
  <p>Versatile e leggera, è ideale sia per l'uso quotidiano che per occasioni speciali.</p>
  <p>🎁 Braccialetto coordinato in omaggio incluso nel prezzo.</p>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Caratteristiche</h3>
  <ul class="list-disc list-inside space-y-1 text-black/75">
    <li>Borsa in macramè realizzata a mano</li>
    <li>Lavorazione in cordino resistente</li>
    <li>Design elegante dalle linee pulite</li>
    <li>Accessorio versatile e leggero</li>
    <li>Braccialetto coordinato in omaggio</li>
  </ul>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Dimensioni</h3>
  <p>Altezza: 20 cm · Larghezza: 27 cm</p>
  <p class="mt-1">Compatta ma capiente, perfetta per contenere l'essenziale con stile.</p>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Perché scegliere una borsa in macramè fatta a mano?</h3>
  <p>Scegliere una borsa artigianale in macramè significa valorizzare la qualità dei materiali e la cura nei dettagli. Ogni creazione è unica, frutto di lavorazione manuale che rende ogni pezzo speciale e diverso dalla produzione industriale.</p>
  <p class="mt-2">È la scelta ideale per:</p>
  <ul class="list-disc list-inside space-y-1 text-black/75 mt-1">
    <li>Outfit casual chic</li>
    <li>Eventi informali o serate eleganti</li>
    <li>Chi ama accessori artigianali dal carattere raffinato</li>
  </ul>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Cura del prodotto</h3>
  <ul class="list-disc list-inside space-y-1 text-black/75 mt-1">
    <li>Evitare lavaggi in lavatrice</li>
    <li>Pulire delicatamente con panno umido</li>
    <li>Conservare in luogo asciutto e lontano da fonti di calore</li>
  </ul>
`;

const ecofurLongCopy = `
  <p>La Borsa Gioia in cordino e filato pelliccioso è una borsa artigianale fatta a mano che unisce struttura e morbidezza in un design elegante e raffinato. Le tonalità naturali e la texture soffice la rendono perfetta per la stagione autunno/inverno, ideale per chi cerca un accessorio unico e distintivo. Un equilibrio perfetto tra stile contemporaneo e lavorazione artigianale italiana.</p>
  <p>Realizzata interamente a mano, unisce la struttura resistente del cordino alla morbidezza avvolgente del filato pelliccioso, creando un contrasto ricco e raffinato. Le tonalità naturali e calde la rendono versatile e ideale per valorizzare outfit autunnali e invernali.</p>
  <p>Compatta ma capiente, è pensata per accompagnarti nelle occasioni quotidiane con stile e personalità.</p>
  <p>🎁 Braccialetto coordinato in omaggio incluso nel prezzo.</p>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Caratteristiche</h3>
  <ul class="list-disc list-inside space-y-1 text-black/75">
    <li>Borsa fatta a mano</li>
    <li>Lavorazione in cordino resistente</li>
    <li>Filato pelliccioso morbido e caldo</li>
    <li>Design elegante e raffinato</li>
    <li>Accessorio versatile per uso quotidiano</li>
    <li>Braccialetto coordinato incluso</li>
  </ul>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Perché scegliere la Borsa Gioia?</h3>
  <p>Scegliere una borsa artigianale fatta a mano significa puntare su qualità, unicità e cura dei dettagli. Ogni creazione è realizzata con attenzione e passione, rendendo ogni pezzo speciale e diverso dalla produzione industriale.</p>
  <p class="mt-2">La Borsa Gioia è perfetta per:</p>
  <ul class="list-disc list-inside space-y-1 text-black/75 mt-1">
    <li>Outfit casual chic</li>
    <li>Eventi informali</li>
    <li>Stagione autunno/inverno</li>
    <li>Chi ama accessori artigianali eleganti</li>
  </ul>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Cura del prodotto</h3>
  <ul class="list-disc list-inside space-y-1 text-black/75 mt-1">
    <li>Non lavare in lavatrice</li>
    <li>Pulire delicatamente con panno umido</li>
    <li>Conservare lontano da fonti di calore diretto</li>
  </ul>
`;

const crochetLongCopy = `
  <p>La Borsa all'uncinetto in cordino è un accessorio artigianale dal design pulito e contemporaneo, perfetto per chi ama uno stile essenziale ma distintivo.</p>
  <p>Realizzata interamente a mano con lavorazione all'uncinetto, unisce struttura e morbidezza grazie al cordino resistente e compatto. La forma definita e il manico integrato la rendono pratica e versatile, ideale per accompagnarti nella quotidianità con eleganza.</p>
  <p>Disponibile in diverse varianti colore, si adatta facilmente a look casual, minimal o più raffinati.</p>
  <p>🎁 Braccialetto coordinato in omaggio incluso nel prezzo.</p>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Caratteristiche</h3>
  <ul class="list-disc list-inside space-y-1 text-black/75">
    <li>Borsa all'uncinetto fatta a mano</li>
    <li>Realizzata in cordino resistente</li>
    <li>Struttura compatta e stabile</li>
    <li>Design moderno dalle linee pulite</li>
    <li>Manico integrato ergonomico</li>
    <li>Disponibile in più colori</li>
    <li>Braccialetto coordinato incluso</li>
  </ul>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Perché scegliere una borsa all'uncinetto artigianale?</h3>
  <p>Scegliere una borsa fatta a mano in Italia significa valorizzare qualità, cura dei dettagli e unicità. Ogni borsa è realizzata con attenzione e passione, rendendo ogni pezzo diverso dalla produzione industriale.</p>
  <p class="mt-2">Perfetta per:</p>
  <ul class="list-disc list-inside space-y-1 text-black/75 mt-1">
    <li>Uso quotidiano</li>
    <li>Outfit casual chic</li>
    <li>Eventi informali</li>
    <li>Chi ama accessori artigianali minimal e moderni</li>
  </ul>
  <h3 class="font-serif text-lg font-semibold mt-6 mb-2">Cura del prodotto</h3>
  <ul class="list-disc list-inside space-y-1 text-black/75 mt-1">
    <li>Non lavare in lavatrice</li>
    <li>Pulire delicatamente con panno umido</li>
    <li>Conservare in luogo asciutto</li>
  </ul>
  <p class="mt-4">Questa borsa all'uncinetto in cordino è un accessorio artigianale fatto a mano in Italia, pensato per chi ama uno stile minimal ma ricercato. La lavorazione compatta garantisce resistenza e struttura, mentre il design moderno la rende perfetta per l'uso quotidiano. Disponibile in diverse varianti colore, rappresenta una scelta elegante e versatile per ogni stagione.</p>
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
    variants: [
      { id: "classico", label: "Modello Classico", priceCents: 4000 },
      { id: "tracolla", label: "Modello con Tracolla", priceCents: 4200 },
    ],
  },
  {
    seo: {
      title: "Borsa in Macramè in Cordino – Fatta a Mano",
      description:
        "Borsa in macramè in cordino fatta a mano. Design elegante e linee pulite. Pezzo unico 20×27 cm con braccialetto coordinato in omaggio. €40.",
      imageAlt:
        "Borsa in macramè in cordino fatta a mano – pezzo unico artigianale",
      longCopy: macrameLongCopy,
    },
    dimensions: { heightCm: 20, widthCm: 27 },
    materials: ["Cordino"],
    id: "macrame",
    slug: "macrame",
    name: "Macramè",
    priceCents: 4000,
    description:
      "Borsa in macramè in cordino fatta a mano: design pulito e raffinato, versatile e leggera. Braccialetto coordinato in omaggio.",
    images: [
      "/products/macrame/macrame_1.jpeg",
      "/products/macrame/macrame_2.jpeg",
    ],
    isSoldOut: false,
    details: ["Pezzo unico", "Fatta a mano", "Spedizione inclusa (Italia)"],
  },
  {
    seo: {
      title: "Borsa Gioia in Cordino e Filato Pelliccioso | Fatta a Mano",
      description:
        "Borsa Gioia in cordino e filato pelliccioso fatta a mano. Elegante, morbida e raffinata, con braccialetto in omaggio. Artigianale. €40.",
      imageAlt:
        "Borsa Gioia in cordino e filato pelliccioso fatta a mano con manico dorato – accessorio artigianale elegante",
      longCopy: ecofurLongCopy,
    },
    dimensions: { heightCm: 20, widthCm: 27 },
    materials: ["Cordino", "Filato pelliccioso"],
    id: "ecofur",
    slug: "ecofur",
    name: "Borsa Gioia",
    priceCents: 4000,
    description:
      "Borsa Gioia in cordino e filato pelliccioso fatta a mano. Elegante e raffinata, con braccialetto coordinato in omaggio.",
    images: [
      "/products/ecofur/ecofur_1.jpeg",
      "/products/ecofur/ecofur_2.jpeg",
      "/products/ecofur/ecofur_3.jpeg",
    ],
    isSoldOut: true,
    details: ["Pezzo unico", "Fatta a mano", "Spedizione inclusa (Italia)"],
  },
  {
    id: "crochet",
    slug: "crochet",
    name: "Borsa all'Uncinetto in Cordino – Fatta a Mano",
    priceCents: 1500,
    description:
      "La Borsa all'uncinetto in cordino è un accessorio artigianale dal design pulito e contemporaneo, perfetto per chi ama uno stile essenziale ma distintivo. Realizzata interamente a mano con lavorazione all'uncinetto, unisce struttura e morbidezza grazie al cordino resistente e compatto. La forma definita e il manico integrato la rendono pratica e versatile, ideale per accompagnarti nella quotidianità con eleganza. Disponibile in diverse varianti colore, si adatta facilmente a look casual, minimal o più raffinati. 🎁 Braccialetto coordinato in omaggio incluso nel prezzo.",
    images: [
      "/products/crochet/crochet_display.png",
      "/products/crochet/crochet_ladybug.png",
      "/products/crochet/crochet_flower.png",
      "/products/crochet/crochet_snow.png",
    ],
    isSoldOut: false,
    details: [
      "Borsa all'uncinetto fatta a mano",
      "Realizzata in cordino resistente",
      "Struttura compatta e stabile",
      "Design moderno dalle linee pulite",
      "Manico integrato ergonomico",
      "Disponibile in più colori",
      "Braccialetto coordinato incluso",
    ],
    seo: {
      title: "Borsa all'Uncinetto in Cordino Fatta a Mano | Eddy Handmade",
      description:
        "Borsa all'uncinetto in cordino fatta a mano. Design moderno, disponibile in più colori, con braccialetto in omaggio. Artigianale italiana. €40.",
      imageAlt:
        "Borse all'uncinetto in cordino fatte a mano in diversi colori – accessori artigianali italiani",
      longCopy: crochetLongCopy,
    },
    variants: [
      { id: "ladybug", label: "Ladybug", priceCents: 1500, image: "/products/crochet/crochet_ladybug.png" },
      { id: "flower", label: "Flower", priceCents: 1500, image: "/products/crochet/crochet_flower.png" },
      { id: "snow", label: "Snow", priceCents: 1500, image: "/products/crochet/crochet_snow.png" },
    ],
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

export function getProductPrice(product: Product, variant?: ProductVariant | null): number {
  if (variant?.priceCents != null) return variant.priceCents
  return product.priceCents
}

export function getProductDisplayName(product: Product, variant?: ProductVariant | null): string {
  if (variant) return `${product.name} – ${variant.label}`
  return product.name
}

export function getCartItemKey(productId: string, variantId?: string | null): string {
  return variantId ? `${productId}__${variantId}` : productId
}
