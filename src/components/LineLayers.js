import React, { PureComponent } from 'react';
import { Source, Layer } from 'react-map-gl';


class LineLayers extends PureComponent {

    render() {
        
        const lineFeatures = this.props.lines.map(line => ({
            type: "Feature",
            geometry: {
                "type": "LineString",
                "coordinates": line.points.map(point => point.coordinates)
            }
        }));

        const geojsonLines = {
            type: "FeatureCollection",
            features: lineFeatures
        };  
        
        return (
            <Source id="line" type="geojson" data={geojsonLines}>
                <Layer
                id="line-layer"
                type="line"
                paint={{
                    "line-color": "rgb(200,200,200)",
                    "line-width": 3
                }}
                layout={{
                    "line-cap": "round",
                    "line-join": "round"
                }} />
            </Source>
        )
    }

} 

export default LineLayers