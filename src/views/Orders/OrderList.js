import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Paper, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
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
} from 'redux/slices/orderSlice';
import { selectUser } from 'redux/slices/userSlice';

// Components
import withConfirm from 'components/dialogs/delete';
const useStyles = makeStyles({
    _container: {
        backgroundColor: '#121212',
        padding: '60px 130px',
        minHeight: '100vh',
        "& .MuiPaper-elevation2": {
            boxShadow: "none"
        },
        "& .MuiTableCell-root": {
            border: 'none',
            color: 'white',
            fontSize: '12px',
        },
        "& .MuiTableSortLabel-root:hover": {
            color: '#F5F5F5'
        },
        "& .MuiTablePagination-root": {
            border: 'none',
            color: 'white'

        },
        "& .MuiPaper-root ": {
            backgroundColor: '#121212',
            color: 'white'


        },
        "& .MuiInput-underline:before": {
            borderBottom: '1px solid #525252'
        },
        "& .MuiInput-underline:hover:before": {
            borderBottom: '1px solid #525252'
        },
        "& .MuiIconButton-root": {
            color: '#F5F5F5'
        },
        "& .MuiSvgIcon-root": {
            color: '#F5F5F5'
        },
        "& .MuiTypography-root": {
            color: '#F5F5F5'
        }

    }
})
const tableTitle = 'CUSTOMERS';
const OrderList = ({ confirm }) => {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const loading = useSelector(selectOrderStatus);
    const orders = useSelector(selectOrders);
    const user = useSelector(selectUser);

    const [selected, setSelected] = useState([]);

    const fetchOrders = useCallback(async () => {
        return await dispatch(getOrders());
    }, [dispatch, orders]);

    useEffect(() => {
        console.log(orders)
        if (!orders.length && !loading) {
            fetchOrders();
        }
    }, [orders]);

    const callbackOnDelete = (e, rowData) => {
        console.log(e, rowData)
        e.stopPropagation();
        confirm(
            () => dispatch(deleteOrder(rowData.id)),
            {
                description: 'Are you sure?',
            },
        );
    };
    const actions = getActions(
        tableTitle,
        (e, rowData) => callbackOnDelete(e, rowData),
        () => addHandler()
    );
    const addHandler = () => {
        history.push(PATHS.orders.add)
    }
    if (loading) return <div className="loading">Loading..</div>;
    return (
        // <>
        //     <Paper style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }} elevation={3} >
        //         <Typography className="font-size-34" variant='h4'>{t('Orders')}</Typography>
        //         <Button className="Primary-btn" onClick={addOrderHandler} color="primary" variant="contained">Add Order</Button>
        //     </Paper>
        <div className={clsx(classes._container, 'custom-table-styles order-table-styles')}>
            <MaterialTable
                data={mapTableData(orders)}
                title={t(tableTitle)}
                columns={getColumns(ORDERS_TABLE_COLUMNS, t)}
                // onRowClick={(e, rowData) => history.push(
                //     PATHS.orders.edit.replace(':id', rowData.id),
                // )}
                actions={actions}
                // parentChildData={(row, rows) => rows.find(a => a.supplier_id === row.customer_id)}
                options={{
                    paging: false,
                    // maxBodyHeight: '85vh',
                    // minBodyHeight: '85vh',
                    actionsColumnIndex: -1,
                    // searchFieldAlignment: "left",
                    search: false,
                    headerStyle: {
                        backgroundColor: '#121212',
                        color: 'white',
                        borderBottom: '1px solid #525252',
                        font: 'normal normal normal 12px/24px Roboto',
                        fontWeight: 'bold',
                    },
                    cellStyle: {
                        backgroundColor: '#121212',
                        color: 'white',
                        border: 'none',
                        font: 'normal normal normal 12px/24px Roboto',
                        padding: '0 16px'
                    },
                    showTitle: false,
                    header: false,
                    rowStyle: { height: '71px' },
                    selection: true,
                    showTextRowsSelected: false,
                    showSelectAllCheckbox: false,
                }}
                onTreeExpandChange={console.log('expanded')}
                // onSelectionChange={rows => setSelected([...rows])}
              detailPanel={[
    {
      tooltip: 'Show Name',
      render: rowData => {
        return (
          <div
            style={{
              fontSize: 100,
              textAlign: 'center',
              color: 'white',
              backgroundColor: '#43A047',
            }}
          >
            {rowData.id}
          </div>
        )
      },
    },
    {
      icon: 'account_circle',
      tooltip: 'Show Surname',
      render: rowData => {
        return (
          <div
            style={{
              fontSize: 100,
              textAlign: 'center',
              color: 'white',
              backgroundColor: '#E53935',
            }}
          >
            {rowData.customer_id}
          </div>
        )
      },
    },
    {
      icon: 'favorite_border',
      openIcon: 'favorite',
      tooltip: 'Show Both',
      render: rowData => {
        return (
          <div
            style={{
              fontSize: 100,
              textAlign: 'center',
              color: 'white',
              backgroundColor: '#FDD835',
            }}
          >
            {rowData.id} {rowData.supplier_id}
          </div>
        )
      },
    },
  ]}
            />
        </div>
        // </>
    )
}
export default withConfirm(OrderList);
