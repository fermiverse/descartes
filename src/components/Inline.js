import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inline = ({points, setPoints, lines, setLines, areas, setAreas, toggleShowInline, activeGid, gids, setGids}) => {

    const popFunction = (arr) => {
        let newArr = [...arr];
        newArr.pop()
        return newArr
    };

    const elemCount = (points, lines, areas) => {
        let count = 0;
        count += points.length;
        for (const line of lines) count += line.geometry.coordinates.length;
        for (const area of areas) count += area.geometry.coordinates.length;
        return count;
    };

    const rand = (guess) => {
        if (gids.includes(guess)) {
            const res = +guess.replace("Group ", "");
            return rand("Group " + (res + 1));
        } else return guess;
    };

    const toState = (geojson, mode) => {
        let newGid = "Group " + (gids.length + 1);
        newGid = rand(newGid);
        try {
            let features = geojson.features;

            let geoPoints = features.filter(item => item.geometry.type === "Point");
            let geoLines = features.filter(item => item.geometry.type === "LineString");
            let geoAreas = features.filter(item => item.geometry.type === "Polygon");
            geoAreas = geoAreas.map(geoArea => ({...geoArea, geometry: {
                type: "Polygon",
                coordinates: geoArea.geometry.coordinates[0]
            }}));

            if (elemCount(geoPoints, geoLines, geoAreas) > 1000) {
                alert("Warning: Heavy dataset loaded. This will be rendered as static geoJSON in a separate group.");
                mode = 1;
            }

            let newPoints = geoPoints.map(item => ({
                properties: item.properties ? item.properties : {},
                gid: mode ? newGid : activeGid,
                coordinates: item.geometry.coordinates
            }));

            let newLines = geoLines.map(item => ({
                properties: item.properties ? item.properties : {},
                gid: mode ? newGid : activeGid,
                points: item.geometry.coordinates.map(coord => ({
                    gid: mode ? newGid : activeGid,
                    coordinates: coord
                }))
            }));
            
            let newAreas = geoAreas.map(item => ({
                properties: item.properties ? item.properties : {},
                gid: mode ? newGid : activeGid,
                points: popFunction(item.geometry.coordinates.map(coord => ({
                    gid: mode ? newGid : activeGid,
                    coordinates: coord
                })))
            }));

            if (mode) {
                setGids([...gids, newGid]);
            }
            
            setPoints([...points, ...newPoints]);
            setLines([...lines, ...newLines]);
            setAreas([...areas, ...newAreas]);
            toggleShowConfirm(true);

        } catch (error) {
            console.log("Invalid geoJSON object(s) entered");
        }
        
    };

    const [showConfirm, toggleShowConfirm] = useState(false);

    useEffect(() => {
        if (showConfirm) {
            setTimeout(() => {
                toggleShowConfirm(false)
            }, 3000);
            setTimeout(() => {
                toggleShowInline(false)
            }, 5000);
        }
    }, [showConfirm, toggleShowInline]);

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
            <div contentEditable="true" className="editable" id="in-geojson" 
            onFocus={() => {
                navigator.clipboard.readText().then((clipText) => {
                    document.getElementById("in-geojson").innerText = clipText;
                })
            }}>
            </div>
            <div style={{display: "flex"}}>
                <button className="rounded" title="Insert to new group" onClick={() => {
                    try {
                        axios.get(document.getElementById("in-geojson").innerText).then((res) => {
                            let data = res.data;
                            toState(data, 1);
                        })
                      } catch (error) {
                        console.log("GET failed with error", error);
                      }
                }}>Insert</button>
                <button className="rounded" id="append" style={{marginLeft: "10px"}} title="Append to active group" onClick={() => {
                    try {
                        axios.get(document.getElementById("in-geojson").innerText).then((res) => {
                            let data = res.data;
                            toState(data, 0);
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