import L from 'leaflet';

// Beach Marker - Blue with wave emoji
export const beachMarker = L.divIcon({
  className: 'custom-marker',
  html: `
    <div style="
      position: relative;
      width: 32px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.2 0 0 7.2 0 16c0 8.8 16 26 16 26s16-17.2 16-26c0-8.8-7.2-16-16-16z" 
          fill="#3B82F6" stroke="#1E40AF" stroke-width="2"/>
      </svg>
      <span style="
        position: absolute;
        top: 8px;
        font-size: 16px;
      ">🏖️</span>
    </div>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42]
});

// Mountain/Adventure Marker - Brown with mountain emoji
export const mountainMarker = L.divIcon({
  className: 'custom-marker',
  html: `
    <div style="
      position: relative;
      width: 32px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.2 0 0 7.2 0 16c0 8.8 16 26 16 26s16-17.2 16-26c0-8.8-7.2-16-16-16z" 
          fill="#8B4513" stroke="#654321" stroke-width="2"/>
      </svg>
      <span style="
        position: absolute;
        top: 8px;
        font-size: 16px;
      ">⛰️</span>
    </div>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42]
});

// Cultural Marker - Purple with temple emoji
export const culturalMarker = L.divIcon({
  className: 'custom-marker',
  html: `
    <div style="
      position: relative;
      width: 32px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.2 0 0 7.2 0 16c0 8.8 16 26 16 26s16-17.2 16-26c0-8.8-7.2-16-16-16z" 
          fill="#9333EA" stroke="#6B21A8" stroke-width="2"/>
      </svg>
      <span style="
        position: absolute;
        top: 8px;
        font-size: 16px;
      ">🛕</span>
    </div>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42]
});

// Food Marker - Orange with food emoji
export const foodMarker = L.divIcon({
  className: 'custom-marker',
  html: `
    <div style="
      position: relative;
      width: 32px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.2 0 0 7.2 0 16c0 8.8 16 26 16 26s16-17.2 16-26c0-8.8-7.2-16-16-16z" 
          fill="#F97316" stroke="#C2410C" stroke-width="2"/>
      </svg>
      <span style="
        position: absolute;
        top: 8px;
        font-size: 16px;
      ">🍛</span>
    </div>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42]
});

// Hidden Gem Marker - Emerald green with gem emoji
export const hiddenMarker = L.divIcon({
  className: 'custom-marker',
  html: `
    <div style="
      position: relative;
      width: 32px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.2 0 0 7.2 0 16c0 8.8 16 26 16 26s16-17.2 16-26c0-8.8-7.2-16-16-16z" 
          fill="#10B981" stroke="#047857" stroke-width="2"/>
      </svg>
      <span style="
        position: absolute;
        top: 8px;
        font-size: 16px;
      ">💎</span>
    </div>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -42]
});

// Helper function to get marker by category
export const getMarkerByCategory = (category: "beach" | "cultural" | "food" | "adventure" | "hidden") => {
  switch (category) {
    case 'beach':
      return beachMarker;
    case 'adventure':
      return mountainMarker;
    case 'cultural':
      return culturalMarker;
    case 'food':
      return foodMarker;
    case 'hidden':
      return hiddenMarker;
    default:
      return beachMarker; // fallback
  }
};
