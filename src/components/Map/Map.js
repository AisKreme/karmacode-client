import * as React from "react";
import { useState, useEffect } from "react";
import { API_URL, IP_API, MAPBOX_DARK } from "../../config";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function Map() {
  const [organisations, setOrgas] = useState([]);
  const [projects, setProjects] = useState([]);
  const [viewport, setViewport] = useState({});
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`${IP_API}`);
        setViewport({
          latitude: data.lat,
          longitude: data.lon,
          zoom: 8,
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
        let orgaRes = await axios.get(`${API_URL}/organisation/all`);
        setOrgas(orgaRes.data);
        let projectRes = await axios.get(`${API_URL}/project/all`);
        setProjects(projectRes.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setOrgas, setProjects]);

  if (!organisations || !projects || !viewport) {
    return <p>LOADING . . . </p>;
  }
  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <ReactMapGL
        mapStyle={`${MAPBOX_DARK}`}
        mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {organisations.map((elem) => {
          return (
            <Marker
              latitude={elem.latitude}
              longitude={elem.longitude}
              offsetTop={(-viewport.zoom * 5) / 2}
            >
              <Link to={`/organisation/${elem._id}`}>
                <svg
                  width={(viewport.zoom * 5) / 2}
                  height={(viewport.zoom * 5) / 2}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  opacity="60%"
                >
                  <circle cx="10" cy="10" r="10" fill="#FCDD3A" />
                </svg>
              </Link>
            </Marker>
          );
        })}
        {projects
          ? projects.map((elem) => {
              return (
                <Marker
                  latitude={elem.latitude}
                  longitude={elem.longitude}
                  offsetTop={(-viewport.zoom * 5) / 2}
                >
                  <Link to={`/project/${elem._id}`}>
                    <svg
                      width={(viewport.zoom * 5) / 2}
                      height={(viewport.zoom * 5) / 2}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      opacity="60%"
                    >
                      <circle cx="10" cy="10" r="10" fill="#fff" />
                    </svg>
                  </Link>
                </Marker>
              );
            })
          : ""}
      </ReactMapGL>
    </div>
  );
}
