// src/controllers/weatherController.js
import fetch from "node-fetch";

export const getWeatherForCity = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      res.json({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity
      });
    } else {
      res.status(response.status).json({ error: data.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
