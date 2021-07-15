import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
//assets
import logo from "assets/img/logo.png";

// constants
import { NAVIGATION_ROUTES } from "constants/ui-constants";

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
    font: "normal normal normal 22px / 40px Questrial",
    width: "unset",
    display: "unset",
    margin: "0 16px",
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
const Navbar = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const location = useLocation();

  return (
    <header className={classes._container}>
      <Link>
        <img className={classes._img} src={logo} alt="anywize logo" />
      </Link>
      <List className={classes._nav} component="nav">
        {NAVIGATION_ROUTES.map((item, index) => (
          <ListItem
            activeClassName={classes._isactive}
            className={clsx(
              classes._menuitem,
              location.pathname === "/tours" && item.name === "Master Data"
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
        ))}
      </List>
    </header>
  );
};
export default Navbar;
