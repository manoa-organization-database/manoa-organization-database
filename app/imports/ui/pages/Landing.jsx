import React from 'react';
import { Grid, Image, Container, Header, Divider } from 'semantic-ui-react';

/** Renders a color-blocked static landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div id="landing-page">
        <div className='landing-green-background'>
          <Container textAlign='center'>
            <Header style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }} as='h1'>
              Manoa Organization Database
            </Header>
            <Header style={{ paddingBottom: '20px', color: 'white' }} as='h3'>
              A catalog for the various student clubs of UH Manoa
            </Header>
          </Container>
        </div>
        <div className='landing-white-background'>
          <Divider horizontal>
            <Header style={{ color: '#376551' }} as='h2' textAlign='center'>Club Officers</Header>
          </Divider>
          <Header as="h3" style={{ color: '#376551' }} textAlign="center">Showcase your clubs by providing descriptions,
            location and contact information, and other promotional information.</Header>
          <Container>
            <Image src="/images/club-admin-home-page.png" bordered alt="Club admin home page"/>
          </Container>
          <Divider horizontal hidden section/>
        </div>
        <div className='landing-green-background'>
          <Divider horizontal>
            <Header style={{ color: 'white' }} as='h2' textAlign='center'>Students</Header>
          </Divider>
          <Header style={{ color: 'white' }} as='h3' textAlign='center'>Create a profile and highlight your interests.</Header>
          <Container>
            <Image src="/images/user-home-page-mockup.png" bordered/>
          </Container>
          <Header style={{ color: 'white' }} as='h3' textAlign='center'>Search for clubs based on interests,
            and get notifications when clubs related to your interest are created.</Header>
          <Container>
            <Image src="/images/browse-clubs-page-mockup.png" bordered/>
          </Container>
          <Divider horizontal hidden section />
        </div>
        <div className='landing-white-background'>
          <Divider horizontal>
            <Header style={{ color: '#376551' }} as='h2' textAlign='center'>Admin Users</Header>
          </Divider>
          <Header as="h3" style={{ color: '#376551' }} textAlign="center">Admins may grant club officers club admin powers,
            and can add and remove new interests for club admins and users to use.</Header>
          <Container>
            <Image src="/images/admin-home-page-mockup.png" bordered alt="Admin home page"/>
          </Container>
          <Divider horizontal hidden section/>
        </div>

      </div>

    );
  }
}

export default Landing;
