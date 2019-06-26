import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Signup, Transactions, Login, Portfolio } from './components';
import AuthContext from './AuthContext';

export default class Routes extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuth } = this.context;

    return (
      <Switch>
        {isAuth && (
          <Switch>
            <Route exact path="/portfolio" component={Portfolio} />
            <Route exact path="/transactions" component={Transactions} />
          </Switch>
        )}
        <Route exact path="/signup" component={Signup} />{' '}
        <Route exact path="/login" component={Login} />{' '}
        <Route path="/" component={Login} />{' '}
      </Switch>
    );
  }
}
