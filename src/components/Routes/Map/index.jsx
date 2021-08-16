import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Source, Marker, Layer, FlyToInterpolator, NavigationControl } from 'react-map-gl';
import MarkerHouse from 'assets/markers/house.png';
import MarkerTruck from 'assets/markers/truck.png';
import Markers from './Markers';

const MAPBOX_API_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;
const MAPBOX_MAP_STYLE = process.env.REACT_APP_MAPBOX_MAP_STYLE;

export default ({ routes, highlightRoute, highlightedRouteId, openStop }) => {
  const ref = useRef(null);
  const [total, setTotal] = useState(0);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 80px)',
    latitude: -33.6831263,
    longitude: -59.6579517,
    zoom: 15,
  });

  const onMarkerClick = (routeId, customerId) => {
    openStop(routeId, customerId);
  };

  useEffect(() => {
    if (routes.length && routes.length !== total) {
      let latitude = routes[0].pathway[0].latitude;
      let longitude = routes[0].pathway[0].longitude;

      if (routes[0].DriversLocations.length) {
        const last = routes[0].DriversLocations[routes[0].DriversLocations.length - 1];

        latitude = last.location.coordinates[1];
        longitude = last.location.coordinates[0];
      }

      setTotal(routes.length);
      setViewport({
        ...viewport,
        latitude,
        longitude,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  }, [routes, total]);

  const layerStyle = {
    id: 'line',
    type: 'line',
    paint: {
      'line-color': ['get', 'color'],
      'line-width': 6,
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
  };

  const suppliers = routes.reduce((acc, route) => {
    const included = acc.find((a) => a.id === route.Tour.Supplier.id);

    if (!included) {
      acc.push(route.Tour.Supplier);
    }

    return acc;
  }, []);

  const onHover = (e) => {
    if (e.features.length) {
      const navigation = e.features.find((f) => f.source === 'navigation');

      if (navigation) {
        return highlightRoute(navigation.id);
      }
    }

    highlightRoute(null);
  };


  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle={MAPBOX_MAP_STYLE}
      mapboxApiAccessToken={MAPBOX_API_ACCESS_TOKEN}
      onHover={onHover}
      ref={ref}
    >
      {
        suppliers.map((supplier, i) => (
          <Marker key={i} latitude={supplier.coordinates.coordinates[1]} longitude={supplier.coordinates.coordinates[0]}>
            <img src={MarkerHouse} />
          </Marker>
        ))
      }
      {
        viewport.zoom > 14 && routes.map((route, i) => (
          <Markers route={route} onClick={onMarkerClick} key={i} />
        ))
      }
      {
        routes.map((route, i) => {
          if (!route.DriversLocations.length) {
            return null;
          }

          const last = route.DriversLocations[route.DriversLocations.length - 1];

          return (
            <Marker key={i} latitude={last.location.coordinates[1]} longitude={last.location.coordinates[0]}>
              <img src={MarkerTruck} />
            </Marker>
          );
        })
      }
      <Source
        id="navigation"
        type="geojson"
        data={{
          type: 'FeatureCollection',
          features: routes.map((route) => {
            return {
              type: 'Feature',
              id: route.id,
              properties: {
                color: highlightedRouteId === route.id ? '#6F9CEB' : 'white',
              },
              geometry: {
                type: 'LineString',
                coordinates: route.RoutesNavigations.reduce((acc, cur) => {
                  return acc.concat(cur.navigation?.routes[0].geometry.coordinates);
                }, []),
              },
            };
          }),
        }}
      >
        <Layer {...layerStyle} />
      </Source>
      <NavigationControl style={{ bottom: 30, right: 20, backgroundColor: 'red' }} />
    </ReactMapGL>
  );
};
