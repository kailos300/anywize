import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithRedirect } from 'redux/slices/authSlice';
import { PATHS } from 'util/appConstants';

import { selectAuthenticated } from 'redux/slices/authSlice';

import LoginComponent from 'components/Login';

const Login = () => {
  const [error, setError] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const authenticated = useSelector(selectAuthenticated);

  const loginCallback = () => history.push(PATHS.dashboard);

  useEffect(() => {
    if (authenticated) {
      loginCallback();
    }
  }, [authenticated]);

  const onSubmit = async (values) => {
    try {
      await dispatch(loginWithRedirect(values, loginCallback));
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      }
    }
  };

  return (
    <LoginComponent onSubmit={onSubmit} error={error} />
  );
};

export default Login;
