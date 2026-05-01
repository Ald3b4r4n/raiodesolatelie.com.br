// @vitest-environment node
import {
  assertFails,
  assertSucceeds,
  type RulesTestEnvironment
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";

import { createRulesTestEnvironment, publicContext } from "./rules-test-env";

describe("Firestore rules: produtos públicos", () => {
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
    testEnv = await createRulesTestEnvironment();
  });

  afterEach(async () => {
    await testEnv.clearFirestore();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it("permite leitura pública de produto ativo", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "products", "active-product"), {
        name: "Bolsa artesanal",
        status: "active",
        categoryId: "pronta-entrega",
        availability: "in_stock",
        basePrice: 120,
        createdAt: new Date()
      });
    });

    await assertSucceeds(
      getDoc(doc(publicContext(testEnv).firestore(), "products", "active-product"))
    );
  });

  it("bloqueia leitura pública de produto inativo", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "products", "inactive-product"), {
        name: "Produto em preparo",
        status: "inactive",
        categoryId: "encomenda-whatsapp",
        availability: "unavailable",
        basePrice: 80,
        createdAt: new Date()
      });
    });

    await assertFails(
      getDoc(doc(publicContext(testEnv).firestore(), "products", "inactive-product"))
    );
  });
});
