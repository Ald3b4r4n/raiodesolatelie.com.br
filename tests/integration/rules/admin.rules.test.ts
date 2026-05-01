// @vitest-environment node
import {
  assertFails,
  assertSucceeds,
  type RulesTestEnvironment
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";

import {
  adminContext,
  createRulesTestEnvironment,
  customerContext
} from "./rules-test-env";

describe("Firestore rules: permissões admin", () => {
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

  it("permite admin criar e editar produto", async () => {
    const adminDb = adminContext(testEnv).firestore();
    const productRef = doc(adminDb, "products", "admin-product");

    await assertSucceeds(
      setDoc(productRef, {
        name: "Produto admin",
        status: "active",
        basePrice: 100,
        createdAt: new Date()
      })
    );

    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "products", "editable-product"), {
        name: "Produto editável",
        status: "active",
        basePrice: 90,
        createdAt: new Date()
      });
    });

    await assertSucceeds(
      updateDoc(doc(adminDb, "products", "editable-product"), { status: "inactive" })
    );
  });

  it("permite admin ler pedido", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "orders", "admin-order"), {
        customerId: "customer-1",
        status: "pending",
        total: 110,
        createdAt: new Date()
      });
    });

    await assertSucceeds(
      getDoc(doc(adminContext(testEnv).firestore(), "orders", "admin-order"))
    );
  });

  it("permite admin gerenciar cupons e avaliações", async () => {
    await assertSucceeds(
      setDoc(doc(adminContext(testEnv).firestore(), "coupons", "WELCOME10"), {
        code: "WELCOME10",
        active: true,
        discountType: "percentage",
        discountValue: 10
      })
    );

    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "reviews", "review-1"), {
        customerId: "customer-1",
        productId: "product-1",
        rating: 5,
        status: "pending",
        createdAt: new Date()
      });
    });

    await assertSucceeds(
      updateDoc(doc(adminContext(testEnv).firestore(), "reviews", "review-1"), {
        status: "approved"
      })
    );
  });

  it("bloqueia cliente comum gerenciando recursos admin", async () => {
    await assertFails(
      setDoc(doc(customerContext(testEnv).firestore(), "coupons", "CUSTOMER"), {
        code: "CUSTOMER",
        active: true
      })
    );
  });
});
