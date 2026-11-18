import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const sourceFiles = ["app.js", "scripts/lint.js", "scripts/build.js", "tests/app.test.js"];
const failures = [];

for (const file of sourceFiles) {
  const result = spawnSync(process.execPath, ["--check", file], { cwd: root, encoding: "utf8" });
  if (result.status !== 0) failures.push(`${file}: ${result.stderr || result.stdout}`);
}

function inspectDirectory(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) inspectDirectory(path);
    else if (/\.(html|css|js|json|yml|yaml)$/.test(name)) {
      const content = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
      if (/[ \t]+$/m.test(content)) failures.push(`${path}: обнаружены пробелы в конце строк.`);
    }
  }
}

inspectDirectory(root);
const html = readFileSync(join(root, "index.html"), "utf8");
for (const required of ['id="pipeline"', 'id="checks"', 'id="matrix"', 'id="artifacts"', 'href="styles.css"', 'src="app.js"']) {
  if (!html.includes(required)) failures.push(`index.html: отсутствует обязательный элемент ${required}`);
}

if (failures.length) {
  console.error("Lint завершился с ошибками:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("Lint OK: JavaScript syntax, структура HTML и форматирование проверены.");
}
