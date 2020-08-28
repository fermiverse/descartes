import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import Output from './components/Output';
import Landing from './components/Landing';
import SnapMenu from './components/SnapMenu';
import Menu from './graphics/menu.svg';
import Input from './components/Input';
import Configuration from './components/Configuration';


const App = () => {

  const style = {
    display: "flex",
    position: "relative",
    flexWrap: "nowrap",
    width: "100vw",
    height: window.innerHeight
  };
  
  const init = JSON.parse(localStorage.getItem("sessionData"));

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

  const [points, setPoints] = useState((init && init.points && init.points.length) ? init.points : [defaultCentre]);
  const [lines, setLines] = useState((init && init.lines) ? init.lines : [defaultLine]);
  const [areas, setAreas] = useState((init && init.areas) ? init.areas : [defaultArea]);
  const [showOutput, toggleShowOutput] = useState(false);
  const [showInput, toggleShowInput] = useState(false);
  const [showConfig, toggleShowConfig] = useState(false);
  const [showSidebar, toggleShowSidebar] = useState(window.innerWidth > 1000 ? true : false);
  const landing = JSON.parse(localStorage.getItem("showLanding")) === false ? false
  : (JSON.parse(sessionStorage.getItem("showLanding")) === null || JSON.parse(sessionStorage.getItem("showLanding")) === true) ? true : false;
  const [showLanding, toggleShowLanding] = useState(landing);
  const [showSnap, toggleShowSnap] = useState(false);
  const [tempMarks, setTempMarks] = useState([]);

  return (
    <div className="App" style={style}>
      {showLanding ? (
        <Landing showLanding={showLanding} toggleShowLanding={toggleShowLanding} />
      ) : (null)}
      {!showSidebar ? (
        (window.innerWidth > 1000) ? (
          <div id="title">
            <div>
                <h1>descartes v1.3</h1>
            </div>
            <div style={{display: "flex", alignItems: "center", float: "right"}}>
                <button className="collapse" title={showSidebar ? "collapse" : "expand"} onClick={() => {toggleShowSidebar(!showSidebar)}}><img src={Menu} alt="Menu" width="12px"></img></button>
            </div>
          </div>
        ) : (
          <div style={{display: "flex", alignItems: "center", position: "absolute", left: "6px", top: "22.5px", zIndex: "3500"}}>
              <button className="collapse" title={showSidebar ? "collapse" : "expand"} onClick={() => {toggleShowSidebar(!showSidebar)}}><img src={Menu} alt="Menu" width="12px"></img></button>
          </div>
        )
      ) : (null)}
      <Map points={points} setPoints={setPoints} 
      lines={lines} setLines={setLines} 
      areas={areas} setAreas={setAreas}
      showSidebar={showSidebar} 
      tempMarks={tempMarks} setTempMarks={setTempMarks} />
      {showSidebar ? (
        <Sidebar 
        points={points} setPoints={setPoints}
        lines={lines} setLines={setLines}
        areas={areas} setAreas={setAreas} 
        toggleShowInput={toggleShowInput} toggleShowOutput={toggleShowOutput} 
        showSidebar={showSidebar} toggleShowSidebar={toggleShowSidebar}
        showSnap={showSnap} toggleShowSnap={toggleShowSnap} 
        showConfig={showConfig} toggleShowConfig={toggleShowConfig} />
      ) : (null)}
      {showSnap ? (
        <SnapMenu lines={lines} setLines={setLines} showSnap={showSnap} toggleShowSnap={toggleShowSnap} tempMarks={tempMarks} setTempMarks={setTempMarks} />
      ) : (null)}
      {showOutput ? (
        <Output showOutput={showOutput} toggleShowOutput={toggleShowOutput} points={points} lines={lines} areas={areas} />
      ) : (null)}
      {showInput ? (
        <Input showInput={showInput} toggleShowInput={toggleShowInput} 
        points={points} setPoints={setPoints}
        lines={lines} setLines={setLines}
        areas={areas} setAreas={setAreas} />
      ) : (null)}
      {showConfig ? (
        <Configuration 
        showConfig={showConfig} toggleShowConfig={toggleShowConfig} 
        points={points} setPoints={setPoints}
        lines={lines} setLines={setLines}
        areas={areas} setAreas={setAreas} />
      ) : (null)}
    </div>
  )
}

export default App;
