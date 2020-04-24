import React, {Component} from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';

import Component2 from './functional/component2';
import Container1 from './containers/container4';
import Callback from './functional/callback';

import AuthCheck from './utils/authcheck';
import Header from './containers/headers';
import history from './utils/history';
import Auth from './utils/auth';
import UnauthRedirect from './functional/unauthredirect';
import ProtectedRoute from './functional/protectedRoute';

const auth = new Auth();

const handleAuthentication = (props) => {
    if(props.location.hash) {
        auth.handleAuth();
    }
}

const PrivateRoute = ({ component: Component, auth }) => (
     <Route render={props=>auth.isAuthenticated() === true
        ? <Component auth={auth} {...props} />
        : <Redirect to={{pathname: '/redirect'}} />
    }
    />
 )
class Routes extends Component {
    render(){
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header auth={auth} />
                        <Switch>
                            <Route exact path='/' render={() => <Container1 auth={auth} />} />
                            <Route path='/authcheck' render={() => <AuthCheck auth={auth} />} />
                            <Route path='/redirect' component={UnauthRedirect} />
                            <Route path='/callback' render={(props) => { handleAuthentication(props); return <Callback />}} />
                            <Route path='/component/:id' render={(props) => <Component2 {...props} />} />
                            <PrivateRoute path='/privateroute' auth={auth} component={ProtectedRoute} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Routes;