// @vitest-environment node
import { doc, getDoc, setDoc } from "firebase/firestore";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { ProductCatalogService } from "@/services/firebase/product-catalog";

import { createRulesTestEnvironment, publicContext } from "../rules/rules-test-env";

const describeWithFirestore = process.env.FIRESTORE_EMULATOR_HOST
  ? describe
  : describe.skip;

describeWithFirestore("integração de leitura do catálogo", () => {
  let testEnv: Awaited<ReturnType<typeof createRulesTestEnvironment>>;

  beforeAll(async () => {
    testEnv = await createRulesTestEnvironment();
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv?.cleanup();
  });

  it("lê somente produtos públicos ativos a partir do Firestore", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "products", "active-product"), {
        id: "active-product",
        slug: "bolsa-leve",
        name: "Bolsa leve",
        description: "Mock para leitura pública",
        basePrice: 14990,
        categoryId: "pronta-entrega",
        status: "active",
        availability: "available",
        salesMode: "both",
        createdAt: "2026-05-01T10:00:00.000Z",
        updatedAt: "2026-05-01T10:00:00.000Z"
      });

      await setDoc(doc(context.firestore(), "products", "draft-product"), {
        id: "draft-product",
        slug: "rascunho",
        name: "Rascunho",
        description: "Não deve aparecer",
        basePrice: 9990,
        categoryId: "pronta-entrega",
        status: "draft",
        availability: "available",
        salesMode: "both",
        createdAt: "2026-05-01T10:00:00.000Z",
        updatedAt: "2026-05-01T10:00:00.000Z"
      });
    });

    const publicDb = publicContext(testEnv).firestore();
    await expect(
      getDoc(doc(publicDb, "products", "active-product"))
    ).resolves.toBeTruthy();

    const service = new ProductCatalogService({
      readProducts: async () => {
        const activeDoc = await getDoc(doc(publicDb, "products", "active-product"));
        const draftDoc = await getDoc(doc(publicDb, "products", "draft-product")).catch(
          () => null
        );

        return [activeDoc.data(), draftDoc?.data()].filter(Boolean);
      }
    });

    const result = await service.listCatalog();

    expect(result.products).toHaveLength(1);
    expect(result.products[0]?.slug).toBe("bolsa-leve");
  });
});
