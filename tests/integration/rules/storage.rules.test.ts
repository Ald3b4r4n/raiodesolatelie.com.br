// @vitest-environment node
import { assertFails, type RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { ref, uploadBytes } from "firebase/storage";
import { afterAll, beforeAll, describe, it } from "vitest";

import {
  adminContext,
  createRulesTestEnvironment,
  customerContext,
  publicContext
} from "./rules-test-env";

describe("Storage rules: decisão condicional do MVP", () => {
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
    testEnv = await createRulesTestEnvironment();
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it("mantém deny-all para visitante, cliente e admin enquanto Storage não estiver ativo", async () => {
    const image = new Blob(["fake-image"], { type: "image/jpeg" });

    await assertFails(
      uploadBytes(
        ref(publicContext(testEnv).storage(), "product-images/public.jpeg"),
        image
      )
    );
    await assertFails(
      uploadBytes(
        ref(customerContext(testEnv).storage(), "product-images/customer.jpeg"),
        image
      )
    );
    await assertFails(
      uploadBytes(
        ref(adminContext(testEnv).storage(), "product-images/admin.jpeg"),
        image
      )
    );
  });
});
