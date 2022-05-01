import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { userHomePage } from './userhome.page';
import { navBar } from './navbar.component';
import { editUserPage } from './edituser.page';
import { databasePage } from './database.page';
import { searchPage } from './search.page';
import { clubPage } from './club.page';
import { editClubPage } from './editclub.page';
import { interestsAdminPage } from './interestsadmin.page';
// import { interestCell } from './interestcell.component';
import { changeUserStatus } from './changeuserstatus.page';
import { addClubPage } from './addclub.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { email: 'john@foo.com', password: 'foo', firstName: 'John', lastName: 'Foo' };

/** Credentials for club admin defined in settings.development.json. */
const clubAdminCredentials = { email: 'clubadmin@foo.com', password: 'foo', firstName: 'Club', lastName: 'Admin' };

/** Credentials for admin defined in settings.development.json. */
const adminCredentials = { email: 'admin@foo.com', password: 'foo', firstName: 'ADMIN', lastName: 'Doe' };

fixture('Manoa Organizational Database localhost test with default db').page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.email, credentials.password);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// random integer code to generate values for UH ID outside of actual 8-digit ID range
function getRandomInt() {
  const min = Math.ceil(1);
  const max = Math.floor(10000000);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

test('Test that signup page, then logout works', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}@foo.com`;
  const newName = `user-${new Date().getTime()}`;
  const newID = `${getRandomInt()}`;
  const newPic = 'https://manoa.hawaii.edu/speakers/wp-content/uploads/logo-1.png';
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newName, newName, newUser, newID, newPic, credentials.password);
  // New user has successfully logged in, so now let's logout.
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that profiles page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.email, credentials.password);
  await userHomePage.isDisplayed(testController);
  await userHomePage.hasProfile(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that user profile page display and profile modification works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.email, credentials.password);
  await userHomePage.isDisplayed(testController);
  await editUserPage.updateProfile(testController, credentials.firstName);
  await navBar.ensureLogout(testController);
});

test('Test that clubs database page displays', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.email, credentials.password);
  await navBar.gotoDatabasePage(testController);
  await databasePage.isDisplayed(testController);
  await databasePage.hasDefaultClubs(testController);
  await navBar.ensureLogout(testController);
});

test('Test that search by interest works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.email, credentials.password);
  await navBar.gotoInterestsPage(testController);
  await searchPage.isDisplayed(testController);
  await searchPage.filter(testController);
  await navBar.ensureLogout(testController);
});

test('Test that club page can be accessed', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.email, credentials.password);
  await navBar.gotoDatabasePage(testController);
  await databasePage.clickClub(testController);
  await clubPage.isDisplayed(testController);
  await navBar.ensureLogout(testController);
});

test('Test that club page can be edited by a club admin', async (testController) => {
  const clubDesc = 'Do you like making mockups of clubs? Then this is the club for you. ' +
    'The Mockup Club focuses on teaching members how to create their own mockups of clubs. ' +
    "Activities include coming up with clubs ideas and writing their own club descriptions such as this one. Pray you don't break everything. " +
    'Contact a club admin for details.';
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, clubAdminCredentials.email, clubAdminCredentials.password);
  await userHomePage.isDisplayed(testController);
  await userHomePage.clickAdminClub(testController);
  await clubPage.clickEditButton(testController);
  await editClubPage.updateClub(testController, clubDesc);
  await navBar.ensureLogout(testController);
});

test('Test that an admin user can log in and add an interest', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.email, adminCredentials.password);
  await navBar.gotoEditInterests(testController);
  await interestsAdminPage.isDisplayed(testController);
  await interestsAdminPage.addInterest(testController);
  // await interestCell.checkCell(testController);
  await navBar.ensureLogout(testController);
});

test('Test that setting a user to a different role works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.email, adminCredentials.password);
  await navBar.gotoAdminEditUser(testController);
  await changeUserStatus.isDisplayed(testController);
  await changeUserStatus.changeRole(testController, credentials.email);
  await navBar.ensureLogout(testController);
});

test('Test that addClub page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCredentials.email, adminCredentials.password);
  await navBar.gotoAddClubPage(testController);
  await addClubPage.isDisplayed(testController);
  await addClubPage.addClub(testController);
  await navBar.ensureLogout(testController);
});

/*
test('Test that filter page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoFilterPage(testController);
  await filterPage.isDisplayed(testController);
  await filterPage.filter(testController);
}); */
