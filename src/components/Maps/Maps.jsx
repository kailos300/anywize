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
        minHeight: "100vh",
        float: 'left',
        padding: '20px 40px',
        boxSizing: 'border-box',
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
    _search: {
        position: 'absolute',
        fontSize: '1.25em',
        color: 'white',

    },
    _cross: {
        marginLeft: '-20px',
        fontsize: '1.25em',
        color: 'white',
        cursor: 'pointer'
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
    const [value, setvalue] = useState('')
    // const [lng, setLng] = useState(-70.9);
    // const [lat, setLat] = useState(42.35);
    // const [zoom, setZoom] = useState(9);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/infens/ckprj2dzt00zi19no4zckc7hv",
            // center: [lng, lat],
            // zoom: zoom
        });
    });
    const doSomethingWith = (value) => {
        console.log(value)
    }
    return (
        <div>
            <div style={{ width: '30%', display: 'inline-block' }} className={classes._container}>
                <div className={classes._searchbox}>
                    <SearchIcon className={classes._search} />
                    <TextField placeholder={'search'} className={classes._input} />
                    <ClearIcon className={classes._cross} />
                </div>
                <Typography variant="h6" style={{ color: 'white', fontWeight: '200', margin: '30px 20px' }}>On Map</Typography>
                {[1, 1, 1].map((item, index) =>
                    <Box style={{ color: 'white', background: index % 2 == 0 ? ' #1F1F1F ' : '#525252', display: 'flex', alignItems: 'center', padding: '10px 15px' }}>
                        <MapIcon />
                        <Typography style={{ marginLeft: '10px', fontSize: '12px' }}>T1.1</Typography>
                        <Typography style={{ marginLeft: '10px', fontSize: '12px' }}>Routennamexy</Typography>

                    </Box>

                )}

                <Typography variant="h6" style={{ color: 'white', fontWeight: '200', margin: '30px 20px' }}>All Tours</Typography>
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) =>
                    <Box style={{ color: 'white', background: index % 2 == 0 ? ' #1F1F1F ' : '#525252', display: 'flex', alignItems: 'center', padding: '10px 15px' }}>
                        <MapIcon />
                        <Typography style={{ marginLeft: '10px', fontSize: '12px' }}>T1.1</Typography>
                        <Typography style={{ marginLeft: '10px', fontSize: '12px' }}>Routennamexy</Typography>

                    </Box>

                )}
            </div>
            <div style={{ width: '70%', display: 'inline-block' }}>
                <div ref={mapContainer} className="map-container" />
            </div>
        </div>
    );
}
