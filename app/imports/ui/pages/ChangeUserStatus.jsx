import React from 'react';
import { Image, Container, Header, Button, Label, Card, Divider, Grid, Segment, Form, Dropdown, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Interests } from '../../api/interests/Interests';
import { Clubs } from '../../api/clubs/Clubs';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Profiles } from '../../api/profiles/Profiles';
import { AutoForm, LongTextField, SubmitField, TextField, SelectField} from 'uniforms-semantic';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import SimpleSchema from 'simpl-schema';

/*
const allRoles = [
  { key: 'user', value: 'user', text: 'User' },
  { key: 'clubadmin', value: 'clubadmin', text: 'Club Admin' },
  { key: 'admin', value: 'admin', text: 'Admin' }
]
*/

const allRoles = ["User", "Club Admin", "Admin"]

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = new SimpleSchema({
  email: { type: String, label: 'Email', optional: false },
  roles: { type: String, label: 'Roles', optional: false },
  'roles.$': { type: String, allowedValues: allRoles },
});


/** Renders a color-blocked static AdminHome page. */
class ChangeUserStatus extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    Meteor.call(updateProfileMethod, data, (error) => {
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
  render() {
    const formSchema = makeSchema;
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
                  label='Role'
                  allowedValues={allRoles}
                />
              </Form.Group>
              <SubmitField id='home-page-submit' value='Update'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ChangeUserStatus;
