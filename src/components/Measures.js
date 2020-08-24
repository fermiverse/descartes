import React, { PureComponent } from 'react';
import Distances from './Distances';
import uuid from 'react-uuid';


class Measures extends PureComponent {

    render() {
        const entities = this.props.entities;
        const type = this.props.type;       
        return (
            type === "areas" ? (
                entities.map(entity => (
                    <Distances key={uuid()} destinations={entity.points.map(pts => pts.coordinates).concat([entity.points[0].coordinates])}/>
                ))
            ) : (
                entities.map(entity => (
                    <Distances key={uuid()} destinations={entity.points.map(pts => pts.coordinates)}/>
                ))
            )
            
        )
    }

} 

export default Measures