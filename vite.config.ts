// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "node:fs";
import path from "node:path";
import type { OutputAsset, OutputBundle, OutputChunk } from "rollup";

function getLatestAssetFile(clientDir: string, pattern: RegExp) {
  const assetsDir = path.join(clientDir, "assets");
  if (!fs.existsSync(assetsDir)) return "";

  return fs
    .readdirSync(assetsDir)
    .filter((file) => pattern.test(file))
    .sort()
    .at(-1)
    ? `/assets/${fs
        .readdirSync(assetsDir)
        .filter((file) => pattern.test(file))
        .sort()
        .at(-1)}`
    : "";
}

function getClientEntryChunk(bundle: OutputBundle): OutputChunk | undefined {
  return Object.values(bundle).find(
    (item): item is OutputChunk =>
      item.type === "chunk" && item.isEntry && item.fileName.endsWith(".js"),
  );
}

function getClientCssHrefs(bundle: OutputBundle, entryChunk?: OutputChunk) {
  const cssFromEntry = Array.from(
    ((entryChunk as OutputChunk & {
      viteMetadata?: { importedCss?: Set<string> };
    })?.viteMetadata?.importedCss ?? new Set<string>()),
  ).map((file) => `/${file}`);

  if (cssFromEntry.length > 0) {
    return cssFromEntry;
  }

  return Object.values(bundle)
    .filter(
      (item): item is OutputAsset => item.type === "asset" && item.fileName.endsWith(".css"),
    )
    .map((item) => `/${item.fileName}`)
    .sort();
}

// Static SPA build: prerender "/" into dist/client/index.html for static hosting (Netlify).
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    prerender: { enabled: false },
    spa: {
      enabled: true,
    },
  },
  vite: {
    plugins: [
      {
        name: "generate-static-index-html",
        apply: "build",
        writeBundle: {
          order: "post",
          async handler(outputOptions, bundle) {
            if (!outputOptions.dir || !outputOptions.dir.endsWith("dist/client")) {
              return;
            }

            const clientDir = path.resolve(outputOptions.dir);
            const entryChunk = getClientEntryChunk(bundle);
            const jsSrc = entryChunk ? `/${entryChunk.fileName}` : "";
            const cssHrefs = getClientCssHrefs(bundle, entryChunk);
            const fallbackCssHref = cssHrefs[0] ?? getLatestAssetFile(clientDir, /\.css$/);

            const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="google-site-verification" content="vld4CK-pQH69z9UmRe4XCmRW5gKNT_nqvdcj7kJsFJA">
<title>Romina Lacerda | Astrologia Psicológica e Transpessoal · Rio de Janeiro</title>
<meta name="description" content="Consultas de astrologia psicológica e transpessoal com Romina Lacerda. Mapa natal, revolução solar, trânsitos e ciclos lunares. Atendimento online. Rio de Janeiro.">
<meta name="keywords" content="astrologia psicológica, astrologia transpessoal, mapa natal, consulta astrológica online, astróloga Rio de Janeiro, revolução solar, trânsitos astrológicos, autoconhecimento">
<meta name="author" content="Romina Lacerda">
<meta property="og:title" content="Romina Lacerda | Astrologia Psicológica e Transpessoal">
<meta property="og:description" content="Leituras para atravessar ciclos com mais clareza. Consultas online de astrologia psicológica e transpessoal.">
<meta property="og:url" content="https://rominalacerda.com.br">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="https://rominalacerda.com.br/hero-vase.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Romina Lacerda | Astrologia Psicológica e Transpessoal">
<meta name="twitter:description" content="Leituras para atravessar ciclos com mais clareza. Consultas online de astrologia psicológica e transpessoal.">
<meta name="twitter:image" content="https://rominalacerda.com.br/hero-vase.png">
<link rel="canonical" href="https://rominalacerda.com.br">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=JetBrains+Mono:wght@400;500&display=swap">
${fallbackCssHref ? `<link rel="stylesheet" href="${fallbackCssHref}">` : ""}
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Person","name":"Romina Lacerda","jobTitle":"Astróloga","description":"Astróloga especializada em astrologia psicológica e transpessoal. Consultas individuais online.","url":"https://rominalacerda.com.br","sameAs":["https://www.instagram.com/rominalacerdaastrologia","https://www.youtube.com/rominalacerda"],"address":{"@type":"PostalAddress","addressLocality":"Rio de Janeiro","addressCountry":"BR"},"knowsAbout":["Astrologia Psicológica","Astrologia Transpessoal","Mapa Natal","Revolução Solar","Trânsitos Astrológicos","Ciclos Lunares"]}</script>
</head>
<body>
${jsSrc ? `<script type="module" src="${jsSrc}"></script>` : ""}
</body>
</html>`;

            fs.writeFileSync(path.join(clientDir, "index.html"), html);
            console.log(`[generate-static-index-html] wrote dist/client/index.html`);
          },
        },
      },
      {
        name: "copy-server-index-to-server",
        apply: "build",
        closeBundle: {
          order: "post",
          async handler() {
            const dir = path.resolve("dist/server");
            const src = path.join(dir, "index.mjs");
            const dest = path.join(dir, "server.js");
            if (fs.existsSync(src) && !fs.existsSync(dest)) {
              fs.copyFileSync(src, dest);
            }
            const pkgJson = path.join(dir, "package.json");
            if (!fs.existsSync(pkgJson)) {
              fs.writeFileSync(pkgJson, JSON.stringify({ type: "module" }, null, 2));
            }
          },
        },
      },
    ],
  },
});
