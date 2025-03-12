import test, { expect } from '@playwright/test'

const name = process.env.USER_NAME as string
const token = process.env.USER_TOKEN as string

test.describe('Login', () => {
  test('should login', async ({ page }) => {
    await page.goto('/')

    const dialog = page.getByRole('dialog', {
      name: 'Fill the form below to proceed',
    })
    await expect(dialog).toBeVisible()

    const nameInput = page.getByRole('textbox', { name: 'Name' })
    const tokenInput = page.getByRole('textbox', { name: /token/i })
    const submitButton = page.getByRole('button', { name: 'Submit' })

    await nameInput.fill(name)
    await tokenInput.fill(token)
    await submitButton.click()

    await expect(dialog).not.toBeVisible()
    await expect(page).toHaveURL('/posts')
  })
})
