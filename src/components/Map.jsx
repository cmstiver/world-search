import Map from "ol/Map";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { useEffect, useState, useRef } from "react";

function MapContainer() {
    const mapElement = useRef();

    useEffect(() => {
        const vectorLayer = new VectorLayer({
            background: "#1a2b39",
            source: new VectorSource({
                url: "../../public/custom.geo.json",
                format: new GeoJSON(),
            }),
        });

        const map = new Map({
            layers: [vectorLayer],
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
            target: mapElement.current,
            controls: [],
        });
        map.on("click", (e) => {
            const feature = map.getFeaturesAtPixel(e.pixel);

            try {
                console.log(feature[0]["values_"]["adm0_a3_us"]);
            } catch {
                console.log("Not a country");
            }
        });
    }, []);

    return (
        <>
            <div
                ref={mapElement}
                id='map'
                style={{ width: "1000px", height: "800px" }}
            ></div>
        </>
    );
}

export default MapContainer;
