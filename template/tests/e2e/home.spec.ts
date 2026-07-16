import { expect, test } from '@playwright/test'

test('home page carga correctamente', async ({ page }) => {
  await page.goto('/')

  // El smoke test más básico: la página responde 200 y tiene contenido.
  await expect(page).toHaveTitle(/Create Stack Next/)

  // El contador debe estar visible.
  await expect(page.getByRole('button', { name: /count/i })).toBeVisible()
})

test('health endpoint responde ok', async ({ request }) => {
  const response = await request.get('/api/health')
  expect(response.ok()).toBeTruthy()

  const body = await response.json()
  expect(body.status).toBe('ok')
  expect(body.timestamp).toBeTruthy()
})
