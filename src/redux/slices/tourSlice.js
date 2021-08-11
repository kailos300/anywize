import { createSlice, createSelector } from '@reduxjs/toolkit';
import { coreApi } from 'api/core';
import { setShowMessage } from 'redux/slices/uiSlice';

const baseUrl = '/tours';
const initialState = {
  tours: [],
  tour: null,
  loading: false,
  timestamp: null,
};

const tourSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    setTour: (state, action) => {
      state.tour = action.payload;
    },
    setTours: (state, action) => {
      state.tours = action.payload;
      state.timestamp = +new Date();
    },
    setTourLoading: (state) => {
      state.loading = true;
    },
    setTourReady: (state) => {
      state.loading = false;
    },
    clearTours: (state) => {
      state.tours = [];
      state.tour = null;
      state.timestamp = null;
    },
  },
});

export const {
  setTour,
  setTours,
  setTourLoading,
  setTourReady,
  clearTours,
} = tourSlice.actions;
export default tourSlice.reducer;

export const getTour = (id) => async (dispatch) => {
  const url = baseUrl + `/${id}`;
  dispatch(setTourLoading());

  try {
    const res = await coreApi.fetch(url);
    dispatch(setTour(res));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setTourReady());
  }
};

export const getTours = () => async (dispatch) => {
  dispatch(setTourLoading());

  try {
    const tours = await coreApi.fetch(baseUrl);
    dispatch(setTours(tours));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setTourReady());
  }
};

export const addTour = (payload) => async (dispatch) => {
  dispatch(setTourLoading());

  try {
    const tour = await coreApi.post(baseUrl, payload);

    dispatch(clearTours());

    return tour;
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setTourReady());
  }
};

export const editTour = (id, payload) => async (dispatch) => {
  const url = baseUrl + `/${id}`;
  dispatch(setTourLoading());

  try {
    const res = await coreApi.put(url, payload);

    dispatch(clearTours());
    dispatch(
      setShowMessage({
        description: 'Edited TOUR Successfully',
        type: 'success',
      })
    );
  } catch (err) {
    dispatch(
      setShowMessage({
        description:
          err.message ?? 'Failed editing tour. Please try again later',
        type: 'error',
      })
    );
  } finally {
    dispatch(setTourReady());
  }
};

export const deleteTour = (id) => async (dispatch) => {
  const url = baseUrl + `/${id}`;
  dispatch(setTourLoading());

  try {
    const res = await coreApi.delete(url);

    dispatch(clearTours());
    dispatch(
      setShowMessage({
        description: 'DELETED TOUR Successfully',
        type: 'success',
      })
    );
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setTourReady());
  }
};

const tourSelector = ({ tours }) => tours.tour;
const toursSelector = ({ tours }) => tours.tours;
const tourStatusSelector = ({ tours }) => tours.loading;

export const selectTour = createSelector(tourSelector, (tour) => tour);
export const selectTours = createSelector(toursSelector, (tours) => tours);
export const selectTourStatus = createSelector(
  tourStatusSelector,
  (loading) => loading
);
export const selectTourTimestamp = createSelector(({ tours }) => tours.timestamp, t => t);
