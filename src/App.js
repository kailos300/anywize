import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { useParams, useLocation, useHistory } from 'react-router-dom'

import { PATHS } from 'util/appConstants';
import { checkPaths } from 'constants/ui-constants';

import { fetchUserInfo } from 'redux/slices/userSlice';
import { selectAuthenticated } from 'redux/slices/authSlice';

import AppRouter from './routes/AppRouter';
import Bar from './components/mainDrawer/drawer';
import Snackbar from 'components/Snackbar';
import Navbar from 'components/Navbar';
import Masterbar from 'components/Masterbar';

const drawerWidth = 301;

const useStyles = makeStyles((theme) => ({
  appWrapper: {
    display: 'flex',
    flexGrow: 1,
  },
  appRoot: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
const App = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector(selectAuthenticated);

  const [open, setOpen] = React.useState(true);


  useEffect(() => {
    console.log(location)
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (!authenticated) {
      history.push(PATHS.login);
    }
  }, [authenticated, history]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const checkPath = () => {
    let id = location.pathname.split('/').pop();
    let newPaths = checkPaths.map((path) => path.replace(':id', id))
    return newPaths;
  }
  return (
    <>
      <Navbar />
      {checkPath().includes(location.pathname)  && <Masterbar />}
      {/* {location.pathname !== '/login' ? <div className={classes.appWrapper}>
        <Bar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose} />
        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}> */}
      <AppRouter />
      <Snackbar />
      {/* </main>
      </div>
        :
        <>
          <AppRouter />
          <Snackbar />
        </>
      } */}
    </>
  );
}

export default App;
