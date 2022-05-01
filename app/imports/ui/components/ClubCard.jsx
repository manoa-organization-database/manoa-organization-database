import React from 'react';
import { Card, Image, Label, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/** Renders a single ClubCard. See pages/Search.jsx & pages/ClubInformation. */
class ClubCard extends React.Component {
  render() {
    return (
      <Card fluid as={NavLink} id={`${this.props.club.name}Card`} exact to={`/club/${this.props.club._id}`}>
        <Card.Content>
          <Image floated='left' avatar src={this.props.club.picture}/>
          <Card.Header style={{ marginTop: '0px' }}>{this.props.club.name}</Card.Header>
          <Card.Meta>
            {this.props.club.homepage}
          </Card.Meta>
          <Card.Description>
            {this.props.club.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {_.map(this.props.club.interests,
            (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
        </Card.Content>
        <Card.Content extra>
          {_.map(this.props.club.adminList, (list, index) => (
            <Container key={index}>
              <Image circular size='mini' src={ list[1] }/>
              <Label size='tiny' color='green'>{ list[0] }</Label>
            </Container>))}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ClubCard.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    homepage: PropTypes.string,
    description: PropTypes.string,
    picture: PropTypes.string,
    interests: PropTypes.array,
    adminList: PropTypes.array,
  }).isRequired,
};

export default ClubCard;
