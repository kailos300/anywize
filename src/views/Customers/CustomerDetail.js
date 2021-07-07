import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';

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
        width: '228px',
        letterSpacing: '0px',
    },
    _width11: {
        width: '11px'
    },
    _margintop80: {
        marginTop:'80px'
    },
    _adressbox: {
        marginTop: '24px',

    }
})

const CustomerDetail = () => {
    const classes = useStyles();

    return (
        <div className={classes._container}>
            <div className={classes._editbox}>
                <Typography className={classes._heading} variant="h4">AliasOrOtherwiseName</Typography>
                <EditIcon className={classes._edit} />
            </div>
            <Typography className={classes._infoheading} variant="h5">Basic Data</Typography>
            <div>
                <div className={classes._basicdetailhead}>
                    <Typography className={clsx(classes._head, classes._width11)} variant="h6">ID</Typography>
                    <Typography className={clsx(classes._head, classes._name)} variant="h6">Name</Typography>
                    <Typography className={classes._head} variant="h6">Alias</Typography>
                </div>
                <div className={classes._basicdetail}>
                    <Typography className={clsx(classes._detail, classes._width11)} variant="h6">-</Typography>
                    <Typography className={clsx(classes._name, classes._detail)} variant="h6">Testers Test GmbH & Co. KG</Typography>
                    <Typography className={classes._detail} variant="h6">Testers</Typography>
                </div>
            </div>
            <div>
                <div className={classes._basicdetailhead}>
                    <Typography className={clsx(classes._head, classes._width11)} variant="h6">Street</Typography>
                    <Typography className={clsx(classes._head, classes._name)} variant="h6">House No.</Typography>
                    <Typography className={classes._head} variant="h6">Zipcode</Typography>
                    <Typography className={classes._head} variant="h6">City</Typography>
                    <Typography className={classes._head} variant="h6">Country</Typography>

                </div>
                <div className={classes._basicdetail}>
                    <Typography className={clsx(classes._detail, classes._width11)} variant="h6">-</Typography>
                    <Typography className={clsx(classes._name, classes._detail)} variant="h6">Testers Test GmbH & Co. KG</Typography>
                    <Typography className={classes._detail} variant="h6">Testers</Typography>
                </div>
            </div>
            <Typography className={clsx(classes._infoheading,classes._margintop80)} variant="h5">Contact</Typography>   
            <div>
                <div className={classes._basicdetailhead}>
                    <Typography className={clsx(classes._head)} variant="h6">Salutaion</Typography>
                    <Typography className={clsx(classes._head, classes._name)} variant="h6">FirstName</Typography>
                    <Typography className={classes._head} variant="h6">LastName</Typography>
                </div>
                <div className={classes._basicdetail}>
                    <Typography className={clsx(classes._detail)} variant="h6">Mr.</Typography>
                    <Typography className={clsx(classes._name, classes._detail)} variant="h6">Mark</Typography>
                    <Typography className={classes._detail} variant="h6">Meyer</Typography>
                </div>
            </div>
            <div>
                <div className={classes._basicdetailhead}>
                    <Typography className={clsx(classes._head)} variant="h6">Telefon</Typography>
                    <Typography className={clsx(classes._head)} variant="h6"> Mobil</Typography>

                </div>
                <div className={classes._basicdetail}>
                    <Typography className={clsx(classes._detail)} variant="h6">-</Typography>
                    <Typography className={clsx(classes._detail)} variant="h6">GmbH & Co. KG</Typography>
                </div>
            </div>
            <div>
                <div className={classes._basicdetailhead}>
                    <Typography className={clsx(classes._head)} variant="h6">E-Mail</Typography>
                    <Typography className={clsx(classes._head)} variant="h6">Notify</Typography>

                </div>
                <div className={classes._basicdetail}>
                    <Typography className={clsx(classes._detail)} variant="h6">E-Mail</Typography>
                    <Typography className={clsx(classes._detail)} variant="h6">GmbH</Typography>
                </div>
            </div>
            <Typography className={clsx(classes._infoheading,classes._margintop80)} variant="h5">Tour</Typography>   
            <div>
                <div className={classes._basicdetailhead}>
                    <Typography className={clsx(classes._head)} variant="h6">ID</Typography>
                    <Typography className={clsx(classes._head, classes._name)} variant="h6">Name</Typography>
                    <Typography className={classes._head} variant="h6">Position</Typography>
                </div>
                <div className={classes._basicdetail}>
                    <Typography className={clsx(classes._detail)} variant="h6">Mr.</Typography>
                    <Typography className={clsx(classes._name, classes._detail)} variant="h6">Mark</Typography>
                    <Typography className={classes._detail} variant="h6">Meyer</Typography>
                </div>
            </div>
            <div>
                <div className={classes._basicdetailhead}>
                    <Typography className={clsx(classes._head)} variant="h6">Depositagreement</Typography>
                    <Typography className={clsx(classes._head)} variant="h6">Code</Typography>

                </div>
                <div className={classes._basicdetail}>
                    <Typography className={clsx(classes._detail)} variant="h6">Depositagreement</Typography>
                    <Typography className={clsx(classes._detail)} variant="h6">GmbH & Co. KG</Typography>
                </div>
            </div>
        </div>
    )
}

export default CustomerDetail;