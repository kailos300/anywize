import React from 'react'
import { Grid, Box, Paper, Button, Typography } from '@material-ui/core';
import * as pick from 'lodash/pick';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';

import { storage } from 'util/storage';
import { Input, InputOnlyNumbers, Select } from '../Shared/mui-formik-inputs';
import { OrderSchema } from 'constants/validation-schemas';
import { OrderFormAllowedFields } from 'constants/forms-submit-allowed-fields';

const OrderForm = ({ initialValues, handleAddOrder, handleEditOrder, action ,customerList }) => {
    const { t } = useTranslation();

    const formik = useFormik({
        enableReinitialize: true,
        validateOnChange: false,
        validateOnBlur: true,
        validationSchema: OrderSchema,
        initialValues: initialValues,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                if (action === 'ADD') {
                    console.log(values,"values")
                    return await handleAddOrder(pick(values, OrderFormAllowedFields));
                }
                if (action === 'EDIT') {
                    return await handleEditOrder(values.id, pick(values, OrderFormAllowedFields));
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
                        <Typography className="font-size-34" variant='h4'>{'Orders'}</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box boxShadow={1} mx={3} my={4} style={{ background: 'white' }} >
                <Typography className="font-size-21" variant='h5' style={{ borderBottom: '1px solid #CBD5DD', padding: '20px' }}>{t('Basic Data')}</Typography>
                <Grid style={{ padding: '20px' }} container spacing={2} className="align-items-end">
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Select
                            label={t('Customer')}
                            name="customer_id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.customer_id}
                            errors={errors}
                            options={customerList.map((o) => ({ label: o.id, value: o.id }))}
                        />
                    </Grid>
                    {console.log(customerList)}
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Input
                            label={t('Description')}
                            name="description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            errors={errors}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <InputOnlyNumbers
                            label={t('Number')}
                            name="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.number}
                            errors={errors}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Button type='submit' className="Primary-btn margin-20" color="primary" variant="contained">{t(`${action}`) + ' ' + t('Order')}</Button>
        </form>
    )
}
export default OrderForm;