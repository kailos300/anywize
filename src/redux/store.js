import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './modules/user';
import authenticationReducer from './modules/authentication';

// import { reducer as formReducer } from 'redux-form';


const store = configureStore({
    reducer: {
        auth: authReducer,
        authentication: authenticationReducer,
        user: userReducer,
        // form: formReducer,
    },
});

export default store;
