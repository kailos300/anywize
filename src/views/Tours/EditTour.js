import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// Helpers
import { PATHS } from 'util/appConstants';

// Actions
import {
  selectTour,
  selectTourStatus,
  getTour,
  editTour,
} from 'redux/slices/tourSlice';

// Components
import TourForm from 'components/Tours/form';
import Loading from 'components/Shared/loading';

const currentAction = 'EDIT';

const EditTour = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const loading = useSelector(selectTourStatus);
  const tour = useSelector(selectTour);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (payload) => {
    await dispatch(editTour(id, payload));

    history.push(PATHS.tours.root);
  };

  if (loading || !tour) {
    return <Loading />
  }

  return (
    <TourForm
      initialValues={tour}
      onSubmit={onSubmit}
      action={currentAction}
    />
  );
};

export default EditTour;
