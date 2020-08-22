import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';
import uuid from 'react-uuid';
import destinationMarker from '../graphics/marker2.svg';


class Markers extends PureComponent {
    render() {
        const destinations = this.props.destinations;
        const setDestinations = this.props.setDestinations;
        return (
            destinations.map(destination => (
                <Marker
                key={uuid()}
                latitude={destination[1]}
                longitude={destination[0]}
                draggable={true}
                onDragEnd={(e) => {
                    let modDests = destinations.slice();
                    let i = destinations.indexOf(destination);
                    let newCoords = e.lngLat;
                    modDests.splice(i, 1, newCoords);
                    setDestinations(modDests);
                }}
                offsetLeft={-16}
                offsetTop={-38.71}>
                    <div title={`destination_${destinations.indexOf(destination)+1}`}>
                        <img src={destinationMarker} alt="marker" width="32px" className="marker"></img>
                    </div>
                </Marker>
            ))
        )
    }

} 

export default Markers