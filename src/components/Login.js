import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Input } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import AuthContext from '../AuthContext';

class Login extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  handleSubmit = async event => {
    const { login } = this.context;
    const getFormData = event => {
      return {
        email: event.target.email.value,
        password: event.target.password.value,
      };
    };

    try {
      event.preventDefault();
      this.setState({
        error: null,
      });
      const { email, password } = getFormData(event);
      const user = await axios.post('api/users/login/', {
        email,
        password,
      });
      login(user.data.id);
      this.props.history.push('/portfolio');
    } catch (authError) {
      console.log(authError);
      this.setState({
        error: authError,
      });
      return;
    }
  };

  redirectToSignup = () => {
    this.props.history.push('/signup');
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContent}>
        <Grid
          container
          className={classes.mainContent}
          justify="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Card className={classes.card}>
              <form id="login" onSubmit={this.handleSubmit}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  direction="column"
                  spacing={4}
                >
                  <Grid item>
                    <Typography variant="h5"> Welcome back </Typography>{' '}
                  </Grid>{' '}
                  <Grid item>
                    <Input
                      name="email"
                      type="text"
                      placeholder="Email"
                      className={classes.text}
                    />{' '}
                  </Grid>{' '}
                  <Grid item>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      className={classes.text}
                    />{' '}
                  </Grid>{' '}
                  {this.state.error && (
                    <div> {this.state.error.response.data} </div>
                  )}{' '}
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      type="submit"
                    >
                      Login{' '}
                    </Button>{' '}
                  </Grid>{' '}
                  <Grid item>
                    <Button
                      color="secondary"
                      size="small"
                      onClick={this.redirectToSignup}
                    >
                      {'Not a client? Sign up'}{' '}
                    </Button>{' '}
                  </Grid>{' '}
                </Grid>{' '}
              </form>{' '}
            </Card>{' '}
          </Grid>{' '}
        </Grid>{' '}
      </div>
    );
  }
}

const styles = {
  mainContent: {
    width: '100%',
    height: '100%',
  },
  card: {
    padding: '40px',
  },
  text: {
    width: 250,
  },
};

export default withStyles(styles)(Login);
