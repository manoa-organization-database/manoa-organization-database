import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Clubs } from '../../api/clubs/Clubs';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { Profiles } from '../../api/profiles/Profiles';
import { ClubAdmin } from '../../api/clubs/ClubAdmin';
import { Interests } from '../../api/interests/Interests';

/**
 * In Bowfolios, insecure mode is enabled, so it is possible to update the server's Mongo database by making
 * changes to the client MiniMongo DB.
 *
 * However, updating the database via client-side calls can be inconvenient for two reasons:
 *   1. If we want to update multiple collections, we need to use nested callbacks in order to trap errors, leading to
 *      the dreaded "callback hell".
 *   2. For update and removal, we can only provide a docID as the selector on the client-side, making bulk deletes
 *      hard to do via nested callbacks.
 *
 * A simple solution to this is to use Meteor Methods (https://guide.meteor.com/methods.html). By defining and
 * calling a Meteor Method, we can specify code to be run on the server-side but invoked by clients. We don't need
 * to use callbacks, because any errors are thrown and sent back to the client. Also, the restrictions on the selectors
 * are removed for server-side code.
 *
 * Meteor Methods are commonly introduced as the necessary approach to updating the DB once the insecure package is
 * removed, and that is definitely true, but Bowfolios illustrates that they can simplify your code significantly
 * even when prototyping. It turns out that we can remove insecure mode if we want, as we use Meteor methods to update
 * the database.
 *
 * Note that it would be even better if each method was wrapped in a transaction so that the database would be rolled
 * back if any of the intermediate updates failed. Left as an exercise to the reader.
 */

const updateProfileMethod = 'Profiles.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesClubs collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Profiles.update'({ email, firstName, lastName, picture, interests, clubs }) {
    Profiles.collection.update({ email }, { $set: { email, firstName, lastName, picture } });
    ProfilesInterests.collection.remove({ profile: email });
    ProfilesClubs.collection.remove({ profile: email });
    interests.map((interest) => ProfilesInterests.collection.insert({ profile: email, interest }));
    clubs.map((club) => ProfilesClubs.collection.insert({ profile: email, club }));
  },
});

const updateClubMethod = 'Clubs.update';

/**
 * The server-side Clubs.update Meteor Method is called by the client-side Edit page after pushing the update button.
 * Its purpose is to update the Clubs, and ClubInterests collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Clubs.update'({ name, picture, description, interests }) {
    Clubs.collection.update({ name }, { $set: { name, description, picture } });
    ClubInterests.collection.remove({ club: name });
    interests.map((interest) => ClubInterests.collection.insert({ club: name, interest }));
  },
});

const addClubMethod = 'Clubs.add';

/** Creates a new project in the Clubs collection, and also updates ProfilesClubs and ClubsInterests. */
Meteor.methods({
  'Clubs.add'({ name, description, picture, interests, participants, homepage }) {
    Clubs.collection.insert({ name, description, picture, homepage });
    ProfilesClubs.collection.remove({ club: name });
    ClubInterests.collection.remove({ club: name });
    if (interests) {
      interests.map((interest) => ClubInterests.collection.insert({ club: name, interest }));
    } else {
      throw new Meteor.Error('At least one interest is required.');
    }
    if (participants) {
      participants.map((participant) => ProfilesClubs.collection.insert({ club: name, profile: participant }));
    }
  },
});

const updateProfileRoleMethod = 'Roles.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesProjects collections to reflect the
 * updated situation specified by the user.
 */
Meteor.methods({
  'Roles.update'({ email, roles, clubs }) {
    console.log(`Set ${email} to ${roles} role`);
    const userID = Accounts.findUserByEmail(email);
    Roles.removeUsersFromRoles(userID, ['user', 'club-admin', 'admin']);
    Roles.addUsersToRoles(userID, roles);
    ClubAdmin.collection.remove({ admin: email });
    if ((Roles.userIsInRole(userID, 'club-admin') || Roles.userIsInRole(userID, 'admin')) && (clubs && clubs.length > 0)) {
      clubs.map(club => ClubAdmin.collection.insert({ admin: email, club: club }));
      console.log(`${email} is now a club-admin of these clubs:`);
      console.log(clubs);
    }
  },
});

const addInterestMethod = 'Interest.add';

Meteor.methods({
  'Interest.add'({ name }) {
    Interests.collection.update({ name }, { $set: { name } }, { upsert: true });
  },
});

export { updateProfileMethod, addClubMethod, updateProfileRoleMethod, addInterestMethod, updateClubMethod };
