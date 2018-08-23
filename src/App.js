import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom';
import Menu from './screens/menu/menu';
import CreateAccount from './screens/create-account/create-account';

export default () => 
  <Router>
    <div>
      <Menu />
      <div>
        <Switch>
          <Route path="/createaccount" component={ CreateAccount } />
        </Switch>
      </div>
    </div>
  </Router>
