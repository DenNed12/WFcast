import React from 'react';

const cities = [
  { name: 'Moscow', lat: 55.7558, lon: 37.6176 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'New York', lat: 40.7128, lon: -74.0060 },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
];

function CitySelector({ setCity, setCoordinates }) {
  return (
    <select
      onChange={(e) => {
        const selectedCity = cities.find(c => c.name === e.target.value);
        setCity(selectedCity.name);
        setCoordinates({ latitude: selectedCity.lat, longitude: selectedCity.lon });
      }}
    >
      {cities.map((city) => (
        <option key={city.name} value={city.name}>
          {city.name}
        </option>
      ))}
    </select>
  );
}

export default CitySelector;