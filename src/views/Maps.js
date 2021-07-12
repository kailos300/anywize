import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1Ijoib3BhbHRyb2xsIiwiYSI6ImNrcjEwYm15NjF4OHQycXFhNGJrY2F2ajAifQ.d4yBYQ1HYT7SEhz-C5lGgg';
export default function Maps() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    // const [lng, setLng] = useState(-70.9);
    // const [lat, setLat] = useState(42.35);
    // const [zoom, setZoom] = useState(9);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/opaltroll/ckr10d64b09uf17qo9nja1lt4',
            // center: [lng, lat],
            // zoom: zoom
        });
    });
    return (
        <div>
            <div>
                <div ref={mapContainer} className="map-container" />
            </div>
        </div>
    )
}
