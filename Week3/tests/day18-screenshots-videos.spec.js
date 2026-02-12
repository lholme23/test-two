//(manual screenshot) page.screenshot

import {test, expect} from '@playwright/test';

test('Day 18: Screenshots and Videos Homework' , async ({page}) => {

//1. Navigate to Mini Bank and wait for load
await page.setViewportSize({width: 1920, height:1080});
await page.goto('https://mini-bank.testamplify.com/');
await expect(page).toHaveURL('https://mini-bank.testamplify.com/');
console.log('1. Go to Minibank and waited for page to load');

//2. Login
await page.getByRole('button', {name: 'Login'}).click();
await page.locator('#email').fill('testuser2@yopmail.com');
console.log('2a. Username entered');

await page.locator('#password').fill('Pass2005#'); // also (page.locator("//input[type='password' or contains(@placeholder, 'password') or contains_@name, 'password')]"))
console.log('2b. Password entered');

await page.locator('button[type="submit"]').click(); //also (//button[normalize-space()='Login' or @type='submit'])
await page.waitForLoadState();
console.log('2c. Login clicked');

//3. Wait for Dashboard to load

await expect(page.locator("//h2[contains(., 'Overview')]")).toBeVisible();
console.log('3. Waited to see Dashboard');


//4. Locate recent transactions and wait for history table

await page.waitForSelector("//h2[contains(., 'Recent Transactions')]"); //wait to see Recent Transactions
const transactions = page.locator("//div[contains(text(), 'Deposit')]"); //locate first deposit line in  table
await expect(transactions.first()).toBeVisible(); //wait for first transaction in list to be visible
console.log('4. Located recent transactions and verified history table');


//5. Click "See All" to open transactions page
const seeAllBtn= page.locator("//a[contains(., 'See All')]");
await seeAllBtn.click();
console.log('5. Clicked See All Button');

//6. Wait for Transactions page to load
await page.waitForURL("**/dashboard/transactions");
await expect (page).toHaveURL('https://mini-bank.testamplify.com/dashboard/transactions');
console.log('6. Waited for transactions page to load');

//7. Wait for transaction table to load
await page.waitForSelector("//input[text()='Deposit']");
console.log('7. Transactions table loaded');

//Smart wait- ensures at least one amount value is visible
const amountCells = page.locator("//td[contains(., '$')]");
await expect(amountCells.first()).toBeVisible();
await expect(amountCells.first()).toContainText('$');

console.log('TEST COMPLETE and screenshot saved!!');

})