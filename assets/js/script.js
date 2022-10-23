// https://home.openweathermap.org/api_keys
// MikeWebPrintWeather
var apiKey = 'db85a3a35a6f624f305bc45759b9966e';
var cityForm = document.getElementById('cityForm')
var cityButtons = document.getElementById('cityButtons')
var city;
var forecastEl = document.getElementById('forecast');
var currentWeatherEl = document.getElementById('currentWeather')
cityForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var cityInput = document.getElementById('cityInput');
  city = cityInput.value.toUpperCase();
  saveCity(city)
  var coordQueryURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',US&limit=1&appid=db85a3a35a6f624f305bc45759b9966e';
  if (city.length > 0) {
    console.log('Hey! You did something! You entered ' + city)
    fetch(coordQueryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (i = 0; i < 1; i++) {
          var lat = data[i].lat;
          var lon = data[i].lon;
          var weatherQueryURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&cnt=40&appid=' + apiKey;
          fetch(weatherQueryURL)
          .then(function (response) {
            return response.json();
          })
          .then(function (data){
            console.log('weather data: for '+city);
            console.log(data);
            renderWeather(data);
          })

        }
      })
    }
    cityInput.value = '';
})

function saveCity(city) {
  // getCities();
  if (getCities() === null) {
    var savedCities = [];
  } else {
    var savedCities = JSON.parse(localStorage.getItem('savedCities'))
  }
  if (savedCities.indexOf(city) < 0) {
    savedCities.push(city)
  }
  localStorage.setItem('savedCities', JSON.stringify(savedCities))
  console.log(savedCities)
}
function getCities() {
  var savedCities = JSON.parse(localStorage.getItem('savedCities'))
  createButtons(savedCities)
  // return savedCities
}

function createButtons(savedCities) {
  console.log('got saved cities')
  for (i = 0; i < savedCities.length; i++) {
    var entry = document.createElement('button')
    var name = savedCities[i]
    entry.href = '';
    entry.setAttribute('class', 'btn btn-danger my-1')
    entry.textContent = name
    cityButtons.appendChild(entry);
    cityInput.value = '';
    entry.addEventListener('click', function (e) {
      e.preventDefault();
    })
  }
}
function renderWeather(data){
  forecastEl.textContent = '';
  currentWeatherEl.textContent = '';
  const currentDayUnix = data.list[0].dt;
  console.log(currentDayUnix);
  const day = new Date((currentDayUnix * 1000));
  const currentMonth = (day.getMonth()+1);
  const currentDay = day.getDate();
  const currentYear = day.getFullYear();
  var item = document.createElement('div');
  item.innerHTML = '<h2>'+data.city.name+' ('+currentMonth+'/'+currentDay+'/'+currentYear+')</h2><div>'+data.list[0].weather[0].description+'<img src="http://openweathermap.org/img/wn/'+data.list[0].weather[0].icon +'@2x.png" alt="icon"></div>'+'<div>Temp: '+data.list[0].main.temp+'&deg; F</div><div>Wind: '+data.list[0].wind.speed+' MPH</div><div>Humidity: '+data.list[0].main.humidity+'%</div>'
  
  console.log(data.cod)
  currentWeatherEl.appendChild(item);
  console.log('hello:' + data.list.length);
  for (let j = 7; j < data.list.length; j+=8) {
    const forecastDayUnix = data.list[j].dt;
    const forecastDay = new Date((forecastDayUnix * 1000));
    const forecastMonth = (forecastDay.getMonth()+1);
    const forecastDate = forecastDay.getDate();
    const forecastYear = forecastDay.getFullYear();
    var forecastItem = document.createElement('div');
    forecastItem.innerHTML = '<div class="forecast col col-3"><div>('+forecastMonth+'/'+forecastDate+'/'+forecastYear+') '+data.list[j].weather[0].description+'<img src="http://openweathermap.org/img/wn/'+data.list[j].weather[0].icon +'.png" alt="icon"></div>'+'<div>Temp: '+data.list[j].main.temp+'&deg; F</div><div>Wind: '+data.list[j].wind.speed+' MPH</div><div>Humidity: '+data.list[j].main.humidity+'%</div></div>';
    console.log(forecastItem);
    forecastEl.appendChild(forecastItem)
  }
}
