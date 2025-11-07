import React, { useState, useContext } from "react";
import Layout from "../Pages/Layout";
import { themeContext } from "../../App";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";

const API_KEY = "836580772ffe5825340dd2cd44d12fd0";

export default function Weather() {
  const [city, setCity] = useState("");
  const { theme } = useContext(themeContext);
  const isDark = theme === "dark";

  const {
    data: weather,
    error,
    isLoading,
  } = useSWR(
    city
      ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      : null,
    fetcher
  );

  const handleSearch = () => {
    if (!city.trim()) return;
  };

  return (
    <Layout>
      <div
        className={`min-h-[84.40vh] flex items-center justify-center p-4 ${
          isDark ? "bg-gray-900 text-white" : "bg-bgColor text-black"
        }`}
      >
        <div
          className={`shadow-lg rounded-xl p-6 w-full max-w-md ${
            isDark ? "bg-gray-800" : "bg-yellow-200"
          }`}
        >
          <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
            Weather App
          </h1>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className={`flex-1 px-4 py-2 border rounded-lg outline-none ${
                isDark ? "bg-gray-700 text-white border-gray-600" : "bg-white"
              }`}   
            />

            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              Search
            </button>
          </div>

          {error && <p className="text-red-500 text-center">City not found!</p>}
          {isLoading && <p className="text-center text-gray-400">Loading...</p>}

          {weather && weather.weather && weather.weather.length > 0 && (
            <div className="text-center space-y-3">
              <h2 className="text-xl font-semibold">{weather.name}</h2>
              <p className="text-gray-400 capitalize">
                {weather.weather[0].description}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="mx-auto"
              />
              <h1 className="text-5xl font-bold text-blue-600">
                {weather.main.temp}°C
              </h1>
              <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                {[
                  { label: "Humidity", value: `${weather.main.humidity}%` },
                  { label: "Wind", value: `${weather.wind.speed} m/s` },
                  { label: "Pressure", value: `${weather.main.pressure} hPa` },
                  {
                    label: "Visibility",
                    value: `${(weather.visibility / 1000).toFixed(1)} km`,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-red-100"
                    }`}
                  >
                    <p className="text-gray-400">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
