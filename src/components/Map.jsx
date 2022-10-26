import Map from "ol/Map";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { useEffect, useState, useRef } from "react";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";

function MapContainer() {
    const mapElement = useRef();

    async function apiCall(countryCode) {
        const response = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${countryCode}`
        );
        const json = await response.json();
        console.log(json);
    }

    useEffect(() => {
        const vectorLayer = new VectorLayer({
            background: "#1a2b39",
            source: new VectorSource({
                url: "../custom.geojson",
                format: new GeoJSON(),
            }),
        });

        const map = new Map({
            layers: [vectorLayer, new TileLayer({ source: new OSM() })],
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
            target: mapElement.current,
            controls: [],
        });
        map.on("click", (e) => {
            const feature = map.getFeaturesAtPixel(e.pixel);
            const countryCode = feature[0]["values_"]["adm0_a3_us"];
            apiCall(countryCode);
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
