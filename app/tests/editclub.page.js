import { Selector } from 'testcafe';

class EditClubPage {
  constructor() {
    this.pageId = '#edit-club-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Sets the first name field to a new value, then checks that the update succeeded. */
  /* async setFirstName(testController, firstName) {
    // Delete text from first name field.
    await testController.selectText('#firstName').pressKey('delete');
    // Type in new first name.
    await testController.typeText('#firstName', firstName);
    // Submit it.
    await testController.click('#home-page-submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
    // Check that the field is updated.
    await testController.expect(Selector('#firstName').value).eql(firstName);
  } */

  /** Checks this page is displayed, then changes description field, checks update succeeded, then restores value. */
  // Should be able to use setFirstName without generating warnings with first release after 1.9.4. (Fixed in pull/5584).
  async updateClub(testController, clubDescription) {
    const newDesc = 'New Description';
    await this.isDisplayed(testController);
    // Delete text from first name field.
    await testController.selectText('#clubDescription').pressKey('delete');
    // Type in new first name.
    await testController.typeText('#clubDescription', newDesc);
    // Submit it.
    await testController.click('#home-page-submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
    // Check that the field is updated.
    await testController.expect(Selector('#clubDescription').value).eql(newDesc);
    // Now restore original value.
    await testController.selectText('#clubDescription').pressKey('delete');
    await testController.typeText('#clubDescription', clubDescription);
    await testController.click('#home-page-submit');
    await testController.click(Selector('.swal-button--confirm'));
    await testController.expect(Selector('#clubDescription').value).eql(clubDescription);
  }
}

export const editClubPage = new EditClubPage();
