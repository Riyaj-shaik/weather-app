import React, { useState } from "react";
import "./App.css";

const API_KEY = "35c6e2b11ccda5a131d11478f39a618a"; // Replace this with your actual API key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const cities = [
  "Delhi",
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Mumbai",
  "Sydney",
  "Beijing",
  "Dubai",
  "Toronto"
];
const [suggestions, setSuggestions] = useState([]);



  const fetchWeather = async () => {
    try {
      setError("");
      setWeather(null);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      console.log("API Response:", data);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <h1>🌦 Weather App</h1>
     <div className="input-container">
  <select
    onChange={(e) => setCity(e.target.value)}
    value={city}
  >
    <option value="">-- Select a city --</option>
    {cities.map((cityName, index) => (
      <option key={index} value={cityName}>
        {cityName}
      </option>
    ))}
  </select>

  <span style={{ margin: "0 10px" }}>OR</span>

  <div style={{ position: "relative" }}>
  <input
    type="text"
    placeholder="Type a city"
    value={city}
    onChange={(e) => {
      const input = e.target.value;
      setCity(input);

      if (input.length === 0) {
        setSuggestions([]);
      } else {
        const filtered = cities.filter(c =>
          c.toLowerCase().startsWith(input.toLowerCase())
        );
        setSuggestions(filtered);
      }
    }}
  />
  {suggestions.length > 0 && (
    <ul className="suggestion-box">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => {
            setCity(suggestion);
            setSuggestions([]);
          }}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  )}
</div>

  
  <button onClick={fetchWeather} disabled={!city}>
    Get Weather
  </button>
</div>


      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{weather.weather[0].main} - {weather.weather[0].description}</p>
          <p>🌡 Temperature: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
