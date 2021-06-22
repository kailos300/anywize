import { configureStore } from '@reduxjs/toolkit';
import newUserReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import userReducer from './modules/user';
import authenticationReducer from './modules/authentication';
import tourReducer from './slices/tourSlice';
import uiReducer from './slices/uiSlice';

// import { reducer as formReducer } from 'redux-form';


const store = configureStore({
    reducer: {
        newUser: newUserReducer,
        auth: authReducer,
        authentication: authenticationReducer,
        user: userReducer,
        tours: tourReducer,
        ui: uiReducer,
    },
});

export default store;
