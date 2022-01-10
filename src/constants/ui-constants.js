import MapIcon from '@material-ui/icons/Map';
import StarRateIcon from '@material-ui/icons/StarRate';
import CallSharpIcon from '@material-ui/icons/CallSharp';
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';
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
  { title: 'ID', field: 'number', defaultSort: 'desc', sorting: true },
  { title: 'Alias', field: 'alias' },
  { title: 'Name 1', field: 'name' },
  { title: 'Zipcode', field: 'zipcode' },
  { title: 'City', field: 'city' },
  { title: 'Tour', field: 'Tour.name' },
  { title: 'Tour position', field: 'tour_position' },
];

export const PAST_DELIVERIES_TABLE_COLUMNS = [
  { title: 'Customer alias', field: 'alias' },
  { title: 'Customer name 1', field: 'name' },
  { title: 'Tour', field: 'Tour.id' },
  { title: 'Tour Name', field: 'Tour.name' },
];

export const ORDERS_TABLE_COLUMNS = (checkChangeHandler, t) => {
  return [
    { title: 'Order id', render: rowData => <span style={{ fontSize: '15px', fontWeight: 500 }}>T{rowData.Tour.id}</span> },
    { title: 'Description', field: 'Tour.name' },
    { title: '', render: rowData => <span style={{ color: '#6F9CEB' }}> {rowData.orders.length}<span style={{ marginLeft: '15px' }}>{ } {t('New orders')}</span></span> },
    { title: '', field: '' },

    {
      title: 'Id+1',
      render: rowData => <div style={{ textAlign: 'right', marginRight: '12px', marginTop: '-20px' }}>
        <input onChange={(e) => checkChangeHandler(e, rowData)}
          className={'radio-checkbox'} id={rowData.id} type='checkbox' name='field' checked={rowData.mainCheck} />
        <label htmlFor={rowData.id}><span><span style={{ margin: '1px' }}></span></span></label>
      </div>
    },
  ];
}

export const CURRENT_TOURS_COLUMNS = (tableRef, markFavourite, redirectView, t) => {
  return [
    {
      title: 'icon',
      render: (rowData) => (
        <div style={{ display: 'flex' }}>
          {
            !!markFavourite && (
              <StarRateIcon
                onClick={(e) => markFavourite(e, rowData)}
                style={{ color: rowData.is_favourite ? '#6F9CEB' : '#ADADAD', cursor: 'pointer' }}
              />
            )
          }
          <MapIcon
            onClick={() => redirectView(null, rowData)}
            style={{ color: '#ADADAD', cursor: 'pointer' }}
          />
        </div>
      ),
      customFilterAndSearch: (v, row) => {
        const regex = new RegExp(v, 'gi');

        return regex.test(row.pathway
          .map((p) => `${p.email} ${p.phone} ${p.street} ${p.city} ${p.alias} ${p.name}`)
          .concat([row.uuid])
          .join(' '));
      }
    },
    {
      title: 'date',
      render: (rowData) => {
        if (!rowData.start_date) {
          return '-';
        }

        return (
          <>
            <span style={{ font: 'normal normal bold 18px/24px Roboto', color: '#F5F5F5' }}>
              {moment(rowData.start_date).format('DD.MM.YYYY')} {moment(rowData.start_date).format('HH:mm')}
            </span>
          </>
        );
      }
    },
    { title: 'tour', field: 'tour', render: rowData => <span >T.{rowData.uuid}</span> },
    {
      title: 'name', render: rowData => rowData.Tour.name,
    },
    {
      title: 'progress', render: rowData => {
        if (rowData.progress === 'Complete') {
          return (
            <span style={{ color: '#6F9CEB', font: 'normal normal normal 18px/24px Roboto' }}>
              {t(rowData.progress)}
              <small style={{ display: 'block' }}>
                {moment(rowData.end_date).format('DD.MM.YYYY')} {moment(rowData.end_date).format('HH:mm')}
              </small>
            </span>
          )
        }

        return (
          <span style={{ font: 'normal normal normal 18px/24px Roboto', color: '#F5F5F5' }}>{t(rowData.progress)}</span>
        )
      }
    },
    {
      title: 'noOfOrders',
      render: rowData => `${rowData.pathway.filter((p) => p.Orders.every((o) => o.delivered_at)).length} / ${rowData.pathway.length}`,
    },
    {
      title: 'DriversName',
      field: 'driver_name',
      render: rowData => <span style={{ font: 'normal normal bold 18px/24px Roboto', color: '#F5F5F5' }}>{rowData.driver_name || '-'}</span>,

    },
    {
      title: 'call',
      render: rowData =>
        <>
          {rowData.driver_name !== null ?
            <Tooltip title={<TooltipBar name={'callicon'} rowData={rowData} />} placement='top' arrow interactive >
              <CallSharpIcon className={'hovericon'} />
            </Tooltip>
            :
            <CallSharpIcon className={'disabled-btn'} disabled={true} />}
        </>
    },
    {
      title: 'key',
      render: rowData =>
        <Tooltip title={<TooltipBar name={'vpnicon'} rowData={rowData} />} placement='top' arrow interactive>
          <VpnKeySharpIcon className={'hovericon'} />
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
