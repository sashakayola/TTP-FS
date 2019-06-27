import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import AuthContext from '../AuthContext';

class TradingForm extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      authError: null,
      quantityError: null,
    };
  }

  componentDidMount = async () => {
    let user = await axios.get(`/api/users/${this.context.userId}`);
    // console.log(user);
    this.setState({
      userCashBalance: user.data.balance,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { userId } = this.context;

    const getFormData = event => {
      return {
        ticker: event.target.ticker.value,
        quantity: event.target.quantity.value,
      };
    };

    const { ticker, quantity } = getFormData(event);

    // clear form from when user previously submitted transaction
    this.resetForm();
    this.setState({
      authError: null,
      quantityError: null,
      userBalanceError: null,
    });

    if (quantity < 1) {
      this.setState({
        quantityError: 'Negative or zero shares not allowed',
      });
    } else {
      try {
        const { data } = await axios.post('api/stock/buy', {
          ticker,
          quantity,
          userId,
        });
        // console.log(data.data.latestPrice);
        // console.log(data.data.open);
      } catch (error) {
        this.setState({
          authError: error,
        });
      }
    }
  };

  resetForm = () => {
    document.getElementById('tradingForm').reset();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <form onSubmit={this.handleSubmit} id="tradingForm">
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
              spacing={2}
            >
              <Grid item>
                <Typography variant="h5">
                  Cash: ${this.state.userCashBalance}
                </Typography>{' '}
              </Grid>
              <Grid item>
                <TextField
                  id="ticker"
                  required
                  label="Ticker symbol"
                  type="string"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="quantity"
                  required
                  label="Number of shares"
                  type="number"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                {' '}
                {this.state.authError && (
                  <div> {this.state.authError.response.data} </div>
                )}{' '}
              </Grid>{' '}
              <Grid item>
                {' '}
                {this.state.quantityError && (
                  <div> {this.state.quantityError} </div>
                )}{' '}
              </Grid>{' '}
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  type="submit"
                >
                  Buy
                </Button>{' '}
              </Grid>{' '}
            </Grid>{' '}
          </form>{' '}
        </Card>{' '}
      </div>
    );
  }
}

const styles = {
  card: {
    padding: '40px',
    margin: '90px',
  },
  text: {
    width: 250,
  },
};

export default withStyles(styles)(TradingForm);
