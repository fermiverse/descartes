import React, { PureComponent } from 'react'
import uuid from 'react-uuid';
import Entity from './Entity';

class ListEntities extends PureComponent {
    
    render() { 
        const entities = this.props.entities;
        const setEntities = this.props.setEntities;
        const type = this.props.type;
        return ( 
            <div className="dlist">
                {entities.map(ent => (
                    <Entity key={uuid()} type={type} entities={entities} setEntities={setEntities} ent={ent} />
                ))}
            </div>
         );
    }
}
 
export default ListEntities;