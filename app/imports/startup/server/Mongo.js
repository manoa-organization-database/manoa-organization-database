import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Clubs } from '../../api/clubs/Clubs';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { Interests } from '../../api/interests/Interests';
import { ClubAdmin } from '../../api/clubs/ClubAdmin';
import { ClubInterestsDate } from '../../api/clubs/ClubInterestsDate';

/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role, password) {
  const userID = Accounts.createUser({ username: email, email, password });
  if (role === 'user') {
    Roles.addUsersToRoles(userID, 'user');
  } else if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  } else if (role === 'club-admin') {
    Roles.addUsersToRoles(userID, 'club-admin');
  }
}

/** Define an interest.  Has no effect if interest already exists. */
function addInterest(interest) {
  Interests.collection.update({ name: interest }, { $set: { name: interest } }, { upsert: true });
}

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ firstName, lastName, email, uhID, picture, interests, clubs, clubAdmin, role, password }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role, password);
  // Create the profile.
  Profiles.collection.insert({ firstName, lastName, email, uhID, picture, role });
  // Add interests and clubs.
  interests.map(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  clubs.map(club => ProfilesClubs.collection.insert({ profile: email, club }));
  clubAdmin.map(clubsAdmin => ClubAdmin.collection.insert({ admin: email, club: clubsAdmin }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
}

/** Define a new club. Error if club already exists.  */
function addClubs({ name, homepage, description, interests, picture }) {
  console.log(`Defining club ${name}`);
  Clubs.collection.insert({ name, homepage, description, picture });
  interests.map(interest => ClubInterests.collection.insert({ club: name, interest }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
}

/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultClubs && Meteor.settings.defaultProfiles) {
    console.log('Creating roles: user, club-admin, admin');
    Roles.createRole('user');
    Roles.createRole('club-admin');
    Roles.createRole('admin');
    console.log('Creating the default profiles');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
    console.log('Creating the default clubs');
    Meteor.settings.defaultClubs.map(club => addClubs(club));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

if (Meteor.isServer) {
  ClubInterestsDate.collection.createIndex({ club: 1, interest: 1 }, { unique: true });
}

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() === 0)) {
  console.log('Creating roles: user, club-admin, admin');
  Roles.createRole('user', { unlessExists: true });
  Roles.createRole('club-admin', { unlessExists: true });
  Roles.createRole('admin', { unlessExists: true });
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  console.log('Creating the default profiles');
  jsonData.defaultProfiles.map(profile => addProfile(profile));
  console.log('Creating the default clubs');
  jsonData.defaultClubs.map(club => addClubs(club));
}
