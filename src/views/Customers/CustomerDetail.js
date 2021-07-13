import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';

import { PATHS } from 'util/appConstants';

// Actions
import { selectCustomer, selectCustomerStatus, getCustomer } from 'redux/slices/customerSlice';
import { setShowMessage } from 'redux/slices/uiSlice';

const useStyles = makeStyles({
    _container: {
        backgroundColor: '#121212',
        padding: '60px 130px',
    },
    _heading: {
        color: '#F5F5F5',
        font: 'normal normal normal 28px/40px Questrial'
    },
    _edit: {
        color: '#6F9CEB',
        width: '22px',
        height: '22px',
        cursor: 'pointer'
    },
    _editbox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    _infoheading: {
        color: '#F5F5F5',
        font: 'normal normal medium 22px/32px Roboto',
        marginTop: '44px',
    },
    _head: {
        color: '#F5F5F5',
        opacity: '0.6',
        font: 'normal normal normal 12px/24px Roboto',
        marginRight: '32px',
    },
    _basicdetailhead: {
        display: 'flex',
        marginTop: '41px',
    },
    _basicdetail: {
        display: 'flex',
    },
    _detail: {
        color: '#F5F5F5',
        marginRight: '32px',
        font: 'normal normal normal 18px/24px Roboto'
    },
    _name: {
        // width: '228px',s
        letterSpacing: '0px',
    },
    _width11: {
        // width: '11px'
    },
    _margintop80: {
        marginTop: '80px'
    },
    _adressbox: {
        marginTop: '24px',

    }
})

const CustomerDetail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const loading = useSelector(selectCustomerStatus);
    const customer = useSelector(selectCustomer);

    useEffect(() => {
        if (id) {
            dispatch(getCustomer(id));
        }
    }, [id]);

    const editCustomerHandler = () => {
        history.push(PATHS.customers.edit.replace(':id', id))
    }
    if (loading || !customer) return <div className="loading">Loading..</div>;
    return (
        <div className={classes._container}>
            {console.log(customer, "customer")}
            <div className={classes._editbox}>
                <Typography className={classes._heading} variant="h4">{customer.alias || customer.name}</Typography>
                <EditIcon onClick={editCustomerHandler} className={classes._edit} />
            </div>
            <Typography className={classes._infoheading} variant="h5">Basic Data</Typography>
            <div className={classes._basicdetailhead}>
                <div>
                    <Typography className={clsx(classes._head, classes._width11)} variant="h6">ID</Typography>
                    <Typography className={clsx(classes._detail, classes._width11)} variant="h6">{customer.id}</Typography>

                </div>
                <div>
                    <Typography className={clsx(classes._head, classes._name)} variant="h6">Name</Typography>
                    <Typography className={clsx(classes._name, classes._detail)} variant="h6">{customer.name}</Typography>

                </div>
                <div>
                    <Typography className={classes._head} variant="h6">Alias</Typography>
                    <Typography className={classes._detail} variant="h6">{customer.alias}</Typography>

                </div>
            </div>
            {/** */}
            <div className={classes._basicdetailhead}>
                <div>
                    <Typography className={clsx(classes._head, classes._width11)} variant="h6">Street</Typography>
                    <Typography className={clsx(classes._detail, classes._width11)} variant="h6">{customer.street}</Typography>

                </div>
                <div>
                    <Typography className={clsx(classes._head, classes._name)} variant="h6">House No.</Typography>
                    <Typography className={clsx(classes._name, classes._detail)} variant="h6">{customer.street_number}</Typography>

                </div>
                <div>
                    <Typography className={classes._head} variant="h6">Zipcode</Typography>
                    <Typography className={classes._detail} variant="h6">{customer.zipcode}</Typography>

                </div>
                <div>
                    <Typography className={classes._head} variant="h6">City</Typography>
                    <Typography className={classes._detail} variant="h6">{customer.city}</Typography>

                </div>
                <div>
                    <Typography className={classes._head} variant="h6">Country</Typography>
                    <Typography className={classes._detail} variant="h6">{customer.country}</Typography>

                </div>

            </div>
            {/** */}
            <Typography className={clsx(classes._infoheading, classes._margintop80)} variant="h5">Contact</Typography>
            <div className={classes._basicdetailhead}>
                <div>
                    <Typography className={clsx(classes._head)} variant="h6">Salutaion</Typography>
                    <Typography className={clsx(classes._detail)} variant="h6">Mr.</Typography>

                </div>
                <div>
                    <Typography className={clsx(classes._head, classes._name)} variant="h6">FirstName</Typography>
                    <Typography className={clsx(classes._name, classes._detail)} variant="h6">Mark</Typography>

                </div>
                <div>
                    <Typography className={classes._head} variant="h6">LastName</Typography>
                    <Typography className={classes._detail} variant="h6">Meyer</Typography>

                </div>
            </div>
            {/*** */}
            <div className={classes._basicdetailhead}>
                <div>
                    <Typography className={clsx(classes._head)} variant="h6">Telefon</Typography>
                    <Typography className={clsx(classes._detail)} variant="h6">-</Typography>

                </div>
                <div>
                    <Typography className={clsx(classes._head)} variant="h6"> Mobil</Typography>
                    <Typography className={clsx(classes._detail)} variant="h6">1212</Typography>

                </div>
            </div>
            {/*** */}

            <div div className={classes._basicdetailhead}>
                <div>
                    <Typography className={clsx(classes._head)} variant="h6">E-Mail</Typography>
                    <Typography className={clsx(classes._detail)} variant="h6">{customer.email}</Typography>

                </div>
                <div >
                    <Typography className={clsx(classes._head)} variant="h6">Notify</Typography>
                    <Typography className={clsx(classes._detail)} variant="h6">{customer.email_notifications ? 'Yes' : 'No'}</Typography>
                </div>
            </div>
            {/*** */}

            <Typography className={clsx(classes._infoheading, classes._margintop80)} variant="h5">Tour</Typography>
            <div className={classes._basicdetailhead}>
                <div>
                    <Typography className={clsx(classes._head)} variant="h6">ID</Typography>
                    <Typography className={clsx(classes._detail)} variant="h6">{customer.tour_id}</Typography>
                </div>
                <div>
                    <Typography className={clsx(classes._head, classes._name)} variant="h6">Name</Typography>
                    <Typography className={clsx(classes._name, classes._detail)} variant="h6">{customer.Tour.name}</Typography>
                </div>
                <div>
                    <Typography className={classes._head} variant="h6">Position</Typography>
                    <Typography className={classes._detail} variant="h6">{customer.tour_position}</Typography>
                </div>
            </div>
            {/*** */}

            <div className={classes._basicdetailhead}>
                <div>
                    <Typography className={clsx(classes._head)} variant="h6">Depositagreement</Typography>
                    <Typography className={clsx(classes._detail)} variant="h6">{customer.deposit_agreement}</Typography>

                </div>
                <div >
                    <Typography className={clsx(classes._head)} variant="h6">Code</Typography>
                    <Typography className={clsx(classes._detail)} variant="h6">{customer.keybox_code}</Typography>
                </div>
            </div>
        </div>
    )
}

export default CustomerDetail;