import { cp, mkdir, rm } from "node:fs/promises";
import { join, resolve } from "node:path";

const rootDir = resolve(".");
const outputDir = join(rootDir, "dist-site");
const pg2Dir = join(rootDir, "pg2");
const pg2OutputDir = join(outputDir, "pg2");

await rm(outputDir, { force: true, recursive: true });
await mkdir(outputDir, { recursive: true });

await cp(join(rootDir, "index.html"), join(outputDir, "index.html"));
await cp(join(rootDir, "assets"), join(outputDir, "assets"), { recursive: true });

await mkdir(pg2OutputDir, { recursive: true });
await cp(join(pg2Dir, "index.html"), join(pg2OutputDir, "index.html"));
await cp(join(pg2Dir, "styles.css"), join(pg2OutputDir, "styles.css"));
await cp(join(pg2Dir, "script.js"), join(pg2OutputDir, "script.js"));
await cp(join(pg2Dir, "favicon.ico"), join(pg2OutputDir, "favicon.ico"));
await cp(join(pg2Dir, "robots.txt"), join(pg2OutputDir, "robots.txt"));
await cp(
  join(pg2Dir, "politica-de-privacidade"),
  join(pg2OutputDir, "politica-de-privacidade"),
  { recursive: true },
);
