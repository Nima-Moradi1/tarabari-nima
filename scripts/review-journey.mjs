import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const browser = await chromium.launch({ headless: true });
const checkpoints = [0, .1, .18, .24, .28, .33, .4, .5, .53, .57, .62, .67, .7, .74, .79, .84, .95];
mkdirSync("test-results/journey-review", { recursive: true });

for (const [name, viewport] of Object.entries({ desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } })) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3001/?motionDebug=1");
  await page.waitForFunction(() => window.__journeyDebug && !document.querySelector('[aria-busy="true"]'), null, { timeout: 30000 });
  await page.waitForFunction(() => sessionStorage.getItem("nima-intro") === "1");
  await page.locator('[aria-busy="true"]').waitFor({ state: "hidden", timeout: 10000 });
  await page.screenshot({ path: `test-results/journey-review/${name}-hero.png` });
  if (process.argv.includes("--hero")) { await page.close(); continue; }
  for (const progress of (process.argv.includes("--quick") ? [.18, .28, .4, .57, .67, .74, .84] : checkpoints)) {
    await page.evaluate(value => window.__journeyDebug.setProgress(value), progress);
    await page.waitForTimeout(1100);
    const scene = await page.locator("[data-scene]").getAttribute("data-scene");
    const positions = await page.evaluate(() => Object.fromEntries(["cargo", "truck", "roadTruck", "plane", "port", "ocean"].map(key => {
      const element = document.querySelector(`[data-j="${key}"]`);
      const box = element.getBoundingClientRect();
      return [key, { x: Math.round(box.x), y: Math.round(box.y), opacity: getComputedStyle(element).opacity }];
    })));
    const id = Math.round(progress * 100).toString().padStart(2, "0");
    await page.screenshot({ path: `test-results/journey-review/${name}-${id}.png` });
    console.log(JSON.stringify({ name, progress, scene, positions }));
  }
  await page.close();
}
await browser.close();
