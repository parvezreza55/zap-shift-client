// src/components/DistrictMap.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
const MapFlyTo = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 10, { duration: 2 }); // zoom level 10, 2 sec animation
    }
  }, [position, map]);

  return null;
};

const DistrictMap = ({ services }) => {
  // Dhaka, Bangladesh
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCoord, setActiveCoord] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);
  const defaultCenter = [23.685, 90.3563];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const matched = services.find((d) =>
      d.district.toLowerCase().includes(value)
    );

    if (matched) {
      setActiveCoord([matched.latitude, matched.longitude]);
      setActiveDistrict(matched); // 👈 store full district
    } else {
      setActiveCoord(null);
      setActiveDistrict(null); // reset if no match
    }
  };
  return (
    <div>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by district name..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <MapContainer
        center={defaultCenter}
        zoom={7}
        scrollWheelZoom={true}
        className="h-[500px] w-full rounded-lg z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapFlyTo position={activeCoord} />
        {services.map((district, index) => (
          <Marker
            key={index}
            position={[district.latitude, district.longitude]}
          >
            <Popup autoPan={district.district === activeDistrict}>
              <strong>{district.district}</strong> <br />
              <em>Region: {district.region}</em>
              <br />
              <p>
                Covered Areas: <br />
                {district.covered_area.join(", ")}
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DistrictMap;
