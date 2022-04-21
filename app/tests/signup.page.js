import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class SignupPage {
  constructor() {
    this.pageId = '#signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupUser(testController, firstName, lastName, email, uhID, picture, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-form-email', email);
    await testController.typeText('#signup-form-uhID', uhID);
    await testController.typeText('#signup-form-password', password);
    await testController.typeText('#signup-form-firstName', firstName);
    await testController.typeText('#signup-form-lastName', lastName);
    await testController.typeText('#signup-form-picture', picture);
    await testController.click('#signup-form-submit');
    await navBar.isLoggedIn(testController, email);
  }
}

export const signupPage = new SignupPage();
