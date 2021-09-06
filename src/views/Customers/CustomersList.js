import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// Helpers
import { CUSTOMERS_TABLE_COLUMNS } from "constants/ui-constants";
import { getColumns, getActions, getLocalization } from "util/table-utils";
import { mapTableData } from "util/helpers";
import { PATHS } from "util/appConstants";

// Actions
import {
  selectCustomers,
  selectCustomerStatus,
  getCustomers,
  deleteCustomer,
} from "redux/slices/customerSlice";

import withConfirm from "components/dialogs/delete";
import Loading from 'components/Shared/loading';

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
    "& .MuiTableSortLabel-active": {
      color: "#F5F5F5 ",
      "& .MuiTableSortLabel-icon": {
        color: "#F5F5F5 !important",

      },
    },
    "& .MuiTableSortLabel-icon": {
      color: "#F5F5F5 !important",

    },
    "& .MuiPaper-elevation2": {
      boxShadow: "none",
    },
    "& .MuiTableCell-root": {
      border: "none",
      color: "white",
      fontSize: "12px",
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
  _filtericon: {
    color: "#525252",
    fontSize: "12px",
  },
});
const tableTitle = "CUSTOMERS";

const CustomersList = ({ confirm }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const loading = useSelector(selectCustomerStatus);
  const customers = useSelector(selectCustomers);

  useEffect(() => {
    if (!customers.length && !loading) {
      dispatch(getCustomers());
    }
  }, [dispatch, customers]);

  const callbackOnDelete = (e, rowData) => {
    e.stopPropagation();
    confirm(() => dispatch(deleteCustomer(rowData.id)), {
      description: "Are you sure?",
    });
  };

  const actions = getActions(
    tableTitle,
    (e, rowData) => callbackOnDelete(e, rowData),
    () => history.push(PATHS.customers.add), null, null, null, t
  );

  if (loading) {
    return <Loading />
  }

  return (
    <div className={clsx(classes._container, "custom-table-styles")}>
      <MaterialTable
        icons={{
          Filter: () => (
            <i className={clsx(classes._filtericon, "fas fa-filter")}></i>
          ),
        }}
        style={{ display: "flex", flexDirection: "column" }}
        data={mapTableData(customers)}
        title={t(tableTitle)}
        columns={getColumns(CUSTOMERS_TABLE_COLUMNS, t)}
        onRowClick={(e, rowData) =>
          history.push(PATHS.customers.detail.replace(":id", rowData.id))
        }
        actions={actions}
        localization={getLocalization(t)}
        options={{
          pageSize: 50,
          pageSizeOptions: [50, 100],
          actionsColumnIndex: -1,
          searchFieldAlignment: "left",
          showTitle: false,
          filtering: true,
          headerStyle: {
            backgroundColor: "#121212",
            color: "white",
            borderBottom: "1px solid #525252",
            font: "normal normal normal 12px/24px Roboto",
            fontWeight: "bold",
          },
          cellStyle: {
            backgroundColor: "#121212",
            color: "white",
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
  );
};

export default withConfirm(CustomersList);
