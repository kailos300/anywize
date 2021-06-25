import React from 'react'
import { Grid, Box, Paper, Button, Typography } from '@material-ui/core';
import * as pick from 'lodash/pick';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';


import { storage } from 'util/storage';
import { Input } from '../Shared/mui-formik-inputs';
import { TourSchema } from 'constants/validation-schemas';
import { TourFormAllowedFields } from 'constants/forms-submit-allowed-fields';

const TourForm = ({ initialValues, handleAddTour, handleEditTour, action }) => {
  const { t } = useTranslation();

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
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Box style={{ background: 'white' }} boxShadow={'1'} p={2}>
        <Grid container >
          <Grid>
            <Typography className="font-size-34" variant='h4'>{values.name}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box boxShadow={1} mx={3} my={4} style={{ background: 'white' }} >
        <Typography className="font-size-21" variant='h5' style={{ borderBottom: '1px solid #CBD5DD', padding: '20px' }}>{t('Basic Data')}</Typography>
        <Grid style={{ padding: '20px' }} container spacing={2}>
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
      </Box>
          <Button type='submit' className="Primary-btn margin-20" color="primary" variant="contained">{t(`${action}`) + ' ' + t('Tour')}</Button>
    </form>
  )
}
TourForm.propTypes = {
  initialValues: PropTypes.shape({}),
  handleAddTour: PropTypes.func,
  // handleEditCompany: PropTypes.func,
};
export default TourForm;