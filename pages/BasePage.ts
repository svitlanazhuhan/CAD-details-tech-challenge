import {Page, expect} from '@playwright/test'

export abstract class BasePage {
  protected readonly page: Page

  constructor(page: Page){
    this.page = page
  }

  async downloadFile(buttonName) {
    const button = this.page.getByRole('button', { name: buttonName })
    await button.click()
    
    try {
      return await this.page.waitForEvent('download', { timeout: 5000 })
    } catch {
      await this.page.waitForLoadState('domcontentloaded').catch(() => null)
      return null
    }
  }

  
  async verifyAuthBlockedDialog(loginFormId: string) {
    const loginDialog = this.page.getByTestId(loginFormId)
    await expect(loginDialog).toBeVisible()
  }
}