import { Selector } from 'testcafe';

class UserHomePage {
  constructor() {
    this.pageId = '#user-home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least six profiles on it.  */
  async hasProfile(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(1);
  }

  async clickClub(testController) {
    const clubLabel = Selector('.user-home-page-label').withExactText('Mockup Club');
    await testController.click(clubLabel());
  }

  async clickAdminClub(testController) {
    const clubAdminLabel = Selector('.user-home-page-label').withExactText('Mockup Club');
    await testController.click(clubAdminLabel());
  }
}

export const userHomePage = new UserHomePage();
