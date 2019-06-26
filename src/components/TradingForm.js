import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Input, TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

class TradingForm extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
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
                id='tickerSymbol'
                label='Ticker symbol'
                type='tickerSymbol'
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
        </Card>{' '}
      </div>
    );
  }
}

const styles = {
  card: {
    padding: '30px',
    margin: '80px',
  },
  text: {
    width: 250,
  },
};

export default withStyles(styles)(TradingForm);
