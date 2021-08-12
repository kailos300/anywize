import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';

//Actions
import {
  selectCurrent,
  selectRouteStatus,
  getCurrentRoutes,
  getRoute,
} from 'redux/slices/routeSlice';
import Loading from 'components/Shared/loading';
import MapSidebar from 'components/Routes/MapSidebar';
import Map from 'components/Maps/Map';

const useStyles = makeStyles((theme) => ({
  _container: {
    backgroundColor: '#121212',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
}));

const RoutesMap = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory();
  const { t } = useTranslation("common");
  const routes = useSelector(selectCurrent);
  const loading = useSelector(selectRouteStatus);
  const [selected, setSelected] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  useEffect(() => {
    if (!loading) {
      dispatch(getCurrentRoutes());
    }
  }, []);

  const onRouteSelect = async (route) => {
    const full = await dispatch(getRoute(route.id));

    setSelected(selected.concat([route.id]));
    setSelectedRoutes([full].concat(selectedRoutes));
  };

  return (
    <div className={clsx(classes._container, '')}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <MapSidebar
            routes={routes.filter((r) => !selected.includes(r.id))}
            selectedRoutes={selectedRoutes}
            onSelect={onRouteSelect}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Map routes={selectedRoutes} />
        </Grid>
      </Grid>
    </div>
  );
}

export default RoutesMap;
