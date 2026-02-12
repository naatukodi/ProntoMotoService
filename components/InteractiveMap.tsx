import React, { useEffect, useRef } from 'react';

// Since Leaflet is loaded from a CDN, we declare it to satisfy TypeScript
declare const L: any;

const InteractiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // Kakinada, Andhra Pradesh Coordinates
  const position: [number, number] = [16.9891, 82.2475];

  useEffect(() => {
    if (typeof L === 'undefined') {
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = `
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #f3f4f6; color: #6b7280; font-family: Inter, sans-serif; text-align: center; padding: 1rem;">
            <p>Map is currently unavailable. Please check your internet connection and try again.</p>
          </div>
        `;
      }
      console.error("Leaflet.js library (L) is not loaded.");
      return;
    }

    if (mapContainerRef.current && !mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView(position, 14);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: 'https://img.icons8.com/plasticine/100/marker.png',
        iconSize: [45, 45],
        iconAnchor: [22, 45],
        popupAnchor: [0, -45]
      });

      L.marker(position, { icon: customIcon })
        .addTo(map)
        .bindPopup(
          `
          <div style="font-family: Inter, sans-serif; font-size: 14px; line-height: 1.6; max-width: 220px;">
            <h3 style="font-weight: 700; font-size: 16px; margin: 0 0 8px 0; color: #2D3748;">
              Vehga Inspections Private Limited
            </h3>
            <p style="margin: 0 0 10px 0; color: #4A5568;">
              D.No: 16-23-3/8, Pallamraju Nagar,<br/>
              Kakinada, Andhra Pradesh - 533005
            </p>
            <div style="margin-bottom: 12px; text-align: left; border-top: 1px solid #e2e8f0; padding-top: 10px;">
              <p style="margin: 0; color: #4A5568;">
                <strong style="color: #2D3748;">Business Hours:</strong> Mon - Sat, 9:00 AM - 6:00 PM
              </p>
            </div>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=16.9891,82.2475" 
              target="_blank" 
              rel="noopener noreferrer" 
              style="display: block; width: 100%; box-sizing: border-box; padding: 8px 12px; background-color: #D95B00; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; text-align: center;"
            >
              Get Directions
            </a>
          </div>
          `,
          { minWidth: 230 }
        )
        .openPopup();
    }
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-[500px] z-0"
      aria-label="Map showing Vehga Inspections Private Limited location in Kakinada"
    ></div>
  );
};

export default InteractiveMap;
