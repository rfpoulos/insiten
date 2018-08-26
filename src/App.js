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
import Header from './screens/header/header';
import AddCompany from './screens/add-company/add-company';
import CompanyDetail from './screens/company-detail/company-detail';
import CreateAccountSuccess from './screens/create-account-success/create-account-success';
import EditCompany from './screens/edit-company/edit-company';
import CompanySearch from './screens/company-search/company-search';

export default () => 
  <Router>
    <div>
      <SignInRedirect />
      <Header />
      <Menu />
      <div style={ content }>
        <Switch>
          <Route path="/createaccount/success" component={ CreateAccountSuccess } />
          <Route path="/createaccount" component={ CreateAccount } />
          <Route path="/signin" component={ SignIn } />
          <Route path="/addcompany" component={ AddCompany } />
          <Route path="/company/:companyId" component={ CompanyDetail } />
          <Route path="/editcompany/:companyId" component={ EditCompany } />
          <Route path="/search/" component={ CompanySearch } />
        </Switch>
      </div>
    </div>
  </Router>
