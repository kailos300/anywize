import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
// Helpers
import { PATHS } from "util/appConstants";

// Actions
import {
  selectCustomer,
  selectCustomerStatus,
  getCustomer,
  editCustomer,
} from "redux/slices/customerSlice";
import { getTours, selectTours } from "redux/slices/tourSlice";

// Components
import CustomerForm from "components/Customers/form";
import Loading from 'components/Shared/loading';

const currentAction = "EDIT";

const EditCustomer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const loading = useSelector(selectCustomerStatus);
  const customer = useSelector(selectCustomer);
  const tours = useSelector(selectTours);

  useEffect(() => {
    if (id && !loading) {
      dispatch(getCustomer(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!tours.length) {
      dispatch(getTours());
    }
  }, [dispatch, tours]);

  const onSubmit = async (payload) => {
    await dispatch(editCustomer(id, payload));

    history.push(PATHS.customers.detail.replace(':id', id));
  };

  if (loading || !customer) {
    return <Loading />
  };

  return (
    <CustomerForm
      initialValues={customer}
      onSubmit={onSubmit}
      action={currentAction}
      tourList={tours}
    />
  );
};
export default EditCustomer;
