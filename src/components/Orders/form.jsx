import React from "react";
import { Grid, Typography } from "@material-ui/core";
import * as pick from "lodash/pick";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { Input, InputOnlyNumbers, Autocomplete } from "../Shared/mui-formik-inputs";
import { OrderSchema } from "constants/validation-schemas";
import { OrderFormAllowedFields } from "constants/forms-submit-allowed-fields";
import { PATHS } from "util/appConstants";

const useStyles = makeStyles({
  _container: {
    backgroundColor: "#F5F5F5",
    padding: "60px 130px",
    minHeight: "100vh",
  },
  _editbox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  _heading: {
    font: "normal normal normal 28px/40px Questrial",
    color: "#121212",
  },
  _icons: {
    color: "#ADADAD",
    width: "22px",
    height: "22px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    margin: '0 16px 0 0px',
  },
  _save: {
    "&:hover": {
      transform: "scale(1.3)",
      color: "#6F9CEB",
    },
  },
  _close: {
    "&:hover": {
      transform: "scale(1.3)",
      color: "#525252",
    },
  },
  _subheading: {
    font: "normal normal 500 22px/32px Roboto",
    color: " #121212",
    marginTop: "44px",
  },
});
const OrderForm = ({
  initialValues,
  onSubmit,
  action,
  customerList,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: OrderSchema,
    initialValues: {
      customer_id: '',
      description: '',
      number: '',
      ...initialValues,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        onSubmit(pick(values, OrderFormAllowedFields));
      } catch (err) {
        setSubmitting(false);
      }
    },
  });
  const { values, handleChange, errors, handleSubmit, setFieldValue, submitCount } = formik;
  let { handleBlur } = formik;

  if (!submitCount) {
    handleBlur = null;
  }

  const closeOrderHandler = () => {
    // action == 'ADD' ?
    history.push(PATHS.orders.root);
    // :
    // history.push(PATHS.customers.detail.replace(':id', id))
  };
  return (
    <div className={classes._container}>
      <div className={classes._editbox}>
        <Typography className={classes._heading} variant="h4">
          {action === "ADD" ? t("New Order") : t("Edit Order")}
        </Typography>
        <div>
          <CloseIcon onClick={closeOrderHandler} className={clsx(classes._icons, classes._close)} />
          <SaveIcon onClick={handleSubmit} className={clsx(classes._icons, classes._save)} />
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Autocomplete
            onBlur={handleBlur}
            name="customer_id"
            label="Customer"
            errors={errors}
            value={values.customer_id}
            settings={{
              disableClearable: true,
              valueProp: 'id',
              labelProp: 'alias',
            }}
            onChange={(selected) => {
              setFieldValue('customer_id', selected.id);
            }}
            options={customerList}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Input
            label={t("Description")}
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            errors={errors}
            required

          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <InputOnlyNumbers
            label={t("Number")}
            name="number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.number}
            errors={errors}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default OrderForm;
