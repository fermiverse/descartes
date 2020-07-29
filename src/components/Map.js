import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const Map = () => {
    const [viewPort, setViewPort] = useState({
        latitude: 28.494164,
        longitude: 77.516233, 
        width: "100vw",
        height: "100%",
        zoom: 12
    });

    return ( 
        <div className="map">
            <ReactMapGL
            mapboxApiAccessToken={"pk.eyJ1IjoiYWFsYWFwbmFpciIsImEiOiJja2JwbTgwMDkxNnMwMnJtaXkzNTJnNWhlIn0.rqOz2HowukTngfEqxBfsDg"}
            mapStyle={"mapbox://styles/aalaapnair/ckasl1h9l78xj1iqvssnno33s"}
            onViewportChange={(viewPort) => {
                setViewPort(viewPort)
            }}>

            </ReactMapGL>
        </div>
     );
}

export default Map;

