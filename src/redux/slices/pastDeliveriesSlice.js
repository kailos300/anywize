import { createSlice, createSelector } from "@reduxjs/toolkit";
import { coreApi } from "api/core";

const baseUrl = "/orders";
const initialState = {
    pastDeliveries: {},
    loading: false
};


const pastDeliveriesSlice = createSlice({
    name: "pastDeliveries",
    initialState,
    reducers: {
        setpastDeliveries: (state, action) => {
            state.pastDeliveries = action.payload
        },
        setpastDeliveriesLoading: (state) => {
            state.loading = true;
        },
        setsetpastDeliveriesReady: (state) => {
            state.loading = false;
        },
    }
})

export const { setpastDeliveries, setpastDeliveriesLoading, setsetpastDeliveriesReady } = pastDeliveriesSlice.actions

export default pastDeliveriesSlice.reducer

export const getpastDeliveries = () => async (dispatch) => {
    const url = baseUrl
    dispatch(setpastDeliveriesLoading());
    try {
        const orders = await coreApi.fetch(url);
        dispatch(setpastDeliveries(orders));
    } catch (err) {
        console.log(err);
    } finally {
        dispatch(setsetpastDeliveriesReady());
    }
};

// const  pastDeliverySelector = ({  pastDeliveries }) =>  pastDeliveries.pastDelivery;
const pastDeliveriesSelector = ({ pastDeliveries }) => pastDeliveries.pastDeliveries;
const pastDeliveryStatusSelector = ({ pastDeliveries }) => pastDeliveries.loading;

// export const selectTour = createSelector(tourSelector, (tour) => tour);
export const selectpastDeliveries = createSelector(pastDeliveriesSelector, (pastDeliveries) =>
    Object.values(pastDeliveries)
);
export const selectpastDeliveriesStatus = createSelector(
    pastDeliveryStatusSelector,
    (loading) => loading
);
