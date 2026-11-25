// Builds the GitHub Pages website into ./docs from lore.html, data/, img/ and vendor/.
// Run from the project root:  node tools/build-site.js <download-url>
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "docs");
const download = process.argv[2] || "";
if (download && !/^https:\/\//.test(download)) throw new Error("Download URL must start with https://");
const localLibs = html => html
  .replace("https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js", "vendor/d3.min.js")
  .replace("https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js", "vendor/topojson-client.min.js");

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const page = localLibs(fs.readFileSync(path.join(ROOT, "lore.html"), "utf8"));
fs.writeFileSync(path.join(OUT, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="A world map of legends, monsters and spirits, with a timeline of when each was first written down and Claude as storyteller.">
<link rel="icon" href="img/icon.png">
<style>:root{color-scheme:dark;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
<script>window.APP_SITE = ${JSON.stringify({ download })};</script>
<script src="web-backend.js"></script>
<script src="app-shim.js"></script>
</head><body>
${page}
</body></html>
`);
fs.copyFileSync(path.join(ROOT, "tools", "web-backend.js"), path.join(OUT, "web-backend.js"));
fs.copyFileSync(path.join(ROOT, "desktop", "app-src", "app-shim.js"), path.join(OUT, "app-shim.js"));
for (const dir of ["data", "img", "vendor"]) fs.cpSync(path.join(ROOT, dir), path.join(OUT, dir), { recursive: true });
fs.writeFileSync(path.join(OUT, ".nojekyll"), "");
console.log("Built docs/ (download link: " + (download || "none") + ")");
