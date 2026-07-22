import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(testDirectory, "../..");
const publicSiteRoots = ["app", "components/site"];
const invalidAlphaSyntax = /hsla\(var\(--[^)]+\),\s*[\d.]+\)/;

function collectPublicSiteFiles(relativeDirectory: string): string[] {
  const absoluteDirectory = path.join(workspaceRoot, relativeDirectory);

  return readdirSync(absoluteDirectory).flatMap((entry) => {
    const absoluteEntry = path.join(absoluteDirectory, entry);
    const relativeEntry = path.relative(workspaceRoot, absoluteEntry);
    const entryStats = statSync(absoluteEntry);

    if (entryStats.isDirectory()) {
      return collectPublicSiteFiles(relativeEntry);
    }

    return [relativeEntry];
  });
}

describe("public site alpha syntax", () => {
  it("avoids invalid comma-style hsla() custom property syntax in Task 2 public files", () => {
    const scannedFiles = publicSiteRoots.flatMap((root) => collectPublicSiteFiles(root));
    const invalidFiles = scannedFiles.filter((relativePath) => {
      const contents = readFileSync(path.join(workspaceRoot, relativePath), "utf8");

      return invalidAlphaSyntax.test(contents);
    });

    expect(invalidFiles).toEqual([]);
  });
});
