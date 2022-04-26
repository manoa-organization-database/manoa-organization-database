import React from 'react';
import { Icon, Table, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { removeInterestMethod } from '../../startup/both/Methods';

/** Renders a single Interest cell in the InterestAdmin table. See pages/InterestsAdmin.jsx. */
class InterestCell extends React.Component {
  removeItem(docID) {
    console.log(`the interest to delete is ${docID}`);
    Meteor.call(removeInterestMethod, docID);
    console.log('exit');
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.interest.name}</Table.Cell>
        <Table.Cell onClick={() => this.removeItem(this.props.interest._id)}><Button icon><Icon name="trash"/></Button></Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
InterestCell.propTypes = {
  interest: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default InterestCell;
