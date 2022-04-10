import React from 'react';
import { Image, Container, Header, Button, Label, Card } from 'semantic-ui-react';

/** Renders a color-blocked static ClubAdminHome page. */
class ClubAdminHome extends React.Component {
  sampleClub = {
    name: 'Mockup Club',
    description: 'Do you like making mockups of clubs? Then this is the club for you. The Mockup Club focuses on\n' +
      '              teaching members how to create their own mockups of clubs. Activites include coming up with clubs ideas and\n' +
      '              writing their own club descriptions such as this one.',
  };

  render() {
    return (
      <div>
        <div className="club-admin-margin">
          <Container>
            <Button fluid className="club-admin-button">Edit Club Profile</Button>
          </Container>
        </div>
        <div className="club-admin-margin">
          <Container textAlign='center'>
            <Header as="h1">Mockup Club</Header>
          </Container>
        </div>
        <div className="club-admin-margin">
          <Image src="https://react.semantic-ui.com/images/wireframe/image.png" size='large' centered/>
        </div>
        <div className="club-admin-margin">
          <Container textAlign='center'>
            <Header as="h3">Do you like making mockups of clubs? Then this is the club for you. The Mockup Club focuses on
              teaching members how to create their own mockups of clubs. Activites include coming up with clubs ideas and
              writing their own club descriptions such as this one.</Header>
          </Container>
        </div>
        <div className="club-admin-margin">
          <Container textAlign='center'>
            <Header as="h1">Club Interests</Header>
            <div>
              <Label className="club-admin-label">Clubs</Label>
              <Label className="club-admin-label">Mockups</Label>
            </div>
          </Container>
        </div>
        <div className="club-admin-margin">
          <Container textAlign="center">
            <Header as="h1">Members</Header>
            <Card.Group centered>
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
              </Card>
            </Card.Group>
          </Container>
        </div>
      </div>
    );
  }
}

export default ClubAdminHome;
