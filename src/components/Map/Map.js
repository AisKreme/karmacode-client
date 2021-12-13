import * as React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { useState, useEffect } from "react";
import { API_URL, IP_API, MAPBOX_DARK } from "../../config";
import axios from "axios";

export default function Map() {
  const [organisations, setOrgas] = useState([]);
  const [viewport, setViewport] = useState({});
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`${IP_API}`);
        setViewport({
          latitude: data.lat,
          longitude: data.lon,
          zoom: 10,
          width: window.innerWidth,
          height: window.innerHeight,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`${API_URL}/organisation/all`);
        setOrgas(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  if (!viewport) {
    <p>LOADING . . . </p>;
  }

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <ReactMapGL
        mapStyle={`${MAPBOX_DARK}`}
        mapboxApiAccessToken={
          // insert MAPBOX ACCESS TOKEN
          ""
        }
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {organisations.map((elem) => {
          return (
            <Marker latitude={elem.latitude} longitude={elem.longitude}>
              HIER
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
}
