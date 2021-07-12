import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Paper, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
// Helpers
import { CUSTOMERS_TABLE_COLUMNS } from 'constants/ui-constants';
import { getColumns, getActions } from 'util/table-utils';
import { mapTableData } from 'util/helpers';
import { PATHS } from 'util/appConstants';

// Actions
import {
    selectCustomers,
    selectCustomerStatus,
    getCustomers,
    deleteCustomer,
} from 'redux/slices/customerSlice';
import { selectUser } from 'redux/slices/userSlice';

// Components
import withConfirm from 'components/dialogs/delete';
import img from '../../assets/img/3.svg'
const useStyles = makeStyles({
    _container: {
        backgroundColor: '#121212',
        padding: '60px 130px',
        "& .MuiPaper-elevation2": {
            boxShadow: "none"
        },
        "& .MuiTableCell-root":{
            border:'none',
            color:'white'
        },
        "& .MuiTablePagination-root":{
            border:'none',
            color:'white'

        },
        "& .MuiPaper-root ": {
            backgroundColor: '#121212',
            color:'white'


        },
        _actions: {
            color: "blue"
          }
    
    },

})
const tableTitle = 'CUSTOMERS';

const CustomersList = ({ confirm }) => {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const loading = useSelector(selectCustomerStatus);
    const customers = useSelector(selectCustomers);
    const user = useSelector(selectUser);

    const [selected, setSelected] = useState([]);

    const fetchCustomers = useCallback(async () => {
        return await dispatch(getCustomers());
    }, [dispatch, customers]);

    useEffect(() => {
        if (!customers.length) {
            fetchCustomers();
        }
    }, [customers]);

    const callbackOnDelete = (e, rowData) => {
        e.stopPropagation();
        confirm(
            () => dispatch(deleteCustomer(rowData.id)),
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
        history.push(PATHS.customers.add)
    }
    if (loading) return <div className="loading">Loading..</div>;
    return (

        <div className={clsx(classes._container,'custom-table-styles')}>
            {/* <Paper style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }} elevation={3} >
                <Typography className="font-size-34" variant='h4'>{t('Customers')}</Typography>
                <Button className="Primary-btn" onClick={addCustomerHandler}  color="primary" variant="contained">Add Customer</Button>
            </Paper> */}
            {/* <div className={'custom-table-styles'}> */}
            <MaterialTable
                icons={{ Filter: () => <i className="fas fa-filter"></i> }}
                style={{ display: 'flex', flexDirection: 'column', }}
                data={mapTableData(customers)}
                title={t(tableTitle)}
                columns={getColumns(CUSTOMERS_TABLE_COLUMNS, t)}
                onRowClick={(e, rowData) => history.push(
                    PATHS.customers.detail.replace(':id', rowData.id),
                )}
                actions={actions}
                options={{
                    actionsColumnIndex: -1,
                    searchFieldAlignment: "left",
                    showTitle: false,
                    filtering: true,
                    headerStyle: {
                        backgroundColor: '#121212',
                        color: 'white',
                        border: 'none'
                    },
                    cellStyle: {
                        backgroundColor: '#121212',
                        color: 'white',
                        border: 'none'
                    },
                }}
                onSelectionChange={rows => setSelected([...rows])}
                classes={{
                    actions:classes._actions
                }}
            />
        </div>
    )

}

export default withConfirm(CustomersList);
