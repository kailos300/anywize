import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MapIcon from '@material-ui/icons/Map';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import MyLocationRoundedIcon from '@material-ui/icons/MyLocationRounded';
import NoteAddRoundedIcon from '@material-ui/icons/NoteAddRounded';
import {
    TextField
} from "@material-ui/core";
// import SearchBar from "material-ui-search-bar";
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import mapboxgl from "mapbox-gl";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import clsx from "clsx";

//Actions
import { selectRoutes, getRoutes, getRoute, selectRouteStatus, selectRoute } from 'redux/slices/routeSlice';

// owl carousel
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

mapboxgl.accessToken =
    "pk.eyJ1IjoiaW5mZW5zIiwiYSI6ImNrcHJpd2t1czA4dHAyb21ucmEyN2hlNzAifQ.UqPpun5dr8HdvlPPrRvx6A";

const useStyles = makeStyles({
    _container: {
        backgroundColor: "#121212",
        height: "100vh",
        float: 'left',
        padding: '20px 40px',
        boxSizing: 'border-box',
        overflow: 'scroll',
        "&::-webkit-scrollbar": {
            display: 'none'
        },
        "& .MuiInput-underline:before": {
            borderBottom: "1px solid #525252",
        },

    },
    _searchbox: {
        display: 'flex',
        alignItems: 'center',
        width: '220px',
        justifyContent: 'space-between',
    },
    _box: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 15px',
        border: '1px solid transparent',
        cursor: 'pointer',
        "&:hover": {
            borderColor: "#6F9CEB",
        },

    },
    _search: {
        position: 'absolute',
        fontSize: '1.25em',
        color: 'white',

    },
    _cross: {
        marginLeft: '-20px',
        fontSize: '1.25em',
        color: 'white',
        cursor: 'pointer',
        position: 'relative'
    },
    _input: {
        width: '100%',
        "& .MuiInput-input": {
            padding: '6px 25px 7px',
            color: 'white',
        },
    },
    _1F1F1F: {
        background: '#1F1F1F',
    },
    _525252: {
        background: '#525252',
    },
    _6F9CEB: {
        color: '#6F9CEB'
    },
    _textalignright: {
        textAlign: 'right',
    },
    _edit: {
        background: '#6F9CEB',
        borderRadius: '50%',
        padding: '2px',
        width: '13px',
        height: '13px',
    },
    _pointer: {
        cursor: 'pointer'
    },
    _width111: '111px',
    _fontsize12: {
        fontSize: '12px',
        cursor: 'pointer'
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
export default function Maps() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [valuee, setvalue] = useState('');
    const routes = useSelector(selectRoutes)
    const route = useSelector(selectRoute);
    // const [tabledata, setTabledata] = useState([
    //     { id: '1', title: 'T1.1', name: 'Routennamexy' },
    //     { id: '2', title: 'T1.2', name: 'abcnnamexy' },
    //     { id: '3', title: 'T1.3', name: 'xyzennamexy' },
    //     { id: ' 4', title: 'T1.4', name: 'dertennamexy' },
    //     { id: '5', title: 'T2.1', name: 'Reredtennamexy' },
    //     { id: ' 6', title: 'T2.2', name: 'fdsfcennamexy' },
    //     { id: '7', title: 'T2.3', name: 'sfcefdnnamexy' },
    //     { id: ' 8', title: 'T3.1', name: 'grfdennamexy' },
    //     { id: '9', title: 'T3.2', name: '4534nnamexy' },
    //     { id: '10', title: 'T3.3', name: 'Rfdvfdnnamexy' },
    //     { id: '11', title: 'T3.4', name: 'bvbcennamexy' },
    //     { id: '12', title: 'T4.1', name: 'grehgtennamexy' },
    //     { id: '13', title: 'T4.2', name: 'htgreafwnnamexy' },
    //     { id: '14', title: 'T4.3', name: 'bgfgramexy' },
    //     { id: '15', title: 'T4.4', name: 'g5etrgfdnnamexy' },
    //     { id: '16', title: 'T4.5', name: 't45ersfmexy' },

    // ])
    const [tabledata, setTabledata] = useState(routes)
    const [Datasearch, setDatasearch] = useState(tabledata)
    // const [lng, setLng] = useState(-70.9);
    // const [lat, setLat] = useState(42.35);
    // const [zoom, setZoom] = useState(9);
    useEffect(() => {
        if (!routes.length) {
            dispatch(getRoutes());
        }
        setTabledata(routes);
        setDatasearch(routes);
    }, [dispatch, routes,])
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/infens/ckprj2dzt00zi19no4zckc7hv",
            center: [-122.486052, 37.830348],
            zoom: 15
        });
        console.log(map.current.on)
        map.current.on('load', function () {
            map.current.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [
                            [-122.483696, 37.833818],
                            [-122.483482, 37.833174],
                            [-122.483396, 37.8327],
                            [-122.483568, 37.832056],
                            [-122.48404, 37.831141],
                            [-122.48404, 37.830497],
                            [-122.483482, 37.82992],
                            [-122.483568, 37.829548],
                            [-122.48507, 37.829446],
                            [-122.4861, 37.828802],
                            [-122.486958, 37.82931],
                            [-122.487001, 37.830802],
                            [-122.487516, 37.831683],
                            [-122.488031, 37.832158],
                            [-122.488889, 37.832971],
                            [-122.489876, 37.832632],
                            [-122.490434, 37.832937],
                            [-122.49125, 37.832429],
                            [-122.491636, 37.832564],
                            [-122.492237, 37.833378],
                            [-122.493782, 37.833683]
                        ]
                    }
                }
            })

        })
        map.current.addControl(new mapboxgl.NavigationControl(
            {
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            }
        ), 'bottom-right')
        // map.current.addControl(
        //     new MapboxDirections({
        //         accessToken: mapboxgl.accessToken
        //     }),
        //     'top-left'
        // );
        setTimeout(() => {
            map.current.addSource('urban-areas', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    "geometry": {
                        'type': 'Polygon',
                        'coordinates': [
                            [
                                [-67.13734, 45.13745],
                                [-66.96466, 44.8097],
                                [-68.03252, 44.3252],
                                [-69.06, 43.98],
                                [-70.11617, 43.68405],
                                [-70.64573, 43.09008],
                                [-70.75102, 43.08003],
                                [-70.79761, 43.21973],
                                [-70.98176, 43.36789],
                                [-70.94416, 43.46633],
                                [-71.08482, 45.30524],
                                [-70.66002, 45.46022],
                                [-70.30495, 45.91479],
                                [-70.00014, 46.69317],
                                [-69.23708, 47.44777],
                                [-68.90478, 47.18479],
                                [-68.2343, 47.35462],
                                [-67.79035, 47.06624],
                                [-67.79141, 45.70258],
                                [-67.13734, 45.13745]
                            ]
                        ]
                    }
                }
            });
            map.current.addLayer({
                'id': 'urban-areas-fill',
                'type': 'line',
                'source': 'urban-areas',
                'layout': {},
                'paint': {
                    'line-color': '#6F9CEB',
                    'line-width': 4
                }
            });
        }, 1000);
    });
    const changeHandler = (e) => {
        setvalue(e.target.value)
    }
    const doSomethingWith = () => {
        let Datasearch = tabledata.filter(item => {
            return Object.keys(item).some(key =>
                item[key].toLowerCase().includes(valuee.toLowerCase())
            )
        })
        setDatasearch(Datasearch)
    }
    const clearSearch = () => {
        setvalue('')
        setDatasearch(tabledata)
    }
    const displayRoute = (item) => {
        console.log(item)
        dispatch(getRoute(item.id))
        console.log(route)
    }
    return (
        <div>
            <div style={{ width: '30%', display: 'inline-block' }} className={classes._container}>
                {/* <div className={classes._searchbox}>
                    <SearchIcon className={classes._search} />
                    <TextField placeholder={'search'} onKeyUp={doSomethingWith} onChange={(e) => changeHandler(e)} value={valuee} className={classes._input} />
                    <ClearIcon className={classes._cross} onClick={clearSearch} />
                </div>
                <Typography variant="h6" style={{ color: 'white', fontWeight: '200', margin: '30px 20px' }}>On Map</Typography>
                {[1, 1, 1].map((item, index) =>
                    <Box className={classes._box} style={{ background: index % 2 == 0 ? ' #1F1F1F ' : '#525252', }}>
                        <MapIcon className={classes._6F9CEB} />
                        <Typography style={{ marginLeft: '10px', fontSize: '12px' }}>T1.1</Typography>
                        <Typography style={{ marginLeft: '10px', fontSize: '12px' }}>Routennamexy</Typography>
                    </Box>

                )}

                <Typography variant="h6" style={{ color: 'white', fontWeight: '200', margin: '30px 20px' }}>All Tours</Typography>
                {Datasearch.map((item, index) =>
                    <Box onClick={() => displayRoute(item)} className={classes._box} style={{ background: index % 2 == 0 ? ' #1F1F1F ' : '#525252' }}>
                        <MapIcon />
                        <Typography style={{ marginLeft: '10px', fontSize: '12px' }}>T1.{index}</Typography>
                        <Typography style={{ marginLeft: '10px', fontSize: '12px' }}>{item.Tour.name}</Typography>

                    </Box>

                )} */}
                <div>
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
            </div>
            <div style={{ width: '70%', display: 'inline-block', minHeight: '100vh' }}>
                <div ref={mapContainer} className="map-container" />
            </div>
        </div>
    );
}
