import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios'

class CurrentHoldings extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      userHoldings: null
    })
  }

  getStockInfo = async (ticker) => {
    let response = await axios.get(`api/stock/${ticker}`)
    console.log(response.data.open)
    console.log(response.data.latestPrice)
    return response;
  }

  componentDidMount = async () => {
    let tempState = []
    this.props.userHoldings &&

    (this.props.userHoldings.forEach((eachHolding) => {
      console.log(eachHolding.ticker)
      let stockInfo = this.getStockInfo(eachHolding.ticker)
      let currentValue = stockInfo.data.latestPrice * eachHolding.quantity
      tempState.push(
        {ticker: eachHolding.ticker,
        quantity: eachHolding.quantity,
        currentValue
       }
      )
    }))
    this.setState({
      userHoldings: tempState
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <Typography variant="h5" align="center">
          {' '}
          Portfolio: $3453{' '}
        </Typography>{' '}
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell size="medium">Ticker</TableCell>
              <TableCell size="medium" align="right">
                # Shares
              </TableCell>
              <TableCell size="medium" align="right">
                Current Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.userHoldings &&
              this.state.userHoldings.sort().map(eachHolding => {
                {/* const currentPrice = this.getStockInfo(eachHolding.ticker) */}
                return (
                  <TableRow key={eachHolding.ticker}>
                    <TableCell>{eachHolding.ticker}</TableCell>
                    <TableCell align="center">{eachHolding.quantity}</TableCell>
                    <TableCell align="center">{this.getStockInfo(eachHolding.currentValue)}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Card>
    );
  }
}

const styles = {
  card: {
    padding: '40px',
    margin: '90px',
  },
  table: {
    overflowX: 'auto',
    overflowY: 'auto',
  },
};

export default withStyles(styles)(CurrentHoldings);
