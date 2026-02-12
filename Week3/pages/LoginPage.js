import { expect } from '@playwright/test';
import { URLs, credentials } from '../test-data/credentials.js';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator('#email');
    this.password = page.locator('#password');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
  }
  async goto(){
    await this.page.goto(URLs.login);
  }
  
  async assertLoaded() {
    await expect(this.page).toHaveURL(URLs.login);
    await expect(this.loginBtn).toBeVisible();
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

  async assertDashboardLoaded() {
    await expect(this.page).toHaveURL(URLs.dashboard);
}}