
### 📍 Endpoints Used
- `/weather` – Fetch current weather by city
- `/forecast` – Fetch 5-day weather forecast
- `/weather?q={city}` – Search weather using city name

---

## 🔑 Authentication
- **Authentication Type:** API Key  
- The API key is stored in `config.js`
- The actual API key is **not included** in the repository for security purposes
- A placeholder value (`"YOUR_API_KEY_HERE"`) is used instead

---

## ⚙️ Features
- Search weather by city name
- Display temperature and humidity
- Weather condition icons
- 5-day weather forecast
- Automatic day/night theme
- Input validation
- Loading state display
- Error handling
- Responsive card-based layout
- Save favorite cities using `localStorage` (Bonus feature)

---

## 🚨 Error Handling
The application properly handles the following cases:
- Empty input fields
- Invalid city names
- Failed API requests
- API authorization issues
- Loading state during data fetching

---

## ▶ How to Run the Project

### Option 1: Open Directly in Browser
1. Download or clone the repository
2. Inside the project folder, create a file named `config.js`
3. Add your OpenWeather API key:
```js
export const API_KEY = "YOUR_API_KEY_HERE";
export const BASE_URL = "https://api.openweathermap.org/data/2.5";
