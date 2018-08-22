import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch,
} from 'react-router-dom';
import Menu from './screens/menu/menu';

export default () => 
  <Router>
    <div>
      <Menu />
      <div>
        <Switch>
        </Switch>
      </div>
    </div>
  </Router>
