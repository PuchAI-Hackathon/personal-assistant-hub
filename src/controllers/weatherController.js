import fetch from "node-fetch";

export const getWeatherForCity = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City name is required. Use ?city=CityName" });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENWEATHER_API_KEY not configured in environment." });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || data.cod !== 200) {
      const msg = data.message || "OpenWeather returned an error";
      return res.status(response.status || 500).json({ error: msg, raw: data });
    }

    res.json({
      city: data.name,
      country: data.sys?.country,
      temperature: data.main.temp,
      description: data.weather?.[0]?.description,
      humidity: data.main.humidity
    });
  } catch (err) {
    console.error("Weather fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch weather data", details: err.message });
  }
};
