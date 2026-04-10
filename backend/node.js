const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "1f5d92acda740d0bb677c93ce05ebb29";

app.post("/api/predict", async (req, res) => {
  try {
    const { city, N, P, K, ph } = req.body;

    // 🌍 STEP 1: Convert city → lat/lon
    const geoRes = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
    );

    if (!geoRes.data || geoRes.data.length === 0) {
      return res.status(400).json({ error: "Invalid city name" });
    }

    const { lat, lon } = geoRes.data[0];

    // 🌦️ STEP 2: Fetch weather
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const weather = weatherRes.data;

    const temperature = weather.main.temp;
    const humidity = weather.main.humidity;

    // 🌧️ Rainfall extraction
    let rainfall = 0;
    if (weather.rain && weather.rain["1h"]) {
      rainfall = weather.rain["1h"] * 10; // approx mm/day
    }

    // 🧠 STEP 3: Prepare ML input
    const modelInput = {
      N,
      P,
      K,
      temperature,
      humidity,
      ph,
      rainfall
    };

    // 🔁 STEP 4: Call Python API
    const response = await axios.post(
      "http://localhost:5000/predict",
      modelInput
    );

    res.json({
      city,
      coordinates: { lat, lon },
      weather: { temperature, humidity, rainfall },
      result: response.data
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5001, () => {
  console.log("Server running on port 5001");
});