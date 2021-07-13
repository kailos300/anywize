import React from 'react'
import { Grid, Box, Paper, Button, Typography } from '@material-ui/core';
import * as pick from 'lodash/pick';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useParams } from 'react-router-dom';

import { storage } from 'util/storage';
import { Input, InputOnlyNumbers, Select } from '../Shared/mui-formik-inputs';
import { OrderSchema } from 'constants/validation-schemas';
import { OrderFormAllowedFields } from 'constants/forms-submit-allowed-fields';
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
const OrderForm = ({ initialValues, handleAddOrder, handleEditOrder, action, customerList }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();

    const formik = useFormik({
        enableReinitialize: true,
        validateOnChange: false,
        validateOnBlur: true,
        validationSchema: OrderSchema,
        initialValues: initialValues,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                if (action === 'ADD') {
                    console.log(values, "values")
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
    const closeOrderHandler = () => {
        // action == 'ADD' ? 
        history.push(PATHS.orders.root)
        // :
        // history.push(PATHS.customers.detail.replace(':id', id))
    }
    return (

        <div className={classes._container}>
            <div className={classes._editbox}>
                <Typography className={classes._heading} variant="h4">{action == "ADD" ? 'New Order' : 'Edit Order'}</Typography>
                <div>
                    <CloseIcon onClick={closeOrderHandler} className={classes._icons} />
                    <SaveIcon onClick={handleSubmit} className={classes._icons} />
                </div>

            </div>
            <Typography className={classes._subheading} variant="h5">Basic Data</Typography>
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
        </div>
    )
}
export default OrderForm;