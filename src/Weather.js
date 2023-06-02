import React, { useEffect, useState } from 'react';

function Weather({ place, time }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch weather data based on place and time
    fetchWeatherData(place, time)
      .then((data) => {
        setWeatherData(data);
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data. Please select a valid place.');
      });
  }, [place, time]);

  const fetchWeatherData = async (place, time) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=6cabf82bcec5f4bd4c0f3ed7eb11f53f`
      );
      if (response.status === 404) {
        throw new Error('Place not found');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  // Convert temperature from Kelvin to Celsius
  const temperatureCelsius = Math.round(weatherData.main.temp - 273.15);

  return (
    <div>
      <p>Weather for {place} at {time}:</p>
      <p>Temperature: {temperatureCelsius}°C</p>
      <p>Weather Description: {weatherData.weather[0].description}</p>
    </div>
  );
}

export default Weather;
