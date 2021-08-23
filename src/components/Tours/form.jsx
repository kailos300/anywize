import React from "react";
import { Grid, Typography } from "@material-ui/core";
import * as pick from "lodash/pick";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import SaveSharpIcon from '@material-ui/icons/SaveSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { useHistory, useParams } from "react-router-dom";
import clsx from "clsx";
import { Input } from "../Shared/mui-formik-inputs";
import { TourSchema } from "constants/validation-schemas";
import { TourFormAllowedFields } from "constants/forms-submit-allowed-fields";
import { PATHS } from "util/appConstants";

const useStyles = makeStyles({
  _container: {
    backgroundColor: "#F5F5F5",
    padding: "60px 130px",
    minHeight: "100vh",
    "& .MuiFormLabel-root.Mui-focused": {
      color: '#6F9CEB'
    },
    "& .MuiInput-underline:after": {
      borderBottom: '2px solid #6F9CEB'
    }
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
    fontSize: '35px',
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    margin: '0 16px 0 0px',
  },
  _dflex: {
    display: "flex",
    alignItems: "center",
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

const TourForm = ({ initialValues, onSubmit, action }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: TourSchema,
    initialValues: {
      name: '',
      description: '',
      transport_agent_id: 1,
      active: true,
      ...initialValues,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(pick(values, TourFormAllowedFields));
      } catch (err) {
        setSubmitting(false);
      }
    },
  });
  const { values, handleChange, errors, handleSubmit, submitCount } = formik;
  let { handleBlur } = formik;

  if (!submitCount) {
    handleBlur = null;
  }

  const closeTourHandler = () => {
    action === "ADD"
      ? history.push(PATHS.tours.root)
      : history.push(PATHS.tours.detail.replace(":id", id));
  };

  return (
    <div className={classes._container}>
      <div className={classes._editbox}>
        <Typography className={classes._heading} variant="h4">
          {action === "ADD" ? t("New Tour") : t("Edit Tour")}
        </Typography>
        <div className={classes._dflex}>
          <div className={classes._dflex}>
            <CloseSharpIcon
              onClick={closeTourHandler}
              title="close"
              className={clsx(classes._icons, classes._close)}
            />
          </div>
          <div className={classes._dflex}>
            <SaveSharpIcon
              onClick={handleSubmit}
              className={clsx(classes._icons, classes._save)}
            />
          </div>
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Input
            label={t("Tour Name")}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            errors={errors}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Input
            label={t("Remark")}
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            errors={errors}
          />
        </Grid>
      </Grid>
    </div>
  );
};
TourForm.propTypes = {
  initialValues: PropTypes.shape({}),
  handleAddTour: PropTypes.func,
  // handleEditCompany: PropTypes.func,
};
export default TourForm;
