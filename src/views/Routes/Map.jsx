import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';

//Actions
import {
  selectCurrent,
  selectRouteStatus,
  getCurrentRoutes,
  getRoute,
} from 'redux/slices/routeSlice';
import { selectUser } from 'redux/slices/userSlice';
import MapSidebar from 'components/Routes/MapSidebar';
import Map from 'components/Routes/Map';
import Stop from 'components/Routes/Stop';

const useStyles = makeStyles((theme) => ({
  _container: {
    backgroundColor: '#121212',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}));

const RoutesMap = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { routeId, customerId } = useParams();
  const timeout = useRef(null);
  const routes = useSelector(selectCurrent);
  const loading = useSelector(selectRouteStatus);
  const user = useSelector(selectUser);
  const [selected, setSelected] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [highlighted, setHighlighted] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [initialFetch, setInitialFetch] = useState(false);

  const refreshSelected = async () => {
    let i = 0;

    const refreshed = [];

    while (i < selected.length) {
      const r = await dispatch(getRoute(selected[i]));

      refreshed.push(r);
      i += 1;
    }

    setSelectedRoutes(refreshed);
  };

  const fetchFavourites = async () => {
    setInitialFetch(true);

    let routesThatAreFavourite = [];

    if (routeId) {
      routesThatAreFavourite.push(routeId);
    } else {
      let favourites = localStorage.getItem('current-tours-favourites');
      favourites = favourites ? favourites.split(',') : [];
      favourites = favourites.map(Number);

      routesThatAreFavourite = routes.filter((r) => favourites.includes(r.id))
        .map((r) => r.id);
    }

    let i = 0;
    const initiallySelected = [];

    while (i < routesThatAreFavourite.length) {
      try {
        const full = await dispatch(getRoute(routesThatAreFavourite[i]));

        initiallySelected.push(full);
      } catch (err) { }

      i += 1;
    }

    setSelected(routesThatAreFavourite);
    setSelectedRoutes(initiallySelected);
  };

  useEffect(() => {
    if (routes.length && !initialFetch) {
      fetchFavourites();
    }
  }, [routes, initialFetch]);

  useEffect(() => {
    if (!loading) {
      dispatch(getCurrentRoutes());
    }

    return () => {
      clearTimeout(timeout.current);
    };
  }, []);

  useEffect(() => {
    if (selectedRoutes.length && parseInt(routeId, 10) === selectedRoutes[0].id && parseInt(customerId, 10) && initialFetch) {
      openStop(selectedRoutes[0].id, parseInt(customerId, 10));
    }

    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => refreshSelected(), 30000);
  }, [selectedRoutes, initialFetch]);

  const onRouteSelect = async (route, addAsFavourite = true) => {
    const full = await dispatch(getRoute(route.id));

    if (addAsFavourite) {
      let favourites = localStorage.getItem('current-tours-favourites');
      favourites = favourites ? favourites.split(',') : [];
      favourites = favourites.concat([route.id]);
      localStorage.setItem('current-tours-favourites', favourites.join(','));
    }

    setSelected([route.id].concat(selected));
    setSelectedRoutes([full].concat(selectedRoutes));
  };

  const onRouteRemove = async (route) => {
    setSelected(selected.filter((id) => id !== route.id));
    setSelectedRoutes(selectedRoutes.filter((r) => r.id !== route.id));
  };

  const highlightRoute = (id) => setHighlighted(id);

  const openStop = (route_id, customer_id) => {
    const route = selectedRoutes.find((r) => r.id === route_id);

    if (!route) {
      return;
    }

    const customer = route.pathway.find((p) => p.id === customer_id);

    if (!customer) {
      return;
    }

    setSelectedStop({ route, customer });
  };

  const closeStop = () => setSelectedStop(null);

  return (
    <div className={clsx(classes._container, '')}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          {
            !!selectedStop && (
              <Stop
                route={selectedStop.route}
                customer={selectedStop.customer}
                onClose={closeStop}
              />
            )
          }
          {
            !selectedStop && (
              <MapSidebar
                routes={routes.filter((r) => !selected.includes(r.id))}
                selectedRoutes={selectedRoutes}
                selectedRoutesIds={selected}
                onSelect={onRouteSelect}
                onRemove={onRouteRemove}
                highlightRoute={highlightRoute}
                highlightedRouteId={highlighted}
              />
            )
          }
        </Grid>
        <Grid item xs={12} sm={9}>
          <Map
            routes={selectedRoutes}
            highlightRoute={highlightRoute}
            highlightedRouteId={highlighted}
            openStop={openStop}
            user={user}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default RoutesMap;
