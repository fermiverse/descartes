import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inline = ({points, setPoints, lines, setLines, areas, setAreas, toggleShowInline}) => {

    const popFunction = (arr) => {
        let newArr = [...arr];
        newArr.pop()
        return newArr
    };

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
            console.log("Invalid geoJSON object(s) entered");
        }
        
    };

    const handleEnter = (e) => {
        if (e.key === "Enter" && document.getElementById("in-geojson").innerText) {
            e.preventDefault();
            try {
                axios.get(document.getElementById("in-geojson").innerText).then((res) => {
                    let data = res.data;
                    if (Array.isArray(data)) {
                        data.forEach(item => toState(item, 0));
                    } else {
                        toState(data, 0);
                    }
                })
              } catch (error) {
                console.log("GET failed with error", error);
              }
        }
    };

    const [showConfirm, toggleShowConfirm] = useState(false);

    useEffect(() => {
        document.getElementById("in-geojson").addEventListener("keydown", handleEnter);
    });

    useEffect(() => {
        if (showConfirm) {
            setTimeout(() => {
                toggleShowConfirm(false)
            }, 5000);
            setTimeout(() => {
                toggleShowInline(false)
            }, 2500);
        }
    }, [showConfirm]);

    /*useEffect(() => {
        document.getElementById("in-geojson").addEventListener("paste", e => {
            e.preventDefault();
            navigator.clipboard.readText().then(clipText => {
                document.getElementById("in-geojson").innerText = clipText;
            });
        });
    });*/

    return ( 
        <div className="form-container">
            <div style={{display: "flex"}}>
                <p>Enter geoJSON from a remote source</p>
                <p style={{color: "red", marginLeft: "10px"}}>BETA</p>
            </div>
            {showConfirm ? (
                <p style={{color: "rgb(30, 165, 17)"}}>
                    geoJSON accepted
                </p>
            ) : (null)}
            <div contentEditable="true" id="in-geojson" style={{outline: "none", minHeight: "20px", 
            backgroundColor: "rgb(170, 170, 170)",
            color: "blue", 
            marginTop: "10px",
            padding: "13px", 
            paddingTop: "8px",
            paddingBottom: "8px",
            border: "none",
            borderRadius: "20px", 
            maxHeight: "50px",  
            width: "294px", 
            whiteSpace: "nowrap", overflowX: "hidden"}} 
            onFocus={() => {
                navigator.clipboard.readText().then((clipText) => {
                    document.getElementById("in-geojson").innerText = clipText;
                })
            }}>
            </div>
            <div style={{display: "flex"}}>
                <button className="rounded" title="Overwrite and Insert" onClick={() => {
                    try {
                        axios.get(document.getElementById("in-geojson").innerText).then((res) => {
                            let data = res.data;
                            if (Array.isArray(data)) {
                                data.forEach(item => toState(item, 0));
                            } else {
                                toState(data, 1);
                            }
                        })
                      } catch (error) {
                        console.log("GET failed with error", error);
                      }
                }}>Insert</button>
                <button className="rounded" id="append" style={{marginLeft: "10px"}} title="Append" onClick={() => {
                    try {
                        axios.get(document.getElementById("in-geojson").innerText).then((res) => {
                            let data = res.data;
                            console.log(data);
                            if (Array.isArray(data)) {
                                data.forEach(item => toState(item, 0));
                            } else {
                                toState(data, 0);
                            }
                        })
                      } catch (error) {
                        console.log("GET failed with error", error);
                      }
                }}>Append</button>
                <button className="rounded" id="dReset" title="Clear input" style={{marginLeft: "10px"}} onClick={() => {
                    document.getElementById("in-geojson").innerText = "";
                }}>Clear</button>
            </div>
        </div>
     );
}
 
export default Inline;