import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Transactions(props) {
  const { classes, userTransactions } = props;

  return (
    <Card className={classes.card}>
      <Typography variant="h5" align="center" color="primary">
        Transactions
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell size="small" align="left">
              Ticker
            </TableCell>
            <TableCell size="small" align="left">
              Type
            </TableCell>
            <TableCell size="small" align="left">
              Transaction Date
            </TableCell>
            <TableCell size="small" align="left">
              # Shares
            </TableCell>
            <TableCell size="small" align="left">
              Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userTransactions &&
            userTransactions
              // sort the transactions by date
              .sort(function(a, b) {
                if (a.updatedAt > b.updatedAt) {
                  return -1;
                } else return 1;
              })
              .map(eachHolding => {
                return (
                  <TableRow key={eachHolding.id}>
                    <TableCell>{eachHolding.ticker}</TableCell>
                    <TableCell align="left">
                      {eachHolding.transactionType}
                    </TableCell>
                    <TableCell align="left">{eachHolding.createdAt}</TableCell>
                    <TableCell align="left">{eachHolding.quantity}</TableCell>
                    <TableCell align="left">
                      $
                      {Number(eachHolding.price).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </Card>
  );
}

const styles = {
  card: {
    padding: '30px',
    margin: '30px',
  },
  table: {
    overflowX: 'auto',
    overflowY: 'auto',
  },
};

export default withStyles(styles)(Transactions);
