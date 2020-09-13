import React, { PureComponent } from 'react';
import { Source, Layer } from 'react-map-gl';


class PointLayers extends PureComponent {

    render() {
        const fpoints = this.props.activeGid ? this.props.points.filter(point => point.gid !== this.props.activeGid) : []
        const pointFeatures = fpoints.map(point => ({
            type: "Feature",
            geometry: {
                "type": "Point",
                "coordinates": point.coordinates
            }
        }));

        const geojsonPoints = {
            type: "FeatureCollection",
            features: pointFeatures
        };  
        
        return (
            <Source id="point" type="geojson" data={geojsonPoints}>
                <Layer
                id="point-layer"
                type="circle"
                paint={{
                    "circle-color": "rgb(255, 0, 0)",
                    "circle-radius": 5,
                    "circle-stroke-color": "rgb(200, 200, 200)",
                    "circle-stroke-width": 2
                }} />
            </Source>
        )
    }

} 

export default PointLayers