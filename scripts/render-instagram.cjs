// Renders docs/instagram/templates/templates.html to one PNG per template (reference artwork).
const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const dir = path.join(__dirname, "../docs/instagram/templates");
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 2400, height: 2000 } });
  await p.goto("file://" + path.join(dir, "templates.html"));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(800);
  for (const id of await p.$$eval("body > div", (els) => els.map((e) => e.id))) {
    const el = await p.$(`[id="${id}"] > .t`);
    await el.screenshot({ path: path.join(dir, `${id}.png`) });
  }
  await b.close();
})();
