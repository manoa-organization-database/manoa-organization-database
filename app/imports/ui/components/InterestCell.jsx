import React from 'react';
import { Icon, Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single Interest cell in the InterestAdmin table. See pages/InterestsAdmin.jsx. */
class InterestCell extends React.Component {
  removeItem(docID) {
    console.log(`the interest to delete is ${docID}`);
    this.props.Interests.collection.remove(docID);
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
  Interests: PropTypes.object.isRequired,
};

export default InterestCell;
