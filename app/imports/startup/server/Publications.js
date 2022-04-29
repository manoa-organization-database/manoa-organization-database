import { Meteor } from 'meteor/meteor';
import { Interests } from '../../api/interests/Interests';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { Clubs } from '../../api/clubs/Clubs';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { Profiles } from '../../api/profiles/Profiles';
import { ClubAdmin } from '../../api/clubs/ClubAdmin';
import { ClubInterestsDate } from '../../api/clubs/ClubInterestsDate';

/** Define a publication to publish all interests. */
Meteor.publish(Interests.userPublicationName, () => Interests.collection.find());

/** Define a publication to publish all profiles. */
Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

/** Define a publication to publish all clubs. */
Meteor.publish(Clubs.userPublicationName, () => Clubs.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesInterests.userPublicationName, () => ProfilesInterests.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesClubs.userPublicationName, () => ProfilesClubs.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ClubInterests.userPublicationName, () => ClubInterests.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ClubAdmin.userPublicationName, () => ClubAdmin.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ClubInterestsDate.userPublicationName, () => ClubInterestsDate.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
