import React, { useState } from 'react';
import closeIcon from '../graphics/close.svg';
import uuid from 'react-uuid';


const Output = ({showOutput, toggleShowOutput, points, lines, areas, gids, activeGid}) => {

    
    const [showConfirm, toggleShowConfirm] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(activeGid);

    let fpoints = selectedGroup === "All" ? points : points.filter(point => point.gid === selectedGroup);
    let flines = selectedGroup === "All" ? lines : lines.filter(line => line.gid === selectedGroup);
    let fareas = selectedGroup === "All" ? areas : areas.filter(area => area.gid === selectedGroup);

    const toGeojson = (fpoints, flines, fareas) => {
        let geoPoints = fpoints.map(point => ({
            type: "Feature",
            properties: point.properties ? point.properties : {},
            geometry: {
                type: "Point",
                coordinates: point.coordinates
            }    
        }));
        let geoLines = flines.map(line => ({
            type: "Feature",
            properties: line.properties ? line.properties : {},
            geometry: {
                type: "LineString",
                coordinates: line.points.map(point => point.coordinates)
            }
        }));
        let geoAreas = fareas.map(area => ({
            type: "Feature",
            properties: area.properties ? area.properties : {},
            geometry: {
                type: "Polygon",
                coordinates: [area.points.map(point => point.coordinates).concat([area.points[0].coordinates])]
            }
        }));
        let features = geoPoints.concat(geoLines, geoAreas);
        let geoObj = {
            type: "FeatureCollection",
            features: features
        };
        let stringifiedGeoObj = JSON.stringify(geoObj, undefined, 2);
        return stringifiedGeoObj;
    };
    
    return (
        <div className="output">
            <div className="form-container" id="output">
                <div style={{display: "flex", width: "100%", position: "relative"}}>
                    <p>GeoJSON Output</p>
                    {showConfirm ? (
                        <p style={{color: "rgb(30, 165, 17)", marginLeft: "12px"}}>
                            Copied to clipboard
                        </p>
                    ) : (null)}
                    <button className="blank" id="close" title="close" onClick={() => {
                        toggleShowOutput(false);
                    }}>
                        <img src={closeIcon} alt="close" width="15px"></img>
                    </button>
                </div>
                <div style={{color: "rgb(50, 50, 50)"}}>
                    {`${fpoints.length} points, ${flines.length} lines, ${fareas.length} polygons`}
                </div>
                <select onChange={(e) => {
                    if (e.target.value) setSelectedGroup(e.target.value);
                    console.log(e.target.value)
                }} value={selectedGroup}>
                    {gids.map(gid => (
                        <option key={uuid()}>{gid}</option>
                    ))}
                    <option key={uuid()}>All</option>
                </select>
                <div id="output-coords">
                    <pre id="out-geojson" contentEditable="true" suppressContentEditableWarning={true} style={{outline: "none"}}>
                        {toGeojson(fpoints, flines, fareas)}
                    </pre>
                </div>
                <div style={{display: "flex"}}>
                    <button className="rounded" id="copy" title="copy" onClick={() => {
                        let outElem = document.getElementById("out-geojson");
                        let outText = outElem.textContent;
                        navigator.clipboard.writeText(outText)
                        .then(() => {
                            toggleShowConfirm(true);
                        })
                        .then(() => {
                            setTimeout(() => {toggleShowConfirm(false)}, 5000);
                        });
                    }}>Copy</button>
                    <button className="rounded" style={{marginLeft: "10px"}} onClick={() => {
                        let outElem = document.getElementById("out-geojson");
                        outElem.textContent = toGeojson(fpoints, flines, fareas);
                    }}>Regenerate</button>
                </div>
            </div>
        </div>
    )
}
 
export default Output;
