import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// Helpers
import { TOURS_TABLE_COLUMNS } from "constants/ui-constants";
import { getColumns, getActions } from "util/table-utils";
import { mapTableData } from "util/helpers";
import { PATHS } from "util/appConstants";

// Actions
import {
  selectTours,
  selectTourStatus,
  getTours,
  deleteTour,
} from "redux/slices/tourSlice";

// Components
import withConfirm from "components/dialogs/delete";

const useStyles = makeStyles({
  _container: {
    backgroundColor: "#121212",
    padding: "60px 130px",
    minHeight: "100vh",
    "& .MuiInputBase-input:active": {
      color: "#F5F5F5",

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

const tableTitle = "TOURS";

const ToursList = ({ confirm }) => {
  const { t } = useTranslation("common");
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectTourStatus);
  const tours = useSelector(selectTours);

  useEffect(() => {
    if (!tours.length) {
      dispatch(getTours());
    }
  }, [dispatch, tours]);

  const callbackOnDelete = (e, rowData) => {
    e.stopPropagation();
    confirm(() => dispatch(deleteTour(rowData.id)), {
      description: "Are you sure?",
    });
  };

  const actions = getActions(
    tableTitle,
    (e, rowData) => callbackOnDelete(e, rowData),
    () => addHandler()
  );
  const addHandler = () => {
    history.push(PATHS.tours.add);
  };
  if (loading) return <div className={clsx(classes._container, '')}><div className="loading">Loading..</div></div>;
  return (
    <>
      {/* <Paper style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }} elevation={3} >
                <Typography className="font-size-34" variant='h4'>{t('Tours')}</Typography>
                <Button onClick={addTourHandler} color="primary" variant="contained" className="Primary-btn">Add Tour</Button>
            </Paper> */}
      <div className={clsx(classes._container, "custom-table-styles")}>
        <MaterialTable
          icons={{
            Filter: () => (
              <i className={clsx(classes._filtericon, "fas fa-filter")}></i>
            ),
          }}
          style={{ display: "flex", flexDirection: "column" }}
          data={mapTableData(tours)}
          title={t(tableTitle)}
          columns={getColumns(TOURS_TABLE_COLUMNS, t)}
          onRowClick={(e, rowData) =>
            history.push(PATHS.tours.detail.replace(":id", rowData.id))
          }
          actions={actions}
          options={{
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
    </>
  );
};
export default withConfirm(ToursList);
