import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import * as pick from 'lodash/pick';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";
import countries from 'iso-3166-country-list';
import SaveSharpIcon from '@material-ui/icons/SaveSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import { useHistory, useParams } from 'react-router-dom';
import { Input, Select, Checkbox, Autocomplete } from 'components/Shared/mui-formik-inputs';
import { CustomerSchema } from 'constants/validation-schemas';
import { CustomerFormAllowedFields } from 'constants/forms-submit-allowed-fields';
import { PATHS } from 'util/appConstants';
import SelectGeoCoordinates from 'components/Customers/SelectGeoCoordinates';
import { getNextPosition } from 'redux/slices/tourSlice';

const unzip = require('zip-to-city');

const useStyles = makeStyles({
  _container: {
    backgroundColor: '#F5F5F5',
    padding: '60px 130px',
    minHeight: '100vh',
    "& .MuiFormLabel-root.Mui-focused": {
      color: '#6F9CEB'
    },
    "& .MuiInput-underline:after": {
      borderBottom: '2px solid #6F9CEB'
    }

  },
  _editbox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  _heading: {
    font: 'normal normal normal 28px/40px Questrial',
    color: '#121212',
  },
  _icons: {
    color: '#ADADAD',
    cursor: 'pointer',
    transition: "all 0.3s ease-in-out",
    margin: '0 16px 0 0px',
    fontSize: '35px'
  },
  _save: {
    "&:hover": {
      transform: "scale(1.3)",
      color: "#6F9CEB",
    },
    "&:hover + span": {
      display: 'block',
    }
  },
  _close: {
    "&:hover": {
      transform: "scale(1.3)",
      color: "#525252",
    },
    "&:hover + span": {
      display: 'block',
    }
  },
  _subheading: {
    font: 'normal normal 500 22px/32px Roboto',
    color: ' #121212',
    marginTop: '44px',
    marginBottom: '40px',
  },
  _dflex: {
    display: "flex",
    alignItems: "center",
  },
  _edittext: {
    // width: '24px',
    height: '16px',
    font: 'normal normal normal 14px / 20px Roboto',
    padding: '4px 8px'
  },
  _cancel: {
    color: '#525252',
    font: ' normal normal normal 14px/20px Roboto',
    display: 'none',
    position: 'absolute',
    marginLeft: '-55px',
    transition: "all 0.3s ease-in-out",
  },
  _savetext: {
    color: "#6F9CEB",
    font: ' normal normal normal 14px/20px Roboto',
    display: 'none',
    position: 'absolute',
    marginLeft: '35px',
    transition: "all 0.3s ease-in-out",
  }
});
const CustomerForm = ({
  initialValues,
  onSubmit,
  action,
  tourList,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: CustomerSchema,
    initialValues: {
      number: '',
      contact_salutation: '',
      contact_name: '',
      contact_surname: '',
      email_notifications: false,
      tour: '',
      position: '',
      deposit_agreement: '',
      keybox_code: '',
      tour_id: '', // required
      tour_position: '', // required
      name: '', // required
      alias: '', // required
      street: '', // required
      street_number: '', // required
      city: '', // required
      zipcode: '', // required
      country: '', // required
      email: '', // required
      phone: '', // required
      latitude: '', // required
      longitude: '', // required
      ...initialValues,
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(pick(values, CustomerFormAllowedFields));
      } catch (err) {
        setSubmitting(false);
      }
    },
  });

  const {
    values,
    handleChange,
    setFieldValue,
    errors,
    handleSubmit,
    submitCount,
  } = formik;
  let { handleBlur } = formik;

  if (!submitCount) {
    handleBlur = null;
  }

  const customHandleChange = (e) => {
    const { value } = e.target;
    var zip = unzip(value);
    if (zip !== null) {
      setFieldValue("zipcode", value);
      setFieldValue("city", zip);
      setFieldValue("country", "DE");
      return;
    }
    setFieldValue("zipcode", value);
    setFieldValue("city", '');
    setFieldValue("country", '');
  };

  const closeCustomerHandler = () => {
    action === "ADD"
      ? history.push(PATHS.customers.root)
      : history.push(PATHS.customers.detail.replace(":id", id));
  };

  const handleTourChange = async (id) => {
    const position = await dispatch(getNextPosition(id));

    if (position) {
      setFieldValue('tour_position', position);
    }
  };

  return (
    <div className={classes._container}>
      <div className={classes._editbox}>
        <Typography className={classes._heading} variant="h4">
          {action === "ADD" ? t("New Customer") : t("Edit Customer")}
        </Typography>
        <div className={classes._dflex}>
          <div className={classes._dflex}>

            <CloseSharpIcon
              onClick={closeCustomerHandler}
              className={clsx(classes._icons, classes._close)}
            />
            <Typography component="span" className={clsx(classes._edittext, classes._cancel, 'edittag')}>{t('Cancel')}</Typography>
          </div>
          <div className={classes._dflex}>

            <SaveSharpIcon onClick={handleSubmit} className={clsx(classes._icons, classes._save)} />
            <Typography component="span" className={clsx(classes._edittext, classes._savetext, 'edittag')}>{t('Save')}</Typography>
          </div>

        </div>
      </div>
      <Typography className={classes._subheading} variant="h5">
        {t("Basic Data")}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Input
            label={t("Name")}
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
            label={t("Number")}
            name="number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.number}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Input
            label={t("Alias")}
            name="alias"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.alias}
            errors={errors}
            required
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Input
            label={t("Street")}
            name="street"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.street}
            errors={errors}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Input
            label={t("House No.")}
            name="street_number"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.street_number}
            errors={errors}
            required
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Input
            label={t("Zipcode")}
            name="zipcode"
            onChange={customHandleChange}
            value={values.zipcode}
            errors={errors}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Input
            label={t("City")}
            name="city"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
            errors={errors}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Autocomplete
            onBlur={handleBlur}
            name="country"
            label="Country"
            errors={errors}
            value={values.country}
            settings={{
              disableClearable: true,
              valueProp: 'code',
              labelProp: 'name',
            }}
            onChange={(selected) => {
              setFieldValue('country', selected.code);
            }}
            options={countries}
            required
          />
        </Grid>
      </Grid>
      <Typography className={classes._subheading} variant="h5">
        {t("Contact")}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Select
            label={t("Salutation")}
            name="contact_salutation"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.contact_salutation}
            errors={errors}
            options={["Mr", "Ms", "Dr"].map((o) => ({
              label: t(o),
              value: o,
            }))}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Input
            label={t("First Name")}
            name="contact_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.contact_name}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Input
            label={t("Last Name")}
            name="contact_surname"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.contact_surname}
            errors={errors}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Input
            label={t("Phone")}
            name="phone"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.phone}
            errors={errors}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Input
            label={t("E-Mail")}
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            errors={errors}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <br />
          <Checkbox
            checked={values.email_notifications}
            value={values.email_notifications}
            name="email_notifications"
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            style={{ color: '#6F9CEB' }}
          />
          <Typography component="span" className="font-size-12">
            {t("Notify when Tour starts")}
          </Typography>
        </Grid>
      </Grid>
      <Typography className={classes._subheading} variant="h5">
        {t("Tour")}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Select
            label={t("Tour")}
            name="tour_id"
            onChange={(e) => {
              const { value } = e.target;

              handleTourChange(value);

              return handleChange(e);
            }}
            onBlur={handleBlur}
            value={values.tour_id}
            errors={errors}
            options={tourList.map((o) => ({ label: o.name, value: o.id }))}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Input
            label={t("Position")}
            name="tour_position"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.tour_position}
            errors={errors}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Select
            label={t("Deposit agreement")}
            name="deposit_agreement"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.deposit_agreement}
            errors={errors}
            options={[
              { value: "NONE", label: t("None") },
              { value: "BRING_KEY", label: t("Bring Key") },
              { value: "KEY_BOX", label: t("KeyBox") },
            ].map((o) => ({ label: o.label, value: o.value }))}
            required
          />
        </Grid>
        {values.deposit_agreement === "KEY_BOX" && (
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Input
              label={t("Keybox Code")}
              name="keybox_code"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.keybox_code}
              errors={errors}
              required={values.deposit_agreement === 'KEY_BOX'}
            />
          </Grid>
        )}
      </Grid>

      <Typography className={classes._subheading} variant="h5">
        {t('Geolocation')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Input
            label={t("Latitude")}
            name="latitude"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.latitude}
            errors={errors}
            disabled
            required
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Input
            label={t("Longitude")}
            name="longitude"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.longitude}
            errors={errors}
            disabled
            required
          />
        </Grid>
        <Grid item xs={12}>
          <SelectGeoCoordinates
            onChange={({ latitude, longitude }) => {
              setFieldValue('latitude', latitude);
              setFieldValue('longitude', longitude);
            }}
            latitude={values.latitude || 52.52321191756548}
            longitude={values.longitude || 13.405897492100648}
            initialInputValue={
              values.id ? `${values.street} ${values.street_number}, ${values.city}, ${values.country}` : ''
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default CustomerForm;
