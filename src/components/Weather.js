import React, { useState, useEffect } from "react";
import axios from "axios";
import { WiDaySunny, WiCloudy, WiRain, WiWindy } from "react-icons/wi";

const Weather = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [date, setDate] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (lat, lon, dt) => {
    try {
      const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude: lat,
          longitude: lon,
          daily:
            "temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,sunrise,sunset,weathercode",
          timezone: "Europe/London",
        },
      });
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch weather data");
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(latitude, longitude, date);
  };

  const weatherDescription = (code) => {
    const descriptions = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      51: "Light rain",
      53: "Moderate rain",
      55: "Heavy rain",
      61: "Showers",
      71: "Snow showers",
      73: "Moderate snow",
      75: "Heavy snow",
      80: "Showers",
      81: "Thunderstorm",
      82: "Thunderstorm with hail",
    };
    return descriptions[code] || "Unknown";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Weather Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
            Latitude:
          </label>
          <input
            id="latitude"
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
            Longitude:
          </label>
          <input
            id="longitude"
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date:
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get Weather
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {weatherData && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Weather Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg shadow flex items-center space-x-4">
              <WiDaySunny className="text-blue-500 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-blue-500">Temperature</h3>
                <p className="text-gray-700">
                  Max: {weatherData.daily.temperature_2m_max[0]} °C
                </p>
                <p className="text-gray-700">
                  Min: {weatherData.daily.temperature_2m_min[0]} °C
                </p>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow flex items-center space-x-4">
              <WiRain className="text-green-500 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-green-500">Precipitation</h3>
                <p className="text-gray-700">
                  {weatherData.daily.precipitation_sum[0]} mm
                </p>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow flex items-center space-x-4">
              <WiWindy className="text-yellow-500 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-500">Wind Speed</h3>
                <p className="text-gray-700">
                  Max: {weatherData.daily.wind_speed_10m_max[0]} km/h
                </p>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg shadow flex items-center space-x-4">
              <div>
                <h3 className="text-lg font-semibold text-orange-500">Sunrise & Sunset</h3>
                <p className="text-gray-700">
                  Sunrise: {weatherData.daily.sunrise[0]}
                </p>
                <p className="text-gray-700">
                  Sunset: {weatherData.daily.sunset[0]}
                </p>
              </div>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg shadow flex items-center space-x-4">
              <WiCloudy className="text-teal-500 text-3xl" />
              <div>
                <h3 className="text-lg font-semibold text-teal-500">Weather</h3>
                <p className="text-gray-700">
                  {weatherDescription(weatherData.daily.weathercode[0])}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
