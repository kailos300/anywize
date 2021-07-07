import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//assets
import logo from 'assets/img/logo.png';

// constants
import { NAVIGATION_ROUTES } from 'constants/ui-constants';

const useStyles = makeStyles({
    _container: {
        backgroundColor: '#121212',
        height: '72px',
        padding: '0 130px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    _img: {
        width: '148px',
        height: '29px'
    },
    _menuitem: {
        textDecoration: 'none',
        color: '#F5F5F5',
        font: 'normal normal normal 22px / 40px Questrial',
        width: 'unset',
        display: 'unset'
    },
    _nav: {
        display: 'flex',
    }

})
const Navbar = () => {
    const classes = useStyles();

    return (
        <header className={classes._container}>
            <Link>
                <img className={classes._img} src={logo} alt="anywize logo" />
            </Link>
            <List className={classes._nav} component="nav">
                {NAVIGATION_ROUTES.map((item, index) =>
                    <ListItem  className={classes._menuitem} key={index} component={Link} to={item.path}>
                        <ListItemText>
                            {item.name}
                        </ListItemText>
                    </ListItem>)
                }
            </List>

        </header>
    )
}
export default Navbar;