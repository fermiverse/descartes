import React, { useState, useEffect } from 'react';
import ReactMapGL, { NavigationControl, GeolocateControl } from 'react-map-gl';
import earthIcon from '../graphics/earth.svg';
import mapIcon from '../graphics/regmap.svg';
import pointIcon from '../graphics/point.svg';
import lineIcon from '../graphics/graph.svg';
import areaIcon from '../graphics/area.svg';
import layerIcon from '../graphics/layers.svg';
import measureIcon from '../graphics/pencil.svg';
import Points from './Points';
import Lines from './Lines';
import Areas from './Areas';
import LineLayers from './LineLayers';
import AreaLayers from './AreaLayers';
import Measures from './Measures';

let current = [];
let mode = 0;

const Map = ({points, setPoints, lines, setLines, areas, setAreas, showSidebar}) => {

    const origin = points.length ? points[points.length - 1].coordinates : [77.516233, 28.494164];  

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

    const [showSatMap, toggleShowSatMap] = useState(false);
    const [showLayers, toggleShowLayers] = useState(true);
    const [showMeasures, toggleShowMeasures] = useState(true);
    const [drawLine, toggleDrawLine] = useState({draw: false, init: true});
    const [beaconDist, setBeaconDist] = useState(null);
    const [hoverCoords, setHoverCoords] = useState([]);
    const [marks, setMarks] = useState([]);
        

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

    const handleMapClick = (e) => {
        if (drawLine.init) {
            toggleDrawLine({draw: true, init: false});
            return ;
        } else {
            let newCoord = e.lngLat;
            current = newCoord;
            setMarks([...marks, {
                gid: 1,
                coordinates: newCoord
            }])
        }
    };

    const handleMapHover = (e) => {
        setHoverCoords(e.lngLat);
        if (current && current[0]) setBeaconDist(haverSine(current, e.lngLat));
    }

    const keyDown = (e) => {
        if (e.key === "Escape") {
            if (marks.length) {
                if (mode === 0) {
                    setLines([...lines, {
                        gid: 1,
                        points: marks
                    }])
                } else if (mode === 1) {
                    (marks.length > 2) ? (
                        setAreas([...areas, {
                            gid: 1,
                            points: marks
                        }])
                    ) : (
                        alert("Specify more than 2 nodes for polygon")
                    )
                } else {
                    setPoints([...points, ...marks])
                }
            }
            toggleDrawLine({draw: false, init: true});
            current = [];
            setBeaconDist(null);
            setMarks([]);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", keyDown)
        return () => {
            window.removeEventListener("keydown", keyDown);
        }
    });

    useEffect(() => {
        let l = lines.length;
        if (l && lines[l-1].points.length === 0) {
            current = [];
            setBeaconDist(null);
        } 
    }, [lines]);

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
                            ...viewPort,
                            latitude: origin[1] || 28.494164,
                            longitude: origin[0] || 77.516233,
                            zoom: 14
                        });
                    }}
                    />
                </div>

                <Points points={points} setPoints={setPoints} type={""}/>
                {marks.length ? (
                    <Points points={marks} setPoints={setMarks} type={"temp"}/>
                ) : (null)}
                <Lines lines={lines} setLines={setLines} />
                <Areas areas={areas} setAreas={setAreas} />

                <button className="custom" id="point" title="Add a point" onClick={() => {
                    if (drawLine.draw) {
                        current = [];
                        mode = 0;
                        setBeaconDist(null);
                        setPoints([...points, ...marks]);
                        setMarks([]);
                    } else {
                        mode = 2;
                    }
                    toggleDrawLine({draw: !drawLine.draw, init: true});
                    }}>
                    <img src={pointIcon} alt="pt" width="10px"></img>
                </button>

                <button className="custom" id="line" title="Add a line" onClick={() => {
                    if (drawLine.draw) {
                        current = [];
                        setBeaconDist(null);
                        setLines([...lines, {
                            gid: 1,
                            points: marks
                        }]);
                        setMarks([]);
                    }
                    mode = 0;
                    toggleDrawLine({draw: !drawLine.draw, init: true});
                    }}>
                    <img src={lineIcon} alt="line" width="17px"></img>
                </button>

                <button className="custom" id="area" title="Add a polygon" onClick={() => {
                    if (drawLine.draw) {
                        current = [];
                        mode = 0;
                        setBeaconDist(null);
                        setAreas([...areas, {
                            gid: 1,
                            points: marks
                        }]);
                        setMarks([]);
                    } else mode = 1;
                    toggleDrawLine({draw: !drawLine.draw, init: true});
                    }}>
                    <img src={areaIcon} alt="ar" width="17px"></img>
                </button>

                {drawLine.draw ? (
                    <div className="top-drawer" id={showSidebar ? "no-drop" : "drop"}>
                        <p>{`Draw Mode: ${mode === 0 ? "Line" : (mode === 1 ? "Polygon" : "Point")}, press Esc to exit`}</p>
                        {hoverCoords[0] ? (<p>{`Latitude: ${hoverCoords[1].toFixed(6)}, Longitude: ${hoverCoords[0].toFixed(6)}`}</p>) : (null)}
                        {beaconDist ? (<p>{`Displacement: ${beaconDist.toFixed(3)}m`}</p>) : (null)}
                    </div>
                ) : (null)}
               
                {showLayers ? (
                    <LineLayers lines={lines} />
                ) : (null)}

                {showLayers ? (
                    <AreaLayers areas={areas} />
                ) : (null)}

                {showMeasures ? (
                    <Measures entities={lines} type={"lines"}/>
                ) : (null)}

                {showMeasures ? (
                    <Measures entities={areas} type={"areas"}/>
                ) : (null)}

                <button className="blank" id="measure" title={showMeasures ? "Hide measures" : "Show measures"} onClick={() => {
                    if (lines.length || areas.length) toggleShowMeasures(!showMeasures)
                    else toggleShowMeasures(false)
                    }}>
                    <img src={measureIcon} alt="Ms" width="20px"></img>
                </button>
                
                <button className="blank" id="GJ" title={showLayers ? "Hide Layers" : "Show Layers"} onClick={() => {
                    if (lines.length || areas.length) toggleShowLayers(!showLayers)
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
                    const check = window.confirm("Clear all geoJSON entities and reset map?");
                    if (check) {
                        toggleDrawLine({draw: false, init: true});
                        setPoints([]);
                        setLines([]);
                        setAreas([]);
                        current = [];
                        setBeaconDist(null);
                    }
                }}>Reset</button>
            </ReactMapGL>
        </div>
    )
}

export default Map;

