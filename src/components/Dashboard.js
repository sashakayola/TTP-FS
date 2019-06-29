import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Transactions from './Transactions';
import axios from 'axios';
import AuthContext from '../AuthContext';
import TradingForm from './TradingForm';
import Portfolio from './Portfolio';
import { Grid } from '@material-ui/core';
import {
  setIntervalAsync,
  clearIntervalAsync,
} from 'set-interval-async/dynamic';

class Dashboard extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      userHoldings: [],
      userTransactions: [],
      userCashBalance: 5000,
      error: null,
      canUpdatePrices: true, // set to true to indicate when it's ok to grab updated price data
    };
  }

  componentDidMount = async () => {
    const { userId } = this.context;
    this.setState({ canUpdatePrices: false });

    try {
      const userHoldings = await this.fetchUserHoldings(userId);
      const userTransactions = await this.fetchUserTransactions(userId);
      const userCashBalance = await this.fetchUserCashBalance(userId);
      this.setState(
        {
          userHoldings,
          userTransactions,
          userCashBalance,
          canUpdatePrices: true,
        },
        () => {
          this.setTimer();
        },
      );
    } catch (err) {
      console.error(err);
    }
  };

  fetchUpdatedStockPrices = async () => {
    const updatedHoldings = await this.appendCurrentPrice(
      this.state.userHoldings,
    );
    this.setState({
      userHoldings: updatedHoldings,
    });
  };

  fetchUserCashBalance = async userId => {
    const response = await axios.get(`/api/users/${this.context.userId}`);
    return Number(response.data.user.user.balance);
  };

  fetchUserHoldings = async userId => {
    const response = await axios.get(`api/users/${userId}/holdings`);
    return await this.appendCurrentPrice(response.data);
  };

  fetchUserTransactions = async userId => {
    try {
      const response = await axios.get(`api/users/${userId}/transactions`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  handleNewTransaction = async (ticker, quantity, transactionType) => {
    const { userId } = this.context;
    this.setState({
      error: null,
      canUpdatePrices: false,
    });

    try {
      await axios.post(`api/users/${userId}/transactions`, {
        ticker,
        quantity,
        transactionType,
      });
      const userHoldings = await this.fetchUserHoldings(userId);
      const userTransactions = await this.fetchUserTransactions(userId);
      const userCashBalance = await this.fetchUserCashBalance(userId);
      this.setState(
        {
          userHoldings,
          userTransactions,
          userCashBalance,
          canUpdatePrices: true,
        },
        () => {
          this.setTimer();
        },
      );
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  // set a timer to continuously grab up to date stock price
  setTimer = () => {
    const { isAuth } = this.context;
    const timer = setIntervalAsync(async () => {
      if (
        !this.state.canUpdatePrices ||
        this.state.userHoldings.length < 1 ||
        !isAuth
      ) {
        clearIntervalAsync(timer);
      }
      await this.fetchUpdatedStockPrices();
    }, 5000);
  };

  fetchUpdatedStockPrices = async () => {
    const updatedHoldings = await this.appendCurrentPrice(
      this.state.userHoldings,
    );
    this.setState({
      userHoldings: updatedHoldings,
    });
  };

  fetchUserCashBalance = async userId => {
    const response = await axios.get(`/api/users/${userId}`);
    return Number(response.data.user.user.balance);
  };

  fetchUserHoldings = async userId => {
    const response = await axios.get(`api/users/${userId}/holdings`);
    return await this.appendCurrentPrice(response.data);
  };

  fetchUserTransactions = async userId => {
    try {
      const response = await axios.get(`api/users/${userId}/transactions`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  fetchStockPriceInfo = async ticker => {
    const response = await axios.get(`api/prices/${ticker}`);
    const openPrice = response.data.open;
    const currentPrice = response.data.latestPrice;
    return { openPrice, currentPrice };
  };

  appendCurrentPrice = async assets => {
    // for each stock in the user's portfolio, add on the current stock price
    const pricedAssets = assets.map(async asset => {
      const { openPrice, currentPrice } = await this.fetchStockPriceInfo(
        asset.ticker,
      );
      const currentValue = currentPrice * asset.quantity;
      let color = 'grey'; // change color if current price > or < or === open price
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
    const { classes, location } = this.props;
    const totalValue = this.calculateTotalValue(this.state.userHoldings);

    return (
      // dashboard is the parent component for the portfolio, trading form, and transactions components
      <div className={classes.mainContent}>
        {location.pathname === '/dashboard/portfolio' && (
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

        {location.pathname === '/dashboard/transactions' && (
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
