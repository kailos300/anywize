import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Helpers
import { PATHS } from "util/appConstants";

//Actions
import { addCustomer } from "redux/slices/customerSlice";
import { getTours, selectTours } from "redux/slices/tourSlice";

//Components
import CustomerForm from "components/Customers/form";

const currentAction = "ADD";
const AddCustomer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tours = useSelector(selectTours);

  useEffect(() => {
    if (!tours.length) {
      dispatch(getTours());
    }
  }, [dispatch, tours]);

  const onSubmit = async (payload) => {
    await dispatch(addCustomer(payload)).then((res) =>
      res !== undefined ? history.push(PATHS.customers.root) : ""
    );
  };
  return (
    <CustomerForm
      action={currentAction}
      onSubmit={onSubmit}
      tourList={tours}
    />
  );
};
AddCustomer.propTypes = {
  initialValues: PropTypes.object.isRequired,
};
export default AddCustomer;
