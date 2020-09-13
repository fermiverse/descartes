import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';
import uuid from 'react-uuid';
import pointMarker from '../graphics/marker1.svg';
import markMarker from '../graphics/marker3.svg';


class Points extends PureComponent {
    render() {
      
        const points = this.props.points;
        const fpoints = this.props.activeGid ? this.props.points.filter(point => point.gid === this.props.activeGid) : this.props.points;
        const setPoints = this.props.setPoints;
        const temp = this.props.type === "temp";
        return (
            fpoints.map(point => (
                <Marker
                key={uuid()}
                latitude={point.coordinates[1]}
                longitude={point.coordinates[0]}
                draggable={true}
                onDragEnd={(e) => {
                    let modPoints = points.slice();
                    let i = points.indexOf(point);
                    let newPoint = {
                        ...point,
                        coordinates: e.lngLat
                    }
                    modPoints.splice(i, 1, newPoint);
                    setPoints(modPoints);
                }}
                offsetLeft={temp ? -12 : -16}
                offsetTop={temp ? -12 : -38.71}>
                    <div title={`P${fpoints.indexOf(point)+1}`}>
                        <img src={temp ? markMarker : pointMarker} alt="marker" width={temp ? "24px" : "32px"} className="marker"></img>
                    </div>
                </Marker>
            ))
        )
    }

} 

export default Points