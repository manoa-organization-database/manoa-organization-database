import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Segment, Header, Label, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { NavLink } from 'react-router-dom';
import { Interests } from '../../api/interests/Interests';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Clubs } from '../../api/clubs/Clubs';
import { Profiles } from '../../api/profiles/Profiles';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { ClubAdmin } from '../../api/clubs/ClubAdmin';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests) => new SimpleSchema({
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
});

function getClubData(name) {
  const data = Clubs.collection.findOne({ name });
  const website = _.pluck(Clubs.collection.find({ club: name }).fetch(), 'homepage');
  const description = _.pluck(Clubs.collection.find({ club: name }).fetch(), 'description');
  const admins = _.pluck(ClubAdmin.collection.find({ club: name }).fetch(), 'admin');
  const adminPictures = admins.map(admin => Profiles.collection.findOne({ email: admin }).picture);
  const adminList = _.zip(admins, adminPictures);
  const interests = _.pluck(ClubInterests.collection.find({ club: name }).fetch(), 'interest');
  return _.extend({ }, data, description, { website, interests, adminList });
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card fluid as={NavLink} id={`${props.club.name}Card`} exact to={`/club/${props.club._id}`}>
    <Card.Content>
      <Card.Header>{props.club.name}</Card.Header>
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

/** Properties */
MakeCard.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = { interests: [] };
  }

  submit(data) {
    this.setState({ interests: data.interests || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    /** Grabs all interests and allows it to be options in the dropdown */
    const interestList = _.pluck(ClubInterests.collection.find().fetch(), 'interest');
    const allInterests = _.uniq(interestList);
    const formSchema = makeSchema(allInterests);
    const bridge = new SimpleSchema2Bridge(formSchema);
    /** Grabs individual clubs */
    const clubs = _.pluck(ClubInterests.collection.find({ interest: { $in: this.state.interests } }).fetch(), 'club');
    const clubData = _.uniq(clubs).map(club => getClubData(club));
    return (
      <Container id="filter-page">
        <Header as='h1' textAlign='center' dividing style={{ padding: 20 }}>Search for Clubs by Interest</Header>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} >
          <Segment>
            <MultiSelectField id='interests' name='interests' showInlineError={true} placeholder={'Interests'}/>
            <SubmitField id='submit' value='Submit'/>
          </Segment>
        </AutoForm>
        <Card.Group style={{ paddingTop: '10px' }}>
          {_.map(clubData, (club, index) => <MakeCard key={index} club={club}/>)}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Search.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub3 = Meteor.subscribe(ClubAdmin.userPublicationName);
  const sub4 = Meteor.subscribe(Clubs.userPublicationName);
  const sub5 = Meteor.subscribe(Interests.userPublicationName);
  const sub6 = Meteor.subscribe(ClubInterests.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready(),
  };
})(Search);
