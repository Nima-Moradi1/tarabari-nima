import { expect, test } from "@playwright/test";

test("published text and images cannot be selected, copied, or dragged", async ({ page }) => {
  await page.goto("/about");
  const heading = page.locator("h1");
  const logo = page.locator(".brand-logo img").first();

  await expect.poll(() => heading.evaluate(element => {
    const event = new Event("copy", { bubbles: true, cancelable: true });
    element.dispatchEvent(event);
    return event.defaultPrevented;
  })).toBe(true);

  expect(await heading.evaluate(element => getComputedStyle(element).userSelect)).toBe("none");
  expect(await logo.evaluate(element => getComputedStyle(element).getPropertyValue("-webkit-user-drag"))).toBe("none");

  for (const type of ["selectstart", "contextmenu", "copy", "cut"]) {
    expect(await heading.evaluate((element, eventType) => {
      const event = new Event(eventType, { bubbles: true, cancelable: true });
      element.dispatchEvent(event);
      return event.defaultPrevented;
    }, type)).toBe(true);
  }

  expect(await logo.evaluate(element => {
    const event = new Event("dragstart", { bubbles: true, cancelable: true });
    element.dispatchEvent(event);
    return event.defaultPrevented;
  })).toBe(true);
});

test("the inquiry form remains editable while copying stays blocked", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator("form[data-hydrated]")).toHaveAttribute("data-hydrated", "true");
  const name = page.getByLabel("نام و نام خانوادگی *");
  await name.fill("نیما احمدی");
  await expect(name).toHaveValue("نیما احمدی");
  expect(await name.evaluate(element => getComputedStyle(element).userSelect)).toBe("text");
  expect(await name.evaluate(element => {
    const event = new Event("copy", { bubbles: true, cancelable: true });
    element.dispatchEvent(event);
    return event.defaultPrevented;
  })).toBe(true);
});
