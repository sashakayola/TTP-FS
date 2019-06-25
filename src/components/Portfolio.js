import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Input, TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import backgroundImage from '../assets/backgroundImage.jpg';
import TradingForm from './TradingForm';
import CurrentHoldings from './CurrentHoldings';

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
          <CurrentHoldings />
          <TradingForm />{' '}
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
