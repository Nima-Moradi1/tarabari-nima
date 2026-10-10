import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";
test("visual checkpoints",async({page,isMobile})=>{
  mkdirSync("test-results/visual",{recursive:true});
  const size=isMobile?"mobile":"desktop";
  if(!isMobile)await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await page.waitForFunction(()=>sessionStorage.getItem("nima-intro")==="1");
  await expect(page.locator('[aria-busy="true"]')).toHaveCount(0);
  await expect(page.locator("canvas")).toBeVisible();
  await page.screenshot({path:`test-results/visual/home-${size}.png`});
  await page.evaluate(()=>window.__journeyDebug?.setProgress(.52));
  await expect(page.locator("[data-scene]")).toHaveAttribute("data-scene","port");
  await expect.poll(()=>page.locator('[data-j="port"]').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeGreaterThan(.9);
  await page.screenshot({path:`test-results/visual/port-${size}.png`});
});
test("contact visual checkpoint",async({page,isMobile})=>{
  mkdirSync("test-results/visual",{recursive:true});
  if(!isMobile)await page.setViewportSize({width:1440,height:900});
  await page.goto("/contact");
  await expect(page.locator("h1")).toBeVisible();
  await page.screenshot({path:`test-results/visual/contact-${isMobile?"mobile":"desktop"}.png`});
});
