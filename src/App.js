import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom'

import { PATHS } from 'util/appConstants';
import { checkPaths } from 'constants/ui-constants';

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


  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (!authenticated) {
      history.push(PATHS.login);
    }
  }, [authenticated, history]);


  const checkPath = () => {
    let id = location.pathname.split('/').pop();
    let newPaths = checkPaths.map((path) => path.replace(':id', id))
    return newPaths;
  }
  return (
    <>
      {location.pathname !== '/login' && <Navbar />}
      {location.pathname !== '/login' && checkPath().includes(location.pathname) && <Masterbar />}
      <AppRouter />
      <Snackbar />
    </>
  );
}

export default App;
