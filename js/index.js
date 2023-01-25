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

}

let apiKey = "e6103b1173ff0o84d6baf0bf2taa3d79";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Atlanta&key=${apiKey}&units=imperial`;

axios.get(apiUrl).then(displayTemp)

