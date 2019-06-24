import React from 'react'

import {Signup} from './components'
import withStyles from "@material-ui/core/styles/withStyles";

const App = ({classes}) => {
  return (
    <div className={classes.app}>
      <Signup/>
    </div>
  )
};

const styles = ({
  app: {
    width: '100vw',
    height: '100vh',
  }
});

export default withStyles(styles)(App);
