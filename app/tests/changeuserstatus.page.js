import { Selector } from 'testcafe';

class ChangeUserStatus {
  constructor() {
    this.pageId = '#admin-home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the user role can be selected. */
  async changeRole(testController, userEmail) {
    await this.isDisplayed(testController);
    await testController.typeText('#user-email', userEmail);
    // Select visualization and submit
    // const roleSelector = Selector('#role-select');
    /* const visualizationOption = roleSelector.find('#option').withExactText('user');
    await testController.click(roleSelector());
    await testController.click(visualizationOption);
    await testController.click(roleSelector);
    await testController.click('#role-page-submit'); */
  }
}

export const changeUserStatus = new ChangeUserStatus();
