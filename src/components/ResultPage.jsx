import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import { connect } from 'react-redux';
import { SERVER_SETTING, formatDate } from '../ultis';

const columnData = [
  {
    id: 'recordDate',
    numeric: false,
    disablePadding: false,
    sortable: true,
    label: 'Record Date',
  },
  {
    id: 'numberOfSurvey',
    numeric: false,
    disablePadding: false,
    sortable: true,
    label: 'Number of Survey',
  },
];

function getDate(objectId) {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
}
function downloadCSV(data) {
  const { protocol, url } = SERVER_SETTING;
  fetch(`${protocol}${url}/peak-vn/ecsite/backup-survey`).catch(console.log)
  const header = ['Ngày', ...data[0].answer.map(e => e.name)];
  const rows = data.map(e => [
    formatDate(getDate(e._id)),
    ...e.answer.map(e1 => `${e1.checked.join(';')};${e1.text}`),
  ]);
  const ldata = [header, ...rows];
  // console.log(ldata);
  // const csvData = [
  //   ['firstname', 'lastname', 'email'],
  //   ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
  //   ['Raed', 'Labes', 'rl@smthing.co.com'],
  //   ['Yezzi', 'Min l3b', 'ymin@cocococo.com'],
  // ];
  return ldata;
}
class EnhancedTableHead extends Component {
  createSortHandler = (property, sortable) => event => {
    if (sortable) this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => (
            <TableCell
              key={column.id}
              numeric={column.numeric}
              padding={column.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === column.id ? order : false}
            >
              <Tooltip
                title={
                  column.sortable ? `Sort by ${column.label}` : column.label
                }
                placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id, column.sortable)}
                >
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = ({ classes, csvData }) => (
  // const { classes, csvData } = props;

  <Toolbar className={classes.root}>
    <div className={classes.title}>
      <Typography variant="title">Results</Typography>
    </div>
    <div className={classes.spacer} />
    {csvData && (
      <Button variant="raised" color="primary">
        <CSVLink filename="results.csv" data={downloadCSV(csvData)}>
          Download
        </CSVLink>
      </Button>
    )}
  </Toolbar>
);

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    display: 'flex',
    padding: '.1vw',
    margin: '0.2vw 1.1vw',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
};

class ResultPage extends Component {
  props: {
    classes: Object,
  };
  state = {
    order: 'asc',
    orderBy: 'recordDate',
    data: [],
    page: 0,
    rowsPerPage: 5,
  };
  componentDidMount() {
    const { protocol, url } = SERVER_SETTING;
    fetch(`${protocol}${url}/peak-vn/ecsite/survey-submit`)
      .then(rs => rs.json())
      .then(d => {
        let aId = 0;
        const data = d.data
          .sort((f, s) => getDate(f._id) - getDate(s._id))
          .map(e => getDate(e._id))
          .reduce((a, c) => {
            const init = { date: c, count: 1 };
            if (a.length === 0) return [init];
            if (formatDate(a[aId].date) === formatDate(c)) {
              a[aId].count += 1; // eslint-disable-line
            } else {
              a.push(init);
              aId += 1;
            }
            return a;
          }, []);

        this.setState({ data, dataTest: d.data });
      })
      .catch(console.log);
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    // console.log(data);
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar csvData={this.state.dataTest} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => (
                  <TableRow hover tabIndex={-1} key={n.date.getTime()}>
                    <TableCell>{formatDate(n.date)}</TableCell>
                    <TableCell>{n.count}</TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => ({});

// const mapDispatchToProps = {
//   updateOrderData,
// };

export default connect(mapStateToProps)(withStyles(styles)(ResultPage));
