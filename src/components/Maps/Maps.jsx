import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MapIcon from '@material-ui/icons/Map';
import {
    TextField
} from "@material-ui/core";
// import SearchBar from "material-ui-search-bar";
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import mapboxgl from "mapbox-gl";
import clsx from "clsx";

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
    }
});
export default function Maps() {
    const classes = useStyles();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [valuee, setvalue] = useState('');
    const [tabledata, setTabledata] = useState([
        { id: '1', title: 'T1.1', name: 'Routennamexy' },
        { id: '2', title: 'T1.2', name: 'abcnnamexy' },
        { id: '3', title: 'T1.3', name: 'xyzennamexy' },
        { id: ' 4', title: 'T1.4', name: 'dertennamexy' },
        { id: '5', title: 'T2.1', name: 'Reredtennamexy' },
        { id: ' 6', title: 'T2.2', name: 'fdsfcennamexy' },
        { id: '7', title: 'T2.3', name: 'sfcefdnnamexy' },
        { id: ' 8', title: 'T3.1', name: 'grfdennamexy' },
        { id: '9', title: 'T3.2', name: '4534nnamexy' },
        { id: '10', title: 'T3.3', name: 'Rfdvfdnnamexy' },
        { id: '11', title: 'T3.4', name: 'bvbcennamexy' },
        { id: '12', title: 'T4.1', name: 'grehgtennamexy' },
        { id: '13', title: 'T4.2', name: 'htgreafwnnamexy' },
        { id: '14', title: 'T4.3', name: 'bgfgramexy' },
        { id: '15', title: 'T4.4', name: 'g5etrgfdnnamexy' },
        { id: '16', title: 'T4.5', name: 't45ersfmexy' },

    ])
    const [Datasearch, setDatasearch] = useState(tabledata)
    // const [lng, setLng] = useState(-70.9);
    // const [lat, setLat] = useState(42.35);
    // const [zoom, setZoom] = useState(9);
    useEffect(() => {
        console.log(map)
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/infens/ckprj2dzt00zi19no4zckc7hv",
            center: [-122.486052, 37.830348],
            zoom: 15
        });
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
        // map.current.addLayer({
        //     'id': 'route',
        //     'type': 'line',
        //     'source': 'route',
        //     'layout': {
        //         'line-join': 'round',
        //         'line-cap': 'round'
        //     },
        //     'paint': {
        //         'line-color': '#888',
        //         'line-width': 8
        //     }
        // });
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
    return (
        <div>
            <div style={{ width: '30%', display: 'inline-block' }} className={classes._container}>
                <div className={classes._searchbox}>
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
                    <Box className={classes._box} style={{ background: index % 2 == 0 ? ' #1F1F1F ' : '#525252' }}>
                        <MapIcon />
                        <Typography style={{ marginLeft: '10px', fontSize: '12px' }}>{item.title}</Typography>
                        <Typography style={{ marginLeft: '10px', fontSize: '12px' }}>{item.name}</Typography>

                    </Box>

                )}
            </div>
            <div style={{ width: '70%', display: 'inline-block', minHeight: '100vh' }}>
                <div ref={mapContainer} className="map-container" />
            </div>
        </div>
    );
}
