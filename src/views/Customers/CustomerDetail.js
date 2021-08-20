import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { PATHS, DEPOSIT_AGREEMENTS } from "util/appConstants";
import Loading from 'components/Shared/loading';
// Actions
import {
  selectCustomer,
  selectCustomerStatus,
  getCustomer,
} from "redux/slices/customerSlice";

const useStyles = makeStyles({
  _container: {
    backgroundColor: "#121212",
    padding: "60px 130px",
    minHeight: "100vh",
  },
  _heading: {
    color: "#F5F5F5",
    font: "normal normal normal 28px/40px Questrial",
  },
  _edit: {
    color: "#6F9CEB",
    width: "22px",
    height: "22px",
    cursor: "pointer",
    margin: '0 16px',
  },
  _editbox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  _infoheading: {
    color: "#F5F5F5",
    font: "normal normal medium 22px/32px Roboto",
    marginTop: "44px",
  },
  _head: {
    color: "#F5F5F5",
    opacity: "0.6",
    font: "normal normal normal 12px/24px Roboto",
    marginRight: "32px",
  },
  _basicdetailhead: {
    display: "flex",
    marginTop: "41px",
  },
  _basicdetail: {
    display: "flex",
  },
  _detail: {
    color: "#F5F5F5",
    marginRight: "32px",
    font: "normal normal normal 18px/24px Roboto",
  },
  _name: {
    // width: '228px',s
    letterSpacing: "0px",
  },
  _width11: {
    // width: '11px'
  },
  _margintop80: {
    marginTop: "80px",
  },
  _adressbox: {
    marginTop: "24px",
  },
});

const CustomerDetail = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const loading = useSelector(selectCustomerStatus);
  const customer = useSelector(selectCustomer);

  useEffect(() => {
    if (id) {
      dispatch(getCustomer(id));
    }
  }, [dispatch, id]);

  const editCustomerHandler = () => {
    history.push(PATHS.customers.edit.replace(":id", id));
  };
  if (loading || !customer) return <Loading />;
  return (
    <div className={classes._container}>
      <div className={classes._editbox}>
        <Typography className={classes._heading} variant="h4">
          {customer.alias || customer.name}
        </Typography>
        <EditIcon onClick={editCustomerHandler} className={classes._edit} />
      </div>
      <Typography className={classes._infoheading} variant="h5">
        {t("Basic Data")}
      </Typography>
      <div className={classes._basicdetailhead}>
        <div>
          <Typography
            className={clsx(classes._head, classes._width11)}
            variant="h6"
          >
            {t("ID")}
          </Typography>
          <Typography
            className={clsx(classes._detail, classes._width11)}
            variant="h6"
          >
            {customer.id}
          </Typography>
        </div>
        <div>
          <Typography
            className={clsx(classes._head, classes._name)}
            variant="h6"
          >
            {t("Name")}
          </Typography>
          <Typography
            className={clsx(classes._name, classes._detail)}
            variant="h6"
          >
            {customer.name}
          </Typography>
        </div>
        <div>
          <Typography className={classes._head} variant="h6">
            {t("Alias")}
          </Typography>
          <Typography className={classes._detail} variant="h6">
            {customer.alias}
          </Typography>
        </div>
      </div>
      {/** */}
      <div className={classes._basicdetailhead}>
        <div>
          <Typography
            className={clsx(classes._head, classes._width11)}
            variant="h6"
          >
            {t("Street")}
          </Typography>
          <Typography
            className={clsx(classes._detail, classes._width11)}
            variant="h6"
          >
            {customer.street}
          </Typography>
        </div>
        <div>
          <Typography
            className={clsx(classes._head, classes._name)}
            variant="h6"
          >
            {t("House No.")}
          </Typography>
          <Typography
            className={clsx(classes._name, classes._detail)}
            variant="h6"
          >
            {customer.street_number}
          </Typography>
        </div>
        <div>
          <Typography className={classes._head} variant="h6">
            {t("Zipcode")}
          </Typography>
          <Typography className={classes._detail} variant="h6">
            {customer.zipcode}
          </Typography>
        </div>
        <div>
          <Typography className={classes._head} variant="h6">
            {t("City")}
          </Typography>
          <Typography className={classes._detail} variant="h6">
            {customer.city}
          </Typography>
        </div>
        <div>
          <Typography className={classes._head} variant="h6">
            {t("Country")}
          </Typography>
          <Typography className={classes._detail} variant="h6">
            {customer.country}
          </Typography>
        </div>
        <div>
          <Typography className={classes._head} variant="h6">
            {t("Geolocation")}
          </Typography>
          <Typography className={classes._detail} variant="h6">
            {customer.latitude}, {customer.longitude}
          </Typography>
        </div>
      </div>
      {/** */}
      <Typography
        className={clsx(classes._infoheading, classes._margintop80)}
        variant="h5"
      >
        {t("Contact")}
      </Typography>
      <div className={classes._basicdetailhead}>
        <div>
          <Typography className={clsx(classes._head)} variant="h6">
            {t("Salutation")}
          </Typography>
          <Typography className={clsx(classes._detail)} variant="h6">
            {t('Mr.')}
          </Typography>
        </div>
        <div>
          <Typography
            className={clsx(classes._head, classes._name)}
            variant="h6"
          >
            {t("First Name")}
          </Typography>
          <Typography
            className={clsx(classes._name, classes._detail)}
            variant="h6"
          >
            Mark
          </Typography>
        </div>
        <div>
          <Typography className={classes._head} variant="h6">
            {t("Last Name")}
          </Typography>
          <Typography className={classes._detail} variant="h6">
            Meyer
          </Typography>
        </div>
      </div>
      {/*** */}
      <div className={classes._basicdetailhead}>
        <div>
          <Typography className={clsx(classes._head)} variant="h6">
            {t("Phone")}
          </Typography>
          <Typography className={clsx(classes._detail)} variant="h6">
            {customer.phone || "–"}
          </Typography>
        </div>
      </div>
      {/*** */}

      <div div className={classes._basicdetailhead}>
        <div>
          <Typography className={clsx(classes._head)} variant="h6">
            {t("E-Mail")}
          </Typography>
          <Typography className={clsx(classes._detail)} variant="h6">
            {customer.email}
          </Typography>
        </div>
        <div>
          <Typography className={clsx(classes._head)} variant="h6">
            {t("Notify")}
          </Typography>
          <Typography className={clsx(classes._detail)} variant="h6">
            {customer.email_notifications ? t("Yes") : t("No")}
          </Typography>
        </div>
      </div>
      {/*** */}

      <Typography
        className={clsx(classes._infoheading, classes._margintop80)}
        variant="h5"
      >
        {t("Tour")}
      </Typography>
      <div className={classes._basicdetailhead}>
        <div>
          <Typography className={clsx(classes._head)} variant="h6">
            {t("ID")}
          </Typography>
          <Typography className={clsx(classes._detail)} variant="h6">
            {customer.tour_id}
          </Typography>
        </div>
        <div>
          <Typography
            className={clsx(classes._head, classes._name)}
            variant="h6"
          >
            {t("Name")}
          </Typography>
          <Typography
            className={clsx(classes._name, classes._detail)}
            variant="h6"
          >
            {customer.Tour.name}
          </Typography>
        </div>
        <div>
          <Typography className={classes._head} variant="h6">
            {t("Position")}
          </Typography>
          <Typography className={classes._detail} variant="h6">
            {customer.tour_position}
          </Typography>
        </div>
      </div>
      {/*** */}

      <div className={classes._basicdetailhead}>
        <div>
          <Typography className={clsx(classes._head)} variant="h6">
            {t("Deposit agreement")}
          </Typography>
          <Typography className={clsx(classes._detail)} variant="h6">
            {DEPOSIT_AGREEMENTS[customer.deposit_agreement]}
          </Typography>
        </div>
        {customer.deposit_agreement === "KEY_BOX" && (
          <div>
            <Typography className={clsx(classes._head)} variant="h6">
              {t("Code")}
            </Typography>
            <Typography className={clsx(classes._detail)} variant="h6">
              {customer.keybox_code}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetail;
