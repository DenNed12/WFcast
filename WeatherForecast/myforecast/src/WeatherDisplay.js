import React from 'react';

function WeatherDisplay({ data, timeRange }) {
  if (!data) return null;

  const { current, daily } = data;

  if (timeRange === 'current') {
    return (
      <div>
        <h2>Current Weather</h2>
        <p>Temperature: {current.temp}°C</p>
        <p>Weather: {current.weather[0].description}</p>
      </div>
    );
  } else if (timeRange === 'fiveDays') {
    return (
      <div>
        <h2>5-Day Forecast</h2>
        {daily.slice(0, 5).map((day, index) => (
          <div key={index}>
            <h3>Day {index + 1}</h3>
            <p>Temperature: {day.temp.day}°C</p>
            <p>Weather: {day.weather[0].description}</p>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default WeatherDisplay;