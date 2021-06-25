import { PATHS } from "util/appConstants";

export const MID_NAVIGATION_ROUTES = [
  { name: 'Customers', path: PATHS.customers.root },
  { name: 'Tours', path: PATHS.tours.root },

];

export const TOURS_TABLE_COLUMNS = [
  { title: "Tour name", field: "name" },
  { title: "Tour ID", field: 'id' }
];

export const CUSTOMERS_TABLE_COLUMNS = [
  { title: "Name", field: "name" },
  { title: "Number", field: "number" },
  { title: "City",field:"cityValue"},
  { title: "Tour", field: "tour_id" },
  { title: "Tour Name", field: "tourName" },
  { title: "Position", field: "tour_position" },
  { title: "Contact", field: "contact" },
]