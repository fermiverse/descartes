import React, { PureComponent } from 'react';
import { Marker } from 'react-map-gl';
import uuid from 'react-uuid';
import lineMarker from '../graphics/marker2.svg';


class Lines extends PureComponent {

    pointCount = () => {
        let pts = 0;
        this.props.lines.forEach(line => pts += line.points.length)
        return pts;
    }

    render() {
        const lines = this.props.lines;
        const setLines = this.props.setLines;
        
        return (this.pointCount() < 100 ?
            (lines.map(line => (
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
                            gid: 1,
                            type: "Point",
                            coordinates: e.lngLat
                        }
                        modPoints.splice(i, 1, newPoint);
                        let modLines = lines.slice();
                        let j = lines.indexOf(line);
                        let newLine = {
                            gid: 1,
                            points: modPoints
                        };
                        modLines.splice(j, 1, newLine);
                        setLines(modLines);
                    }}
                    offsetLeft={-12}
                    offsetTop={-12}>
                        <div title={`L${lines.indexOf(line)+1}`}>
                            <img src={lineMarker} alt="marker" width="24px" className="marker"></img>
                        </div>
                    </Marker>
                ))
            ))) : (null)
        )
    }

} 

export default Lines