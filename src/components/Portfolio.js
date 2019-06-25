import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Input, TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import backgroundImage from '../assets/backgroundImage.jpg';

class Portfolio extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContent}>
        <Grid
          container
          className={classes.mainContent}
          justify='center'
          alignItems='center'
          direction='row'
          spacing={5}
        >
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
                  color='primary'
                  size='large'
                  type='submit'
                >
                  Buy{' '}
                </Button>{' '}
              </Grid>{' '}
            </Grid>{' '}
          </Card>{' '}
        </Grid>{' '}
      </div>
    );
  }
}

const styles = {
  mainContent: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
  },
  card: {
    padding: '30px',
    margin: '80px',
  },
  text: {
    width: 250,
  },
};

export default withStyles(styles)(Portfolio);
