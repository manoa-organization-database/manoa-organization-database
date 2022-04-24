import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import Search from '../pages/Search';
// import Home from '../pages/Home';
import EditUser from '../pages/EditUser';
import UserHomePage from '../pages/UserHomePage';
import AddProject from '../pages/AddProject';
import Filter from '../pages/Filter';
// import Interests from '../pages/Interests';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import ClubAdminHome from '../pages/ClubAdminHome';
import ChangeUserStatus from '../pages/ChangeUserStatus';
import ClubInformation from '../pages/ClubInformation';
import AdminClubPage from '../pages/AdminClubPage';
import ClubPage from '../pages/ClubPage';
import EditClub from '../pages/EditClub';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <div style={{ paddingTop: '20px', paddingBottom: '30px' }}>
            <Switch>
              <Route exact path="/" component={Landing}/>
              {/* <ProtectedRoute path="/home" component={Home}/> */}
              <ProtectedRoute path="/edit-user" component={EditUser}/>
              <ProtectedRoute path="/profile" component={UserHomePage}/>
              <ProtectedRoute path="/clubs" component={ClubInformation}/>
              <ProtectedRoute path="/search" component={Search}/>
              <ProtectedRoute path="/clubadminhome" component={ClubAdminHome}/>
              <ProtectedRoute path="/clubadmin/:_id" component={AdminClubPage}/>
              <ProtectedRoute path="/club/:_id" component={ClubPage}/>
              <ProtectedRoute path="/edit-club/:_id" component={EditClub}/>
              <ProtectedRoute path="/addproject" component={AddProject}/>
              <ProtectedRoute path="/filter" component={Filter}/>
              <AdminProtectedRoute path="/change-user-status" component={ChangeUserStatus}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
