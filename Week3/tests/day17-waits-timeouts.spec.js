import {test, expect} from '@playwright/test';

test('Day 17: Waits and Loads Homework' , async ({page}) => {

//1. Navigate to Mini Bank and wait for load
await page.goto('https://mini-bank.testamplify.com/');
await expect(page).toHaveURL('https://mini-bank.testamplify.com/');
console.log('1. Go to Minibank and waited for page to load');

//2. Login and wait for Dashboard
await page.getByRole('button', {name: 'Login'}).click();
await page.locator('#email').fill('testuser2@yopmail.com');
console.log('2a. Username entered');

await page.locator('#password').fill('Pass2005#'); // also (page.locator("//input[type='password' or contains(@placeholder, 'password') or contains_@name, 'password')]"))
console.log('2b. Password entered');

await page.locator('button[type="submit"]').click(); //also (//button[normalize-space()='Login' or @type='submit'])
await page.waitForLoadState();
console.log('2c. Login clicked');

await expect(page.locator("//h2[contains(., 'Overview')]")).toBeVisible();
console.log('2d. Logged in successfully and waited to see Dashboard');

//3. Locate recent transactions and wait for history table

await page.waitForSelector("//h2[contains(., 'Recent Transactions')]"); //wait to see Recent Transactions
const transactions = page.locator("//div[contains(text(), 'Deposit')]"); //locate first deposit line in  table
await expect(transactions.first()).toBeVisible(); //wait for first transaction in list to be visible
console.log('3. Located recent transactions and verified history table');


//4. Click "See All" to open transactions page
const seeAllBtn= page.locator("//a[contains(., 'See All')]");
await seeAllBtn.click();
console.log('4. Clicked See All Button');

//5. Wait for Transactions page to load
await page.waitForURL("**/dashboard/transactions");
await expect (page).toHaveURL('https://mini-bank.testamplify.com/dashboard/transactions');
console.log('5. Waited for transactions page to load');

//6. Wait for transaction table to load
await page.waitForSelector("//div[text()='Deposit']");
console.log('6. Transactions table loaded');

//Smart wait- ensures at least one amount value is visible
const amountCells = page.locator("//td[contains(., '$')]");
await expect(amountCells.first()).toBeVisible();
await expect(amountCells.first()).toContainText('$');

//7. Demostrate intential timeout- Only recommended during debugging
await page.waitForTimeout(5000); //5 seconds
console.log('7. Demonstrate intentional short timeout for debugging');

//8. Click Dashboard tab on the left
const dashboardBtn =  page.locator("//span[text()='Dashboard']");
await dashboardBtn.click();
console.log('8. Dashboard tab clicked')

//9. Verified "Start a Transaction button is enabled"
const startTransBtn = page.locator("//button[contains(., 'Start a transaction')]");
await expect (startTransBtn).toBeEnabled();
console.log('9. Start Transaction button is enabled');

console.log('TEST COMPLETE!!');

})