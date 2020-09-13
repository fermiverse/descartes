import React, { useState, useEffect } from 'react';
import axios from 'axios';
import closeIcon from '../graphics/close.svg';



const Configuration = ({showConfig, toggleShowConfig, points, lines, areas, setPoints, setLines, setAreas}) => {

    const [showConfirm, toggleShowConfirm] = useState(false);
    const [showOptions, toggleShowOptions] = useState(false);

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
            alert("Invalid geoJSON object!");
        }
        
    };

    const handleEnter = async (e) => {
        if (e.key === "Enter" && document.getElementById("db-geojson").innerText) {
            e.preventDefault();
            const syn = document.getElementById("db-geojson").innerText;
            const ind = syn.search("@");
            if (ind === -1) {
                return ;
            } 
            const email = syn.slice(0, ind) + "@nawgati.com";
            const password = syn.slice(ind + 1);
            const body = {email, password};
            try {
                const res = await fetch("http:localhost:8081/login", { 
                    method: 'POST', 
                    body: JSON.stringify(body),
                    headers: {'Content-Type': 'application/json'},
                    credentials: "include"
                });
                console.log(res);
                
                if (res.status === 201) {
                    try {
                        const stations = await axios.get("http:localhost:8081/stations/all");
                        if (stations) console.log(stations);
                    } catch (err) {
                        console.log(err);
                    }
                    
                }
                
            } catch (error) {
            console.log(error);
            }
        }
    };

    useEffect(() => {
        document.getElementById("db-geojson").addEventListener("keydown", handleEnter);
    });

    useEffect(() => {
        if (showConfirm) {
            setTimeout(() => {
                toggleShowConfirm(false)
            }, 5000);
        }
    }, [showConfirm]);
    
    return (
        <div className="output">
            <div className="form-container" id="output">
                <div style={{display: "flex", width: "100%", position: "relative"}}>
                    <p>Configuration</p>
                    {showConfirm ? (
                        <p style={{color: "rgb(30, 165, 17)", marginLeft: "12px"}}>
                            geoJSON accepted
                        </p>
                    ) : (null)}
                    <button className="blank" id="close" title="close" onClick={() => {
                        toggleShowConfig(false);
                    }}>
                        <img src={closeIcon} alt="close" width="15px"></img>
                    </button>
                </div>
                <p style={{color: "rgb(17, 187, 31)", fontSize: "12px", marginTop: "5px"}}><i>Paste a valid Nawgati configuration url</i></p>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div contentEditable="true" className="editable" id="db-geojson" style={{width: "208px"}}
                    onFocus={() => {
                        navigator.clipboard.readText().then((clipText) => {
                            document.getElementById("db-geojson").innerText = clipText;
                        })
                    }}>

                    </div>
                    <p style={{marginTop: "5px"}}>.nawgati.com</p>
                </div>
                {showOptions ? (
                    <p style={{color: "rgb(17, 187, 31)", fontSize: "14px", marginTop: "5px"}}><i>Successfully logged in</i></p>
                ) : (null)}
            </div>
        </div>
    )
}
 
export default Configuration;
