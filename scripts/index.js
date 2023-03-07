const container = document.querySelector('.container');
const containerWrapper = document.querySelector('.wrapper-container');

const searchBtn = document.querySelector('button');
const searchInput = document.querySelector('input');

const [cloudyValue,humidityValue,windValue] = document.querySelectorAll('.section-info__weather-detail-row-value');

const degree  = document.querySelector('.section-content__details-degrees');
const cityName  = document.querySelector('.section-content__details-city-name');
const cityDate  = document.querySelector('.section-content__details-city-date');
const weatherImage = document.querySelector('.section-content__details-cloudiness-img img');
const weatherImageTitle = document.querySelector('.section-content__details-cloudiness-state');

const cities = document.querySelectorAll('.section-info__default-city-list-item a');

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const overcastCodeArr = [
  1003,
  1006,
  1009, 
  1030, 
  1069, 
  1087, 
  1135, 
  1273, 
  1276, 
  1279, 
  1282
];
const rainCodeArr = [ 
  1063,
  1069,
  1072,
  1150,
  1153,
  1180,
  1183,
  1186,
  1189,
  1192,
  1195,
  1204,
  1207,
  1240,
  1243,
  1246,
  1249,
  1252
];
const key = '<YOUR API KEY>'

const fetchWeatherData = async(cityName) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=2a1a9a2b744f4c7d8ae172032232802&q=${cityName}`;
  const weatherInfo = await fetch(url)
    .then(response => response.json())
    .then(data => {
      rerenderDataField(data);
    }).catch(() => {
      alert('City not found please try again');
    });
}
const rerenderDataField = (data) => {
  degree.textContent = `${data.current.temp_c}°c`;
  weatherImageTitle.textContent = data.current.condition.text;
  
  const [day,month,year,time] = dateFormatter(data);
  cityDate.textContent = `${time}-${dayOfTheWeek(day,month,year)} ${day}.${month}.${year}`;
  cityName.textContent = data.location.name;

  const iconId = data.current.condition.icon.substr('//cd.weatherapi.com/weather/64x64/'.length);
  weatherImage.src = `./assets/icons${iconId}`;

  cloudyValue.textContent = data.current.cloud + '%';
  humidityValue.textContent = data.current.humidity + '%';
  windValue.textContent = data.current.wind_kph + 'km/h';

  changeWeatherBg(data.current.condition.code);
  searchInput.value = '';
}

const changeWeatherBg = (code) => {
  if(code === 1000) {
    container.className = 'container clear';
  }
  else if(overcastCodeArr.includes(code)) {
      container.className = 'container overcast';
  } else if(rainCodeArr.includes(code)) {
    container.className = 'container rain';
  } else {
    container.className = 'container blizzard';
  }
}
const eventHandlerFetch = () => {
  if(!searchInput.value.length) {
    alert('Please enter city name')
  } else {
    fetchWeatherData(searchInput.value);
  }
}

cities.forEach((city) => {
  city.addEventListener('click',(e) => {
    e.preventDefault();
    fetchWeatherData(e.target.innerHTML);
    
  })
})
searchBtn.addEventListener('click',(e) => {
  eventHandlerFetch();
})
searchInput.addEventListener('keypress',(e) => {
  if(e.key === 'Enter') {
    eventHandlerFetch();
  }
})

fetchWeatherData('Kiev');
