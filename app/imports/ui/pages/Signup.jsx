import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profiles/Profiles';

function truncateUHID(num) {
  if (num.length > 8) {
    return num.substr(0, 8);
  }
  return num;
}

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', email: '', uhID: '', picture: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange= (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page.  */
  submit= () => {
    const { firstName, lastName, email, uhID, picture, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        const truncatedUHID = truncateUHID(uhID);
        Profiles.collection.insert({ firstName, lastName, email, truncatedUHID, picture, role: 'user' }, (err2) => {
          if (err2) {
            this.setState({ error: err2.reason });
          } else {
            this.setState({ error: '', redirectToReferer: true });
          }
        });
      }
    });
  }

  /** Display the signup form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/profile' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
                Sign up for a new account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="UH student ID"
                  id="signup-form-uhID"
                  icon="id card"
                  iconPosition="left"
                  name="uhID"
                  type="uhID"
                  placeholder="Enter your UH ID"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="First Name"
                  id="signup-form-firstName"
                  icon="user"
                  iconPosition="left"
                  name="firstName"
                  placeholder="Enter your first name"
                  type="firstName"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Last Name"
                  id="signup-form-lastName"
                  icon="user"
                  iconPosition="left"
                  name="lastName"
                  placeholder="Enter your last name"
                  type="lastName"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Picture URL"
                  id="signup-form-picture"
                  icon="picture"
                  iconPosition="left"
                  name="picture"
                  placeholder="Provide a link to a picture"
                  type="picture"
                  onChange={this.handleChange}
                />
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
                Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
