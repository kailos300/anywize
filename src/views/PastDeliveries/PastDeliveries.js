import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// Helpers
import { PAST_DELIVERIES_TABLE_COLUMNS } from "constants/ui-constants";
import { getColumns } from "util/table-utils";
import { mapTableData } from "util/helpers";

import Loading from 'components/Shared/loading';

//Actions
import {
    getpastDeliveries,
    selectpastDeliveries,
    selectpastDeliveriesStatus
} from "redux/slices/pastDeliveriesSlice";

const useStyles = makeStyles({
    _container: {
        backgroundColor: "#121212",
        padding: "60px 130px",
        minHeight: "60vh",
        "& .MuiTableCell-head .MuiTableSortLabel-root": {
            position: 'relative',
            marginBottom: '-20px',
        },
        "& .MuiInputBase-input": {
            color: "#F5F5F5",
        },
        "& .MuiInputBase-input:focus + .fas": {
            color: '#c0392b'
        },
        "& .MuiPaper-elevation2": {
            boxShadow: "none",
        },
        "& .MuiTableCell-root": {
            border: "none",
            color: "#F5F5F5",
            fontSize: "12px",
        },
        "& .MuiTableSortLabel-root:hover": {
            color: "#F5F5F5",
        },
        "& .MuiTablePagination-root": {
            border: "none",
            color: "#F5F5F5",
        },
        "& .MuiPaper-root ": {
            backgroundColor: "#121212",
            color: "#F5F5F5 !important",
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
    _filtericon: {
        color: "#525252",
        fontSize: "12px",
    },
});

const PastDeliveries = () => {
    const { t } = useTranslation("common");
    const dispatch = useDispatch();
    const classes = useStyles();
    const loading = useSelector(selectpastDeliveriesStatus);
    const pastdeliveries = useSelector(selectpastDeliveries);

    useEffect(() => {
        if (!pastdeliveries.length) {
            dispatch(getpastDeliveries());
        }
    }, [dispatch, pastdeliveries]);
    if (loading) return <Loading />;
    return (
        <div className={clsx(classes._container, "custom-table-styles")}>
            {/* {console.log(orders, "orders")} */}
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
                    sorting: true,
                    actionsColumnIndex: -1,
                    searchFieldAlignment: "left",
                    showTitle: false,
                    filtering: true,
                    headerStyle: {
                        backgroundColor: "#121212",
                        color: "#F5F5F5",
                        borderBottom: "1px solid #525252",
                        font: "normal normal normal 12px/24px Roboto",
                        fontWeight: "bold",
                    },
                    cellStyle: {
                        backgroundColor: "#121212",
                        color: "#F5F5F5",
                        border: "none",
                        font: "normal normal normal 12px/24px Roboto",
                        padding: "0 16px",
                    },
                    searchFieldStyle: {
                        color: "#F5F5F5",
                    },
                    filterCellStyle: {
                        color: "#F5F5F5",
                    },
                    rowStyle: { height: "38px" },
                }}
            />
        </div>
    )
}
export default PastDeliveries;
