// Current Time - Digital clock
const currentTime = document.querySelector('#current-time');
const selectedDayOfWeek = document.querySelector('.day-info__day');
const selectedDate = document.querySelector('.day-info__date');
const daysOfWeek = {
  Mon: 'Понедельник',
  Tue: 'Вторник',
  Wed: 'Среда',
  Thu: 'Четверг',
  Fri: 'Пятница',
  Sat: 'Суббота',
  Sun: 'Воскресенье',
};
const months = {
  Jan: 'Января',
  Feb: 'Февраля',
  Mar: 'Марта',
  Apr: 'Апреля',
  May: 'Мая',
  Jun: 'Июня',
  Jul: 'Июля',
  Aug: 'Августа',
  Sep: 'Сентября',
  Oct: 'Октября',
  Nov: 'Ноября',
  Dec: 'Декабря',
};

window.onload = () => {
  // testDate.setDate(testDate.getDate() + 1);
  // console.log(testDate);
  // testDate.setDate(testDate.getDate() + 1);
  // console.log(testDate);
  window.setInterval(() => {
    let date = new Date();
    // let dateArr = date.toDateString().split(/\s+/);
    // selectedDayOfWeek.textContent = daysOfWeek[dateArr[0]];
    // selectedDate.innerHTML = `<i class="_wi-cal-days icon_color"></i>${
    //   dateArr[2]
    // } ${months[dateArr[1]]} ${dateArr[3]}`;
    currentTime.textContent = date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, 1000);

  // window.setTimeout(() => {
  //   let date = new Date();
  //   console.log(date.toDateString());
  // }, 3_600_000);
};

// Modal window interaction
const modalSearchWindow = document.querySelector('.search-modal');
const modalOpenBtn = document.querySelector('#modal-open-btn');
const modalCloseBtn = document.querySelector('#modal-close-btn');
const modalOkBtn = document.querySelector('#modal-ok-btn');

const locationRequestForm = document.querySelector('#location-search-form');
const locationSearchInput = document.querySelector('#location-name-search');
const locationResultList = document.querySelector('#search-result-list');
let geoSearchResults = [];

const weatherRequestForm = document.querySelector('#get-weather-form');

modalSearchWindow.addEventListener('click', (event) => {
  if (event.target === modalSearchWindow) modalSearchWindow.close();
});

modalOpenBtn.addEventListener('click', () => {
  modalSearchWindow.showModal();
});

modalCloseBtn.addEventListener('click', () => {
  modalSearchWindow.close();
  // Clear fields
  geoSearchResults = [];
  locationSearchInput.value = '';
  locationResultList.innerHTML = '';
});

locationRequestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const urlGeoLocation = `https://geocoding-api.open-meteo.com/v1/search?name=${locationSearchInput.value}&count=50&language=ru&format=json`;

  fetch(urlGeoLocation)
    .then((geoData) => {
      return geoData.status === 200
        ? geoData.json()
        : console.error('Geolocation server. Connection error...');
    })
    .then((geoData) => {
      geoSearchResults = geoData?.results;
      //
      console.log(geoData);
      console.log(geoSearchResults);
      //
      geoSearchResults.forEach((el, i) => {
        let option = document.createElement('option');
        option.setAttribute('value', i);
        option.textContent = `${el.country}, ${el?.admin1}, ${el.name}`;
        locationResultList.append(option);
      });
    })
    .catch((err) => console.log(err));
});

weatherRequestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // alert('Отправка запроса погоды в выбранной локации');
  console.log(geoSearchResults[locationResultList.value]);

  const latitude = geoSearchResults[locationResultList.value].latitude;
  const longitude = geoSearchResults[locationResultList.value].longitude;

  console.log(latitude, longitude);

  const urlWeather = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&wind_speed_unit=ms&timezone=auto`;

  //
  fetch(urlWeather)
    .then((weatherData) => {
      return weatherData.status === 200
        ? weatherData.json()
        : console.error('Weather server. Connection error...');
    })
    .then((weatherData) => {
      console.log(weatherData);
    })
    .catch((err) => console.log(err));

  // Clear fields
  modalSearchWindow.close();
  geoSearchResults = [];
  locationSearchInput.value = '';
  locationResultList.innerHTML = '';
});

//
// !!! 1hpa === 0.750062 mmHg
//

// const countryInput = document.querySelector('#country-name-input');
// const countryList = Array.from(
//   document.querySelectorAll('.country-list option')
// );

// countryInput.addEventListener('keyup', () => {
//   nameFilter();
// });

// function nameFilter() {
//   let filterString = countryInput.value.toLowerCase();
//   countryList.forEach((el) => {
//     let textValue = el.textContent || el.innerText;
//     if (textValue.toLowerCase().indexOf(filterString) !== -1) {
//       el.classList.remove('hidden');
//     } else {
//       el.classList.add('hidden');
//     }
//   });
// }

// fetch(url)
//   .then((data) => {
//     return data.status === 200
//       ? data.json()
//       : console.error('Server connection error...');
//   })
//   .then((data) => {
//     console.log(data);
//     console.log('UTC offset => |', `+${data.utc_offset_seconds / 3600} hours`);
//     console.log('Current Time => |', `${data.current.time}`);
//     console.log(
//       'Current Temperature => |',
//       `${data.current.temperature_2m}${data.current_units.temperature_2m}`
//     );
//   })
//   .catch((err) => console.log(err));

// const requiredCity = 'Moscow';
// const selectContry = 'Russia';
// const selectContryCode = 'RU';
// const urlGeoloacation = `https://photon.komoot.io/api/?q=${requiredCity}`;

// fetch(urlGeoloacation)
//   .then((geoData) => {
//     return geoData.status === 200
//       ? geoData.json()
//       : console.error('Geolocation server. Connection error...');
//   })
//   .then((geoData) => {
//     console.log(geoData);
//     const geoProps = geoData?.features.filter(
//       (el) =>
//         el.properties.countrycode === selectContryCode &&
//         el.properties.type === 'city'
//     )[0];
//     const longitude = (
//       (geoProps.properties.extent[0] + geoProps.properties.extent[2]) /
//       2
//     ).toFixed(6);
//     const latitude = (
//       (geoProps.properties.extent[1] + geoProps.properties.extent[3]) /
//       2
//     ).toFixed(6);
//     console.log(geoProps);
//     console.log('Longitude => |', longitude, 'Latitude => |', latitude);

//     // const urlWeather = `https://api.open-meteo.com/v1/forecast?
//     // latitude=${latitude}&
//     // longitude=${longitude}&
//     // current=temperature_2m`;

//     // fetch(urlWeather)
//     //   .then((wData) => {
//     //     return wData.status === 200
//     //       ? wData.json()
//     //       : console.error('Weather forcast server. Connection error...');
//     //   })
//     //   .then((wData) => {
//     //     console.log(wData);
//     //   });
//   })
//   .catch((err) => console.log(err));
