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
      userCashBalance: 5000,
    };
  }

  componentDidMount = async () => {
    let user = await axios.get(`/api/users/${this.context.userId}`);
    console.log(typeof user.data.balance);
    this.setState({
      userCashBalance: Number(user.data.balance),
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

    // this.props.onSubmit(ticker, quantity);
    // this.setState({quantity:0, ticker:''});

    const { ticker, quantity } = getFormData(event);

    // clear form from when user previously submitted transaction
    this.resetForm();
    this.setState({
      authError: null,
      quantityError: null,
    });

    if (quantity < 1) {
      this.setState({
        quantityError: 'Negative or zero shares not allowed',
      });
    } else {
      try {
        const { data } = await axios.post(`api/users/${userId}/transactions`, {
          ticker,
          quantity,
        });
        this.setState({
          userCashBalance: data.updatedUserBalance,
        });
        // const holdings = await axios.get(`api/users/${userId}/holdings`);
        this.props.onSubmit();
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
    // const validQuantity = this.state.quantity > 0;

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
                  Cash: ${this.state.userCashBalance.toLocaleString(undefined, {maximumFractionDigits:2})}
                </Typography>{' '}
              </Grid>
              <Grid item>
                <TextField
                  id="ticker"
                  required
                  // value={this.state.ticker}
                  // onChange={(event) => this.setState({...this.state, ticker: event.target.value})}
                  // error={!validQuantity}
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
                  // disabled={!validQuantity}
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
