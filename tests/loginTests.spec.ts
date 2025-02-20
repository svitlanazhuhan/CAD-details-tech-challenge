import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { EMAIL, PASSWORD, INVALID_CREDENTIALS, ERROR_MESSAGES } from "../fixtures/testData"

test.describe('Login tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForSelector('#main-content', { timeout: 10000 })   
  })

  test('User should log in successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login(EMAIL, PASSWORD)
    await loginPage.verifyLoginSucess()
  })

  test('should display error with invalid email format', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login(INVALID_CREDENTIALS.invalidEmail, PASSWORD)
    await loginPage.verifyLoginError(ERROR_MESSAGES.invalidEmail)
  })

  test('should display error with non-existed user email', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login(INVALID_CREDENTIALS.unregisteredEmail, PASSWORD)
    await loginPage.verifyLoginError(ERROR_MESSAGES.unregisteredEmail)
  })

  test('should display error with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login(EMAIL, INVALID_CREDENTIALS.invalidPassword)
    await loginPage.verifyLoginError(ERROR_MESSAGES.invalidPassword)
  })

  test('should display error with empty email and password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login(INVALID_CREDENTIALS.emptyEmail, INVALID_CREDENTIALS.emptyPassword)
    await loginPage.verifyLoginError(ERROR_MESSAGES.emptyEmail)
    await loginPage.verifyLoginError(ERROR_MESSAGES.emptyPassword)
  })
})