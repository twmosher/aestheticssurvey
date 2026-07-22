import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(testDirectory, "../..");

function readWorkspaceFile(relativePath: string) {
  return readFileSync(path.join(workspaceRoot, relativePath), "utf8");
}

describe("public site layout", () => {
  it("owns the shared public shell instead of duplicating Header/Footer in page files", () => {
    const publicPages = [
      "app/page.tsx",
      "app/about/page.tsx",
      "app/privacy/page.tsx",
      "app/terms/page.tsx",
    ];

    const sharedLayout = readWorkspaceFile("app/layout.tsx");

    expect(sharedLayout).toMatch(/Header/);
    expect(sharedLayout).toMatch(/Footer/);

    for (const publicPage of publicPages) {
      const pageSource = readWorkspaceFile(publicPage);

      expect(pageSource).not.toMatch(/import\s+\{\s*Header\s*\}/);
      expect(pageSource).not.toMatch(/import\s+\{\s*Footer\s*\}/);
      expect(pageSource).not.toMatch(/<Header\s*\/>/);
      expect(pageSource).not.toMatch(/<Footer\s*\/>/);
    }
  });
});
