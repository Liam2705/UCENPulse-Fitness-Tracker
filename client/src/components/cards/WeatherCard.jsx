import { useState, useEffect } from 'react'
import { getWeather } from '../../services/api'

const weatherIcons = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '❄️', 73: '❄️', 75: '❄️',
  80: '🌦️', 81: '🌦️', 82: '🌧️',
  95: '⛈️',
}

export default function HeaderWeather() {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = (lat, lon) =>
      getWeather(lat, lon).then(data => setWeather(data.current))

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather()
      )
    } else {
      fetchWeather()
    }
  }, [])

  if (!weather) return null

  const icon = weatherIcons[weather.weathercode] ?? '🌡️'
  const temp = Math.round(weather.temperature_2m)

  return (
    <div className="header-weather">
      <span className="weather-icon">{icon} </span>
      <span className="weather-temp">Temp: {temp}°C </span>
      <span className="weather-wind">Wind: {Math.round(weather.windspeed_10m)} km/h</span>
    </div>
  )
}