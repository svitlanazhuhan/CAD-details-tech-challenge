import { Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage"

export class HomePage extends BasePage {
  constructor(page: Page){
    super(page)
  }

  async navigateTo(){
    await this.page.goto('/', { waitUntil: 'domcontentloaded', timeout: 60000 })
  }

  async downloadSampleCadCollection(buttonName: string){
    return this.downloadFile(buttonName)
  }
}