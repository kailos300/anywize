import { createSlice, createSelector } from "@reduxjs/toolkit";
import { coreApi } from "api/core";
import { setShowMessage } from "redux/slices/uiSlice";

const baseUrl = "/orders";
const initialState = {
  orders: {},
  order: null,
  loading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addNewOrder: (state, action) => {

      const { _id } = action.payload;
      state.orders[_id] = action.payload;
      state.order = action.payload;
    },
    setEditOrder: (state, action) => {
      const { id } = action.payload;
      state.orders[id] = action.payload;
      state.order = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setOrders: (state, action) => {
      const orders = {};
      action.payload.forEach((order) => {
        orders[order.id] = order;
      });
      state.orders = orders;
    },
    removeOrder: (state, action) => {
      delete state.orders[action.payload];
    },
    setOrderLoading: (state) => {
      state.loading = true;
    },
    setOrderReady: (state) => {
      state.loading = false;
    },
  },
});

export const {
  setOrder,
  setOrders,
  addNewOrder,
  setEditOrder,
  removeOrder,
  setOrderLoading,
  setOrderReady,
} = orderSlice.actions;
export default orderSlice.reducer;

export const getOrder = (id) => async (dispatch) => {
  const url = baseUrl + `/${id}`;
  dispatch(setOrderLoading());

  try {
    const res = await coreApi.fetch(url);
    dispatch(setOrder(res));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setOrderReady());
  }
};

export const getOrders = () => async (dispatch) => {
  dispatch(setOrderLoading());

  try {
    const orders = await coreApi.fetch(baseUrl);
    dispatch(setOrders(orders));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setOrderReady());
  }
};

export const addOrder = (payload) => async (dispatch) => {
  dispatch(setOrderLoading());

  try {
    const order = await coreApi.post(baseUrl, payload);
    dispatch(addNewOrder(order));

    return order;
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setOrderReady());
  }
};

export const editOrder = (id, payload) => async (dispatch) => {
  const url = baseUrl + `/${id}`;
  dispatch(setOrderLoading());

  try {
    const res = await coreApi.put(url, payload);

    if (res) {
      dispatch(setEditOrder({ ...payload, id }));
      dispatch(
        setShowMessage({
          description: "Edited ORDER Successfully",
          type: "success",
        })
      );
    }
  } catch (err) {
    console.log(err);
    dispatch(
      setShowMessage({
        description:
          err.message ?? "Failed editing order. Please try again later",
        type: "error",
      })
    );
  } finally {
    dispatch(setOrderReady());
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  const url = baseUrl + `/${id}`;
  dispatch(setOrderLoading());

  try {
    const res = await coreApi.delete(url);

    if (res) {
      dispatch(
        setShowMessage({
          description: "DELETED ORDER Successfully",
          type: "success",
        })
      );
      dispatch(removeOrder(id));
      dispatch(getOrders());
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setOrderReady());
  }
};

const orderSelector = ({ orders }) => orders.order;
const ordersSelector = ({ orders }) => orders.orders;
const orderStatusSelector = ({ orders }) => orders.loading;

export const selectOrder = createSelector(orderSelector, (order) => order);
export const selectOrders = createSelector(ordersSelector, (orders) =>
  Object.values(orders)
);
export const selectOrderStatus = createSelector(
  orderStatusSelector,
  (loading) => loading
);
