import React, { useState } from 'react';
import Menu from '../graphics/menu.svg';
import Indicator1 from '../graphics/indicator1.svg';
import Indicator2 from '../graphics/indicator2.svg';
import Indicator3 from '../graphics/indicator3.svg';
import Inline from './Inline';
import ListPoints from './ListPoints';
import ListEntities from './ListEntities';
import Options from './Options';

const Sidebar = ({points, setPoints, 
    lines, setLines, 
    areas, setAreas, 
    toggleShowInput, toggleShowOutput, 
    showSidebar, toggleShowSidebar, 
    showSnap, toggleShowSnap, 
    activeGid, setActiveGid,
    gids, setGids}) => {
    
    const [showInline, toggleShowInline] = useState(false);
    const [displayGid, setDisplayGid] = useState(activeGid);
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
    };

    const validateField = (lat, lng) => {
        if (lat === "" || lng === "") {
            return false;
        }
        let isValid = (!isNaN(lat) && !isNaN(lng) && Math.abs(+lat) <= 90.0 && Math.abs(+lng) <= 180.0) ? true : false;
        return isValid
    };

     const form = () => {
        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                const cds = e.target.elements[0].value.split(',')
                if (validateField(cds[0], cds[1])) {
                    let newPoint = {
                        gid: activeGid,
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
                <input id="coords" type="text" placeholder="<Latitude>, <Longitude>" autoComplete="off"></input>
                <div style={{display: "flex"}}>
                    <button className="rounded" type="submit">Add</button>
                    <button className="rounded" id="dReset" title="Reset Points" onClick={(e) => {
                        e.preventDefault();
                        const fpoints = points.filter(point => point.gid !== displayGid);
                        if (points.length > fpoints.length) {
                            const conf = window.confirm("Delete all points from active group?");
                            if (conf) {
                                setPoints(fpoints);
                            }
                        }
                    }}>Reset</button>
                </div>
            </form>
        )
    };
    return (
        <div id="sidebar" style={style}>
            <div style={{display: "flex", fontFamily: "Comfortaa", color: "white"}}>
                <div>
                    <h1>descartes v2.0</h1>
                </div>
                <div style={{display: "flex", alignItems: "center", float: "right"}}>
                    <button className="collapse" title={showSidebar ? "collapse" : "expand"} onClick={() => {toggleShowSidebar(!showSidebar)}}>
                        <img src={Menu} alt="Menu" width="14px"></img>
                    </button>
                </div>
            </div>
            <div className="form-container">
                <Options gids={gids} setGids={setGids} 
                activeGid={activeGid} setActiveGid={setActiveGid} 
                displayGid={displayGid} setDisplayGid={setDisplayGid} 
                points={points} lines={lines} areas={areas}
                setPoints={setPoints} setLines={setLines} setAreas={setAreas} />
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
                <Inline 
                points={points} setPoints={setPoints} 
                lines={lines} setLines={setLines} 
                areas={areas} setAreas={setAreas} 
                toggleShowInline={toggleShowInline} activeGid={activeGid} gids={gids} setGids={setGids} />
            ) : (null)}
            <div className="form-container">
                <div style={{display: "flex", alignItems: "baseline"}}>
                    <p>{`Points (${points.filter(point => point.gid === displayGid).length})`}</p>
                    <img src={Indicator1} alt="i1" width="10px" style={{marginLeft: "6px"}}/>
                </div>
                <ListPoints points={displayGid ? points.filter(point => point.gid === displayGid) : points} setPoints={setPoints} />
                {form()}

            </div>
            <div className="form-container">
                <div style={{display: "flex", alignItems: "baseline"}}>
                    <p>{`Lines (${lines.filter(line => line.gid === displayGid).length})`}</p>
                    <img src={Indicator2} alt="i2" height="10px" style={{marginLeft: "6px"}}/>
                </div>
                <ListEntities entities={displayGid ? lines.filter(line => line.gid === displayGid) : lines} setEntities={setLines} type={"lines"} />
                <button className="rounded" id="snap" title="Snap to road" style={{marginLeft: "0"}} onClick={() => {toggleShowSnap(true)}}>Snap</button>
                <button className="rounded" id="dReset" title="Reset Lines" style={{marginLeft: "10px"}} onClick={(e) => {
                    e.preventDefault();
                    const flines = lines.filter(line => line.gid !== displayGid);
                    if (lines.length > flines.length) {
                        const conf = window.confirm("Delete all lines from active group?");
                        if (conf) {
                            setLines(flines);
                        }
                    }
                }}>Reset</button>
            </div>
            <div className="form-container">
                <div style={{display: "flex", alignItems: "center"}}>
                    <p>{`Areas (${areas.filter(area => area.gid === displayGid).length})`}</p>
                    <img src={Indicator3} alt="i3" width="30px" style={{marginLeft: "6px"}} />
                </div>
                <ListEntities entities={displayGid ? areas.filter(area => area.gid === displayGid) : areas} setEntities={setAreas} type={"areas"} />
                <button className="rounded" id="dReset" title="Reset Lines" style={{marginLeft: "0"}} onClick={(e) => {
                    e.preventDefault();
                    const fareas = areas.filter(area => area.gid !== displayGid);
                    if (areas.length > fareas.length) {
                        const conf = window.confirm("Delete all polygons from active group?");
                        if (conf) {
                            setAreas(fareas);
                        }
                    }
                }}>Reset</button>
            </div>
            
        </div>
    );
}
 
export default Sidebar;
