// https://home.openweathermap.org/api_keys
// MikeWebPrintWeather
var apiKey = 'db85a3a35a6f624f305bc45759b9966e';
var cityForm = document.getElementById('cityForm')
var cityButtons = document.getElementById('cityButtons')
var city;
var currentWeatherEl = document.getElementById('currentWeather')
var forecastEl = document.getElementById('forecast')
cityForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var cityInput = document.getElementById('cityInput');
  city = cityInput.value;
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
  var savedCities = localStorage.getItem('savedCities')
  return savedCities
}

function createButtons(data) {
  for (i = 0; i < 1; i++) {
    var entry = document.createElement('button')
    var name = data[i].name
    var state = data[i].state;
    var lat = data[i].lat;
    var lon = data[i].lon;
    entry.href = '';
    entry.setAttribute('class', 'btn btn-danger my-1')
    entry.setAttribute('data-lat', lat)
    entry.setAttribute('data-lon', lon)
    entry.textContent = name + ', ' + state;
    citySelect.appendChild(entry);
    cityInput.value = '';
    entry.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('You clicked ' + name + ', ' + state + ' - lat: ' + lat + ', lon: ' + lon)
      var coord = { lat, lon }
      saveCity(name, coord)
      entry.remove();
      cityButtons.appendChild(entry)
    })
  }
}
function renderWeather(data){
    const currentDayUnix = data.list[0].dt;
    console.log(currentDayUnix);
    const day = new Date((currentDayUnix * 1000));
    const currentMonth = (day.getMonth()+1);
    const currentDay = day.getDate();
    const currentYear = day.getFullYear();
    var item = document.createElement('p');
    item.innerHTML = '<h2>'+data.city.name+' ('+currentMonth+'/'+currentDay+'/'+currentYear+')</h2><p>'+data.list[0].weather[0].description+'<img src="http://openweathermap.org/img/wn/'+data.list[0].weather[0].icon +'.png" alt="icon"></p>'+'<p>Temp: '+data.list[0].main.temp+'&deg; F</p><p>Wind: '+data.list[0].wind.speed+' MPH</p><p>Humidity: '+data.list[0].main.humidity+'%</p>'
    
    console.log(data.cod)
    forecastEl.textContent = '';
    forecastEl.appendChild(item);
  }


// currentWeatherEl.textContent = 'Well, current weather goes here, actually.'
forecastEl.textContent = 'Forecast goes here.'