import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

// Helpers
import { PATHS } from "util/appConstants";

// Actions
import {
  selectOrder,
  selectOrderStatus,
  getOrder,
  editOrder,
} from "redux/slices/orderSlice";
import { getCustomers, selectCustomers } from "redux/slices/customerSlice";

// Components
import OrderForm from "components/Orders/form";
import Loading from 'components/Shared/loading';

const currentAction = "EDIT";

const EditOrder = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const loading = useSelector(selectOrderStatus);
  const order = useSelector(selectOrder);
  const customers = useSelector(selectCustomers);

  useEffect(() => {
    if (id) {
      dispatch(getOrder(id));
    }
  }, []);

  useEffect(() => {
    if (!customers.length) {
      dispatch(getCustomers());
    }
  }, [dispatch, customers]);

  const onSubmit = async (payload) => {
    await dispatch(editOrder(id, payload));

    history.push(PATHS.orders.root);
  };

  if (loading || !order) {
    return <Loading />
  }

  return (
    <OrderForm
      initialValues={order}
      onSubmit={onSubmit}
      action={currentAction}
      customerList={customers}
    />
  );
};
export default EditOrder;
