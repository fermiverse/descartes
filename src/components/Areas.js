import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';
import uuid from 'react-uuid';
import areaMarker from '../graphics/marker4.svg';


class Areas extends PureComponent {
    render() {
        const areas = this.props.areas;
        const fareas = this.props.activeGid ? this.props.areas.filter(area => area.gid === this.props.activeGid) : this.props.areas;
        const setAreas = this.props.setAreas;
        
        return (fareas.map(area => (
            area.points.map(point => (
                <Marker
                key={uuid()}
                latitude={point.coordinates[1]}
                longitude={point.coordinates[0]}
                draggable={true}
                onDragEnd={(e) => {
                    let modPoints = area.points.slice();
                    let i = area.points.indexOf(point);
                    let newPoint = {
                        ...point,
                        coordinates: e.lngLat
                    }
                    modPoints.splice(i, 1, newPoint);
                    let modAreas = areas.slice();
                    let j = areas.indexOf(area);
                    let newArea = {
                        ...area,
                        points: modPoints
                    };
                    modAreas.splice(j, 1, newArea);
                    setAreas(modAreas);
                }}
                offsetLeft={-12}
                offsetTop={-12}>
                    <div title={`A${fareas.indexOf(area)+1}`}>
                        <img src={areaMarker} alt="marker" width="24px" className="marker"></img>
                    </div>
                </Marker>
            ))
        )))
    }

} 

export default Areas