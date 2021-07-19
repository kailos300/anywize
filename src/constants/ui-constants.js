import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
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

export const ORDERS_TABLE_COLUMNS = (rowclick, checkChangeHandler) => {
  return [
    { title: "Order id", field: "name" },
    { title: "Description", field: "description" },
    {
      title: "Id+1",
      render: rowData => <div style={{ textAlign: 'right' }}>
        <input onChange={(e) => checkChangeHandler(e, rowData)}
          className={'radio-checkbox'} id={rowData.id} type="checkbox" name="field" checked={rowData.mainCheck} />
        <label for={rowData.id}><span><span></span></span></label>
      </div>
    },
    {
      title: "arrow",
      render: rowData => <div style={{ textAlign: 'right', cursor: 'pointer' }}>
        {rowData.tableData.showDetailPanel ?
          <ExpandLessIcon onClick={() => rowclick(rowData)} />
          :
          <ExpandMoreIcon onClick={() => rowclick(rowData)} />
        }
      </div>
    }
  ];
}

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
