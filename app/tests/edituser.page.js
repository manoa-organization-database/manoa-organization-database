import { Selector } from 'testcafe';

class EditUserPage {
  constructor() {
    this.pageId = '#edit-user-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then changes firstName field, checks update succeeded, then restores value. */
  // Should be able to use setFirstName without generating warnings with first release after 1.9.4. (Fixed in pull/5584).
  async updateProfile(testController, firstName) {
    const newFirstName = 'New First Name';
    await testController.click('#user-edit-button');
    await this.isDisplayed(testController);
    // Delete text from first name field.
    await testController.selectText('#firstName').pressKey('delete');
    // Type in new first name.
    await testController.typeText('#firstName', newFirstName);
    // Submit it.
    await testController.click('#edit-page-submit');
    // Click the OK button on the Sweet Alert, then click back to edit page.
    await testController.click(Selector('.swal-button--confirm'));
    await testController.click('#user-edit-button');
    // Check that the field is updated.
    await testController.expect(Selector('#firstName').value).eql(newFirstName);
    // Now restore original value.
    await testController.selectText('#firstName').pressKey('delete');
    await testController.typeText('#firstName', firstName);
    await testController.click('#edit-page-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const editUserPage = new EditUserPage();
