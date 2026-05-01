// @vitest-environment node
import { describe, expect, it } from "vitest";

import { ProductDetailService } from "@/services/firebase/product-detail";

describe("integração de detalhe do produto", () => {
  it("busca produto ativo por slug e ignora produto inativo", async () => {
    const service = new ProductDetailService({
      readProductBySlug: async (slug) => {
        if (slug === "bolsa-estrela-marina") {
          return {
            id: "product-1",
            slug,
            name: "Bolsa Estrela Marina",
            description: "Mock temporário para desenvolvimento.",
            basePrice: 14990,
            categoryId: "bolsas-e-acessorios",
            status: "active",
            availability: "available",
            salesMode: "ready_to_ship",
            imageUrls: ["/mock/product-1.jpg"],
            createdAt: "2026-05-01T10:00:00.000Z",
            updatedAt: "2026-05-01T10:00:00.000Z"
          };
        }

        return {
          id: "product-2",
          slug,
          name: "Produto oculto",
          description: "Não deveria aparecer.",
          basePrice: 9990,
          categoryId: "pronta-entrega",
          status: "draft",
          availability: "available",
          salesMode: "both",
          createdAt: "2026-05-01T10:00:00.000Z",
          updatedAt: "2026-05-01T10:00:00.000Z"
        };
      }
    });

    const result = await service.getBySlug("bolsa-estrela-marina");
    const missing = await service.getBySlug("produto-oculto");

    expect(result?.product.slug).toBe("bolsa-estrela-marina");
    expect(missing).toBeUndefined();
  });
});
