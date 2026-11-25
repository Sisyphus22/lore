// Builds desktop/app from the shared Lore page (lore.html) plus data/, img/ and vendor/.
// The page loads d3 and topojson from CDNs on claude.ai; here they are swapped for the bundled copies
// in vendor/ so the map works offline. Run: `npm run page` (npm start and npm run dist do it for you).
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const DESKTOP = path.join(__dirname, "..");
const OUT = path.join(DESKTOP, "app");
const localLibs = html => html
  .replace("https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js", "vendor/d3.min.js")
  .replace("https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js", "vendor/topojson-client.min.js");

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "media-src 'self' blob:",
  "connect-src 'self'",
].join("; ");

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const page = localLibs(fs.readFileSync(path.join(ROOT, "lore.html"), "utf8"));
if (page.includes("cdnjs.cloudflare.com") || page.includes("cdn.jsdelivr.net")) throw new Error("A CDN script was not swapped for its local copy");
fs.writeFileSync(path.join(OUT, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<style>:root{color-scheme:dark}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
<script src="app-shim.js"></script>
</head><body>
${page}
</body></html>
`);
fs.copyFileSync(path.join(DESKTOP, "app-src", "app-shim.js"), path.join(OUT, "app-shim.js"));
for (const dir of ["data", "img", "vendor"]) fs.cpSync(path.join(ROOT, dir), path.join(OUT, dir), { recursive: true });
console.log("Built", path.relative(ROOT, OUT));
