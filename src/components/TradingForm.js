import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import AuthContext from '../AuthContext';

class TradingForm extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      ticker: '',
      quantity: 1,
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ quantity: 1, ticker: '' });
    // adding a transaction handled in dashboard parent component
    await this.props.onSubmit(
      this.state.ticker,
      Number(this.state.quantity),
      'Buy',
    );
  };

  render() {
    const { classes, userCashBalance, error } = this.props;
    const validQuantity =
      Number(this.state.quantity) > 0 &&
      !String(this.state.quantity).includes('.');
    const emptyTicker = this.state.ticker === '';

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
                <Typography variant="h5" color="primary">
                  Cash Balance: $
                  {userCashBalance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  id="ticker"
                  required
                  value={this.state.ticker}
                  onChange={event =>
                    this.setState({ ...this.state, ticker: event.target.value })
                  }
                  label="Ticker symbol"
                  type="string"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="quantity"
                  value={this.state.quantity}
                  onChange={event =>
                    this.setState({
                      ...this.state,
                      quantity: event.target.value,
                    })
                  }
                  required
                  label="Number of shares"
                  error={!validQuantity}
                  type="number"
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item>{error && <div> {error.response.data} </div>}</Grid>
              <Grid item>
                {!validQuantity && <div> Positive whole shares only </div>}
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  disabled={!validQuantity || emptyTicker}
                >
                  Buy
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
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
