import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RequireAuth from 'components/hoc/require-auth';
import { Login } from 'views';
import { PATHS } from '../../util/appConstants';

const AppRouter = () => {
  return (
    <Switch>
      <Route path={PATHS.login} component={Login} />
      <Route path={PATHS.dashboard} component={RequireAuth(Dashboard)} />
      <Route path={PATHS.customer} component={RequireAuth(Customer)} />
      <Redirect from={PATHS.root} to={PATHS.login} />
    </Switch>
  );
};

export default AppRouter;

 function Dashboard() {
  return (
    <div>
      
    </div>
  )
}

function Customer() {
  return (
    <div>
      
    </div>
  )
}
