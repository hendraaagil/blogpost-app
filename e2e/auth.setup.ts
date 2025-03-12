import { test as setup, expect } from '@playwright/test'
import path from 'path'

const authFile = path.join(__dirname, '../e2e/.auth/user.json')

setup('authenticate', async ({ page }) => {
  await page.goto('/')

  const dialog = page.getByRole('dialog', {
    name: 'Fill the form below to proceed',
  })
  const nameInput = page.getByRole('textbox', { name: 'Name' })
  const tokenInput = page.getByRole('textbox', { name: 'Go REST Token' })

  await expect(dialog).toBeVisible()
  await nameInput.fill(process.env.USER_NAME as string)
  await tokenInput.fill(process.env.USER_TOKEN as string)

  const submitButton = page.getByRole('button', { name: 'Submit' })
  await submitButton.click()

  await expect(dialog).not.toBeVisible()
  await page.context().storageState({ path: authFile })
})
