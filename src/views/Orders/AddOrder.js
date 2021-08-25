import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Helpers
import { PATHS } from "util/appConstants";

// Actions
import { getCustomers, selectCustomers } from "redux/slices/customerSlice";
import { selectOrderStatus, addOrder } from "redux/slices/orderSlice";
import { setShowMessage } from "redux/slices/uiSlice";

// Components
import OrderForm from "components/Orders/form";
import Loading from 'components/Shared/loading';


const currentAction = "ADD";

const AddOrder = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectOrderStatus);
  const customers = useSelector(selectCustomers);

  useEffect(() => {
    if (!customers.length) {
      dispatch(getCustomers());
    }
  }, [dispatch, customers]);

  const onSubmit = async (payload) => {
    await dispatch(addOrder(payload));

    dispatch(
      setShowMessage({
        description: "Order created successfully",
        type: "success",
      })
    );

    history.push(PATHS.orders.add);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <OrderForm
      onSubmit={onSubmit}
      action={currentAction}
      customerList={customers}
    />
  );
};
export default AddOrder;
