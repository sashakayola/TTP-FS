import React from 'react'
import withStyles from "@material-ui/core/styles/withStyles";
import Routes from './routes'

const App = ({classes}) => {
  return (
    <div className={classes.app}>
      <Routes/>
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
