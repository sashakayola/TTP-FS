import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import backgroundImage from './assets/backgroundImage.jpg';
import { AuthProvider } from './AuthContext';
import axios from 'axios';

const App = ({ classes }) => {
  axios.defaults.baseURL = 'http://localhost:3000';

  return (
    <div className={classes.mainContent}>
      <div className={classes.app}>
        <AuthProvider>
          <BrowserRouter>
            <Navbar /> <Routes />
          </BrowserRouter>{' '}
        </AuthProvider>
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
