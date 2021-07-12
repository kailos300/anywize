import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import RequireAuth from 'components/hoc/require-auth';
import Typography from '@material-ui/core/Typography';

import { Login, ToursList,TourDetail, AddTour, EditTour, CustomersList, CustomerDetail, AddCustomer, EditCustomer, AddOrder, OrderList, EditOrder ,Edit } from 'views';
import { PATHS } from '../../util/appConstants';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path={PATHS.login} component={Login} />
      <Route exact path={PATHS.dashboard} component={RequireAuth(Dashboard)} />
      <Route exact path={PATHS.customer} component={RequireAuth(Customer)} />
      {/**tours */}
      <Route exact path={PATHS.tours.root} component={RequireAuth(ToursList)} />
      <Route exact path={PATHS.tours.add} component={RequireAuth(AddTour)} />
      <Route exact path={PATHS.tours.edit} component={RequireAuth(EditTour)} />
      <Route exact path={PATHS.tours.detail} component={RequireAuth(TourDetail)} />
      {/**customers */}
      <Route exact path={PATHS.customers.root} component={RequireAuth(CustomersList)} />
      <Route exact path={PATHS.customers.detail} component={RequireAuth(CustomerDetail)} />
      <Route exact path={PATHS.customers.add} component={RequireAuth(AddCustomer)} />
      <Route exact path={PATHS.customers.edit} component={RequireAuth(EditCustomer)} />
      {/* <Route exact path={'/edit'} component={RequireAuth(Edit)} /> */}

      {/**orders */}
      <Route exact path={PATHS.orders.root} component={RequireAuth(OrderList)} />
      <Route exact path={PATHS.orders.add} component={RequireAuth(AddOrder)} />
      <Route exact path={PATHS.orders.edit} component={RequireAuth(EditOrder)} />

      <Redirect from={PATHS.root} to={PATHS.login} />
    </Switch>
  );
};

export default AppRouter;

function Dashboard() {
  return (
    <div>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
        facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
        gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
        donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
        Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
        imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
        arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
        donec massa sapien faucibus et molestie ac.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
        consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
        hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
        tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
        nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
        accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
      </Typography>
    </div>
  )
}

function Customer() {
  return (
    <div>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
        consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
        hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
        tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
        nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
        accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
      </Typography>
    </div>
  )
}
