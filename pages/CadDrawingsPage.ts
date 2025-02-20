import { Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage"

export class CadDrawingsPage extends BasePage {
  constructor(page: Page){
    super(page)
  }

  async navigateTo(){
    await this.page.goto('/cad-drawings', { waitUntil: 'domcontentloaded', timeout: 60000 })
  }

  async openCardFromFeaturedListings(index: number = 0) {
    const cardLisitings = this.page.getByTestId('featuredListings')
    const openVisualizerButtons = await cardLisitings.getByRole('link', {name: 'Download CAD Files'}).all()

    if (index < 0 || index >= openVisualizerButtons.length) {
      throw new Error(`Invalid index: ${index}. Expected 0 or ${openVisualizerButtons.length - 1}`)
    }
  
    await openVisualizerButtons[index].click()
    await this.page.waitForSelector('#visualizerContent', { timeout: 10000 }) 
  }

  async closeCard(){
    await this.page.getByTestId('close-modal').click()
    await this.page.waitForSelector('#visualizerContent', { state: 'detached', timeout: 10000 })
  }


  async downloadSampleCadCollection(){
    return this.downloadFile(' Download Sample CAD Collection')
  }

  async downloadAllFiles(){
    return this.downloadFile('Download All')
  }

  async verifyPreviewAuthAllowed() { 
    const visualizerTabs = await this.page.$$('.visualizer-tabs a')
    const tabPanels = await this.page.$$('.visualizer-tab-content .tab-pane')
    expect(tabPanels.length).toBeGreaterThan(0)

    for (const tabPanel of tabPanels) {
      await visualizerTabs[tabPanels.indexOf(tabPanel)].click()
      const image = await tabPanel.$('img')
      if (image) {
        const style = (await image.getAttribute('style')) || ''
        expect(style.includes('blur')).toBeFalsy()
      }

      const loginButton = await tabPanel.$('button')
      expect(loginButton).toBeNull()
    }
}

  async verifyPreviewAuthBlocked(){
    const visualizerTabs = await this.page.$$('.visualizer-tabs a')
    const tabPanels = await this.page.$$('.visualizer-tab-content .tab-pane')
    expect(tabPanels.length).toBeGreaterThan(0)

    for (const tabPanel of tabPanels) {
      await visualizerTabs[tabPanels.indexOf(tabPanel)].click()
      const image = await tabPanel.$('img')
      if (image) {
        const style = (await image.getAttribute('style')) || ''
        expect(style.includes('blur')).toBeTruthy()
      }
      const loginButton = await tabPanel.$('button')
      expect(loginButton).not.toBeNull()
      const buttonText = await loginButton?.textContent()
      expect(buttonText?.trim()).toBe('Login/Register')
      expect(await loginButton?.isVisible()).toBeTruthy()
    }
  }
}