import { test, expect } from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { CadDrawingsPage } from "../pages/CadDrawingsPage"
import fs from 'fs'
import { EMAIL, PASSWORD, DOWNLOAD_PATH } from "../fixtures/testData"

test.describe("CAD Drawings downloads tests", () => {
  test.describe('Authorized User can preview and download CAD drawings', () => {
    test.beforeEach(async ({ page }) => {
      if (!process.env.CADDETAILS_USERNAME || !process.env.CADDETAILS_PASSWORD) {
        throw new Error("CADDETAILS_USERNAME or CADDETAILS_PASSWORD is not set.")
      }
      const cadDrawingsPage = new CadDrawingsPage(page)
      await cadDrawingsPage.navigateTo()
      const loginPage = new LoginPage(page)
      await loginPage.login(EMAIL, PASSWORD)
    });

    test('Authorized user can download sample CAD collection', async ({ page }) => {
      const cadDrawingsPage = new CadDrawingsPage(page)
      await cadDrawingsPage.downloadSampleCadCollection()
      const loginDialog = page.getByTestId('loginForm')
      await expect(loginDialog).not.toBeVisible()
    });
  
    test('Authorized user can preview a featured CAD drawing', async ({ page }) => {
      const cadDrawingsPage = new CadDrawingsPage(page)
      await cadDrawingsPage.openCardFromFeaturedListings(0)
      await cadDrawingsPage.verifyPreviewAuthAllowed()
      await cadDrawingsPage.closeCard()
      await cadDrawingsPage.openCardFromFeaturedListings(1)
      await cadDrawingsPage.verifyPreviewAuthAllowed()
    });
  
    test('Authorized user can download all files', async ({ page }) => {
      const cadDrawingsPage = new CadDrawingsPage(page)
      await cadDrawingsPage.openCardFromFeaturedListings(0)  
      const download = await cadDrawingsPage.downloadAllFiles()
      await download?.saveAs(DOWNLOAD_PATH)
      if (!download) {
        console.warn('No file was downloaded')
      }
      expect(fs.existsSync(DOWNLOAD_PATH)).toBeTruthy()

      const fileSize = fs.statSync(DOWNLOAD_PATH).size
      expect(fileSize).toBeGreaterThan(0)
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
  
  test.describe('Unauthorized User cannot preview and download CAD drawings', () => {
    test.beforeEach(async ({ page }) => {
      const cadDrawingsPage = new CadDrawingsPage(page)
      await cadDrawingsPage.navigateTo()
    });

    test('Unauthorized user is blocked from downloading sample CAD collection', async ({ page }) => {
      const cadDrawingsPage = new CadDrawingsPage(page)
      const download = await cadDrawingsPage.downloadSampleCadCollection()
      expect(download).toBeNull()
      await cadDrawingsPage.verifyAuthBlockedDialog('loginForm')
    });
  
    test('Unauthorized user is blocked from previewing CAD drawing', async ({ page }) => {
      const cadDrawingsPage = new CadDrawingsPage(page)
      await cadDrawingsPage.openCardFromFeaturedListings(0)
      await cadDrawingsPage.verifyPreviewAuthBlocked()
      await cadDrawingsPage.closeCard()
      await cadDrawingsPage.openCardFromFeaturedListings(1)
      await cadDrawingsPage.verifyPreviewAuthBlocked()
    });
  
    test('Unauthorized user is blocked from downloading files via card', async ({ page }) => {
      const cadDrawingsPage = new CadDrawingsPage(page)
      await cadDrawingsPage.openCardFromFeaturedListings(0)  
      const download = await cadDrawingsPage.downloadAllFiles()
      expect(download).toBeNull()
      await cadDrawingsPage.verifyAuthBlockedDialog('required-login-modal-body')
    });
  });
  
});
