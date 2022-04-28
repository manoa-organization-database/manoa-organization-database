import { Selector } from 'testcafe';

class ClubPage {
  constructor() {
    this.pageId = '#club-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Clicks edit button visible to admins of club. */
  async clickEditButton(testController) {
    await testController.click('.club-admin-button');
  }
}

export const clubPage = new ClubPage();
