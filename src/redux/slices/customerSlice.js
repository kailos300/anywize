import { createSlice, createSelector } from '@reduxjs/toolkit';
import * as map from 'lodash/map';
import * as extend from 'lodash/extend';
import { coreApi } from 'api/core';
import { setShowMessage } from 'redux/slices/uiSlice';

const baseUrl = '/customers';
const initialState = {
    customers: {},
    customer: null,
    loading: false,
};

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        addNewCustomer: (state, action) => {
            const { id } = action.payload;
            state.customers[id] = action.payload;
            state.customer = action.payload;
        },
        setEditCustomer: (state, action) => {
            const { id } = action.payload;
            state.customers[id] = action.payload;
            state.customer = action.payload;
        },
        setCustomer: (state, action) => {
            state.customer = action.payload;
        },
        setCustomers: (state, action) => {
            const customers = {};
            action.payload.forEach(customer => {
                customers[customer.id] = customer;
            });
            state.customers = customers;
        },
        removeCustomer: (state, action) => {
            delete state.customers[action.payload];
        },
        setCustomerLoading: (state) => {
            state.loading = true;
        },
        setCustomerReady: (state) => {
            state.loading = false;
        },
        emptyCustomers: (state) => {
            state.customers = {}
        }
    },
});

export const {
    setCustomer,
    setCustomers,
    addNewCustomer,
    setEditCustomer,
    removeCustomer,
    setCustomerLoading,
    setCustomerReady,
    emptyCustomers,
} = customerSlice.actions;
export default customerSlice.reducer;

export const getCustomer = (id) => async dispatch => {
    const url = baseUrl + `/${id}`;
    dispatch(setCustomerLoading());

    try {
        const res = await coreApi.fetch(url);
        dispatch(setCustomer(res));
    } catch (err) {
        console.log(err);
    } finally {
        dispatch(setCustomerReady());
    }
};

export const getCustomers = () => async dispatch => {
    dispatch(setCustomerLoading());

    try {
        const customers = await coreApi.fetch(baseUrl);
        console.log(customers)
        const newCustomers = map(customers, o => extend({ cityValue: `${o.zipcode}, ${o.city}` }, o))
        dispatch(setCustomers(newCustomers));
    } catch (err) {
        console.log(err);
    } finally {
        dispatch(setCustomerReady());
    }
};

export const addCustomer = (payload) => async dispatch => {
    dispatch(setCustomerLoading());

    try {
        const customer = await coreApi.post(baseUrl, payload);

        dispatch(addNewCustomer(customer));
        dispatch(emptyCustomers())
        dispatch(setShowMessage({
            description: 'Customer Added Successfully!',
            type: 'success',
        }));
        return customer;

    } catch (err) {
        console.log(err);
        dispatch(setShowMessage({
            description: "Can't Add! Customer",
            type: 'error',
        }));
    } finally {
        dispatch(setCustomerReady());
    }
};

export const editCustomer = (id, payload) => async dispatch => {
    const url = baseUrl + `/${id}`;
    dispatch(setCustomerLoading());

    try {
        const res = await coreApi.put(url, payload);
        if (res) {
            dispatch(setEditCustomer({ ...payload, id }));
            dispatch(emptyCustomers())

            dispatch(setShowMessage({
                description: 'Edited CUSTOMER Successfully',
                type: 'success',
            }));
        }
    } catch (err) {
        dispatch(setShowMessage({
            description: 'Failed editing customer. Please try again',
            type: 'error',
        }));
    } finally {
        dispatch(setCustomerReady());
    }
};

export const deleteCustomer = (id) => async dispatch => {
    const url = baseUrl + `/${id}`;
    dispatch(setCustomerLoading());

    try {
        console.log(url)

        const res = await coreApi.delete(url);
        console.log(res)

        if (res) {
            dispatch(setShowMessage({
                description: 'DELETED CUSTOMER Successfully',
                type: 'success',
            }));
            dispatch(removeCustomer(id));
        }
        dispatch(setShowMessage({
            description: "Can't DELETED CUSTOMER",
            type: 'error',
        }));
    } catch (err) {
        console.log(err);
    } finally {
        dispatch(setCustomerReady());
    }
};

const customerSelector = ({ customers }) => customers.customer;
const customersSelector = ({ customers }) => customers.customers;
const customerStatusSelector = ({ customers }) => customers.loading;

export const selectCustomer = createSelector(customerSelector, customer => customer);
export const selectCustomers = createSelector(customersSelector, customers => Object.values(customers));
export const selectCustomerStatus = createSelector(customerStatusSelector, loading => loading);