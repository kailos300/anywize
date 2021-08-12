import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RequireAuth from 'components/hoc/require-auth';

import {
  Login,
  ToursList,
  TourDetail,
  AddTour,
  EditTour,
  CustomersList,
  CustomerDetail,
  CurrentTours,
  RecentTours,
  ArchiveTours,
  AddCustomer,
  EditCustomer,
  AddOrder,
  OrderList,
  EditOrder,
  Maps,
  PastDeliveries,
  RoutesMap,
} from 'views';
import { PATHS } from '../../util/appConstants';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path={PATHS.login} component={Login} />
      {/**tours */}
      <Route exact path={PATHS.tours.root} component={RequireAuth(ToursList)} />
      <Route exact path={PATHS.tours.add} component={RequireAuth(AddTour)} />
      <Route exact path={PATHS.tours.edit} component={RequireAuth(EditTour)} />
      <Route
        exact
        path={PATHS.tours.detail}
        component={RequireAuth(TourDetail)}
      />
      <Route
        exact
        path={PATHS.tours.current}
        component={RequireAuth(CurrentTours)}
      />
      <Route
        exact
        path={PATHS.tours.recent}
        component={RequireAuth(RecentTours)}
      />
      <Route
        exact
        path={PATHS.tours.archive}
        component={RequireAuth(ArchiveTours)}
      />
      {/**customers */}
      <Route
        exact
        path={PATHS.customers.root}
        component={RequireAuth(CustomersList)}
      />
      <Route
        exact
        path={PATHS.customers.detail}
        component={RequireAuth(CustomerDetail)}
      />
      <Route
        exact
        path={PATHS.customers.add}
        component={RequireAuth(AddCustomer)}
      />
      <Route
        exact
        path={PATHS.customers.edit}
        component={RequireAuth(EditCustomer)}
      />
      {/* <Route exact path={'/edit'} component={RequireAuth(Edit)} /> */}

      <Route exact path={PATHS.maps} component={Maps} />
      {/**orders */}
      <Route
        exact
        path={PATHS.orders.root}
        component={RequireAuth(OrderList)}
      />
      <Route exact path={PATHS.orders.add} component={RequireAuth(AddOrder)} />
      <Route
        exact
        path={PATHS.orders.edit}
        component={RequireAuth(EditOrder)}
      />
      <Route
        exact
        path={PATHS.pastdeliveries}
        component={RequireAuth(PastDeliveries)}
      />
      <Route exact path={PATHS.tours.current.map} component={RequireAuth(RoutesMap)} />
      <Redirect to={PATHS.tours.current} />
    </Switch>
  );
};

export default AppRouter;
