import React, { useState } from 'react';
import closeIcon from '../graphics/close.svg';
import uuid from 'react-uuid';
import axios from 'axios';




const SnapMenu = ({showSnap, toggleShowSnap, lines, setLines, tempMarks, setTempMarks}) => {

    const reverseLine = (line) => {
        let revPts = line.points.slice();
        revPts.reverse();
        return ({
            gid: 1,
            points: revPts
        })
    };

    const [index, setIndex] = useState(null);

    const snapCoords = (line) => {
        let inputPoints = line.points.map(pt => pt.coordinates);
        let pathArr = inputPoints.map(item => String(item[1] + "," + item[0]));
        let path = pathArr.join("|");
        try {
            axios.get(`https://roads.googleapis.com/v1/snapToRoads?path=${path}&key=AIzaSyCyX-H1_PMVUFTL1Cv4wWwj6CN1U3mWtDc`)
            .then((res) => {
                let snappedCoords = res.data.snappedPoints;
                snappedCoords = snappedCoords.map(coord => ({
                    gid: 1,
                    coordinates: [coord.location.longitude, coord.location.latitude]
                }))
                setTempMarks(snappedCoords);
                               
            })
        }
        catch(err) {
            alert("Error occurred while snapping");
        }
    };
    
    return ( 
        <div className="form-container" id="snap-menu">
            <div style={{display: "flex", width: "100%", position: "relative", marginBottom: "15px"}}>
                <strong><p>Snap a line to the nearest road</p></strong>
                <button className="blank" id="close" title="Close" onClick={() => {
                    setTempMarks([]);
                    toggleShowSnap(false);
                }}>
                    <img src={closeIcon} alt="close" width="15px"></img>
                </button>
            </div>
            <div className="dlist">
                {lines.map(line => {
                    let pts = line.points;
                    return (
                        <div key={uuid()}>
                            <div key={uuid()} style={{display: "flex", alignItems: "center", marginBottom: "5px", marginTop: "5px"}}>
                                <label style={{margin: 0}}>{`LineString ${lines.indexOf(line)+1}`}</label>
                                <input id="radio" name="radio" type="radio" value={`${lines.indexOf(line)}`} />
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
            <button className="rounded" id="snap-ext" title="Snap line" style={{marginLeft: 0}} onClick={(e) => {
                e.preventDefault();
                let s = document.querySelector('input[name="radio"]:checked') ? document.querySelector('input[name="radio"]:checked').value : null;
                if (s) {
                    setIndex(s);
                    snapCoords(lines[s]);
                }
            }}>Snap</button>
            <button className="rounded" id="snap-ext" title="Reverse line and snap" onClick={(e) => {
                e.preventDefault();
                let s = document.querySelector('input[name="radio"]:checked') ? document.querySelector('input[name="radio"]:checked').value : null;
                if (s) {
                    setIndex(s);
                    snapCoords(reverseLine(lines[s]));
                }
            }}>Reverse snap</button>
            <button className="rounded" id="snap-ext" title="Apply change" onClick={(e) => {
                e.preventDefault();
                if (index && tempMarks) {
                    let modLines = [...lines];
                    modLines.splice(index, 1, {
                        gid: 1,
                        points: tempMarks
                    });
                    setLines(modLines);
                }
            }}>Apply</button>
        </div>
     );
}
 
export default SnapMenu;
