import { resolve } from "node:path";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { statSync, existsSync } from "node:fs";
import { cpus } from "node:os";
import prettier from "prettier";
import { ESLint } from "eslint";
import {
  rootDir,
  prettierConfig,
  logger,
  componentsDir,
  components as allComponents,
  toCapitalCase,
  runParallel,
} from "./utils";

const ignores: any[] = [];
const plugins: any[] = [];

async function main() {
  const exportComponents = allComponents.filter((c) => !ignores.includes(c));
  const components = exportComponents.filter((c) => !plugins.includes(c));

  const index = `
    ${exportComponents
      .map(
        (component) =>
          `import { ${toCapitalCase(component)} } from './${component}'`
      )
      .join("\n")}

    import { buildInstall } from './create'

    const components = [
      ${components.map(toCapitalCase).join(",\n")},
    ]

    export { buildInstall }
    export const install = buildInstall(components)

    ${allComponents
      .map((component) => `export * from './${component}'`)
      .join("\n")}
  `;

  const eslint = new ESLint({ fix: true });
  const indexPath = resolve(rootDir, "packages/components/index.ts");

  await writeFile(
    indexPath,
    prettier.format(index, { ...prettierConfig, parser: "typescript" }),
    "utf-8"
  );

  await ESLint.outputFixes(await eslint.lintFiles(indexPath));
  // await ESLint.outputFixes(await eslint.lintFiles(typesPath));

  // await runParallel(cpus().length, allComponents, async (component) => {
  //   const scssPath = resolve(rootDir, `style/${component}.scss`);
  //
  //   if (!existsSync(scssPath)) {
  //     await writeFile(scssPath, "", "utf-8");
  //   }
  // });
}

async function readDirectives() {
  const componentRE = /import \{ (.+) \} from '@\/components\/.+'/;
  const directivesDir = resolve(rootDir, "directives");
  const directives = await Promise.all(
    (
      await readdir(directivesDir)
    )
      .filter((f) => statSync(resolve(directivesDir, f)).isDirectory())
      .map(async (directive) => {
        const content = await readFile(
          resolve(directivesDir, directive, "index.ts"),
          "utf-8"
        );
        const lines = content.split("\n");
        const components: string[] = [];

        for (const line of lines) {
          if (!line.startsWith("import")) break;
          if (!line) continue;

          const matched = line.match(componentRE);

          if (matched?.[1]) {
            components.push(...matched[1].split(",").map((s) => s.trim()));
          }
        }

        return { name: directive, components };
      })
  );

  return directives;
}

async function topologicalStyle() {
  const importRE = /import '@\/components\/(.+)\/style'/;
  const depsMap = new Map<string, string[]>();

  await runParallel(cpus().length, allComponents, async (component) => {
    const deps: string[] = [];
    const path = resolve(componentsDir, component, "style.ts");

    depsMap.set(component, deps);

    if (!existsSync(path)) {
      return;
    }

    let match: RegExpMatchArray | null;

    for (const line of (await readFile(path, "utf-8")).split("\n")) {
      if (
        (match = line.match(importRE)) &&
        match[1] !== "preset" &&
        match[1] !== "icon"
      ) {
        deps.push(match[1]);
      }
    }
  });

  const list: string[] = ["icon"];
  const walkedSet = new Set<string>();

  const push = (deps: string[]) => {
    for (const dep of deps) {
      if (walkedSet.has(dep)) {
        continue;
      }

      walkedSet.add(dep);

      if (depsMap.has(dep)) {
        push(depsMap.get(dep)!);
      }

      list.push(dep);
    }
  };

  walkedSet.add("icon");

  for (const [component, deps] of depsMap) {
    push(deps);

    if (!walkedSet.has(component)) {
      walkedSet.add(component);
      list.push(component);
    }
  }

  return list;
}

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
