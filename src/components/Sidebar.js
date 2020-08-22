import React, { useState } from 'react';
import CloseIcon from '../graphics/close.svg';
import InfoIcon from '../graphics/information.svg';
import Menu from '../graphics/menu.svg';
import Indicator1 from '../graphics/indicator1.svg';
import Indicator2 from '../graphics/indicator2.svg';
import axios from 'axios';
import uuid from 'react-uuid';

const Sidebar = ({destinations, setDestinations, origin, setOrigin, showOutput, toggleShowOutput, toggleShowSidebar}) => {
    
    const style = {
        width: "384px",
        minWidth: "384px",
        height: window.innerHeight,
        position: "absolute",
        top: "0",
        left: "0",
        backgroundColor: "rgb(3, 11, 26)",
        overflowY: "auto",
        zIndex: "1000"
    }
    const [showInfo, toggleShowInfo] = useState(false);
    const digestRaw = (rawString) => {
        let coords = rawString.split('\n');
        let newPoints = [];
        for (let coord of coords) {
            coord = coord.split(',');
            if (validateField(...coord)) {
                newPoints.push([Number(coord[1]), Number(coord[0])]);
            }
        }
        if (!newPoints[0]) return ;
        setOrigin(newPoints[0]);
        setDestinations(newPoints.slice(1,));
    }

    const validateField = (lat, lng) => {
        if (lat === "" || lng === "") {
            return false;
        }
        let isValid = (!isNaN(lat) && !isNaN(lng) && Math.abs(+lat) <= 90.0 && Math.abs(+lng) <= 180.0) ? true : false;
        return isValid
    }

    const form = (type) => {
        if (type === "origin") {
            return (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const lat = e.target.elements[0].value;
                    const lng = e.target.elements[1].value;
                    if (validateField(lat, lng)) {
                        setOrigin([Number(lng), Number(lat)]);
                        e.target.reset()
                    } else {
                        alert("Enter valid coordinates in origin field!");
                    }
                }}>
                    <input type="text" id="latitude" placeholder="Latitude" autoComplete="off"></input>
                    <input type="text" id="longitude" placeholder="Longitude" autoComplete="off"></input>
                    <button className="rounded" type="submit">Set</button>
                </form>
            )
        } else {
            return (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const lat = e.target.elements[0].value;
                    const lng = e.target.elements[1].value;
                    if (validateField(lat, lng)) {
                        setDestinations([...destinations, [Number(lng), Number(lat)]]);
                        e.target.reset()
                    } else {
                        alert("Enter valid coordinates in destination field!");
                    }
                }}>
                    <input type="text" id="latitude-dest" placeholder="Latitude" autoComplete="off"></input>
                    <input type="text" id="longitude-dest" placeholder="Longitude" autoComplete="off"></input>
                    <div style={{display: "flex"}}>
                        <button className="rounded" type="submit">Add</button>
                        <button className="rounded" id="dReset" title="Reset Destinations" onClick={(e) => {
                            e.preventDefault();
                            setDestinations([]);
                        }}>Reset</button>
                    </div>
                </form>
            )
        }
    }
        
    const snapCoords = () => {
        if (destinations.length === 0) alert("No destinations set!");
        let pathArr = destinations.map(item => String(item[1] + "," + item[0]));
        let path = pathArr.join("|");
        try {
            axios.get(`https://roads.googleapis.com/v1/snapToRoads?path=${path}&key=AIzaSyCyX-H1_PMVUFTL1Cv4wWwj6CN1U3mWtDc`)
            .then((res) => {
                let snappedCoords = res.data.snappedPoints;
                snappedCoords = snappedCoords.map(coord => [coord.location.longitude, coord.location.latitude]);
                let conf = window.confirm("Are you sure you want to snap destinations to the nearest road?");
                if (conf) setDestinations(snappedCoords);
                else alert("Snap aborted");
            })
        }
        catch(err) {
            alert("Error occurred while snapping");
        }
    }
    
    return ( 
        <div id="sidebar" style={style}>
            <div style={{display: "flex", width: "80%", fontFamily: "Comfortaa"}}>
                <div>
                    <h1>descartes v1.2</h1>
                </div>
                <div style={{display: "flex", alignItems: "center", float: "right"}}>
                    <button className="collapse" title="collapse" onClick={() => {toggleShowSidebar(false)}}><img src={Menu} alt="Menu" width="12px"></img></button>
                </div>
            </div>
            
            <div>
                <div className="form-container">
                    <div style={{display: "flex", alignItems: "baseline"}}>
                        <p>Origin</p>
                        <img src={Indicator1} alt="i1" width="10px" style={{marginLeft: "6px"}}/>
                    </div>
                    {(origin && origin.length) ? (
                        <div style={{color: "blue", marginTop: "5px", marginBottom: "5px"}}>{`(${origin[1].toFixed(8)}, ${origin[0].toFixed(8)})`}</div>
                    ) : (null)}
                    {form("origin")}
                </div>
                <div className="form-container">
                    <div style={{display: "flex", alignItems: "baseline"}}>
                        <p>Destination(s)</p>
                        <img src={Indicator2} alt="i1" width="10px" style={{marginLeft: "6px"}}/>
                    </div>
                    <div id="dlist" style={{marginTop: "5px", marginBottom: "5px", overflowY: "auto", maxHeight: "300px"}}>
                        {destinations.length ? (
                            destinations.map((destination) => (
                                <div key={uuid()} style={{color: "blue", display: "flex", alignItems: "baseline"}}>
                                    <p>{`${destinations.indexOf(destination)+1}. (${destination[1].toFixed(8)}, ${destination[0].toFixed(8)})`}</p>
                                    <button className="blank" onClick={() => {
                                        let index = destinations.indexOf(destination);
                                        let newDestinations = destinations.slice();
                                        if (index > -1) {
                                            newDestinations.splice(index, 1);
                                            setDestinations(newDestinations);
                                        }
                                    }}><img src={CloseIcon} alt="close" width="12px"></img></button>
                                </div> 
                            ))
                        ) : (<p>No destinations yet!</p>)}
                    </div>
                    {form()}
                </div>
            </div>
            <div className="form-container">
                <div style={{display: "flex", alignItems: "center"}}>
                    <p>Raw Input</p>
                    <button className="blank" onClick={() => {toggleShowInfo(!showInfo)}} title="What is this?">
                        <img src={InfoIcon} alt="info" width="12px"></img>
                    </button>
                </div>
                {showInfo ? (
                    <p style={{color: "rgb(90, 90, 90)"}}>Enter coordinates as lat, lng on separate lines. First coordinate is considered origin, the rest, destinations.</p>
                ) : (null)}
                
                <div id="raw" contentEditable="true"></div>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    <button className="rounded" onClick={() => {
                        const rawString = document.getElementById("raw").innerText;
                        digestRaw(rawString);
                        document.getElementById("raw").innerHTML = "";
                    }} title="insert coordinates">Insert</button>
                    <button className="rounded" id="snap" onClick={snapCoords} title="snap to road">Snap</button>
                    <button className="rounded" id="pop" onClick={() => {toggleShowOutput(!showOutput)}} title="output">Output</button>
                </div>
                
            </div>
        </div>
     );
}
 
export default Sidebar;
