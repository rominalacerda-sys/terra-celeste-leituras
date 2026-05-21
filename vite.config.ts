// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "node:fs";
import path from "node:path";

// Static SPA build: prerender "/" into dist/client/index.html for static hosting (Netlify).
export default defineConfig({
  tanstackStart: {
    prerender: { enabled: true },
    pages: [{ path: "/" }],
    spa: { enabled: true },
  },
  vite: {
    environments: {
      server: {
        build: {
          rollupOptions: {
            input: "index",
          },
        },
      },
    },
    plugins: [
      {
        name: "copy-server-index-to-server",
        apply: "build",
        closeBundle: {
          order: "post",
          handler() {
            const dir = path.resolve("dist/server");
            const src = path.join(dir, "index.js");
            const dest = path.join(dir, "server.js");
            if (fs.existsSync(src) && !fs.existsSync(dest)) {
              fs.copyFileSync(src, dest);
            }
          },
        },
      },
    ],
  },
});
