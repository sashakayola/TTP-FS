import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Signup, Dashboard, Login } from './components';
import AuthContext from './AuthContext';

export default class Routes extends Component {
  static contextType = AuthContext;

  async componentDidMount() {
    const { isAuth, authorize } = this.context;
    if (!isAuth) {
      await authorize(); // reauthorize user when context wiped (if user refreshed page)
    }
  }

  render() {
    return (
      <Switch>
        {this.context.isAuth && ( // if the user authorized, can render portfolio and transactions
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
