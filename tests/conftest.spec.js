const base = require('@playwright/test');

exports.test = base.test.extend({
  bernierPage: async ({ page }, use) => {
    await page.goto('http://localhost:3000/signin');
    await page.locator('[id="username"]').fill('Katharina_Bernier');
    await page.locator('[id="password"]').fill('s3cret');
    await page.locator('[data-test="signin-submit"]').click();
    await use(page);
  },
});
exports.expect = base.expect;