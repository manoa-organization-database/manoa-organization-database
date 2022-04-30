import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Container, Header, Button, Label, Card, Divider, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { NavLink } from 'react-router-dom';
import { Clubs } from '../../api/clubs/Clubs';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Profiles } from '../../api/profiles/Profiles';
import { ClubAdmin } from '../../api/clubs/ClubAdmin';

function getAdminEmails(clubName) {
  const emails = _.filter(ClubAdmin.collection.find().fetch(), (clubadmin) => clubadmin.club === clubName);
  return _.pluck(emails, 'admin');
}

function getMemberInterests(profileName) {
  const interests = _.filter(ProfilesInterests.collection.find().fetch(), (profilesInterest) => profilesInterest.profile === profileName);
  return _.pluck(interests, 'interest');
}

function getMemberData(email) {
  const profiles = _.find(Profiles.collection.find().fetch(), (member) => member.email === email);
  const interests = getMemberInterests(email);
  return _.extend({ }, profiles, { interests });
}

function getClubData(name) {
  const data = Clubs.collection.findOne({ name });
  return _.extend({ }, data);
}

function getClubInterests(clubName) {
  const interests = _.filter(ClubInterests.collection.find().fetch(), (clubInterest) => clubInterest.club === clubName);
  return _.pluck(interests, 'interest');
}

const ClubCard = (props) => (
  <Card>
    <Image src={props.member.picture} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.member.firstName} {props.member.lastName}</Card.Header>
      <Card.Meta>
        <span className='email'>{props.member.email}</span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <div>
        <p>Interests:</p>
        {_.map(props.member.interests, (interest, index) => <Label key={index} className="club-admin-label">{interest}</Label>)}
      </div>
    </Card.Content>
  </Card>
);

// Require a document to be passed to this component.
ClubCard.propTypes = {
  member: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string,
    role: PropTypes.string,
    interests: PropTypes.array,
  }).isRequired,
};

/** Renders a color-blocked static AdminClubPage page. */
class AdminClubPage extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const clubName = this.props.doc.name;
    const adminEmails = getAdminEmails(clubName);
    const adminData = adminEmails.map(email => getMemberData(email));
    const club = getClubData(clubName);
    const interests = getClubInterests(clubName);
    return (
      <div id="admin-club-page">
        <div className="club-admin-margin">
          <Container>
            <Button fluid className="club-admin-button" as={NavLink}
              activeClassName="active" exact to={`/edit-club/${this.props.doc._id}`}>Edit Club Profile</Button>
          </Container>
        </div>
        <div className="club-admin-margin">
          <Container textAlign='center'>
            <Divider />
            <Header as="h1">{club.name}</Header>
            <Divider />
          </Container>
        </div>
        <div className="club-admin-margin">
          <Image src={club.picture} size='large' centered/>
        </div>
        <div className="club-admin-margin">
          <Container textAlign='center'>
            <Divider />
            <Header as="h3">{club.description}</Header>
            <Divider />
          </Container>
        </div>
        <div className="club-admin-margin">
          <Container textAlign='center'>
            <Header as="h1">Club Interests</Header>
            <div>
              {_.map(interests, (interest, index) => <Label key={index} className="club-admin-label">{interest}</Label>)}
            </div>
            <Divider />
          </Container>
        </div>
        <div className="club-admin-margin">
          <Container textAlign="center">
            <Header as="h1">Admins</Header>
            <Card.Group centered>
              {_.map(adminData, (profile, index) => <ClubCard key={index} member={profile}/>)}
            </Card.Group>
            <Divider />
          </Container>
        </div>
      </div>
    );
  }
}

AdminClubPage.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Clubs.userPublicationName);
  const sub2 = Meteor.subscribe(ProfilesClubs.userPublicationName);
  const sub3 = Meteor.subscribe(ClubInterests.userPublicationName);
  const sub4 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub5 = Meteor.subscribe(Profiles.userPublicationName);
  const sub6 = Meteor.subscribe(ClubAdmin.userPublicationName);
  const doc = Clubs.collection.findOne(documentId);
  return {
    doc,
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready(),
  };
})(AdminClubPage);
