import React from 'react';
import { Image, Container, Header, Button, Label, Icon, Card } from 'semantic-ui-react';

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
          <Container textAlign='center'>
            <Header as="h1" style={{ display: 'inline-flex', alignItems: 'center' }}>Mockup Club<Button size='mini' >Edit</Button></Header>
          </Container>
        </div>
        <div className="club-admin-margin">
          <Image src="https://media.istockphoto.com/photos/in-progress-square-red-grunge-stamp-picture-id460917967?k=20&m=460917967&s=612x612&w=0&h=aj
          CaVf-QUvfCdSgBcWVixBzJrfT4tV-kObbhC04sgPU=" size='large' centered/>
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
              <Label>
                Clubs
                <Icon name='delete' />
              </Label>
              <Label>
                Mockups
                <Icon name='delete' />
              </Label>
            </div>
          </Container>
        </div>
        <div className="club-admin-margin">
          <Container textAlign="center">
            <Header as="h1" style={{ display: 'inline-flex', alignItems: 'center' }}>Members<Button size='mini' >Add</Button></Header>
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
                    <Label>
                      Clubs
                    </Label>
                    <Label>
                      Mockups
                    </Label>
                  </div>
                </Card.Content>
                <Card.Content extra>
                  Remove
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
                    <Label>
                      Clubs
                    </Label>
                    <Label>
                      Mockups
                    </Label>
                    <Label>
                      Sports
                    </Label>
                  </div>
                </Card.Content>
                <Card.Content extra>
                  Remove
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
