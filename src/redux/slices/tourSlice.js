import { createSlice, createSelector } from "@reduxjs/toolkit";
import { coreApi } from "api/core";
import { setShowMessage } from "redux/slices/uiSlice";

const baseUrl = "/tours";
const initialState = {
  tours: {},
  tour: null,
  loading: false,
};

const tourSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {
    addNewTour: (state, action) => {
      const { _id } = action.payload;
      state.tours[_id] = action.payload;
      state.tour = action.payload;
    },
    setEditTour: (state, action) => {

      const { id } = action.payload;
      state.tours[id] = action.payload;
      state.tour = action.payload;
    },
    setTour: (state, action) => {

      state.tour = action.payload;
    },
    setTours: (state, action) => {

      const tours = {};
      action.payload.forEach((tour) => {
        tours[tour.id] = tour;
      });
      state.tours = tours;
    },
    removeTour: (state, action) => {
      console.log(state, "state");

      delete state.tours[action.payload];
    },
    setTourLoading: (state) => {
      console.log(state, "state");

      state.loading = true;
    },
    setTourReady: (state) => {
      console.log(state, "state");

      state.loading = false;
    },
  },
});

export const {
  setTour,
  setTours,
  addNewTour,
  setEditTour,
  removeTour,
  setTourLoading,
  setTourReady,
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
    dispatch(addNewTour(tour));

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

    if (res) {
      dispatch(setEditTour({ ...payload, id }));
      dispatch(
        setShowMessage({
          description: "Edited TOUR Successfully",
          type: "success",
        })
      );
    }
  } catch (err) {
    console.log(err);
    dispatch(
      setShowMessage({
        description:
          err.message ?? "Failed editing tour. Please try again later",
        type: "error",
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

    if (res) {
      dispatch(
        setShowMessage({
          description: "DELETED TOUR Successfully",
          type: "success",
        })
      );
      dispatch(removeTour(id));
    }
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
export const selectTours = createSelector(toursSelector, (tours) =>
  Object.values(tours)
);
export const selectTourStatus = createSelector(
  tourStatusSelector,
  (loading) => loading
);
