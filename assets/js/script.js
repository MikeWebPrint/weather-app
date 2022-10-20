// https://home.openweathermap.org/api_keys
// MikeWebPrintWeather
var apiKey = 'db85a3a35a6f624f305bc45759b9966e';
// var weatherQueryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
var cityForm = document.getElementById('cityForm')
var citySelect = document.getElementById('citySelect')
var cityButtons = document.getElementById('cityButtons')
// fetch(queryURL)

// need to get coordinate info (geocode) and pass that into the city variable to pass to openweather
var currentWeatherEl = document.getElementById('currentWeather')
var forecastEl = document.getElementById('forecast')
cityForm.addEventListener('submit', function (e){
  e.preventDefault();
  var cityInput = document.getElementById('cityInput');
  city = cityInput.value
  var coordQueryURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city + ',US&limit=5&appid=db85a3a35a6f624f305bc45759b9966e';
  if (city.length > 0){
    console.log('Hey! You did something! You entered ' + city)
    console.log(coordQueryURL);
    fetch(coordQueryURL)
      .then(function (response){
        return response.json();
      })
      .then(function(data){
        // console.log(data);
        createButtons(data)
        // for (i=0; i < 1; i++){
        //     var entry = document.createElement('button')
        //     var name = data[i].name
        //     var state = data[i].state;
        //     var lat = data[i].lat;
        //     var lon = data[i].lon;
        //     entry.href = '';
        //     entry.setAttribute('class', 'btn btn-danger my-1')
        //     entry.setAttribute('data-lat', lat)
        //     entry.setAttribute('data-lon', lon)
        //     entry.textContent = name + ', ' + state ;
        //     cityButtons.appendChild(entry);
        //     cityInput.value = '';
        //     entry.addEventListener('click', function(e){
        //       e.preventDefault();
        //       console.log('You clicked ' + name + ', ' + state +' - lat: '+ lat +', lon: '+ lon)
        //       var coord = {lat,lon}
        //       saveCity(city, coord)
        //     })
        // }
      })
  }
})
function saveCity(city, coord) {
  // getCities();
  if (getCities()===null) {
    var savedCities = [];
  } else {
    var savedCities = JSON.parse(localStorage.getItem('savedCities'))
  }
  savedCities.push({city, coord})
  localStorage.setItem('savedCities', JSON.stringify(savedCities))
  console.log(savedCities)
}
function getCities(){
  var savedCities = localStorage.getItem('savedCities')
    return savedCities
  }

function createButtons(data) {
  for (i=0; i < 1; i++){
    var entry = document.createElement('button')
    var name = data[i].name
    var state = data[i].state;
    var lat = data[i].lat;
    var lon = data[i].lon;
    entry.href = '';
    entry.setAttribute('class', 'btn btn-danger my-1')
    entry.setAttribute('data-lat', lat)
    entry.setAttribute('data-lon', lon)
    entry.textContent = name + ', ' + state ;
    citySelect.appendChild(entry);
    cityInput.value = '';
    entry.addEventListener('click', function(e){
      e.preventDefault();
      console.log('You clicked ' + name + ', ' + state +' - lat: '+ lat +', lon: '+ lon)
      var coord = {lat,lon}
      saveCity(name, coord)
      entry.remove();
      cityButtons.appendChild(entry)
    })
}
}
currentWeatherEl.textContent = 'Well, current weather goes here, actually.'
forecastEl.textContent = 'Forecast goes here.'