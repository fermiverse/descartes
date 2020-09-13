import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';
import uuid from 'react-uuid';
import lineMarker from '../graphics/marker2.svg';


class Lines extends PureComponent {
    render() {
        const lines = this.props.lines;
        const flines = this.props.activeGid ? this.props.lines.filter(line => line.gid === this.props.activeGid) : this.props.lines;
        const setLines = this.props.setLines;
        
        return (flines.map(line => (
            line.points.map(point => (
                <Marker
                key={uuid()}
                latitude={point.coordinates[1]}
                longitude={point.coordinates[0]}
                draggable={true}
                onDragEnd={(e) => {
                    let modPoints = line.points.slice();
                    let i = line.points.indexOf(point);
                    let newPoint = {
                        ...point,
                        coordinates: e.lngLat
                    }
                    modPoints.splice(i, 1, newPoint);
                    let modLines = lines.slice();
                    let j = lines.indexOf(line);
                    let newLine = {
                        ...line,
                        points: modPoints
                    };
                    modLines.splice(j, 1, newLine);
                    setLines(modLines);
                }}
                offsetLeft={-12}
                offsetTop={-12}>
                    <div title={`L${flines.indexOf(line)+1}`}>
                        <img src={lineMarker} alt="marker" width="24px" className="marker"></img>
                    </div>
                </Marker>
            ))
        )))
    }

} 

export default Lines