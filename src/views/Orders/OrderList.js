import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';

// Helpers
import { ORDERS_TABLE_COLUMNS } from 'constants/ui-constants';
import { getColumns, getActions } from 'util/table-utils';
import { mapTableData } from 'util/helpers';
import { PATHS } from 'util/appConstants';

// Actions
import {
  selectOrders,
  selectOrderStatus,
  getOrders,
  deleteOrder,
  selectOrdersTimestamp,
} from 'redux/slices/orderSlice';
import { setShowMessage } from 'redux/slices/uiSlice';
import { createRoute } from 'redux/slices/routeSlice';

import Loading from 'components/Shared/loading';
import withConfirm from 'components/dialogs/delete';

import pen from '../../assets/img/pen.svg';

const useStyles = makeStyles({
  _container: {
    backgroundColor: '#121212',
    padding: '60px 130px',
    minHeight: '100vh',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '& .MuiPaper-elevation2': {
      boxShadow: 'none',
    },
    '& .MuiTableCell-root:first-child': {
      width: ' 90px !important ',
      boxSizing: 'border-box',
      textAlign: 'center !important'
    },
    '& .MuiTableCell-root:nth-last-child(2)': {
      width: ' 35px !important',
    },
    '& .MuiTableCell-root:nth-last-child(3)': {
      textAlign: 'right',
      verticalAlign: 'bottom',
    },
    '& .MuiTableCell-root': {
      border: 'none',
      color: 'white',
      fontSize: '12px',
      width: 'unset !important'

    },
    // '& .MuiTableCell-root:nth-last-child(2)': {
    //   width: 'unset !important'
    // },
    '& .MuiTableSortLabel-root:hover': {
      color: '#F5F5F5',
    },
    '& .MuiTablePagination-root': {
      border: 'none',
      color: 'white',
    },
    '& .MuiPaper-root ': {
      backgroundColor: '#121212',
      color: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #525252',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottom: '1px solid #525252',
    },
    '& .MuiIconButton-root': {
      color: '#F5F5F5',
    },
    '& .MuiSvgIcon-root': {
      color: '#F5F5F5',
    },
    '& .MuiTypography-root': {
      color: '#F5F5F5',
    },
    '& .MuiTableCell-paddingNone:last-child div': {
      marginRight: '30px'
    },
  },
  _1F1F1F: {
    background: '#1F1F1F',
  },
  _525252: {
    background: '#525252',
  },
  _textalignright: {
    // textAlign: 'right',

  },
  _row1: {
    width: '160px !important'
  },
  _row2: {
    width: '150px !important',
  },
  _edit: {
    background: '#6F9CEB ',
    borderRadius: '50%',
    padding: '2px',
    width: '13px',
    height: '13px',
    position: 'relative',
    top: "-7px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    float: 'right', marginRight: 'unset !important',
  },
  _pointer: {
    cursor: 'pointer'
  },
  _width111: '111px',
  _panel: {
    "& .MuiTableCell-root:nth-child(2)": {
      width: '160px !important'

    },
    "& .MuiTableCell-root:nth-child(3)": {
      width: '150px !important'

    },
  }
});

const tableTitle = 'ORDERS';

const OrderList = ({ confirm }) => {
  const tableRef = useRef();
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const loading = useSelector(selectOrderStatus);
  const orders = useSelector(selectOrders);
  const timestamp = useSelector(selectOrdersTimestamp);
  const [jsonData, setjsonData] = useState(orders);

  const fetchOrders = async () => {
    await dispatch(getOrders());
  };

  useEffect(() => {
    if (!orders.length && !loading && !timestamp) {
      fetchOrders();
    }

    setjsonData(orders);
  }, [orders, loading]);

  const callbackOnDelete = (e, order) => {
    e.stopPropagation();
    confirm(() => dispatch(deleteOrder(order.id)), {
      description: "Are you sure?",
    });
  };

  const actions = getActions(
    tableTitle,
    (e, rowData) => callbackOnDelete(e, rowData),
    () => addHandler(),
    (e, rowData) => editHandler(rowData),
    () => startTourCheck(),
    () => startTour(),
    t
  );
  const addHandler = () => {
    history.push(PATHS.orders.add);
  };
  const editHandler = (rowData) => {
    history.push(PATHS.orders.edit.replace(':id', rowData.id));
  };

  const checkChangeHandler = (e, clickedRow) => {
    e.stopPropagation();

    const newData = tableRef.current.state.data.map((row) => {
      if (row.id !== clickedRow.id) {
        return {
          ...row,
        };
      }

      return {
        ...row,
        mainCheck: e.target.checked,
        orders: row.orders.map((o) => ({
          ...o,
          checked: e.target.checked,
        })),
      };
    });

    setjsonData(newData)
  };

  const startTourCheck = () => {
    return !!jsonData.find((row) => {
      return row.orders.some((o) => o.checked);
    });
  };

  const startTour = async () => {
    if (!startTourCheck()) {
      return;
    }

    const rows = jsonData.filter((row) => {
      return row.orders.some((o) => o.checked);
    });

    confirm(async () => {
      let i = 0;

      while (i < rows.length) {
        await dispatch(createRoute({
          order_ids: rows[i].orders.filter((o) => o.checked).map((o) => o.id),
          tour_id: rows[i].Tour.id,
        }));

        i += 1;
      }

      dispatch(setShowMessage({
        description: 'The routes where created successfully',
        type: 'success',
      }));

      fetchOrders();
    }, {
      description: `${t('Create Route(s) for the selected Orders from')} {{num}} ${t('Tours')}?`, num: rows.length,
    });
  };

  const innerChangeHandler = (order) => {
    // when an order is selected we go over the rows
    // each row being a Tour that groups orders
    const newData = tableRef.current.state.data.map((row) => {
      // if the row (Tour) is not the same as the Order's
      // we keep it as is
      if (row.Tour.id !== order.Customer.Tour.id) {
        return {
          ...row,
        };
      }

      // if the row (Tour) is the same as the Order we clicked
      // we go over it's Orders. Changing the status of the clicked, leaving the
      // rest as they were
      return {
        ...row,
        orders: row.orders.map((o) => ({
          ...o,
          checked: o.id === order.id ? !o.checked : o.checked,
        })),
      };
    });

    setjsonData(newData);
  };

  if (loading) {
    return <Loading />
  };

  return (
    <div className={clsx(classes._container, 'order-table')}>
      <MaterialTable
        tableRef={tableRef}
        data={mapTableData(jsonData)}
        title={t(tableTitle)}
        columns={getColumns(ORDERS_TABLE_COLUMNS((e, rowData) => checkChangeHandler(e, rowData)), t)}
        actions={actions}
        options={{
          detailPanelColumnAlignment: 'right',
          paging: false,
          actionsColumnIndex: -1,
          search: false,
          headerStyle: {
            backgroundColor: '#121212',
            color: 'white',
            borderBottom: '1px solid #525252',
            font: 'normal normal normal 12px/24px Roboto',
            fontWeight: 'bold',
          },
          cellStyle: {
            color: 'white',
            border: 'none',
            font: 'normal normal normal 12px/24px Roboto',
          },
          showTitle: false,
          header: false,
          showTextRowsSelected: false,
          showSelectAllCheckbox: false,
          rowStyle: rowData => {
            if (rowData.tableData.id % 2 === 0) {
              return { backgroundColor: ' #1F1F1F ', height: '71px' };
            }
            else {
              return { backgroundColor: '#525252', height: '71px' };
            }
          }
        }}
        detailPanel={[
          {
            icon: () => <ExpandMoreIcon />,
            openIcon: () => <ExpandLessIcon />,
            render: rowData => {
              return (
                <>
                  {rowData.orders.map((order, i) =>
                    <TableContainer className={clsx(rowData.tableData.id % 2 === 0 ? classes._1F1F1F : classes._525252, classes._panel)} key={i}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className={classes._textalignright}>
                              {' '}
                            </TableCell>
                            <TableCell className={clsx(classes._textalignright, classes._row1)}>
                              {order.Customer.name}
                            </TableCell>
                            <TableCell className={clsx(classes._textalignright, classes._row2)}>
                              {order.number}
                            </TableCell>
                            <TableCell className={classes._textalignright}>
                              {order.description}
                            </TableCell>
                            <TableCell className={classes._textalignright}>
                              {/* <EditIcon onClick={() => editHandler(order)} className={clsx(classes._edit, classes._pointer)} /> */}
                              <div onClick={() => editHandler(order)} className={clsx(classes._edit, classes._pointer)}>
                                <img src={pen} style={{ height: '10px' }} />
                              </div>
                            </TableCell>
                            <TableCell style={{}} className={classes._textalignright}>
                              <div style={{ textAlign: 'right', marginRight: '8px', marginTop: '-20px' }}>
                                <input
                                  onChange={(e) => {
                                    e.stopPropagation();

                                    innerChangeHandler(order);
                                  }}
                                  className={'radio-checkbox'}
                                  id={`panel${order.id}`}
                                  type="checkbox"
                                  name="field"
                                  checked={!!order.checked} />
                                <label htmlFor={`panel${order.id}`}><span><span></span></span></label>
                              </div>
                            </TableCell>
                            <TableCell className={clsx(classes._textalignright, classes._width111)}>
                              <DeleteSharpIcon className={classes._pointer} style={{ marginRight: '20px', color: '#ADADAD' }} onClick={(e) => callbackOnDelete(e, order)} />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer >
                  )
                  }
                </>

              )
            }

          }
        ]}
      />

    </div>
    // </>
  )
}


export default withConfirm(OrderList);
