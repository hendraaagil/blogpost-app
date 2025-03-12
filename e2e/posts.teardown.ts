import { test as cleanup, expect } from '@playwright/test'

cleanup('cleanup', async ({ page }) => {
  await page.goto('/posts')
  const posts = await page.getByRole('row', { name: /hello, world/i }).all()

  for (const post of posts) {
    const button = post.getByRole('button', { name: 'Delete post' })
    button.click()

    const dialog = page.getByRole('dialog', { name: 'Delete post' })
    const confirmButton = dialog.getByRole('button', { name: 'Yes' })
    confirmButton.click()

    await expect(dialog).not.toBeVisible()
  }
})
