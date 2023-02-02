//Display Time

let now = new Date();
let days=["Sunday", "Monday", "Tuesday","wednesday","Thursday","Friday","Saturday"];
let day = days[now.getDay()];
let minutes = now.getMinutes();
let hour = now.getHours();

function ShowDate(){
  let date = document.querySelector("#current-time");
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  date.innerHTML =`${day} ${hour}:${minutes}`;
}

ShowDate();


// Display Temperature

function weather(response){
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");
  let conditionElement = document.querySelector("#condition");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let pressureElement =document.querySelector(".pressure");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML =Math.floor(response.data.main.temp);
  conditionElement.innerHTML =response.data.weather[0].main;
  windElement.innerHTML = Math.floor(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  pressureElement.innerHTML = response.data.main.pressure;
  iconElement.setAttribute("alt", response.data.weather[0].description);
  temperatureElement = response.data.main.temp;
  iconElement.setAttribute("src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord)
}

function searchCity(city){
  let apiKey="5f472b7acba333cd8a035ea85a0d4d4c";
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(weather);
}


function manageSubmit(event){
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}
// Forecasting

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function weatherForecast(response){
  
  let forecast = response.data.daily;

  let forecastElement= document.querySelector(".forcast");
  let forecastHtml = `<div class="row">`;

  forecast.forEach(function(forecastDay,index){

    if(index<4){
      forecastHtml = forecastHtml +
      `<div class="col-3" id="forecast-days">
            <span>${formatDay(forecastDay.dt)}</span><br/>
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"" alt="weatherIcon" id="forcast-icon"/><br/>
            <span class="max-temp">${Math.round(forecastDay.temp.max)}°</span>
            <span class="min-temp"> ${Math.round(forecastDay.temp.min)}°</span>
        </div>`;
    }
   
  });


  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;

}

function getForecast(coordinates){ 
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherForecast);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit",manageSubmit);



searchCity("Tehran");