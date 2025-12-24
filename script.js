import { API_KEY, BASE_URL } from "./config.js";

/* DOM ELEMENTS */
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");

const locationEl = document.getElementById("location");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const iconEl = document.getElementById("icon");
const weatherCard = document.getElementById("weatherResult");
const forecastEl = document.getElementById("forecast");

/* EVENT */
searchBtn.addEventListener("click", handleSearch);

/* MAIN HANDLER */
async function handleSearch() {
    const city = cityInput.value.trim();

    if (!city) {
        showError("Please enter a city name");
        return;
    }

    toggleLoading(true);
    clearError();

    try {
        const weather = await fetchCurrentWeather(city);
        displayWeather(weather);

        const forecast = await fetchForecast(city);
        displayForecast(forecast);
    } catch {
        showError("City not found or API error");
    }

    toggleLoading(false);
}

/* API FUNCTIONS */
async function fetchCurrentWeather(city) {
    const res = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error();
    return res.json();
}

async function fetchForecast(city) {
    const res = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error();
    return res.json();
}

/* DISPLAY FUNCTIONS */
function displayWeather(data) {
    weatherCard.classList.remove("hidden");
    locationEl.textContent = data.name;
    tempEl.textContent = `Temperature: ${data.main.temp} °C`;
    humidityEl.textContent = `Humidity: ${data.main.humidity}%`;

    const icon = data.weather[0].icon;
    iconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    document.body.className = icon.includes("n") ? "night" : "day";
}

function displayForecast(data) {
    forecastEl.innerHTML = "";
    for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        forecastEl.innerHTML += `
            <div>
                <p>${day.dt_txt.split(" ")[0]}</p>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
                <p>${day.main.temp}°C</p>
            </div>
        `;
    }
}

/* UI HELPERS */
function showError(msg) {
    errorText.textContent = msg;
}

function clearError() {
    errorText.textContent = "";
}

function toggleLoading(show) {
    loadingText.classList.toggle("hidden", !show);
    searchBtn.disabled = show;
}
