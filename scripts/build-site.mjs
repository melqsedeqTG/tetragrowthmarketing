import { cp, mkdir, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pg2Dir = join(rootDir, "pg2");
const outputDir = join(rootDir, "dist-site");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const run = (args, cwd) => {
  const result = spawnSync(npmCommand, args, {
    cwd,
    shell: false,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

await rm(outputDir, { force: true, recursive: true });
await mkdir(outputDir, { recursive: true });

await cp(join(rootDir, "index.html"), join(outputDir, "index.html"));
await cp(join(rootDir, "assets"), join(outputDir, "assets"), { recursive: true });

run(["ci"], pg2Dir);
run(["run", "build"], pg2Dir);

await mkdir(join(outputDir, "pg2"), { recursive: true });
await cp(join(pg2Dir, "dist"), join(outputDir, "pg2"), { recursive: true });
