import React from 'react';
import MainImage from '../graphics/descartes_big.svg';
import Github from '../graphics/github.png';
import Instagram from '../graphics/instagram.png';
import Linkedin from '../graphics/linkedin.png';
import Nawgati from '../graphics/plogo.svg';


const Landing = ({showLanding, toggleShowLanding}) => {
    let rev = !showLanding;
    return ( 
        <div className="landing">
            <div className="view" id="intro">
                <h1>descartes v2.0</h1>
                <h2>A simple map-marking tool, developed by the team at <strong><a href="https://www.nawgati.com/">Nawgati</a></strong></h2>
                <div className="social">
                    <a href="https://www.nawgati.com/" title="Nawgati"><img src={Nawgati} alt="Nawgati" height="20px"></img></a>
                    <a href="https://github.com/nawgati/"><img src={Github} className="bottom-icon" alt="github" width="20px"></img></a>
                    <a href="https://www.linkedin.com/company/nawgati"><img src={Linkedin} className="bottom-icon" alt="linkedin" width="20px"></img></a>
                    <a href="https://www.instagram.com/nawgati/"><img src={Instagram} className="bottom-icon" alt="instagram" width="20px"></img></a>
                </div>
            </div>
            <div className="view" id="hero">
                <img src={MainImage} alt="main" title="Descartes" width="100%"></img>
                <div id="btn-grp">
                    <button className="rounded" id="proceed" onClick={() => {
                        setTimeout(toggleShowLanding(false), 1000);
                    }}>Proceed</button>
                </div>
                <div style={{marginTop: "40px", display: "flex", color: "white", justifyContent: "center", alignItems: "center"}}>
                    <input type="checkbox" id="ch" onChange={() => {
                        localStorage.setItem("showLanding", JSON.stringify(rev));
                        rev = !rev;
                    }}></input>
                    <label>Skip this page the next time</label>
                </div>
            </div>
        </div>
     );
}
 
export default Landing;