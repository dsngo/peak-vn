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
import { SERVER_SETTING } from '../ultis';
import { updateOrderData } from '../redux/actionCreators';
import { FormControl } from 'material-ui/Form'

const columnData = [
  {
    id: 'orderDate',
    numeric: false,
    disablePadding: false,
    sortable: false,
    label: 'Order Date',
  },
  {
    id: 'orderId',
    numeric: false,
    disablePadding: false,
    sortable: true,
    label: 'Order Number',
  },
  {
    id: 'orderName',
    numeric: false,
    disablePadding: false,
    sortable: false,
    label: 'Client Name',
  },
  {
    id: 'orderAddress',
    numeric: false,
    disablePadding: false,
    sortable: false,
    label: 'Shipping Address',
  },
  {
    id: 'orderPhone',
    numeric: false,
    disablePadding: false,
    sortable: false,
    label: 'Phone Number',
  },
  {
    id: 'orderTotalPrice',
    numeric: true,
    disablePadding: false,
    sortable: true,
    label: 'Price',
  },
  {
    id: 'orderPaymentType',
    numeric: false,
    disablePadding: false,
    sortable: true,
    label: 'Payment',
  },
  {
    id: 'orderStatus',
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
    updateOrderData: Function,
  };
  state = {
    order: 'asc',
    orderBy: 'orderId',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    isDialogOpen: false,
    dialogData: {},
    isSaving: false, // check if the server is savign data, and prevent any type of change. make sure it is a uniprocess
  };
  componentDidMount() {
    const { protocol, url, port } = SERVER_SETTING;
    fetch(`${protocol}${url}:${port}/peak-vn/ecsite/order`)
      .then(rs => rs.json())
      .then(d => {
        this.setState({ data: d.data.sort((a, b) => a.orderId - b.orderId) });
      })
      .catch(console.log);
  }
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
  handleChangeStatus = (id, objectId) => async event => {
    this.setState(pS => ({
      ...pS,
      isSaving: true,
      data: pS.data.map(
        e => (e.orderId === id ? { ...e, orderStatus: event.target.value } : e)
      ),
    }));
    await this.props.updateOrderData(objectId, {
      orderStatus: event.target.value,
    });
    this.setState({ isSaving: false });
  };
  handleFindStatus = id =>
    id ? this.state.data.find(e => e.orderId === id).orderStatus : '';
  renderDialog = () => {
    const { dialogData, isDialogOpen } = this.state;
    return (
      <Dialog
        open={isDialogOpen}
        keepMounted
        onClose={() => this.handleOpenDialog(false)}
        style={{ float: 'right' }}
      >
        <DialogTitle>{`Order Number: #${dialogData.orderId} - ${
          dialogData.orderName
        }`}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogData.orderTotalPrice}</DialogContentText>
          <FormControl disabled={this.state.isSaving}>
            <Select
              value={this.handleFindStatus(dialogData.orderId)}
              onChange={this.handleChangeStatus(
                dialogData.orderId,
                dialogData._id
              )}
            >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Finished">Finished</MenuItem>
          </Select>
          </FormControl>
          {dialogData.orderItems &&
            dialogData.orderItems.map(e => (
              <div key={e.itemId}>
                <img style={{ width: 60 }} src={e.itemImg} alt="" />
                {`${e.itemId} - ${e.itemCode} - qty:${e.itemQuantity}`}
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
    console.log(this.state.isSaving);
    return (
      <Paper className={classes.root}>
        <Button onClick={this.test}> test</Button>
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
                  const isSelected = this.isSelected(n.orderId);
                  return (
                    <TableRow
                      hover
                      onClick={() => this.handleOpenDialog(true, n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.orderId}
                      selected={isSelected}
                    >
                      <TableCell>{n.orderDate}</TableCell>
                      <TableCell>{n.orderId}</TableCell>
                      <TableCell>{n.orderName}</TableCell>
                      <TableCell>{n.orderAddress}</TableCell>
                      <TableCell>{n.orderPhone}</TableCell>
                      <TableCell numeric>{n.orderTotalPrice}</TableCell>
                      <TableCell>{n.orderPaymentType}</TableCell>
                      <TableCell>{n.orderStatus}</TableCell>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  updateOrderData,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(UserControl)
);
