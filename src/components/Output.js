import React, { useState } from 'react';
import closeIcon from '../graphics/close.svg';
import uuid from 'react-uuid';



const Output = ({showOutput, toggleShowOutput, points, lines, areas}) => {

    
    const [showConfirm, toggleShowConfirm] = useState(false);

    /*return ( 
        <div className="output">
            <div className="form-container" id="output">
                <div style={{display: "flex", width: "100%", position: "relative"}}>
                    <p>Raw Output</p>
                    <button className="blank" id="close" title="close" onClick={() => {
                        toggleShowOutput(false);
                    }}>
                        <img src={closeIcon} alt="close" width="15px"></img>
                    </button>
                </div>
                <p style={{color: "rgb(50, 50, 50)"}}>{`${outCoords.length} entries`}</p>
                {origin[0] ? (
                    <div>
                        <div id="output-coords">
                            {outCoords.map((coord) => (
                                <p key={uuid()}>{`${coord[1]}, ${coord[0]}`}</p>
                            ))}
                        </div>
                        <div style={{display: "flex"}}>
                            <button className="rounded" id="copy" title="copy" onClick={() => {
                                let outElem = document.getElementById("output-coords");
                                let outText = outElem.textContent;
                                navigator.clipboard.writeText(outText)
                                .then(() => {toggleShowConfirm(true)});
                            }}>Copy</button>
                            {showConfirm ? (
                                <div style={{color: "rgb(100,100,100)", marginLeft: "20px", marginTop: "12px"}}>
                                    Copied to clipboard
                                </div>
                            ) : (null)}
                        </div>
                    </div>
                ) : (
                    <div>No coordinates specified!</div>
                )}
            </div>
        </div>
     );*/
    return (
        <div className="output">
            <div className="form-container" id="output">
                <div style={{display: "flex", width: "100%", position: "relative"}}>
                    <p>Raw Output</p>
                    <button className="blank" id="close" title="close" onClick={() => {
                        toggleShowOutput(false);
                    }}>
                        <img src={closeIcon} alt="close" width="15px"></img>
                    </button>
                </div>
            </div>
        </div>
    )
}
 
export default Output;
