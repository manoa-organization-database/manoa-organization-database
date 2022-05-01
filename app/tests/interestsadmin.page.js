import { Selector } from 'testcafe';

class InterestsAdminPage {
  constructor() {
    this.pageId = '#interest-admin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Add a new interest value, and check if it is present in the table. */
  async addInterest(testController) {
    // Type in new interest.
    const fakeInterest = `interest-${new Date().getTime()}`;
    await testController.typeText('#interestField', fakeInterest);
    // Submit it.
    await testController.click('#interests-admin-page-submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const interestsAdminPage = new InterestsAdminPage();
