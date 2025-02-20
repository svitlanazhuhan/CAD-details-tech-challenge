import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage"
import { EMAIL, PASSWORD, DOWNLOAD_PATH } from "../fixtures/testData"
import fs from 'fs'

test.describe("QuickPacks Downloads tests", () => {
   test.beforeEach(async ({ page }) => {
    if (!process.env.CADDETAILS_USERNAME || !process.env.CADDETAILS_PASSWORD) {
      throw new Error("CADDETAILS_USERNAME or CADDETAILS_PASSWORD is not set.")
    }
    const homePage = new HomePage(page)
    await homePage.navigateTo()
  });

  test('Authorized user can download sample collection', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login(EMAIL, PASSWORD)
    await expect(page.locator('#loginForm')).toBeHidden()
    const homePage = new HomePage(page)
    const download = await homePage.downloadSampleCadCollection('CAD')
    const loginDialog = page.getByTestId('loginForm')
    await expect(loginDialog).not.toBeVisible()
  });
  
  test('Unauthorized user is blocked from downloading sample collection', async ({ page }) => {
    const homePage = new HomePage(page)
    const download = await homePage.downloadSampleCadCollection('CAD')
    expect(download).toBeNull()
    await homePage.verifyAuthBlockedDialog('loginForm')
  });

  test.afterEach(async () => {
    try {
      if (fs.existsSync(DOWNLOAD_PATH)) {
        fs.rmSync(DOWNLOAD_PATH, { recursive: true, force: true })
      }
    } catch (error) {
      console.error('Error during file cleanup:', error)
    }
  })
});
