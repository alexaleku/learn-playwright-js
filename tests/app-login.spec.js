// @ts-check
const { test, expect } = require('./conftest.spec');

test('Test Login Successful', async ({ bernierPage }) => {
  await expect(bernierPage.locator('[data-test="sidenav-user-full-name"]')).toBeVisible();
  await expect(bernierPage.locator('[data-test="sidenav-user-full-name"]')).toContainText('Edgar J');
  await expect(bernierPage.locator('[data-test="sidenav-username"]')).toContainText('@Katharina_Bernier');
});

test('Test My Account Page', async ({ bernierPage }) => {
  await bernierPage.getByText('My Account').click();

  await expect(bernierPage.locator('[name="firstName"]')).toHaveValue('Edgar');
  await expect(bernierPage.locator('[name="lastName"]')).toHaveValue('Johns');
  await expect(bernierPage.locator('[name="email"]')).toHaveValue('Norene39@yahoo.com');
  await expect(bernierPage.locator('[name="phoneNumber"]')).toHaveValue('625-316-9882');

});

test('Test Transfer Money', async ({ bernierPage }) => {
  const currentBalance = await bernierPage.locator('[data-test="sidenav-user-balance"]').textContent();

  await bernierPage.locator('[data-test="nav-top-new-transaction"]').click();
  await bernierPage.getByText('Arely Kertzmann').click();
  await bernierPage.locator('[id="amount"]').fill('100');
  await bernierPage.locator('[id="transaction-create-description-input"]').fill('Test');
  await bernierPage.locator('[data-test="transaction-create-submit-payment"]').click();
  await bernierPage.reload();
  const newBanalce = await bernierPage.locator('[data-test="sidenav-user-balance"]').textContent();
  expect(parseFloat(newBanalce)).toBe(parseFloat(currentBalance) + 100);
});

test('Test Login Failure - Invalid Password', async ({ page }) => {
  await page.goto('http://localhost:3000/signin');
  await page.locator('[id="username"]').fill('Katharina_Bernier');
  await page.locator('[id="password"]').fill('test'); // invalid password
  await page.locator('[data-test="signin-submit"]').click();
  await expect(page.locator('[data-test="signin-error"]')).toBeVisible();
  await expect(page.locator('[data-test="signin-error"]')).toContainText('Username or password is invalid');
});