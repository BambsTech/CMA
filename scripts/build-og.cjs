// Renders the default social preview (1200×630) with the official logo and brand fonts.
// Usage: node scripts/build-og.cjs   (requires Playwright + Chromium available)
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");
(async () => {
  const root = path.resolve(__dirname, "..");
  const logo = fs.readFileSync(path.join(root, "assets-src/brand-extracted/cma-logotipo-completo-horizontal.svg"), "utf8");
  const html = fs.readFileSync(path.join(__dirname, "og.html"), "utf8").replace("LOGO", logo);
  const tmp = path.join(__dirname, ".og-render.html");
  fs.writeFileSync(tmp, html);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto("file://" + tmp);
  await p.waitForTimeout(800);
  await p.screenshot({ path: path.join(root, "public/assets/og/cma-og-default.jpg"), type: "jpeg", quality: 86 });
  await b.close();
  fs.unlinkSync(tmp);
  console.log("public/assets/og/cma-og-default.jpg");
})();
