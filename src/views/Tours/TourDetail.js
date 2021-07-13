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
import { selectTour, selectTourStatus, getTour, editTour } from 'redux/slices/tourSlice';
import { setShowMessage } from 'redux/slices/uiSlice';

const useStyles = makeStyles({
    _container: {
        backgroundColor: '#121212',
        padding: '60px 130px',
        minHeight: '100vh'
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
        // width: '228px',
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


const TourDetail = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const loading = useSelector(selectTourStatus);
    const tour = useSelector(selectTour);

    useEffect(() => {
        if (id) {
            dispatch(getTour(id));
        }
    }, [id]);

    const editTourHandler = () => {
        history.push(PATHS.tours.edit.replace(':id', id))
    }
    if (loading || !tour) return <div className="loading">Loading..</div>;
    return (
        <div className={classes._container}>
            <div className={classes._editbox}>
                <Typography className={classes._heading} variant="h4">AliasOrOtherwiseName</Typography>
                <EditIcon onClick={editTourHandler} className={classes._edit} />
            </div>
            <Typography className={classes._infoheading} variant="h5">Basic Data</Typography>
            <div className={classes._basicdetailhead}>
                <div>
                    <Typography className={clsx(classes._head, classes._width11)} variant="h6">ID</Typography>
                    <Typography className={clsx(classes._detail, classes._width11)} variant="h6">{tour.id}</Typography>
                </div>
                <div >
                    <Typography className={clsx(classes._head, classes._name)} variant="h6">Name</Typography>
                    <Typography className={clsx(classes._name, classes._detail)} variant="h6">{tour.name}</Typography>
                </div>
                <div>
                    <Typography className={classes._head} variant="h6">Description</Typography>
                    <Typography className={classes._detail} variant="h6">{tour.description}</Typography>
                </div>
            </div>
        </div>
    )
}

export default TourDetail;