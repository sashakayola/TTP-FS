import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

const App = ({ classes }) => {
  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>{' '}
    </div>
  );
};

const styles = {
  app: {
    width: '100vw',
    height: '100vh',
  },
};

export default withStyles(styles)(App);
