import React, { useState, useEffect } from 'react';
import closeIcon from '../graphics/close.svg';


const Input = ({showInput, toggleShowInput, points, lines, areas, setPoints, setLines, setAreas}) => {


    const [showConfirm, toggleShowConfirm] = useState(false);

    const popFunction = (arr) => {
        let newArr = [...arr];
        newArr.pop()
        return newArr
    }

    const toState = (geojson, mode) => {
        try {
            let features = geojson.features;

            let geoPoints = features.filter(item => item.geometry.type === "Point");
            let geoLines = features.filter(item => item.geometry.type === "LineString");
            let geoAreas = features.filter(item => item.geometry.type === "Polygon");
            geoAreas = geoAreas.map(geoArea => ({...geoArea, geometry: {
                type: "Polygon",
                coordinates: geoArea.geometry.coordinates[0]
            }}));

            let newPoints = geoPoints.map(item => ({
                gid: 1,
                coordinates: item.geometry.coordinates
            }));
            let newLines = geoLines.map(item => ({
                gid: 1,
                points: item.geometry.coordinates.map(coord => ({
                    gid: 1,
                    coordinates: coord
                }))
            }));
            
            let newAreas = geoAreas.map(item => ({
                gid: 1,
                points: popFunction(item.geometry.coordinates.map(coord => ({
                    gid: 1,
                    coordinates: coord
                })))
            }));

            if (mode) {
                setPoints(newPoints);
                setLines(newLines);
                setAreas(newAreas);
            } else {
                setPoints([...points, ...newPoints]);
                setLines([...lines, ...newLines]);
                setAreas([...areas, ...newAreas]);
            }
            toggleShowConfirm(true);

        } catch (error) {
            alert("Invalid geoJSON object!");
        }
        
    }

    useEffect(() => {
        if (showConfirm) {
            setTimeout(() => {
                toggleShowConfirm(false)
            }, 5000);
        }
    }, [showConfirm])
    
    return (
        <div className="output">
            <div className="form-container" id="output">
                <div style={{display: "flex", width: "100%", position: "relative"}}>
                    <p>GeoJSON Input</p>
                    {showConfirm ? (
                        <p style={{color: "rgb(30, 165, 17)", marginLeft: "12px"}}>
                            geoJSON accepted
                        </p>
                    ) : (null)}
                    <button className="blank" id="close" title="close" onClick={() => {
                        toggleShowInput(false);
                    }}>
                        <img src={closeIcon} alt="close" width="15px"></img>
                    </button>
                </div>
                <div id="output-coords">
                    <pre id="out-geojson" contentEditable="true" style={{outline: "none", minHeight: "30px"}} onFocus={() => {
                        navigator.clipboard.readText().then((clipText) => {
                            document.getElementById("out-geojson").innerText = clipText;
                        })
                    }}>
                    </pre>
                </div>
                <div style={{display: "flex"}}>
                    <button className="rounded" id="copy" title="Overwrite and Insert" onClick={() => {
                        let txt = document.getElementById("out-geojson").innerText;
                        if (txt) {
                            try {
                                let geojson = JSON.parse(txt);
                                toState(geojson, 1);
                            } catch (error) {
                                alert("Invalid JSON in input field!");
                            }
                        }
                        
                    }}>Insert</button>
                    <button className="rounded" style={{marginLeft: "10px"}} title="Append" onClick={() => {
                        let txt = document.getElementById("out-geojson").innerText;
                        if (txt) {
                            try {
                                let geojson = JSON.parse(txt);
                                toState(geojson, 0);
                            } catch (error) {
                                alert("Invalid JSON in input field!");
                            }
                        }
                        
                    }}>Append</button>
                    <button className="rounded" id="dReset" title="Clear input" style={{marginLeft: "10px"}} onClick={() => {
                        document.getElementById("out-geojson").innerText = "";
                    }}>Clear</button>
                </div>
            </div>
        </div>
    )
}
 
export default Input;
