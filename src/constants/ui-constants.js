import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MapIcon from '@material-ui/icons/Map';
import StarRateIcon from '@material-ui/icons/StarRate';
import CallIcon from '@material-ui/icons/Call';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
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
export const MASTER_DATA_BAR = {
  name: 'Master Data',
  list: [
    { name: 'Customers', path: PATHS.customers.root },
    { name: 'Tours', path: PATHS.tours.root }
  ]
}
export const TOUR_DATA_BAR = {
  name: 'Tours',
  list: [
    { name: 'Current tours', path: PATHS.tours.current },
    { name: 'Recently finished tours', path: PATHS.tours.recent },
    { name: 'Archive tours', path: PATHS.tours.archive }

  ]
}
export const NAVIGATION_ROUTES = [
  { name: "Tours", path: PATHS.tours.current },
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

export const ORDERS_TABLE_COLUMNS = (checkChangeHandler) => {
  return [
    { title: "Order id", field: "name" },
    { title: "Description", field: "description" },
    {
      title: "Id+1",
      render: rowData => <div style={{ textAlign: 'right', marginRight: '28px' }}>
        <input onChange={(e) => checkChangeHandler(e, rowData)}
          className={'radio-checkbox'} id={rowData.id} type="checkbox" name="field" checked={rowData.mainCheck} />
        <label for={rowData.id}><span><span style={{ margin: '1px' }}></span></span></label>
      </div>
    },
  ];
}

export const CURRENT_ORDER_COLUMNS = (tableRef) => {
  return [
    {
      title: 'icon', render: rowData => <div>
        <StarRateIcon style={{ color: rowData.tableData.showDetailPanel ? '#6F9CEB' : '' }} />
        <MapIcon />
      </div>
    },
    { title: 'date', field: 'date' },
    { title: 'time', field: 'time' },
    { title: 'tour', field: 'tour' },
    { title: 'name', field: 'name' },
    { title: 'progress', field: 'progress' },
    { title: 'noOfOrders', field: 'noOfOrders' },
    { title: 'DriversName', field: 'DriversName' },
    { title: 'call', render: rowData => <CallIcon /> },
    {
      title: 'key', render: rowData =>
        <VpnKeyIcon style={{ color: rowData.tableData.showDetailPanel ? '#6F9CEB' : '' }} className={'vpnkey'} />
    },
    // {
    //   title: 'keyw', render: rowData =>
    //     <>
    //       <div style={{ background: "#6F9CEB", width: "100px", height: '100px' }}>

    //       </div>

    //     </>
    // }


  ]
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
export const checkTourPaths = [
  PATHS.tours.current,
  PATHS.tours.recent,
  PATHS.tours.archive
]