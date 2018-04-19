import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from 'material-ui/styles/colorManipulator';
import { fakeOrders } from '../data';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

let counter = 0;
function createData(order, name, address, phone, totalPrice, paymentType) {
  counter += 1;
  return { id: counter, order, name, address, phone, totalPrice, paymentType };
}
function formatDate(date) {
  const dateOptions = {
    formatMatcher: 'basic',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  };
  return new Date(date).toLocaleString('vi-VN', dateOptions)
}

const dataColumn = fakeOrders.map((e, i) => ({
  id: i + 1,
  date: formatDate(e.date),
  order: Date.parse(e.date).toString(36),
  name: e.name,
  address: e.address,
  phone: e.phone,
  totalPrice: e.orderItems.reduce((a, n) => a + n.price * n.quantity, 0),
  paymentType: e.paymentType,
  status: 'Pending',
  orderItems: e.orderItems,
}));

const columnData = [
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    sortable: false,
    label: 'Order Date',
  },
  {
    id: 'order',
    numeric: false,
    disablePadding: false,
    sortable: true,
    label: 'Order Number',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    sortable: false,
    label: 'Client Name',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    sortable: false,
    label: 'Shipping Address',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: false,
    sortable: false,
    label: 'Phone Number',
  },
  {
    id: 'totalPrice',
    numeric: true,
    disablePadding: false,
    sortable: true,
    label: 'Price',
  },
  {
    id: 'paymentType',
    numeric: false,
    disablePadding: false,
    sortable: true,
    label: 'Payment',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    sortable: true,
    label: 'Status',
  },
];

class EnhancedTableHead extends Component {
  createSortHandler = (property, sortable) => event => {
    if (sortable) this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map(
            column => (
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
            ),
            this
          )}
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

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title">Order Details</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

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

class UserControl extends Component {
  props: {
    classes: Object,
  };
  state = {
    order: 'asc',
    orderBy: 'order',
    selected: [],
    data: dataColumn.sort((a, b) => (a.order < b.order ? -1 : 1)),
    page: 0,
    rowsPerPage: 5,
    isDialogOpen: false,
    dialogData: {},
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;

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

  // handleSelectAllClick = (event, checked) => {
  //   if (checked) {
  //     this.setState({ selected: this.state.data.map(n => n.id) });
  //     return;
  //   }
  //   this.setState({ selected: [] });
  // };

  // handleClick = (event, id) => {
  //   const { selected } = this.state;
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   this.setState({ selected: newSelected });
  // };

  handleOpenDialog = (isOpen, data) => {
    this.setState({ isDialogOpen: isOpen });
    if (data) this.setState({ dialogData: data });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleChangeStatus = id => event => {
    this.setState(pS => ({
      ...pS,
      data: pS.data.map(
        e => (e.order === id ? { ...e, status: event.target.value } : e)
      ),
    }));
  };
  handleFindStatus = id =>
    id ? this.state.data.find(e => e.order === id).status : '';
  renderDialog = () => {
    const { dialogData, isDialogOpen } = this.state;
    return (
      <Dialog
        open={isDialogOpen}
        keepMounted
        onClose={() => this.handleOpenDialog(false)}
        style={{ float: 'right' }}
      >
        <DialogTitle>{`Order Number: #${dialogData.order} - ${
          dialogData.name
        }`}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogData.totalPrice}</DialogContentText>
          <Select
            value={this.handleFindStatus(dialogData.order)}
            onChange={this.handleChangeStatus(dialogData.order)}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Finished">Finished</MenuItem>
          </Select>
          {dialogData.orderItems &&
            dialogData.orderItems.map(e => (
              <div key={e.itemId}>
                <img style={{ width: 60 }} src={e.image} alt="" />
                {`${e.itemId} - ${e.itemCode} - qty:${e.quantity}`}
              </div>
            ))}
        </DialogContent>
      </Dialog>
    );
  };
  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={() => this.handleOpenDialog(true, n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell>{n.date}</TableCell>
                      <TableCell>{n.order}</TableCell>
                      <TableCell>{n.name}</TableCell>
                      <TableCell>{n.address}</TableCell>
                      <TableCell>{n.phone}</TableCell>
                      <TableCell numeric>{n.totalPrice}</TableCell>
                      <TableCell>{n.paymentType}</TableCell>
                      <TableCell>{n.status}</TableCell>
                    </TableRow>
                  );
                })}
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
        {this.renderDialog()}
      </Paper>
    );
  }
}

export default connect()(withStyles(styles)(UserControl));
