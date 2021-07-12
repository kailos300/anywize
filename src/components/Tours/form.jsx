import React from 'react'
import { Grid, Box, Paper, Button, Typography } from '@material-ui/core';
import * as pick from 'lodash/pick';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useParams  } from 'react-router-dom';

import { storage } from 'util/storage';
import { Input } from '../Shared/mui-formik-inputs';
import { TourSchema } from 'constants/validation-schemas';
import { TourFormAllowedFields } from 'constants/forms-submit-allowed-fields';
import { PATHS } from 'util/appConstants';



const useStyles = makeStyles({
  _container: {
      backgroundColor: '#F5F5F5',
      padding: '60px 130px',
      minHeight: '100vh'
  },
  _editbox: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  _heading: {
      font: 'normal normal normal 28px/40px Questrial',
      color: '#121212'
  },
  _icons: {
      color: '#ADADAD',
      width: '22px',
      height: '22px',
      cursor: 'pointer',
      paddingRight: '16px'
  },
  _subheading: {
      font: 'normal normal 500 22px/32px Roboto',
      color: ' #121212',
      marginTop: '44px',
  }


})

const TourForm = ({ initialValues, handleAddTour, handleEditTour, action }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
    const { id } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: TourSchema,
    initialValues: initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (action === 'ADD') {
          return await handleAddTour(pick(values, TourFormAllowedFields));
        }
        if (action === 'EDIT') {
          return await handleEditTour(values.id, pick(values, TourFormAllowedFields));
        }
      } catch (err) {
        setSubmitting(false);
      }
    },
  });
  const { values, handleBlur, handleChange, setFieldValue, errors, handleSubmit } = formik;

  const closeTourHandler = () => {
    action=='ADD'? history.push(PATHS.tours.root):
    history.push(PATHS.customers.detail.replace(':id', id))
}
  return (
    <div className={classes._container} >
      <div className={classes._editbox}>
        <Typography className={classes._heading} variant="h4">{action=="ADD" ?'New Tour':'Edit Tour'}</Typography>
        <div>
          <CloseIcon onClick={closeTourHandler} className={classes._icons} />
          <SaveIcon onClick={handleSubmit} className={classes._icons} />
        </div>

      </div>
 <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Input
            label={t('Tour Name')}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Input
            label={t('Remark')}
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            errors={errors}
          />
        </Grid>
      </Grid>
    </div>
  )
}
TourForm.propTypes = {
  initialValues: PropTypes.shape({}),
  handleAddTour: PropTypes.func,
  // handleEditCompany: PropTypes.func,
};
export default TourForm;