import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

// Helpers
import { PATHS } from 'util/appConstants';

// Actions
import { selectTour, selectTourStatus, getTour, editTour } from 'redux/slices/tourSlice';
import { setShowMessage } from 'redux/slices/uiSlice';

// Components
import TourForm from 'components/Tours/form';

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
    }, [ id]);
  
    const handleEditTour = async (id, payload) => {
      console.log(id,payload)
      await dispatch(editTour(id, payload));
  
      dispatch(setShowMessage({
        description: 'Tour Edited Successfully!',
        type: 'success',

      }));
  
      history.push(PATHS.tours.root);
    };
  
    if (loading || !tour) return <div>Loading..</div>;
    return (
        <TourForm
        initialValues={tour}
        handleEditTour={handleEditTour}
        action={currentAction}
    />
    );
  };
  
  export default EditTour;
  