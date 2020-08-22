import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl, Source, Layer } from 'react-map-gl';
import originMarker from '../graphics/marker1.svg';
import earthIcon from '../graphics/earth.svg';
import mapIcon from '../graphics/regmap.svg';
import lineIcon from '../graphics/graph.svg';
import layerIcon from '../graphics/layers.svg';
import Markers from './Markers';
import Distances from './Distances';


let current = [];

const Map = ({origin, setOrigin, destinations, setDestinations, showSidebar}) => {

    const mapStyle = {
        position: "absolute",
        right: "0",
        top: "0",
        height: window.innerHeight,
        width: showSidebar ? "calc(100vw - 384px)" : "100vw"
    };

    const [viewPort, setViewPort] = useState({
        latitude: origin[1],
        longitude: origin[0], 
        width: "fit",
        height: window.innerHeight,
        zoom: 14
    });

    const [updateView, setUpdateView] = useState(true);

    const [showSatMap, toggleShowSatMap] = useState(false);

    const [drawLine, toggleDrawLine] = useState({draw: false, init: true});

    const [beaconDist, setBeaconDist] = useState(null);

    const [hoverCoords, setHoverCoords] = useState([]);

    const [showLayers, toggleShowLayers] = useState(false);

    const handleMapClick = (e) => {
        if (drawLine.init) {
            toggleDrawLine({draw: true, init: false});
            return ;
        } else {
            let newCoord = e.lngLat;
            current = newCoord;
            if (origin[0]) {
                setDestinations([...destinations, newCoord]);
            } else {
                setOrigin(newCoord);
        }
        }
    };

    const handleMapHover = (e) => {
        setHoverCoords(e.lngLat);
        if (current && current[0]) setBeaconDist(haverSine(current, e.lngLat));
    }

    const handleOriginDrag = (e) => {
        setUpdateView(false);
        setOrigin(e.lngLat);
    };

    const haverSine = (co1, co2) => {
        	
        const R = 6371e3; // metres
        const φ1 = co1[1] * Math.PI/180; // φ, λ in radians
        const φ2 = co2[1] * Math.PI/180;
        const Δφ = (co2[1] - co1[1]) * Math.PI/180;
        const Δλ = (co2[0] - co1[0]) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres

        return d;
    };

    const keyDown = (e) => {
        if (e.key === "Escape") {
            toggleDrawLine({draw: false, init: true});
            current = [];
            setBeaconDist(null);
        }
    };

    useEffect(() => {
        if (updateView) {
            setTimeout(() => {
                let newView = {...viewPort};
                newView.latitude = origin[1];
                newView.longitude = origin[0];
                setViewPort(newView)
            }, 1000);
        }
        return () => {
            setUpdateView(true);
        }
    }, [origin]);

    useEffect(() => {
        window.addEventListener("keydown", keyDown)
        return () => {
            window.removeEventListener("keydown", keyDown);
        }
    }, [drawLine]);

    useEffect(() => {
        if (destinations.length === 0) {
            current = [];
            setBeaconDist(null);
        } 
    }, [destinations]);


    const geojsonLine = {
        type: "Feature",
        geometry: {
            "type": "LineString",
            "coordinates": destinations
        }
    };

    return ( 
        <div id="map" style={mapStyle}>
            <ReactMapGL
            {...viewPort}
            mapboxApiAccessToken={"pk.eyJ1IjoiZmVybWl2ZXJzZSIsImEiOiJja2Q2YzJ3Zjkwam1mMnFuMG1zNjg5eDhmIn0.SwCaqFKXTC_-WkcbYqFcsQ"}
            mapStyle={showSatMap ? "mapbox://styles/mapbox/satellite-v9" : "mapbox://styles/fermiverse/ckd7yqq7u084t1iqj97nvbjc6"}
            onViewportChange={(viewPort) => {
                setViewPort({...viewPort, width: "fit", height: "fit"})
            }}
            onClick={drawLine.draw ? handleMapClick : null}
            onHover={drawLine.draw ? handleMapHover : null}>
                <div style={{position: 'absolute', right: "15px", top: "30px"}}>
                    <NavigationControl />
                </div>
                <div style={{position: "absolute", top: "135px", right: "15px"}}>
                    <GeolocateControl 
                    onViewportChange={(view) => {
                        setViewPort({
                            latitude: origin[1] || 28.494164,
                            longitude: origin[0] || 77.516233,
                            width: "100%",
                            height: "100%",
                            zoom: 14
                        });
                    }}
                    />
                </div>
                <button className="line" title="Line string" onClick={() => {
                    if (drawLine.draw) {
                        current = [];
                        setBeaconDist(null);
                    }
                    toggleDrawLine({draw: !drawLine.draw, init: true});
                    }}>
                    <img src={lineIcon} alt="line" width="16px"></img>
                </button>
                {drawLine.draw ? (
                    <div className="top-drawer" id={showSidebar ? "no-drop" : "drop"}>
                        <p>Draw Mode ON, press Esc to exit</p>
                        {hoverCoords[0] ? (<p>{`Latitude: ${hoverCoords[1].toFixed(6)}, Longitude: ${hoverCoords[0].toFixed(6)}`}</p>) : (null)}
                        {beaconDist ? (<p>{`Displacement: ${beaconDist.toFixed(3)}m`}</p>) : (null)}
                    </div>
                ) : (null)}
                {origin.length ? (
                    <Marker
                    latitude={origin[1]}
                    longitude={origin[0]}
                    draggable={true}
                    onDragEnd={handleOriginDrag}
                    offsetLeft={-16}
                    offsetTop={-38.71}>
                        <div title="origin">
                            <img src={originMarker} alt="marker" width="32px" className="marker"></img>
                        </div>
                    </Marker>
                ) : (null)}
                
                <Markers destinations={destinations} setDestinations={setDestinations} />
                {showLayers ? (
                    <Distances destinations={destinations} />
                ) : (null)}
                
                {showLayers ? (
                    <Source type="geojson" data={geojsonLine}>
                        <Layer
                        id="line-layer"
                        type="line"
                        paint={{
                            "line-color": "rgb(200,200,200)",
                            "line-width": 3
                        }}
                        layout={{
                            "line-cap": "round",
                            "line-join": "round"
                        }} />
                    </Source>
                ) : (null)}
                <button className="blank" id="GJ" title={showLayers ? "Hide Layers" : "Show Layers"} onClick={() => {
                    if (destinations.length) toggleShowLayers(!showLayers)
                    else toggleShowLayers(false)
                    }}>
                    <img src={layerIcon} alt="Layer" width="26px"></img>
                </button>
                {showSatMap ? (
                    <button className="blank" id="toggle" title="Regular View" onClick={() => {toggleShowSatMap(!showSatMap)}}>
                        <img src={mapIcon} alt="mapicon" width="30px"></img>
                    </button>
                ) : (
                    <button className="blank" id="toggle" title="Satellite View" onClick={() => {toggleShowSatMap(!showSatMap)}}>
                        <img src={earthIcon} alt="sat" width="30px"></img>
                    </button>
                )}
                <button className="rounded" id="reset" title="Reset Markers" onClick={() => {
                    toggleDrawLine({draw: false, init: true});
                    setUpdateView(false);
                    setOrigin([]);
                    setDestinations([]);
                    current = [];
                    setBeaconDist(null);
                }}>Reset</button>
            </ReactMapGL>
        </div>
     );
}

export default Map;

