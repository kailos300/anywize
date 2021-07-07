import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// Helpers
import { PATHS } from 'util/appConstants';

// Actions
import { selectCustomer, selectCustomerStatus, getCustomer, editCustomer } from 'redux/slices/customerSlice';
import { setShowMessage } from 'redux/slices/uiSlice';
import { getTours, selectTours } from 'redux/slices/tourSlice';

// Components
import CustomerForm from 'components/Customers/form';

const currentAction = 'EDIT';

const EditCustomer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const loading = useSelector(selectCustomerStatus);
    const customer = useSelector(selectCustomer);
    const tours = useSelector(selectTours);


    useEffect(() => {
        if (id) {
            dispatch(getCustomer(id));
        }
    }, [id]);

    const fetchTours = useCallback(async () => {
        return await dispatch(getTours());
    }, [dispatch, tours]);

    useEffect(() => {
        if (!tours.length) {
            fetchTours();
        }
    }, [tours]);
    const handleEditCustomer = async (id, payload) => {
        await dispatch(editCustomer(id, payload))
            // .then(data => console.log(data, "data"))
            // .catch(error => console.log(error, "error"));

        // dispatch(setShowMessage({
        //     description: 'Customer Edited Successfully!',
        //     type: 'success',

        // }));

        // history.push(PATHS.customers.root);
    };

    if (loading || !customer) return <div className="loading">Loading..</div>;
    return (
        <CustomerForm
            initialValues={customer}
            handleEditCustomer={handleEditCustomer}
            action={currentAction}
            tourList={tours}
        />
    );
}
export default EditCustomer;