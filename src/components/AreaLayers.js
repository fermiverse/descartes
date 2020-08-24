import React, { PureComponent } from 'react';
import { Source, Layer } from 'react-map-gl';


class AreaLayers extends PureComponent {

    render() {
        
        const areaFeatures = this.props.areas.map(area => ({
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [
                    area.points.map(point => point.coordinates)
                ]
            }
        }));

        const geojsonAreas = {
            type: "FeatureCollection",
            features: areaFeatures
        }; 
        
        return (
            <Source id="area" type="geojson" data={geojsonAreas}>
                <Layer
                id="polygon-layer"
                type="fill"
                paint={{
                    "fill-color": "rgb(220,220,220)",
                    "fill-opacity": 0.45
                }}
                />
            </Source>
        )
    }

} 

export default AreaLayers