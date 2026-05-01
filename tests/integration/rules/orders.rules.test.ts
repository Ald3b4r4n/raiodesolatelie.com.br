// @vitest-environment node
import {
  assertFails,
  assertSucceeds,
  type RulesTestEnvironment
} from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { afterAll, afterEach, beforeAll, describe, it } from "vitest";

import {
  createRulesTestEnvironment,
  customerContext,
  publicContext
} from "./rules-test-env";

describe("Firestore rules: pedidos de clientes", () => {
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

  it("permite cliente ler apenas o próprio pedido", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "orders", "order-1"), {
        customerId: "customer-1",
        status: "pending",
        total: 120,
        createdAt: new Date()
      });
    });

    await assertSucceeds(
      getDoc(doc(customerContext(testEnv, "customer-1").firestore(), "orders", "order-1"))
    );
  });

  it("bloqueia cliente lendo pedido de outra pessoa", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "orders", "order-2"), {
        customerId: "customer-2",
        status: "pending",
        total: 90,
        createdAt: new Date()
      });
    });

    await assertFails(
      getDoc(doc(customerContext(testEnv, "customer-1").firestore(), "orders", "order-2"))
    );
  });

  it("bloqueia visitante lendo pedidos", async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), "orders", "order-3"), {
        customerId: "customer-1",
        status: "pending",
        total: 90,
        createdAt: new Date()
      });
    });

    await assertFails(
      getDoc(doc(publicContext(testEnv).firestore(), "orders", "order-3"))
    );
  });

  it("bloqueia escrita direta de pedido pelo cliente", async () => {
    await assertFails(
      setDoc(
        doc(customerContext(testEnv, "customer-1").firestore(), "orders", "direct"),
        {
          customerId: "customer-1",
          status: "pending",
          total: 80,
          createdAt: new Date()
        }
      )
    );
  });
});
