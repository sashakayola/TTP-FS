import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import TradingForm from './TradingForm';
import CurrentHoldings from './CurrentHoldings';
import axios from 'axios';
import AuthContext from '../AuthContext';

class Portfolio extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      userHoldings: null,
    };
  }

  async componentDidMount() {
    let { userId } = this.context;
    const userHoldings = await axios.get(`api/users/${userId}/holdings`);
    this.setState({
      userHoldings: userHoldings.data,
    });
  }

  getCurrentHoldings = currentHoldings => {
    console.log(currentHoldings);
    this.setState({
      userHoldings: currentHoldings,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContent}>
        <Grid
          container
          className={classes.mainContent}
          justify="center"
          alignItems="center"
          direction="row"
          spacing={5}
        >
          <CurrentHoldings userHoldings={this.state.userHoldings} />
          <TradingForm getCurrentHoldings={this.getCurrentHoldings} />{' '}
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
