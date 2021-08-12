import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ReactMapGL, { Source, Marker, Layer } from 'react-map-gl';
import MarkerIconGray from './markers/marker-icon-grey.png';
import MarkerIconBlue from './markers/marker-icon-blue.png';
import MarkerIconRed from './markers/marker-icon-red.png';
import MarkerIconOrange from './markers/marker-icon-orange.png';

const MAPBOX_API_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;
const MAPBOX_MAP_STYLE = process.env.REACT_APP_MAPBOX_MAP_STYLE;

const styles = makeStyles((theme) => ({
  marker: {
    backgroundColor: 'gray',
    width: '20px',
    height: '20px',
    position: 'relative',
    borderRadius: '10px',
    cursor: 'pointer',

    '& img': {
      visibility: 'hidden',
      opacity: 0,
      position: 'absolute',
      top: '-42px',
      left: '-2px',
    },

    '&:hover': {
      '& img': {
        visibility: 'visible',
        opacity: 1,
        transition: 'visibility 0s, opacity 0.1s linear',
      },
    },
  },
  markerBlue: {
    backgroundColor: 'blue',
  },
  markerGreen: {
    backgroundColor: 'green',
  },
  markerRed: {
    backgroundColor: 'red',
  },
  markerOrange: {
    backgroundColor: 'orange',
  },
}));

export const Pin = ({ color }) => {
  if (color === 'red') {
    return (<img src={MarkerIconRed} />);
  }

  if (color === 'blue') {
    return (<img src={MarkerIconBlue} />);
  }

  if (color === 'orange') {
    return (<img src={MarkerIconOrange} />);
  }

  return (<img src={MarkerIconGray} />);
};

export const CustomMarker = ({ lat, lng, color = 'gray', pinColor, onClick }) => {
  const classes = styles();

  return (
    <Marker latitude={lat} longitude={lng}>
      <div
        className={clsx(classes.marker, {
          [classes.markerBlue]: color === 'blue',
          [classes.markerRed]: color === 'red',
          [classes.markerGreen]: color === 'green',
          [classes.markerOrange]: color === 'orange',
        })}
        onClick={onClick}
      >
        <Pin color={pinColor} />
      </div>
    </Marker>
  );
};

export const Markers = ({ route, onClick }) => {
  return (
    <>
      {
        route.pathway
          .filter((p) => {
            return p.Orders.some((o) => !o.delivered_at);
          })
          .map((pathway, i) => {
            return (
              <CustomMarker
                lat={pathway.latitude} lng={pathway.longitude}
                key={i}
                pinColor="gray"
                onClick={() => onClick(route, pathway)}
              />
            );
          })
      }
      {
        route.Stops.map((stop, i) => {
          const pathway = route.pathway.find((p) => p.id === stop.customer_id);

          return (
            <CustomMarker
              lat={pathway.latitude} lng={pathway.longitude}
              key={i}
              color={stop.goods_back ? 'red' : 'blue'}
              pinColor={stop.goods_back ? 'red' : 'blue'}
              onClick={() => onClick(route, pathway)}
            />
          );
        })
      }
    </>
  );
};

export default ({ routes }) => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 80px)',
    latitude: -33.6831263,
    longitude: -59.6579517,
    zoom: 15,
  });

  const onMarkerClick = (pathway) => {
    console.log(pathway);
  };

  const layerStyle = {
    id: 'line',
    type: 'line',
    paint: {
      'line-color': '#fff',
      'line-width': 6,
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
  };

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle={MAPBOX_MAP_STYLE}
      mapboxApiAccessToken={MAPBOX_API_ACCESS_TOKEN}
    >
      {
        routes.map((route, i) => (
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
            <CustomMarker
              lat={last.location.coordinates[1]} lng={last.location.coordinates[0]}
              key={i}
              color="orange"
              pinColor="orange"
              onClick={() => { }}
            />
          );
        })
      }
      {
        routes.map((route, i) => (
          <Source
            key={i}
            id="my-data"
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features: route.RoutesNavigations.map((rn) => ({
                type: 'Feature',
                geometry: rn.navigation.routes[0].geometry,
              })),
            }}
          >
            <Layer {...layerStyle} />
          </Source>
        ))
      }

    </ReactMapGL>
  );
};
