export const PATHS = {
  root: '/',
  login: '/login',
  tours: {
    root: '/tours',
    add: '/tours/add',
    edit: '/tours/edit/:id',
    detail: '/tours/detail/:id',
    current: '/tours/current',
    recent: '/tours/recent',
    archive: '/tours/archive',
    map: '/tours/current/map',
  },
  customers: {
    root: '/customers',
    add: '/customers/add',
    edit: '/customers/edit/:id',
    detail: '/customers/detail/:id',
  },
  orders: {
    root: '/orders',
    add: '/orders/add',
    edit: '/orders/edit/:id',
  },
  pastdeliveries: '/pastdeliveries',
  customer: '/dash',
  dashboard: '/dashboard',
  addTour: '/tour/add',
  maps: '/map',
};

export const DEPOSIT_AGREEMENTS = {
  NONE: 'None',
  BRING_KEY: 'Bring key',
  KEY_BOX: 'Keybox',
};
