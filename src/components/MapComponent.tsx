"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with webpack/next.js
const createCustomIcon = (emoji: string, isMain: boolean = false) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div class="marker-container ${isMain ? "main-marker" : "poi-marker"}">
        <span class="marker-emoji">${emoji}</span>
        ${isMain ? '<div class="pulse-ring"></div>' : ""}
      </div>
    `,
    iconSize: [isMain ? 48 : 36, isMain ? 48 : 36],
    iconAnchor: [isMain ? 24 : 18, isMain ? 24 : 18],
    popupAnchor: [0, isMain ? -28 : -22],
  });
};

// Create a label for walking time on paths (legend style)
const createTimeLabel = (walkingTime: string) => {
  return L.divIcon({
    className: "time-label-marker",
    html: `
      <div class="time-label">
        🚶 ${walkingTime}
      </div>
    `,
    iconSize: [80, 28],
    iconAnchor: [40, 14],
  });
};

// Create a label for POI names at the marker (legend style)
const createNameLabel = (name: string, emoji: string) => {
  return L.divIcon({
    className: "name-label-marker",
    html: `
      <div class="name-label">
        ${emoji} ${name}
      </div>
    `,
    iconSize: [140, 28],
    iconAnchor: [70, -6],
  });
};

// POI data with verified GPS coordinates from Google Maps
const pois = [
  {
    name: "The Ambassador",
    emoji: "🏠",
    lat: 46.0961273,
    lng: 7.2310524,
    description: "Chemin de la Barmète",
    isMain: true,
    walkingTime: undefined,
  },
  {
    name: "Médran Cable Car",
    emoji: "🎿",
    lat: 46.0937671,
    lng: 7.2334843,
    description: "Main ski lift access",
    isMain: false,
    walkingTime: "2 min",
  },
  {
    name: "Farinet",
    emoji: "🍸",
    lat: 46.0960625,
    lng: 7.2295625,
    description: "Legendary après-ski bar",
    isMain: false,
    walkingTime: "1 min",
  },
  {
    name: "Pub Mont Fort",
    emoji: "🍺",
    lat: 46.0945625,
    lng: 7.2334375,
    description: "Iconic Verbier pub",
    isMain: false,
    walkingTime: "2 min",
  },
  {
    name: "Place Centrale",
    emoji: "🏔️",
    lat: 46.0965,
    lng: 7.2290,
    description: "Village center",
    isMain: false,
    walkingTime: "1 min",
  },
];

// The Ambassador coordinates for drawing lines
const ambassadorCoords: [number, number] = [46.0961273, 7.2310524];

// Component to set map bounds
function SetBoundsComponent() {
  const map = useMap();

  useEffect(() => {
    // Create bounds that include all POIs with some padding
    const bounds = L.latLngBounds(pois.map((poi) => [poi.lat, poi.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map]);

  return null;
}

export default function MapComponent() {
  // Center on The Ambassador
  const center: [number, number] = [46.0961273, 7.2310524];

  return (
    <>
      {/* Custom styles for markers */}
      <style jsx global>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }

        .marker-container {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s ease;
          cursor: pointer;
        }

        .marker-container:hover {
          transform: scale(1.15);
        }

        .main-marker {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #d4a853 0%, #b8942f 100%);
          position: relative;
        }

        .main-marker .marker-emoji {
          font-size: 24px;
        }

        .poi-marker {
          width: 36px;
          height: 36px;
          background: white;
        }

        .poi-marker .marker-emoji {
          font-size: 18px;
        }

        .marker-emoji {
          line-height: 1;
        }

        .time-label-marker,
        .name-label-marker {
          background: transparent !important;
          border: none !important;
        }

        .time-label {
          background: rgba(55, 65, 60, 0.9);
          color: white;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .name-label {
          background: rgba(55, 65, 60, 0.9);
          color: white;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: rgba(212, 168, 83, 0.4);
          animation: pulse 2s ease-out infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .leaflet-popup-content-wrapper {
          background: #1a2e35;
          color: white;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .leaflet-popup-content {
          margin: 12px 16px;
        }

        .leaflet-popup-tip {
          background: #1a2e35;
        }

        .popup-title {
          font-family: "Playfair Display", serif;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .popup-description {
          font-size: 12px;
          color: #9ca3af;
        }

        .popup-time {
          color: #d4a853;
          font-weight: 600;
        }

        .main-popup .popup-title {
          color: #d4a853;
        }

        .leaflet-container {
          font-family: inherit;
        }
      `}</style>

      <MapContainer
        center={center}
        zoom={17}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <SetBoundsComponent />

        {/* Draw background lines for visibility */}
        {pois
          .filter((poi) => !poi.isMain)
          .map((poi) => (
            <Polyline
              key={`bg-line-${poi.name}`}
              positions={[ambassadorCoords, [poi.lat, poi.lng]]}
              pathOptions={{
                color: "white",
                weight: 5,
                opacity: 0.8,
              }}
            />
          ))}

        {/* Draw main colored dashed lines */}
        {pois
          .filter((poi) => !poi.isMain)
          .map((poi) => (
            <Polyline
              key={`line-${poi.name}`}
              positions={[ambassadorCoords, [poi.lat, poi.lng]]}
              pathOptions={{
                color: "#d4a853",
                weight: 3,
                opacity: 1,
                dashArray: "8, 6",
              }}
            />
          ))}

        {/* Walking time labels on paths (at midpoint) */}
        {pois
          .filter((poi) => !poi.isMain && poi.walkingTime)
          .map((poi) => {
            const midLat = (ambassadorCoords[0] + poi.lat) / 2;
            const midLng = (ambassadorCoords[1] + poi.lng) / 2;
            return (
              <Marker
                key={`time-${poi.name}`}
                position={[midLat, midLng]}
                icon={createTimeLabel(poi.walkingTime!)}
                interactive={false}
              />
            );
          })}

        {/* POI name labels (at the POI marker) */}
        {pois
          .filter((poi) => !poi.isMain)
          .map((poi) => (
            <Marker
              key={`name-${poi.name}`}
              position={[poi.lat, poi.lng]}
              icon={createNameLabel(poi.name, poi.emoji)}
              interactive={false}
            />
          ))}

        {pois.map((poi) => (
          <Marker
            key={poi.name}
            position={[poi.lat, poi.lng]}
            icon={createCustomIcon(poi.emoji, poi.isMain)}
          >
            <Popup>
              <div className={poi.isMain ? "main-popup" : ""}>
                <div className="popup-title">{poi.name}</div>
                <div className="popup-description">
                  {poi.description}
                  {poi.walkingTime && (
                    <span className="popup-time"> • 🚶 {poi.walkingTime}</span>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

