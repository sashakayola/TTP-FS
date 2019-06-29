import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import { Signup, Dashboard, Login } from './components';
import AuthContext from './AuthContext';

export default class Routes extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: false,
    };
  }

  async componentDidMount() {
    if (!this.context.isAuth) {
      await this.context.login();
    }
  }

  render() {
    return (
      <Switch>
        {this.context.isAuth && (
          <Switch>
            <Route exact path="/dashboard/portfolio" component={Dashboard} />
            <Route exact path="/dashboard/transactions" component={Dashboard} />
          </Switch>
        )}
        <Switch>
          <Route exact path="/signup" component={Signup} />{' '}
          <Route exact path="/login" component={Login} />{' '}
          <Route path="/" component={Login} />{' '}
        </Switch>
      </Switch>
    );
  }
}
