import React, { PureComponent } from 'react';
import Distances from './Distances';
import uuid from 'react-uuid';


class Measures extends PureComponent {

    pointCount = () => {
        let pts = 0;
        this.props.entities.forEach(item => pts += item.points.length)
        return pts;
    }

    render() {
        const entities = this.props.entities;
        const type = this.props.type;       
        return (this.pointCount() < 100 ?
            (type === "areas" ? (
                entities.map(entity => (
                    <Distances key={uuid()} destinations={entity.points.map(pts => pts.coordinates).concat([entity.points[0].coordinates])}/>
                ))
            ) : (
                entities.map(entity => (
                    <Distances key={uuid()} destinations={entity.points.map(pts => pts.coordinates)}/>
                ))
            )) : (null)
        )
    }

} 

export default Measures