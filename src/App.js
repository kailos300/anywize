import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

import { fetchUserInfo } from 'redux/slices/userSlice';

import { useLocation } from 'react-router-dom'
import AppRouter from './routes/AppRouter';
import Bar from './components/mainDrawer/drawer';
import Snackbar from 'components/Snackbar';

const drawerWidth = 240;

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
    padding: theme.spacing(3),
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
function App() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {location.pathname !== '/login' ? <div className={classes.appWrapper}>
        <Bar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose} />
        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
          <AppRouter />
          <Snackbar />
        </main>
      </div>
        :
        <>
        <AppRouter />
        <Snackbar />
        </>
      }
    </>
  );
}

export default App;
