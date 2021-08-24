import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { PATHS } from 'util/appConstants';

import { selectTourStatus, addTour } from 'redux/slices/tourSlice';
import { setShowMessage } from 'redux/slices/uiSlice';

import TourForm from 'components/Tours/form';
import Loading from 'components/Shared/loading';

const currentAction = 'ADD';

const AddTour = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectTourStatus);

  const onSubmit = async (payload) => {
    await dispatch(addTour(payload));

    dispatch(
      setShowMessage({
        description: 'Tour Added Successfully!',
        type: 'success',
      })
    );

    history.push(PATHS.tours.root);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <TourForm
      onSubmit={onSubmit}
      action={currentAction}
    />
  );
};

export default AddTour;
