import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class CurrentHoldings extends Component {
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
            {this.props.userHoldings &&
              this.props.userHoldings.sort().map(eachHolding => {
                return (
                  <TableRow key={eachHolding.ticker}>
                    <TableCell>{eachHolding.ticker}</TableCell>
                    <TableCell align="center">{eachHolding.quantity}</TableCell>
                    <TableCell align="center">currentValue</TableCell>
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
