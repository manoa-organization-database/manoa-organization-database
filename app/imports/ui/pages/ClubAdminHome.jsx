import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Container, Header, Button, Label, Card, Divider, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Clubs } from '../../api/clubs/Clubs';

const sampleMemberData = [
  { firstName: 'Club', lastName: 'Admin', email: 'clubadmin@foo' +
      '.com', picture: 'https://react.semantic-ui.com/images/avatar/large/matthew.png', role: 'Club Admin' },
  { firstName: 'Matthew', lastName: 'Smith', email: 'matthew@foo' +
      '.com', picture: 'https://react.semantic-ui.com/images/avatar/large/matthew.png', role: 'Member' },
  { firstName: 'David', lastName: 'Tennent', email: 'david@foo' +
      '.com', picture: 'https://react.semantic-ui.com/images/avatar/large/matthew.png', role: 'Member' }];

const sampleInterests = [
  { email: 'clubadmin@foo.com', interest: 'Clubs' },
  { email: 'clubadmin@foo.com', interest: 'Mockups' },
  { email: 'clubadmin@foo.com', interest: 'Websites' },
  { email: 'matthew@foo.com', interest: 'Clubs' },
  { email: 'matthew@foo.com', interest: 'Mockups' },
  { email: 'david@foo.com', interest: 'Clubs' },
  { email: 'david@foo.com', interest: 'Mockups' },
  { email: 'david@foo.com', interest: 'Sports' },
];

function getMemberData(email) {
  const data = _.find(sampleMemberData, (member) => member.email === email);
  const interests = _.pluck(_.filter(sampleInterests, (interest) => interest.email === email), 'interest');
  return _.extend({ }, data, { interests });
}

function getClubData(name) {
  const data = Clubs.collection.findOne({ name });
  return _.extend({ }, data);
}

const ClubCard = (props) => (
  <Card>
    <Image src={props.member.picture} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.member.firstName} {props.member.lastName}</Card.Header>
      <Card.Meta>
        <span className='email'>{props.member.email}</span>
      </Card.Meta>
      <Card.Meta>
        <span className='role'>{props.member.role}</span>
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

/** Renders a color-blocked static ClubAdminHome page. */
class ClubAdminHome extends React.Component {
  // club = _.pluck(Clubs.collection.find().fetch(), 'Mockup Club');

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const emails = ['clubadmin@foo.com', 'matthew@foo.com', 'david@foo.com'];
    const memberData = emails.map(email => getMemberData(email));
    const clubName = 'Mockup Club';
    const club = getClubData(clubName);
    return (
      <div>
        <div className="club-admin-margin">
          <Container>
            <Button fluid className="club-admin-button">Edit Club Profile</Button>
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
              <Label className="club-admin-label">Clubs</Label>
              <Label className="club-admin-label">Mockups</Label>
            </div>
            <Divider />
          </Container>
        </div>
        <div className="club-admin-margin">
          <Container textAlign="center">
            <Header as="h1">Members</Header>
            <Card.Group centered>
              {_.map(memberData, (profile, index) => <ClubCard key={index} member={profile}/>)}
            </Card.Group>
            <Divider />
          </Container>
        </div>
      </div>
    );
  }
}

ClubAdminHome.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Clubs.userPublicationName);
  return {
    ready: sub1.ready(),
  };
})(ClubAdminHome);
