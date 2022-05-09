import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Segment, Form } from 'semantic-ui-react';
import { AutoForm, SubmitField, TextField } from 'uniforms-semantic';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Interests } from '../../api/interests/Interests';
import InterestCell from '../components/InterestCell';
import { addInterestMethod } from '../../startup/both/Methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = () => new SimpleSchema({
  name: { type: String },
});

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class InterestsAdmin extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    console.log(data);
    Meteor.call(addInterestMethod, data, (error) => {
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

  // Render the page once subscriptions have been received.
  renderPage() {
    const formSchema = makeSchema();
    const bridge = new SimpleSchema2Bridge(formSchema);

    return (
      <Container id='interest-admin-page'>
        <Header as="h2" textAlign="center">Create Interest</Header>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
          <Segment>
            <Form.Group widths={'equal'}>
              <TextField name='name' index='true' unique='true' placeholder={'Create New Interest'} id='interestField'/>
            </Form.Group>
            <SubmitField id='interests-admin-page-submit' value='Update'/>
          </Segment>
        </AutoForm>

        <Header as="h2" textAlign="center">List of Interests</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Remove</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.interests.map((interest) => <InterestCell key={interest._id} interest={interest}/>)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Interests in the props.
InterestsAdmin.propTypes = {
  interests: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Interests documents.
  const subscription = Meteor.subscribe(Interests.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Interests documents
  const interests = Interests.collection.find({}).fetch().sort((a, b) => a.name.localeCompare(b.name));
  return {
    interests,
    ready,
  };
})(InterestsAdmin);
