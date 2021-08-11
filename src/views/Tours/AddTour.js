import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// Helpers
import { PATHS } from 'util/appConstants';

// Actions
import { selectTourStatus, addTour } from 'redux/slices/tourSlice';
import { setShowMessage } from 'redux/slices/uiSlice';

// Components
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

AddTour.propTypes = {
  initialValues: PropTypes.object.isRequired,
};
export default AddTour;
