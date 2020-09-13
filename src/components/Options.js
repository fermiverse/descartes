import React, { useState } from 'react';
import uuid from 'react-uuid';
import closeIcon from '../graphics/close.svg';
import infoIcon from '../graphics/information.svg';

const Options = ({gids, setGids, activeGid, setActiveGid, displayGid, setDisplayGid, points, lines, areas, setPoints, setLines, setAreas}) => {

    const elemCount = (gid) => {
        let count = 0;
        const fpoints = points.filter(point => point.gid === gid);
        const flines = lines.filter(line => line.gid === gid);
        const fareas = areas.filter(area => area.gid === gid);
        count += fpoints.length;
        for (const line of flines) count += line.points.length;
        for (const area of fareas) count += area.points.length;
        return count;
    };

    const rand = (guess) => {
        if (gids.includes(guess)) {
            const res = +guess.replace("Group ", "");
            return rand("Group " + (res + 1));
        } else return guess;
    };

    const [showInfo, toggleShowInfo] = useState(false);

    return ( 
        <div>
            <div style={{display: "flex", alignItems: "center"}}>
                {`Groups (${gids.length})`}
                <div onMouseEnter={() => {
                    toggleShowInfo(true);
                }} onMouseLeave={() => {
                    toggleShowInfo(false);
                }}>
                    <img src={infoIcon} alt="info" width="12px" style={{marginLeft: "8px"}}></img>
                </div>
            </div>
            {showInfo ? (
                <div style={{color: "rgb(50, 50, 50)", fontSize: "12px"}}><i>Click on a group to make it active. Only the active group is rendered dynamically to the map.</i></div>
            ) : (null)}
            <div className="options">
                {gids.map(gid => (gid === displayGid) ? (
                    <button key={uuid()} className="chip" title="Active group">
                        {gid ? gid : "All"}
                        <div className="blank-no-padding" title="Delete" onClick={() => {
                            let conf = window.confirm(`Delete ${gid} and all its contents?`);
                            if (conf) {
                                const newPoints = points.filter(point => point.gid !== gid);
                                const newLines = lines.filter(line => line.gid !== gid);
                                const newAreas = areas.filter(area => area.gid !== gid);
                                const newGids = gids.filter(id => id !== gid);
                                setPoints(newPoints);
                                setLines(newLines);
                                setAreas(newAreas);
                                setGids(newGids);
                            }
                        }}>
                            <img src={closeIcon} alt="close" width="12px" style={{marginLeft: "10px"}}></img>
                        </div>
                    </button>
                ) : (elemCount(gid) < 1000 ? (
                    <button key={uuid()} className="inactive-chip" title="Inactive group" onClick={(e) => {
                        setDisplayGid(gid);
                        setActiveGid(gid);
                    }}>
                        {gid ? gid : "All"}
                        <div className="blank" title="Delete" onClick={() => {
                            let conf = window.confirm(`Delete ${gid} and all its contents?`);
                            if (conf) {
                                const newPoints = points.filter(point => point.gid !== gid);
                                const newLines = lines.filter(line => line.gid !== gid);
                                const newAreas = areas.filter(area => area.gid !== gid);
                                const newGids = gids.filter(id => id !== gid);
                                setPoints(newPoints);
                                setLines(newLines);
                                setAreas(newAreas);
                                setGids(newGids);
                            }
                        }}>
                            <img src={closeIcon} alt="close" width="12px" style={{marginLeft: "10px"}}></img>
                        </div>
                    </button>
                ) : (
                    <button key={uuid()} className="static-chip" title="Static group" onClick={(e) => {
                        setDisplayGid(gid);
                    }}>
                        {gid}
                        <div className="blank" title="Delete" onClick={() => {
                            let conf = window.confirm(`Delete ${gid} and all its contents?`);
                            if (conf) {
                                const newPoints = points.filter(point => point.gid !== gid);
                                const newLines = lines.filter(line => line.gid !== gid);
                                const newAreas = areas.filter(area => area.gid !== gid);
                                const newGids = gids.filter(id => id !== gid);
                                setPoints(newPoints);
                                setLines(newLines);
                                setAreas(newAreas);
                                setGids(newGids);
                            }
                        }}>
                            <img src={closeIcon} alt="close" width="12px" style={{marginLeft: "10px"}}></img>
                        </div>
                    </button>
                )
                ))}
                
            </div>
            <div style={{display: "flex"}}>
                <button className="rounded" title="Add a new group" onClick={() => {
                    const defaultGid = "Group " + (gids.length + 1);
                    setGids([...gids, rand(defaultGid)]);
                }}>New</button>
                <button className="rounded" id="compress" title="Remove empty groups" onClick={() => {
                    const conf = window.confirm("Delete all empty groups?");
                    if (conf) {
                        const filledGroups = gids.filter(gid => elemCount(gid) > 0);
                        setGids(filledGroups);
                    }
                }}>Compress</button>
            </div>
        </div>
     );
}
 
export default Options;