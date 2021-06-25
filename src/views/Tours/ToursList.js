import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Paper, Button ,Typography} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

// Helpers
import { TOURS_TABLE_COLUMNS } from 'constants/ui-constants';
import { getColumns, getActions } from 'util/table-utils';
import { mapTableData } from 'util/helpers';
import { PATHS } from 'util/appConstants';

// Actions
import {
    selectTours,
    selectTourStatus,
    getTours,
    deleteTour,
} from 'redux/slices/tourSlice';
import { selectUser } from 'redux/slices/userSlice';

// Components
import withConfirm from 'components/dialogs/delete';

const tableTitle = 'TOURS';

const ToursList = ({ confirm }) => {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const history = useHistory();
    const loading = useSelector(selectTourStatus);
    const tours = useSelector(selectTours);
    const user = useSelector(selectUser);

    const [selected, setSelected] = useState([]);

    const fetchTours = useCallback(async () => {
        return await dispatch(getTours());
    }, [dispatch, tours]);

    useEffect(() => {
        if (!tours.length) {
            fetchTours();
        }
    }, [tours]);

    const callbackOnDelete = (e, rowData) => {
        e.stopPropagation();
        confirm(
            () => dispatch(deleteTour(rowData.id)),
            {
                description: 'Are you sure?',
            },
        );
    };

    const actions = getActions(
        tableTitle,
        (e, rowData) => callbackOnDelete(e, rowData),
    );
    const addTourHandler = () => {
        history.push(PATHS.tours.add)
    }
    if (loading) return <div className="loading">Loading..</div>;
    return (
        <>
            <Paper style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }} elevation={3} >
                <Typography className="font-size-34" variant='h4'>{t('Tours')}</Typography>
                <Button onClick={addTourHandler} color="primary" variant="contained" className="Primary-btn">Add Tour</Button>
            </Paper>
            <div className={'custom-table-styles'}>
                <MaterialTable
                    data={mapTableData(tours)}
                    title={t(tableTitle)}
                    columns={getColumns(TOURS_TABLE_COLUMNS, t)}
                    onRowClick={(e, rowData) => history.push(
                        PATHS.tours.edit.replace(':id', rowData.id),
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
export default withConfirm(ToursList);