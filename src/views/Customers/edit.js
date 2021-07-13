import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Box, Button, Typography } from '@material-ui/core';
import * as pick from 'lodash/pick';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import { Input, InputOnlyNumbers, Select, Checkbox } from 'components/Shared/mui-formik-inputs'

import { CustomerSchema } from 'constants/validation-schemas';
import { CustomerFormAllowedFields } from 'constants/forms-submit-allowed-fields';

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
const CustomerForm = ({ initialValues, handleAddCustomer, handleEditCustomer, action, tourList }) => {
    const { t } = useTranslation();
    const classes = useStyles();

    const formik = useFormik({
        enableReinitialize: true,
        validateOnChange: false,
        validateOnBlur: true,
        validationSchema: CustomerSchema,
        initialValues: initialValues,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                if (action === 'ADD') {
                    return await handleAddCustomer(pick(values, CustomerFormAllowedFields));
                }
                if (action === 'EDIT') {
                    console.log('working')
                    return await handleEditCustomer(values.id, pick(values, CustomerFormAllowedFields));
                }
            } catch (err) {
                setSubmitting(false);
            }
        },
    });

    const { values, handleBlur, handleChange, setFieldValue, errors, handleSubmit } = formik;

    // const customHandleChange = e => {
    //     const { value } = e.target;
    //     // var zip = unzip(value)
    //     if (zip !== null) {
    //         setFieldValue('zipcode', value);
    //         setFieldValue('city', zip)
    //         setFieldValue('country', 'DE')
    //         return
    //     }
    //     setFieldValue('zipcode', value);
    //     setFieldValue('city', '')
    //     setFieldValue('country', '')
    // }

    return (
        <form onSubmit={handleSubmit} noValidate className={classes._container}>
            <div className={classes._editbox}>
                <Typography className={classes._heading} variant="h4">New Customer</Typography>
                <div>
                    <CloseIcon className={classes._icons} />
                    <SaveIcon className={classes._icons} />
                </div>

            </div>
            <Typography className={classes._subheading} variant="h5">Basic Data</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Input
                        label={'Name'}
                        name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    errors={errors}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Input
                        label={'Number'}
                        name="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                    errors={errors}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Input
                        label={'Alias'}
                        name="Alias"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                    errors={errors}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Input
                        label={'Street'}
                        name="Street"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.number}
                    // errors={errors}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Input
                        label={'House No.'}
                        name="Houseno"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                    errors={errors}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Input
                        label={'Zipcode'}
                        name="zipcode"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.number}
                    // errors={errors}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Input
                        label={'City'}
                        name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                    errors={errors}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Input
                        label={'City'}
                        name="city"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                    errors={errors}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Select
                        label={'Country'}
                        name="country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.salutation}
                        errors={errors}
                        options={['Mr', 'Mrs', 'Ms', 'Dr'].map((o) => ({ label: o, value: o }))}
                    />
                </Grid>
            </Grid>
            <Typography className={classes._subheading} variant="h5">Contact</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Select
                        label={'Salutation'}
                        name="salutation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.salutation}
                        errors={errors}
                        options={['Mr', 'Mrs', 'Ms', 'Dr'].map((o) => ({ label: o, value: o }))}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Input
                        label={'First Name'}
                        name="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                    errors={errors}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Input
                        label={'Last Name'}
                        name="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number}
                    errors={errors}
                    />
                </Grid>


            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Input
                        label={'Phone'}
                        name="phone"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.number}
                    // errors={errors}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Input
                        label={'Mobile'}
                        name="mobile"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.number}
                    // errors={errors}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Input
                        className="font-size-12"
                        label={t('E-Mail-Adress')}
                        type="email"
                        name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    errors={errors}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <span className="font-size-12">Notify when Tour starts</span>
                    <Checkbox
                        // checked={values.notificat/
                        name="notification"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errors={errors}
                    />
                </Grid>
            </Grid>
            <Typography className={classes._subheading} variant="h5">Tour</Typography>
            <Grid style={{ padding: '0 20px' }} container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Select
                        label={t('Tour')}

                        name="tour_id"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.tour_id}
                        errors={errors}
                        options={tourList.map((o) => ({ label: o.id, value: o.id }))}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Input
                        label={t('Position')}
                        name="tour_position"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tour_position}
                    errors={errors}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Select
                        label={t('Deposit agreement')}
                        name="deposit_agreement"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.deposit_agreement}
                        errors={errors}
                        options={['NONE', 'Bring Key', 'KeyBox'].map((o) => ({ label: o, value: o }))}
                    />
                </Grid>
                {values.deposit_agreement == "KeyBox" && <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Input
                        label={t('Keybox Code')}
                        name="keyboxCode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.keyboxCode}
                        errors={errors}
                    />
                </Grid>}
            </Grid>
            <Grid style={{ padding: '0 20px' }} container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Input
                        label={t('Latitude')}
                        name="latitude"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.latitude}
                    // errors={errors}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Input
                        label={t('Longitude')}
                        name="longitude"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.longitude}
                    // errors={errors}
                    />
                </Grid>
            </Grid>
        </form>
    )
}
export default CustomerForm;