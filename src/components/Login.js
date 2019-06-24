import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser} from '../store'
import Button from "@material-ui/core/Button";
import {Grid, Input} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea"
import image from "../backgroundImage.jpg"
import CardHeader from "@material-ui/core/CardHeader";
import FormGroup from "@material-ui/core/FormGroup";


class Login extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    try {
      event.preventDefault()
      // const formName = event.target.name
      const email = event.target.email.value
      const password = event.target.password.value
      await this.props.loginUser(email, password)
      this.props.history.push('/transactions');
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
    return (
      <div
        className={classes.mainContent}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >

      <Grid container className={classes.mainContent} justify="center" alignItems="center" direction="column">
        <Grid item>
          <Card>
          <form name="signup" onSubmit={this.handleSubmit}>
            <Grid container justify="center" alignItems="center" direction="column" spacing={4}>
              <Grid item>
                  <Typography variant="h5">
                    Welcome back
                  </Typography>
              </Grid>

              <Grid item xs={10}>
              <Input name="email" type="text" placeholder="Email" />
              </Grid>

              <Grid item xs={10}>
              <Input name="password" type="password" placeholder="Password" />
              </Grid>

              <Grid item>
                  <Button simple color="primary" size="large" type="submit">
                    Login
                  </Button>
              </Grid>

              <Grid item>
                  <Button simple color="secondary" size="small" onClick={() => this.handleSignup()}>
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

// const mapState = state => {
//   return {
//     error: state.user.user.error
//   }
// }
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
});

export default connect(null, mapDispatch)(withStyles(styles)(Login));
