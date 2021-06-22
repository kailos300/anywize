import React from 'react'
import { Grid, Box, Paper, Button } from '@material-ui/core';
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
      {console.log(values, "initialValues")}
      <Box boxShadow={'3'} p={2}>
        <Grid container >
          <Grid>
            <h2>{values.name}</h2>
          </Grid>
        </Grid>
      </Box>
      <Box boxShadow={3} mt={2} p={2}>
        <Grid>
          <form>
            <Input
              label={t('Tour Name')}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              errors={errors}
            />
            <Input
              label={t('Remark')}
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              errors={errors}
            />
          </form>
          <Button type='submit' color="primary" variant="contained">{t(`${action}`) + ' ' + t('Tour')}</Button>
        </Grid>
      </Box>
    </form>
  )
}
TourForm.propTypes = {
  initialValues: PropTypes.shape({}),
  handleAddTour: PropTypes.func,
  // handleEditCompany: PropTypes.func,
};
export default TourForm;