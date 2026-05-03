import type { Category, Product, ProductVariant } from "@/domain/product/types";
import { buildProductSearchIndex } from "@/domain/product/search";

const timestamp = "2026-05-01T10:00:00.000Z";

export const mockCatalogCategories: Category[] = [
  {
    id: "vestidos-e-saidas",
    slug: "vestidos-e-saidas",
    name: "Vestidos e saídas",
    status: "active",
    sortOrder: 1
  },
  {
    id: "conjuntos-e-tops",
    slug: "conjuntos-e-tops",
    name: "Conjuntos e tops",
    status: "active",
    sortOrder: 2
  },
  {
    id: "bolsas-e-acessorios",
    slug: "bolsas-e-acessorios",
    name: "Bolsas e acessórios",
    status: "active",
    sortOrder: 3
  },
  {
    id: "infantil",
    slug: "infantil",
    name: "Infantil",
    status: "active",
    sortOrder: 4
  }
];

export const storefrontCollections = [
  {
    title: "Coleção Solar",
    description: "Peças leves e femininas para dias de sol, praia e passeio.",
    imageUrl: "/editorial/vestido-laranja-modelo.jpeg",
    href: "/catalog?category=vestidos-e-saidas"
  },
  {
    title: "Saída de praia e conjunto",
    description: "Looks de verão com crochê autoral e acabamento delicado.",
    imageUrl: "/editorial/conjunto-amarelo-modelo.jpeg",
    href: "/catalog?category=conjuntos-e-tops"
  }
] as const;

export const storefrontHighlights = [
  "Peças feitas à mão com cuidado",
  "Atendimento direto pelo WhatsApp",
  "Novidades do ateliê toda semana"
] as const;

export const mockCatalogProductDetails: Record<
  string,
  {
    product: Product;
    category: Category;
    variants: ProductVariant[];
  }
> = {
  "vestido-dune-croche": {
    product: createMockProduct({
      id: "product-1",
      slug: "vestido-dune-croche",
      name: "Vestido Dune em crochê",
      description:
        "Peça em crochê com caimento leve e visual marcante para praia, passeio e dias de verão.",
      basePrice: 23990,
      categoryId: "vestidos-e-saidas",
      availability: "made_to_order",
      salesMode: "both",
      featured: true,
      sortOrder: 1,
      imageUrls: [
        "/editorial/vestido-laranja-modelo.jpeg",
        "/editorial/vestido-lilas-bolsa-modelo.jpeg"
      ],
      seoTitle: "Vestido Dune em crochê | Ateliê Raios de Sol",
      seoDescription:
        "Vestido em crochê com visual marcante e atendimento direto pelo WhatsApp."
    }),
    category: mockCatalogCategories[0],
    variants: [
      createMockVariant({
        id: "variant-1",
        productId: "product-1",
        size: "P",
        color: "Laranja solar",
        priceOverride: 23990
      }),
      createMockVariant({
        id: "variant-2",
        productId: "product-1",
        size: "M",
        color: "Laranja solar",
        priceOverride: 24990
      }),
      createMockVariant({
        id: "variant-3",
        productId: "product-1",
        size: "G",
        color: "Laranja solar",
        priceOverride: 25990
      })
    ]
  },
  "conjunto-praia-croche": {
    product: createMockProduct({
      id: "product-2",
      slug: "conjunto-praia-croche",
      name: "Conjunto praia em crochê",
      description:
        "Conjunto em crochê para compor look de verão com leveza, conforto e presença.",
      basePrice: 21990,
      categoryId: "conjuntos-e-tops",
      availability: "available",
      salesMode: "both",
      featured: true,
      sortOrder: 2,
      imageUrls: [
        "/editorial/conjunto-amarelo-modelo.jpeg",
        "/editorial/cropped-listrado-frente-modelo.jpeg",
        "/editorial/cropped-listrado-costas-modelo.jpeg",
        "/editorial/vestido-lilas-bolsa-modelo.jpeg"
      ],
      seoTitle: "Conjunto praia em crochê | Ateliê Raios de Sol",
      seoDescription:
        "Conjunto em crochê com visual de verão e compra prática pelo catálogo."
    }),
    category: mockCatalogCategories[1],
    variants: [
      createMockVariant({
        id: "variant-4",
        productId: "product-2",
        size: "P",
        color: "Amarelo sol"
      }),
      createMockVariant({
        id: "variant-5",
        productId: "product-2",
        size: "M",
        color: "Amarelo sol"
      }),
      createMockVariant({
        id: "variant-6",
        productId: "product-2",
        size: "M",
        color: "Azul listrado",
        availability: "unavailable"
      })
    ]
  },
  "bolsa-estrela-marina": {
    product: createMockProduct({
      id: "product-3",
      slug: "bolsa-estrela-marina",
      name: "Bolsa Estrela Marina",
      description:
        "Bolsa em crochê com aplicação frontal para compor produções casuais e de praia.",
      basePrice: 15990,
      categoryId: "bolsas-e-acessorios",
      availability: "available",
      salesMode: "ready_to_ship",
      featured: true,
      sortOrder: 3,
      imageUrls: ["/editorial/vestido-lilas-bolsa-modelo.jpeg"],
      seoTitle: "Bolsa Estrela Marina | Ateliê Raios de Sol",
      seoDescription:
        "Bolsa artesanal em crochê com destaque visual e pronta para venda direta."
    }),
    category: mockCatalogCategories[2],
    variants: [
      createMockVariant({
        id: "variant-7",
        productId: "product-3",
        size: "Único",
        color: "Azul oceano"
      })
    ]
  },
  "saidinha-infantil-perola-oceano": {
    product: createMockProduct({
      id: "product-4",
      slug: "saidinha-infantil-perola-oceano",
      name: "Saidinha infantil Pérola do Oceano",
      description:
        "Peça infantil em crochê com visual delicado para praia, passeio e ocasiões especiais.",
      basePrice: 14990,
      categoryId: "infantil",
      availability: "made_to_order",
      salesMode: "whatsapp_order",
      sortOrder: 4,
      imageUrls: ["/products/saidinha-praia-infantil-perola-oceano.jpeg"],
      seoTitle: "Saidinha infantil Pérola do Oceano | Ateliê Raios de Sol",
      seoDescription:
        "Modelo infantil em crochê disponível para encomenda com atendimento direto."
    }),
    category: mockCatalogCategories[3],
    variants: [
      createMockVariant({
        id: "variant-8",
        productId: "product-4",
        size: "2 a 4 anos",
        color: "Lilás pérola"
      }),
      createMockVariant({
        id: "variant-9",
        productId: "product-4",
        size: "4 a 6 anos",
        color: "Lilás pérola"
      })
    ]
  },
  "conjunto-listrado-azul": {
    product: createMockProduct({
      id: "product-6",
      slug: "conjunto-listrado-azul",
      name: "Conjunto Cropped Listrado Azul",
      description: "Conjunto cropped e saia em crochê, perfeito para dias de sol.",
      basePrice: 18990,
      categoryId: "conjuntos-e-tops",
      availability: "available",
      salesMode: "both",
      sortOrder: 5,
      imageUrls: ["/lookbook/1.jpeg", "/lookbook/2.jpeg"],
      seoTitle: "Conjunto Listrado Azul | Ateliê Raios de Sol",
      seoDescription: "Conjunto em crochê azul e branco."
    }),
    category: mockCatalogCategories[1],
    variants: []
  },
  "conjunto-amarelo": {
    product: createMockProduct({
      id: "product-7",
      slug: "conjunto-amarelo",
      name: "Conjunto Amarelo Ouro",
      description: "Conjunto em crochê com top e saia amarela.",
      basePrice: 20990,
      categoryId: "conjuntos-e-tops",
      availability: "available",
      salesMode: "both",
      sortOrder: 6,
      imageUrls: ["/lookbook/3.jpeg"],
      seoTitle: "Conjunto Amarelo | Ateliê Raios de Sol",
      seoDescription: "Conjunto amarelo em crochê."
    }),
    category: mockCatalogCategories[1],
    variants: []
  },
  "vestido-laranja-sol": {
    product: createMockProduct({
      id: "product-8",
      slug: "vestido-laranja-sol",
      name: "Vestido Laranja Sol",
      description: "Vestido de crochê na cor laranja com detalhes rústicos.",
      basePrice: 25990,
      categoryId: "vestidos-e-saidas",
      availability: "made_to_order",
      salesMode: "both",
      sortOrder: 7,
      imageUrls: ["/lookbook/4.jpeg"],
      seoTitle: "Vestido Laranja | Ateliê Raios de Sol",
      seoDescription: "Vestido laranja exclusivo."
    }),
    category: mockCatalogCategories[0],
    variants: []
  },
  "vestido-lilas-lavanda": {
    product: createMockProduct({
      id: "product-9",
      slug: "vestido-lilas-lavanda",
      name: "Vestido Lilás Lavanda",
      description: "Vestido curto em crochê na cor lilás.",
      basePrice: 24990,
      categoryId: "vestidos-e-saidas",
      availability: "available",
      salesMode: "both",
      sortOrder: 8,
      imageUrls: ["/lookbook/5.jpeg"],
      seoTitle: "Vestido Lilás | Ateliê Raios de Sol",
      seoDescription: "Vestido lilás em crochê."
    }),
    category: mockCatalogCategories[0],
    variants: []
  },
  "maio-verde-amarelo": {
    product: createMockProduct({
      id: "product-10",
      slug: "maio-verde-amarelo",
      name: "Maiô Brasil",
      description: "Maiô em crochê com as cores verde e amarelo.",
      basePrice: 15990,
      categoryId: "conjuntos-e-tops",
      availability: "available",
      salesMode: "both",
      sortOrder: 9,
      imageUrls: ["/lookbook/6.png"],
      seoTitle: "Maiô Brasil | Ateliê Raios de Sol",
      seoDescription: "Maiô verde e amarelo em crochê."
    }),
    category: mockCatalogCategories[1],
    variants: []
  },
  "vestido-verde-folha": {
    product: createMockProduct({
      id: "product-11",
      slug: "vestido-verde-folha",
      name: "Vestido Verde Folha",
      description: "Vestido em crochê na cor verde.",
      basePrice: 26990,
      categoryId: "vestidos-e-saidas",
      availability: "available",
      salesMode: "both",
      sortOrder: 10,
      imageUrls: ["/lookbook/7.png"],
      seoTitle: "Vestido Verde Folha | Ateliê Raios de Sol",
      seoDescription: "Vestido verde em crochê."
    }),
    category: mockCatalogCategories[0],
    variants: []
  },
  "cropped-lilas-franjas": {
    product: createMockProduct({
      id: "product-12",
      slug: "cropped-lilas-franjas",
      name: "Conjunto Lilás com Franjas",
      description: "Conjunto em crochê com franjas e detalhes delicados.",
      basePrice: 19990,
      categoryId: "conjuntos-e-tops",
      availability: "available",
      salesMode: "both",
      sortOrder: 11,
      imageUrls: ["/lookbook/8.png"],
      seoTitle: "Conjunto Lilás | Ateliê Raios de Sol",
      seoDescription: "Conjunto lilás com franjas."
    }),
    category: mockCatalogCategories[1],
    variants: []
  },
  "body-verde-esmeralda": {
    product: createMockProduct({
      id: "product-13",
      slug: "body-verde-esmeralda",
      name: "Body Verde Esmeralda",
      description: "Body cavado em crochê na cor verde esmeralda.",
      basePrice: 13990,
      categoryId: "conjuntos-e-tops",
      availability: "available",
      salesMode: "both",
      sortOrder: 12,
      imageUrls: ["/lookbook/9.png"],
      seoTitle: "Body Verde | Ateliê Raios de Sol",
      seoDescription: "Body verde em crochê."
    }),
    category: mockCatalogCategories[1],
    variants: []
  },
  "cropped-branco-franjas": {
    product: createMockProduct({
      id: "product-14",
      slug: "cropped-branco-franjas",
      name: "Cropped Branco com Franjas",
      description: "Cropped branco em crochê ideal para saídas noturnas e festivais.",
      basePrice: 14990,
      categoryId: "conjuntos-e-tops",
      availability: "available",
      salesMode: "both",
      sortOrder: 13,
      imageUrls: ["/lookbook/10.png"],
      seoTitle: "Cropped Branco | Ateliê Raios de Sol",
      seoDescription: "Cropped branco com franjas."
    }),
    category: mockCatalogCategories[1],
    variants: []
  },
  "sousplat-verde-menta": {
    product: createMockProduct({
      id: "product-15",
      slug: "sousplat-verde-menta",
      name: "Sousplat Verde Menta",
      description: "Sousplat em crochê para compor mesas postas com elegância.",
      basePrice: 4590,
      categoryId: "bolsas-e-acessorios",
      availability: "available",
      salesMode: "both",
      sortOrder: 14,
      imageUrls: ["/lookbook/sousplat-1.jpeg", "/lookbook/sousplat-2.jpeg"],
      seoTitle: "Sousplat Verde | Ateliê Raios de Sol",
      seoDescription: "Sousplat verde em crochê."
    }),
    category: mockCatalogCategories[2],
    variants: []
  },
  "produto-rascunho": {
    product: createMockProduct({
      id: "product-5",
      slug: "produto-rascunho",
      name: "Produto rascunho",
      description: "Não deve aparecer em listagens públicas.",
      basePrice: 19990,
      categoryId: "vestidos-e-saidas",
      availability: "available",
      salesMode: "both",
      status: "draft",
      sortOrder: 5
    }),
    category: mockCatalogCategories[0],
    variants: []
  }
};

export const mockCatalogProducts: Product[] = Object.values(
  mockCatalogProductDetails
).map((detail) => detail.product);

function createMockProduct(
  input: Omit<Product, "createdAt" | "updatedAt" | "status" | "searchIndex"> & {
    status?: Product["status"];
  }
): Product {
  return {
    ...input,
    status: input.status ?? "active",
    createdAt: timestamp,
    updatedAt: timestamp,
    searchIndex: buildProductSearchIndex({
      name: input.name,
      description: input.description
    })
  };
}

function createMockVariant(
  input: Omit<ProductVariant, "createdAt" | "updatedAt" | "status" | "availability"> & {
    status?: ProductVariant["status"];
    availability?: ProductVariant["availability"];
  }
): ProductVariant {
  return {
    ...input,
    status: input.status ?? "active",
    availability: input.availability ?? "available",
    createdAt: timestamp,
    updatedAt: timestamp
  };
}
