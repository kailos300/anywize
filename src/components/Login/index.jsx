import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import BackgroundImage from '../../assets/img/video.mp4';
import Logo from '../../assets/img/logo.png';
import Form from './form';

const styles = makeStyles((theme) => ({
  background: {
    height: '100%',
    backgroundRepeat: 'no-repeat',
    '-webkit-background-size': 'cover',
    '-moz-background-size': 'cover',
    '-o-background-size': 'cover',
    backgroundSize: 'cover',
  },
  formContainer: {
    backgroundColor: 'white'
  },

  logo: {
    height: '48px',
  },
  video: {
    objectFit: 'cover',
    width: ' 100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
  }
}));

const LoginIndex = ({ onSubmit, error }) => {
  const classes = styles();
  const { t } = useTranslation();

  return (
    <Box p={2} className={classes.background} style={{ height: '100%' }}>
      <video className={classes.video} playsinline autoplay muted loop id="bgvid">
        <source src={BackgroundImage} type="video/mp4" />
      </video>
      <Grid style={{ height: '100%' }} container spacing={2} justify="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Box textAlign="center">
            <img src={Logo} alt="logo" className={classes.logo} />
            <Box mt={2} p={2} className={classes.formContainer}>
              <Typography component="h3" variant="h5" align="center">
                {t('Log in')}
              </Typography>
              <Form onSubmit={onSubmit} />
              {
                !!error && (
                  <Alert severity="error">
                    {t(error)}
                  </Alert>
                )
              }
              {/* <Typography align="center" variant="body2">
                {t('You need help?')} <a href={"mailto:support@onecycle.io"}>{t('Contact the support')}</a>
              </Typography> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

LoginIndex.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default LoginIndex;
