import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '0px', backgroundColor: '#024731' };
    return (
      <Menu style={menuStyle} attached="top" borderless>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image size='mini' src="/images/logo.png"/>
          <span className='bowfolio-green' style={{ fontWeight: 800, fontSize: '24px', color: 'white' }}>MOD</span>
        </Menu.Item>
        {this.props.currentUser ? (
          <Menu.Item as={NavLink} id="homeMenuItem" activeClassName="active" exact to="/home" key='home' style={{ color: 'white' }}>Home</Menu.Item>
        ) : ''}
        <Menu.Item as={NavLink} id="profilesMenuItem" activeClassName="active" exact to="/profiles" key='profiles'
          style={{ color: 'white' }}>Profile</Menu.Item>
        <Menu.Item as={NavLink} id="databaseMenuItem" activeClassName="active" exact to="/clubs" key='clubs'
          style={{ color: 'white' }}>Database</Menu.Item>
        <Menu.Item as={NavLink} id="interestsMenuItem" activeClassName="active" exact to="/interests" key='interests'
          style={{ color: 'white' }}>Search by Interest</Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} id="addProjectMenuItem" activeClassName="active" exact to="/addProject" key='addP'
            style={{ color: 'white' }}>Add Project</Menu.Item>,
          <Menu.Item as={NavLink} id="filterMenuItem" activeClassName="active" exact to="/filter" key='filter'
            style={{ color: 'white' }}>Filter</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} id="adminMenuItem" activeClassName="active" exact to="/admin" key='admin'
            style={{ color: 'white' }}>Admin</Menu.Item>
        ) : ''}

        {
          Roles.userIsInRole(Meteor.userId(), 'club-admin') ? (
            <Menu.Item as={NavLink} id="adminMenuItem" activeClassName="active" exact to="/admin" key='admin'
              style={{ color: 'white' }}>Club Profile</Menu.Item>
          ) : ''
        }

        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" style={{ color: 'white' }} text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" style={{ color: 'white' }} text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter so that links work. */
export default withRouter(NavBarContainer);
