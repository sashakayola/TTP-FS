import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import {
  Signup,
  Transactions,
  Login
} from './components'



export default class Routes extends Component {
  // componentDidMount() {
  //   this.props.loadInitialData()
  // }

  render() {
    // const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route exact path="/transactions" component={Transactions} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
      </Switch>
    )
  }
}
