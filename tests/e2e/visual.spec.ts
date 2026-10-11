import { test, expect } from "@playwright/test";
import { mkdirSync } from "node:fs";
test("stacker places the container before the loaded truck turns onto the road", async ({ page, isMobile }) => {
  if (!isMobile) await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForFunction(() => sessionStorage.getItem("nima-intro") === "1");
  const seek = async (progress: number) => {
    await page.evaluate(value => window.__journeyDebug?.setProgress(value), progress);
    await expect.poll(() => page.evaluate(() => window.__journeyDebug?.getProgress()), { timeout: 5000 }).toBeCloseTo(progress, 2);
    await page.waitForTimeout(950);
  };
  await seek(.154);
  const suspended = await page.locator('[data-j="cargo"]').boundingBox();
  await expect.poll(() => page.locator('[data-j="stackerGrip"]').evaluate(element => Number(getComputedStyle(element).opacity))).toBeGreaterThan(.9);
  await seek(.167);
  const landed = await page.locator('[data-j="cargo"]').boundingBox();
  const trailer = await page.locator('[data-j="truck"]').boundingBox();
  expect(suspended && landed && trailer && landed.y > suspended.y && landed.x >= trailer.x && landed.x + landed.width <= trailer.x + trailer.width).toBeTruthy();
  await seek(.18);
  await expect.poll(() => page.locator('[data-j="stackerGrip"]').evaluate(element => Number(getComputedStyle(element).opacity))).toBeLessThan(.05);
  await seek(.25);
  const side = await page.locator('[data-j="truck"]').boundingBox();
  const overhead = await page.locator('[data-j="roadTruck"]').boundingBox();
  expect(side && overhead && Math.abs(side.x + side.width / 2 - overhead.x - overhead.width / 2) < page.viewportSize()!.width * .22).toBeTruthy();
  await seek(.276);
  await expect.poll(() => page.locator('[data-j="roadTruck"]').evaluate(element => Number(getComputedStyle(element).opacity))).toBeGreaterThan(.9);
  await seek(.154);
  await expect.poll(() => page.locator('[data-j="stackerGrip"]').evaluate(element => Number(getComputedStyle(element).opacity))).toBeGreaterThan(.9);
});
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
  await page.evaluate(()=>window.__journeyDebug?.setProgress(.18));
  await expect(page.locator("[data-scene]")).toHaveAttribute("data-scene","warehouse");
  await expect.poll(()=>page.locator('[data-j="truck"]').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeGreaterThan(.9);
  await expect.poll(()=>page.locator('[data-j="cargo"]').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeGreaterThan(.9);
  const loadedTruck=await page.locator('[data-j="truck"]').boundingBox();
  const loadedCargo=await page.locator('[data-j="cargo"]').boundingBox();
  expect(loadedTruck&&loadedCargo&&loadedCargo.x>=loadedTruck.x&&loadedCargo.x+loadedCargo.width<=loadedTruck.x+loadedTruck.width).toBeTruthy();
  await page.evaluate(()=>window.__journeyDebug?.setProgress(.276));
  await expect(page.locator("[data-scene]")).toHaveAttribute("data-scene","road");
  await expect.poll(()=>page.locator('[data-j="roadTruck"]').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeGreaterThan(.9);
  await expect(page.getByRole("heading",{name:"مسیر جاده‌ای"})).toBeVisible();
  await page.waitForTimeout(950);
  await page.screenshot({path:`test-results/visual/road-${size}.png`});
  await page.evaluate(()=>window.__journeyDebug?.setProgress(.359));
  await expect(page.locator("[data-scene]")).toHaveAttribute("data-scene","port");
  await expect.poll(()=>page.locator('[data-j="port"]').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeGreaterThan(.9);
  await expect(page.getByRole("heading",{name:"بندر و انتقال بار"})).toBeVisible();
  await page.waitForTimeout(950);
  const cargoBeforeLift=await page.locator('[data-j="cargo"]').boundingBox();
  await page.evaluate(()=>window.__journeyDebug?.setProgress(.385));
  await expect(page.locator("[data-scene]")).toHaveAttribute("data-scene","port");
  await expect.poll(()=>page.locator('[data-j="cargo"]').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeGreaterThan(.9);
  await page.waitForTimeout(950);
  const cargoAfterLift=await page.locator('[data-j="cargo"]').boundingBox();
  expect(cargoBeforeLift&&cargoAfterLift&&cargoAfterLift.y<cargoBeforeLift.y).toBeTruthy();
  await page.screenshot({path:`test-results/visual/port-${size}.png`});
  await page.evaluate(()=>window.__journeyDebug?.setProgress(.468));
  await expect(page.locator("[data-scene]")).toHaveAttribute("data-scene","ocean");
  const ship=await page.locator('[data-j="ship"]').boundingBox();
  const deckCargo=await page.locator('[data-j="deckCargo"]').boundingBox();
  expect(ship&&deckCargo&&deckCargo.x>=ship.x&&deckCargo.x+deckCargo.width<=ship.x+ship.width&&deckCargo.y>=ship.y&&deckCargo.y+deckCargo.height<=ship.y+ship.height).toBeTruthy();
  await page.evaluate(()=>window.__journeyDebug?.setProgress(.80));
  await expect(page.locator("[data-scene]")).toHaveAttribute("data-scene","air");
  await expect.poll(()=>page.locator('[data-j="air"]').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeGreaterThan(.9);
  await expect(page.getByRole("heading",{name:"حمل هوایی"})).toBeVisible();
  await page.waitForTimeout(950);
  await page.screenshot({path:`test-results/visual/air-${size}.png`});
  await page.evaluate(()=>window.__journeyDebug?.setProgress(.88));
  await expect.poll(()=>page.locator('[data-j="airCargo"]').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeLessThan(.05);
  await expect.poll(()=>page.locator('[data-j="plane"]').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeGreaterThan(.9);
});

test("ship passage, aircraft landing, hold loading and cloud departure have distinct frames",async({page,isMobile})=>{
  mkdirSync("test-results/visual",{recursive:true});
  if(!isMobile)await page.setViewportSize({width:1440,height:900});
  await page.goto("/");
  await page.waitForFunction(()=>sessionStorage.getItem("nima-intro")==="1");
  await expect(page.locator('[aria-busy="true"]')).toHaveCount(0);
  const seek=async(progress:number,phase:string,name:string)=>{
    await page.evaluate(value=>window.__journeyDebug?.setProgress(value),progress);
    await expect(page.locator("[data-scene]")).toHaveAttribute("data-phase",phase);
    await page.waitForTimeout(950);
    await page.screenshot({path:`test-results/visual/${name}-${isMobile?"mobile":"desktop"}.png`});
  };
  await seek(.56,"sailing","sea-passage");
  const waterMotion = page.locator('[data-j="waterSwell"]');
  const swellBefore = await waterMotion.evaluate(element => element.getBoundingClientRect().x);
  await page.evaluate(() => new Promise<void>(resolve => {
    let frames = 0;
    const next = () => { if (++frames === 20) resolve(); else requestAnimationFrame(next); };
    requestAnimationFrame(next);
  }));
  const swellAfter = await waterMotion.evaluate(element => element.getBoundingClientRect().x);
  expect(swellAfter).not.toBe(swellBefore);
  const firstShip=await page.locator('[data-j="shipBody"] > image').boundingBox();
  const firstWater=await page.locator('[data-j="waterSurface"]').boundingBox();
  await seek(.64,"sailing","sea-departure");
  const laterShip=await page.locator('[data-j="shipBody"] > image').boundingBox();
  const laterWater=await page.locator('[data-j="waterSurface"]').boundingBox();
  expect(firstWater&&laterWater&&Math.abs(laterWater.x-firstWater.x)+Math.abs(laterWater.y-firstWater.y)>1).toBeTruthy();
  const viewportWidth=page.viewportSize()!.width;
  expect(firstShip&&laterShip&&laterShip.width<firstShip.width&&laterShip.y<firstShip.y&&firstShip.x+firstShip.width/2>viewportWidth*.2&&firstShip.x+firstShip.width/2<viewportWidth*.8&&laterShip.x+laterShip.width/2>viewportWidth*.2&&laterShip.x+laterShip.width/2<viewportWidth*.8).toBeTruthy();
  await seek(.70,"landing","air-approach");
  await seek(.745,"landing","air-touchdown");
  const landedPlane=await page.locator('[data-j="plane"] > image').boundingBox();
  await seek(.79,"air-loading","air-load-start");
  await expect.poll(()=>page.locator('[data-j="airPayload"]').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeGreaterThan(.9);
  const payload=await page.locator('[data-j="airPayload"]').boundingBox();
  const hatch=await page.locator('[data-j="hatch"]').boundingBox();
  expect(payload&&hatch&&payload.x>hatch.x&&payload.y<hatch.y+hatch.height&&payload.y+payload.height>hatch.y).toBeTruthy();
  await seek(.83,"air-loading","air-load-enter");
  await expect.poll(()=>page.locator('[data-j="airPayload"]').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeLessThan(.05);
  await seek(.90,"takeoff","air-takeoff");
  await expect.poll(()=>page.locator('[data-j="airCargo"]').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeLessThan(.05);
  await seek(.96,"takeoff","air-clouds");
  await expect.poll(()=>page.locator('[data-j="hatch"]').evaluate(element=>Number(getComputedStyle(element).opacity))).toBeLessThan(.05);
  const climbingPlane=await page.locator('[data-j="plane"] > image').boundingBox();
  expect(landedPlane&&climbingPlane&&climbingPlane.width<landedPlane.width*.75).toBeTruthy();
  await seek(.79,"air-loading","air-load-reverse");
});
test("contact visual checkpoint",async({page,isMobile})=>{
  mkdirSync("test-results/visual",{recursive:true});
  if(!isMobile)await page.setViewportSize({width:1440,height:900});
  await page.goto("/contact");
  await expect(page.locator("h1")).toBeVisible();
  await page.screenshot({path:`test-results/visual/contact-${isMobile?"mobile":"desktop"}.png`});
  await page.locator("form").scrollIntoViewIfNeeded();
  await page.screenshot({path:`test-results/visual/contact-form-${isMobile?"mobile":"desktop"}.png`});
});

test("reading pages fit the viewport",async({page,isMobile})=>{
  mkdirSync("test-results/visual",{recursive:true});
  if(!isMobile)await page.setViewportSize({width:1440,height:900});
  for(const [route,name] of [["/insights/choosing-transport","article"],["/about","about"]] as const){
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
    expect(overflow).toBe(false);
    await page.screenshot({path:`test-results/visual/${name}-${isMobile?"mobile":"desktop"}.png`,fullPage:true});
  }
});

test("globe falls back when WebGL is unavailable",async({page})=>{
  await page.addInitScript(()=>{
    const getContext=HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,type,...args){
      if(type==="webgl"||type==="webgl2")return null;
      return getContext.call(this,type,...args);
    } as typeof getContext;
  });
  await page.goto("/");
  await expect(page.getByRole("img",{name:/تصویر جایگزین کره زمین/})).toBeVisible();
});

test("development motion HUD reports journey progress",async({page})=>{
  await page.goto("/?motionDebug=1");
  const hud=page.getByLabel("ابزار بررسی حرکت");
  await expect(hud).toBeVisible();
  await page.evaluate(()=>window.__journeyDebug?.setProgress(.365));
  await expect(hud).toContainText("port");
  await expect(hud).toContainText("triggers");
  await hud.getByRole("button",{name:"pause"}).click();
  await expect(hud.getByRole("button",{name:"resume"})).toBeVisible();
  await hud.getByRole("button",{name:"resume"}).click();
});
