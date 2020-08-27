import React, { useState } from 'react';
import CloseIcon from '../graphics/close.svg';
import Menu from '../graphics/menu.svg';
import Indicator1 from '../graphics/indicator1.svg';
import Indicator2 from '../graphics/indicator2.svg';
import Indicator3 from '../graphics/indicator3.svg';
import uuid from 'react-uuid';
import Inline from './Inline';

const Sidebar = ({points, setPoints, lines, setLines, areas, setAreas, toggleShowInput, toggleShowOutput, showSidebar, toggleShowSidebar, showSnap, toggleShowSnap}) => {
    
    const [showInline, toggleShowInline] = useState(false);
    const style = {
        width: "384px",
        minWidth: "384px",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        backgroundColor: "rgb(3, 11, 26)",
        overflowY: "auto",
        zIndex: "1000"
    }

    const validateField = (lat, lng) => {
        if (lat === "" || lng === "") {
            return false;
        }
        let isValid = (!isNaN(lat) && !isNaN(lng) && Math.abs(+lat) <= 90.0 && Math.abs(+lng) <= 180.0) ? true : false;
        return isValid
    };

     const form = (type) => {
        if (type === "line") {
            return (
                <div></div>
            )
        } else if (type === "point") {
            return (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const cds = e.target.elements[0].value.split(',')
                    if (validateField(cds[0], cds[1])) {
                        let newPoint = {
                            gid: 1,
                            name: `P${points.length+1}`,
                            coordinates: [Number(cds[1]), Number(cds[0])]
                        }
                        setPoints([...points, newPoint]);
                        e.target.reset()
                    } else {
                        alert("Enter valid coordinates in input field!");
                    }
                }}>
                    <label style={{fontSize: "20px", marginLeft: "0", marginRight: "5px"}}><b>+</b></label>
                    <input id="coords" type="text" placeholder=" <Latitude>, <Longitude>" autoComplete="off"></input>
                    <div style={{display: "flex"}}>
                        <button className="rounded" type="submit">Add</button>
                        <button className="rounded" id="dReset" title="Reset Points" onClick={(e) => {
                            e.preventDefault();
                            setPoints([]);
                        }}>Reset</button>
                    </div>
                </form>
            )
        }
    };
     return (
        <div id="sidebar" style={style}>
            <div style={{display: "flex", fontFamily: "Comfortaa", color: "white"}}>
                <div>
                    <h1>descartes v1.3</h1>
                </div>
                <div style={{display: "flex", alignItems: "center", float: "right"}}>
                    <button className="collapse" title={showSidebar ? "collapse" : "expand"} onClick={() => {toggleShowSidebar(!showSidebar)}}><img src={Menu} alt="Menu" width="12px"></img></button>
                </div>
            </div>
            <div className="form-container">
                <button className="rounded" id="utils" title="Input geoJSON" onClick={() => {
                    toggleShowInput(true);
                }}>Input</button>
                <button className="rounded" id="utils" title="Output geoJSON" style={{marginLeft: "10px"}} onClick={() => {
                    toggleShowOutput(true);
                }}>Output</button>
                <button className="rounded" id="utils" title="Remote geoJSON" style={{marginLeft: "10px"}} onClick={() => {
                    toggleShowInline(!showInline);
                }}>Remote</button>
            </div>
            {showInline ? (
                <Inline />
            ) : (null)}
            <div className="form-container">
                <div style={{display: "flex", alignItems: "baseline"}}>
                    <p>Point(s)</p>
                    <img src={Indicator1} alt="i1" width="10px" style={{marginLeft: "6px"}}/>
                </div>
                <div className="dlist">
                    {points.length ? (
                        points.map((point) => (
                            <div key={uuid()} style={{color: "blue", display: "flex", alignItems: "baseline"}}>
                                <p>{`${points.indexOf(point)+1}.  [${point.coordinates[1].toFixed(8)}, ${point.coordinates[0].toFixed(8)}]`}</p>
                                <button className="blank" title="Clear" onClick={() => {
                                    let index = points.indexOf(point);
                                    let newPoints = points.slice();
                                    if (index > -1) {
                                        newPoints.splice(index, 1);
                                        setPoints(newPoints);
                                    }
                                }}><img src={CloseIcon} alt="close" width="12px"></img></button>
                            </div> 
                        )) 
                    ) : (null)}
                </div>
                {form("point")}

            </div>
            <div className="form-container">
                <div style={{display: "flex", alignItems: "baseline"}}>
                    <p>Line(s)</p>
                    <img src={Indicator2} alt="i2" height="10px" style={{marginLeft: "6px"}}/>
                </div>
                <div className="dlist">
                    {lines.map(line => {
                        let pts = line.points;
                        return (
                            <div key={uuid()}>
                                <div key={uuid()} style={{display: "flex", alignItems: "baseline", marginBottom: "5px", marginTop: "5px"}}>
                                    <p>{`${lines.indexOf(line)+1}. LineString ${lines.indexOf(line)+1}`}</p>
                                    <button className="blank" title="Clear" onClick={() => {
                                        let index = lines.indexOf(line);
                                        let newLines = lines.slice();
                                        if (index > -1) {
                                            newLines.splice(index, 1);
                                            setLines(newLines);
                                        }
                                    }}><img src={CloseIcon} alt="close" width="12px" style={{padding: "0"}}></img></button>
                                </div>
                                {pts.map(pt => (
                                    <div key={uuid()} style={{color: "blue", display: "flex", alignItems: "baseline", marginLeft: "15px"}}>
                                        <p>{`${pts.indexOf(pt)+1}.  [${pt.coordinates[1].toFixed(8)}, ${pt.coordinates[0].toFixed(8)}]`}</p>    
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
                <button className="rounded" id="dReset" title="Reset Lines" style={{marginLeft: "0"}} onClick={(e) => {
                    e.preventDefault();
                    setLines([]);
                }}>Reset</button>
                <button className="rounded" id="snap" onClick={() => {toggleShowSnap(true)}} title="snap to road">Snap</button>
            </div>
            <div className="form-container">
                <div style={{display: "flex", alignItems: "center"}}>
                    <p>Area(s)</p>
                    <img src={Indicator3} alt="i3" width="30px" style={{marginLeft: "6px"}}/>
                </div>
                <div className="dlist">
                    {areas.map(area => {
                        let pts = area.points;
                        return (
                            <div key={uuid()}>
                                <div key={uuid()} style={{display: "flex", alignItems: "baseline", marginBottom: "5px", marginTop: "5px"}}>
                                    <p>{`${areas.indexOf(area)+1}. Polygon ${areas.indexOf(area)+1}`}</p>
                                    <button className="blank" title="Clear" onClick={() => {
                                        let index = areas.indexOf(area);
                                        let newAreas = areas.slice();
                                        if (index > -1) {
                                            newAreas.splice(index, 1);
                                            setAreas(newAreas);
                                        }
                                    }}><img src={CloseIcon} alt="close" width="12px" style={{padding: "0"}}></img></button>
                                </div>
                                {pts.map(pt => (
                                    <div key={uuid()} style={{color: "blue", display: "flex", alignItems: "baseline", marginLeft: "15px"}}>
                                        <p>{`${pts.indexOf(pt)+1}.  [${pt.coordinates[1].toFixed(8)}, ${pt.coordinates[0].toFixed(8)}]`}</p>    
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
                <button className="rounded" id="dReset" title="Reset Lines" style={{marginLeft: "0"}} onClick={(e) => {
                    e.preventDefault();
                    setAreas([]);
                }}>Reset</button>
            </div>
            
        </div>
     );
}
 
export default Sidebar;
