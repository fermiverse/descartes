import React from 'react';

const Inline = () => {
    return ( 
        <div className="form-container">
            <p>Enter geoJSON from a remote source</p>
            <pre id="out-geojson" contentEditable="true" style={{outline: "none", minHeight: "20px", 
            backgroundColor: "rgb(170, 170, 170)",
            color: "blue", 
            padding: "13px", 
            paddingTop: "8px",
            paddingBottom: "8px",
            borderRadius: "20px"}} 
            onFocus={() => {
                navigator.clipboard.readText().then((clipText) => {
                    document.getElementById("out-geojson").innerText = clipText;
                })
            }}>
            </pre>
        </div>
     );
}
 
export default Inline;