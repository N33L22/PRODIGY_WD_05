document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', getWeather);
});

function getWeather() {
    const apiKey = '208c6c8aef12963ab74b88ce39edf958';
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value;

    // Check if location is provided
    if (!location) {
        alert('Please enter a location.');
        return;
    }

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://pro.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfoContainer = document.getElementById('weather-info');
    weatherInfoContainer.innerHTML = '';

    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    const weatherInfo = `
        <h3>${cityName}</h3>
        <p>Temperature: ${temperature} &#8451;</p>
        <p>Description: ${description}</p>
        <img src="https://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">
    `;

    weatherInfoContainer.innerHTML = weatherInfo;

    // Update background with heatmap image
    updateBackgroundImage('heatmap.jpeg'); // Replace 'heatmap' with the actual path or identifier for your heatmap image
}

function updateBackgroundImage(imagePath) {
    document.body.style.backgroundImage = `url('${imagePath}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
}
