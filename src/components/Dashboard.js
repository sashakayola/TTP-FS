import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Transactions from './Transactions';
import axios from 'axios';
import AuthContext from '../AuthContext';
import TradingForm from './TradingForm';
import Portfolio from './Portfolio';
import { Grid } from '@material-ui/core';

class Dashboard extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      userHoldings: [],
      userCashBalance: 5000,
      error: null,
      userTransactions: [],
    };
  }

  componentDidMount = async () => {
    let { userId } = this.context;
    const userHoldings = await this.fetchUserHoldings(userId);
    let userCashBalance = await this.fetchUserCashBalance(userId);
    this.setState({
      userHoldings,
      userCashBalance,
    });
  };

  fetchUserCashBalance = async userId => {
    let user = await axios.get(`/api/users/${this.context.userId}`);
    return Number(user.data.balance);
  };

  fetchUserHoldings = async userId => {
    const response = await axios.get(`api/users/${userId}/holdings`);
    return await this.appendCurrentPrice(response.data);
  };

  fetchUserTransactions = async userId => {
    const response = await axios.get(`api/users/${userId}/transactions`);
    return response.data;
  };

  handleNewTransaction = async (ticker, quantity) => {
    let { userId } = this.context;
    this.setState({
      error: null,
    });
    try {
      await axios.post(`api/users/${userId}/transactions`, {
        ticker,
        quantity,
      });
      const userHoldings = await this.fetchUserHoldings(userId);
      const userTransactions = await this.fetchUserTransactions(userId);
      console.log('user transactions', userTransactions);
      let userCashBalance = await this.fetchUserCashBalance(userId);
      this.setState({
        userHoldings,
        userCashBalance,
        userTransactions,
      });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  getStockPriceInfo = async ticker => {
    const response = await axios.get(`api/prices/${ticker}`);
    const openPrice = response.data.open;
    const currentPrice = response.data.latestPrice;
    return { openPrice, currentPrice };
  };

  appendCurrentPrice = async assets => {
    const pricedAssets = assets.map(async asset => {
      const { openPrice, currentPrice } = await this.getStockPriceInfo(
        asset.ticker,
      );
      const currentValue = currentPrice * asset.quantity;
      let color = 'grey';
      if (currentPrice < openPrice) color = 'red';
      else if (currentPrice > openPrice) color = 'green';
      return { ...asset, currentValue, color };
    });
    return await Promise.all(pricedAssets);
  };

  calculateTotalValue = assets => {
    return assets.reduce((totalValue, asset) => {
      return totalValue + asset.currentValue;
    }, 0);
  };

  render() {
    const { classes } = this.props;
    const totalValue = this.calculateTotalValue(this.state.userHoldings);

    return (
      <div className={classes.mainContent}>
        {this.props.location.pathname === '/dashboard/portfolio' && (
          <Grid
            container
            className={classes.mainContent}
            justify="center"
            alignItems="center"
            direction="row"
            spacing={5}
          >
            <Portfolio
              userHoldings={this.state.userHoldings}
              totalValue={totalValue}
            />
            <TradingForm
              userCashBalance={this.state.userCashBalance}
              onSubmit={this.handleNewTransaction}
              error={this.state.error}
            />
          </Grid>
        )}

        {this.props.location.pathname === '/dashboard/transactions' && (
          <Grid
            container
            className={classes.mainContent}
            justify="center"
            alignItems="center"
            direction="row"
            spacing={5}
          >
          <Transactions userTransactions={this.state.userTransactions} />
          </Grid>

        )}
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

export default withStyles(styles)(Dashboard);
