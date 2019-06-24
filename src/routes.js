import React, {Component} from 'react'
// import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Signup
} from './components'
// import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  // componentDidMount() {
  //   this.props.loadInitialData()
  // }

  render() {
    // const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route path="/" component={Signup} />
        {/* <Route exact path="/products/:id" component={SingleProduct} />
        <Route path="/payment" component={Checkout} />
        {isLoggedIn && (
          <Switch>
            <Route path="/profile" component={UserHome} />
            <Route exact path="/orders" component={OrderHistory} />
            <Route path="/editProfile" component={UpdateUser} />
            <Route exact path="/" component={Home} />
          </Switch>
        )}
        <Route exact path="/" component={Home} /> */}
      </Switch>
    )
  }
}
