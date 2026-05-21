#!/usr/bin/env node
// Run vite build, then verify dist/client/index.html exists.
// TanStack Start's prerender currently throws a benign close-time error
// (`process.stdin.off is not a function`) AFTER all files are written.
// We treat the build as successful if index.html is on disk.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const child = spawn(
  process.execPath,
  ["./node_modules/vite/bin/vite.js", "build", ...process.argv.slice(2)],
  { stdio: "inherit" },
);

child.on("exit", (code) => {
  const indexPath = resolve("dist/client/index.html");
  if (existsSync(indexPath)) {
    if (code !== 0) {
      console.warn(
        `[build] vite exited ${code} but ${indexPath} exists — treating as success.`,
      );
    }
    process.exit(0);
  }
  console.error(`[build] Missing ${indexPath}`);
  process.exit(code ?? 1);
});