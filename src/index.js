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
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML =Math.floor(response.data.main.temp);
  conditionElement.innerHTML =response.data.weather[0].main;
  windElement.innerHTML = Math.floor(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  iconElement.setAttribute("alt", response.data.weather[0].description);
  temperatureElement = response.data.main.temp;
  iconElement.setAttribute("src", 
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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




let form = document.querySelector("#search-city");
form.addEventListener("submit",manageSubmit);



searchCity("Tehran");