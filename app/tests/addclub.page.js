import { Selector } from 'testcafe';

class AddClubPage {
  constructor() {
    this.pageId = '#add-club-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new project */
  async addClub(testController) {
    const name = `club-${new Date().getTime()}`;
    const picture = 'https://www.logolynx.com/images/logolynx/aa/aa2c83b718d1f5f077c0297ae4f401dd.jpeg';
    const homepage = 'https://google.org';
    const description = 'sample text';
    await this.isDisplayed(testController);
    // Define the new project
    await testController.typeText('#name', name);
    await testController.typeText('#picture', picture);
    await testController.typeText('#homepage', homepage);
    await testController.typeText('#description', description);

    // Select two interests.
    const interestsSelector = Selector('#interests');
    const hpcOption = interestsSelector.find('#Clubs');
    const aiOption = interestsSelector.find('#Education');
    await testController.click(interestsSelector);
    await testController.click(hpcOption);
    await testController.click(aiOption);
    await testController.click(interestsSelector);

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addClubPage = new AddClubPage();
