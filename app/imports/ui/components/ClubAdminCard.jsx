import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';

/** Renders a single ClubAdminCard. See pages/ClubPage & pages/AdminClubPage. */
class ClubAdminCard extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.member.picture} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.member.firstName} {this.props.member.lastName}</Card.Header>
          <Card.Meta>
            <span className='email'>{this.props.member.email}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div>
            <p>Interests:</p>
            {_.map(this.props.member.interests, (interest, index) => <Label key={index} className="club-admin-label">{interest}</Label>)}
          </div>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ClubAdminCard.propTypes = {
  member: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string,
    role: PropTypes.string,
    interests: PropTypes.array,
  }).isRequired,
};

export default ClubAdminCard;
