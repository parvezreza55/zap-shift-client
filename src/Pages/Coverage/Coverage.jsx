// src/pages/Coverage.jsx
import React from "react";
import DistrictMap from "./DistrictMap";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = ({}) => {
  const services = useLoaderData();
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h1>

      {/* Map component */}
      <DistrictMap services={services} />
    </div>
  );
};

export default Coverage;
