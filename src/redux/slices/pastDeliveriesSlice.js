import { createSlice } from "@reduxjs/toolkit";
import { coreApi } from "api/core";
import { setShowMessage } from "redux/slices/uiSlice";

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
    const url = baseUrl + `/?customer_id=2`
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
