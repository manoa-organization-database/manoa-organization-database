import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { Clubs } from '../../api/clubs/Clubs';
import { Profiles } from '../../api/profiles/Profiles';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { ClubAdmin } from '../../api/clubs/ClubAdmin';
import ClubCard from '../components/ClubCard';

/** Get all relevant club data to input into the ClubCard component. */
function getClubData(name) {
  const data = Clubs.collection.findOne({ name });
  const interests = _.pluck(ClubInterests.collection.find({ club: name }).fetch(), 'interest');
  const admins = _.pluck(ClubAdmin.collection.find({ club: name }).fetch(), 'admin');
  const adminPictures = admins.map(admin => Profiles.collection.findOne({ email: admin }).picture);
  const adminList = _.zip(admins, adminPictures);
  return _.extend({ }, data, { interests, adminList });
}

/** Renders the club Collection as a set of Cards. */
class ClubDatabase extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const clubs = _.pluck(Clubs.collection.find().fetch(), 'name').sort((a, b) => a.localeCompare(b));
    const clubData = clubs.map(club => getClubData(club));
    return (
      <Container id="clubs-page">
        <Card.Group>
          {_.map(clubData, (club, index) => <ClubCard key={index} club={club}/>)}
        </Card.Group>
      </Container>
    );
  }
}

/** This page requires the subscriptions to be ready. */
ClubDatabase.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(ProfilesClubs.userPublicationName);
  const sub2 = Meteor.subscribe(Clubs.userPublicationName);
  const sub3 = Meteor.subscribe(ClubInterests.userPublicationName);
  const sub4 = Meteor.subscribe(Profiles.userPublicationName);
  const sub5 = Meteor.subscribe(ClubAdmin.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(ClubDatabase);
