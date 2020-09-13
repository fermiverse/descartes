import React, { useState } from 'react';
import uuid from 'react-uuid';
import CloseIcon from '../graphics/close.svg';
import ExpandIcon from '../graphics/expand.svg';

const Entity = ({ent, entities, setEntities, type}) => {

    const [showContents, toggleShowContents] = useState(false);
    let pts = ent.points;
    return ( 
        <div key={uuid()}>
            <div key={uuid()} style={{display: "flex", alignItems: "baseline", marginBottom: "5px", marginTop: "5px"}}>
                <p>{`${entities.indexOf(ent)+1}. ${type === "areas" ? "Polygon" : "LineString"} ${entities.indexOf(ent)+1}`}</p>
                <button className="blank" title="Expand" onClick={() => {
                    toggleShowContents(!showContents);
                }}><img src={ExpandIcon} alt="expand" width="9px"></img></button>
                <button className="blank" title="Clear" onClick={() => {
                    let index = entities.indexOf(ent);
                    let newentities = entities.slice();
                    if (index > -1) {
                        newentities.splice(index, 1);
                        setEntities(newentities);
                    }
                }}><img src={CloseIcon} alt="close" width="12px" style={{padding: "0"}}></img></button>
            </div>
            {showContents ? pts.map(pt => (
                <div key={uuid()} style={{color: "blue", display: "flex", alignItems: "baseline", marginLeft: "15px"}}>
                    <p>{`${pts.indexOf(pt)+1}.  [${pt.coordinates[1].toFixed(8)}, ${pt.coordinates[0].toFixed(8)}]`}</p>    
                </div>
            )) : null}
        </div>
     );
}
 
export default Entity;