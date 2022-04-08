import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Label, Header, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { ProfilesInterests } from '../../api/users/ProfilesInterests';
import { ProfilesProjects } from '../../api/users/ProfilesProjects';
import { Clubs } from '../../api/clubs/Clubs';
import { Users } from '../../api/users/Users';

/** Returns the Profile and associated Clubs and Interests associated with the passed user email. */
function getProfileData(email) {
  const data = Users.collection.findOne({ email });
  const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
  const projects = _.pluck(ProfilesProjects.collection.find({ profile: email }).fetch(), 'project');
  const projectPictures = projects.map(project => Clubs.collection.findOne({ name: project }).picture);
  // console.log(_.extend({ }, data, { interests, projects: projectPictures }));
  return _.extend({}, data, { interests, projects: projectPictures });
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini' src={props.profile.picture}/>
      <Card.Header>{props.profile.firstName} {props.profile.lastName}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.profile.title}</span>
      </Card.Meta>
      <Card.Description>
        {props.profile.bio}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.profile.interests,
        (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
    </Card.Content>
    <Card.Content extra>
      <Header as='h5'>Projects</Header>
      {_.map(props.profile.projects,
        (project, index) => <Image key={index} size='mini' src={project}/>)}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class ProfilesPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const emails = _.pluck(Users.collection.find().fetch(), 'email');
    const profileData = emails.map(email => getProfileData(email));
    return (
      <Container>
        <Card centered fluid>
          <Card.Content>
            <Image
              floated='left'
              size='tiny'
              src='https://manoa.hawaii.edu/speakers/wp-content/uploads/logo-1.png'
            />
            <Card.Header>John Doe</Card.Header>
            <Card.Meta>
              <span>john@foo.com</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content>
            <p>Clubs:</p>
            <Label>Mockup Club</Label>
          </Card.Content>
          <Card.Content>
            <p>Interests:</p>
            <Label>Photography</Label>
            <Label>Sports</Label>
            <Label>Programming</Label>
          </Card.Content>
          <Card.Content>
            <Button color='blue'>Edit</Button>
            <Button color='red'>Delete</Button>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

ProfilesPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Users.userPublicationName);
  const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesProjects.userPublicationName);
  const sub4 = Meteor.subscribe(Clubs.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
  };
})(ProfilesPage);
