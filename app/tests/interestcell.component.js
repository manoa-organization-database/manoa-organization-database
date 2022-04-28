import { Selector } from 'testcafe';

class InterestCell {
  /** Check if cell contains set word. */
  async checkCell(testController) {
    await testController.expect(Selector('#td').value).eql('AAAAA');
  }

  /** Remove interest. */
  /* async deleteCell(testController) {
    const interestCell = testController.Selector('.Cell').withExactText('AAAAA');
    const
  } */
}

export const interestCell = new InterestCell();
