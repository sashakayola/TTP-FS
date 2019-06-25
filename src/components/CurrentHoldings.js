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
            <Grid item>
              <Typography variant='h5'> Current Portfolio </Typography>{' '}
            </Grid>{' '}
            <Grid item>
              <Typography variant='h7'> stock 1 </Typography>{' '}
            </Grid>{' '}
            <Grid item>
              <Typography variant='h7'> stock 2 </Typography>{' '}
            </Grid>{' '}
            <Grid item>
              <Typography variant='h7'> stock 3 </Typography>{' '}
            </Grid>{' '}
            <Grid item>
              <Typography variant='h7'> stock 4 </Typography>{' '}
            </Grid>{' '}
            <Grid item>
              <Typography variant='h7'> stock 5 </Typography>{' '}
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

export default withStyles(styles)(CurrentHoldings);
