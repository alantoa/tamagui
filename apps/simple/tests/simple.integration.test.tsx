import { expect, test } from '@playwright/test'
import waitPort from 'wait-port'
import { $ } from 'zx'

const port = 5008
const domain = `http://localhost:${port}`

test(`loads dev mode no error or warning logs`, async ({ page }) => {
  const server = $`yarn dev`
  try {
    await waitPort({
      port: port,
      host: 'localhost',
    })

    const logs = {
      error: [],
      warn: [],
      log: [],
      info: [],
    }

    page.on('console', (message) => {
      logs[message.type()] ||= []
      logs[message.type()].push(message.text())
    })

    await page.goto(domain, {
      waitUntil: 'domcontentloaded',
    })
    expect(logs.error.length).toBe(0)
    expect(logs.warn.length).toBe(0)
    await expect(page.getByText('Hello world').first()).toBeVisible()
  } finally {
    server.kill()
  }
})

test(`builds to prod same thing`, async ({ page }) => {
  await $`yarn build`
  const server = $`yarn vite preview --port ${port}`

  try {
    await waitPort({
      port: port,
      host: 'localhost',
    })

    const logs = {
      error: [],
      warn: [],
      log: [],
      info: [],
    }

    page.on('console', (message) => {
      logs[message.type()] ||= []
      logs[message.type()].push(message.text())
    })

    await page.goto(domain, {
      waitUntil: 'domcontentloaded',
    })
    expect(logs.error.length).toBe(0)
    expect(logs.warn.length).toBe(0)
    await expect(page.getByText('Hello world').first()).toBeVisible()
  } finally {
    server.kill()
  }
})
