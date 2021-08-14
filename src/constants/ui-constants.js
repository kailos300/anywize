import MapIcon from '@material-ui/icons/Map';
import StarRateIcon from '@material-ui/icons/StarRate';
import CallIcon from '@material-ui/icons/Call';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import TooltipBar from 'components/Tooltip';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import { PATHS } from 'util/appConstants';

export const MID_NAVIGATION_ROUTES = [
  { name: 'Customers', path: PATHS.customers.root },
  { name: 'Tours', path: PATHS.tours.root },
];

export const TOP_NAVIGATION_ROUTES = [
  { name: 'Maps', path: '/dash' },
  { name: 'Past Deliveries', path: '/dash' },
  { name: 'New Orders', path: PATHS.orders.root },
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
  { name: 'Tours', path: PATHS.tours.current },
  { name: 'Orders', path: PATHS.orders.root },
  { name: 'Past Deliveries', path: PATHS.pastdeliveries },
  { name: 'Master Data', path: PATHS.customers.root },
  { name: 'Map', path: PATHS.tours.map },
  { name: 'Settings', path: '/dash2' },
];
export const TOURS_TABLE_COLUMNS = [
  { title: 'Tour name', field: 'name' },
  { title: 'Tour ID', field: 'id' },
];

export const CUSTOMERS_TABLE_COLUMNS = [
  { title: 'ID', field: 'id', defaultSort: 'desc', sorting: true },
  { title: 'Alias', field: 'alias' },
  { title: 'Name 1', field: 'name' },
  { title: 'Zipcode', field: 'zipcode' },
  { title: 'City', field: 'city' },
  { title: 'Tour', field: 'Tour.name' },
  { title: 'Tour position', field: 'tour_position' },
];

export const PAST_DELIVERIES_TABLE_COLUMNS = [
  { title: 'Date', field: 'date' },
  { title: 'Time', field: 'time' },
  { title: 'Order Number', field: 'number' },
  { title: 'Order Description', field: 'description' },
  { title: 'Tour', field: 'tourid', render: rowData => rowData.Customer.Tour.id },
  { title: 'Tour Name', field: 'tourname', render: rowData => rowData.Customer.Tour.name },
  { title: 'Met Customer', field: 'metCustomer' },
];

export const ORDERS_TABLE_COLUMNS = (checkChangeHandler) => {
  return [
    { title: 'Order id', render: rowData => <span style={{ fontSize: '15px', fontWeight: 500 }}>T{rowData.tableData.id + 1}</span> },
    { title: 'Description', field: 'Tour.name' },
    { title: '', render: rowData => <span style={{ color: '#6F9CEB' }}> {rowData.length}<span style={{ marginLeft: '15px' }}>New Orders</span></span> },
    { title: '', field: '' },

    {
      title: 'Id+1',
      render: rowData => <div style={{ textAlign: 'right', marginRight: '28px', marginTop: '-20px' }}>
        <input onChange={(e) => checkChangeHandler(e, rowData)}
          className={'radio-checkbox'} id={rowData.id} type='checkbox' name='field' checked={rowData.mainCheck} />
        <label htmlFor={rowData.id}><span><span style={{ margin: '1px' }}></span></span></label>
      </div>
    },
  ];
}

export const CURRENT_TOURS_COLUMNS = (tableRef, markFavourite) => {
  return [
    {
      title: 'icon', render: rowData => <div>
        <StarRateIcon onClick={(e) => markFavourite(e, rowData)} style={{ color: rowData.is_favourite ? '#6F9CEB' : '#ADADAD', cursor: 'pointer' }} />
        <MapIcon style={{ color: '#ADADAD' }} />
      </div>
    },
    { title: 'date', render: rowData => rowData.start_date !== null ? moment(rowData.start_date).format('DD.MM.YYYY HH:mm') : '' },
    { title: 'tour', field: 'tour' },
    { title: 'name', render: rowData => rowData.Tour.name },
    {
      title: 'progress', render: rowData => {
        if (rowData.progress === 'Complete') {
          return <span style={{ color: '#6F9CEB' }}>{rowData.progress}</span>
        }
        else {
          return <span>{rowData.progress}</span>
        }
      }
    },
    { title: 'noOfOrders', render: rowData => `${rowData.Orders.filter((o) => o.delivered_at).length} / ${rowData.Orders.length}` },
    { title: 'DriversName', field: 'driver_name' },
    {
      title: 'call', render: rowData =>
        <Tooltip title={<TooltipBar name={'callicon'} rowData={rowData} />} placement='top' arrow interactive >
          <CallIcon className={'hovericon'} />
        </Tooltip>
    },
    {
      title: 'key', render: rowData =>
        <Tooltip title={<TooltipBar name={'vpnicon'} rowData={rowData} />} placement='top' arrow interactive>
          <VpnKeyIcon className={'hovericon'} />
        </Tooltip>
    },
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
