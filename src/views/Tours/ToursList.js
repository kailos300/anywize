import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Paper, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import clsx from 'clsx';

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

const useStyles = makeStyles({
    _container: {
        backgroundColor: '#121212',
        padding: '60px 130px',
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
            color:'#F5F5F5'
        },
        "& .MuiSvgIcon-root": {
            color:'#F5F5F5'
        },
        "& .MuiTypography-root": {
            color:'#F5F5F5'
        }


    },
    _filtericon: {
        color: '#525252',
        fontSize: '12px'
    }

})

const tableTitle = 'TOURS';

const ToursList = ({ confirm }) => {
    const { t } = useTranslation('common');
    const classes = useStyles();
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
        () => addHandler()

    );
    const addHandler = () => {
        history.push(PATHS.tours.add)
    }
    if (loading) return <div className="loading">Loading..</div>;
    return (
        <>
            {/* <Paper style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }} elevation={3} >
                <Typography className="font-size-34" variant='h4'>{t('Tours')}</Typography>
                <Button onClick={addTourHandler} color="primary" variant="contained" className="Primary-btn">Add Tour</Button>
            </Paper> */}
            <div className={clsx(classes._container, 'custom-table-styles')}>
                <MaterialTable
                    icons={{ Filter: () => <i className={clsx(classes._filtericon, "fas fa-filter")}></i> }}
                    style={{ display: 'flex', flexDirection: 'column', }}
                    data={mapTableData(tours)}
                    title={t(tableTitle)}
                    columns={getColumns(TOURS_TABLE_COLUMNS, t)}
                    onRowClick={(e, rowData) => history.push(
                        PATHS.tours.detail.replace(':id', rowData.id),
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
                            borderBottom: '1px solid #525252',
                            font: 'normal normal normal 12px/24px Roboto'
                        },
                        cellStyle: {
                            backgroundColor: '#121212',
                            color: 'white',
                            border: 'none',
                            font: 'normal normal normal 12px/24px Roboto',
                        },
                        searchFieldStyle: {
                            color: '#F5F5F5'
                        },
                        filterCellStyle: {
                            color: '#F5F5F5'
                        }
                    }}
                    onSelectionChange={rows => setSelected([...rows])}
                />
            </div>
        </>
    )
}
export default withConfirm(ToursList);