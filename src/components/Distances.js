import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';
import uuid from 'react-uuid';


class Distances extends PureComponent {

    haverSine = (co1, co2) => {
        	
        const R = 6371e3; // metres
        const φ1 = co1[1] * Math.PI/180; // φ, λ in radians
        const φ2 = co2[1] * Math.PI/180;
        const Δφ = (co2[1] - co1[1]) * Math.PI/180;
        const Δλ = (co2[0] - co1[0]) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres

        return d;
    };

    render() {
        const destinations = this.props.destinations;
        const points = [];
        const distances = [];
        for (let i = 0; i < destinations.length - 1; i++) {
            points.push([0.5*(destinations[i][0]+destinations[i+1][0]), 0.5*(destinations[i][1]+destinations[i+1][1])]);
            distances.push(this.haverSine(destinations[i], destinations[i+1]).toFixed(3));
        }
        return (
            points.map(point => (
                <Marker
                key={uuid()}
                latitude={point[1]}
                longitude={point[0]}>
                    <div style={{color: "rgb(180, 180, 180)", fontSize: "10.5px", backgroundColor: "rgba(0, 0, 0, 0.4)", padding: "5px", borderRadius: "5px"}}>
                        {`${distances[points.indexOf(point)]}m`}  
                    </div>
                </Marker>
            ))
        )
    }

} 

export default Distances