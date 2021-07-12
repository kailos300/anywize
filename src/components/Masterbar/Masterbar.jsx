import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { PATHS } from 'util/appConstants';


const useStyles = makeStyles({
    _container: {
        backgroundColor: '#1F1F1F',
        height: '72px',
        padding: '0 130px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    _title: {
        color: '#F5F5F5',
        font: 'normal normal normal 36px/40px Questrial'
    },
    _menuitem: {
        textDecoration: 'none',
        padding: 0,
        color: '#F5F5F5',
        font: 'normal normal normal 22px / 40px Questrial',
        width: 'unset',
        display: 'unset',
        margin: '0 16px',
    },
    _nav: {
        display: 'flex',
    },
    _nomargin: {
        margin: 0,
    },
    _isactive: {
        color: '#6F9CEB',
        borderBottom: '1px solid #6F9CEB'
    }

})
const Masterbar = () => {
    const classes = useStyles();

    return (
        <header className={classes._container}>
            <Typography className={classes._title} variant='h4'>Master Data</Typography>
            <List className={classes._nav} component="nav">
                <ListItem activeClassName={classes._isactive} className={classes._menuitem} key={1} component={NavLink} to={PATHS.customers.root}>
                    <ListItemText className={classes._nomargin}>
                        {'Kunden'}
                    </ListItemText>
                </ListItem>
                <ListItem activeClassName={classes._isactive} className={classes._menuitem} key={1} component={NavLink} to={PATHS.tours.root
                }>
                    <ListItemText className={classes._nomargin}>
                        {'Touren'}
                    </ListItemText>
                </ListItem>

            </List>

        </header>
    )

}
export default Masterbar;