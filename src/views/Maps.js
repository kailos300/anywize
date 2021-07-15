import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiaW5mZW5zIiwiYSI6ImNrcHJpd2t1czA4dHAyb21ucmEyN2hlNzAifQ.UqPpun5dr8HdvlPPrRvx6A';
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
            style: 'mapbox://styles/infens/ckprj2dzt00zi19no4zckc7hv',
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
