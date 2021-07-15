import _ from "lodash";
import { APP_NAMESPACE } from "../../util/redux-constants";
import { get, post } from "../../util/http-utils";
import { setCookie } from "../../util/cookie-utils";
import { updateStore, buildGenericInitialState, handleError } from "../../util/store-utils";

const AUTH_ENDPOINT_BASE = "auth";
const typeBase = `${APP_NAMESPACE}/${AUTH_ENDPOINT_BASE}/`;

// Constants
export const CHANGE_AUTH = `${typeBase}CHANGE_AUTH`;
export const SET_POST_AUTH_PATH = `${typeBase}SET_POST_AUTH_PATH`;
export const RESET_PASSWORD = `${typeBase}RESET_PASSWORD`;
export const GET_AUTHENTICATED_USER = `${typeBase}GET_AUTHENTICATED_USER`;

// Actions
export const changeAuthentication = (payload) => (dispatch) =>
  dispatch({
    type: CHANGE_AUTH,
    payload,
  });

/**
 * login - Authenticate a user with an email and password
 * @param {Object} credentials  Login credentials (email, password)
 */
export const login = (credentials, desiredPath) => async (dispatch) => {
  try {
    const response = await post(
      dispatch,
      CHANGE_AUTH,
      `${AUTH_ENDPOINT_BASE}/login`,
      credentials,
      false
    );

    // If the login was successful, set the JWT as a cookie
    if (response) {
      setCookie("token", response.token, { maxAge: response.tokenExpiration });
      localStorage.setItem("token", response.token);
      // letting this crap here because if you redirect with the router there's a loop
      // because of some unknown bug in the /dashboard component
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500)
    }
  } catch (err) {
    throw err;
  }
};


/**
 * setPostAuthPath  - Save Desired Pre-Auth Path to State
 * @param {String} payload  The desired path, saved pre-authentication
 * @returns {function}
 */
export const setPostAuthPath = (payload) => (dispatch) =>
  dispatch({
    type: SET_POST_AUTH_PATH,
    payload,
  });




/**
 * getAuthenticatedUser - Retrieves the logged in user's information
 * @returns {Promise}
 */
export const getAuthenticatedUser = () => async (dispatch) => {
  try {
    const response = await get(
      dispatch,
      GET_AUTHENTICATED_USER,
      `${AUTH_ENDPOINT_BASE}/profile`,
      true
    );
    return Promise.resolve(response);
  } catch (err) {
    await handleError(dispatch, err, GET_AUTHENTICATED_USER);
  }
};

// Store
const INITIAL_STATE = {
  authenticated: localStorage.getItem('token') ? true : false,
  user: "",
  ...buildGenericInitialState([
    CHANGE_AUTH,
    SET_POST_AUTH_PATH,
    RESET_PASSWORD,
    GET_AUTHENTICATED_USER,
  ]),
};

const reducer =  (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_AUTH:
      return updateStore(state, action, {
        authenticated: localStorage.getItem('token') ? true : false,
        user: _.get(action, "payload.user.id"),
      });
    case GET_AUTHENTICATED_USER:
      return updateStore(state, action, { user: _.get(action, "payload.user.id") });
    default:
      return state;
  }
};

export default reducer;
