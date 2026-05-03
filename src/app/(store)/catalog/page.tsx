import { CatalogSection } from "@/features/catalog";
import {
  ProductCatalogService,
  type CatalogQueryInput
} from "@/services/firebase/product-catalog";

type CatalogPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  let query: CatalogQueryInput = {};

  try {
    query = readCatalogQuery(params);
  } catch {
    query = {};
  }
  const service = new ProductCatalogService();
  let data;
  let errorMessage: string | undefined;

  try {
    data = await service.listCatalog(query);
  } catch {
    data = await service.listCatalog();
    errorMessage = "Não foi possível carregar o catálogo agora.";
  }

  return (
    <CatalogSection
      data={{
        title: "Todas as peças",
        description: "Escolha sua peça favorita e fale direto com o ateliê.",
        products: data.products,
        categories: data.categories,
        currentFilters: errorMessage
          ? query
          : {
              q: data.appliedFilters.q,
              category: data.appliedFilters.category,
              minPrice:
                data.appliedFilters.minPrice !== undefined
                  ? String(data.appliedFilters.minPrice)
                  : undefined,
              maxPrice:
                data.appliedFilters.maxPrice !== undefined
                  ? String(data.appliedFilters.maxPrice)
                  : undefined,
              availability: data.appliedFilters.availability
            },
        emptyState: data.emptyState,
        errorMessage
      }}
    />
  );
}

function readCatalogQuery(
  params: Record<string, string | string[] | undefined> | undefined
): CatalogQueryInput {
  return {
    q: readSingleParam(params?.q),
    category: readSingleParam(params?.category),
    minPrice: readSingleParam(params?.minPrice),
    maxPrice: readSingleParam(params?.maxPrice),
    availability: readSingleParam(params?.availability) as
      | CatalogQueryInput["availability"]
      | undefined
  };
}

function readSingleParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}
