import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // додано імпорт для Marker і Popup
import "leaflet/dist/leaflet.css"; // додано стиль для Leaflet

import targetOnMap from "/public/map-point-school-svgrepo-com.svg";

import L from "leaflet";

export default function Map() {
  const myIcon = new L.Icon({
    iconUrl: targetOnMap,
    iconRetinaUrl: targetOnMap,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
  });
  return (
    <MapContainer
      center={[49.8380948, 24.0329169]}
      zoom={16.5}
      style={{ height: "100%", maxWidth: "100%" }}
      zoomControl={false} // Відключення стандартного зума
      scrollWheelZoom={false} // Вимкнути масштабування колесом миші
      dragging={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[49.8380948, 24.0329169]} icon={myIcon}>
        <Popup>
          <a href="https://maps.app.goo.gl/3XTqQGKUV1JVibk98" target="_blank">
            https://maps.app.goo.gl/3XTqQGKUV1JVibk98
          </a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
