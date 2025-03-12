import test, { expect } from '@playwright/test'

test.describe('Login', () => {
  test('should login', async ({ page }) => {
    await page.goto('/')

    const dialog = page.getByRole('dialog', {
      name: 'Fill the form below to proceed',
    })
    await expect(dialog).toBeVisible()
  })
})
