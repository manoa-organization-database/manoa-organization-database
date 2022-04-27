import { Selector } from 'testcafe';

class DatabasePage {
  constructor() {
    this.pageId = '#clubs-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least nine interests on it.  */
  async hasDefaultClubs(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(3);
  }

  async clickClub(testController) {
    const clubCard = Selector('.ui .card .header').withExactText('Mockup Club');
    await testController.click(clubCard);
  }
}

export const databasePage = new DatabasePage();
