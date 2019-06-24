import React, { Component } from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../store'
import Button from "@material-ui/core/Button";
import {Grid, Input} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import backgroundImage from '../assets/backgroundImage.jpg'

class Login extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    try {
      event.preventDefault()
      const email = event.target.email.value
      const password = event.target.password.value
      await this.props.loginUser(email, password)
      // this.props.history.push('/transactions');
    } catch (error) {
      this.setState({
        error
      })
    }
  }

  handleSignup() {
    this.props.history.push('/signup')
  }

  render() {
    const { classes } = this.props;
    const { error } = this.props;
    return (
      <div
        className={classes.mainContent}
        style={{
          backgroundImage: "url(" + backgroundImage + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >

      <Grid container className={classes.mainContent} justify="center" alignItems="center" direction="column">
        <Grid item>
          <Card className={classes.card}>
          <form name="signup" onSubmit={this.handleSubmit}>
            <Grid container justify="center" alignItems="center" direction="column" spacing={4}>
              <Grid item>
                  <Typography variant="h5">
                    Welcome back
                  </Typography>
              </Grid>

              <Grid item>
              <Input name="email" type="text" placeholder="Email" className={classes.text}/>
              </Grid>

              <Grid item>
              <Input name="password" type="password" placeholder="Password" className={classes.text}/>
              </Grid>
              {error && error.response && <div> {error.response.data} </div>}
              <Grid item>
                  <Button variant='outlined' color="primary" size="large" type="submit">
                    Login
                  </Button>
              </Grid>

              <Grid item>
                  <Button color="secondary" size="small" onClick={() => this.handleSignup()}>
                    Not a client? Sign up
                  </Button>
              </Grid>

            </Grid>
          </form>
          </Card>
        </Grid>
      </Grid>
      </div>
    );
  }
}

const mapState = state => {
  return {
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    loginUser: (email, password) =>
      dispatch(loginUser(email, password))
  }
}

const styles = ({
  mainContent: {
    width: '100%',
    height: '100%',
  },
  card: {
    padding: '40px',
  },
  text: {
    width: 250
  }
});

export default connect(mapState, mapDispatch)(withStyles(styles)(Login));
