import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Helpers
import { PATHS } from 'util/appConstants';

//Actions
import { initialValues } from 'components/Customers/constants';
import { selectCustomerStatus, addCustomer } from 'redux/slices/customerSlice';
import { getTours, selectTours } from 'redux/slices/tourSlice';
import { setShowMessage } from 'redux/slices/uiSlice';

//Components
import CustomerForm from 'components/Customers/form';

const currentAction = 'ADD';
const AddCustomer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const loading = useSelector(selectCustomerStatus);
    const tours = useSelector(selectTours);

    const fetchTours = useCallback(async () => {
        return await dispatch(getTours());
    }, [dispatch, tours]);

    useEffect(() => {
        if (!tours.length) {
            fetchTours();
        }
    }, [tours]);
    const handleAddCustomer = async (payload) => {
        await dispatch(addCustomer(payload));

        history.push(PATHS.customers.root);
    }
    return (
        <CustomerForm
            action={currentAction}
            initialValues={initialValues}
            handleAddCustomer={handleAddCustomer}
            tourList={tours}
        />
    )
}
AddCustomer.propTypes = {
    initialValues: PropTypes.object.isRequired,
};
export default AddCustomer;
