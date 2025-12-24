import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const entryPath = path.join(repoRoot, "src", "index.css");

let contents = "";
try {
  contents = readFileSync(entryPath, "utf8");
} catch (error) {
  console.error(`CSS entry not found: ${entryPath}`);
  process.exit(1);
}

const violations = [];

if (contents.includes("/*! tailwindcss")) {
  violations.push("contains generated Tailwind output header");
}

if (contents.includes("sourceMappingURL=")) {
  violations.push("contains an inline sourcemap");
}

const lineCount = contents.split(/\r?\n/).length;
if (lineCount > 50) {
  violations.push(`is too long (${lineCount} lines)`);
}

if (violations.length > 0) {
  console.error("src/index.css must stay a small entrypoint:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}
