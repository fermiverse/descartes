import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import Output from './components/Output';
import Landing from './components/Landing';
import Menu from './graphics/menu.svg';


const App = () => {

  const style = {
    display: "flex",
    position: "relative",
    flexWrap: "nowrap",
    width: "100vw",
    height: "100%"
  };
  
  /*Station schema:
    Points: [{
      id: uuid,
      type: "Point",
      coordinates: [lng, lat]},],
    Lines: [{
      id: uuid,
      type: "LineString",
      coordinates: [[lng, lat], ]},]*/ 
  
  const init = JSON.parse(localStorage.getItem("sessionData"));
  const [origin, setOrigin] = useState(init && init["origin"] && init["origin"].length ? init["origin"] : [77.516233, 28.494164]);
  const [destinations, setDestinations] = useState(init ? init["destinations"] : []);
  const [showOutput, toggleShowOutput] = useState(false);
  const landing = JSON.parse(localStorage.getItem("showLanding")) === false && JSON.parse(localStorage.getItem("showLanding")) !== null ? false
  : (JSON.parse(sessionStorage.getItem("showLanding")) === null || JSON.parse(sessionStorage.getItem("showLanding")) === true) ? true : false;
  const [showLanding, toggleShowLanding] = useState(landing);
  const [showSidebar, toggleShowSidebar] = useState(true);

  const onUnloadSave = () => {
    const item = {
      origin: origin, 
      destinations: destinations
    };
    localStorage.setItem("sessionData", JSON.stringify(item));
    sessionStorage.setItem("showLanding", JSON.stringify(showLanding));
  }

  useEffect(() => {
    window.addEventListener("beforeunload", onUnloadSave);
  });

  return (
    <div className="App" style={style}>
      {showLanding ? (
        <Landing showLanding={showLanding} toggleShowLanding={toggleShowLanding} />
      ) : (null)}
      {showSidebar ? (
        <Sidebar 
        destinations={destinations} setDestinations={setDestinations} 
        origin={origin} setOrigin={setOrigin} 
        showOutput={showOutput} toggleShowOutput={toggleShowOutput} toggleShowSidebar={toggleShowSidebar}/>
      ) : (
        <div style={{display: "flex", fontFamily: "Comfortaa", position: "absolute", left: "20px", top: "0", zIndex: "3000", color: "white"}}>
            <div>
                <h1>descartes v1.2</h1>
            </div>
            <div style={{display: "flex", alignItems: "center", float: "right"}}>
                <button className="collapse" title="expand" onClick={() => {toggleShowSidebar(true)}}><img src={Menu} alt="Menu" width="12px"></img></button>
            </div>
        </div>
      )}
      
      <Map origin={origin} setOrigin={setOrigin} destinations={destinations} setDestinations={setDestinations} showSidebar={showSidebar}/>
      {showOutput ? (
        <Output showOutput={showOutput} toggleShowOutput={toggleShowOutput} origin={origin} destinations={destinations} />
      ) : (null)}
    </div>
  );
}

export default App;
