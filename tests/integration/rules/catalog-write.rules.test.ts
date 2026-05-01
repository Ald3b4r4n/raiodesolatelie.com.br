// @vitest-environment node
import { assertFails, type RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { doc, setDoc } from "firebase/firestore";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";

import {
  createRulesTestEnvironment,
  customerContext,
  publicContext
} from "./rules-test-env";

describe("Firestore rules: escrita pública de catálogo", () => {
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

  it("bloqueia visitante criando produto", async () => {
    await assertFails(
      setDoc(doc(publicContext(testEnv).firestore(), "products", "public-create"), {
        name: "Produto indevido",
        status: "active"
      })
    );
  });

  it("bloqueia cliente criando categoria", async () => {
    await assertFails(
      setDoc(doc(customerContext(testEnv).firestore(), "categories", "customer-write"), {
        name: "Categoria indevida",
        status: "active"
      })
    );
  });
});
