import { createSlice, createSelector } from "@reduxjs/toolkit";
import { coreApi } from "api/core";
import { setShowMessage } from "redux/slices/uiSlice";
import moment from 'moment';

const baseUrl = '/routes';

const initialState = {
    routes: {},
    completed: {},
    current: {},
    archived: {},
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
        setCurrent: (state, action) => {
            const routes = {};
            action.payload.forEach((route) => {
                console.log(route)
                routes[route.id] = route;
            });
            state.current = routes;
        },
        setCompleted: (state, action) => {
            const routes = {};
            action.payload.forEach((route) => {
                routes[route.id] = route;
            });
            state.completed = routes;
        },
        setArchived: (state, action) => {
            const routes = {};
            action.payload.forEach((route) => {
                routes[route.id] = route;
            });
            state.archived = routes;
        },
        setRouteLoading: (state) => {
            state.loading = true;
        },
        setRouteReady: (state) => {
            state.loading = false;
        },
    }
})

export const { setRoutes, setRouteLoading, setRouteReady, setCompleted, setCurrent, setArchived } = routeSlice.actions;
export default routeSlice.reducer;
const count = (data) => {
    var count = 0;
    for (var i = 0; i < data.length; ++i) {
        if (data[i].delivered_at == null)
            count++;
    }
    return count;
}
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
export const getCurrentRoutes = () => async (dispatch) => {
    dispatch(setRouteLoading());
    try {
        const routes = await coreApi.fetch(`${baseUrl}`);
        let update = routes.filter((data) => {
            if (count(data.Orders) !== data.Orders.length) {
                return {
                    ...data,
                }

            }

        })
        let newData = update.map((data) => {
            return {
                ...data,
                is_favourite: false,
                progress: 'In Progress'
            }
        })
        dispatch(setCurrent(newData));
    }
    catch (err) {
        console.log(err);
    }
    finally {
        dispatch(setRouteReady())
    }
}
export const getFinisedRoutes = () => async (dispatch) => {
    dispatch(setRouteLoading());
    try {
        const routes = await coreApi.fetch(`${baseUrl}`);
        let update = routes.filter((data) => {
            if (count(data.Orders) == data.Orders.length) {

                return {
                    ...data,
                }
            }
        })
        let newData = update.map((data) => {
            return {
                ...data,
                is_favourite: false,
                progress: 'Complete'
            }
        })
        dispatch(setCompleted(newData));
    }
    catch (err) {
        console.log(err);
    }
    finally {
        dispatch(setRouteReady())
    }
}
export const getArchivedRoutes = () => async (dispatch) => {
    dispatch(setRouteLoading());
    try {
        const routes = await coreApi.fetch(`${baseUrl}?started=0&ended=0`);
        let update = routes.map((data) => {
            return {
                ...data
            }
        })
        let newData = update.map((data) => {
            return {
                ...data,
                is_favourite: false,
                progress: 'Archived'
            }
        })

        dispatch(setArchived(newData));
    }
    catch (err) {
        console.log(err);
    }
    finally {
        dispatch(setRouteReady())
    }
}
const routesSelector = ({ routes }) => routes.routes;
const currentSelector = ({ routes }) => routes.current;
const completedSelector = ({ routes }) => routes.completed;
const archivedSelector = ({ routes }) => routes.archived;

const tourStatusSelector = ({ routes }) => routes.loading;
export const selectCurrent = createSelector(currentSelector, (current) =>
    Object.values(current)
);
export const selectCompleted = createSelector(completedSelector, (completed) =>
    Object.values(completed)
);
export const selectArchived = createSelector(archivedSelector, (archived) =>
    Object.values(archived)
);
export const selectRoutes = createSelector(routesSelector, (routes) =>
    Object.values(routes)
);
export const selectRouteStatus = createSelector(
    tourStatusSelector,
    (loading) => loading
);
