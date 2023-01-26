function formatDate(timestamp){
    //calculate the date
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours < 10){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if(minutes< 10 ){
        minutes = `0${minutes}`
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date. getDay()];
    return `${day} ${hours}: ${minutes}`
}


function displayTemp(response){
    console.log(response)
    
    let tempElement = document.querySelector("#temperature")
    tempElement.innerHTML = Math.round(response.data.temperature.current);
    
    let cityElement = document.querySelector('#city')
    cityElement.innerHTML = response.data.city;
    
    let description = document.querySelector('#description')
    description.innerHTML = response.data.condition.description;
    
    let humidity = document.querySelector("#humidity")
    humidity.innerHTML = response.data.temperature.humidity;
    
    let wind = document.querySelector('#wind')
    wind.innerHTML = Math.round(response.data.wind.speed);
    
    let date = document.querySelector('#date') 
    date.innerHTML = formatDate(response.data.time * 1000)

    fahrenheitTemp = response.data.temperature.current;

    let icon = document.querySelector("#icon")
    icon.setAttribute(
  "src",
  `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`

  
);

}

function search(city){
let apiKey = "e6103b1173ff0o84d6baf0bf2taa3d79";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemp)

}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displaycelsiusTemperature(event){
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
 let celsiusTemperature = (fahrenheitTemp - 32) / 1.8;
 tempElement.innerHTML = Math.round(celsiusTemperature);
}

function displayfahrenheitTemperature(event){
 event.preventDefault();
 let tempElement = document.querySelector("#temperature");

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
 tempElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);



let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayfahrenheitTemperature);

search("Atlanta");