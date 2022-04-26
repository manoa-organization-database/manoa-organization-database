import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
// import { signupPage } from './signup.page';
// import { profilesPage } from './profiles.page';
import { userHomePage } from './userhome.page';
// import { projectsPage } from './projects.page';
// import { interestsPage } from './interests.page';
// import { homePage } from './home.page';
// import { addProjectPage } from './addproject.page';
// import { filterPage } from './filter.page';
import { navBar } from './navbar.component';
import { editUserPage } from './edituser.page';
import { databasePage } from './database.page';
import { searchPage } from './search.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { email: 'john@foo.com', password: 'foo', firstName: 'John', lastName: 'Foo' };

/** Credentials for admin defined in settings.development.json. */
/* const adminCredentials = { email: 'admin@foo.com', password: 'foo', firstName: 'ADMIN', lastName: 'Doe' }; */

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

/*
test('Test that signup page, then logout works', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}@foo.com`;
  const newName = `user-${new Date().getTime()}`;
  const newPic = 'https://manoa.hawaii.edu/speakers/wp-content/uploads/logo-1.png';
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newName, newName, newUser, 99999999, newPic, credentials.password);
  // New user has successfully logged in, so now let's logout.
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
}); */

test('Test that profiles page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.email, credentials.password);
  await userHomePage.isDisplayed(testController);
  await userHomePage.hasProfile(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
/*
test('Test that interests page displays', async (testController) => {
  await navBar.gotoInterestsPage(testController);
  await interestsPage.isDisplayed(testController);
  await interestsPage.hasDefaultInterests(testController);
});

*/

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

/* test('Test that addClub page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddProjectPage(testController);
  await addProjectPage.isDisplayed(testController);
  await addProjectPage.addProject(testController);
});

test('Test that filter page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoFilterPage(testController);
  await filterPage.isDisplayed(testController);
  await filterPage.filter(testController);
}); */
