import { createSlice, createSelector } from "@reduxjs/toolkit";
import { coreApi } from "api/core";
import { setShowMessage } from "redux/slices/uiSlice";
import moment from 'moment';

const baseUrl = '/routes';

const initialState = {
    routes: {},
    route: null,
    loading: false,
}

const routeSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        setRoutes: (state, action) => {
            console.log(state, action)
            const routes = {};
            action.payload.forEach((route) => {
                routes[route.id] = route;
            });
            state.routes = routes;
        },
        setRouteLoading: (state) => {
            state.loading = true;
        },
        setRouteReady: (state) => {
            state.loading = false;
        },
    }
})

export const { setRoutes, setRouteLoading, setRouteReady } = routeSlice.actions;
export default routeSlice.reducer;

export const getRoutes = () => async (dispatch) => {
    dispatch(setRouteLoading());
    try {
        const routes = await coreApi.fetch(baseUrl);
        let update = routes.map((data) => {
            return {
                ...data,
                is_favourite: false,
            }
        })
        dispatch(setRoutes(update));
    }
    catch (err) {
        console.log(err);
    }
    finally {
        dispatch(setRouteReady())
    }
}

const routesSelector = ({ routes }) => routes.routes;
const tourStatusSelector = ({ routes }) => routes.loading;
export const selectRoutes = createSelector(routesSelector, (routes) =>
    Object.values(routes)
);
export const selectRouteStatus = createSelector(
    tourStatusSelector,
    (loading) => loading
);
