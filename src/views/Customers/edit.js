import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Button, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import { Input, InputOnlyNumbers, Select, Checkbox } from 'components/Shared/mui-formik-inputs'

const useStyles = makeStyles({
    _container: {
        backgroundColor: '#F5F5F5',
        padding: '60px 130px',
        height: '100vh'
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
const Edit = () => {
    const classes = useStyles();

    return (
        <div className={classes._container}>
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
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.name}
                    // errors={errors}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                    <Input
                        label={'Number'}
                        name="number"
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.number}
                    // errors={errors}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Input
                        label={'Alias'}
                        name="Alias"
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
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.number}
                    // errors={errors}
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
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                    // value={values.number}
                    // errors={errors}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Select
                        label={'Country'}
                        name="country"
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        // value={values.salutation}
                        // errors={errors}
                        options={['Mr', 'Mrs', 'Ms', 'Dr'].map((o) => ({ label: o, value: o }))}
                    />
                </Grid>
            </Grid>
            <Typography className={classes._subheading} variant="h5">Contact</Typography>

        </div>
    )
}
export default Edit;