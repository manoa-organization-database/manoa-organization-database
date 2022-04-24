import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Header, Grid, Segment, Form, Loader } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, SubmitField, TextField, SelectField } from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import { updateProfileRoleMethod } from '../../startup/both/Methods';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Clubs } from '../../api/clubs/Clubs';

const allRoles = ['user', 'club-admin', 'admin'];

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allClubs) => new SimpleSchema({
  email: { type: String, label: 'Email', optional: false },
  roles: { type: String, label: 'Roles', optional: false },
  'roles.$': { type: String, allowedValues: allRoles },
  clubs: { type: Array, label: 'Clubs', optional: true },
  'clubs.$': { type: String, allowedValues: allClubs },
});

class ChangeUserStatus extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    console.log(data);
    Meteor.call(updateProfileRoleMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const allClubs = _.pluck(Clubs.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allClubs);
    const bridge = new SimpleSchema2Bridge(formSchema);
    return (
      <Grid id="admin-home-page" container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Change User Status</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField name='email' showInlineError={true} placeholder={'User Email'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <SelectField
                  showInlineError={true}
                  name='roles'
                  label='ROLE'
                  allowedValues={allRoles}
                />
              </Form.Group>
              <Form.Group widths={'equal'}>
                <MultiSelectField name='clubs' showInlineError={true} placeholder={'Clubs'}/>
              </Form.Group>
              <SubmitField id='home-page-submit' value='Update'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

ChangeUserStatus.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub5 = Meteor.subscribe(Clubs.userPublicationName);
  return {
    ready: sub5.ready(),
  };
})(ChangeUserStatus);
