import React from 'react';
import { Card, Container, Form } from 'semantic-ui-react';

class Search extends React.Component {
  state = { interest: '', submittedInterest: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { interest } = this.state;

    this.setState({ submittedInterest: interest });
  }

  render() {
    const { interest, submittedInterest } = this.state;

    return (
      <Container textAlign='center'>
        <Form size='large' onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='Interest'
              name='interest'
              value={interest}
              onChange={this.handleChange}
              width={14}
            />
            <Form.Button size='large' content='Submit' />
          </Form.Group>
        </Form>
        <Card>
          <Card.Content>
            <Card.Header>
              Result: { submittedInterest }
            </Card.Header>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

export default Search;
