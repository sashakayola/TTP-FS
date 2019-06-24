import React, { Component } from 'react'
import {connect} from 'react-redux'
import {signupUser} from '../store'
import Button from '@material-ui/core/Button'
import {Grid, Input} from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import image from '../backgroundImage.jpg'


class Signup extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    try {
      event.preventDefault()
      const firstName = event.target.firstName.value
      const lastName = event.target.lastName.value
      const email = event.target.email.value
      const password = event.target.password.value
      await this.props.signupUser(firstName, lastName, email, password)
      this.props.history.push('/transactions');
    } catch (error) {
      this.setState({
        error
      })
    }
  }

  handleLogin() {
    this.props.history.push('/login')
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
        <Card className={classes.card}>
          <form onSubmit={this.handleSubmit}>
            <Grid container justify="center" alignItems="center" direction="column" spacing={4}>
              <Grid item>
                  <Typography variant="h5">
                    Register
                  </Typography>
              </Grid>

              <Grid item>
                <Input name="firstName" type="text" placeholder="First Name" className={classes.text}/>
              </Grid>

              <Grid item>
              <Input name="lastName" type="text" placeholder="Last Name" className={classes.text}/>
              </Grid>

              <Grid item>
              <Input name="email" type="text" placeholder="Email" className={classes.text}/>
              </Grid>

              <Grid item>
              <Input name="password" type="password" placeholder="Password" className={classes.text}/>
              </Grid>

              <Grid item>
                  <Button variant='outlined' color="primary" size="large" type="submit">
                    Sign Up
                  </Button>
              </Grid>

              <Grid item>
                  <Button color="secondary" size="small" onClick={() => this.handleLogin()}>
                    Already Registered?
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
    signupUser: (firstName, lastName, email, password) =>
      dispatch(signupUser(firstName, lastName, email, password))
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

export default connect(null, mapDispatch)(withStyles(styles)(Signup));
