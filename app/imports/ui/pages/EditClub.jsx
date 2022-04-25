import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import { AutoForm, TextField, SubmitField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Interests } from '../../api/interests/Interests';
import { Clubs } from '../../api/clubs/Clubs';
import { ClubInterests } from '../../api/clubs/ClubInterests';
import { updateClubMethod } from '../../startup/both/Methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allInterests) => new SimpleSchema({
  name: { type: String, label: 'Name', optional: true },
  picture: { type: String, label: 'Picture URL', optional: true },
  description: { type: String, label: 'Description', optional: true },
  interests: { type: Array, label: 'Interests', optional: true },
  'interests.$': { type: String, allowedValues: allInterests },
});

/** Renders the Edit Club Page: what appears after the user logs in. */
class EditClub extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    Meteor.call(updateClubMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Club updated successfully', 'success');
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const clubName = this.props.doc.name;
    // Create the form schema for uniforms. Need to determine all interests and projects for muliselect list.
    const allInterests = _.pluck(Interests.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allInterests);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // Now create the model with all the club information.
    const interests = _.pluck(ClubInterests.collection.find({ club: clubName }).fetch(), 'interest');
    const club = Clubs.collection.findOne({ name: clubName });
    const model = _.extend({}, club, { interests });
    return (
      <Grid id="edit-club-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Club Profile</Header>
          <AutoForm model={model} schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField id='name' name='name' showInlineError={true} placeholder={'Name'} disabled/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <TextField name='picture' showInlineError={true} placeholder={'URL to picture'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <LongTextField name='description' showInlineError={true} placeholder={'Description'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <MultiSelectField name='interests' showInlineError={true} placeholder={'Interests'}/>
              </Form.Group>
              <SubmitField id='home-page-submit' value='Update'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

EditClub.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Interests.userPublicationName);
  const sub2 = Meteor.subscribe(Clubs.userPublicationName);
  const sub3 = Meteor.subscribe(ClubInterests.userPublicationName);
  const doc = Clubs.collection.findOne(documentId);
  return {
    doc,
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(EditClub);
