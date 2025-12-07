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
const createCustomIcon = (
  emoji: string,
  isMain: boolean = false,
  walkingTime?: string
) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div class="marker-container ${isMain ? "main-marker" : "poi-marker"}">
        <span class="marker-emoji">${emoji}</span>
        ${isMain ? '<div class="pulse-ring"></div>' : ""}
        ${walkingTime ? `<div class="walking-time-badge">${walkingTime}</div>` : ""}
      </div>
    `,
    iconSize: [isMain ? 48 : 36, isMain ? 48 : 36],
    iconAnchor: [isMain ? 24 : 18, isMain ? 24 : 18],
    popupAnchor: [0, isMain ? -28 : -22],
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

        .walking-time-badge {
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #d4a853 0%, #b8942f 100%);
          color: white;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 10px;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          border: 1.5px solid white;
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

        {/* Draw dashed lines from Ambassador to each POI */}
        {pois
          .filter((poi) => !poi.isMain)
          .map((poi) => (
            <Polyline
              key={`line-${poi.name}`}
              positions={[ambassadorCoords, [poi.lat, poi.lng]]}
              pathOptions={{
                color: "#d4a853",
                weight: 2,
                opacity: 0.6,
                dashArray: "6, 8",
              }}
            />
          ))}

        {pois.map((poi) => (
          <Marker
            key={poi.name}
            position={[poi.lat, poi.lng]}
            icon={createCustomIcon(poi.emoji, poi.isMain, poi.walkingTime)}
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

