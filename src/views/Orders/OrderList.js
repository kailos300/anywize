import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from '@material-ui/core/TableCell';
import EditIcon from "@material-ui/icons/Edit";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from "@material-ui/icons/Delete";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import clsx from "clsx";

// Helpers
import { ORDERS_TABLE_COLUMNS } from "constants/ui-constants";
import { getColumns, getActions } from "util/table-utils";
import { mapTableData } from "util/helpers";
import { PATHS } from "util/appConstants";
import jsondata from './data.json'

// Actions
import {
  selectOrders,
  selectOrderStatus,
  getOrders,
  deleteOrder,
} from "redux/slices/orderSlice";

// Components
import withConfirm from "components/dialogs/delete";

const useStyles = makeStyles({
  _container: {
    backgroundColor: "#121212",
    padding: "60px 130px",
    minHeight: "100vh",
    "&::-webkit-scrollbar": {
      display: 'none'
    },
    "& .MuiPaper-elevation2": {
      boxShadow: "none",
    },
    "& .MuiTableCell-root:first-child": {
      width: ' 90px ',
      textAlign: 'center'
    },
    "& .MuiTableCell-root": {
      border: "none",
      color: "white",
      fontSize: "12px",
      // width: "unset !important"
    },
    "& .MuiTableSortLabel-root:hover": {
      color: "#F5F5F5",
    },
    "& .MuiTablePagination-root": {
      border: "none",
      color: "white",
    },
    "& .MuiPaper-root ": {
      backgroundColor: "#121212",
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #525252",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottom: "1px solid #525252",
    },
    "& .MuiIconButton-root": {
      color: "#F5F5F5",
    },
    "& .MuiSvgIcon-root": {
      color: "#F5F5F5",
    },
    "& .MuiTypography-root": {
      color: "#F5F5F5",
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
  _edit: {
    background: '#6F9CEB',
    borderRadius: '50%',
    padding: '2px',
    width: '13px',
    height: '13px',
  },
  _pointer: {
    cursor: 'pointer'
  },
  _width111: '111px',
});

const tableTitle = "ORDERS";

const OrderList = ({ confirm }) => {
  const tableRef = useRef();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const loading = useSelector(selectOrderStatus);
  const orders = useSelector(selectOrders);
  const [jsonData, setjsonData] = useState(orders)

  useEffect(() => {
    if (!orders.length && !loading) {
      dispatch(getOrders());
    }
    setjsonData(orders)
  }, [dispatch, orders, loading])

  const callbackOnDelete = (e, rowData) => {
    e.stopPropagation();
    confirm(() => dispatch(deleteOrder(rowData.id)), {
      description: "Are you sure?",
    });
  };

  const actions = getActions(
    tableTitle,
    (e, rowData) => callbackOnDelete(e, rowData),
    () => addHandler(),
    (e, rowData) => editHandler(rowData),
    () => startTour()
  );
  const addHandler = () => {
    history.push(PATHS.orders.add);
  };
  const editHandler = (rowData) => {
    history.push(PATHS.customers.edit.replace(':id', rowData.customer_id))
  }

  const checkChangeHandler = (e, rowData) => {
    let newData = tableRef.current.state.data;
    newData.map((x, index) => {
      if (x.id !== rowData.id) {
        x.list = x.list.map((subItem, subIndex) => {
          return {
            ...subItem,
            checked: false
          };
        });

        x.mainCheck = false
        return x;
      }
      x.mainCheck = e.target.checked
      x.list = x.list.map((subItem, subIndex) => {
        return {
          ...subItem,
          checked: e.target.checked
        };
      });

      return x;
    })
    setjsonData(newData)
  }
  const startTour = () => {
    let newData = jsonData;
    let check = newData.some((i) => i.mainCheck == true)
    return check;
  }
  const innerChangeHandler = (e, data, rowData) => {
    console.log(e, data, rowData)
    let newData = tableRef.current.state.data;
    newData.map((x, index) => {
      if (x.id !== rowData.id) {
        x.mainCheck = false
        x.list = x.list.map((subItem, subIndex) => {
          return {
            ...subItem,
            checked: false
          };
        });

        return x;
      }
      x.list = x.list.map((subItem, subIndex) => {
        if (subItem.id !== data.id) {
          return {
            ...subItem,
          };
        }
        return {
          ...subItem,
          checked: e.target.checked
        };
      });

      x.mainCheck = x.list.some((i) => i.checked == true)
      return x;
    })
    setjsonData(newData)
  }
  if (loading) return <div className={clsx(classes._container, '')}><div className="loading">Loading..</div></div>;
  return (
    <div className={clsx(classes._container, 'order-table')}>
      {console.log(orders, " console.log(orders)")}
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
            if (rowData.tableData.id % 2 == 0) {
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
                  {rowData.list.map((data) =>
                    <TableContainer className={clsx(rowData.tableData.id % 2 == 0 ? classes._1F1F1F : classes._525252)}>
                      <Table>
                        <TableRow>
                          <TableCell className={classes._textalignright}>
                            {' '}
                          </TableCell>
                          <TableCell className={classes._textalignright}>
                            {data.Customer.name}
                          </TableCell>
                          <TableCell className={classes._textalignright}>
                            {data.number}
                          </TableCell>
                          <TableCell className={classes._textalignright}>
                            {'orderdate'}
                          </TableCell>
                          <TableCell className={classes._textalignright}>
                            {data.description}
                          </TableCell>
                          <TableCell className={classes._textalignright}>
                            <EditIcon onClick={() => editHandler(data)} className={clsx(classes._edit, classes._pointer)} />
                          </TableCell>
                          <TableCell style={{ paddingRight: '30px' }} className={classes._textalignright}>
                            <div style={{ textAlign: 'right' }}>
                              <input
                                onChange={(e) => { innerChangeHandler(e, data, rowData) }}
                                className={'radio-checkbox'}
                                id={`panel${data.id}`}
                                type="checkbox"
                                name="field"
                                checked={data.checked} />
                              <label for={`panel${data.id}`}><span><span></span></span></label>
                            </div>
                          </TableCell>
                          <TableCell className={clsx(classes._textalignright, classes._width111)}>
                            <DeleteIcon className={classes._pointer} />
                          </TableCell>
                        </TableRow>
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
