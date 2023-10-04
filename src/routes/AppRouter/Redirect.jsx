import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { selectUser } from "redux/slices/userSlice";
import { PATHS } from "../../util/appConstants";

export default () => {
  const user = useSelector(selectUser);

  if (user?.permissions?.routesList) {
    return <Redirect to={PATHS.tours.current} />;
  } else if (user?.permissions?.ordersList) {
    return <Redirect to={PATHS.orders.root} />;
  }

  return <Redirect to={PATHS.customers.root} />;
};
