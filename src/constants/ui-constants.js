import { PATHS } from "util/appConstants";

export const MID_NAVIGATION_ROUTES = [
  { name: "Customers", path: PATHS.customers.root },
  { name: "Tours", path: PATHS.tours.root },
];

export const TOP_NAVIGATION_ROUTES = [
  { name: "Maps", path: "/dash" },
  { name: "Past Deliveries", path: "/dash" },
  { name: "New Orders", path: PATHS.orders.root },
];

export const NAVIGATION_ROUTES = [
  { name: "Tours", path: "/dash" },
  { name: "Orders", path: PATHS.orders.root },
  { name: "Master Data", path: PATHS.customers.root },
  { name: "Past Deliveries", path: "/dash1" },
  { name: "Maps", path: PATHS.maps },
  { name: "Settings", path: "/dash2" },
];
export const TOURS_TABLE_COLUMNS = [
  { title: "Tour name", field: "name" },
  { title: "Tour ID", field: "id" },
];

export const CUSTOMERS_TABLE_COLUMNS = [
  { title: "Group", field: "group" },
  { title: "ID", field: "id", defaultSort: "desc" },
  { title: "Name 1", field: "name" },
  { title: "City", field: "cityValue" },
  { title: "Last Invoice Date", field: "invioc" },
  { title: "Account Manager" },
  { title: "Billing Cycle" },
];

export const ORDERS_TABLE_COLUMNS = [
  { title: "Order id", field: "id" },
  { title: "Description", field: "description" },
];

export const checkPaths = [
  PATHS.tours.root,
  PATHS.tours.add,
  PATHS.tours.edit,
  PATHS.tours.detail,
  PATHS.customers.root,
  PATHS.customers.add,
  PATHS.customers.edit,
  PATHS.customers.detail,
];
