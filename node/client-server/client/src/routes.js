import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router';

import Header from './containers/header';
import Profile from './containers/profile';

import Callback from './functional/callback';
import PrivateComponent from './functional/privatecomponent';
import UnauthRedirect from './functional/unauthredirect';
import Home from './functional/home';

import * as ACTIONS from './store/actions/actions';

import Auth from './utils/auth';
import AuthCheck from './utils/authcheck';
import history from './utils/history';

import Posts from './blog/posts';
import AddPost from './blog/addpost';
import ShowPost from './blog/showpost';
import EditPost from './blog/editpost';

export const auth = new Auth()

const handleAuthentication = (props) => {
  if(props.location.hash) {
    auth.handleAuth()
  }
}

const PrivateRoute = ({component: Component, auth }) => (
  <Route render={props => auth.isAuthenticated() === true
    ? <Component auth={auth} {...props} />
    : <Redirect to={{pathname:'/redirect'}} />
  }
  />
)



class Routes extends Component {
  componentDidMount() {
    if(auth.isAuthenticated()) {
      this.props.login_success()
      auth.getProfile()
      setTimeout(() => {this.props.add_profile(auth.userProfile)}, 400)
    }
    else {
      this.props.login_failure()
      this.props.remove_profile()
    }
  }

  render() {
    return(
      <div>
        <Router history={history} >
        <div>
          <Header auth={auth} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/authcheck' render={() => <AuthCheck auth={auth} /> } />
            <Route path='/redirect' component={UnauthRedirect} />
            <Route path='/callback' render={(props) => { handleAuthentication(props); return <Callback />}} />
            <PrivateRoute path="/privateroute" auth={auth} component={PrivateComponent} />
            <PrivateRoute path="/profile" auth={auth} component={Profile} />

            <Route path='/posts' component={Posts} />
            <Route path='/post/:pid' component={ShowPost} />
            <Route path='/editpost/:pid' component={EditPost} />
            <Route path='/addpost' component={AddPost} />
          </Switch>
        </div>
        </Router>
      </div>
    )}
}


function mapDispatchToProps (dispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure()),
    add_profile: (profile) => dispatch(ACTIONS.add_profile(profile)),
    remove_profile: () => dispatch(ACTIONS.remove_profile())
  }
}


export default connect(null, mapDispatchToProps)(Routes);
