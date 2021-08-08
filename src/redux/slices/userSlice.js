import { createSlice, createSelector } from "@reduxjs/toolkit";
import { coreApi } from "api/core";
import { setShowMessage } from "redux/slices/uiSlice";

export const APP_NAMESPACE = "mkrn-starter";
const userPrefix = `${APP_NAMESPACE}/user`;
const usersPrefix = `${APP_NAMESPACE}/users`;
const authUserPrefix = `${APP_NAMESPACE}/auth`;

const initialState = {
  messages: {
    [userPrefix]: "",
    [usersPrefix]: "",
  },
  errors: {
    [userPrefix]: [],
    [usersPrefix]: [],
    [authUserPrefix]: [],
  },
  loading: {
    [userPrefix]: false,
    [usersPrefix]: false,
    [authUserPrefix]: false,
  },
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setUserSettings } = userSlice.actions;
export default userSlice.reducer;

export const fetchUserInfo = (history) => async (dispatch) => {
  const url = "/users/me";
  try {
    const user = await coreApi.fetch(url);
    console.log(user)
    dispatch(setUser(user));
  } catch (err) {

    history.push('/login')
    dispatch(setShowMessage({
      description: "UNAUTHORIZED USER!",
      type: "error",
    }))
    console.log(err);
  }
};

const userSelector = (state) => state.newUser.user;

export const selectUser = createSelector(userSelector, (user) => user);
