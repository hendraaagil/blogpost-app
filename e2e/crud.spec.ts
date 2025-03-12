import test, { expect, Page, chromium } from '@playwright/test'

const post = {
  title: 'Hello, World!',
  body: 'Hello, World!',
}

test.describe('Create post', () => {
  test('should able to create a post', async ({ page }) => {
    await page.goto('/posts')
    const createButton = page.getByRole('button', { name: 'Create post' })
    await createButton.click()

    const authorInput = page.getByTestId('author-select')
    const titleInput = page.getByRole('textbox', { name: 'Title' })
    const bodyInput = page.getByRole('textbox', { name: 'Body' })

    await authorInput.click()
    await page.waitForSelector(
      '.ant-select-dropdown:not(.ant-select-dropdown-hidden)',
      { state: 'visible' },
    )
    await page.locator('.ant-select-item-option').first().click()

    await titleInput.fill(post.title)
    await bodyInput.fill(post.body)

    const submitButton = page.getByRole('button', { name: 'Submit' })
    await submitButton.click()

    const listItem = page.getByRole('cell', { name: post.title }).first()
    await expect(listItem).toBeVisible()
  })
})

test.describe('View post', () => {
  test('should able to view a post', async ({ page }) => {
    await page.goto('/posts')

    const viewButton = page
      .getByRole('button', {
        name: 'View detail post',
      })
      .first()
    await viewButton.click()

    const title = page.getByRole('heading', { name: /hello, world/i })
    const body = page
      .getByRole('paragraph')
      .filter({ hasText: /hello, world/i })

    await expect(title).toBeVisible()
    await expect(body).toBeVisible()
  })
})

test.describe('Update post', () => {
  test('should able to update a post', async ({ page }) => {
    await page.goto('/posts')

    const viewButton = page
      .getByRole('button', {
        name: 'View detail post',
      })
      .first()
    await viewButton.click()

    const updateButton = page.getByRole('button', { name: 'Update' })
    await updateButton.click()

    const dialog = page.getByRole('dialog', { name: 'Update post' })
    await expect(dialog).toBeVisible()

    const titleInput = page.getByRole('textbox', { name: 'Title' })
    const bodyInput = page.getByRole('textbox', { name: 'Body' })
    await titleInput.fill(post.title + ' Edited')
    await bodyInput.fill(post.body + ' Edited')

    const submitButton = page.getByRole('button', { name: 'Submit' })
    await submitButton.click()

    await expect(dialog).not.toBeVisible()
    await expect(
      page.getByRole('heading', { name: post.title + ' Edited' }),
    ).toBeVisible()
    await expect(
      page.getByRole('paragraph').filter({ hasText: post.body + ' Edited' }),
    ).toBeVisible()
  })
})

test.describe('Delete posts', () => {
  test('should able to delete posts', async ({ page }) => {
    await page.goto('/posts')
    const posts = await page.getByRole('row', { name: /hello, world/i }).all()

    await Promise.all(
      posts.map(async (post) => {
        const button = post.getByRole('button', { name: 'Delete post' })
        await button.click()

        const dialog = page.getByRole('dialog')
        const confirmButton = dialog.getByRole('button', { name: 'Yes' })
        await confirmButton.click()

        await expect(dialog).not.toBeVisible()
      }),
    )
  })
})
