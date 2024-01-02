import { expect, test } from "@playwright/experimental-ct-react"

import { AppearanceSwitch } from "./appearance-switch"

test("should work", async ({ mount }) => {
  const component = await mount(<AppearanceSwitch />)
  expect(await component.textContent()).toBe("Light")
})

test("should be dark when browser is in dark mode", async ({ mount, page }) => {
  const component = await mount(<AppearanceSwitch />)
  expect(await component.textContent()).toBe("Light")

  await page.emulateMedia({ colorScheme: "dark" })
  await page.waitForTimeout(100)

  expect(
    await page.evaluate(
      () => matchMedia("(prefers-color-scheme: dark)").matches,
    ),
  ).toBe(true)
  expect(await component.textContent()).toBe("Dark")
})

test("should be dark after clicking on the switch", async ({ mount, page }) => {
  const component = await mount(<AppearanceSwitch />)
  expect(await component.textContent()).toBe("Light")

  await component.click()
  await page.waitForTimeout(100)

  expect(
    await page.evaluate(
      () => matchMedia("(prefers-color-scheme: dark)").matches,
    ),
  ).toBe(false)
  expect(await component.textContent()).toBe("Dark")
  expect(
    await page.evaluate(() =>
      window.document.documentElement.classList.contains("dark"),
    ),
  ).toBe(true)
})

test("should keep user preference after browser refresh", async ({
  mount,
  page,
}) => {
  const component1 = await mount(<AppearanceSwitch />)
  expect(await component1.textContent()).toBe("Light")

  await component1.click()
  await page.waitForTimeout(100)
  expect(await component1.textContent()).toBe("Dark")

  await page.reload()
  const component2 = await mount(<AppearanceSwitch />)
  expect(await component2.textContent()).toBe("Dark")
})

test("should keep user preference after browser appearance change", async ({
  mount,
  page,
}) => {
  const component = await mount(<AppearanceSwitch />)
  expect(await component.textContent()).toBe("Light")

  await component.click()
  await page.waitForTimeout(100)
  expect(await component.textContent()).toBe("Dark")

  await page.emulateMedia({ colorScheme: "light" })
  await page.waitForTimeout(100)
  expect(await component.textContent()).toBe("Dark")
})

test("should be synced back to system after system appearance change", async ({
  mount,
  page,
}) => {
  const component = await mount(<AppearanceSwitch />)
  expect(await component.textContent()).toBe("Light")

  await component.click()
  await page.waitForTimeout(100)
  expect(await component.textContent()).toBe("Dark")

  await page.emulateMedia({ colorScheme: "light" })
  await page.waitForTimeout(100)
  expect(await component.textContent()).toBe("Dark")

  await page.emulateMedia({ colorScheme: "dark" })
  await page.waitForTimeout(100)
  expect(await component.textContent()).toBe("Dark")

  await page.emulateMedia({ colorScheme: "light" })
  await page.waitForTimeout(100)
  expect(await component.textContent()).toBe("Light")
})
