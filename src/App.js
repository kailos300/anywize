import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import { PATHS } from 'util/appConstants';
import { checkPaths, checkTourPaths, MASTER_DATA_BAR, TOUR_DATA_BAR } from 'constants/ui-constants';

import { fetchUserInfo } from 'redux/slices/userSlice';
import { selectAuthenticated } from 'redux/slices/authSlice';

import AppRouter from './routes/AppRouter';
import Snackbar from 'components/Snackbar';
import Navbar from 'components/Navbar';
import Masterbar from 'components/Masterbar';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector(selectAuthenticated);
  // const authe = useSelector(selectUser)

  useEffect(() => {
    dispatch(fetchUserInfo(history));
  }, [dispatch, history]);

  useEffect(() => {
    if (!authenticated) {
      history.push(PATHS.login);
    }
  }, [authenticated, history]);

  const checkPath = () => {
    let id = location.pathname.split("/").pop();
    let newPaths = checkPaths.map((path) => path.replace(":id", id));
    return newPaths;
  };
  const checkTourPath = () => {
    return checkTourPaths;
  }
  return (
    <>
      {location.pathname !== "/login" &&
        <>
          <Navbar checkTourPaths={checkTourPath} checkPaths={checkPath} />
          {checkPath().includes(location.pathname) && <Masterbar {...MASTER_DATA_BAR} />}
          {checkTourPath().includes(location.pathname) && <Masterbar {...TOUR_DATA_BAR} />}
        </>
      }
      <AppRouter />
      <Snackbar />
    </>
  );
};

export default App;
