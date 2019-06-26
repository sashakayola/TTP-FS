import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Input, TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

class CurrentHoldings extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <Grid
            container
            justify='center'
            alignItems='left'
            direction='column'
            spacing={4}
          >
            <Grid item align='center'>
              <Typography variant='h5'> Portfolio: $3453 </Typography>{' '}
            </Grid>{' '}
            <Grid item>
              <Typography variant='h7'>
                {' '}
                stock 1 - Current Price - Opening Price{' '}
              </Typography>{' '}
            </Grid>{' '}
            <Grid item>
              <Typography variant='h7'>
                {' '}
                stock 2 - Current Price - Opening Price{' '}
              </Typography>{' '}
            </Grid>{' '}
            <Grid item>
              <Typography variant='h7'>
                {' '}
                stock 3 - Current Price - Opening Price{' '}
              </Typography>{' '}
            </Grid>{' '}
            <Grid item>
              <Typography variant='h7'>
                {' '}
                stock 4 - Current Price - Opening Price{' '}
              </Typography>{' '}
            </Grid>{' '}
            <Grid item>
              <Typography variant='h7'>
                {' '}
                stock 5 - Current Price - Opening Price{' '}
              </Typography>{' '}
            </Grid>{' '}
          </Grid>{' '}
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

export default withStyles(styles)(CurrentHoldings);
