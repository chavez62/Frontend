// Get the toggle button, icon, and body elements for dark mode
const toggleButton = document.getElementById('darkModeToggle');
const toggleIcon = document.getElementById('toggleIcon');
const body = document.body;

// Function to switch dark mode based on current state
function switchDarkMode(isDarkMode) {
    if (isDarkMode) {
        body.classList.add('bg-dark', 'text-light');
        body.classList.remove('bg-light', 'text-dark');
        toggleIcon.classList.remove('fa-moon');
        toggleIcon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled'); // Save preference
    } else {
        body.classList.add('bg-light', 'text-dark');
        body.classList.remove('bg-dark', 'text-light');
        toggleIcon.classList.remove('fa-sun');
        toggleIcon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled'); // Save preference
    }
}

// Add event listener for fetching weather data
document.getElementById('getWeatherBtn').addEventListener('click', function () {
    const city = document.getElementById('cityInput').value; // Get the city name from input

    // Clear previous weather data
    document.getElementById('weatherInfo').innerHTML = '';

    if (city) {
        // Fetch weather data from your API
        fetch(`https://localhost:7056/api/weather/${city}`)
            .then(response => response.json())
            .then(data => {
                // Check if data is valid
                if (data.name) {
                    displayWeather(data); // Display the fetched weather data
                } else {
                    document.getElementById('weatherInfo').innerHTML = `<p class="text-danger">City not found</p>`;
                }
            })
            .catch(error => {
                document.getElementById('weatherInfo').innerHTML = `<p class="text-danger">Error fetching weather data</p>`;
            });
    } else {
        document.getElementById('weatherInfo').innerHTML = `<p class="text-danger">Please enter a city name</p>`;
    }
});

// Function to display weather data in HTML
function displayWeather(data) {
    const tempCelsius = data.main.temp.toFixed(2); // Round to 2 decimal places
    const feelsLikeCelsius = data.main.feels_like.toFixed(2);
    const tempFahrenheit = data.main.temp_fahrenheit.toFixed(2);
    const feelsLikeFahrenheit = data.main.feels_like_fahrenheit.toFixed(2);

    const weatherHtml = `
        <h2>${data.name}</h2>
        <p class="weather-data"><span class="bold">Temperature</span>: ${tempCelsius}°C (${tempFahrenheit}°F)</p>
        <p class="weather-data"><span class="bold">Feels Like</span>: ${feelsLikeCelsius}°C (${feelsLikeFahrenheit}°F)</p>
        <p class="weather-data"><span class="bold">Weather</span>: ${data.weather[0].description}</p>
        <p class="weather-data"><span class="bold">Humidity</span>: ${data.main.humidity}%</p>
        <p class="weather-data"><span class="bold">Wind Speed</span>: ${data.wind.speed} m/s</p>
    `;
    document.getElementById('weatherInfo').innerHTML = weatherHtml; // Insert the weather data into the HTML
}

// Initialize dark mode based on saved preference in localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    switchDarkMode(true); // Enable dark mode
} else {
    switchDarkMode(false); // Enable light mode
}

// Add event listener for dark mode toggle button
toggleButton.addEventListener('click', function() {
    const isDarkMode = body.classList.contains('bg-light'); // Check if it's currently in light mode
    switchDarkMode(isDarkMode); // Toggle between dark and light mode
});
