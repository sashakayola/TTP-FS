import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Portfolio(props) {
  const { classes, totalValue, userHoldings } = props;

  return (
    <Card className={classes.card}>
      <Typography variant="h5" align="center" color="primary">
        Portfolio Value: $
        {totalValue.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
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
          {userHoldings &&
            userHoldings
              // sort holdings alpha order
              .sort(function(a, b) {
                if (a.ticker < b.ticker) {
                  return -1;
                } else return 1;
              })
              .map(eachHolding => {
                let color = eachHolding.color;
                let style = classes.tableCellgrey;
                color === 'red'
                  ? (style = classes.tableCellred)
                  : (style = classes.tableCellgreen);
                return (
                  <TableRow key={eachHolding.id}>
                    <TableCell className={style}>
                      {eachHolding.ticker}
                    </TableCell>
                    <TableCell align="left">{eachHolding.quantity}</TableCell>
                    <TableCell align="left" className={style}>
                      $
                      {eachHolding.currentValue.toLocaleString(undefined, {
                        minimumFractionDigits: 4,
                        maximumFractionDigits: 4,
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
    padding: '40px',
    margin: '90px',
  },
  table: {
    overflowX: 'auto',
    overflowY: 'auto',
  },
  tableCellred: {
    color: 'RED',
  },
  tableCellgreen: {
    color: 'GREEN',
  },
  tableCellgrey: {
    color: 'GREY',
  },
};

export default withStyles(styles)(Portfolio);
