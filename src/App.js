import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import backgroundImage from './assets/backgroundImage.jpg';

const App = ({ classes }) => {
  return (
    <div className={classes.mainContent}>
      <div className={classes.app}>
        {' '}
        <BrowserRouter>
          <Navbar /> <Routes />
        </BrowserRouter>{' '}
      </div>{' '}
    </div>
  );
};

const styles = {
  app: {
    width: '100vw',
    height: '100vh',
  },
  mainContent: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
  },
};

export default withStyles(styles)(App);
