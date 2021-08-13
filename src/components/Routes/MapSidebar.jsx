import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import MapIcon from '@material-ui/icons/Map';

const styles = makeStyles((theme) => ({
  _box: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    border: '1px solid transparent',
    cursor: 'pointer',

    '&:hover': {
      borderColor: '#6F9CEB',
    },
  },
  textWhite: {
    color: '#FFF',
  },
  _6F9CEB: {
    color: '#6F9CEB'
  },
}));

export default ({ routes, selectedRoutes, onSelect }) => {
  const classes = styles();
  const { t } = useTranslation();

  return (
    <Box>
      <Box my={4}>
        <Typography className={classes.textWhite} variant="h6">
          {t('On map')}
        </Typography>
      </Box>
      {
        selectedRoutes.map((route, i) => {
          return (
            <Box className={classes._box} style={{ background: i % 2 == 0 ? ' #1F1F1F ' : '#525252', }} key={i}>
              <MapIcon className={classes._6F9CEB} />
              <Typography className={classes.textWhite} variant="body2">
                <Box component="span" mx={3}>{route.id}</Box> {route.Tour.name}
              </Typography>
            </Box>
          );
        })
      }
      <Box my={4}>
        <Typography className={classes.textWhite} variant="h6">
          {t('All tours')}
        </Typography>
      </Box>
      {
        routes.map((route, i) => {
          return (
            <Box
              className={classes._box}
              style={{ background: i % 2 == 0 ? ' #1F1F1F ' : '#525252', }}
              key={i}
              onClick={() => onSelect(route)}
            >
              <MapIcon className={classes._6F9CEB} />
              <Typography className={classes.textWhite} variant="body2">
                <Box component="span" mx={3}>{route.id}</Box> {route.Tour.name}
              </Typography>
            </Box>
          );
        })
      }
    </Box>
  )
};
