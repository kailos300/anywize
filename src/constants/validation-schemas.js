import * as yup from 'yup';

export const TourSchema = yup.object().shape({

});

export const CustomerSchema = yup.object().shape({
    tour_id: yup.string().required('Required'),
    tour_position: yup.string().required('Required'),
    name: yup.string().required('Required'),
    alias: yup.string().required('Required'),
    street: yup.string().required('Required'),
    street_number: yup.string().required('Required'),
    city: yup.string().required('Required'),
    zipcode: yup.string().required('Required'),
    country: yup.string().required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    phone: yup.string().required('Required'),
    latitude: yup.string().required('Required'),
    longitude: yup.string().required('Required'),
});

export const OrderSchema = yup.object().shape({

});