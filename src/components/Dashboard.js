// /dashboard/portfolio
// /dashboard/transactions

import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Transactions from './Transactions';
import Portfolio from './Portfolio';
import axios from 'axios';
import AuthContext from '../AuthContext';

class Dashboard extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      userHoldings: [],
      // error: {}
    };
  }

  componentDidMount = async () => {
    let { userId } = this.context;
    const userHoldings = await this.fetchUserHoldings(userId);
    this.setState({
      userHoldings,
    });
  };

  fetchUserHoldings = async userId => {
    const response = await axios.get(`api/users/${userId}/holdings`);
    console.log("RESPONSE", response)
    return await this.appendCurrentPrice(response.data);
  };

  updateUserHoldings = userHoldings => {
    this.setState({
      userHoldings,
    });
  };

  handleNewTransaction = async () => {
    let { userId } = this.context;
    // this.setState({...this.state, error: {}});

    // axios.post()
    // if !response.ok {
    //   this.setState({...this.state, error: {type: 'giusdbuf', message: 'saidhauf'}})
    // } else {
    //   const userHoldings = await this.fetchUserHoldings();
    //   this.setState({
    //     userHoldings,
    //   });
    // }
    const userHoldings = await this.fetchUserHoldings(userId);
    this.setState({
      userHoldings,
    });
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
    // const totalValue = this.calculateTotalValue(this.state.userHoldings);
    // console.log(totalValue);

    console.log(this.props.location.pathname);
    return (
      <div className={classes.mainContent}>
      {this.props.location.pathname === '/dashboard/portfolio' &&
          <Portfolio
            // userHoldings={this.state.userHoldings}
            // totalValue={totalValue}
            // onSubmit={this.handleNewTransaction}
            // error={this.state.error}
          />
      }
      {this.props.location.pathname === '/dashboard/transactions' &&
          <Transactions />
      }

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
