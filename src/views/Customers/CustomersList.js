import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Paper, Button,Typography } from '@material-ui/core';

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

const tableTitle = 'CUSTOMERS';

const CustomersList = ({ confirm }) => {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const history = useHistory();
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
        console.log(e, rowData)
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
    );
    const addCustomerHandler = () => {
        history.push(PATHS.customers.add)
    }
    if (loading) return <div className="loading">Loading..</div>;
    return (
        <>
            <Paper style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }} elevation={3} >
                <Typography className="font-size-34" variant='h4'>{t('Customers')}</Typography>
                <Button className="Primary-btn" onClick={addCustomerHandler}  color="primary" variant="contained">Add Customer</Button>
            </Paper>
            <div className={'custom-table-styles'}>
                <MaterialTable
                    data={mapTableData(customers)}
                    title={t(tableTitle)}
                    columns={getColumns(CUSTOMERS_TABLE_COLUMNS, t)}
                    onRowClick={(e, rowData) => history.push(
                        PATHS.customers.edit.replace(':id', rowData.id),
                    )}
                    actions={actions}
                    options={{
                        paging: false,
                        maxBodyHeight: '85vh',
                        minBodyHeight: '85vh',
                        actionsColumnIndex: -1,
                        searchFieldAlignment: "left",
                        showTitle: false,
                    }}
                    onSelectionChange={rows => setSelected([...rows])}
                />
            </div>
        </>
    )

}

export default withConfirm(CustomersList);
