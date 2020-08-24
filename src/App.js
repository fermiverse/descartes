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
  
  const init = JSON.parse(localStorage.getItem("sessionData"));
  
  /*
  const [origin, setOrigin] = useState(init && init["origin"] && init["origin"].length ? init["origin"] : [77.516233, 28.494164]);
  const [destinations, setDestinations] = useState(init ? init["destinations"] : []);
  const [showOutput, toggleShowOutput] = useState(false);
  const landing = JSON.parse(localStorage.getItem("showLanding")) === false && JSON.parse(localStorage.getItem("showLanding")) !== null ? false
  : (JSON.parse(sessionStorage.getItem("showLanding")) === null || JSON.parse(sessionStorage.getItem("showLanding")) === true) ? true : false;
  const [showLanding, toggleShowLanding] = useState(landing);
  const [showSidebar, toggleShowSidebar] = useState(true);
  */

  const onUnloadSave = () => {
    const item = {
      points: points, 
      lines: lines,
      areas: areas
    };
    localStorage.setItem("sessionData", JSON.stringify(item));
    sessionStorage.setItem("showLanding", JSON.stringify(showLanding));
  }

  useEffect(() => {
    window.addEventListener("beforeunload", onUnloadSave);
  });

  /*
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
  );*/

  const defaultCentre = {
    gid: 1,
    coordinates: [77.516233, 28.494164]
  };

  const defaultLine = {
    gid: 1,
    points: [
      {
        gid: 1,
        coordinates: [77.536233, 28.494164]
      },
      {
        gid: 1,
        coordinates: [77.556233, 28.494164]
      },
      {
        gid: 1,
        coordinates: [77.546233, 28.492164]
      }
    ]
  };

  const defaultArea = {
    gid: 1,
    points: [
      {
        gid: 1,
        coordinates: [77.53133700, 28.50721867]
      },
      {
        gid: 1,
        coordinates: [77.53786711, 28.50213750]
      },
      {
        gid: 1,
        coordinates: [77.53892413, 28.51272691]
      },
      {
        gid: 1,
        coordinates: [77.53150213, 28.51518115]
      }
    ]
  }

  const [points, setPoints] = useState((init.points && init.points.length) ? init.points : [defaultCentre]);
  const [lines, setLines] = useState((init.lines && init.lines.length) ? init.lines : [defaultLine]);
  const [areas, setAreas] = useState((init.areas && init.areas.length) ? init.areas : [defaultArea]);
  const [showOutput, toggleShowOutput] = useState(false);
  const [showSidebar, toggleShowSidebar] = useState(true);
  const landing = JSON.parse(localStorage.getItem("showLanding")) === false && JSON.parse(localStorage.getItem("showLanding")) !== null ? false
  : (JSON.parse(sessionStorage.getItem("showLanding")) === null || JSON.parse(sessionStorage.getItem("showLanding")) === true) ? true : false;
  const [showLanding, toggleShowLanding] = useState(landing);

  return (
    <div className="App" style={style}>
      {showLanding ? (
        <Landing showLanding={showLanding} toggleShowLanding={toggleShowLanding} />
      ) : (null)}
      {!showSidebar ? (
        <div id="title">
          <div>
              <h1>descartes v1.3</h1>
          </div>
          <div style={{display: "flex", alignItems: "center", float: "right"}}>
              <button className="collapse" title={showSidebar ? "collapse" : "expand"} onClick={() => {toggleShowSidebar(!showSidebar)}}><img src={Menu} alt="Menu" width="12px"></img></button>
          </div>
      </div>
      ) : (null)}
      <Map points={points} setPoints={setPoints} 
      lines={lines} setLines={setLines} 
      areas={areas} setAreas={setAreas}
      showSidebar={showSidebar} />
      {showSidebar ? (
        <Sidebar 
        points={points} setPoints={setPoints}
        lines={lines} setLines={setLines}
        areas={areas} setAreas={setAreas} 
        showOutput={showOutput} toggleShowOutput={toggleShowOutput} showSidebar={showSidebar} toggleShowSidebar={toggleShowSidebar}/>
      ) : (null)}
    </div>
  )
}

export default App;
