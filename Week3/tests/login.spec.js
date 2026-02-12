import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { credentials} from '../test-data/credentials.js';

test('Login flow for Mini Bank', async ({ page }) => {
const loginPage = new LoginPage(page);

await loginPage.goto();
await loginPage.assertLoaded();
console.log('1. Go to Log In page')


await loginPage.login(credentials.email, credentials.password);
console.log('2. Logging In')


await loginPage.assertDashboardLoaded();
console.log('3. Landed on Dashboard page')
});