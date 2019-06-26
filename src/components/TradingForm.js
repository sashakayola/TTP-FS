import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Input, TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import axios from 'axios';

class TradingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  handleSubmit = async event => {
    const getFormData = event => {
      return {
        ticker: event.target.ticker.value,
        quantity: event.target.quantity.value,
      };
    };

    try {
      event.preventDefault();
      const { ticker, quantity } = getFormData(event);
      let data = await axios.get(`api/stocks/${ticker}`);
      console.log(data.data.latestPrice);
      console.log(data.data.open);
      this.setState({
        error: null,
      });
      this.resetForm();
    } catch (authError) {
      this.setState({
        error: authError,
      });
      return;
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
          <form onSubmit={this.handleSubmit} id='tradingForm'>
            <Grid
              container
              justify='center'
              alignItems='center'
              direction='column'
              spacing={2}
            >
              <Grid item>
                <Typography variant='h5'> Cash: $4000 </Typography>{' '}
              </Grid>{' '}
              <Grid item>
                <TextField
                  id='ticker'
                  label='Ticker symbol'
                  type='ticker'
                  margin='normal'
                  variant='outlined'
                />
              </Grid>{' '}
              <Grid item>
                <TextField
                  id='quantity'
                  label='Number of shares'
                  type='quantity'
                  margin='normal'
                  variant='outlined'
                />
              </Grid>{' '}
              <Grid item>
                {' '}
                {this.state.error && (
                  <div> {this.state.error.response.data} </div>
                )}{' '}
              </Grid>{' '}
              <Grid item>
                <Button
                  variant='outlined'
                  color='secondary'
                  size='large'
                  type='submit'
                >
                  Buy{' '}
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
