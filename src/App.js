import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom';
import {
  content,
} from './app-style';
import Menu from './screens/menu/menu';
import CreateAccount from './screens/create-account/create-account';
import SignIn from './screens/sign-in/sign-in';
import SignInRedirect from './fragments/sign-in-redirect/sign-in-redirect';

export default () => 
  <Router>
    <div>
      <SignInRedirect />
      <Menu />
      <div style={ content }>
        <Switch>
          <Route path="/createaccount" component={ CreateAccount } />
          <Route path="/signin" component={ SignIn } />
          <Route path="/notauthorized" component={ SignIn } />
        </Switch>
      </div>
    </div>
  </Router>
