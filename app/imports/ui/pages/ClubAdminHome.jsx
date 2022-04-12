import React from 'react';
import { Image, Container, Header, Button, Label, Card, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';

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
  sampleClub = {
    name: 'Mockup Club',
    description: 'Do you like making mockups of clubs? Then this is the club for you. The Mockup Club focuses on\n' +
      '              teaching members how to create their own mockups of clubs. Activites include coming up with clubs ideas and\n' +
      '              writing their own club descriptions such as this one. Contact a club admin for details.',
    picture: 'https://react.semantic-ui.com/images/wireframe/image.png',
    clubAdmins: 'admin@foo.com',
  };

  render() {
    const emails = ['clubadmin@foo.com', 'matthew@foo.com', 'david@foo.com'];
    const memberData = emails.map(email => getMemberData(email));
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
            <Header as="h1">{this.sampleClub.name}</Header>
            <Divider />
          </Container>
        </div>
        <div className="club-admin-margin">
          <Image src={this.sampleClub.picture} size='large' centered/>
        </div>
        <div className="club-admin-margin">
          <Container textAlign='center'>
            <Divider />
            <Header as="h3">{this.sampleClub.description}</Header>
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
              { /* <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Admin</Card.Header>
                  <Card.Meta>
                    <span className='email'>clubadmin@foo.com</span>
                  </Card.Meta>
                  <Card.Meta>
                    <span className='date'>Club Admin</span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <div>
                    <p>Interests:</p>
                    <Label className="club-admin-label">Clubs</Label>
                    <Label className="club-admin-label">Mockups</Label>
                  </div>
                </Card.Content>
              </Card>
              <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Matthew</Card.Header>
                  <Card.Meta>
                    <span className='email'>matthew@foo.com</span>
                  </Card.Meta>
                  <Card.Meta>
                    <span className='date'>Joined in 2021</span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <div>
                    <p>Interests:</p>
                    <Label className="club-admin-label">Clubs</Label>
                    <Label className="club-admin-label">Mockups</Label>
                  </div>
                </Card.Content>
              </Card>
              <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Elliot</Card.Header>
                  <Card.Meta>
                    <span className='email'>elliot@foo.com</span>
                  </Card.Meta>
                  <Card.Meta>
                    <span className='date'>Joined in 2020</span>
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <div>
                    <p>Interests:</p>
                    <Label className="club-admin-label">Clubs</Label>
                    <Label className="club-admin-label">Mockups</Label>
                    <Label className="club-admin-label">Sports</Label>
                  </div>
                </Card.Content>
              </Card> */}
            </Card.Group>
            <Divider />
          </Container>
        </div>
      </div>
    );
  }
}

export default ClubAdminHome;
