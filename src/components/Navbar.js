import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';

class Navbar extends Component {
  static contextType = AuthContext;

  render() {
    const { classes } = this.props;
    const { isAuth, logout } = this.context;

    return (
      <div className={classes.root}>
        <AppBar color="white" position="sticky">
          <Toolbar>
            <Grid justify="space-between" container alignItems="center">
              <Grid item>
                <Typography variant="h5" color="inherit">
                  Stockfront
                </Typography>
              </Grid>
              {isAuth ? ( // if the user is authorized, show the transactions, portfolio, and logout links
                <Grid item>
                  <Button
                    color="primary"
                    size="medium"
                    variant="outlined"
                    className={classes.button}
                    component={Link}
                    to="/dashboard/transactions"
                  >
                    Transactions
                  </Button>
                  <Button
                    color="primary"
                    size="medium"
                    variant="outlined"
                    className={classes.button}
                    component={Link}
                    to="/dashboard/portfolio"
                  >
                    Portfolio
                  </Button>
                  <Button
                    color="primary"
                    size="medium"
                    className={classes.button}
                    component={Link}
                    to="/login"
                    onClick={async () => await logout()}
                  >
                    Logout
                  </Button>
                </Grid>
              ) : (
                // the user is not authorized, only show login and sign up
                <Grid item>
                  {' '}
                  <Button
                    color="primary"
                    size="medium"
                    variant="outlined"
                    className={classes.button}
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    color="primary"
                    size="medium"
                    variant="outlined"
                    className={classes.button}
                    component={Link}
                    to="/signup"
                  >
                    Get Started
                  </Button>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
  button: {
    margin: '10px',
  },
};

export default withStyles(styles)(Navbar);
