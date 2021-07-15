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
import { setShowMessage } from "redux/slices/uiSlice";

// Components
import OrderForm from "components/Orders/form";

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
  }, [dispatch, id]);

  useEffect(() => {
    if (!customers.length) {
      dispatch(getCustomers());
    }
  }, [dispatch, customers]);

  const handleEditOrder = async (id, payload) => {
    await dispatch(editOrder(id, payload));

    dispatch(
      setShowMessage({
        description: "Order Edited Successfully!",
        type: "success",
      })
    );

    history.push(PATHS.orders.root);
  };

  if (loading || !order) return <div className="loading">Loading..</div>;
  return (
    <OrderForm
      initialValues={order}
      handleEditOrder={handleEditOrder}
      action={currentAction}
      customerList={customers}
    />
  );
};
export default EditOrder;
