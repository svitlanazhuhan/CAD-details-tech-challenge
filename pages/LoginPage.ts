import {Locator, Page, expect} from '@playwright/test'

export class LoginPage {
  private readonly page: Page
  private readonly signInButton: Locator
  private readonly emailInput: Locator
  private readonly passwordInput: Locator
  private readonly loginButton: Locator

  constructor(page: Page){
    this.page = page
    this.signInButton = page.getByRole('button', { name: 'Sign in' })
    this.emailInput = page.getByRole('textbox', { name: 'Enter your Email' })
    this.passwordInput = page.getByRole('textbox', { name: 'Enter your Password' })
    this.loginButton = page.getByTestId('loginButton')
  }

  async login(username: string, password: string){
    await this.signInButton.click()
    await this.emailInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }
 
  async verifyLoginSucess(){
    await expect(this.page.getByRole('button', { name: 'Sign in' })).toBeHidden()
    await expect(this.page.locator('#navProjectName')).toBeVisible()
  }

  async verifyLoginError(expectedError: string){
    const errorLocator = this.page.locator('.validation-summary-errors')
    await expect(errorLocator).toBeVisible()
    await expect(errorLocator.locator('ul')).toContainText(expectedError)
  }


}