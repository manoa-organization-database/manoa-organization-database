import { Selector } from 'testcafe';

class SearchPage {
  constructor() {
    this.pageId = '#filter-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then checks that filtering works. */
  async filter(testController) {
    await this.isDisplayed(testController);
    // Select visualization and submit
    const interestsSelector = Selector('#interests');
    const visualizationOption = interestsSelector.find('#Mockup');
    await testController.click(interestsSelector);
    await testController.click(visualizationOption);
    await testController.click(interestsSelector);
    await testController.click('h1');
    await testController.click('#submit');
    // Check that only one card is displayed.
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(1);
  }
}

export const searchPage = new SearchPage();
