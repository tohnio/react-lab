import { test, expect } from '@playwright/test';

test.describe('E2E Demo Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/modern/e2e');
    });

    test('should display the correct title', async ({ page }) => {
        await expect(page.getByTestId('page-title')).toHaveText('E2E Testing Demo');
    });

    test('should increment counter', async ({ page }) => {
        const counterDisplay = page.getByTestId('count-display');
        await expect(counterDisplay).toHaveText('Contagem atual: 0');

        await page.getByTestId('increment-btn').click();
        await expect(counterDisplay).toHaveText('Contagem atual: 1');

        await page.getByTestId('increment-btn').click();
        await expect(counterDisplay).toHaveText('Contagem atual: 2');
    });

    test('should update display text from input', async ({ page }) => {
        const input = page.getByTestId('text-input');
        const updateBtn = page.getByTestId('update-text-btn');

        // Button should be disabled initially
        await expect(updateBtn).toBeDisabled();

        // Type text
        await input.fill('Hello Playwright');
        await expect(updateBtn).toBeEnabled();

        // Click update
        await updateBtn.click();

        // Check display text
        await expect(page.getByTestId('display-text')).toHaveText('Hello Playwright');

        // Input should be cleared
        await expect(input).toHaveValue('');
    });

    test('should add and remove items from list', async ({ page }) => {
        const addBtn = page.getByTestId('add-item-btn');
        const list = page.getByTestId('item-list');

        // Initial state (2 items)
        await expect(list.locator('li')).toHaveCount(2);

        // Add item
        await addBtn.click();
        await expect(list.locator('li')).toHaveCount(3);
        await expect(list.locator('li').last()).toContainText('Item 3');

        // Remove item (remove the first one)
        await page.getByTestId('remove-item-0').click();
        await expect(list.locator('li')).toHaveCount(2);

        // Verify remaining items
        await expect(list.locator('li').first()).toContainText('Item 2');
    });
});
