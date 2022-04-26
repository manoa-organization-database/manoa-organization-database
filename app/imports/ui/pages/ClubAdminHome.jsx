import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Label, Header, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { NavLink } from 'react-router-dom';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Clubs } from '../../api/clubs/Clubs';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { ClubAdmin } from '../../api/clubs/ClubAdmin';

/** Returns the Profile and associated Clubs and Interests associated with the passed profile email. */
function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const clubs = _.pluck(ProfilesClubs.collection.find({ profile: email }).fetch(), 'club');
  const adminClubs = _.pluck(ClubAdmin.collection.find({ admin: email }).fetch(), 'club');
  return _.extend({}, data, { interests, clubs, adminClubs });
}

function getClubId(club) {
  const clubData = Clubs.collection.findOne({ name: club });
  return clubData._id;
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card centered fluid>
    <Card.Content>
      <Image floated='left' size='small' src={props.profile.picture}/>
      <Card.Header>
        <Header>
          {props.profile.firstName} {props.profile.lastName}
        </Header>
      </Card.Header>
      <Card.Meta>
        <span>{props.profile.email}</span>
      </Card.Meta>
    </Card.Content>
    {props.profile.clubs.length > 0 &&
      <Card.Content extra>
        <Header as='h5'>Clubs</Header>
        {_.map(props.profile.clubs, (club, index) => <Label className="user-home-page-label" key={index} as={NavLink}
          activeClassName="active" exact to={`/club/${getClubId(club)}`}>{club}</Label>)}
      </Card.Content>
    }
    <Card.Content extra>
      <Header as='h5'>Admin</Header>
      {_.map(props.profile.adminClubs, (club, index) => <Label className="user-home-page-label" key={index} as={NavLink}
        activeClassName="active" exact to={`/clubadmin/${getClubId(club)}`} >{club}</Label>)}
    </Card.Content>
    <Card.Content extra>
      <Header as='h5'>Interests</Header>
      {_.map(props.profile.interests, (interest, index) => <Label className="user-home-page-label" key={index}>{interest}</Label>)}
    </Card.Content>
    <Card.Content extra>
      <Button color='blue' as={NavLink} activeClassName="active" exact to="/edit-user" >
        Edit
      </Button>
      <Button color='red'>
        Delete
      </Button>
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class ClubAdminHome extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    /** Creates an array of all emails, then finds the logged in user's email */
    const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
    // console.log(emails);
    const profileEmail = _.find(emails, function (email) { return email === Meteor.user().username; });
    // console.log(profileEmail);
    const profileData = getProfileData(profileEmail);
    // console.log(profileData);
    return (
      <Container id="club-admin-home-page">
        <MakeCard profile={profileData}/>
      </Container>
    );
  }
}

ClubAdminHome.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesClubs.userPublicationName);
  const sub4 = Meteor.subscribe(Clubs.userPublicationName);
  const sub5 = Meteor.subscribe(ClubAdmin.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(ClubAdminHome);
