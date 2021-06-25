import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MapIcon from '@material-ui/icons/Map';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';

import CallSplitIcon from '@material-ui/icons/CallSplit';
import StoreIcon from '@material-ui/icons/Store';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { MID_NAVIGATION_ROUTES } from 'constants/ui-constants'
import logo from 'assets/img/logo.png';


const drawerWidth = 301;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        position: 'absolute',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,

    },
    drawerPaper: {
        width: drawerWidth,
        background: '#000000',
        color: 'white'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function Bar(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            <CssBaseline />
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, props.open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={props.open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <img style={{ width: '163.27px' }} src={logo} />
                    <IconButton onClick={props.handleDrawerClose}>
                        {theme.direction === 'ltr' ? <CloseIcon style={{ color: 'white ' }} /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider style={{ background: '#545454' }} />
                <List>
                    {['Maps', 'Past Deliveries', 'New Orders'].map((text, index) => (
                        <Link key={text} className={'NabBarItems'} to="/dash">
                            <ListItem button>
                                <ListItemIcon style={{ color: 'white ' }}>{index % 2 === 0 ? <MapIcon /> : <MarkunreadMailboxIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider style={{ background: '#545454' }} />
                <List>
                    {MID_NAVIGATION_ROUTES.map((text, index) => (
                        <Link key={text.name} className={'NabBarItems'} to={text.path}>
                            <ListItem button>
                                <ListItemIcon style={{ color: 'white ' }}>{index % 2 === 0 ? <StoreIcon /> : <CallSplitIcon />}</ListItemIcon>
                                <ListItemText primary={text.name} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
