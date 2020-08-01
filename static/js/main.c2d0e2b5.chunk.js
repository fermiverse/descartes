(this.webpackJsonpdescartes=this.webpackJsonpdescartes||[]).push([[0],{14:function(e,t,a){e.exports=a.p+"static/media/close.8b20cee7.svg"},30:function(e,t,a){e.exports=a.p+"static/media/marker1.3f22cecd.svg"},31:function(e,t,a){e.exports=a.p+"static/media/marker2.5ce11098.svg"},32:function(e,t,a){e.exports=a.p+"static/media/earth.11093ee1.svg"},33:function(e,t,a){e.exports=a.p+"static/media/regmap.07ddfa3b.svg"},35:function(e,t,a){e.exports=a.p+"static/media/information.8bbb0af1.svg"},37:function(e,t,a){e.exports=a(61)},42:function(e,t,a){},61:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),o=a(28),l=a.n(o),r=(a(42),a(7)),c=a(10),s=a(30),u=a.n(s),m=a(31),d=a.n(m),p=a(32),g=a.n(p),E=a(33),f=a.n(E),b=function(e){var t=e.origin,a=e.setOrigin,o=e.destinations,l=e.setDestinations,s=Object(n.useState)({latitude:t[1],longitude:t[0],width:"75vw",height:"100vh",zoom:14}),m=Object(r.a)(s,2),p=m[0],E=m[1],b=Object(n.useState)(!1),v=Object(r.a)(b,2),h=v[0],y=v[1];return i.a.createElement("div",{id:"map"},i.a.createElement(c.d,Object.assign({},p,{mapboxApiAccessToken:"pk.eyJ1IjoiZmVybWl2ZXJzZSIsImEiOiJja2Q2YzJ3Zjkwam1mMnFuMG1zNjg5eDhmIn0.SwCaqFKXTC_-WkcbYqFcsQ",mapStyle:h?"mapbox://styles/mapbox/satellite-v9":"mapbox://styles/fermiverse/ckd7yqq7u084t1iqj97nvbjc6",onViewportChange:function(e){E(e)}}),i.a.createElement("div",{style:{position:"absolute",right:"15px",top:"30px"}},i.a.createElement(c.c,null)),i.a.createElement("div",{style:{position:"absolute",top:"135px",right:"15px"}},i.a.createElement(c.a,{onViewportChange:function(e){E({latitude:t[1]||28.494164,longitude:t[0]||77.516233,width:"75vw",height:"100%",zoom:12})}})),t.length?i.a.createElement(c.b,{latitude:t[1],longitude:t[0],draggable:!0,onDragEnd:function(e){a(e.lngLat)}},i.a.createElement("div",{title:"origin"},i.a.createElement("img",{src:u.a,alt:"marker",width:"32px",className:"marker"}))):null,o.map((function(e){return i.a.createElement(c.b,{key:String(e[1]),latitude:e[1],longitude:e[0],draggable:!0,onDragEnd:function(t){var a=o.slice(),n=o.indexOf(e),i=t.lngLat;a.splice(n,1,i),l(a)}},i.a.createElement("div",{title:"destination_".concat(o.indexOf(e)+1)},i.a.createElement("img",{src:d.a,alt:"marker",width:"32px",className:"marker"})))})),h?i.a.createElement("button",{className:"blank",id:"toggle",title:"Regular View",onClick:function(){y(!h)}},i.a.createElement("img",{src:f.a,alt:"mapicon",width:"30px"})):i.a.createElement("button",{className:"blank",id:"toggle",title:"Satellite View",onClick:function(){y(!h)}},i.a.createElement("img",{src:g.a,alt:"sat",width:"30px"})),i.a.createElement("button",{className:"rounded",id:"reset",onClick:function(){a([]),l([])}},"Reset")))},v=a(12),h=a(34),y=a(14),x=a.n(y),w=a(35),O=a.n(w),N=a(36),k=a.n(N),j=function(e){var t=e.destinations,a=e.setDestinations,o=e.origin,l=e.setOrigin,c=e.showOutput,s=e.toggleShowOutput,u=Object(n.useState)(!1),m=Object(r.a)(u,2),d=m[0],p=m[1],g=function(e,t){return""!==e&&""!==t&&(!isNaN(e)&&!isNaN(t)&&Math.abs(+e)<=90&&Math.abs(+t)<=180)},E=function(e){return"origin"===e?i.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t=e.target.elements[0].value,a=e.target.elements[1].value;g(t,a)?(l([Number(a),Number(t)]),e.target.reset()):alert("Enter valid coordinates in origin field!")}},i.a.createElement("input",{type:"text",id:"latitude",placeholder:"Latitude",autoComplete:"off"}),i.a.createElement("input",{type:"text",id:"longitude",placeholder:"Longitude",autoComplete:"off"}),i.a.createElement("button",{className:"rounded",type:"submit"},"Set")):i.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n=e.target.elements[0].value,i=e.target.elements[1].value;g(n,i)?(a([].concat(Object(v.a)(t),[[Number(i),Number(n)]])),e.target.reset()):alert("Enter valid coordinates in destination field!")}},i.a.createElement("input",{type:"text",id:"latitude",placeholder:"Latitude",autoComplete:"off"}),i.a.createElement("input",{type:"text",id:"longitude",placeholder:"Longitude",autoComplete:"off"}),i.a.createElement("button",{className:"rounded",type:"submit"},"Add"))};return i.a.createElement("div",{id:"sidebar"},i.a.createElement("div",{style:{display:"flex",width:"80%"}},i.a.createElement("div",null,i.a.createElement("h1",null,"descartes v1.0")),i.a.createElement("div",{style:{display:"flex",alignItems:"center",float:"right"}},i.a.createElement("button",{className:"collapse"},"< >"))),i.a.createElement("div",null,i.a.createElement("div",{className:"form-container"},i.a.createElement("p",null,"Origin"),o&&o.length?i.a.createElement("div",{style:{color:"blue",marginTop:"5px",marginBottom:"5px"}},"(".concat(o[1].toFixed(8),", ").concat(o[0].toFixed(8),")")):null,E("origin")),i.a.createElement("div",{className:"form-container"},i.a.createElement("p",null,"Destination(s)"),i.a.createElement("div",{style:{marginTop:"5px",marginBottom:"5px"}},t.length?t.map((function(e){return i.a.createElement("div",{key:String(e[0]),style:{color:"blue",display:"flex",alignItems:"baseline"}},i.a.createElement("p",null,"(".concat(e[1].toFixed(8),", ").concat(e[0].toFixed(8),")")),i.a.createElement("button",{className:"blank",onClick:function(){var n=t.indexOf(e),i=t.slice();n>-1&&(i.splice(n,1),a(i))}},i.a.createElement("img",{src:x.a,alt:"close",width:"12px"})))})):i.a.createElement("p",null,"No destinations yet!")),E())),i.a.createElement("div",{className:"form-container"},i.a.createElement("div",{style:{display:"flex",alignItems:"center"}},i.a.createElement("p",null,"Raw Input"),i.a.createElement("button",{className:"blank",onClick:function(){p(!d)}},i.a.createElement("img",{src:O.a,alt:"info",width:"12px"}))),d?i.a.createElement("p",{style:{color:"rgb(90, 90, 90)"}},"Enter coordinates as lat, lng on separate lines. First coordinate is considered origin, the rest, destinations."):null,i.a.createElement("div",{id:"raw",contentEditable:"true"}),i.a.createElement("div",{style:{display:"flex"}},i.a.createElement("button",{className:"rounded",onClick:function(){!function(e){var t,n=e.split("\n"),i=[],o=Object(h.a)(n);try{for(o.s();!(t=o.n()).done;){var r=t.value;r=r.split(","),g.apply(void 0,Object(v.a)(r))&&i.push([Number(r[1]),Number(r[0])])}}catch(c){o.e(c)}finally{o.f()}i[0]&&(i.length!==n.length&&alert("Some coordinates in raw input are invalid"),l(i[0]),a(i.slice(1)))}(document.getElementById("raw").innerText),document.getElementById("raw").innerHTML=""}},"Insert"),i.a.createElement("button",{className:"rounded",id:"snap",onClick:function(){0===t.length&&alert("No destinations set!");var e=t.map((function(e){return String(e[1]+","+e[0])})).join("|");try{k.a.get("https://roads.googleapis.com/v1/snapToRoads?path=".concat(e,"&key=AIzaSyCyX-H1_PMVUFTL1Cv4wWwj6CN1U3mWtDc")).then((function(e){var t=e.data.snappedPoints;t=t.map((function(e){return[e.location.longitude,e.location.latitude]})),window.confirm("Are you sure you want to snap destinations to the nearest road?")?a(t):alert("Snap aborted")}))}catch(n){alert("Error occurred while snapping")}},title:"snap to road"},"Snap"),i.a.createElement("button",{className:"rounded",id:"pop",onClick:function(){s(!c)},title:"output"},"Output"))))},S=function(e){e.showOutput;var t=e.toggleShowOutput,a=e.origin,o=e.destinations,l=[a].concat(Object(v.a)(o)),c=Object(n.useState)(!1),s=Object(r.a)(c,2),u=s[0],m=s[1];return i.a.createElement("div",{className:"output"},i.a.createElement("div",{className:"form-container"},i.a.createElement("div",{style:{display:"flex",width:"100%",position:"relative"}},i.a.createElement("p",null,"Raw Output"),i.a.createElement("button",{className:"blank",id:"close",title:"close",onClick:function(){t(!1)}},i.a.createElement("img",{src:x.a,alt:"close",width:"15px"}))),a[0]?i.a.createElement("div",null,i.a.createElement("div",{id:"output-coords",style:{marginTop:"30px",marginBottom:"10px",color:"blue"}},l.map((function(e){return i.a.createElement("p",null,"".concat(e[1],", ").concat(e[0]))}))),i.a.createElement("div",{style:{display:"flex"}},i.a.createElement("button",{className:"rounded",id:"copy",title:"copy",onClick:function(){var e=document.getElementById("output-coords").textContent;navigator.clipboard.writeText(e).then((function(){m(!0)}))}},"Copy"),u?i.a.createElement("div",{style:{color:"rgb(100,100,100)",marginLeft:"20px",marginTop:"12px"}},"Copied to clipboard"):null)):i.a.createElement("div",null,"No coordinates specified!")))},C=function(){var e=Object(n.useState)([77.516233,28.494164]),t=Object(r.a)(e,2),a=t[0],o=t[1],l=Object(n.useState)([]),c=Object(r.a)(l,2),s=c[0],u=c[1],m=Object(n.useState)(!1),d=Object(r.a)(m,2),p=d[0],g=d[1];return i.a.createElement("div",{className:"App"},i.a.createElement(j,{destinations:s,setDestinations:u,origin:a,setOrigin:o,showOutput:p,toggleShowOutput:g}),i.a.createElement(b,{origin:a,setOrigin:o,destinations:s,setDestinations:u}),p?i.a.createElement(S,{showOutput:p,toggleShowOutput:g,origin:a,destinations:s}):null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[37,1,2]]]);
//# sourceMappingURL=main.c2d0e2b5.chunk.js.map