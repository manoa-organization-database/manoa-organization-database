import React from 'react';
import { Header, Container, Dropdown } from 'semantic-ui-react';

const friendOptions = [
  {
    key: 'Attribute 1',
    text: 'Attribute 1',
    value: 'Attribute 1',
  },
  {
    key: 'Attribute 2',
    text: 'Attribute 2',
    value: 'Attribute 2',
  },
  {
    key: 'Attribute 3',
    text: 'Attribute 3',
    value: 'Attribute 3',
  },
  {
    key: 'Christian',
    text: 'Christian',
    value: 'Christian',
  },
  {
    key: 'Matt',
    text: 'Matt',
    value: 'Matt',
  },
  {
    key: 'Justen Kitsune',
    text: 'Justen Kitsune',
    value: 'Justen Kitsune',
  },
];

class Search extends React.Component {
  render() {
    return (
      <Container>
        <Header textAlign='center' as='h1'>Search for clubs</Header>
        <Header textAlign='center' as='h3'>Find different clubs according to your preferences</Header>
        <Dropdown
          placeholder='Select interest'
          fluid
          selection
          options={friendOptions}
        />
      </Container>
    );
  }
}

export default Search;
