function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}: ${minutes}`;
}
function displayForecast(){
let forecastElement = document.querySelector("#forecast") 
let forecastHTML = `<div class="row">`;
let days = ["Fri","Sat", "Sun", "Mon","Tues", "Wed"];
days.forEach(function(day){
 
forecastHTML = forecastHTML + `   
      <div class="col-2">
        <div class="weather-forecast-date">
      ${day}
    </div>
      <img
       src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" 
      alt="rainy" width="43"
      />
      <div class="weather-forecast-temp">
       <span class="weather-forecast-temperature-max"> 25° </span>
      <span class="weather-forecast-temperature-min"> 27° </span> 
    </div>       
      </div>
    
    
    
      `;  
});


      forecastHTML = forecastHTML+`</div>`;
forecastElement.innerHTML = forecastHTML;

}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  console.log(response);

  let tempElement = document.querySelector("#temperature");
  celsiusTemperature = Math.round(response.data.temperature.current);
  tempElement.innerHTML = celsiusTemperature;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.time * 1000);

  fahrenheitTemp = response.data.temperature.current;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
   getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
let celsiusTemperature = null;


function displaycelsiusTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  tempElement.innerHTML = Math.round((fahrenheitTemp - 32) / 1.8);
}

function displayfahrenheitTemperature(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemperature);

search("Atlanta");
displayForecast();
