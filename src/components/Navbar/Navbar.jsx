import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from "clsx";
//assets
import logo from "assets/img/logo.png";

// constants
import { NAVIGATION_ROUTES } from "constants/ui-constants";
import { PATHS } from "util/appConstants";
import { logout } from 'redux/slices/userSlice';

const useStyles = makeStyles({
  _container: {
    backgroundColor: "#121212",
    height: "72px",
    padding: "0 130px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: '0px 0px 4px #ffffff52',
    position: 'relative',
    zIndex: 1
  },
  _img: {
    width: "148px",
    height: "29px",
  },
  _menuitem: {
    textDecoration: "none",
    padding: 0,
    color: "#F5F5F5",
    width: "unset",
    display: "unset",
    margin: "0 16px",
    "& .MuiListItemText-primary": {
      font: "normal normal normal 22px / 40px Questrial",
    }
  },
  _nav: {
    display: "flex",
  },
  _nomargin: {
    margin: 0,
  },
  _isactive: {
    color: "#6F9CEB",
    borderBottom: "1px solid #6F9CEB",
  },
  _settingicon: {
    verticalAlign: 'middle',
    cursor: 'pointer',

    '&:hover': {
      transition: 'all 0.4s ease-in-out 0s',
      transform: 'rotate(0deg) !important',
      color: '#6F9CEB',
    },
  }
});

const Navbar = (props) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'de' ? 'en' : 'de');
    handleClose();
  };

  return (
    <header className={classes._container}>
      <Link to={PATHS.tours.current}>
        <img className={classes._img} src={logo} alt="anywize logo" />
      </Link>
      <List className={classes._nav} component="nav">
        {NAVIGATION_ROUTES.map((item, index) => {
          if (item.name === 'Settings') {
            return null;
          }

          return (
            <ListItem
              activeClassName={location.pathname === item.path ? classes._isactive : ''}
              className={clsx(
                classes._menuitem,
                ((props.checkTourPaths().includes(location.pathname) && item.name === "Tours") || (props.checkPaths().includes(location.pathname) && item.name === "Master Data"))
                  ? classes._isactive
                  : ""
              )}

              key={index}
              component={NavLink}
              to={item.path}
            >
              <ListItemText className={classes._nomargin}>
                {t(item.name)}
              </ListItemText>
            </ListItem>
          );
        })}
        <ListItem
          className={clsx(classes._menuitem)}
          onClick={handleClick}
        >
          <ListItemText className={classes._nomargin}>
            <SettingsIcon className={classes._settingicon} />
          </ListItemText>
        </ListItem>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          getContentAnchorEl={null}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <Typography component="span">
              EN
            </Typography>
            <Switch checked={i18n.language === 'de'} onChange={changeLanguage} />
            <Typography component="span">
              DE
            </Typography>
          </MenuItem>
          <MenuItem onClick={(e) => {
            e.preventDefault();

            dispatch(logout());
          }}>
            {t('Logout')}
          </MenuItem>
        </Menu>
      </List>
    </header>
  );
};

export default Navbar;
