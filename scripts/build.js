import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, "dist");
const requiredFiles = ["index.html", "styles.css", "app.js"];

for (const file of requiredFiles) {
  readFileSync(resolve(root, file));
}

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const file of requiredFiles) cpSync(resolve(root, file), resolve(output, file));
writeFileSync(resolve(output, ".nojekyll"), "");

console.log("Production build создан в dist/.");
