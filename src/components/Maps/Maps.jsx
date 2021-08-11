import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MapIcon from '@material-ui/icons/Map';
import {
	TextField
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import mapboxgl from "mapbox-gl";
import ReactMapGL, { Source, Marker, Layer } from 'react-map-gl';
import PolylineOverlay from './canva';
import clsx from "clsx";

import Stopview from '../Stopview';

//Actions
import { selectRoutes, getRoutes, selectRoute, getRoute } from 'redux/slices/routeSlice';

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
});
const layerStyle = {
	id: 'point',
	type: 'circle',
	paint: {
		'circle-radius': 10,
		'circle-color': '#007cbf'
	}
};
const geojson = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature', geometry: {
				type: 'Point', coordinates: [
					[-98.6805000695619, 45.52296157064603],
					[-96.24554057836872, 41.79401556575908],
					[-93.51305954520183, 37.83125069657875],
					[-90.17336050466702, 35.88809083427388],
					[-84.70839843833323, 37.229328042041914],
					[-98.1249478532394, 36.606494480659364],
				]
			}
		}
	]
};
export default function Maps(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory()
	const routes = useSelector(selectRoutes)
	const route = useSelector(selectRoute);
	const mapContainer = useRef(null);
	const parkLayer = {
		id: 'landuse_park',
		type: 'fill',
		source: 'mapbox',
		'source-layer': 'landuse',
		filter: ['==', 'class', 'park']
	};
	const map = useRef(null);
	const [valuee, setvalue] = useState('');
	const [tabledata, setTabledata] = useState(routes)
	const [Datasearch, setDatasearch] = useState(tabledata)
	const [stopView, setstopView] = useState(false);
	const [stopinfo, setstopinfo] = useState('')
	const [viewport, setViewport] = React.useState({
		latitude: 37.7577,
		longitude: -122.4376,
		zoom: 8
	});
	const [parkColor, setParkColor] = React.useState('#8fa');
	useEffect(() => {
		console.log(history.location)
		if (!routes.length) {
			history.replace();
			dispatch(getRoutes());
			setstopView(false)
		}
		setTabledata(routes);
		setDatasearch(routes);
		console.log(props.location)
		if (props.location.state) {
			console.log(props.location.state.detail)
			dispatch(getRoute(props.location.state.detail, 'detail'))
			setstopinfo(route)
			setstopView(true)
		}
	}, [dispatch, routes,])
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
		dispatch(getRoute(item.id, ''))
		console.log(route)
	}

	return (
		<div>
			{console.log(route, "route")}
			<div style={{ width: '30%', display: 'inline-block' }} className={classes._container}>
				{!stopView ? <> <div className={classes._searchbox}>
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

					)}
				</>
					:
					<Stopview route={route} />
				}
			</div>
			<div style={{ width: '70%', display: 'inline-block', minHeight: '100vh' }}>
				<ReactMapGL
					ref={mapContainer}
					// onLoad={addLines}
					{...viewport}
					mapStyle="mapbox://styles/infens/ckprj2dzt00zi19no4zckc7hv"
					mapboxApiAccessToken=
					"pk.eyJ1IjoiaW5mZW5zIiwiYSI6ImNrcHJpd2t1czA4dHAyb21ucmEyN2hlNzAifQ.UqPpun5dr8HdvlPPrRvx6A"
					width="100%"
					height="100vh"
					onViewportChange={(viewport) => setViewport(viewport)}
				>
					<Source id="my-data" type="geojson" data={geojson}>
						<Layer {...layerStyle} />
					</Source>
					{/* <Layer {...parkLayer} paint={{ 'fill-color': parkColor }} /> */}

					{/* <Marker longitude={-98.6805000695619} latitude={45.52296157064603} >
                        <div className="ball"></div>
                    </Marker>
                    <Marker longitude={-96.24554057836872} latitude={41.79401556575908}>
                        <div className="ball"></div>
                    </Marker>
                    <Marker longitude={-93.51305954520183} latitude={37.83125069657875} >
                        <div className="ball"></div>
                    </Marker><Marker longitude={-90.17336050466702} latitude={35.88809083427388} >
                        <div className="ball"></div>
                    </Marker>
                    <Marker longitude={-84.70839843833323} latitude={37.229328042041914} >
                        <div className="ball"></div>
                    </Marker>
                    <Marker longitude={-98.1249478532394} latitude={36.606494480659364} >
                        <div className="ball"></div>
                    </Marker> */}

				</ReactMapGL>
			</div>
		</div>
	);
}
