import React, { useState } from 'react';
import closeIcon from '../graphics/close.svg';


const Output = ({showOutput, toggleShowOutput, points, lines, areas}) => {

    
    const [showConfirm, toggleShowConfirm] = useState(false);

    const toGeojson = (points, lines, areas) => {
        let geoPoints = points.map(point => ({
            type: "Feature",
            properties: {},
            geometry: {
                type: "Point",
                coordinates: point.coordinates
            }    
        }));
        let geoLines = lines.map(line => ({
            type: "Feature",
            properties: {},
            geometry: {
                type: "LineString",
                coordinates: line.points.map(point => point.coordinates)
            }
        }));
        let geoAreas = areas.map(area => ({
            type: "Feature",
            properties: {},
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
    }
    
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
                    {`${points.length} points, ${lines.length} lines, ${areas.length} polygons`}
                </div>
                <div id="output-coords">
                    <pre id="out-geojson" contentEditable="true" style={{outline: "none"}}>
                        {toGeojson(points, lines, areas)}
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
                        outElem.textContent = toGeojson(points, lines, areas);
                    }}>Regenerate</button>
                </div>
            </div>
        </div>
    )
}
 
export default Output;
