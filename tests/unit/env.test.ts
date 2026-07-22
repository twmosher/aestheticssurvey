import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { envSchema } from "@/lib/env";

function readExampleEnv() {
  const testDirectory = path.dirname(fileURLToPath(import.meta.url));
  const envExamplePath = path.resolve(testDirectory, "../../.env.example");
  const fileContents = fs.readFileSync(envExamplePath, "utf8");

  return Object.fromEntries(
    fileContents
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith("#"))
      .map((line) => {
        const separatorIndex = line.indexOf("=");
        return [line.slice(0, separatorIndex), line.slice(separatorIndex + 1)];
      }),
  );
}

describe("env schema", () => {
  it("accepts the documented example values", () => {
    const result = envSchema.safeParse(readExampleEnv());

    expect(result.success).toBe(true);
  });

  it("requires RESEND_FROM_EMAIL when RESEND_API_KEY is set", () => {
    const result = envSchema.safeParse({
      ...readExampleEnv(),
      RESEND_API_KEY: "re_test_key",
      RESEND_FROM_EMAIL: "",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.RESEND_FROM_EMAIL).toContain(
      "RESEND_FROM_EMAIL is required when RESEND_API_KEY is set",
    );
  });

  it("rejects invalid RESEND_FROM_EMAIL values when RESEND_API_KEY is set", () => {
    const result = envSchema.safeParse({
      ...readExampleEnv(),
      RESEND_API_KEY: "re_test_key",
      RESEND_FROM_EMAIL: "not-an-email",
    });

    expect(result.success).toBe(false);
    expect(result.error?.flatten().fieldErrors.RESEND_FROM_EMAIL).toContain(
      "Expected a sender email like hello@example.com or Name <hello@example.com>",
    );
  });
});
