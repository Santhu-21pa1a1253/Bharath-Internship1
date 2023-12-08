const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const apiKey = '84e85cfb289336e43c788c00a5527ec3';
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';


app.get('/', (req, res) => {
  res.render('index.ejs', { weather: " ", error: " " });
});

app.post('/', async (req, res) => {
  const city = req.body.city;
  console.log(city);
  const url = `${weatherApiUrl}?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    const weatherText = `It's ${weatherData.main.temp}°C in ${weatherData.name}, ${weatherData.sys.country}. The Weather is ${weatherData.weather[0].main} with  ${weatherData.weather[0].description}.`;

    res.render('index.ejs', { weather: weatherText,error: null});
    
    
  } catch (error) {
    res.render('index.ejs', { weather: null, error: 'City not found. Please try again.' });
  }
});

app.listen(3000, () => {
  console.log("server found")
})