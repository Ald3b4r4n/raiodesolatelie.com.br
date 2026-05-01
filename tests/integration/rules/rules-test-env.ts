import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import {
  initializeTestEnvironment,
  type RulesTestContext,
  type RulesTestEnvironment
} from "@firebase/rules-unit-testing";

export const rulesProjectId = "demo-raiodesolatelie";

export async function createRulesTestEnvironment(): Promise<RulesTestEnvironment> {
  return initializeTestEnvironment({
    projectId: rulesProjectId,
    firestore: {
      host: "127.0.0.1",
      port: 8080,
      rules: readFileSync(resolve("firebase/firestore.rules"), "utf8")
    },
    storage: {
      host: "127.0.0.1",
      port: 9199,
      rules: readFileSync(resolve("firebase/storage.rules"), "utf8")
    }
  });
}

export function publicContext(testEnv: RulesTestEnvironment): RulesTestContext {
  return testEnv.unauthenticatedContext();
}

export function customerContext(
  testEnv: RulesTestEnvironment,
  uid = "customer-1"
): RulesTestContext {
  return testEnv.authenticatedContext(uid, { role: "customer" });
}

export function adminContext(
  testEnv: RulesTestEnvironment,
  uid = "admin-1"
): RulesTestContext {
  return testEnv.authenticatedContext(uid, { admin: true, role: "admin" });
}
