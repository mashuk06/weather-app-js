document.addEventListener('DOMContentLoaded', function() {
    const searchQuery = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const locationElement = document.getElementById('location');
    const timeElement = document.getElementById('time');
    const temperatureElement = document.getElementById('temperature');
    const conditionElement = document.getElementById('condition');
    const detailsElement = document.getElementById('details');
    const iconElement = document.getElementById('icon');

    const getWeatherData = async () => {
        const apiKey = '61da88ac6ba7489c9f4154237232106';
        let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}`;

        if (searchQuery.value) {
            apiUrl += `&q=${searchQuery.value}&aqi=no`;
        }

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const { location, current } = data;

            locationElement.textContent = `${location.name}, ${location.country}`;
            timeElement.textContent = `Time: ${location.localtime}`;
            temperatureElement.textContent = `${current.temp_c}°C / ${current.temp_f}°F`;
            conditionElement.textContent = current.condition.text;

            detailsElement.innerHTML = `
                <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1">
                    Wind: ${current.wind_kph} km/h from ${current.wind_dir}
                </span></div>
                <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1">
                    Pressure: ${current.pressure_mb} mb
                </span></div>
                <div><i class="fas fa-sun fa-fw" style="color: #868B94;"></i> <span class="ms-1">
                    Humidity: ${current.humidity}%
                </span></div>
                <div><i class="fas fa-sun fa-fw" style="color: #868B94;"></i> <span class="ms-1">
                    Visibility: ${current.vis_km} km
                </span></div>
            `;

            iconElement.src = getIconUrl(current.condition.icon);
            iconElement.alt = current.condition.text;
        } catch (error) {
            console.error(error);
        }
    };

    const getIconUrl = (icon) => {
        return `https:${icon}`;
    };

    searchButton.addEventListener('click', getWeatherData);

    // Initial weather data
    getWeatherData();
});
