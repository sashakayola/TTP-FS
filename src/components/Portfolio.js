import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
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
          justify="center"
          // alignItems='center'
          direction="row"
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
