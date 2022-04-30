import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { NavLink } from 'react-router-dom';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { Clubs } from '../../api/clubs/Clubs';
import { Profiles } from '../../api/profiles/Profiles';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { ClubAdmin } from '../../api/clubs/ClubAdmin';

/** Gets the club data as well as Profiles and Interests associated with the passed club name. */
function getClubData(name) {
  const data = Clubs.collection.findOne({ name });
  const interests = _.pluck(ClubInterests.collection.find({ club: name }).fetch(), 'interest');
  const admins = _.pluck(ClubAdmin.collection.find({ club: name }).fetch(), 'admin');
  const adminPictures = admins.map(admin => Profiles.collection.findOne({ email: admin }).picture);
  const adminList = _.zip(admins, adminPictures);
  return _.extend({ }, data, { interests, adminList });
}

/** Component for layout out a club Card. */
const MakeCard = (props) => (
  <Card fluid as={NavLink} id={`${props.club.name}Card`} exact to={`/club/${props.club._id}`}>
    <Card.Content>
      <Image floated='left' avatar src={props.club.picture}/>
      <Card.Header style={{ marginTop: '0px' }}>{props.club.name}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.club.title}</span>
      </Card.Meta>
      <Card.Meta>
        {props.club.homepage}
      </Card.Meta>
      <Card.Description>
        {props.club.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.club.interests,
        (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
    </Card.Content>
    <Card.Content extra>
      {_.map(props.club.adminList, (list, index) => (
        <Container key={index}>
          <Image circular size='mini' src={ list[1] }/>
          <Label size='tiny' color='green'>{ list[0] }</Label>
        </Container>))}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Renders the club Collection as a set of Cards. */
class clubsPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const clubs = _.pluck(Clubs.collection.find().fetch(), 'name');
    const clubData = clubs.map(club => getClubData(club));
    return (
      <Container id="clubs-page">
        <Card.Group centered>
          {_.map(clubData, (club, index) => <MakeCard key={index} club={club}/>)}
        </Card.Group>
      </Container>
    );
  }
}

clubsPage.propTypes = {
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
})(clubsPage);
