import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles({
  _container: {
    backgroundColor: "#F5F5F5",
    padding: "60px 130px",
    minHeight: "100vh",
  },
})
const currentAction = "EDIT";

const EditCustomer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const loading = useSelector(selectCustomerStatus);
  const customer = useSelector(selectCustomer);
  const tours = useSelector(selectTours);

  useEffect(() => {
    if (id) {
      dispatch(getCustomer(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!tours.length) {
      dispatch(getTours());
    }
  }, [dispatch, tours]);

  const handleEditCustomer = async (id, payload) => {
    await dispatch(editCustomer(id, payload));
    // .then(data => console.log(data, "data"))
    // .catch(error => console.log(error, "error"));

    // dispatch(setShowMessage({
    //     description: 'Customer Edited Successfully!',
    //     type: 'success',

    // }));

    history.push(PATHS.customers.root);
  };

  if (loading || !customer) return <div className={classes._container}><div style={{ color: 'black' }} className="loading">Loading..</div></div>;
  return (
    <CustomerForm
      initialValues={customer}
      handleEditCustomer={handleEditCustomer}
      action={currentAction}
      tourList={tours}
    />
  );
};
export default EditCustomer;
