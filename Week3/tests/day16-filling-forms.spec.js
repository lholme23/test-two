//XPath practice
// //tag[@attribute="value"]
//example: //button[@type="submit"]

import { test, expect } from '@playwright/test';

test ('Day 16 - Fill Mini Shop checkout form', async ({page}) => {
// 1. Go to Mini Shop
console.log('Step 1. Maximize page and go to Mini Shop home page');
await page.setViewportSize({ width: 1920, height:1080 });
await page.goto('https://mini-shop.testamplify.com/');
await expect (page).toHaveURL('https://mini-shop.testamplify.com/');

//2. Add first product to cart (first Add to Cart on the page)
console.log('Step 2: Add first product to cart');
const addToCartBtn = page.locator("(//button[normalize-space()='Add to cart'])[1]");
await expect(addToCartBtn).toBeVisible();
await addToCartBtn.click();

//3. Open cart (top right icon/link)
const cartLink = page.locator("//a[@href='/cart']");
await cartLink.click();
await expect (page).toHaveURL("https://mini-shop.testamplify.com/cart");
console.log('Step 3: Cart Opened');

//4. Click "Continue to Checkout"- should open to log in page if not logged in
console.log ('Step 4: Continue to Checkout Clicked on cart page');
const cartCheckoutBtn = page.locator("//button[normalize-space()='Continue to checkout']");
await cartCheckoutBtn.click();

//5. Login page- enter email, password, click Login
console.log('Step 5: Login to Checkout');
const emailInput = page.locator("//input[@type='email']");
await emailInput.fill('testuser2@yopmail.com');
const passwordInput = page.locator("//input[@type='password']");
await passwordInput.fill('Pass2005#');
const loginBtn = page.locator("//button[normalize-space()='Login']");
await loginBtn.click();

//Wait for page to load
await page.waitForLoadState('load');

//6. Click Continue to Checkout
console.log('Step 6. Continue to Checkout Clicked');
const contCheckoutBtn = page.locator("//button[normalize-space()='Continue to checkout']");
await contCheckoutBtn.click();

//6.5 Assert we are on the checkout page
await expect(page).toHaveURL('https://mini-shop.testamplify.com/checkout');
const billingHeading = page.locator("//h1[normalize-space()='Billing Details']");
await expect (billingHeading).toBeVisible();
console.log('Verified on the Billing Details page');

//7. Fill Billing Details
console.log('Step 7. Fill in Billing Details Form');
await page.locator("//label[contains(.,'First name')]/following-sibling::input").fill('Latrice');
await page.locator("//label[contains(.,'Last name')]/following-sibling::input").fill('Holmes');
await page.locator("//input[@placeholder='House number and street name']").fill('4408 The Valley');
await page.locator("//input[@name='town']").fill('Atlanta');

const stateField = page.locator("input[name='state']");
await stateField.click();
await page.getByText('Georgia', { exact: true }).click();

await page.locator("//input[@name='zip']").fill('30328');
await page.locator("//input[@name='phone']").fill('7087694727');
await page.locator("//input[@name='email']").fill('lholme23@gmail.com');

await page.locator("//input[@name='cardNo']").fill('4242 4242 4242 4242');
await page.locator("input[name='expiryDate']").fill('10/26');
await page.locator("//input[@name='ccv']").fill('200');
await page.locator("//input[@name='cardName']").fill('Latrice N. Holmes');

//Click Continue to Paymet (Submit)
console.log('Step 8. Click Continue to Payment or Submit');
const checkoutBtn = page.locator("//button[@type='submit']");
await checkoutBtn.click();

//Success page

await expect(page).toHaveURL(/checkout/);
const successText = page.getByText('Your order is successful', {exact: false});
await expect(successText).toBeVisible();
console.log('Step 9. Order Successful!!');

console.log('Day 16 form flow complete using only XPath');
})