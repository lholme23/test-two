import {test, expect} from '@playwright/test';

test('Day 16 Homework- Log into HRM site with an assertion', async ({page}) => {
//1. 
await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
console.log('1. Navigate to Orange HRM log in page');
//2. 
await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
console.log('2. Verified on correct page');
//3. 
const usernameField = page.getByPlaceholder('Username');
await expect(usernameField).toBeVisible();
await usernameField.fill('Admin');
console.log('3. Entered username successfully');
//4. 
const passwordField = page.getByPlaceholder('Password');
await expect(passwordField).toBeVisible();
await passwordField.fill('admin123');
console.log('4. Entered password successfully');
//5. 
const loginBtn = page.locator('//button[@type="submit"]');
await loginBtn.click();
console.log('5. Clicked Log In');

await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard');
console.log('6. Logged in Successfully!');
})