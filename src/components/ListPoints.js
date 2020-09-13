import React, { PureComponent } from 'react';
import uuid from 'react-uuid';
import CloseIcon from '../graphics/close.svg';


class ListPoints extends PureComponent {
    
    render() {
        const points = this.props.points;
        const setPoints = this.props.setPoints;
        return ( 
            <div className="dlist">
                {points.length ? (
                    points.map((point) => (
                        <div key={uuid()} style={{color: "blue", display: "flex", alignItems: "baseline"}}>
                            <p>{`${points.indexOf(point)+1}.  [${point.coordinates[1].toFixed(8)}, ${point.coordinates[0].toFixed(8)}]`}</p>
                            <button className="blank" title="Clear" onClick={() => {
                                let index = points.indexOf(point);
                                let newPoints = points.slice();
                                if (index > -1) {
                                    newPoints.splice(index, 1);
                                    setPoints(newPoints);
                                }
                            }}><img src={CloseIcon} alt="close" width="12px"></img></button>
                        </div> 
                    )) 
                ) : (null)}
            </div>
         );
    }
}
 
export default ListPoints;