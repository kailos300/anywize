import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

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
        color: '#F5F5F5',
        font: 'normal normal normal 22px / 40px Questrial',
        width: 'unset',
        display: 'unset'
    },
    _nav: {
        display: 'flex',
    }

})
const Masterbar = () => {
    const classes = useStyles();

    return (
        <header className={classes._container}>
            <Typography className={classes._title} variant='h4'>Master Data</Typography>
            <List className={classes._nav} component="nav">
                <ListItem className={classes._menuitem} key={1} component={Link} to={'/'}>
                    <ListItemText>
                        {'Kunden'}
                    </ListItemText>
                </ListItem>
                <ListItem className={classes._menuitem} key={1} component={Link} to={'/'}>
                    <ListItemText>
                        {'Touren'}
                    </ListItemText>
                </ListItem>

            </List>

        </header>
    )

}
export default Masterbar;