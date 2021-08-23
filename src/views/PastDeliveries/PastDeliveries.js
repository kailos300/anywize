import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MaterialTable from 'material-table';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import MapIcon from '@material-ui/icons/Map';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { PAST_DELIVERIES_TABLE_COLUMNS } from 'constants/ui-constants';
import { getColumns } from 'util/table-utils';
import { mapTableData } from 'util/helpers';
import { PATHS } from 'util/appConstants';

import Loading from 'components/Shared/loading';

import {
  getpastDeliveries,
  selectpastDeliveries,
  selectpastDeliveriesStatus
} from 'redux/slices/pastDeliveriesSlice';

const useStyles = makeStyles({
  _container: {
    backgroundColor: "#121212",
    padding: "60px 130px",
    minHeight: "60vh",
    "& .MuiInputBase-root": {
      color: "#F5F5F5",

    },
    "& .MuiPaper-elevation2": {
      boxShadow: "none",
    },
    "& .MuiTableCell-root": {
      border: "none",
      color: "white",
      fontSize: "12px",
      width: "unset !important"
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
    "& .MuiIconButton-root *.MuiSvgIcon-root , .MuiIconButton-root": {
      color: "#F5F5F5",
    },
    "& .MuiTableCell-alignLeft *.MuiSvgIcon-root": {
      color: "#ADADAD",
      width: '22px',
      height: '22px',
      cursor: 'pointer',
    },
    "& .MuiTypography-root": {
      color: "#F5F5F5",
    },
  },
  orderRow: {
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: '#1F1F1F',
    },
  }
});

const PastDeliveries = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const loading = useSelector(selectpastDeliveriesStatus);
  const pastdeliveries = useSelector(selectpastDeliveries);

  const fetch = async () => {
    await dispatch(getpastDeliveries({ from: '2021-08-01', to: '2021-08-31' }));
  };

  useEffect(() => {
    if (!loading) {
      fetch();
    }
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className={clsx(classes._container)}>
      <MaterialTable
        icons={{
          Filter: () => (
            <i className={clsx(classes._filtericon, "fas fa-filter")}></i>
          ),
        }}
        columns={getColumns(PAST_DELIVERIES_TABLE_COLUMNS, t)}
        data={mapTableData(pastdeliveries)}
        options={{
          paging: false,
          sorting: false,
          actionsColumnIndex: -1,
          showTitle: false,
          filtering: true,
          search: false,
          detailPanelColumnAlignment: 'right',
          headerStyle: {
            backgroundColor: "#121212",
            color: "#F5F5F5",
            borderBottom: "1px solid #525252",
            font: "normal normal normal 12px/24px Roboto",
            fontWeight: "bold",
          },
          cellStyle: {
            color: "white",
            border: "none",
            font: "normal normal normal 12px/24px Roboto",
            padding: "0 16px",
          },
          rowStyle: rowData => {
            if (rowData.tableData.id % 2 === 0) {
              return { backgroundColor: '#1F1F1F' };
            }

            return { backgroundColor: '#525252' };
          }
        }}
        detailPanel={[
          {
            icon: () => <ExpandMoreIcon />,
            openIcon: () => <ExpandLessIcon />,
            render: rowData => {
              return (
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: rowData.tableData.id % 2 !== 0 ? '#1F1F1F' : '#525252' }}>
                      <TableCell>{t('Route')}</TableCell>
                      <TableCell>{t('Date')}</TableCell>
                      <TableCell>{t('Time')}</TableCell>
                      <TableCell>{t('Number')}</TableCell>
                      <TableCell>{t('Description')}</TableCell>
                      <TableCell>{t('Met customer')}</TableCell>
                      <TableCell>{t('Actions')}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      rowData.Orders.map((order, i) => (
                        <TableRow
                          key={i}
                          onClick={() => window.open(`${PATHS.tours.map}/${order.Route.id}/${rowData.id}`, '_blank')}
                          className={classes.orderRow}
                        >
                          <TableCell>{order.Route.uuid}</TableCell>
                          <TableCell>{moment(order.delivered_at).format('DD.MM.YYYY')}</TableCell>
                          <TableCell>{moment(order.delivered_at).format('HH:mm')}</TableCell>
                          <TableCell>{order.number}</TableCell>
                          <TableCell>{order.description}</TableCell>
                          <TableCell>{order.Route?.Stops[0]?.meet_customer ? t('Yes') : t('No')}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();

                                return window.open(`${PATHS.tours.map}/${order.Route.id}/${rowData.id}`, '_blank');
                              }}
                              color="primary"
                            >
                              <MapIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              );
            }
          }
        ]}
      />
    </div>
  )
}
export default PastDeliveries;
