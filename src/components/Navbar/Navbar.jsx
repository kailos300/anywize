import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from "clsx";
//assets
import logo from "assets/img/logo.png";

// constants
import { NAVIGATION_ROUTES } from "constants/ui-constants";
import { PATHS } from "util/appConstants";

const useStyles = makeStyles({
  _container: {
    backgroundColor: "#121212",
    height: "72px",
    padding: "0 130px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
});
const Navbar = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();

  return (
    <header className={classes._container}>
      <Link to={PATHS.tours.current}>
        <img className={classes._img} src={logo} alt="anywize logo" />
      </Link>
      <List className={classes._nav} component="nav">

        {console.log(location)}
        {NAVIGATION_ROUTES.map((item, index) => (
          <ListItem
            activeClassName={location.pathname == item.path ? classes._isactive : ''}
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
              {item.name === 'Settings' ? < SettingsIcon className={'_settingicon'} /> : t(item.name)}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </header>
  );
};
export default Navbar;
