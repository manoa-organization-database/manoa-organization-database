import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Label, Header, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Clubs } from '../../api/clubs/Clubs';
import { Profiles } from '../../api/profiles/Profiles';

const sampleUserData = [
  {
    firstName: 'John', lastName: 'Doe', email: 'john@foo.com', role: 'User',
    picture: 'https://manoa.hawaii.edu/speakers/wp-content/uploads/logo-1.png',
  },
  {
    firstName: 'Test', lastName: 'Me', email: 'admin@foo.com', role: 'Admin',
    picture: 'https://manoa.hawaii.edu/speakers/wp-content/uploads/logo-1.png',
  },
];

const sampleInterestData = [
  { interest: 'Sports', email: 'john@foo.com' },
  { interest: 'Photography', email: 'john@foo.com' },
  { interest: 'Sleeping', email: 'admin@foo.com' },
];

const sampleClubData = [
  { club: 'Mockup Club', email: 'john@foo.com' },
  { club: 'Admin Club', email: 'admin@foo.com' },
];

/** Returns the User and associated Clubs and Interests associated with the passed user email. */
function getProfileData(email) {
  const data = Profiles.collection.findOne({ email });
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const clubs = _.pluck(_.filter(sampleClubData, (interest) => interest.email === email), 'club');
  return _.extend({}, data, { interests, clubs });
}

/** Component for layout out a User Card. */
const MakeCard = (props) => (
  <Card centered fluid>
    <Card.Content>
      <Image floated='left' size='small' src={props.user.picture}/>
      <Card.Header>
        <Header>
          {props.user.firstName} {props.user.lastName}
        </Header>
      </Card.Header>
      <Card.Meta>
        <span>{props.user.email}</span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <Header as='h5'>Clubs</Header>
      {_.map(props.user.clubs, (club, index) => <Label className="user-home-page-label" key={index}>{club}</Label>)}
    </Card.Content>
    <Card.Content extra>
      <Header as='h5'>Interests</Header>
      {_.map(props.user.interests, (interest, index) => <Label className="user-home-page-label" key={index}>{interest}</Label>)}
    </Card.Content>
    <Card.Content extra>
      <Button color='blue'>
        Edit
      </Button>
      <Button color='red'>
        Delete
      </Button>
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    interests: PropTypes.array,
    clubs: PropTypes.array,
    picture: PropTypes.string,
  }).isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class UserHomePage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
    const userData = emails.map(email => getProfileData(email));
    return (
      <Container>
        {_.map(userData, (user, index) => <MakeCard key={index} user={user}/>)}
      </Container>
    );
  }
}

UserHomePage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesProjects.userPublicationName);
  const sub4 = Meteor.subscribe(Clubs.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
  };
})(UserHomePage);
