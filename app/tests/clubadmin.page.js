import { Selector } from 'testcafe';

class ClubAdminPage {
  constructor() {
    this.pageId = '#club-admin-home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async clickAdminClub(testController) {
    const clubAdminLabel = Selector('.user-home-page-label').withExactText('Mockup Club');
    await testController.click(clubAdminLabel());
  }
}

export const clubAdminPage = new ClubAdminPage();
