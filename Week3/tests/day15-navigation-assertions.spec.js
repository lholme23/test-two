// Navigations- tells where the user wants to go
// Assertions- to check if something is true

import {test, expect} from '@playwright/test';

test('Mini Shop Test', async ({page}) => {
//Navigate to homepage
await page.goto('https://mini-shop.testamplify.com/');
console.log ('1. Mini Shop homepage loaded');

//Assert Title and URL
await expect (page).toHaveTitle("Minishop");
await expect (page).toHaveURL('https://mini-shop.testamplify.com/');
console.log('2. Title and URL Asserted');

//Click a product category
await page.getByRole('link', {name: 'Products'}).first().click();
console.log('3. Product Category Clicked');

//Assert you're on the product page
await expect (page.getByRole ('heading', {name: 'All Products'})).toBeVisible();
console.log('4. Product Page Verified');

//Count the product items
const product = page.getByText('Add to cart');
await expect(product).toHaveCount(4);
console.log('5. Number of Product Items Verified');

//Verify key buttons are enabled
const addToCart = page.getByRole('button', {name: /add to cart/i}).first();
await expect(addToCart).toBeEnabled();
console.log('6. Add to Cart Button Verified');

//Navigate back and forward
await page.goBack();
await expect (page).toHaveTitle("Minishop");
await page.goForward();
await expect (page.getByRole ('heading', {name: 'All Products'})).toBeVisible();
console.log('7. Navigated back and forward');

//Confirm visibility of a key text
await
await expect (page.getByText('Exclusive Offer!')).toBeVisible();
console.log('8. Text Visible');

})