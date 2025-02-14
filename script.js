// API Key and Base URL
const apiKey = '29c4171d2cfa44c3bd085532dc1536a7'; // Replace with your OpenWeatherMap API key
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Get elements from the DOM
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');

// Function to fetch weather data
async function fetchWeather(city) {
  const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      displayWeather(data);
    } else {
      alert('City not found. Please try again.');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Function to display weather data
function displayWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name.');
  }
});

// Optional: Allow pressing "Enter" to search
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});