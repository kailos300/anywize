import React from 'react'
import { makeStyles } from "@material-ui/core/styles";

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MapIcon from '@material-ui/icons/Map';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import MyLocationRoundedIcon from '@material-ui/icons/MyLocationRounded';
import NoteAddRoundedIcon from '@material-ui/icons/NoteAddRounded';



// owl carousel
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const useStyles = makeStyles({
    _box: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 15px',
        border: '1px solid transparent',
        cursor: 'pointer',
        // "&:hover": {
        //     borderColor: "#6F9CEB",
        // },
    },
    _routename: {
        font: 'normal normal normal 18px/24px Roboto',
        color: '#F5F5F5'
    },
    _customername: {
        font: 'normal normal normal 22px/40px Questrial',
        color: '#F5F5F5',
        display: 'block',
        margin: '20px 0'

    },
    _routedetails: {
        display: 'flex',
        alignItems: 'center',
        color: '#F5F5F5',
        font: 'normal normal normal 12px/24px Roboto',
        margin: '20px 0',
        lineHeight: '15px',
    },
    _left10: {
        marginLeft: '10px'
    },
    _galleryheading: {
        font: 'normal normal normal 18px/24px Roboto',
        color: '#F5F5F5'
    }
});
const Stopview = (props) => {
    const classes = useStyles();
    return (
        <div>
            {console.log(props)}
            <div>
                <span className={classes._routename}>T1.1 Routenamexy</span>
                <span className={classes._customername} >TestCustomer GmbH</span>
            </div>
            <div>
                <span className={classes._routedetails}>
                    <LocationOnIcon /><span className={classes._left10}>Taunusanlage 8 60329 Frankfurt am Main </span>
                </span>
                <span className={classes._routedetails}>
                    <PersonIcon /><span className={classes._left10}>Max Mustermann </span>
                </span>
                <span className={classes._routedetails}>
                    <EmailIcon /><span className={classes._left10}>Mustermann@gmail.com </span>
                </span>
                <span className={classes._routedetails}>
                    <CallIcon /><span className={classes._left10}>+49 69 170758330 </span>
                </span>

            </div>
            <h4 className={classes._galleryheading}>Fotos</h4>
            <OwlCarousel className='owl-theme' loop margin={10} nav dots={false}>
                <div class='item'>
                    <img src="https://picsum.photos/200/300" alt="" />
                </div>
                <div class='item'>
                    <img src="https://picsum.photos/200/300" alt="" />
                </div>
                <div class='item'>
                    <img src="https://picsum.photos/200/300" alt="" />

                </div>
                <div class='item'>
                    <img src="https://picsum.photos/200/300" alt="" />

                </div>
            </OwlCarousel>
            <h4 className={classes._galleryheading}>Nachweis</h4>
            <div>
                <span className={classes._routedetails}>
                    <NoteAddRoundedIcon /><span className={classes._left10}>Taunusanlage 8 60329 Frankfurt am Main </span>
                </span>
                <span className={classes._routedetails}>
                    <MyLocationRoundedIcon /><span className={classes._left10}>Max Mustermann </span>
                </span>
                <span className={classes._routedetails}>
                    <PersonIcon /><span className={classes._left10}>Mustermann@gmail.com </span>
                </span>
                <span className={classes._routedetails}>
                    <CallIcon /><span className={classes._left10}>+49 69 170758330 </span>
                </span>

            </div>
            <h4 className={classes._galleryheading}>Orders</h4>
            {[1, 1, 1].map((item, index) =>
                <Box className={classes._box} style={{ background: index % 2 == 0 ? ' #1F1F1F ' : '#525252', }}>
                    <Typography style={{ marginLeft: '10px', fontSize: '12px', alignSelf: 'baseline' }}>111qqqq1</Typography>
                    <Typography style={{ marginLeft: '10px', fontSize: '12px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</Typography>
                </Box>

            )}
        </div>
    )
}
export default Stopview;