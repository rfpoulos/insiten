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

export default () => 
  <Router>
    <div>
      <Menu />
      <div style={ content }>
        <Switch>
          <Route path="/createaccount" component={ CreateAccount } />
          <Route path="/signin" component={ SignIn } />
        </Switch>
      </div>
    </div>
  </Router>
