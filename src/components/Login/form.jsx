import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Input, Password } from '../Shared/mui-formik-inputs';

const LoginForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Invalid email').required('Required'),
      password: yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await onSubmit(values);
      } catch (err) {
        console.log(err);
      }
      setSubmitting(false);
    },
  });

  const { handleSubmit, errors, values, handleChange, handleBlur, isValid } = formik;

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Input
        label={t('Email')}
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        errors={errors}
      />
      <Password
        label={t('Password')}
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        errors={errors}
      />
      <Box py={2}>
        <Button
          variant="contained"
          fullWidth
          type="submit"
          color="secondary"
          disabled={!isValid}
        >
          {t('Log in')}
        </Button>
      </Box>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
