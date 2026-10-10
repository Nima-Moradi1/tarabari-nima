import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home and contact have no serious automated accessibility violations",async({page})=>{
  for(const route of ["/","/contact"]){
    await page.goto(route);
    if(route==="/"){await page.waitForFunction(()=>sessionStorage.getItem("nima-intro")==="1");await expect(page.locator('[aria-busy="true"]')).toHaveCount(0)}
    const result=await new AxeBuilder({page}).withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
    expect(result.violations.filter(v=>v.impact==="critical"||v.impact==="serious"),`${route}: ${result.violations.map(v=>`${v.id} ${v.nodes.length}`).join(", ")}`).toEqual([]);
  }
});
test("reduced motion exposes every transport mode without pinning",async({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  const storyboard=page.getByRole("region",{name:"مراحل حمل‌ونقل"});
  await expect(storyboard).toBeVisible();
  for(const stage of ["آماده‌سازی و بارگیری","مسیر جاده‌ای","بنادر و حمل دریایی","حمل هوایی"])await expect(storyboard).toContainText(stage);
  await expect.poll(()=>page.evaluate(()=>window.__journeyDebug)).toBeUndefined();
});
